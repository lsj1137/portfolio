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

export default function Introducing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
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
  const [showText, setShowText] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest === 1) {
      setTitleStyle({
        opacity: 1,
        top: 100,
      });
      setPhotoStyle({
        opacity: 1,
        top: 400,
        width: "20%",
        rotate: "-8deg",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
        paddingTop: "12px",
        paddingInline: "12px",
        paddingBottom: "16px",
      });
      setTimeout(() => {
        setShowText(true);
      }, 1000);
    }
  });

  return (
    <section className="h-screen relative snap-start" ref={sectionRef}>
      {/* 얼굴 사진 */}
      <motion.div
        transition={{ duration: 2, ease: "easeInOut" }}
        animate={photoStyle}
        className="absolute top-[50%] -translate-y-1/2 right-0 w-[45%] h-auto bg-white"
      >
        <img
          src="/pictures/graduate.jpg"
          alt="폴라로이드"
          style={{
            width: "100%",
            display: "block",
          }}
        />
        <p
          lang="ko"
          className={`text-right mt-4 transition-opacity ease-in-out duration-1000 ${
            showText ? "opacity-100" : "opacity-0"
          }`}
        >
          2025.02 졸업
        </p>
      </motion.div>
      {/* 제목 */}
      <motion.div
        transition={{ duration: 2, ease: "easeInOut" }}
        animate={titleStyle}
        className=" absolute top-[50%] left-0 -translate-y-1/2 font-bold text-[24px]"
      >
        <span lang="ko">🌺 소개글 </span>
        <span lang="en">Introducing</span>
      </motion.div>

      {/* 아래 소개글 본문 */}

      <Interview />
    </section>
  );
}
