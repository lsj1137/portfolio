"use client";

import { useRef, useState } from "react";
import {
  AnimationControls,
  motion,
  TargetAndTransition,
  useMotionValueEvent,
  useScroll,
  VariantLabels,
} from "motion/react";
import SkillGroup from "../components/SkillGroup";
import {
  backend,
  backendUrls,
  corp,
  corpUrls,
  develop,
  developUrls,
  frontend,
  frontendUrls,
} from "@/constants/skillList";
import { useSectionStore } from "@/hooks/useSectionStore";
import { useScreenStore } from "@/hooks/useScreenStore";
import ScrollTrigger from "@/components/ScrollTrigger";

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const { screenHeight } = useScreenStore();
  const { section: curSection, increase: increaseSection } = useSectionStore();
  const [titleStyle, setTitleStyle] = useState<
    | boolean
    | TargetAndTransition
    | VariantLabels
    | AnimationControls
    | undefined
  >({});
  const [skillsStyle, setSkillsStyle] = useState<
    TargetAndTransition | VariantLabels | undefined
  >({});

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest >= screenHeight * 2) {
      setTitleStyle({
        opacity: 1,
        top: 100,
      });
      setTimeout(() => {
        setSkillsStyle({ opacity: 1, y: 0 });
      }, 1500);
    }
  });

  const handleScrollTrigger = () => {
    if (curSection === 2) {
      increaseSection();
    }
  };

  return (
    curSection > 1 && (
      <section
        className="h-screen relative flex items-center justify-center"
        ref={sectionRef}
      >
        <ScrollTrigger onTrigger={handleScrollTrigger} />
        {/* 제목 */}
        <motion.div
          transition={{ duration: 1.5, ease: "easeInOut" }}
          animate={titleStyle}
          className=" absolute top-[50%] left-0 -translate-y-1/2 font-bold text-[24px]"
        >
          <span lang="ko">🌸 기술 </span>
          <span lang="en">Skills</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={skillsStyle}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
          className="mt-14 w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 "
        >
          <SkillGroup
            groupName="프론트엔드"
            cols={4}
            skills={frontend}
            urls={frontendUrls}
          />
          <SkillGroup
            groupName="백엔드 & 인프라"
            skills={backend}
            urls={backendUrls}
          />
          <SkillGroup
            groupName="언어 & 개발도구"
            skills={develop}
            urls={developUrls}
          />
          <SkillGroup
            groupName="생산성 & 협업도구"
            skills={corp}
            urls={corpUrls}
          />
        </motion.div>
      </section>
    )
  );
}
