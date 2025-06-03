import { useEffect } from "react";

export default function ScrollTrigger({
  onTrigger,
}: {
  onTrigger: () => void;
}) {
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 5;

      if (isAtBottom && e.deltaY > 0) {
        onTrigger();
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [onTrigger]);

  return null;
}
