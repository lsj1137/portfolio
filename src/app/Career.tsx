import { careerList } from "@/constants/careerList";
import CareerLine from "../components/CareerLine";
import {
  AnimationControls,
  motion,
  TargetAndTransition,
  useMotionValueEvent,
  useScroll,
  VariantLabels,
} from "motion/react";
import { useScreenStore } from "@/hooks/useScreenStore";
import { useState } from "react";
import { useSectionStore } from "@/hooks/useSectionStore";
import ScrollTrigger from "@/components/ScrollTrigger";

export default function Career() {
  const { section: curSection, increase: increaseSection } = useSectionStore();
  const { screenHeight, screenWidth } = useScreenStore();
  const { scrollY } = useScroll();
  const [showCareer, setShowCareer] = useState(false);

  const [titleStyle, setTitleStyle] = useState<
    | boolean
    | TargetAndTransition
    | VariantLabels
    | AnimationControls
    | undefined
  >({});

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest >= screenHeight * 4) {
      setTitleStyle({
        opacity: 1,
        top: 100,
      });
      // setPhotoStyle({
      //   opacity: 1,
      //   width: "20%",
      //   boxShadow: "0 8px 20px rgba(0, 0, 0, 0.25)",
      //   padding: "12px",
      // });
      setTimeout(() => {
        setShowCareer(true);
      }, 1000);
    }
  });
  const handleScrollTrigger = () => {
    if (curSection === 4) {
      increaseSection();
    }
  };

  return (
    curSection > 3 && (
      <section className=" h-screen relative ">
        <ScrollTrigger onTrigger={handleScrollTrigger} />
        <motion.div
          transition={{ duration: 2, ease: "easeInOut" }}
          animate={titleStyle}
          className=" absolute top-[50%] left-0 -translate-y-1/2 font-bold text-[24px]"
        >
          <span lang="ko">🪷 경력 사항 </span>
          <span lang="en">Career</span>
        </motion.div>
        {showCareer && (
          <div className="mt-[20%] flex flex-col gap-8">
            {careerList.map((career, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
                viewport={{ once: false, amount: 0.5 }}
                style={{}}
              >
                <CareerLine
                  date={career.date}
                  isPeriod={career.date.length > 10}
                  content={career.content}
                />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    )
  );
}
