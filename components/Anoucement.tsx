import React, { useState, useEffect } from "react";
import { CrossSvg } from "../svgs";
import Modal from "./Modal";
import { AnimatePresence, motion } from "framer-motion";
import { useUser } from "../context/UserContext";
import ResizablePanel from "./ResizablePanel";
import { supabase } from "../utils/supabase";

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
  const { user, loading } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };
  const hideModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (user) {
      setEnteredEmail(user.email);
    }
  }, [loading]);

  const handleClick = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setIsLoading(true);
    await supabase.from("wish_list").insert({
      user: user.id,
      email: enteredEmail,
    });

    setTimeout(() => {
      hideModal();
    }, 3000);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={hideModal}>
        <AnimatePresence>
          <motion.div
            className="absolute cursor-pointer -top-6 left-1  p-1 "
            tabIndex={0}
            animate={{ rotate: 20 }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 1,
            }}
          >
            <AnimatePresence>
              <motion.span className="text-5xl" animate={{ rotate: 40 }}>
                👋🏻
              </motion.span>
            </AnimatePresence>
          </motion.div>
          <motion.div
            className="absolute cursor-pointer -top-1 -right-1  p-1 "
            onClick={hideModal}
            tabIndex={0}
            initial={{ top: 40, opacity: 0 }}
            animate={{ top: -50, opacity: 1 }}
            exit={{ top: 40, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <CrossSvg />
          </motion.div>
          <ResizablePanel>
            {!isLoading ? (
              <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg text-center">
                  <h1 className="text-2xl font-bold sm:text-3xl">
                    Be the First to Know!
                  </h1>

                  <p className="mt-4 text-gray-500">
                    Sign up now to be the first in line and enjoy extra perks.
                    With our platform, you'll have the power to write and
                    customize terms and policies in a fraction of a second.
                    Revamp your terms and conditions hassle-free.
                  </p>
                </div>

                <form
                  action=""
                  className="mx-auto mt-8 mb-0 max-w-md space-y-4"
                >
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>

                    <div className="relative">
                      <input
                        type="email"
                        className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
                        placeholder="Enter email"
                        value={enteredEmail}
                        onChange={(e) => {
                          setEnteredEmail(e.target.value);
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <motion.button
                      className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white relative"
                      onClick={handleClick}
                    >
                      {isLoading ? "" : "Submit"}
                    </motion.button>
                  </div>
                </form>
              </div>
            ) : (
              <motion.div
                transition={{
                  duration: 0.5,
                  repeatType: "reverse",
                  repeat: isLoading ? Infinity : 0,
                }}
              >
                <p className="mt-4 text-gray-500">
                  Thank you for signing up! We appreciate your interest and
                  can't wait for you to experience the power of our platform.
                  We'll keep you updated on all the exclusive benefits you'll
                  receive with early access, including the ability to create
                  customized terms and policies with ease.
                </p>
              </motion.div>
            )}
          </ResizablePanel>
        </AnimatePresence>
      </Modal>
      <div className="fixed inset-x-0 bottom-0">
        <div className="bg-indigo-600 px-4 py-3 text-white">
          <p className="text-center text-sm font-medium">
            Comming Soon : Unlock power to write and customize terms and
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
