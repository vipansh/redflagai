import { OpenAIStream } from "../../utils/openAIStream";
import { supabase } from "../../utils/supabase";
import { getTokens } from "./get-token-count";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const config = {
  runtime: "edge",
};

const handler = async (req: Request): Promise<Response> => {
  const { prompt } = (await req.json()) as {
    prompt?: string;
  };

  if (!prompt) {
    return new Response("No prompt in the request", { status: 400 });
  }
  const actualPrompt = ` act as an expert drafter,I would like you to review some terms and conditions as an expert drafter. I will provide you with the terms and conditions, and I need you to identify any significant issues within them. If you find a critical issue, please highlight it by putting [start] before and [end] after the problematic text, with a maximum of six words in between. For example, if you find a critical privacy issue that says "This platform will share your data without consent," you should highlight it like this: "Privacy issue: This platform will [start]share your data without consent[end]." Please provide your feedback in bullet points with a title and description format, like "Privacy issue: [start]This platform will share your data without consent[end]." Only highlight critical issues, and use [start] and [end] with the next two words.. Can you please review these terms and conditions for me?
  terms and conditions are:  ${prompt}`;

  const cookieHeader = req.headers.get("cookie");
  const cookies: { [key: string]: string } = {};
  if (cookieHeader) {
    const cookiePairs = cookieHeader.split("; ");
    for (const pair of cookiePairs) {
      const [name, value] = pair.split("=");
      cookies[name] = decodeURIComponent(value);
    }
  }

  const authToken = cookies.token;

  //get token count
  const apiKey = process.env.OPENAI_API_KEY; // Your OpenAI API key
  const apiUrl = "https://api.openai.com/v1/";

  if (!apiKey) {
    return new Response("Missing apiKey", { status: 500 });
  }
  // Calculate the number of tokens required for the actualPrompt
  const tokenCount = await getTokens(actualPrompt, apiKey, apiUrl);
  console.log(tokenCount.usage.total_tokens);

  //update user
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(authToken);
  if (!user) return new Response("Login in again", { status: 500 });
  if (error) return new Response("Missing apiKey", { status: 500 });

  const { data: userData } = await supabase
    .from("profiles")
    .select("no_of_tokens")
    .eq("id", user.id)
    .single();
  if (!userData) return new Response("No user found", { status: 500 });

  if (userData?.no_of_tokens < tokenCount.usage.total_tokens) {
    return new Response("Not enough token in account");
  }

  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      no_of_tokens: userData?.no_of_tokens - tokenCount.usage.total_tokens,
    })
    .eq("id", user.id);
  if (updateError) return new Response("No data in profile ", { status: 500 });

  const { data: upsertData, error: upsertError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      token_debited: tokenCount.usage.total_tokens,
      input: actualPrompt,
      status: true,
    });

  if (upsertError) {
    console.log({ upsertData, upsertError });
    return new Response("Unable to create order", { status: 500 });
  }

  const stream = await OpenAIStream(actualPrompt);
  return new Response(stream);
};

export default handler;
