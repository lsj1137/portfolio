"use client";

import { motion } from "motion/react";

export default function Flower() {
  return (
    <div className="absolute bottom-0 left-[16%] rotate-[-10deg]">
      <motion.div
        style={{
          backgroundImage: 'url("/pictures/dandelion.png")',
          width: "150px",
          height: "450px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transformOrigin: "bottom center",
        }}
        whileHover={{
          scale: 1.1,
        }}
        animate={{
          rotate: [-2, 5, -2],
        }}
        transition={{
          rotate: {
            duration: 7,
            repeat: Infinity,
          },
        }}
      ></motion.div>
    </div>
  );
}
