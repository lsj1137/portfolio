import { LastUpdate, MyEmail } from "@/constants/version";
import "../styles/onboarding-style.css";
import Flower from "./Flower";
import TitleBar from "./TitleBar";
import { motion } from "motion/react";

export default function Onboarding() {
  return (
    <div className="h-dvh">
      <header className="flex justify-between mt-9">
        <p>Last Update: {LastUpdate}</p>
        <p>{MyEmail}</p>
      </header>
      <TitleBar />
      <Flower />
      <img
        src={"/arrow_bottom.png"}
        width={"7%"}
        className="absolute bottom-24 left-[50%] -translate-x-1/2 animate-bounce"
      ></img>
      <img
        src={"/arrow_bottom.png"}
        width={"7%"}
        className="absolute bottom-22 left-[50%] -translate-x-1/2 animate-bounce"
      ></img>
      <span lang="ko" className="absolute bottom-9 right-[13%]">
        웹 프론트엔드 & 모바일 앱 개발자
      </span>
    </div>
  );
}
