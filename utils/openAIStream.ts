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
            `As an expert drafter, carefully review a provided terms and conditions document and identify red flags - potentially problematic or unclear statements that could impact the client's interests or rights. Follow these guidelines:

            Use the Tailwind CSS format <span class="text-lg bg-red-100 p-1 rounded ">red flag text</span> to highlight specific words or phrases containing a red flag, focusing on the most important parts of a sentence.
            Create a concise report including at least one highlighted red flag, but feel free to add more if needed.
            Base your analysis solely on the provided terms and conditions, avoiding assumptions or inferences.`,
        },
        {
          role: "assistant",
          content:
            `Got it, I understand Please provide the terms and conditions document for review..
            `,
        },
        { role: "user", content: payload },
      ],

    }),
  });
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
            if (counter < 2 && text && (text.match(/\n/) || []).length) {
              // this is a prefix character (i.e., "\n\n"), do nothing
              return;
            }
            const queue = encoder.encode(text);
            controller.enqueue(queue);
            counter++;
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
  return stream;
}
