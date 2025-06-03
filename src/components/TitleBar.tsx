"use client";

import { useSectionStore } from "@/hooks/useSectionStore";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export default function TitleBar() {
  const [title, setTitle] = useState<string[]>([" ", " ", " "]);
  const [subTitle, setSubTitle] = useState<string>("");
  const { increase: increaseSection } = useSectionStore();

  useEffect(() => {
    setTitle("임세준".split(""));
    setSubTitle("Lim Se Jun");
    setTimeout(() => {
      setTitle("포트폴리오".split(""));
      setSubTitle("Portfolio");
      increaseSection();
    }, 2000);
  }, []);

  return (
    <h1 className="absolute top-[50%] -translate-y-1/2 right-[20%] w-[100px] md:w-[37%] text-[40px] lg:text-[64px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={title.reduce((c, a) => a + c, "")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className=" subtitle absolute w-[200px] lg:w-[100%] text-right right-0 top-[-60px] lg:top-[-90px]"
        >
          {subTitle}
        </motion.div>
      </AnimatePresence>
      <div className=" relative manuscript-title">
        <AnimatePresence mode="wait">
          <motion.div
            key={title.reduce((c, a) => a + c, "")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="  flex flex-wrap justify-center"
          >
            {title.map((char, i) => (
              <span lang="ko" key={i} className="w-15 lg:w-[96px]">
                {char}
              </span>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </h1>
  );
}
