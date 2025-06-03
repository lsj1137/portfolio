import { projectList } from "@/constants/projectList";
import {
  AnimationControls,
  motion,
  TargetAndTransition,
  useMotionValueEvent,
  useScroll,
  VariantLabels,
} from "motion/react";
import { useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { useSectionStore } from "@/hooks/useSectionStore";

export default function Projects() {
  const { scrollYProgress } = useScroll();
  const { section: curSection } = useSectionStore();
  const [titleStyle, setTitleStyle] = useState<
    | boolean
    | TargetAndTransition
    | VariantLabels
    | AnimationControls
    | undefined
  >({});

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest === 1) {
      setTitleStyle({
        opacity: 1,
        top: 0,
      });
    }
  });

  return (
    curSection > 2 && (
      <section className="h-full relative flex flex-col items-center justify-center">
        {/* 제목 */}
        <motion.div
          transition={{ duration: 2, ease: "easeInOut" }}
          animate={titleStyle}
          className="w-full font-bold text-[24px] text-left"
        >
          <span lang="ko">🏵️ 프로젝트 </span>
          <span lang="en">Projects</span>
        </motion.div>
        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-10 my-20">
          {projectList.map((project, i) => (
            <ProjectCard
              key={i}
              title={project.title}
              content={project.content}
              photo={project.photo}
              detail={project.detail}
              url={project.url}
              skills={project.skills}
            />
          ))}
        </div>
      </section>
    )
  );
}
