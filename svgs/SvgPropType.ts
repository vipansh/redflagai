export interface SvgProps {
  className?: string;
  pathVariants?: {
    hidden: {
      pathLength: number;
    };
    visible: {
      pathLength: number;
      transition: {
        duration: number;
      };
    };
  };
}
