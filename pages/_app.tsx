import "../styles/globals.css";
import type { AppProps } from "next/app";
import { UserProvider } from "../context/UserContext";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Toaster />
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
