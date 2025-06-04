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
import Interview from "../components/Interview";
import { useSectionStore } from "@/hooks/useSectionStore";
import { useScreenStore } from "@/hooks/useScreenStore";
import ProfileLink from "@/components/ProfileLink";
import ScrollTrigger from "@/components/ScrollTrigger";

export default function Introducing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const { section: curSection, increase: increaseSection } = useSectionStore();
  const { screenHeight, screenWidth } = useScreenStore();

  const [titleStyle, setTitleStyle] = useState<
    | boolean
    | TargetAndTransition
    | VariantLabels
    | AnimationControls
    | undefined
  >({});
  const [photoStyle, setPhotoStyle] = useState<
    | boolean
    | TargetAndTransition
    | VariantLabels
    | AnimationControls
    | undefined
  >({});
  const [interviewStyle, setInterviewStyle] = useState<
    TargetAndTransition | VariantLabels | undefined
  >({});
  const [showText, setShowText] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest >= screenHeight) {
      setTitleStyle({
        opacity: 1,
        top: 300,
      });
      setPhotoStyle({
        opacity: 1,
        width: "20%",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
        padding: "12px",
      });
      setTimeout(() => {
        setShowText(true);
        setInterviewStyle({ opacity: 1, y: 0 });
      }, 1000);
    }
  });

  const handleScrollTrigger = () => {
    if (curSection === 1) {
      increaseSection();
    }
  };

  return (
    curSection > 0 && (
      <section className=" h-screen relative flex flex-col" ref={sectionRef}>
        <ScrollTrigger onTrigger={handleScrollTrigger}></ScrollTrigger>
        {/* 얼굴 사진 */}
        <motion.div
          transition={{ duration: 1.5, ease: "easeInOut" }}
          animate={photoStyle}
          className="absolute top-[50%] -translate-y-1/2 md:right-0 w-[45%] min-w-[150px] h-auto bg-white"
        >
          <img
            src="/pictures/profile_image.jpg"
            alt="폴라로이드"
            style={{
              width: "100%",
              display: "block",
            }}
          />
        </motion.div>
        {/* 제목 */}
        <motion.div
          transition={{ duration: 1.5, ease: "easeInOut" }}
          animate={titleStyle}
          className=" absolute top-[50%] left-0 -translate-y-1/2 font-bold text-[24px]"
        >
          <span lang="ko">🌺 소개글 </span>
          <span lang="en">Introducing</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={interviewStyle}
          transition={{ duration: 2, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
          style={{
            marginTop:
              screenWidth >= 768
                ? `${screenHeight / 2}px`
                : `${(screenHeight * 4) / 5}px`,
          }}
          className=" -translate-y-1/2 max-w-[500px]"
        >
          <Interview />
        </motion.div>

        <div
          className={`absolute bottom-[50%] translate-y-1/2 md:bottom-8 md:translate-y-0 right-0 flex flex-col md:flex-row gap-4 transition-all ease-in-out duration-200 ${
            showText ? "opacity-100" : "opacity-0"
          }`}
        >
          <ProfileLink
            url="https://github.com/lsj1137/"
            imgSrc="/pictures/github_logo.png"
            alt="github logo"
            width={screenWidth < 768 ? 60 : 100}
            title="깃허브"
          ></ProfileLink>
          <ProfileLink
            url="https://three-jun.tistory.com/"
            imgSrc="/pictures/tistory_logo.png"
            alt="tistory logo"
            width={screenWidth < 768 ? 60 : 100}
            title="티스토리"
          ></ProfileLink>
        </div>
      </section>
    )
  );
}
