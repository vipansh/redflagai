import Script from "next/script";
import { useState } from "react";
import { MetaData, Navbar } from "../components";
import { PaddleLoader } from "../components/PaddleLoader";
import { useUser } from "../context/UserContext";

declare global {
  interface Window {
    onPaddleClose?: () => void;
    onPaddleSuccess?: () => void;
  }
}

export default function Payment() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const onUpgradeClick = () => {
    // if (!isLoggedIn) {
    //   router.push("#login?pricing");
    //   return;
    // }

    const passthrough = {
      userId: user.id,
    };
    setIsLoading(true);
    window.onPaddleSuccess = function () {
      window.location.href = "/dashboard/check?success=true";
    };
    window.onPaddleClose = function () {
      setIsLoading(false);
    };
    Paddle.Checkout.open({
      product: Number(process.env.NEXT_PUBLIC_PADDLE_100_PRODUCT_ID),
      email: user.email,
      disableLogout: true,
      passthrough: JSON.stringify(passthrough),
      closeCallback: "onPaddleClose",
      successCallback: "onPaddleSuccess",
      customData: JSON.stringify({ number_of_token: 1000 }),
    });
  };

  return (
    <>
      <MetaData />
      <PaddleLoader />
      <Script />
      <Navbar />
      <div className="m-auto max-w-sm h-screen items-center flex space-x-3">
        <h1>Payment Page</h1>

        <button
          className="paddle_button text-blue-300"
          data-product="46831"
          onClick={onUpgradeClick}
        >
          {isLoading ? "isLoading" : "Buy Now!"}
        </button>
      </div>
    </>
  );
}
