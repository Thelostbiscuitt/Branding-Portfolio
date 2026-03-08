"use client";

import { useEffect, useState, useCallback } from "react";

export function LightSwitch() {
  const [dark, setDark] = useState(false);
  const [flicking, setFlicking] = useState(false);

  // Initialise from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggle = useCallback(() => {
    setFlicking(true);
    setTimeout(() => setFlicking(false), 180);

    setDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      }
      return next;
    });
  }, []);

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      title={dark ? "Lights on" : "Lights off"}
      className="relative select-none focus-visible:outline-none group"
      style={{ cursor: "none" }}
    >
      {/* Switch plate */}
      <div
        className="relative flex flex-col items-center justify-center rounded-[3px]"
        style={{
          width: 28,
          height: 44,
          background: dark ? "#1a1814" : "#e8e4de",
          border: `1px solid ${dark ? "#2e2b27" : "#c8c3bc"}`,
          boxShadow: dark
            ? "inset 0 1px 3px rgba(0,0,0,0.6), 0 1px 0 rgba(255,255,255,0.04)"
            : "inset 0 1px 2px rgba(0,0,0,0.12), 0 1px 0 rgba(255,255,255,0.9), 0 2px 4px rgba(0,0,0,0.08)",
          transition: "background 0.3s, border-color 0.3s, box-shadow 0.3s",
        }}
      >
        {/* Rocker paddle */}
        <div
          style={{
            width: 18,
            height: 32,
            borderRadius: 2,
            background: dark
              ? "linear-gradient(180deg, #2a2724 0%, #222018 100%)"
              : "linear-gradient(180deg, #f5f2ee 0%, #dedad4 100%)",
            border: `1px solid ${dark ? "#3a3630" : "#b8b3ac"}`,
            boxShadow: dark
              ? flicking
                ? "inset 0 -2px 4px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.06)"
                : "inset 0 2px 4px rgba(0,0,0,0.5), 0 -1px 0 rgba(255,255,255,0.04)"
              : flicking
              ? "inset 0 2px 4px rgba(0,0,0,0.15), 0 -1px 0 rgba(255,255,255,0.9)"
              : "inset 0 -2px 3px rgba(0,0,0,0.08), 0 2px 0 rgba(255,255,255,0.95)",
            transform: dark
              ? flicking ? "rotateX(-4deg)" : "rotateX(8deg)"
              : flicking ? "rotateX(4deg)"  : "rotateX(-8deg)",
            transformOrigin: "50% 50%",
            perspective: 100,
            transition: "transform 0.12s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.12s, background 0.3s, border-color 0.3s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Screw line detail */}
          <div style={{
            width: 8,
            height: 1,
            background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.1)",
            borderRadius: 1,
          }} />
        </div>

        {/* Tiny indicator dot */}
        <div
          style={{
            position: "absolute",
            bottom: 4,
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: dark ? "#e05528" : "#c8bfb4",
            boxShadow: dark ? "0 0 6px 2px rgba(224,85,40,0.5)" : "none",
            transition: "background 0.3s, box-shadow 0.3s",
          }}
        />
      </div>
    </button>
  );
}
