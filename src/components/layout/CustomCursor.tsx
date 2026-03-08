"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef  = useRef({ x: 0, y: 0, rx: 0, ry: 0 });
  const rafRef  = useRef<number>(0);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover)").matches) return;

    const onMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top  = e.clientY + "px";
      }
    };

    const loop = () => {
      const { x, y, rx, ry } = posRef.current;
      posRef.current.rx = rx + (x - rx) * 0.12;
      posRef.current.ry = ry + (y - ry) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = posRef.current.rx + "px";
        ringRef.current.style.top  = posRef.current.ry + "px";
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    const onEnter = () => {
      dotRef.current?.classList.add("hov");
      ringRef.current?.classList.add("hov");
    };
    const onLeave = () => {
      dotRef.current?.classList.remove("hov");
      ringRef.current?.classList.remove("hov");
    };

    document.addEventListener("mousemove", onMove);
    document.querySelectorAll("a,button,[role='button'],.proj-row").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed z-[9999] pointer-events-none w-2.5 h-2.5 rounded-full bg-terra -translate-x-1/2 -translate-y-1/2 mix-blend-multiply transition-[width,height] duration-200"
        style={{ transitionProperty: "width,height,opacity" }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed z-[9998] pointer-events-none w-9 h-9 rounded-full border border-terra/40 -translate-x-1/2 -translate-y-1/2 transition-[width,height,border-color] duration-300"
      />
    </>
  );
}
