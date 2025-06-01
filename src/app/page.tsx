"use client";

import Career from "@/components/Career";
import Introducing from "@/app/Introducing";
import Onboarding from "@/components/Onboarding";
import Projects from "@/app/Projects";
import Skills from "@/app/Skills";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import ProgressBar from "@/components/ProgressBar";

export default function Home() {
  const { scrollY, scrollYProgress } = useScroll();
  const [curSection, setSection] = useState(0);
  const [totalScrollYProgress, setTotalScrollYProgress] = useState(0);
  const totalScroll = useRef(4000);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest === 1) {
      setSection((prev) => prev + 1);
    }
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setTotalScrollYProgress(latest / totalScroll.current);
  });

  return (
    <div className="w-full flex flex-col">
      <ProgressBar progress={totalScrollYProgress} />
      <Onboarding />
      {curSection > 0 && <Introducing />}
      {curSection > 1 && <Skills />}
      {curSection > 2 && <Projects />}
    </div>
  );
}
