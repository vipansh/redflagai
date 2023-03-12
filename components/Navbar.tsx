import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { classNames } from "../utils/classNames";
import { FireSvg } from "../svgs";
import { useUser } from "../context/UserContext";
import BuyTokenModal from "./BuyTokenModal";
import Link from "next/link";
import SignInWithGoogleButton from "./SignInWithGoogleButton";
import TextRedflagAI from "./TextRedflagAI";
import { Product } from "../types/paddle";

type Props = {
  products?: Product[];
};

export default function Navbar({ products }: Props) {
  const { user, loading } = useUser();
  const [showBuyModal, setShowBuyModal] = useState(false);
  console.log({ user });

  return (
    <header aria-label="Site Header" className="shadow-sm">
      <BuyTokenModal
        isOpen={showBuyModal}
        onClose={() => {
          setShowBuyModal(false);
        }}
        products={products}
        heading={"Get the best value"}
      />
      <div className="mx-auto max-w-screen-xl p-4">
        <div className="flex items-center justify-between gap-4 lg:gap-10">
          <div className="flex lg:w-0 lg:flex-1">
            <Link
              href={"/"}
              className="flex space-x-2 items-center justify-center"
            >
              <FireSvg className="block h-8 w-auto" />
              <TextRedflagAI />
            </Link>
          </div>

          <nav
            aria-label="Site Nav"
            className="hidden gap-8 text-sm font-medium md:flex"
          >
            {user && (
              <>
                <span className="text-gray-500">
                  No: of tokens: {user?.no_of_tokens}
                </span>
                <button
                  className="text-gray-500"
                  onClick={() => {
                    setShowBuyModal(true);
                  }}
                >
                  Buy Token
                </button>
              </>
            )}
          </nav>

          {!loading ? (
            user ? (
              <div className=" flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 p-1 items-center space-x-1">
                      <span className="sr-only">Open user menu</span>
                      <div> {user?.user_metadata.full_name}</div>
                      <img
                        className="h-8 w-8 rounded-full"
                        src={user?.user_metadata.avatar_url}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-6 py-2 text-sm text-gray-700 cursor-pointer"
                            )}
                          >
                            No: of tokens: {user?.no_of_tokens}
                          </div>
                        )}
                      </Menu.Item>

                      <Menu.Item>
                        <div
                          className={classNames(
                            "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                          )}
                          onClick={() => {
                            setShowBuyModal(true);
                          }}
                        >
                          <div className="bg-blue-200 hover:bg-blue-300 px-2 py-2 rounded">
                            Buy more tokens
                          </div>
                        </div>
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/dashboard/check"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-6 py-2 text-sm text-gray-700"
                            )}
                          >
                            Check for <TextRedflagAI />
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        <div
                          className={classNames(
                            "block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                          )}
                          onClick={() => {
                            setShowBuyModal(true);
                          }}
                        >
                          <div className="bg-blue-200 hover:bg-blue-300 px-2 py-2 rounded">
                            Comming soon Alert
                          </div>
                        </div>
                      </Menu.Item>

                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/logout"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-6 py-2 text-sm text-gray-700"
                            )}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            ) : (
              <SignInWithGoogleButton />
            )
          ) : null}
        </div>
      </div>
    </header>
  );
}
