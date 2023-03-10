import { motion } from "framer-motion";
import { SvgProps } from "./SvgPropType";
import SvgWrapper from "./SvgWeapper";

const defaultPathVariants = {
  hidden: {
    pathLength: 0,
  },
  visible: {
    pathLength: 1,
    transition: {
      duration: 2,
    },
  },
  rotate: {
    rotate: 360,
    transition: {
      duration: 2,
      repeat: Infinity,
    },
  },
};

interface CircleSvgProp extends SvgProps {
  clockWise?: boolean;
}

const CircleSvg = ({
  className,
  clockWise = false,
  pathVariants = defaultPathVariants,
}: CircleSvgProp) => {
  return (
    <motion.svg
      viewBox="0 0 1026 1026"
      fill="none"
      aria-hidden="true"
      className={className}
      animate={{ rotate: clockWise ? 360 : -360 }}
      transition={{
        repeat: Infinity,
        duration: 10,
        ease: "linear",
      }}
    >
      <path
        d="M1025 513c0 282.77-229.23 512-512 512S1 795.77 1 513 230.23 1 513 1s512 229.23 512 512Z"
        stroke="#D4D4D4"
        strokeOpacity="0.7"
      />
      <path
        d="M513 1025C230.23 1025 1 795.77 1 513"
        stroke="url(#2z1FJnxr5eIZ3o3QMfiwb-gradient-1)"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="2z1FJnxr5eIZ3o3QMfiwb-gradient-1"
          x1="1"
          y1="513"
          x2="1"
          y2="1025"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};

export { CircleSvg };
