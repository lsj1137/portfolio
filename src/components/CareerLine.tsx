export default function CareerLine({
  date,
  isPeriod = false,
  content,
}: {
  date: string;
  isPeriod: boolean;
  content: string;
}) {
  return (
    <div className={`flex ${isPeriod ? "gap-3 md:gap-10" : "gap-6 md:gap-30"}`}>
      <p lang="en">{date}</p>
      <p lang="ko">{content}</p>
    </div>
  );
}
