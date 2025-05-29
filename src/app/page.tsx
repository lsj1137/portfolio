import Introducing from "@/components/Introducing";
import Onboarding from "@/components/Onboarding";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col">
      <Onboarding />
      <Introducing />
    </div>
  );
}
