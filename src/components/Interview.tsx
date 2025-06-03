import { useScreenStore } from "@/hooks/useScreenStore";
import { motion } from "motion/react";

export default function Interview() {
  const { screenHeight, screenWidth } = useScreenStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
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
      <p lang="ko">
        안녕하세요, <br />웹 프론트엔드와 크로스플랫폼 모바일 앱을 개발하는
        임세준입니다.
      </p>
      <br />
      {/* <p lang="ko">
        2022년부터 앱을 개발하며 각종 공모전에서 수상해왔고, 인턴으로 일하며
        <br />
        실무 경험도 쌓았습니다. 25년도부터는 웹 프론트엔드에 도전하였습니다.
      </p>
      <br /> */}
      <p lang="ko">
        사용자가 제 서비스에 만족감을 느낄 때 가장 행복합니다.
        <br />
        사용자가 만족하는 순간까지 책임감을 가지고 최선을 다하겠습니다.
      </p>
      <br />
      <div className=" grid grid-cols-2 md:grid-cols-4">
        <p lang="ko"># 사용자_우선</p>
        <p lang="ko"># 긍정적_사고</p>
        <p lang="ko"># 즐거운_마음</p>
        <p lang="ko"># 책임감</p>
      </div>
    </motion.div>
  );
}
