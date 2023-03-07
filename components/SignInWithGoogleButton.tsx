import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useUser } from "../context/UserContext";
import { motion } from "framer-motion";

type Props = {};

const SignInWithGoogleButton = (props: Props) => {
  const { login, user, loading } = useUser();
  if (loading) return null;
  if (user) {
    return (
      <Link
        className="flex space-x-2 border-2 border-gray-800 rounded-md px-6 py-2 items-center shadow-md"
        href="/dashboard/check"
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
      </Link>
    );
  }

  return (
    <motion.button
      className=" flex space-x-3 border px-8 py-3 rounded-lg"
      type="button"
      onClick={login}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
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
  );
};

export default SignInWithGoogleButton;
