import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactConfetti from "react-confetti";
import { useRouter } from "next/router";
import { Toaster, toast } from "react-hot-toast";

type Props = {};
const duration = 4.5;
const colors = ["#FFB900", "#D83B01", "#B31510", "#7C1E12", "#581845"];

const Confetti = ({}: Props) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const router = useRouter();

  const startConfetti = () => {
    setShowConfetti(true);

    setTimeout(() => {
      setShowConfetti(false);
      router.push("/dashboard/check");
    }, duration * 1000);
  };

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
      startConfetti();
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
      toast("Something went wrong", {
        icon: "❌",
      });
      router.push("/dashboard/check");
    }
  }, []);
  return (
    <>
      <AnimatePresence>{showConfetti && <ReactConfetti />}</AnimatePresence>
    </>
  );
};

export default Confetti;
