"use client";

import Career from "@/components/Career";
import Introducing from "@/components/Introducing";
import Onboarding from "@/components/Onboarding";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const [curSection, setSection] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest === 1) {
      setSection((prev) => prev + 1);
    }
  });

  return (
    <div className="w-full flex flex-col ">
      <Onboarding />
      {curSection > 0 && <Introducing />}
      {curSection > 1 && <Career />}
      {curSection > 2 && <Skills />}
      {curSection > 3 && <Projects />}
    </div>
  );
}
