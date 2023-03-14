import React from "react";
import background from "public/background.jpg";

type Props = {};

const features = [
  // {
  //   name: "Login",
  //   description:
  //     "Log in to Redflag AI with your Google account to start checking your project's terms and conditions for problematic language or clauses.",
  // },
  {
    name: "Copy and paste T&C",
    description:
      "Copy and paste your project's terms and conditions into our platform to check for any problematic language or clauses using Redflag AI.",
  },
  {
    name: "Check for Redflags",
    description:
      "Click the 'Check for Redflags' button to scan your project's terms and conditions for any problematic language or clauses using Redflag AI.",
  },
];

const WhatAmISolving = (props: Props) => {
  return (
    <>
      <section className="min-h-screen  relative w-full px-8 pt-16 pb-16 ml-auto mr-auto bg-top bg-cover sm:max-w-xl md:max-w-full md:px-24 lg:px-8 lg:py-24 lg:pb-32">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${background.src})`,
            opacity: 0.5,
            zIndex: -1,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            filter: "blur(5px)",
          }}
        />
        <div className="relative pt-10 flex flex-col items-center justify-center md:px-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-4 text-center">
              What am I trying to solve
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              With Redflag AI, I am solving the problem of legal compliance in
              project documentation. Often, it can be difficult to ensure that
              your terms and conditions are up-to-date and legally sound,
              especially as laws and regulations change over time. Redflag AI
              makes it easy to identify any major red flags in your
              documentation so that you can rest assured that your project is
              legally protected.
            </p>
          </div>
        </div>
        <div className="mx-auto  px-4 py-8 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto  lg:text-center">
              <h2 className="text-2xl font-bold mb-4">How to use</h2>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                Redflag AI makes it incredibly easy to check for any problematic
                language or clauses in your project's terms and conditions. You
                can get started in just a few simple steps.
              </p>
            </div>
            <div className="mx-auto mt-8 sm:mt-16">
              <dl className="grid grid-cols-1 gap-y-10 gap-x-16 sm:grid-cols-2 lg:grid-cols-2 lg:gap-y-16">
                {features.map((feature, index) => (
                  <div key={feature.name} className="relative px-1 mx-1">
                    <div className="text-base font-semibold text-gray-900 flex space-x-2 items-center justify-start">
                      <div className="flex h-10 w-10 items-center justify-center ">
                        {index === 0 && "1️⃣"}
                        {index === 1 && "2️⃣"}
                        {index === 2 && "3️⃣"}
                      </div>
                      <div className="ml-4">{feature.name}</div>
                    </div>
                    <div className="mt-2 text-base leading-7 text-gray-600">
                      {feature.description}
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhatAmISolving;
