import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { supabase } from "../../utils/supabase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.query.API_ROUTE_SECRET !== process.env.API_ROUTE_SECRET) {
    return res.status(401).send("Ja na  yha sa kahi or time waste kr");
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    return res.status(500).json({ error: "Stripe secret key not found" });
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: "2022-11-15",
  });

  const customer = await stripe.customers.create({
    email: req.body.record.email,
  });
  await supabase
    .from("profiles")
    .update({
      stripe_customer: customer.id,
    })
    .eq("id", req.body.record.id);
  res.send({ message: `Stripe customer id created: ${customer.id}` });
};

export default handler;
