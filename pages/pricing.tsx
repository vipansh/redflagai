import React, { Fragment } from "react";
import Stripe from "stripe";
import { Footer, MetaData, Navbar, PricingTabel } from "../components";

type Props = {
  products: Stripe.Price[];
};

const pricing = ({ products }: Props) => {
  return (
    <Fragment>
      <MetaData
        title="RedFlag AI Pricing "
        description="RedFlag AI's advanced algorithms can help identify areas in your pricing strategy that could be optimized. Don't leave money on the table. Try RedFlag AI today and maximize your profits"
      />
      <div className="m-auto h-screen my-auto">
        <Navbar products={products} />
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 py-16 text-center">
          Optimize Your Pricing Strategy with RedFlag AI
        </h1>
        <PricingTabel
          onClose={() => {}}
          products={products}
          heading={"Our plans for your strategies"}
        />
        <Footer />
      </div>
    </Fragment>
  );
};

export default pricing;

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
