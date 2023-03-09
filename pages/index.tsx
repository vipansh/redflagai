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
            <Link
              href={"/"}
              className="flex space-x-2 items-center justify-center m-1"
            >
              <FireSvg className="block h-16 w-16" />
              <TextRedflagAI />
            </Link>
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

      <section className="relative w-full bg-white">
        <div className="absolute inset-0 w-full h-full opacity-25 sm:opacity-50">
          <motion.svg
            className="absolute top-0 right-0 w-auto h-full opacity-75"
            viewBox="0 0 150 350"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            animate={{
              x: [-20, 20, -20],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "linear",
            }}
          >
            <defs>
              <path d="M0 0h50v50H0z"></path>
              <path d="M0 0h50v50H0z"></path>
              <path d="M0 0h150v150H0z"></path>
            </defs>
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g>
                <g fill="#DEB9FF" fill-rule="nonzero">
                  <path d="M25 25c13.807 0 25-11.193 25-25H0c0 13.807 11.193 25 25 25z"></path>
                </g>
                <g transform="translate(0 100)">
                  <mask fill="#fff">
                    <use xlinkHref="#path-1"></use>
                  </mask>
                  <path
                    d="M25 0c13.807 0 25 11.193 25 25S38.807 50 25 50H0V0h25z"
                    fill="#F9C7FF"
                    mask="url(#mask-2)"
                  ></path>
                </g>
                <g transform="translate(100 100)">
                  <mask fill="#fff">
                    <use xlinkHref="#path-3"></use>
                  </mask>
                  <path
                    d="M25 25c13.807 0 25-11.193 25-25H0c0 13.807 11.193 25 25 25z"
                    fill="#93FFFD"
                    fill-rule="nonzero"
                    mask="url(#mask-4)"
                  ></path>
                </g>
                <g transform="translate(0 200)">
                  <mask fill="#fff">
                    <use xlinkHref="#path-5"></use>
                  </mask>
                  <path
                    d="M75 75c0 41.421 33.579 75 75 75V0c-41.421 0-75 33.579-75 75z"
                    fill="#93FFFD"
                    fill-rule="nonzero"
                    mask="url(#mask-6)"
                  ></path>
                </g>
              </g>
            </g>
          </motion.svg>
          <motion.svg
            className="absolute top-0 left-0 w-auto h-full opacity-30"
            viewBox="0 0 150 150"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            animate={{
              x: [-20, 20, -20],
            }}
            transition={{
              repeat: Infinity,
              duration: 3,
              ease: "linear",
            }}
          >
            <defs>
              <path d="M0 0h50v50H0z"></path>
              <path d="M0 0h50v50H0z"></path>
            </defs>
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g transform="matrix(-1 0 0 1 150 0)">
                <g
                  transform="translate(0 25)"
                  fill="#93FFFD"
                  fill-rule="nonzero"
                >
                  <path d="M25 0C11.193 0 0 11.193 0 25h50C50 11.193 38.807 0 25 0z"></path>
                </g>
                <path
                  d="M25 50C11.193 50 0 38.807 0 25S11.193 0 25 0h25v50H25z"
                  transform="translate(100)"
                  fill="#DEB9FF"
                ></path>
                <g transform="translate(0 100)">
                  <mask fill="#fff">
                    <use xlinkHref="#path-1"></use>
                  </mask>
                  <path
                    d="M25 50C11.193 50 0 38.807 0 25S11.193 0 25 0h25v50H25z"
                    fill="#B3EBFF"
                    mask="url(#mask-2)"
                  ></path>
                </g>
                <g transform="translate(100 200)">
                  <mask fill="#fff">
                    <use xlinkHref="#path-3"></use>
                  </mask>
                  <path
                    d="M25 50C11.193 50 0 38.807 0 25S11.193 0 25 0h25v50H25z"
                    fill="#93FFFD"
                    mask="url(#mask-4)"
                  ></path>
                </g>
              </g>
            </g>
          </motion.svg>
        </div>
        <div className="relative w-full px-8 pt-16 pb-16 ml-auto mr-auto bg-top bg-cover sm:max-w-xl md:max-w-full md:px-24 lg:px-8 lg:py-24 lg:pb-32">
          <div className="max-w-xl mb-10 ml-auto mr-auto bg-top bg-cover md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
            <div className="max-w-2xl mb-6 ml-auto mr-auto font-sans tracking-tight text-gray-900 bg-top bg-cover sm:text-4xl md:mx-auto">
              <p className="inline max-w-lg font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                Meet the developer behind this project
              </p>
            </div>
            <p className="text-base text-gray-700 md:text-lg">
              Hello there, I'm Vipash Thakur, and I'm the mastermind behind this
              amazing SaaS project! As a front-end developer, I've poured all of
              my creativity and passion into making this project a success. And
              the best part? I didn't have to argue with anyone on my team about
              design choices or feature implementations! Just me, my laptop, and
              a lot of coffee. So if you love this project, you know who to
              thank (and if you don't, just blame the coffee).
            </p>
            <button className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase bg-purple-600 rounded-full text-purple-50">
              Please, tell me how much you hated it. <br />
              <span className="px-3 py-1"> Leave a review</span>
            </button>
          </div>
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
