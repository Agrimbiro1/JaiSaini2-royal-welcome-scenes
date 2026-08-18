import { useMemo } from "react";

function fract(x: number) {
  return x - Math.floor(x);
}

function rand(index: number, seed: number) {
  // High-entropy trigonometric hash to completely eradicate linear/diagonal correlations
  return fract(Math.sin(index * 127.1 + seed * 311.7) * 43758.5453123);
}

/** Drifting royal marigold & rose petals across scenes — in the ambient background */
export function Petals({ count = 28 }: { count?: number }) {
  const petals = useMemo(
    () => {
      const colors = [
        "linear-gradient(135deg, #F59E0B 0%, #D97706 70%, #B45309 100%)", // Marigold Orange
        "linear-gradient(135deg, #FDE68A 0%, #F59E0B 75%, #D97706 100%)", // Golden Yellow
        "linear-gradient(135deg, #FB7185 0%, #E11D48 70%, #9F1239 100%)", // Rose Red
        "linear-gradient(135deg, #FBBF24 0%, #EA580C 80%, #9A3412 100%)", // Saffron Gold
      ];

      return Array.from({ length: count }, (_, i) => {
        const durationSec = 8 + rand(i, 3.1) * 8; // 8s to 16s natural descent
        const delaySec = -(rand(i, 7.9) * durationSec); // Completely unaligned negative start time
        const startX = rand(i, 11.3) * 94 + 3; // 3% to 97% across viewport
        const swayPx = (rand(i, 17.7) - 0.5) * 35; // Random sway amplitude
        const driftVw = (rand(i, 23.4) - 0.5) * 20; // Random lateral wind drift
        const rot0 = rand(i, 29.1) * 360;
        const rotEnd = rot0 + (rand(i, 37.8) > 0.5 ? 1 : -1) * (200 + rand(i, 41.2) * 250);

        return {
          left: `${startX.toFixed(1)}%`,
          delay: `${delaySec.toFixed(2)}s`,
          duration: `${durationSec.toFixed(2)}s`,
          drift: `${driftVw.toFixed(1)}vw`,
          sway: `${swayPx.toFixed(1)}px`,
          rot0: `${Math.round(rot0)}deg`,
          rotEnd: `${Math.round(rotEnd)}deg`,
          size: 7 + Math.round(rand(i, 43.5) * 7), // 7px to 14px delicate size
          bg: colors[i % colors.length]!,
          opacity: 0.18 + rand(i, 51.9) * 0.16, // Subtle ambient background opacity (0.18 to 0.34)
        };
      });
    },
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-1" aria-hidden="true">
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute -top-8 rounded-[70%_30%_60%_40%/60%_40%_70%_30%] ambient-petal-item"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 0.72,
            background: p.bg,
            ["--petal-op" as string]: p.opacity,
            ["--drift" as string]: p.drift,
            ["--sway" as string]: p.sway,
            ["--rot-0" as string]: p.rot0,
            ["--rot-end" as string]: p.rotEnd,
            animation: `natural-swaying-petal ${p.duration} ease-in-out ${p.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}

/** Very fine dust motes floating inside the light. */
export function Dust({ count = 10 }: { count?: number }) {
  const motes = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${rand(i, 23.4) * 96 + 2}%`,
        top: `${40 + rand(i, 29.8) * 55}%`,
        delay: `${rand(i, 31.2) * 12}s`,
        duration: `${12 + rand(i, 37.6) * 10}s`,
        drift: `${(rand(i, 41.5) - 0.5) * 12}vw`,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-1" aria-hidden="true">
      {motes.map((m, i) => (
        <span
          key={i}
          className="absolute h-[2px] w-[2px] rounded-full bg-gold-bright/80"
          style={{
            left: m.left,
            top: m.top,
            ["--drift" as string]: m.drift,
            animation: `dust-drift ${m.duration} linear ${m.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}

/** Warm golden pool of light, slowly breathing. */
export function WarmGlow({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      style={{
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--gold) 55%, transparent) 0%, transparent 70%)",
        animation: "light-breathe 9s ease-in-out infinite",
      }}
    />
  );
}

/** Extremely subtle film grain over the whole scene. */
export function FilmGrain() {
  return (
    <div
      aria-hidden="true"
      className="bg-grain pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay z-0"
    />
  );
}

/** Standard ambient stack shared by most scenes. */
export function AmbientLayer({
  petals = 0,
  dust = 8,
}: {
  petals?: number;
  dust?: number;
}) {
  return (
    <>
      {dust > 0 && <Dust count={dust} />}
      {petals > 0 && <Petals count={petals >= 6 ? 28 : petals} />}
      <FilmGrain />
    </>
  );
}
