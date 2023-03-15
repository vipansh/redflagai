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

  const apiKey = process.env.OPENAI_API_KEY; // Your OpenAI API key

  if (!apiKey) {
    return new Response("Missing apiKey", { status: 500 });
  }

  // Calculate the number of tokens required for the actualPrompt
  const tokenCount = await getTokens(actualPrompt);




  supabase
  .from("orders")
  .insert({
    token_debited: tokenCount.usage.total_tokens,
    input: actualPrompt,
    status: true,
  });


  const stream = await OpenAIStream(actualPrompt);

  return new Response(stream);
};

export default handler;
