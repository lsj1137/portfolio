import { careerList } from "@/constants/careerList";
import CareerLine from "./CareerLine";

export default function Career() {
  return (
    <div className="flex flex-col h-dvh gap-10">
      {careerList.map((career, i) => (
        <CareerLine
          key={i}
          date={career.date}
          isPeriod={career.date.length > 10}
          content={career.content}
        />
      ))}
    </div>
  );
}
