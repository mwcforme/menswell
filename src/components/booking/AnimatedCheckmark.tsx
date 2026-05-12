import { useEffect, useState } from "react";

const AnimatedCheckmark = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <svg width="96" height="96" viewBox="0 0 96 96" className="mx-auto">
      <circle
        cx="48"
        cy="48"
        r="44"
        fill="none"
        stroke="#22C55E"
        strokeWidth="3"
        strokeDasharray="276.46"
        strokeDashoffset={animate ? 0 : 276.46}
        style={{ transition: "stroke-dashoffset 0.6s ease-out" }}
      />
      <polyline
        points="30,50 44,64 68,36"
        fill="none"
        stroke="#22C55E"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="60"
        strokeDashoffset={animate ? 0 : 60}
        style={{ transition: "stroke-dashoffset 0.4s ease-out 0.4s" }}
      />
    </svg>
  );
};

export default AnimatedCheckmark;
