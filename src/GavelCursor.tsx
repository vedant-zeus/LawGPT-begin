import React, { useEffect, useState } from "react";
import "./GavelCursor.css"; // We'll add the animation CSS here

const GavelCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const click = () => {
      setIsClicking(true);
      setTimeout(() => setIsClicking(false), 400); // Reset after animation
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", click);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", click);
    };
  }, []);

  return (
    <div
      className={`gavel-cursor ${isClicking ? "clicking" : ""}`}
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      <img
        src="/gavel.svg"
        alt="Gavel Cursor"
        className="w-10 h-10"
        draggable="false"
      />
    </div>
  );
};

export default GavelCursor;
