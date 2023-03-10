import React, { Fragment } from "react";
import Stripe from "stripe";
import { Footer, MetaData, Navbar, PricingTabel } from "../components";
import axios from "axios";
import { ProductRes } from "../types/paddle";

type Props = {
  products: ProductRes;
};

const pricing = ({ products }: Props) => {
  return (
    <Fragment>
      <MetaData
        title="RedFlag AI Pricing "
        description="RedFlag AI's advanced algorithms can help identify areas in your pricing strategy that could be optimized. Don't leave money on the table. Try RedFlag AI today and maximize your profits"
      />

      <div className="m-auto h-screen my-auto">
        <Navbar products={products.response.products} />
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 py-16 text-center">
          Optimize Your Pricing Strategy with RedFlag AI
        </h1>
        <PricingTabel
          onClose={() => {}}
          products={products.response.products}
          heading={"Our plans for your strategies"}
        />
        <Footer />
      </div>
    </Fragment>
  );
};

export default pricing;

export const getStaticProps = async () => {
  const options = {
    method: "POST",
    url: "https://sandbox-vendors.paddle.com/api/2.0/product/get_products",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: {
      vendor_id: Number(process.env.NEXT_PUBLIC_PADDLE_SANDBOX),
      vendor_auth_code: process.env.NEXT_PUBLIC_PADDLE_SANDBOX_AUTH_CODE,
      country: "INR",
    },
  };
  console.log(
    "env",
    process.env.NEXT_PUBLIC_PADDLE_SANDBOX,
    process.env.NEXT_PUBLIC_PADDLE_SANDBOX_AUTH_CODE
  );
  try {
    const response = await axios.request(options);

    return {
      props: {
        products: response.data,
      },
    };
  } catch (error) {
    console.error({ error, d: "r" });
    return {
      props: {
        products: [],
      },
    };
  }
};
