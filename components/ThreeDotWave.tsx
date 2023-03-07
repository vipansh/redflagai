import React from "react";
import { motion } from "framer-motion";

interface ThreeDotWaveProps {
  size?: number;
  color?: string;
}

const ThreeDotWave: React.FC<ThreeDotWaveProps> = ({
  size = 10,
  color = "#000",
}) => {
  return (
    <div className="flex justify-center items-center mt-12">
      <motion.div
        style={{ marginRight: "10px" }}
        animate={{ y: [0, -10, 0], rotate: [0, 360, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
      >
        <div
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            background: color,
          }}
        />
      </motion.div>
      <motion.div
        style={{ marginRight: "10px" }}
        animate={{ y: [0, -10, 0], rotate: [0, 360, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
      >
        <div
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            background: color,
          }}
        />
      </motion.div>
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 360, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
      >
        <div
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            background: color,
          }}
        />
      </motion.div>
    </div>
  );
};

export default ThreeDotWave;
