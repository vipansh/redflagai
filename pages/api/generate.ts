import { OpenAIStream, OpenAIStreamPayload } from "../../utils/openAIStream";
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
  const actualPrompt = `What are redflag in this term and conditions: ${prompt}`;

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

  const payload: OpenAIStreamPayload = {
    model: "text-davinci-003",
    prompt: actualPrompt,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 200,
    stream: true,
    n: 1,
  };

  const stream = await OpenAIStream(payload);
  return new Response(stream);
};

export default handler;
