export default function PostIt({ content }: { content: string }) {
  return (
    <div className="bg-[#FBFFCA] p-6 w-[180px] h-180px md:w-[240px] md:h-[240px] shadow">
      <p lang="ko">{content}</p>
    </div>
  );
}
