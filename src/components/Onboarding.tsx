import { LastUpdate, MyEmail } from "@/constants/version";
import "../styles/onboarding-style.css";
import Flower from "./Flower";
import TitleBar from "./TitleBar";

export default function Onboarding() {
  return (
    <>
      <header className="flex justify-between mt-9">
        <p>Last Update: {LastUpdate}</p>
        <p>{MyEmail}</p>
      </header>
      <TitleBar />
      <Flower />
      <span lang="ko" className="absolute bottom-9 right-[13%]">
        웹 프론트엔드 & 모바일 앱 개발자
      </span>
    </>
  );
}
