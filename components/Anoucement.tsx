import React, { useState, useEffect } from "react";
import { CrossSvg } from "../svgs";
import Modal from "./Modal";
import { AnimatePresence, motion } from "framer-motion";
import { useUser } from "../context/UserContext";
import ResizablePanel from "./ResizablePanel";
import { supabase } from "../utils/supabase";
import storage from "../utils/storage";
import AnoucementModal from "./AnoucementModal";

type Props = {};

const wavingHandVariants = {
  waving: {
    rotateZ: [-10, 10, -10],
    transition: {
      delay: 1,
      duration: 1.5,
      loop: Infinity,
      yoyo: Infinity,
    },
  },
};

const Anoucement = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAnousment, setShowAnousment] = useState(false);

  useEffect(() => {
    const alreadyShown = storage.localStorage.getItem("anoucement");
    setShowAnousment(alreadyShown !== "true");
  }, []);

  const showModal = () => {
    setIsOpen(true);
  };
  const hideModal = () => {
    setIsOpen(false);
    setShowAnousment(false);
  };

  if (!showAnousment) return null;

  return (
    <>
      <AnoucementModal isOpen={isOpen} hideModal={hideModal} />

      <div className="fixed inset-x-0 bottom-0">
        <div className="bg-indigo-600 px-4 py-3 text-white">
          <p className="text-center text-sm font-medium">
            Coming Soon : Unlock power to write and customize terms and
            policies in a fraction of a second
            <span
              className="inline-block underline ml-2 cursor-pointer"
              onClick={showModal}
            >
              Sign up for early access today!"
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Anoucement;
