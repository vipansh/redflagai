import React, { useState, useEffect } from "react";
import { CrossSvg } from "../svgs";
import Modal from "./Modal";
import { AnimatePresence, motion } from "framer-motion";
import { useUser } from "../context/UserContext";
import ResizablePanel from "./ResizablePanel";
import { supabase } from "../utils/supabase";
import storage from "../utils/storage";

type Props = {
  isOpen: boolean;
  hideModal: () => void;
};

const AnoucementModal = ({ isOpen, hideModal }: Props) => {
  const { user, loading } = useUser();
  const [enteredEmail, setEnteredEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    user && setEnteredEmail(user.email);
  }, [user]);

  const handleClick = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setIsLoading(true);
    await supabase.from("wish_list").insert({
      user: user.id,
      email: enteredEmail,
    });
    storage.localStorage.setItem("anoucement", "true");

    setTimeout(() => {
      hideModal();
    }, 3000);
  };

  return (
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
          <CrossSvg className="h-8 w-8 bg-slate-50 rounded-full p-2"/>
        </motion.div>
        <ResizablePanel>
          {!isLoading ? (
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-lg text-center">
                <h1 className="text-2xl font-bold sm:text-3xl">
                  Be the First to Know!
                </h1>

                <p className="mt-4 text-gray-500">
                  Sign up now to be the first in line and enjoy extra perks.
                  With our platform, you'll have the power to write and
                  customize terms and policies in a fraction of a second. Revamp
                  your terms and conditions hassle-free.
                </p>
              </div>

              <form action="" className="mx-auto mt-8 mb-0 max-w-md space-y-4">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>

                  <div className="relative">
                    <input
                      type="email"
                      className="w-full rounded-lg border-gray-900 p-4 pr-12 text-sm border"
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
                Thank you for signing up! We appreciate your interest and can't
                wait for you to experience the power of our platform. We'll keep
                you updated on all the exclusive benefits you'll receive with
                early access, including the ability to create customized terms
                and policies with ease.
              </p>
            </motion.div>
          )}
        </ResizablePanel>
      </AnimatePresence>
    </Modal>
  );
};

export default AnoucementModal;
