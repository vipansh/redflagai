import Head from "next/head";
import { useUser } from "../context/UserContext";
import Stripe from "stripe";
import { Navbar } from "../components";
import Image from "next/image";
import RedglagAppImage from "public/RedflagApp.png";

interface Props {
  products: Stripe.Price[];
}

const Home = ({ products }: Props) => {
  const { user, loading } = useUser();

  return (
    <>
      <Head>
        <title>Red flag ai</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!loading
        ? user
          ? `Number of toklens : ${user?.no_of_tokens} `
          : "LoginIn"
        : "Loading"}

      <Navbar products={products} />

      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="my-4 text-3xl md:text-5xl  opacity-75 font-bold leading-tight text-center md:text-left">
              Revolutionize your legal document review process with -
              <span className="mx-1 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
                ReadFlagAI
              </span>
            </h1>
            <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left">
              the AI-powered tool that detects red flags in terms and
              conditions.!
            </p>
            <div className="flex justify-center">
              <div className="bg-gray-50 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
                <button
                  className=" flex space-x-3 border px-8 py-3 rounded-lg"
                  type="button"
                >
                  <Image
                    width={18}
                    height={18}
                    className="h-6 w-6"
                    alt="googl_icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  />{" "}
                  <div>Sign in with Google</div>
                </button>
              </div>
            </div>
          </div>
          <div className="relative lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <Image
              className="absolute object-cover object-center rounded"
              alt="hero"
              src={RedglagAppImage.src}
              width={500}
              height={500}
            />
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
