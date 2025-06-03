"use client";

import Introducing from "@/app/Introducing";
import Onboarding from "@/components/Onboarding";
import Projects from "@/app/Projects";
import Skills from "@/app/Skills";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import { useSectionStore } from "@/hooks/useSectionStore";

export default function Home() {
  const { scrollY, scrollYProgress } = useScroll();
  const {
    increase: increaseSection,
    decrease: decreaseSection,
    section,
  } = useSectionStore();
  const [totalScrollYProgress, setTotalScrollYProgress] = useState(0);
  const totalScroll = useRef(4000);

  // useMotionValueEvent(scrollYProgress, "change", (latest) => {
  //   if (latest === 1) {
  //     increaseSection();
  //   }
  // });

  useMotionValueEvent(scrollY, "change", (latest) => {
    setTotalScrollYProgress(latest / totalScroll.current);
  });

  return (
    <div className="w-full flex flex-col">
      <ProgressBar progress={totalScrollYProgress} />
      <Onboarding />
      <Introducing />
      <Skills />
      <Projects />
    </div>
  );
}
