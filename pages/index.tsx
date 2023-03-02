import Head from "next/head";
import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import { supabase } from "../utils/supabase";

const Home = () => {
  const { user } = useUser();
  console.log({ user });
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Red flag ai</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      Working
    </div>
  );
};

export default Home;
