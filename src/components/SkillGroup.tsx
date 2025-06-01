import Image from "next/image";
import { useEffect, useState } from "react";

export default function SkillGroup({
  groupName,
  skills,
  cols = 3,
}: {
  groupName: string;
  skills: Array<string>;
  cols?: number;
}) {
  const [rows, setRows] = useState<string[][]>([]);

  useEffect(() => {
    const newRows: string[][] = [];
    for (let i = 0; i < Math.ceil(skills.length / cols); i++) {
      newRows.push(skills.slice(i * cols, (i + 1) * cols));
    }
    setRows(newRows);
  }, [skills]);

  return (
    <div className="flex flex-col items-center gap-4 md:gap-8">
      <p lang="ko" className="text-[18px]">
        {groupName}
      </p>
      <div
        className={`flex flex-col h-[156px] md:h-[256px] w-[90%] bg-[#A8A8A8]/[18%] rounded-[10px] justify-center items-center gap-8`}
      >
        {rows.map((row, i) => (
          <div key={i} className="flex gap-8">
            {row.map((skill, i) => {
              return (
                <div
                  key={i}
                  className="w-[30px] h-[30px] md:w-[50px] md:h-[50px]"
                >
                  <Image
                    alt={skill}
                    src={`/pictures/skills/${skill}.png`}
                    width={50}
                    height={50}
                  ></Image>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
