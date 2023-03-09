import React, { SVGProps } from "react";
import { motion } from "framer-motion";
import { classNames } from "../utils/classNames";

interface SvgWrapperProps extends SVGProps<SVGSVGElement> {
  className?: string;
}

const SvgWrapper: React.FC<SvgWrapperProps> = ({
  className = "",
  ...svgProps
}) => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      initial="hidden"
      animate="visible"
      className={classNames(className)}
    >
      {svgProps.children}
    </motion.svg>
  );
};

export default SvgWrapper;
