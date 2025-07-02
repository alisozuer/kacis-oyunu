"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const noButtonRef = useRef<HTMLButtonElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [question] = useState("Beni seviyor musun Ayşenur? 💖");
  const [yesClicked, setYesClicked] = useState(false);

  const moveNoButton = () => {
    const button = noButtonRef.current;
    const container = containerRef.current;
    const yesButton = container?.querySelector('button:first-child');

    if (button && container && yesButton) {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      const buttonWidth = button.offsetWidth;
      const buttonHeight = button.offsetHeight;

      const yesButtonWidth = (yesButton as HTMLElement).offsetWidth;

      const minX = yesButtonWidth + 20;
      const maxX = containerWidth - buttonWidth;
      const maxY = containerHeight - buttonHeight;

      const randomX = Math.floor(Math.random() * (maxX - minX)) + minX;
      const randomY = Math.floor(Math.random() * maxY);

      button.style.left = `${randomX}px`;
      button.style.top = `${randomY}px`;
    }
  };

  useEffect(() => {
    const handleTouch = (e: TouchEvent) => {
      if (e.target === noButtonRef.current) {
        moveNoButton();
      }
    };

    document.addEventListener("touchstart", handleTouch);
    return () => {
      document.removeEventListener("touchstart", handleTouch);
    };
  }, []);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #fddde6, #fef6f9)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        position: "relative",
        fontFamily: "'Comic Neue', cursive",
        padding: "1rem",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          marginBottom: "2.5rem",
          fontSize: "2rem",
          color: "#c71585",
          fontWeight: 700,
          textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
        }}
      >
        {yesClicked ? "Evet evet ben de seni seviyorum :)" : question}
      </h1>

      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "90vw",
          maxWidth: "600px",
          height: "600px",
          borderRadius: "20px",
          background: "#fff0f5",
          padding: "1rem",
        }}
      >
        <button
          onClick={() => setYesClicked(true)}
          style={{
            padding: "1rem 2.5rem",
            fontSize: "1.2rem",
            borderRadius: "50px",
            border: "none",
            background: "linear-gradient(45deg, #ff69b4, #ff1493)",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
            position: "absolute",
            left: "20px",
            top: "20px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            transition: "transform 0.1s ease",
          }}
        >
          💌 Evet
        </button>

        <button
          ref={noButtonRef}
          onMouseEnter={moveNoButton}
          style={{
            padding: "1rem 2.5rem",
            fontSize: "1.2rem",
            borderRadius: "50px",
            border: "1px solid #ff4d4d",
            backgroundColor: "rgba(224, 36, 94, 0.1)",
            color: "#ff4d4d",
            fontWeight: "bold",
            cursor: "pointer",
            position: "absolute",
            left: "200px",
            top: "20px",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 8px rgba(255,77,77,0.3)",
          }}
        >
          ❌ Hayır
        </button>
      </div>
    </div>
  );
}
