"use client";

import { useRef } from "react";
import { useScroll, useAnimate, useMotionValueEvent } from "motion/react";

export default function Introducing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const [titleScope, titleAnimate] = useAnimate();
  const [photoScope, photoAnimate] = useAnimate();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (!sectionRef.current) return;

    const sectionTop = sectionRef.current.offsetTop;
    const sectionHeight = sectionRef.current.offsetHeight;

    const scrollWithinSection = latest - sectionTop;

    // 스크롤이 컴포넌트 범위 안일 때만 애니메이션 실행
    if (scrollWithinSection >= 0 && scrollWithinSection <= sectionHeight) {
      const viewportHeight = innerHeight;
      // 이동 범위를 제한 (예: 최대 100px)
      const maxMove = viewportHeight + 200;
      const percent = scrollWithinSection / sectionHeight;
      const moveY = percent * maxMove;

      titleAnimate(
        titleScope.current,
        {
          transform: `translateY(${moveY}px)`,
        },
        {
          duration: 0.2,
          ease: "easeOut",
        }
      );

      photoAnimate(
        photoScope.current,
        {
          transform: `translateY(${moveY + 500 * percent}px) translateX(${
            400 * percent
          }px) scale(${1 - percent}) rotate(-${percent * 10}deg)`,
        },
        {
          duration: 0.2,
          ease: "easeInOut",
        }
      );
    }
  });

  return (
    <div className="h-[200dvh] relative" ref={sectionRef}>
      {/* 제목 */}
      <div
        ref={titleScope}
        className=" absolute top-[25%] left-0 -translate-y-1/2 font-bold text-[20px]"
      >
        <span lang="ko">🌺 소개글 </span>
        <span lang="en">Introducing</span>
      </div>

      {/* 얼굴 사진 */}
      <div
        ref={photoScope}
        style={{
          backgroundImage: `url('/pictures/graduate.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className=" absolute  top-[25%] right-0 -translate-y-1/2 w-[600px] h-[40%]"
      />

      {/* 아래 소개글 본문 */}
      <div className="absolute top-[calc(50%+200px)]">
        <p lang="ko">
          안녕하세요, 웹 프론트엔드와 크로스플랫폼 모바일 앱을 개발하는
          <br />
          임세준입니다.
        </p>
        <br />
        <p lang="ko">
          2022년부터 앱을 개발하며 각종 공모전에서 수상해왔고, 인턴으로 일하며
          <br />
          실무 경험도 쌓았습니다. 25년도부터는 웹 프론트엔드에 도전하였습니다.
        </p>
        <br />
        <p lang="ko">
          사용자가 제 서비스에 만족감을 느낄 때 가장 행복합니다. 사용자가
          <br />
          만족할때까지 책임감을 갖고 최선을 다하겠습니다.
        </p>
        <br />
        <p lang="ko">#책임감</p>
        <p lang="ko">#긍정적_사고</p>
        <p lang="ko">#사용자_우선</p>
        <p lang="ko">#즐거운_마음</p>
      </div>
    </div>
  );
}
