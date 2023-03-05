import { AnimatePresence, motion } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { ActionAlert, Navbar, ResizablePanel } from "../components";
import { AllPopUps } from "../modules";

type Props = {};
const Dashboard = ({}: Props) => {
  const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [generatedBios, setGeneratedBios] = useState<String>("");

  const [openModal, setOpenModal] = useState("");

  const prompt = `What are redflag in this tersm and conditions: ${bio}`;

  const generateBio = async () => {
    setGeneratedBios("");
    setLoading(true);
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });
    console.log("Edge function returned.");

    if (!response.ok) {
      throw new Error(response.statusText);
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

  const handelOpenModal = (alertId: string) => {
    setOpenModal(alertId);
  };

  return (
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
                <div className="flex mt-10 items-center space-x-3">
                  <p className="text-left font-medium">
                    Copy and Past terms and conditions.
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
                  <p
                    className={`text-sm ${
                      bio.length > 300 ? "text-red-600" : "text-green-600"
                    }  text-end`}
                  >
                    <span className="font-medium">
                      Words Limit left ({bio.length}/300)
                    </span>
                  </p>
                </div>
                {!loading && (
                  <button
                    className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      handelOpenModal("confirm");
                    }}
                  >
                    Check for redflags &rarr;
                  </button>
                )}
                {loading && (
                  <button
                    className="bg-black rounded-xl text-white font-medium px-4 py-2 sm:mt-10 mt-8 hover:bg-black/80 w-full"
                    disabled
                  >
                    Loading
                  </button>
                )}
              </div>
              <Toaster
                position="top-center"
                reverseOrder={false}
                toastOptions={{ duration: 2000 }}
              />
              <hr className="h-px bg-gray-700 border-1 dark:bg-gray-700" />
              <ResizablePanel>
                <AnimatePresence mode="wait">
                  <motion.div className="space-y-10 my-10">
                    {generatedBios && (
                      <>
                        <div>
                          <h2 className="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto">
                            Here are your results
                          </h2>
                        </div>
                        <div className="space-y-8 flex flex-col items-center justify-center max-w-xl mx-auto">
                          {generatedBios
                            .substring(generatedBios.indexOf("1") + 3)
                            .split("2.")
                            .map((generatedBio) => {
                              return (
                                <div
                                  className="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border"
                                  onClick={() => {
                                    navigator.clipboard.writeText(generatedBio);
                                    toast("Bio copied to clipboard", {
                                      icon: "✂️",
                                    });
                                  }}
                                  key={generatedBio}
                                >
                                  <p>{generatedBio}</p>
                                </div>
                              );
                            })}
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </ResizablePanel>
            </div>
          </div>
        </div>
      </main>
      <AllPopUps
        showAlertId={openModal}
        closeAlert={() => {
          setOpenModal("");
        }}
      />
    </div>
  );
};

export default Dashboard;
