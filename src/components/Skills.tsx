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
import SkillGroup from "./SkillGroup";

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const [titleStyle, setTitleStyle] = useState<
    | boolean
    | TargetAndTransition
    | VariantLabels
    | AnimationControls
    | undefined
  >({});
  // const [showText, setShowText] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest === 1) {
      setTitleStyle({
        opacity: 1,
        top: 0,
      });
    }
  });

  return (
    <section
      className="h-screen relative flex items-center justify-center"
      ref={sectionRef}
    >
      {/* 제목 */}
      <motion.div
        transition={{ duration: 2, ease: "easeInOut" }}
        animate={titleStyle}
        className=" absolute top-[50%] left-0 -translate-y-1/2 font-bold text-[24px]"
      >
        <span lang="ko">🌸 기술 </span>
        <span lang="en">Skills</span>
      </motion.div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 ">
        <SkillGroup
          groupName="프론트엔드"
          cols={4}
          skills={["html5", "css3", "js", "ts", "react", "flutter", "next"]}
        />
        <SkillGroup
          groupName="백엔드 & 인프라"
          skills={["express", "flask", "mysql", "mongodb", "nginx", "awsec2"]}
        />
        <SkillGroup
          groupName="언어 & 개발도구"
          skills={[
            "github",
            "git",
            "vscode",
            "putty",
            "python",
            "androidstudio",
          ]}
        />
        <SkillGroup
          groupName="생산성 & 협업도구"
          skills={["swagger", "slack", "jira", "notion", "openai", "figma"]}
        />
      </div>
    </section>
  );
}
