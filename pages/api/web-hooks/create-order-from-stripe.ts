// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let event = "asdf";

  // Handle the event
  //   switch (event) {
  //     case "checkout.session.async_payment_failed":
  //       const checkoutSessionAsyncPaymentFailed = event.data.object;
  //       // Then define and call a function to handle the event checkout.session.async_payment_failed
  //       break;
  //     case "checkout.session.async_payment_succeeded":
  //       const checkoutSessionAsyncPaymentSucceeded = event.data.object;
  //       // Then define and call a function to handle the event checkout.session.async_payment_succeeded
  //       break;
  //     case "checkout.session.completed":
  //       const checkoutSessionCompleted = event.data.object;
  //       // Then define and call a function to handle the event checkout.session.completed
  //       break;
  //     case "checkout.session.expired":
  //       const checkoutSessionExpired = event.data.object;
  //       // Then define and call a function to handle the event checkout.session.expired
  //       break;
  //     // ... handle other event types
  //     default:
  //       console.log(`Unhandled event type ${event.type}`);
  //   }

  // Return a 200 response to acknowledge receipt of the event
  console.log("hey  stripe webhook called", req);
  res.send({ recivrd: true });
}
