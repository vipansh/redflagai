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

  const useToken = async () => {
    try {
      const data = await axios("/api/use-token", {
        params: {
          token_debited: 100,
          input: "input",
        },
      });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };
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

                <p className="mt-1.5 text-sm text-gray-700">{priceInDollars}</p>

                <form
                  className="mt-4"
                  action={`/api/checkout/${product.id}`}
                  method="POST"
                >
                  <button
                    // onClick={processSubscription(product.id)}
                    type="submit"
                    className="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105"
                  >
                    Buy for Rs. {priceInDollars}
                  </button>
                </form>
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={useToken}>use-token</button>
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
