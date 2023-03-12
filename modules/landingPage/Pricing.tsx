import Script from "next/script";
import React from "react";
import { SignInWithGoogleButton } from "../../components";
import { PaddleLoader } from "../../components/PaddleLoader";
import TextRedflagAI from "../../components/TextRedflagAI";
import type { Product } from "../../types/paddle";
import { classNames } from "../../utils/classNames";

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

const Pricing = ({ products }: Props) => {
  console.log({ products });

  const productsList =
    products?.map((product, index) => {
      return { ...product, ...productAddOn[index] };
    }) || [];

  return (
    <>
      <PaddleLoader />
      <Script />
      <div>
        <div className="bg-white ">
          <div className="container px-6 py-8 mx-auto">
            <div className="my-4 text-6xl font-semibold text-center text-gray-800 capitalize lg:text-4xl ">
              Pricing
            </div>
            <p className="text-xl text-center text-gray-500 ">
              Let our software do the work for you by detecting potential legal
              red flags in no time. Don't wait, join today and start protecting
              yourself with <TextRedflagAI />!
            </p>

            <h1 className="mt-4 text-3xl font-semibold text-center text-gray-800 capitalize lg:text-4xl ">
              New users, sign up now for <TextRedflagAI /> and get 10,000 tokens
              for free!
            </h1>

            <div className="mt-6 space-y-8 xl:mt-12">
              {productsList.map((data, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between max-w-2xl px-2 md:px-8 py-4 mx-auto border cursor-help rounded-xl  ${
                    data.discount ? "border-blue-500" : ""
                  }`}
                >
                  <div className="flex flex-col items-start  space-y-1">
                    <h2 className="text-lg font-medium text-gray-700 sm:text-1xl ">
                      {data.title}
                    </h2>
                    {data.discount && (
                      <div className="px-2 text-xs text-blue-500 bg-gray-100 rounded-full sm:px-4 sm:py-1">
                        {data.discount}
                      </div>
                    )}
                  </div>

                  <h2
                    className={classNames(
                      "text-1xl font-semibold text-gray-500 sm:text-4xl  ",
                      index === 2 ? "text-blue-600" : ""
                    )}
                  >
                    {data.tokens} tokens{" "}
                    <span className="text-base font-medium block">
                      / (for{" "}
                      <span className="paddle-gross" data-product={data.id}>
                        {data.base_price}
                      </span>
                      )
                    </span>
                  </h2>
                </div>
              ))}

              <div className="flex justify-center ">
                <div className="bg-white rounded-lg">
                  <SignInWithGoogleButton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;
