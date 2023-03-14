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
  const actualPrompt = prompt;

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

  if (!apiKey) {
    return new Response("Missing apiKey", { status: 500 });
  }
  // Calculate the number of tokens required for the actualPrompt
  const tokenCount = await getTokens(actualPrompt);
  console.log(tokenCount.usage.total_tokens);
  //update user
  const { data: upsertData, error: upsertError } = await supabase
    .from("orders")
    .insert({
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
