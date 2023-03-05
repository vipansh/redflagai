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

const CrossSvg = ({
  className,
  pathVariants = defaultPathVariants,
}: SvgProps) => {
  return (
    <SvgWrapper className={className}>
      <motion.path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </SvgWrapper>
  );
};

export default CrossSvg;
