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
import { useEffect, useRef, useState } from "react";
import { useSectionStore } from "@/hooks/useSectionStore";
import Image from "next/image";
import PostIt from "@/components/PostIt";
import { getGuestbook, Guestbook, postGuestbook } from "@/api/guestbook";

export default function GuestBook() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const { section: curSection } = useSectionStore();
  const { screenHeight } = useScreenStore();
  const { scrollY } = useScroll();
  const [showGuestbook, setShowGuestbook] = useState(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [guestbooks, setGuestbooks] = useState<Guestbook[]>([]);

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

  const scrollBy = (distance: number) => {
    scrollRef.current?.scrollBy({ left: distance, behavior: "smooth" });
  };

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
  };

  useEffect(() => {
    // TODO
    getGuestbook().then((data) => {
      setGuestbooks(data);
    });
  }, []);

  useEffect(() => {
    checkScroll();

    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [showGuestbook]);

  useEffect(() => {
    checkScroll();
  }, [guestbooks]);

  const handleSubmit = (value: string) => {
    postGuestbook({ name: "익명", content: value });
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
          <div
            className={`guestbook-left guestbook-right h-[70%] mt-[170px] flex flex-col items-center gap-8 ${
              canScrollLeft ? "show-left-gradient" : ""
            } ${canScrollRight ? "show-right-gradient" : ""}`}
          >
            <form
              className="flex items-center w-full md:w-[65%] h-11 rounded-[10px] bg-white shadow py-4 px-3"
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(inputValue);
              }}
            >
              <input
                lang="ko"
                className="w-full focus:outline-none"
                placeholder="최대 50자"
                maxLength={50}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
                onSubmit={() => {
                  handleSubmit(inputValue);
                }}
                value={inputValue}
                type="text"
              />
              <button type="submit">
                <Image
                  src={"/pictures/send.png"}
                  width={24}
                  height={24}
                  alt="send button"
                  className="w-6 h-6 hover-target"
                ></Image>
              </button>
            </form>
            <div
              className=" relative grid w-full overflow-x-auto scrollbar-hide flex-1 grid-flow-col grid-rows-3 md:grid-rows-2 gap-5 auto-cols-max "
              ref={scrollRef}
            >
              {guestbooks.map((guestbook, i) => (
                <PostIt
                  key={i}
                  content={guestbook.content}
                  name={guestbook.name}
                />
              ))}
            </div>
            {canScrollLeft && (
              <button
                className="absolute left-0 top-1/2 z-100 p-2"
                onClick={() => scrollBy(-480)}
              >
                <img
                  src={"/arrow_bottom.png"}
                  width={70}
                  className="rotate-90"
                ></img>
              </button>
            )}
            {canScrollRight && (
              <button
                className="absolute right-0 top-1/2 z-100 p-2"
                onClick={() => scrollBy(480)}
              >
                <img
                  src={"/arrow_bottom.png"}
                  width={70}
                  className="-rotate-90"
                ></img>
              </button>
            )}
            <p lang="ko" className="text-left w-full text-gray-500">
              방명록은 최근 30개까지만 조회가 가능합니다.
            </p>
          </div>
        )}
      </div>
    )
  );
}
