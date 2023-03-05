// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { getServiceSupabase } from "../../../utils/supabase";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });
  //   const signature = req.headers["stripe-signature"] as string;
  const signingSecret = process.env.STRIPE_SIGNING_SECRET as string;
  //   const reqBuffer = await buffer(req);

  let event = req.body;

  const supabase = getServiceSupabase();

  // Handle the event
  switch (event.type) {
    case "checkout.session.async_payment_failed":
      const checkoutSessionAsyncPaymentFailed = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_failed
      break;
    case "checkout.session.async_payment_succeeded":
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;

      // Then define and call a function to handle the event checkout.session.async_payment_succeeded
      break;
    case "checkout.session.completed":
      const checkoutSessionCompleted = event.data.object;
      const { data: userData } = await supabase
        .from("profiles")
        .select("no_of_tokens")
        .eq("stripe_customer", event.data.object.customer)
        .single();

      const { data, error } = await supabase
        .from("profiles")
        .update({
          no_of_tokens: userData?.no_of_tokens + 100,
        })
        .eq("stripe_customer", event.data.object.customer);
      res.send({ no_of_tokens_added: 100, userData, data, error, event });
      break;
    case "checkout.session.expired":
      const checkoutSessionExpired = event.data.object;
      // Then define and call a function to handle the event checkout.session.expired
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
      res.send({ recived: true });
  }
  res.send({ recived: supabase, event });
};

export default handler;
