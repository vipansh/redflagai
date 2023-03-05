// import { supabase } from "../../../utils/supabase";
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../utils/supabase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { token_debited, input } = req.query as {
    token_debited: string;
    input: string;
  };
  if (!token_debited) {
    console.log("Amount is missing");
    return res.status(500).json({ error: "Amount is missing" });
  }

  if (!req.cookies.token) {
    return res.status(500).json({ error: "Log in to continue" });
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(req.cookies.token);
  if (!user)
    return res.status(500).json({ status: false, error: "Log in again" });
  if (error) return res.status(500).json({ error });

  const { data: userData } = await supabase
    .from("profiles")
    .select("no_of_tokens")
    .eq("id", user.id)
    .single();

  if (!userData)
    return res.status(500).json({ status: false, error: "No user found" });
  const { error: updateError } = await supabase
    .from("profiles")
    .update({
      no_of_tokens: userData?.no_of_tokens - +token_debited,
    })
    .eq("id", user.id);

  if (updateError)
    return res.status(500).json({
      status: false,
      error: updateError,
      message: "no data in profiles",
    });

  const { data: upsertData, error: upsertError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      token_debited: +token_debited,
      input,
    });

  if (upsertError)
    return res.status(500).json({
      status: false,
      error: updateError,
      upsertData: upsertData,
      message: "unable to update orders",
    });

  res.send({ status: true, amountReducedBy: token_debited, order: upsertData });
};
export default handler;
