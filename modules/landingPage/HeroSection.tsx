import Link from "next/link";
import React from "react";
import { SignInWithGoogleButton } from "../../components";
import TextRedflagAI from "../../components/TextRedflagAI";
import { CircleSvg, FireSvg } from "../../svgs";

type Props = {};

const HeroSection = (props: Props) => {
  return (
    <section
      className="relative pt-10 flex flex-col items-center justify-center md:px-8"
      style={{ height: "80vh" }}
    >
      <CircleSvg className="absolute inset-0 h-full w-full  top-10" />
      <CircleSvg className="absolute inset-5 h-full w-full " />

      <div className="relative flex flex-col items-center justify-center mt-10">
        <Link href={"/"} className="flex space-x-2 items-center justify-center">
          <FireSvg className="block h-8 w-auto" />
          <TextRedflagAI />
        </Link>
        <h1 className="text-4xl md:text-7xl font-bold mb-14 relative text-center text-zinc-700">
          Revolutionize your legal document review process with -
          <Link
            href={"/"}
            className="flex space-x-2 items-center justify-center m-1"
          >
            <FireSvg className="block h-16 w-16" />
            <TextRedflagAI />
          </Link>
        </h1>
        <h2 className="relative font-regular text-base text-zinc-500 tracking-wide mb-20 text-center max-w-3xl mx-auto antialiased">
          RedflagAi is an advanced tool powered by artificial intelligence that
          helps identify potential red flags and risks in terms and conditions.
          It makes it easier for individuals and businesses to stay informed and
          make informed decisions when entering into contracts or agreements.
        </h2>
      </div>

      <div className="flex flex-wrap justify-center">
        <SignInWithGoogleButton />
      </div>
    </section>
  );
};

export default HeroSection;
