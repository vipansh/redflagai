import {
  createParser,
  ParsedEvent,
  ReconnectInterval,
} from "eventsource-parser";

const defaultValues = {
  model: "gpt-3.5-turbo",
  stream: true,
};

export async function OpenAIStream(payload: string) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  let counter = 0;

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify({
      ...defaultValues,
      messages: [
        {
          role: "user",
          content:
            "Act as an expert drafter, your task is to thoroughly review the provided terms and conditions and identify any significant issues. Mark any problematic text with [start] before and [end] after, using a maximum of six words in between if it's something that is of the most criticality. Use clear and concise language that is easy for the client to understand.Highlight issues based solely on the terms and conditions provided without assuming or inferring anything beyond what is explicitly stated. Highlight text with [start] and [end] if its is verry critical",
        },
        {
          role: "assistant",
          content:
            "Got it, I understand your instructions. Please provide me with the terms and conditions that need to be reviewed.",
        },
        { role: "user", content: payload },
      ],
    }),
  });
  console.log({ res });
  const stream = new ReadableStream({
    async start(controller) {
      // callback
      function onParse(event: ParsedEvent | ReconnectInterval) {
        if (event.type === "event") {
          const data = event.data;
          // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
          if (data === "[DONE]") {
            controller.close();
            return;
          }
          try {
            const json = JSON.parse(data);
            const text = json.choices[0].delta.content;
            console.log(json, text);
            if (counter < 2 && text && (text.match(/\n/) || []).length) {
              // this is a prefix character (i.e., "\n\n"), do nothing
              return;
            }
            const queue = encoder.encode(text);
            controller.enqueue(queue);
            counter++;
            console.log({ text });
          } catch (e) {
            // maybe parse error
            controller.error(e);
            console.log({ e });
          }
        }
      }

      // stream response (SSE) from OpenAI may be fragmented into multiple chunks
      // this ensures we properly read chunks and invoke an event for each SSE event stream
      const parser = createParser(onParse);
      // https://web.dev/streams/#asynchronous-iteration
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });
  console.log({ stream });
  return stream;
}
