import Image from "next/image";
import Link from "next/link";
import { FlagSvg, MoneySvg } from "../svgs";
import TextRedflagAI from "./TextRedflagAI";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
      <Link href="/" className="flex space-x-3">
        <MoneySvg />
        <h1 className="sm:text-4xl text-2xl font-bold ml-2 tracking-tight">
          <TextRedflagAI />
        </h1>
      </Link>
      <a
        href="https://vercel.com/templates/next.js/twitter-bio"
        target="_blank"
        rel="noreferrer"
      >
        <FlagSvg />
      </a>
    </header>
  );
}
