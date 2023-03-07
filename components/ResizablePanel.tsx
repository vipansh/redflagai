import { motion } from "framer-motion";
import useMeasure from "react-use-measure";

export default function ResizablePanel({
  children,
}: {
  children: React.ReactNode;
}) {
  let [ref, { height, width }] = useMeasure();

  return (
    <motion.div
      animate={height ? { height } : {}}
      style={height ? { height, width } : {}}
      className="relative w-full overflow-hidden"
      transition={{ type: "tween", duration: 0.5 }}
    >
      <div ref={ref} className={height ? "absolute inset-x-0" : "relative"}>
        {children}
      </div>
    </motion.div>
  );
}
