import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Stripe from "stripe";
import { classNames } from "../utils/classNames";
import { CrossSvg } from "../svgs";

interface PricingTabelProps {
  products?: Stripe.Price[];
  onClose: () => void;
  heading?: string;
}

const getPosition = (index: number) => {
  switch (index) {
    case 0:
      return { initial: { x: "100vw" }, animate: { x: 0 } }; // right
    case 2:
      return { initial: { x: "-100vw" }, animate: { x: 0 } }; // left
    case 1:
      return { initial: { x: 0 }, animate: { x: 0 } }; // center
    default:
      return { initial: { x: 0 }, animate: { x: 0 } }; // default to center
  }
};

const PricingTabel: React.FC<PricingTabelProps> = ({
  products,
  onClose,
  heading,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (id: string) => {
    setLoading(true);

    try {
      const response = await axios(`/api/checkout/${id}`, {
        params: {
          base_url:
            `${process?.env?.NEXT_PUBLIC_VERCEL_UR}/dashboard/check` ||
            "https://redflagai.vercel.app/dashboard/check/",
        },
      });
      const { data } = response;
      console.log(data);
      if (data && data.stripeSession && data.stripeSession.url) {
        window.location.href = data.stripeSession.url;
      }
    } catch (error) {
      console.log(error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };
  console.log({ products });

  return (
    <>
      <motion.div
        className="absolute cursor-pointer -top-1 -right-1  p-1 "
        onClick={onClose}
        tabIndex={0}
        initial={{ top: 40, opacity: 0 }}
        animate={{ top: -50, opacity: 1 }}
        exit={{ top: 40, opacity: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <CrossSvg />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full rounded-lg  my-3 "
      >
        <p className="text-base text-gray-700 md:text-lg text-center my-1">
          {heading ? heading : "Out of tokens"}
        </p>
        <p className="text-base text-gray-700 md:text-lg text-center my-1">
          Choose the package that fits your needs best.
        </p>
        <div className="grid max-w-md gap-10 row-gap-5 lg:max-w-screen-lg sm:row-gap-10 lg:grid-cols-3 xl:max-w-screen-lg sm:mx-auto h-auto overflow-y-auto p-4">
          {products?.map((product, index) => {
            const priceInCents = product?.unit_amount ?? 0;
            const priceInRupee = priceInCents / 100;
            const position = getPosition(index);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, ...position.initial }}
                animate={{ opacity: 1, ...position.animate }}
                transition={{ duration: 0.5 }}
                className={classNames(
                  index === 1 ? "border-yellow-500" : "",
                  " relative block overflow-hidden flex-grow-1 border rounded-md "
                )}
              >
                <form action={`/api/checkout/${product.id}`} method="POST">
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

                    <p className="mt-1.5 text-sm text-gray-700 py-3">
                      {product?.metadata?.para}
                    </p>

                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105 disabled:bg-yellow-100 disabled:cursor-not-allowed"
                      whileTap={{ scale: 0.9 }}
                    >
                      Buy for Rs. {priceInRupee}/-
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

export default PricingTabel;