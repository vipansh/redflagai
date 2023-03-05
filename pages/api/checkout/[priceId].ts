// import { supabase } from "../../../utils/supabase";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { supabase } from "../../../utils/supabase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.query.priceId) {
    return res.status(500).json({ error: "priceId missing" });
  }

  if (!req.cookies.token) {
    return res.status(500).json({ error: "Log in to continue" });
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(req.cookies.token);
  if (!user) return res.status(500).json({ error: "Log in again" });

  const { data: userData } = await supabase
    .from("profiles")
    .select("stripe_customer")
    .eq("id", user.id)
    .single();

  if (!userData) return res.status(500).json({ error: "No user found" });

  // stipe
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });
  const { priceId } = req.query;

  try {
    // Create Checkout Sessions from body params.
    const stripeSession = await stripe.checkout.sessions.create({
      customer: userData.stripe_customer,
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: priceId as string,
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:3000/?success=true`,
      cancel_url: `http://localhost:3000/?canceled=true`,
    });
    res.redirect(303, stripeSession.url as string);
  } catch (err) {
    res.status(500).json(err);
  }
};
export default handler;
