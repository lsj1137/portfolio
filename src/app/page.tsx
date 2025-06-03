"use client";

import Introducing from "@/app/Introducing";
import Onboarding from "@/components/Onboarding";
import Projects from "@/app/Projects";
import Skills from "@/app/Skills";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useRef, useState } from "react";
import ProgressBar from "@/components/ProgressBar";
import { useSectionStore } from "@/hooks/useSectionStore";
import { useScreenStore } from "@/hooks/useScreenStore";

export default function Home() {
  const { scrollY, scrollYProgress } = useScroll();
  const { setScreenHeight, setScreenWidth } = useScreenStore();
  const [totalScrollYProgress, setTotalScrollYProgress] = useState(0);
  const totalScroll = useRef(4000);

  useEffect(() => {
    const handleResize = () => {
      setScreenHeight(window.innerHeight);
      setScreenWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
