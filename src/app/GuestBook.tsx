import "@/styles/guestbook-style.css";
import {
  AnimationControls,
  motion,
  TargetAndTransition,
  useMotionValueEvent,
  useScroll,
  VariantLabels,
} from "motion/react";
import { useScreenStore } from "@/hooks/useScreenStore";
import { useEffect, useState } from "react";
import { useSectionStore } from "@/hooks/useSectionStore";
import Image from "next/image";
import PostIt from "@/components/PostIt";

export default function GuestBook() {
  const { section: curSection } = useSectionStore();
  const { screenHeight, screenWidth } = useScreenStore();
  const { scrollY } = useScroll();
  const [showGuestbook, setShowGuestbook] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [guestbook, setGuestbook] = useState<string[]>([]);

  const [titleStyle, setTitleStyle] = useState<
    | boolean
    | TargetAndTransition
    | VariantLabels
    | AnimationControls
    | undefined
  >({});

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest >= screenHeight * 5) {
      setTitleStyle({
        opacity: 1,
        top: 100,
      });
      setTimeout(() => {
        setShowGuestbook(true);
      }, 1000);
    }
  });

  useEffect(() => {}, []);

  const handleSubmit = (value: string) => {
    setGuestbook((prev) => [value, ...prev]);
    setInputValue("");
  };

  return (
    curSection > 4 && (
      <div className=" h-screen relative ">
        <motion.div
          transition={{ duration: 2, ease: "easeInOut" }}
          animate={titleStyle}
          className=" absolute top-[50%] left-0 -translate-y-1/2 font-bold text-[24px]"
        >
          <span lang="ko">🌻 방명록 </span>
          <span lang="en">Guestbook</span>
        </motion.div>
        {showGuestbook && (
          <div className="guestbook-left guestbook-right h-[70%] mt-[20%] flex flex-col items-center gap-8">
            <div className="flex items-center w-full md:w-[65%] h-11 rounded-[10px] bg-white shadow py-4 px-3">
              <input
                lang="ko"
                className="w-full focus:outline-none"
                placeholder="최대 50자"
                maxLength={50}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                value={inputValue}
                type="text"
              />
              <Image
                src={"/pictures/send.png"}
                width={24}
                height={24}
                alt="send button"
                className="w-6 h-6 hover-target"
                onClick={() => {
                  handleSubmit(inputValue);
                }}
              ></Image>
            </div>
            <div className="  relative grid w-full overflow-x-auto scrollbar-hide flex-1 grid-flow-col grid-rows-3 md:grid-rows-2 gap-5 auto-cols-max">
              {guestbook.map((content, i) => (
                <PostIt key={i} content={content} />
              ))}
            </div>
            <p lang="ko" className="text-left w-full text-gray-500">
              방명록은 최근 30개까지만 조회가 가능합니다.
            </p>
          </div>
        )}
      </div>
    )
  );
}
