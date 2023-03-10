import React from "react";
import { SignInWithGoogleButton } from "../../components";
import TextRedflagAI from "../../components/TextRedflagAI";

type Props = {};

const Pricing = (props: Props) => {
  return (
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
            New users, sign up now for <TextRedflagAI /> and get 3000 tokens for
            free!
          </h1>

          <div className="mt-6 space-y-8 xl:mt-12">
            <div className="flex items-center justify-between max-w-2xl px-8 py-4 mx-auto border cursor-pointer rounded-xl ">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400 sm:h-9 sm:w-9"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>

                <div className="flex flex-col items-center mx-5 space-y-1">
                  <h2 className="text-lg font-medium text-gray-700 sm:text-2xl ">
                    Standard Package
                  </h2>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-gray-500 sm:text-4xl ">
                ₨ 100
                <span className="text-base font-medium">
                  / (for 1000 tokens)
                </span>
              </h2>
            </div>

            <div className="flex items-center justify-between max-w-2xl px-8 py-4 mx-auto border cursor-pointer rounded-xl ">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400 sm:h-9 sm:w-9"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>

                <div className="flex flex-col items-center mx-5 space-y-1">
                  <h2 className="text-lg font-medium text-gray-700 sm:text-2xl ">
                    Mid-tier Package
                  </h2>
                  <div className="px-2 text-xs text-blue-500 bg-gray-100 rounded-full sm:px-4 sm:py-1  ">
                    Save 26%
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-gray-500 sm:text-4xl ">
                ₨ 500{" "}
                <span className="text-base font-medium">
                  / (for 6000 tokens)
                </span>
              </h2>
            </div>

            <div className="flex items-center justify-between max-w-2xl px-8 py-4 mx-auto border border-blue-500 cursor-pointer rounded-xl">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-400 sm:h-9 sm:w-9"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clip-rule="evenodd"
                  />
                </svg>

                <div className="flex flex-col items-center mx-5 space-y-1">
                  <h2 className="text-lg font-medium text-gray-700 sm:text-2xl ">
                    Plus Package
                  </h2>
                  <div className="px-2 text-xs text-blue-500 bg-gray-100 rounded-full sm:px-4 sm:py-1 ">
                    Save 23%
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-semibold text-blue-600 sm:text-4xl">
                ₨ 1000{" "}
                <span className="text-base font-medium">
                  / (for 13,000 tokens)
                </span>
              </h2>
            </div>

            <div className="flex justify-center ">
              <div className="bg-white rounded-lg">
                <SignInWithGoogleButton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
