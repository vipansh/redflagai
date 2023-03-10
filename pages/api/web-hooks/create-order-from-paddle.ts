import type { NextApiRequest, NextApiResponse } from "next";
import { getServiceSupabase } from "../../../utils/supabase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    let event = req.body;
    const supabase = getServiceSupabase();
    switch (event.alert_name) {
        case "payment_succeeded":
            let custom_data;
            try {
                custom_data = JSON.parse(event.custom_data);
            } catch (err) {
                console.error('Failed to parse custom data', err, { data: event.custom_data, event });
            }
            if (custom_data) {
                console.log({ custom_data })
                const { data: userData } = await supabase
                    .from("profiles")
                    .select("no_of_tokens")
                    .eq("email", event.email)
                    .single();
                console.log({ userData })
                await supabase
                    .from("profiles")
                    .update({
                        no_of_tokens:
                            Number(userData?.no_of_tokens) +
                            Number(custom_data.number_of_token)
                    })
                    .eq("email", event.email)
            }
            break;
    }

    res.send({ recived: true, no_of_tokens_added: 0 });
};

export default handler;
