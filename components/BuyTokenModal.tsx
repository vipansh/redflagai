import React, { useState } from "react";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import Stripe from "stripe";
import Modal from "./Modal";
import { classNames } from "../utils/classNames";

interface BuyTokenModalProps {
  products?: Stripe.Price[];
  isOpen: boolean;
  onClose: () => void;
}

const BuyTokenModal: React.FC<BuyTokenModalProps> = ({
  products,
  isOpen,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (id: string) => {
    setLoading(true);

    try {
      const response = await axios.post(`/api/checkout/${id}`, {
        params: {
          base_url: "http://localhost:3000/dashboard",
        },
      });
      const { data } = response;
      if (data && data.stripeSession && data.stripeSession.url) {
        window.location.href = data.stripeSession.url;
      }
    } catch (error) {
      console.error(error);
      // Handle error
    } finally {
      setLoading(false);
    }
  };
  console.log({ products });
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 md:h-3/4 md:scroll-m-1 overflow-y-scroll"
      >
        <div className="">
          <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
            <span className="relative inline-block">
              <motion.svg
                viewBox="0 0 52 24"
                fill="currentColor"
                className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
                variants={{
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                }}
                initial="initial"
                animate="animate"
              >
                <defs>
                  <motion.pattern
                    id="7e5e8ff8-1960-4094-a63a-2a0c0f922d69"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                    variants={{
                      initial: { x: -20, opacity: 0 },
                      animate: { x: 0, opacity: 1 },
                    }}
                  >
                    <circle cx="1" cy="1" r=".7" />
                  </motion.pattern>
                </defs>
                <motion.rect
                  fill="url(#7e5e8ff8-1960-4094-a63a-2a0c0f922d69)"
                  width="52"
                  height="24"
                  variants={{
                    initial: { opacity: 0 },
                    animate: { opacity: 1 },
                  }}
                />
              </motion.svg>

              <span className="relative flex text-center items-center">
                Transparent pricing.
                <br /> Pay as you grow.
              </span>
            </span>
          </h2>
          <p className="text-base text-gray-700 md:text-lg text-center my-1">
            Choose the package that fits your needs best.
          </p>
        </div>
        <div className="grid max-w-md gap-10 row-gap-5 lg:max-w-screen-lg sm:row-gap-10 lg:grid-cols-3 xl:max-w-screen-lg sm:mx-auto">
          {products?.map((product, index) => {
            const priceInCents = product?.unit_amount ?? 0;
            const priceInRupee = priceInCents / 100;
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={classNames(
                  index === 1 ? "border-yellow-500" : "",
                  "relative block overflow-hidden flex-grow-1 border rounded-md"
                )}
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

                  <p className="mt-1.5 text-sm text-gray-700 py-3">
                    {product?.metadata?.para}
                  </p>

                  <motion.button
                    onClick={() => {
                      handleSubmit(product.id);
                    }}
                    className="block w-full rounded bg-yellow-400 p-4 text-sm font-medium transition hover:scale-105"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {loading ? "loading" : `Buy for Rs. ${priceInRupee}`}
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </Modal>
  );
};

export default BuyTokenModal;
