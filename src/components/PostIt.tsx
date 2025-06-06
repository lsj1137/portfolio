import { Guestbook } from "@/api/guestbook";

export default function PostIt({ content, name }: Guestbook) {
  return (
    <div className="flex flex-col bg-[#FBFFCA] p-6 w-[180px] h-180px md:w-[240px] md:h-[240px] shadow">
      <p lang="ko" className="flex-1">
        {content}
      </p>
      <p lang="ko" className="text-right">
        {name}
      </p>
    </div>
  );
}
