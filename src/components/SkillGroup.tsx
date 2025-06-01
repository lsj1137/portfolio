import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function SkillGroup({
  groupName,
  skills,
  urls,
  cols = 3,
}: {
  groupName: string;
  skills: Array<string>;
  urls: Array<string>;
  cols?: number;
}) {
  const [rows, setRows] = useState<string[][]>([]);
  const [showTooltip, setShowTooltip] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [skillDescription, setSkillDescription] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left + 10,
      y: e.clientY - rect.top + 12,
    });
  };

  const handleMouseEnter = (skill: string) => {
    setSkillDescription(skill);
    setShowTooltip(true);
  };
  const handleMouseLeave = () => setShowTooltip(false);

  const handleClick = (url: string) => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    const newRows: string[][] = [];
    for (let i = 0; i < Math.ceil(skills.length / cols); i++) {
      newRows.push(skills.slice(i * cols, (i + 1) * cols));
    }
    setRows(newRows);
  }, [skills]);

  return (
    <div
      className="relative flex flex-col items-center gap-4 md:gap-8"
      ref={containerRef}
    >
      <p lang="ko" className="text-[18px]">
        {groupName}
      </p>
      <div
        className={`relative flex flex-col h-[156px] md:h-[256px] w-[90%] bg-[#A8A8A8]/[18%] rounded-[10px] justify-center items-center gap-8`}
      >
        {rows.map((row, i) => (
          <div key={i} className="flex gap-8">
            {row.map((skill, j) => {
              return (
                <div
                  key={j}
                  className="w-[30px] h-[30px] md:w-[50px] md:h-[50px]"
                >
                  <Image
                    alt={skill}
                    src={`/pictures/skills/${skill}.png`}
                    width={50}
                    height={50}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => handleMouseEnter(skill)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(urls[cols * i + j])}
                    className=" cursor-pointer"
                  ></Image>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {showTooltip && (
        <div
          className="absolute z-50 pointer-events-none bg-white px-3 py-2 rounded shadow"
          style={{ top: mousePosition.y, left: mousePosition.x }}
        >
          <p lang="en" className="text-xs text-black">
            {skillDescription}
          </p>
        </div>
      )}
    </div>
  );
}
