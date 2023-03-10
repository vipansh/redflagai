import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { motion } from "framer-motion";
import Loading from "./Loading";

type Props = {};

const buttonVariants = {
  initial: { scale: 0 },
  animate: { scale: 1 },
};

const SignInWithGoogleButton = (props: Props) => {
  const { login, user, loading } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handelLogin = async () => {
    setIsLoading(true);
    await login();
  };
  if (loading) return null;
  if (user) {
    return (
      <Link
        className="flex space-x-2 border-2 border-blue-500 rounded-md items-center shadow-md"
        href="/dashboard/check"
      >
        <motion.div
          className="flex px-6 py-2"
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 1 }}
        >
          <Image
            width={18}
            height={18}
            className="h-6 w-6"
            alt="googl_icon"
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          />
          <div>
            Continue as{" "}
            <span className="font-bold">{user?.user_metadata.full_name}</span>
          </div>
          <img
            className="h-8 w-8 rounded-full"
            src={user?.user_metadata.avatar_url}
            alt=""
          />
        </motion.div>
      </Link>
    );
  }

  return (
    <>
      {isLoading && <Loading />}
      <motion.button
        className=" flex space-x-3 shadow-md px-4 py-2  md:px-8 md:py-3  border-2 border-blue-500 rounded-md"
        type="button"
        onClick={handelLogin}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 1 }}
        variants={buttonVariants}
        initial="initial"
        animate="animate"
      >
        <Image
          width={18}
          height={18}
          className="h-6 w-6"
          alt="googl_icon"
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
        />{" "}
        <div>Sign in with Google</div>
      </motion.button>
    </>
  );
};

export default SignInWithGoogleButton;
