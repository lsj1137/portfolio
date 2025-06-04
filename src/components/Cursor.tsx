"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    const followMouse = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.1;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.1;

      const el = document.elementFromPoint(mouse.current.x, mouse.current.y);
      if (el?.classList.contains("hover-target")) {
        cursorRef.current?.classList.add("hovering");
      } else {
        cursorRef.current?.classList.remove("hovering");
      }

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }

      requestAnimationFrame(followMouse);
    };

    followMouse();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* 실제 커서를 숨김 */}
      {/* <style>{`body { cursor: none; }`}</style> */}
      <div
        ref={cursorRef}
        className="fixed -top-3 -left-3 w-12 h-12 bg-[url('/pictures/bee.png')]  bg-contain bg-no-repeat rounded-full pointer-events-none z-[9999]"
      ></div>
    </>
  );
}
