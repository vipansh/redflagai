import Script from "next/script";
import { MetaData } from "../components";
import { PaddleLoader } from "../components/PaddleLoader";
export default function Payment() {
  return (
    <div className="m-auto max-w-sm h-screen items-center flex space-x-3">
      <MetaData />
      <PaddleLoader />
      <Script
       
      />
      <h1>Payment Page</h1>

      <button
        class="paddle_button text-blue-300"
        data-product="46831"
        onClick={() => {
          console.log("accept payment");
          Paddle.Checkout.open({
            product: "46831",
          });
        }}
      >
        Buy Now!
      </button>
    </div>
  );
}
