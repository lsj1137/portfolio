import Image from "next/image";
import { useState } from "react";

export default function ProjectCard({
  photo,
  title,
  content,
  detail,
  url,
  skills,
}: {
  photo: string;
  title: string;
  content: string;
  detail: string;
  url: string;
  skills: string[];
}) {
  const [hovering, setHovering] = useState(false);

  return (
    <div
      className=" relative flex flex-col cursor-pointer transition-all ease-in-out duration-200"
      onClick={() => window.open(url, "_blank")}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <Image
        src={photo}
        alt=""
        width={400}
        height={150}
        className="rounded-t-[20px]"
      />
      <div className="flex flex-col bg-white rounded-b-[20px] h-[120px] md:h-[150px] shadow p-5">
        <p lang="ko" className="flex-1 text-[16px]  md:text-[18px] mb-4">
          {title}
        </p>
        <div className="flex gap-5 justify-end">
          {skills.map((skill, i) => (
            <Image
              key={i}
              src={`/pictures/skills/${skill}.png`}
              alt={`${skill}`}
              width={30}
              height={30}
            />
          ))}
        </div>
      </div>
      <div
        className={` absolute flex flex-col gap-10 px-5 justify-center items-center h-full w-full text-[14px] md:text-[16px] text-center rounded-[20px] bg-white/90 transition-all ease-in-out duration-200 ${
          hovering ? "opacity-100" : " opacity-0"
        }`}
      >
        <p lang="ko">{content}</p>
        <p lang="ko" className="decoration-1 decoration-black">
          자세히 보기 🔗
        </p>
      </div>
    </div>
  );
}
