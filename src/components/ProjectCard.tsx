import Image from "next/image";

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
  return (
    <div
      className="flex flex-col cursor-pointer"
      onClick={() => window.open(url, "_blank")}
    >
      <Image src={photo} alt="" width={400} height={150} />
      <div className="flex flex-col bg-white rounded-b-[20px] h-[200px] shadow p-5">
        <p lang="ko" className="text-[18px] mb-4">
          {title}
        </p>
        <p lang="ko" className="text-[16px] flex-1">
          {content}
        </p>
        <div className="flex gap-5">
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
    </div>
  );
}
