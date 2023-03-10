import Script from "next/script";

declare global {
  var Paddle: any;
}

export function PaddleLoader() {
  return (
    <Script
      key="init-paddle"
      onLoad={() => {
        if (true) {
          Paddle.Environment.set("sandbox");
          Paddle.Setup({
            vendor: Number(process.env.NEXT_PUBLIC_PADDLE_SANDBOX),
          });
        } else {
          Paddle.Setup({
            vendor: Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID),
          });
        }
      }}
      src="https://cdn.paddle.com/paddle/paddle.js"
      //   onLoad={() => {
      //     if (process.env.NEXT_PUBLIC_PADDLE_SANDBOX) {
      //       Paddle.Environment.set("sandbox");
      //     }
      //     Paddle.Setup({
      //       vendor: Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID),
      //     });
      //   }}
    />
  );
}
