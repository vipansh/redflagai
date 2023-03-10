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
};

const FireSvg = ({
  className,
  pathVariants = defaultPathVariants,
}: SvgProps) => {
  return (
    <SvgWrapper className={className}>
      <defs>
        <linearGradient id="myGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <motion.path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z"
        stroke="url(#myGradient)"
        variants={pathVariants}
      />
      <motion.path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z"
        stroke="url(#myGradient)"
        variants={pathVariants}
      />
    </SvgWrapper>
  );
};

export default FireSvg;
