import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import myImage from "public/myImage.png";

type Props = {};

const MeetTheDeveloper = (props: Props) => {
  return (
    <section className="relative w-full bg-white">
      <div className="absolute inset-0 w-full opacity-25 sm:opacity-50 overflow-hidden ">
        <motion.svg
          className="absolute top-0 right-0 w-auto h-full opacity-75 overflow-hidden"
          viewBox="0 0 150 350"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          animate={{
            x: [-20, 10, -20],
            y: [-10, 10, -10],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "linear",
          }}
        >
          <defs>
            <path d="M0 0h50v50H0z"></path>
            <path d="M0 0h50v50H0z"></path>
            <path d="M0 0h150v150H0z"></path>
          </defs>
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g>
              <g fill="#DEB9FF" fill-rule="nonzero">
                <path d="M25 25c13.807 0 25-11.193 25-25H0c0 13.807 11.193 25 25 25z"></path>
              </g>
              <g transform="translate(0 100)">
                <mask fill="#fff">
                  <use xlinkHref="#path-1"></use>
                </mask>
                <path
                  d="M25 0c13.807 0 25 11.193 25 25S38.807 50 25 50H0V0h25z"
                  fill="#F9C7FF"
                  mask="url(#mask-2)"
                ></path>
              </g>
              <g transform="translate(100 100)">
                <mask fill="#fff">
                  <use xlinkHref="#path-3"></use>
                </mask>
                <path
                  d="M25 25c13.807 0 25-11.193 25-25H0c0 13.807 11.193 25 25 25z"
                  fill="#93FFFD"
                  fill-rule="nonzero"
                  mask="url(#mask-4)"
                ></path>
              </g>
              <g transform="translate(0 200)">
                <mask fill="#fff">
                  <use xlinkHref="#path-5"></use>
                </mask>
                <path
                  d="M75 75c0 41.421 33.579 75 75 75V0c-41.421 0-75 33.579-75 75z"
                  fill="#93FFFD"
                  fill-rule="nonzero"
                  mask="url(#mask-6)"
                ></path>
              </g>
            </g>
          </g>
        </motion.svg>
        <motion.svg
          className="absolute top-0 left-0 w-auto h-full opacity-30 overflow-hidden"
          viewBox="0 0 150 150"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          animate={{
            x: [-20, 10, -20],
            y: [-10, 10, -10],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "linear",
          }}
        >
          <defs>
            <path d="M0 0h50v50H0z"></path>
            <path d="M0 0h50v50H0z"></path>
          </defs>
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g transform="matrix(-1 0 0 1 150 0)">
              <g transform="translate(0 25)" fill="#93FFFD" fill-rule="nonzero">
                <path d="M25 0C11.193 0 0 11.193 0 25h50C50 11.193 38.807 0 25 0z"></path>
              </g>
              <path
                d="M25 50C11.193 50 0 38.807 0 25S11.193 0 25 0h25v50H25z"
                transform="translate(100)"
                fill="#DEB9FF"
              ></path>
              <g transform="translate(0 100)">
                <mask fill="#fff">
                  <use xlinkHref="#path-1"></use>
                </mask>
                <path
                  d="M25 50C11.193 50 0 38.807 0 25S11.193 0 25 0h25v50H25z"
                  fill="#B3EBFF"
                  mask="url(#mask-2)"
                ></path>
              </g>
              <g transform="translate(100 200)">
                <mask fill="#fff">
                  <use xlinkHref="#path-3"></use>
                </mask>
                <path
                  d="M25 50C11.193 50 0 38.807 0 25S11.193 0 25 0h25v50H25z"
                  fill="#93FFFD"
                  mask="url(#mask-4)"
                ></path>
              </g>
            </g>
          </g>
        </motion.svg>
      </div>
      <div className="relative w-full px-8 pt-16 pb-16 ml-auto mr-auto bg-top bg-cover sm:max-w-xl md:max-w-full md:px-24 lg:px-8 lg:py-24 lg:pb-32">
        <div className="max-w-xl mb-10 ml-auto mr-auto bg-top bg-cover md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
          <div className="max-w-2xl mb-6 ml-auto mr-auto font-sans tracking-tight text-gray-900 bg-top bg-cover sm:text-4xl md:mx-auto">
            <div className=" flex justify-center items-center space-x-4 flex-col max-w-lg font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto  ">
              <div className="relative">
                <Image
                  src={myImage}
                  height={400}
                  width={400}
                  alt="developer Image"
                  className="rounded-full border-8 border-cyan-200 cursor-none"
                />
              </div>
              Meet the developer behind this project
            </div>
          </div>
          <p className="text-base text-gray-700 md:text-lg">
            Hello there, I'm Vipansh Thakur, and I'm the mastermind behind this
            amazing SaaS project! As a front-end developer, I've poured all of
            my creativity and passion into making this project a success. And
            the best part? I didn't have to argue with anyone on my team about
            design choices or feature implementations! Just me, my laptop, and a
            lot of coffee. So if you love this project, you know who to thank
            (and if you don't, just blame the coffee).
          </p>
          {false && (
            <button className="inline-block px-3 py-1 my-4 text-xs font-semibold tracking-wider uppercase bg-purple-600 rounded-full text-purple-50">
              Please, tell me how much you hated it. <br />
              <span className="px-3 py-1"> Leave a review</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default MeetTheDeveloper;
