import Head from "next/head";
import { useUser } from "../context/UserContext";
import Stripe from "stripe";
import { Navbar, SignInWithGoogleButton, MetaData } from "../components";
import Image from "next/image";
import redglagAppImage from "public/redflagApp.png";
import { motion } from "framer-motion";
import backgroundImage from "public/background.jpg";
interface Props {
  products: Stripe.Price[];
}

const Home = ({ products }: Props) => {
  const { user, loading } = useUser();

  return (
    <>
      <MetaData />
      <Navbar products={products} />

      <section className="relative py-10 overflow-hidden bg-slate-50 sm:py-32 hero-pattern">
        <Image
          alt=""
          {...backgroundImage}
          decoding="async"
          data-nimg="1"
          className="absolute top-0 left-1/2 max-w-none translate-x-[-30%] -translate-y-1/4"
          loading="lazy"
          style={{ color: "transparent" }}
        />

        <div className="container items-center max-w-6xl px-8 mx-auto xl:px-5">
          <div className="flex flex-wrap items-start sm:-mx-3 justify-start">
            <div className="w-full md:w-1/2 md:px-3">
              <div className="w-full pb-6 space-y-6 sm:max-w-md lg:max-w-lg md:space-y-4 lg:space-y-8 xl:space-y-9 sm:pr-5 lg:pr-0 md:pb-0">
                <motion.h1
                  initial={{ rotate: 0 }}
                  animate={{ rotate: -4 }}
                  transition={{ duration: 1 }}
                  className="my-4 text-3xl md:text-5xl  opacity-75 font-bold leading-tight text-center md:text-left"
                >
                  Revolutionize your legal document review process with -
                  <span className="mx-1 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                    RedFlagAI
                  </span>
                </motion.h1>
                <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left">
                  the AI-powered tool that detects red flags in terms and
                  conditions!
                </p>
                {!loading && (
                  <div className="relative flex flex-col sm:flex-row sm:space-x-4 ">
                    <SignInWithGoogleButton />
                  </div>
                )}
              </div>
            </div>
            <div className="w-full md:w-1/2 relative">
              <motion.img
                initial={{ rotate: 0 }}
                animate={{ rotate: 4 }}
                transition={{ duration: 1 }}
                className=" absolute top-0 left-0 object-cover object-left-top"
                alt="redflag AI"
                {...redglagAppImage}
              />
            </div>
          </div>
        </div>
      </section>
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
