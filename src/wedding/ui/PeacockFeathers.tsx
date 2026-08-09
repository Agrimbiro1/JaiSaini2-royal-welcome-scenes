import { useMemo } from "react";

// Pseudo-random generator using sine seeds for completely unaligned properties
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Detailed Vector Peacock Feather SVG
 */
export function PeacockFeatherIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="eyeCoreRnd2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1e1b4b" />
          <stop offset="45%" stopColor="#2563eb" />
          <stop offset="70%" stopColor="#0d9488" />
          <stop offset="90%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#059669" />
        </radialGradient>
        <radialGradient id="eyeHaloRnd2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="60%" stopColor="#059669" />
          <stop offset="90%" stopColor="#eab308" />
          <stop offset="100%" stopColor="#15803d" />
        </radialGradient>
        <linearGradient id="stemGradRnd2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="50%" stopColor="#ca8a04" />
          <stop offset="100%" stopColor="#854d0e" opacity="0.6" />
        </linearGradient>
        <linearGradient id="barbTealRnd2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id="barbGoldRnd2" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#facc15" />
          <stop offset="100%" stopColor="#0f766e" />
        </linearGradient>
      </defs>

      {/* Central Stem */}
      <path
        d="M 50 15 Q 49 100 50 235"
        stroke="url(#stemGradRnd2)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Outer Radiating Fine Feather Barbs */}
      <g stroke="url(#barbTealRnd2)" strokeWidth="0.8" strokeLinecap="round" opacity="0.8">
        <path d="M 50 25 Q 35 10 20 18" />
        <path d="M 50 25 Q 65 10 80 18" />
        <path d="M 50 30 Q 25 20 10 32" />
        <path d="M 50 30 Q 75 20 90 32" />
        <path d="M 50 38 Q 20 32 5 48" />
        <path d="M 50 38 Q 80 32 95 48" />
        <path d="M 50 50 Q 18 52 8 68" />
        <path d="M 50 50 Q 82 52 92 68" />
        <path d="M 50 62 Q 20 68 12 85" />
        <path d="M 50 62 Q 80 68 88 85" />
        <path d="M 50 75 Q 22 82 15 100" />
        <path d="M 50 75 Q 78 82 85 100" />
      </g>

      <g stroke="url(#barbGoldRnd2)" strokeWidth="0.7" strokeLinecap="round" opacity="0.7">
        <path d="M 50 90 Q 25 100 18 118" />
        <path d="M 50 90 Q 75 100 82 118" />
        <path d="M 50 105 Q 28 118 22 135" />
        <path d="M 50 105 Q 72 118 78 135" />
        <path d="M 50 120 Q 30 135 25 152" />
        <path d="M 50 120 Q 70 135 75 152" />
        <path d="M 50 138 Q 32 152 28 170" />
        <path d="M 50 138 Q 68 152 72 170" />
        <path d="M 50 155 Q 35 170 32 188" />
        <path d="M 50 155 Q 65 170 68 188" />
      </g>

      {/* Peacock Ocellus (Eye) */}
      <ellipse cx="50" cy="40" rx="20" ry="16" fill="url(#eyeHaloRnd2)" opacity="0.9" />
      <ellipse cx="50" cy="40" rx="15" ry="12" fill="#0d9488" opacity="0.9" />
      <ellipse cx="50" cy="40" rx="12" ry="9" fill="#f59e0b" opacity="0.9" />

      {/* Iridescent Core */}
      <path
        d="M 50 33 C 44 33 40 36 40 41 C 40 46 45 49 50 49 C 55 49 60 46 60 41 C 60 36 56 33 50 33 Z"
        fill="url(#eyeCoreRnd2)"
      />
      <ellipse cx="48" cy="38" rx="3" ry="2" fill="#60a5fa" opacity="0.85" />
      <circle cx="47" cy="37" r="1.2" fill="#ffffff" opacity="0.9" />
    </svg>
  );
}

/**
 * Falling Golden Marigold & Rose Petals (Completely Unaligned & Random)
 */
export function GoldenPetals({
  count = 35,
  active = true,
}: {
  count?: number;
  active?: boolean;
}) {
  const petals = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const r1 = pseudoRandom(i * 17 + 3.1);
      const r2 = pseudoRandom(i * 31 + 19.4);
      const r3 = pseudoRandom(i * 47 + 29.7);
      const r4 = pseudoRandom(i * 73 + 41.2);
      const r5 = pseudoRandom(i * 89 + 53.8);
      const r6 = pseudoRandom(i * 103 + 67.5);

      const leftVal = r1 * 96 + 2; // 2% to 98%
      const durationSec = 4.5 + r2 * 10.5; // Wide range: 4.5s (fast) to 15s (slow floating)
      const delaySec = -(r3 * 22); // Deep negative pre-roll up to -22s

      // High size randomness: 4px up to 21px
      const sizePx = Math.round(4 + r4 * 17);
      const drift = (r5 - 0.5) * 32; // -16vw to +16vw
      
      const timingFunc =
        i % 3 === 0
          ? "ease-in-out"
          : i % 3 === 1
          ? "linear"
          : "cubic-bezier(0.25, 0.1, 0.25, 1)";

      // Rich color palette (gold, bright yellow, marigold orange, rose crimson)
      const colorType = Math.floor(r6 * 4);
      let bgClass = "bg-gradient-to-br from-[#ffe082] via-[#e9c349] to-[#b78103]";
      if (colorType === 1) {
        bgClass = "bg-gradient-to-br from-[#fca5a5] via-[#ef4444] to-[#991b1b]";
      } else if (colorType === 2) {
        bgClass = "bg-gradient-to-br from-[#fef08a] via-[#f59e0b] to-[#d97706]";
      } else if (colorType === 3) {
        bgClass = "bg-gradient-to-br from-[#fff7ed] via-[#fbbf24] to-[#ca8a04]";
      }

      return {
        id: i,
        left: `${leftVal.toFixed(1)}%`,
        delay: `${delaySec.toFixed(2)}s`,
        duration: `${durationSec.toFixed(2)}s`,
        size: sizePx,
        drift: `${drift.toFixed(1)}vw`,
        timingFunc,
        opacity: (0.35 + r6 * 0.55).toFixed(2),
        bgClass,
      };
    });
  }, [count]);

  if (!active) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((p) => (
        <span
          key={p.id}
          className={`absolute top-0 rounded-[65%_35%_55%_45%] ${p.bgClass} shadow-[0_2px_6px_rgba(0,0,0,0.12)]`}
          style={{
            left: p.left,
            width: `${p.size}px`,
            height: `${Math.round(p.size * 0.72)}px`,
            opacity: p.opacity,
            ["--drift" as string]: p.drift,
            animation: `petal-fall ${p.duration} ${p.timingFunc} ${p.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}

/**
 * Combined Peacock Feathers & Golden Petals (Completely Random Fall & Size Spectrum)
 */
export function PeacockFeathers({
  count = 24,
  active = true,
}: {
  count?: number;
  active?: boolean;
}) {
  const feathers = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const r1 = pseudoRandom(i * 13 + 7.3);
      const r2 = pseudoRandom(i * 29 + 11.9);
      const r3 = pseudoRandom(i * 43 + 23.2);
      const r4 = pseudoRandom(i * 61 + 37.8);
      const r5 = pseudoRandom(i * 79 + 47.1);
      const r6 = pseudoRandom(i * 97 + 59.4);

      const leftVal = r1 * 94 + 3; // 3% to 97%
      const durationSec = 5.5 + r2 * 9.5; // 5.5s to 15s fall duration
      const delaySec = -(r3 * 24); // Deep negative pre-roll up to -24s

      // Wide size spectrum: 0.16 (mini accent) to 0.70 (medium detailed)
      const scale = 0.16 + r4 * 0.54;

      const rotStart = -40 + r5 * 40;
      const rotMid = 10 + r6 * 40;
      const rotLate = -30 + r1 * 35;
      const rotEnd = 15 + r2 * 50;

      const sway1 = (r3 - 0.5) * 22;
      const sway2 = (r4 - 0.5) * 24;
      const drift = (r5 - 0.5) * 28;

      const timingFunc =
        i % 2 === 0 ? "cubic-bezier(0.37, 0, 0.63, 1)" : "ease-in-out";

      const featherOpacity = 0.35 + r6 * 0.45;

      return {
        id: i,
        left: `${leftVal.toFixed(1)}%`,
        delay: `${delaySec.toFixed(2)}s`,
        duration: `${durationSec.toFixed(2)}s`,
        scale: scale.toFixed(2),
        rotStart: `${rotStart.toFixed(0)}deg`,
        rotMid: `${rotMid.toFixed(0)}deg`,
        rotLate: `${rotLate.toFixed(0)}deg`,
        rotEnd: `${rotEnd.toFixed(0)}deg`,
        sway1: `${sway1.toFixed(1)}vw`,
        sway2: `${sway2.toFixed(1)}vw`,
        drift: `${drift.toFixed(1)}vw`,
        timingFunc,
        opacity: featherOpacity.toFixed(2),
        width: Math.round(55 * scale),
        height: Math.round(125 * scale),
      };
    });
  }, [count]);

  if (!active) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Golden & Rose Petals Falling in Background */}
      <GoldenPetals active={active} count={35} />

      {/* Completely Randomized Size & Timing Peacock Feathers */}
      {feathers.map((f) => (
        <div
          key={f.id}
          className="absolute top-0"
          style={{
            left: f.left,
            width: `${f.width}px`,
            height: `${f.height}px`,
            ["--scale" as string]: f.scale,
            ["--rot-start" as string]: f.rotStart,
            ["--rot-mid" as string]: f.rotMid,
            ["--rot-late" as string]: f.rotLate,
            ["--rot-end" as string]: f.rotEnd,
            ["--sway-1" as string]: f.sway1,
            ["--sway-2" as string]: f.sway2,
            ["--drift" as string]: f.drift,
            opacity: f.opacity,
            animation: `feather-drop ${f.duration} ${f.timingFunc} ${f.delay} infinite`,
          }}
        >
          <PeacockFeatherIcon className="w-full h-full filter drop-shadow-[0_2px_6px_rgba(0,168,107,0.2)]" />
        </div>
      ))}
    </div>
  );
}
