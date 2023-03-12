import {
    createParser,
    ParsedEvent,
    ReconnectInterval,
} from "eventsource-parser";

const defaultValues = {
    model: "gpt-3.5-turbo",
    stream: true,
};








const message = [
    { role: "user", content: "Can you generate terms and conditions for me?" },
    { role: "assistant", content: "Sure, I can help you with that. Let's start by asking a few questions." },
    { role: "assistant", content: "What is the name of your company or website?" },
    { role: "user", content: "My company name is XYZ Corp." },
    { role: "assistant", content: "What type of products or services do you offer?" },
    { role: "user", content: "We offer digital marketing services." },
    { role: "assistant", content: "Do you collect any personal data from your customers?" },
    { role: "user", content: "Yes, we collect names, emails, and phone numbers." },
    { role: "assistant", content: "How do you use the personal data that you collect?" },
    { role: "user", content: "We use it to send promotional emails and updates about our services." },
    { role: "assistant", content: "Do you share the personal data that you collect with any third parties?" },
    { role: "user", content: "No, we don't share it with any third parties." },
    { role: "assistant", content: "Do you have any refund or cancellation policy?" },
    { role: "user", content: "Yes, we offer refunds within 30 days of purchase and cancellations can be made up to 24 hours before the scheduled service." },
    { role: "assistant", content: "Great. Based on your responses, I have generated the following terms and conditions:" },]














export async function OpenAiSteamForCreation(payload: string) {
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
                        "As an expert drafter, your objective is to carefully review the provided terms and conditions and identify any red flags - that is, any potentially problematic or unclear statements that could impact the client's interests or rights. Your task is to send a report highlighting the specific words or phrases containing a red flag with [start] before and [end] after. It is important to choose the most important words or phrases in a sentence and highlight only those, rather than highlighting the entire sentence. Your report should include at least one [start] and [end], but you may include additional ones if necessary. Use clear and concise language that is easy for the client to understand. When identifying red flags, pay attention to any statements that could be interpreted in different ways, contain unusual or undefined terms, or appear to limit or waive the client's rights or options. Highlight issues based solely on the terms and conditions provided, without assuming or inferring anything beyond what is explicitly stated. Your report should only include the specific words or phrases containing a red flag and not the entire terms and conditions document.",
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
