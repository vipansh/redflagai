import { useUser } from "../context/UserContext";
import { Navbar, MetaData, Footer, FeedbackModal } from "../components";
import { useEffect, useState } from "react";
import {
  HeroSection,
  MeetTheDeveloper,
  WhatAmISolving,
} from "../modules/landingPage";
import { motion } from "framer-motion";
import axios from "axios";
import { ProductRes } from "../types/paddle";

interface Props {
  products: ProductRes;
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
  console.log({ products: products.response.products });
  return (
    <>
      <MetaData />
      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
      />
      <Navbar products={products.response.products} />
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
  const options = {
    method: "POST",
    url: "https://sandbox-vendors.paddle.com/api/2.0/product/get_products",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: {
      vendor_id: Number(process.env.NEXT_PUBLIC_PADDLE_SANDBOX),
      vendor_auth_code: process.env.NEXT_PUBLIC_PADDLE_SANDBOX_AUTH_CODE,
      country: "INR",
    },
  };
  console.log(
    "env",
    process.env.NEXT_PUBLIC_PADDLE_SANDBOX,
    process.env.NEXT_PUBLIC_PADDLE_SANDBOX_AUTH_CODE
  );
  try {
    const response = await axios.request(options);

    return {
      props: {
        products: response.data,
      },
    };
  } catch (error) {
    console.error({ error, d: "r" });
    return {
      props: {
        products: [],
      },
    };
  }
};
