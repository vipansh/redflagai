import { NextApiRequest, NextApiResponse } from "next";

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
  const actualPrompt = `What are redflag in this tersm and conditions: ${prompt}`;

  if (!prompt) {
    return res.status(500).json({
      tokenCount: 0,
      status: false,
      error: "prompt missing",
    });
  }

  const apiKey = process.env.OPENAI_API_KEY; // Your OpenAI API key
  const apiUrl = "https://api.openai.com/v1/";
  if (!apiKey) {
    return res.status(500).json({
      error: "apiKey  not found",
      tokenCount: 0,
      status: false,
    });
  }

  // Calculate the number of tokens required for the prompt
  try {
    const tokenCount = await getTokens(actualPrompt, apiKey, apiUrl);

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

async function getTokens(prompt: string, apiKey: string, apiUrl: string) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      prompt: prompt,
      max_tokens: 1,
      temperature: 0,
    }),
  };

  const response = await fetch(
    `${apiUrl}engines/davinci-codex/completions`,
    requestOptions
  );
  const data = await response.json();

  return data;
}
