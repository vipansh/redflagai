import Link from "next/link";
import React from "react";
import { SignInWithGoogleButton } from "../../components";
import TextRedflagAI from "../../components/TextRedflagAI";
import { CircleSvg, FireSvg } from "../../svgs";

type Props = {};

const HeroSection = (props: Props) => {
  return (
    <section
      className=" relative w-full px-8 pt-16 pb-16 ml-auto mr-auto bg-top bg-cover sm:max-w-xl md:max-w-full md:px-24 lg:px-8 lg:py-24 lg:pb-32 "
      style={{ minHeight: "80vh" }}
    >
      <CircleSvg
        className="absolute inset-0 h-full w-full  top-10"
        clockWise={true}
      />
      <CircleSvg className="absolute inset-0 h-full w-full " />

      <div className="relative flex flex-col items-center justify-center mt-10">
        <Link href={"/"} className="flex space-x-2 items-center justify-center">
          <FireSvg className="block h-16 w-16" />
        </Link>
        <h1 className="text-4xl md:text-7xl font-bold mb-14 relative text-center text-zinc-700">
          Revolutionize your legal document review process with -
          <Link
            href={"/"}
            className="flex space-x-2 items-center justify-center m-1"
          >
            <TextRedflagAI />
          </Link>
        </h1>
        <h2 className="relative font-regular text-base text-zinc-500 tracking-wide mb-20 text-center max-w-3xl mx-auto antialiased">
          RedflagAi is an advanced tool powered by artificial intelligence that
          helps identify potential red flags and risks in terms and conditions.
          It makes it easier for individuals and businesses to stay informed and
          make informed decisions when entering into contracts or agreements.
        </h2>

        <div className="flex flex-col space-y-3">
          <div className="flex flex-wrap justify-center">
            <SignInWithGoogleButton />
          </div>
          <h1 className="mt-4 text-3xl font-semibold text-center ">
            New users, sign up now for <TextRedflagAI /> and get 3000 tokens for
            free!
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
