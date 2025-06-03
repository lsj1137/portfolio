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
import { useScreenStore } from "@/hooks/useScreenStore";
import ScrollTrigger from "@/components/ScrollTrigger";

export default function Projects() {
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
  const [projectsStyle, setProjectsStyle] = useState<
    TargetAndTransition | VariantLabels | undefined
  >({});

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest >= screenHeight * 3) {
      setTitleStyle({
        opacity: 1,
        top: 100,
      });
      setTimeout(() => {
        setProjectsStyle({ opacity: 1, y: 0 });
      }, 1500);
    }
  });

  const handleScrollTrigger = () => {
    if (curSection === 2) {
      increaseSection();
    }
  };

  return (
    curSection > 2 && (
      <section className="h-screen relative flex flex-col items-center justify-center">
        <ScrollTrigger onTrigger={handleScrollTrigger} />
        {/* 제목 */}
        <motion.div
          transition={{ duration: 2, ease: "easeInOut" }}
          animate={titleStyle}
          className=" absolute top-[50%] left-0 -translate-y-1/2 font-bold text-[24px]"
        >
          <span lang="ko">🏵️ 프로젝트 </span>
          <span lang="en">Projects</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={projectsStyle}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
          className=" grid grid-cols-2 lg:grid-cols-4 grid-rows-2 gap-5 lg:gap-8 my-20"
        >
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
        </motion.div>
      </section>
    )
  );
}
