import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import {
  Navbar,
  ResizablePanel,
  ThreeDotWave,
  Anoucement,
  Confetti,
} from "../../components";
import { AllPopUps } from "../../modules";
import storage from "../../utils/storage";
import { useUser } from "../../context/UserContext";
import { ProductRes } from "../../types/paddle";
import { Arrow } from "../../svgs";
import countTokens from "../../utils/tokenCount";

type Props = {
  products: ProductRes;
};

function replaceText(text: string): string {
  return text
    .replace(/\[start\]/g, '<span class="text-lg bg-red-100 p-1 rounded ">')
    .replace(/\[end\]/g, "</span>");
}

const Dashboard = ({ products }: Props) => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [generatedBios, setGeneratedBios] = useState<string>("");
  const [tokenCount, setTokenCount] = useState(0);
  const [openModal, setOpenModal] = useState<{
    modelId: string;
    extraData?: any;
  }>({ modelId: "", extraData: {} });

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      const tempBio = storage.localStorage.getItem("temp");
      if (tempBio) {
        setBio(tempBio);
      }
    }
  }, []);

  useEffect(() => {
    if (bio) {
      const tokenCounst = countTokens(bio);
      setTokenCount(tokenCounst);
    }
  }, [bio]);

  const generateBio = async () => {
    setGeneratedBios("");
    setLoading(true);
    setOpenModal({
      modelId: "alertId",
      extraData: null,
    });
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: bio,
      }),
    });
    console.log("Edge function returned.");

    if (!response.ok) {
      console.log(response);
      toast("Something went wrong", {
        icon: "❌",
      });
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const reader = data.getReader();
    const decoder = new TextDecoder();
    let done = false;

    while (!done) {
      const { value, done: doneReading } = await reader.read();
      done = doneReading;
      const chunkValue = decoder.decode(value);
      setGeneratedBios((prev) => prev + chunkValue);
    }

    setLoading(false);
  };

  const handelOpenModal = (alertId: string, data?: any) => {
    setOpenModal({
      modelId: alertId,
      extraData: data,
    });
    storage.localStorage.removeItem("temp");
  };

  const checkForRedFlags = async () => {
    if (!bio) {
      toast("Enter some value", {
        icon: "❌",
      });
      return;
    }
    setIsLoading(true);
    await generateBio();
    setIsLoading(false);
  };

  const dummyTerms = () => {
    setBio(`User Data: By using our service, you agree to allow us to collect and store your data, including but not limited to your contacts, camera and microphone permissions, and access to your Google Drive. We reserve the right to share this data with third parties for industry and marketing purposes, but we will anonymize the data before sharing it. However, please note that even anonymized data can still reveal sensitive information about your behavior and preferences. We will take all necessary measures to protect your data, including implementing strong data encryption and security measures, but we cannot guarantee the security of your data against unauthorized access or disclosure. By agreeing to these terms and conditions, you acknowledge and accept the risks involved in using our service and sharing your data with us.
    Limitation of Liability: In no event shall we be liable for any indirect, incidental, special, punitive, or consequential damages arising out of or in connection with your use of our service. Our total liability to you for any and all claims arising from your use of the service, regardless of the form of action, shall be limited to the amount paid by you to us, if any, for the service during the term of use.
    Intellectual Property: All intellectual property rights in the service, including but not limited to copyright, trademark, and patent rights, are owned by us or our licensors. You may not use, copy, reproduce, distribute, transmit, broadcast, display, sell, license, or otherwise exploit any content on the service for any other purposes without our prior written consent. You agree to indemnify and hold us harmless from any claim or demand, including attorneys' fees, arising out of your use of the service or any violation of these terms and conditions.`);
  };

  return (
    <>
      <div className="bg-white relative">
        <header className="fixed right-0 top-0 left-0 bg-yellow-50 py-1 px-4 ">
          <Navbar />
        </header>
        <main className="pt-16 max-h-screen overflow-auto w-full">
          <div className="px-6 py-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl p-8 mb-5">
                <h1 className="text-3xl font-bold mb-10 w-full text-center">
                  Search for Red flags in terms and confitions
                </h1>

                <hr className="my-10" />

                <div className="w-full">
                  <div className="flex mt-10 items-center space-x-3 justify-between flex-col md:flex-row">
                    <p className="text-left font-medium">
                      Copy and paste terms and conditions.
                    </p>
                    <p
                      className="text-left font-medium text-blue-500 cursor-pointer flex space-x-2 justify-start items-center"
                      onClick={dummyTerms}
                    >
                      Get some dummy text <Arrow />
                    </p>
                  </div>
                  <div>
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={10}
                      className="w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black mt-5 border p-1 "
                      placeholder={`e.g.
                     This rental bond agreement is made on [Date] between [Landlord's Name] ("Landlord") and [Tenant's Name] ("Tenant").
                    The Tenant will pay a rental bond in the amount of [Bond Amount] to the Landlord as security for the performance of the Tenant's obligations under the lease agreement.
            `}
                    />
                    {tokenCount !== 0 && (
                      <p
                        className={`text-sm   text-end ${
                          tokenCount < 70000 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        <span className="font-medium">
                          Approx token required: {tokenCount}{" "}
                          {tokenCount > 70000 &&
                            `using more thna 7K token in a single request is not supported`}
                        </span>
                      </p>
                    )}
                  </div>
                  {!loading && (
                    <button
                      className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full disabled:bg-black/50"
                      onClick={(e) => {
                        e.preventDefault();
                        if (tokenCount > 7000) {
                          toast("To much data");
                          return;
                        }
                        // handelOpenModal("buyTokenModal");
                        checkForRedFlags();
                      }}
                      disabled={isLoading}
                    >
                      Check for redflags
                    </button>
                  )}
                  {loading && <ThreeDotWave />}
                </div>
                <Toaster
                  position="top-center"
                  reverseOrder={false}
                  toastOptions={{ duration: 2000 }}
                />
                <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
                <AnimatePresence mode="wait">
                  <motion.div className="space-y-10 my-10">
                    {generatedBios && (
                      <>
                        <div>
                          <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto">
                            Here are your results
                          </h2>
                        </div>
                        <div className="space-y-8 flex flex-col items-center justify-center  mx-auto leading-8">
                          <p
                            dangerouslySetInnerHTML={{
                              __html: replaceText(generatedBios),
                            }}
                          ></p>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </main>
        <AllPopUps
          showAlertId={openModal.modelId}
          extraData={openModal.extraData}
          closeAlert={() => {
            setOpenModal({
              modelId: "",
            });
          }}
          generateBio={generateBio}
        />
        <Anoucement />
      </div>
      <Confetti />
    </>
  );
};

export default Dashboard;

export const getStaticProps = async () => {
  // const options = {
  //   method: "POST",
  //   url: "https://sandbox-vendors.paddle.com/api/2.0/product/get_products",
  //   headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //   data: {
  //     vendor_id: Number(process.env.NEXT_PUBLIC_PADDLE_SANDBOX),
  //     vendor_auth_code: process.env.NEXT_PUBLIC_PADDLE_SANDBOX_AUTH_CODE,
  //     country: "INR",
  //   },
  // };
  // console.log(
  //   "env",
  //   process.env.NEXT_PUBLIC_PADDLE_SANDBOX,
  //   process.env.NEXT_PUBLIC_PADDLE_SANDBOX_AUTH_CODE
  // );
  // try {
  //   const response = await axios.request(options);

  //   return {
  //     props: {
  //       products: response.data,
  //     },
  //   };
  // } catch (error) {
  //   console.error({ error, d: "r" });
  return {
    props: {
      products: [],
    },
  };
};
