import { useEffect, useRef } from "react";
import gsap from "gsap";

export function Flame({ className = "", glowBoost = false }: { className?: string; glowBoost?: boolean }) {
  const flameRef = useRef<SVGGElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!flameRef.current) return;

    // Organic flame flickering & swaying motion
    const tween = gsap.to(flameRef.current, {
      scaleY: 1.15,
      scaleX: 0.92,
      rotation: 1.8,
      duration: 0.25,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      transformOrigin: "50% 100%",
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Radial Warm Flame Glow */}
      <div
        ref={glowRef}
        className={`absolute -top-12 w-28 h-28 rounded-full bg-[#f59e0b]/40 blur-xl pointer-events-none transition-all duration-700 ${
          glowBoost ? "scale-150 opacity-95 bg-[#fef08a]/60 blur-2xl" : "scale-100 opacity-70"
        }`}
      />

      {/* Vector Flame SVG */}
      <svg
        viewBox="0 0 60 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-20 sm:w-14 sm:h-24 md:w-16 md:h-28 overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="flameOuter" cx="50%" cy="80%" r="60%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="75%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#b91c1c" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="flameCore" cx="50%" cy="85%" r="45%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="60%" stopColor="#fef08a" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.8" />
          </radialGradient>
        </defs>

        <g ref={flameRef} style={{ transformOrigin: "30px 95px" }}>
          {/* Outer Tear-Drop Flame */}
          <path
            d="M 30 5 C 12 35 8 60 16 78 C 22 92 38 92 44 78 C 52 60 48 35 30 5 Z"
            fill="url(#flameOuter)"
            filter="drop-shadow(0 0 10px rgba(245,158,11,0.8))"
          />

          {/* Inner Bright Core */}
          <path
            d="M 30 25 C 20 45 18 62 23 75 C 26 84 34 84 37 75 C 42 62 40 45 30 25 Z"
            fill="url(#flameCore)"
          />

          {/* Incandescent Flame Tip Spark */}
          <ellipse cx="30" cy="72" rx="3.5" ry="6" fill="#ffffff" opacity="0.95" />
        </g>
      </svg>
    </div>
  );
}

export function AntiqueDiya({
  glowBoost = false,
  className = "",
}: {
  glowBoost?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      {/* Animated Diya Flame */}
      <div className="relative -mb-4 z-20">
        <Flame glowBoost={glowBoost} />
      </div>

      {/* Antique Brass Diya Body SVG */}
      <div className="relative z-10 w-[140px] sm:w-[170px] md:w-[200px] filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)]">
        <svg
          viewBox="0 0 200 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto overflow-visible"
        >
          <defs>
            <linearGradient id="brassGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="25%" stopColor="#d97706" />
              <stop offset="65%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
            <linearGradient id="rimGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="35%" stopColor="#fef08a" />
              <stop offset="70%" stopColor="#d97706" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
            <radialGradient id="oilPool" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#b45309" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#451a03" />
            </radialGradient>
          </defs>

          {/* Diya Base / Pedestal */}
          <path
            d="M 65 92 Q 100 106 135 92 L 140 104 Q 100 112 60 104 Z"
            fill="url(#brassGrad)"
            stroke="#451a03"
            strokeWidth="1.2"
          />

          {/* Main Handcrafted Diya Bowl */}
          <path
            d="M 15 35 C 10 75 55 98 100 98 C 145 98 190 75 185 35 C 160 48 135 52 100 52 C 65 52 40 48 15 35 Z"
            fill="url(#brassGrad)"
            stroke="#78350f"
            strokeWidth="1.5"
          />

          {/* Oil Pool inside Diya */}
          <ellipse cx="100" cy="40" rx="72" ry="14" fill="url(#oilPool)" />

          {/* Wick Spout Pinched Tip */}
          <path
            d="M 92 38 Q 100 24 108 38 Q 100 42 92 38 Z"
            fill="#451a03"
            stroke="#fef08a"
            strokeWidth="0.8"
          />

          {/* Carved Ornamental Rim Line */}
          <path
            d="M 15 35 Q 100 54 185 35"
            stroke="url(#rimGrad)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Traditional Embossed Lotus Petal Carvings on Bowl */}
          <path d="M 40 54 Q 50 78 60 56" stroke="#fef08a" strokeWidth="1" opacity="0.6" fill="none" />
          <path d="M 65 58 Q 78 84 90 59" stroke="#fef08a" strokeWidth="1" opacity="0.7" fill="none" />
          <path d="M 110 59 Q 122 84 135 58" stroke="#fef08a" strokeWidth="1" opacity="0.7" fill="none" />
          <path d="M 140 56 Q 150 78 160 54" stroke="#fef08a" strokeWidth="1" opacity="0.6" fill="none" />

          {/* Brass Highlight Specular Streak */}
          <path
            d="M 30 52 C 45 78 80 88 100 88"
            stroke="#ffffff"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.35"
            fill="none"
          />
        </svg>
      </div>

      {/* Cast Shadow on Haveli Surface */}
      <div className="w-32 sm:w-40 md:w-48 h-4 bg-black/70 rounded-full blur-md -mt-2.5 pointer-events-none" />
    </div>
  );
}
