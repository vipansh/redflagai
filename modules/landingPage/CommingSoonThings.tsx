import React from "react";

type Props = {};

const CommingSoonThings = (props: Props) => {
  return (
    <section className="relative w-full px-8  pb-16 ml-auto mr-auto bg-top bg-cover sm:max-w-xl md:max-w-full md:px-24 lg:px-8  lg:pb-32">
      <div className="flex flex-col w-full ">
        <h1 className="text-5xl font-extrabold text-center lg:text-7xl 2xl:text-8xl">
          <span className="text-transparent bg-gradient-to-br bg-clip-text from-teal-500 via-indigo-500 to-sky-500 ">
            Exciting New Features
          </span>

          <span className="block text-transparent bg-gradient-to-tr bg-clip-text from-blue-500 via-pink-500 to-red-500 ">
            Coming Soon
          </span>
        </h1>

        <div className="max-w-2xl mx-auto text-center">
          <p className="max-w-3xl mx-auto mt-6 text-lg text-center text-gray-800  md:text-xl">
            Get ready for two powerful new tools that will make your life
            easier:
          </p>
          <div className="my-8">
            <h3 className="text-xl font-medium mb-2">
              1. Ask a Question for Terms and Conditions:
            </h3>
            <p className="text-base">
              Wondering if you can change data under any terms and conditions?
              Now you can easily get answers to these types of questions by
              asking our AI-powered legal expert.
            </p>
          </div>
          <div className="mb-8">
            <h3 className="text-xl font-medium mb-2">
              2. AI-Generated Terms and Conditions Templates:
            </h3>
            <p className="text-base">
              Our platform will{" "}
              <b>
                soon offer recommended terms and conditions templates for
                specific products generated by AI
              </b>
              , making it easier than ever to create legally compliant policies
              that protect your business.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommingSoonThings;
