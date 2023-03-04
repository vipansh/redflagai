import Head from "next/head";
import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import Stripe from "stripe";
import axios, { AxiosRequestHeaders } from "axios";
import { loadStripe } from "@stripe/stripe-js";

interface Props {
  products: Stripe.Price[];
}

const Home = ({ products }: Props) => {
  const { user, loading } = useUser();
  console.log({ user, loading, products });

  const processSubscription = (priceId: string) => async () => {
    try {
      let key = process.env.NEXT_PUBLIC_STRIPE_KEY;
      const { data } = await axios.get(`/api/checkout/${priceId}`);
      if (key) {
        const stripe = await loadStripe(key);
        if (stripe) await stripe.redirectToCheckout({ sessionId: data.id });
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Red flag ai</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!loading
        ? user
          ? `Number of toklens : ${user.no_of_tokens} `
          : "LoginIn"
        : "Loading"}

      {}
      <div className="flex space-x-3 ">
        {products.map((product, index) => {
          const priceInCents = product?.unit_amount ?? 0;
          const priceInDollars = priceInCents / 100;
          return (
            <div
              className="group relative block overflow-hidden flex-grow-1"
              key={product.id}
            >
              <div className="relative border border-gray-100 bg-white p-6">
                {index === 1 ? (
                  <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium">
                    Popular{" "}
                  </span>
                ) : (
                  <span className="whitespace-nowrap  px-3 py-1.5 text-xs font-medium"></span>
                )}

                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Buy {product?.transform_quantity?.divide_by} tokens
                </h3>

                <p className="mt-1.5 text-sm text-gray-700">
                  ${priceInDollars}
                </p>

                <form className="mt-4">
                  <button
                    onClick={processSubscription(product.id)}
                    className="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105"
                  >
                    Buy for {priceInDollars}$
                  </button>
                </form>
              </div>
            </div>
          );
        })}
      </div>

      <form action="/api/checkout-session" method="POST">
        <button type="submit" role="link">
          Checkout
        </button>
      </form>
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });

  const products = await stripe.prices.list();
  const productList = products.data.sort((a, b) => {
    const aDivideBy = a.transform_quantity?.divide_by ?? 1;
    const bDivideBy = b.transform_quantity?.divide_by ?? 1;
    return aDivideBy - bDivideBy;
  });

  return {
    props: {
      products: productList,
    },
  };
};
