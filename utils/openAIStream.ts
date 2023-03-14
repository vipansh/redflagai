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
            `As an expert drafter, your objective is to carefully review the provided terms and conditions and identify any red flags - that is, any potentially problematic or unclear statements that could impact the client's interests or rights. Your task is to send a report highlighting the specific words or phrases containing a red flag with <span class="text-lg bg-red-100 p-1 rounded "> before and </span> after. It is important to choose the most important words or phrases in a sentence and highlight only those, rather than highlighting the entire sentence. Your report should include at least one <span class="text-lg bg-red-100 p-1 rounded "> and </span>, but you may include additional ones if necessary. If your report includes a numbered list, use the tailwind css format <ol class="list-decimal list-inside"> for a better UI. Use clear and concise language that is easy for the client to understand. When identifying red flags, pay attention to any statements that could be interpreted in different ways, contain unusual or undefined terms, or appear to limit or waive the client's rights or options. Highlight issues based solely on the terms and conditions provided, without assuming or inferring anything beyond what is explicitly stated. Your report should only include the specific words or phrases containing a red flag and not the entire terms and conditions document.`,
        },
        {
          role: "assistant",
          content:
            `Got it, I understand your instructions that my report should follow these guidelines:
            1.Use the tailwind css format <span class="text-lg bg-red-100 p-1 rounded ">red flag text</span> to highlight specific words or phrases containing a red flag.
            2.Choose the most important words or phrases in a sentence to highlight and avoid highlighting the entire sentence.
            3.Use clear and concise language that is easy for the client to understand.
            4.If your report includes a numbered list, use the tailwind css format <ol class="list-decimal list-inside"> for a better UI.
            5.Pay attention to statements that could be interpreted in different ways, contain unusual or undefined terms, or appear to limit or waive the client's rights or options.
            6.Highlight issues based solely on the terms and conditions provided, without assuming or inferring anything beyond what is explicitly stated.
            7.Include at least one <span class="text-lg bg-red-100 p-1 rounded ">red flag text</span>, but you may include additional ones if necessary.
            8Your report should only include the specific words or phrases containing a red flag and not the entire terms and conditions document.
            Please provide me with the terms and conditions that need to be reviewed.
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
