import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { classNames } from "../utils/classNames";
import { CrossSvg } from "../svgs";
import { Product } from "../types/paddle";
import { useUser } from "../context/UserContext";
import { PaddleLoader } from "./PaddleLoader";
import Script from "next/script";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

interface PricingTabelProps {
  products?: Product[];
  onClose: () => void;
  heading?: string;
}

declare global {
  interface Window {
    onPaddleSuccess: () => void;
    onPaddleClose: () => void;
  }
}

type Props = {
  products: Product[] | undefined;
};

const productAddOn = [
  {
    title: "Standard Package",
    tokens: "1000",
  },
  {
    title: "Mid-tier Package",
    tokens: "6000",
    discount: "Save 16%",
  },
  {
    title: "Plus Package",
    tokens: "13000",
    discount: "Save 23%",
  },
];

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
  const router = useRouter();
  const { user, loading } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const productsList =
    products?.map((product, index) => {
      return { ...product, ...productAddOn[index] };
    }) || [];

  const onUpgradeClick = (id: number, name: string) => {
    if (!loading && !user) {
      toast("You need to login first", {
        icon: "❌",
      });
      return;
    }

    const [amount] = name.split(" ");

    const passthrough = {
      userId: user.id,
    };
    setIsLoading(true);
    window.onPaddleSuccess = function () {
      window.location.href = "/dashboard/check?success=true";
    };
    window.onPaddleClose = function () {
      setIsLoading(false);
    };
    Paddle.Checkout.open({
      product: Number(id),
      email: user.email,
      disableLogout: true,
      passthrough: JSON.stringify(passthrough),
      closeCallback: "onPaddleClose",
      successCallback: "onPaddleSuccess",
      customData: JSON.stringify({ number_of_token: amount }),
    });
  };

  return (
    <>
      <PaddleLoader />
      <Script />
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
        <CrossSvg className="h-8 w-8 bg-slate-50 rounded-full p-2" />
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mx-auto px-4 py-8 max-w-screen-lg">
          {productsList?.map((data, index) => {
            const position = getPosition(index);
            return (
              <motion.button
                key={data.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className={
                  "relative overflow-hidden flex flex-col items-center justify-between w-full h-full bg-white border-2 border-gray-200 rounded-lg shadow-sm hover:shadow-lg focus:outline-none focus:ring focus:ring-blue-200 p-4"
                }
                onClick={() => {
                  onUpgradeClick(data.id, data.name);
                }}
                disabled={isLoading}
                whileHover={{ translateY: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className="absolute -inset-0.5 bg-blue-50 transform skew-x-45"
                  style={{ zIndex: -1, filter: "blur(10px)" }}
                ></div>
                <h2 className="text-lg font-medium text-gray-700">
                  {data?.title}
                </h2>
                {data?.discount && (
                  <div className="px-2 py-1 mt-2 text-xs text-blue-500 bg-gray-100 rounded-full">
                    {data?.discount}
                  </div>
                )}
                <h2 className="text-xl font-semibold text-gray-500 mt-2">
                  {data?.tokens} tokens{" "}
                  <span className="text-base font-medium block">
                    / (for{" "}
                    <span className="paddle-gross" data-product={data.id}>
                      {data.currency} {data.base_price}
                    </span>
                    )
                  </span>
                </h2>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </>
  );
};

export default PricingTabel;
