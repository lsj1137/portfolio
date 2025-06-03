import { careerList } from "@/constants/careerList";
import CareerLine from "./CareerLine";
import { motion } from "motion/react";
import { useScreenStore } from "@/hooks/useScreenStore";

export default function Career() {
  const { screenHeight, screenWidth } = useScreenStore();
  return (
    <div className="flex flex-col gap-8">
      {careerList.map((career, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.5 }}
          style={{
            fontWeight: "bold",
          }}
        >
          <CareerLine
            date={career.date}
            isPeriod={career.date.length > 10}
            content={career.content}
          />
        </motion.div>
      ))}
    </div>
  );
}
