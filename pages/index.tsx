import { useUser } from "../context/UserContext";
import Stripe from "stripe";
import { Navbar, MetaData, Footer, FeedbackModal } from "../components";
import { useEffect, useState } from "react";
import {
  HeroSection,
  MeetTheDeveloper,
  WhatAmISolving,
} from "../modules/landingPage";
import { motion } from "framer-motion";

interface Props {
  products: Stripe.Price[];
}

const Home = ({ products }: Props) => {
  const { user, loading } = useUser();
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const [mousePosition, setMousePosition] = useState({
    x: -100,
    y: -100,
  });

  useEffect(() => {
    const mouseMove = (e: any) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x,
      y: mousePosition.y + 30,
    },
  };

  return (
    <>
      <MetaData />
      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
      />
      <Navbar products={products} />
      <main className=" overflow-hidden">
        <HeroSection />
        <WhatAmISolving />
        <MeetTheDeveloper />
        <Footer />
      </main>
      <motion.div
        className="h-2 w-2 bg-black fixed inset-0 pointer-events-none rounded-full"
        variants={variants}
        animate="default"
      ></motion.div>
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
