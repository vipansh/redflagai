// import { supabase } from "../../../utils/supabase";
import { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../../utils/supabase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.priceId) {
    return res.status(500).json({ error: "priceId missing" });
  }
  console.log(req.cookies);
  if (!req.cookies.token) {
    return res.status(500).json({ error: "Log in to continue" });
  }

  const {
    data: { session, user },
    error,
  } = await supabase.auth.refreshSession({
    refresh_token: req.cookies.token,
  });


  

  console.log(session, user, error);

  res.status(200).json({ user, id: "asd" });
};
export default handler;
