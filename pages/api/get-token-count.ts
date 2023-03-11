import { NextApiRequest, NextApiResponse } from "next";
import countTokens from "../../utils/tokenCount";

type TokenCountResponse = {
  tokenCount: number;
  error?: string;
  status: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TokenCountResponse>
) {
  const { prompt } = req.query as { prompt: string };
  const actualPrompt = `As an expert drafter, your objective is to carefully review the provided terms and conditions and identify any red flags - that is, any potentially problematic or unclear statements that could impact the client's interests or rights. Your task is to mark the specific words or phrases containing a red flag with [start] before and [end] after, using clear and concise language that is easy for the client to understand. Note that [start] and [end] should only be used to highlight the most important words or phrases in a sentence, and not the entire sentence. You may include additional words between [start] and [end] if it helps to clarify the issue, but try to keep it as brief as possible. When identifying red flags, pay attention to any statements that could be interpreted in different ways, contain unusual or undefined terms, or appear to limit or waive the client's rights or options. Highlight issues based solely on the terms and conditions provided, without assuming or inferring anything beyond what is explicitly stated.
  Terms and conditions: ${prompt}`;

  if (!prompt) {
    return res.status(500).json({
      tokenCount: 0,
      status: false,
      error: "prompt missing",
    });
  }


  // Calculate the number of tokens required for the prompt
  try {
    const tokenCount = await getTokens(actualPrompt);

    // Return the token count in the response
    res.send({ tokenCount: tokenCount.usage.total_tokens, status: true });
  } catch (e) {
    return res.status(500).json({
      tokenCount: 0,
      status: false,
      error: "tokenCount failed",
    });
  }
}

export async function getTokens(
  prompt: string,

) {



  const total = countTokens(prompt)

  const tokenData = { usage: { total_tokens: total } }
  return tokenData;
}
