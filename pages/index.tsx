import Head from "next/head";
import { useUser } from "../context/UserContext";
import Stripe from "stripe";
import {
  Navbar,
  SignInWithGoogleButton,
  MetaData,
  Footer,
} from "../components";
import Image from "next/image";
import redglagAppImage from "public/redflagApp.png";
import { motion } from "framer-motion";
import backgroundImage from "public/background.jpg";
import TextRedflagAI from "../components/TextRedflagAI";
import { CircleSvg, FireSvg } from "../svgs";
import Link from "next/link";
interface Props {
  products: Stripe.Price[];
}

const Home = ({ products }: Props) => {
  const { user, loading } = useUser();

  return (
    <>
      <MetaData />
      <Navbar products={products} />

      <section
        className="relative pt-10 flex flex-col items-center justify-center md:px-8"
        style={{ height: "80vh" }}
      >
        <CircleSvg className="absolute inset-0 h-full w-full  top-10" />
        <CircleSvg className="absolute inset-0 h-full w-full " />

        <div className="relative flex flex-col items-center justify-center mt-10">
          <Link
            href={"/"}
            className="flex space-x-2 items-center justify-center"
          >
            <FireSvg className="block h-8 w-auto" />
            <TextRedflagAI />
          </Link>
          <h1 className="text-4xl md:text-7xl font-bold mb-14 relative text-center text-zinc-700">
            Revolutionize your legal document review process with -
            <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-pink-500 z-10">
              <TextRedflagAI />
            </span>
          </h1>
          <h2 className="relative font-regular text-base text-zinc-500 tracking-wide mb-20 text-center max-w-3xl mx-auto antialiased">
            RedflagAi is an advanced tool powered by artificial intelligence
            that helps identify potential red flags and risks in terms and
            conditions. It makes it easier for individuals and businesses to
            stay informed and make informed decisions when entering into
            contracts or agreements.
          </h2>
        </div>

        <div className="flex flex-wrap justify-center">
          <SignInWithGoogleButton />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;

export const getStaticProps = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2022-11-15",
  });

  const products = await stripe.prices.list();
  const productList = products.data.sort((a, b) => {
    const aDivideBy = a.transform_quantity?.divide_by ?? 1;
    const bDivideBy = b.transform_quantity?.divide_by ?? 1;
    return aDivideBy - bDivideBy;
  });

  return {
    props: {
      products: productList,
    },
  };
};
