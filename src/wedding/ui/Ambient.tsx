import { useMemo } from "react";

const seeded = (n: number, salt: number) => ((n * 9301 + salt * 49297) % 233280) / 233280;

/** Drifting marigold petals — deliberately low count for mobile. */
export function Petals({ count = 7 }: { count?: number }) {
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${seeded(i + 1, 3) * 96 + 2}%`,
        delay: `${seeded(i + 2, 7) * 9}s`,
        duration: `${9 + seeded(i + 3, 11) * 7}s`,
        drift: `${(seeded(i + 4, 13) - 0.5) * 18}vw`,
        size: 5 + Math.round(seeded(i + 5, 17) * 5),
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((p, i) => (
        <span
          key={i}
          className="absolute top-0 rounded-[60%_40%_55%_45%] bg-gold/70"
          style={{
            left: p.left,
            width: p.size,
            height: p.size * 0.7,
            ["--drift" as string]: p.drift,
            animation: `petal-fall ${p.duration} linear ${p.delay} infinite`,
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
        left: `${seeded(i + 1, 23) * 96 + 2}%`,
        top: `${40 + seeded(i + 2, 29) * 55}%`,
        delay: `${seeded(i + 3, 31) * 12}s`,
        duration: `${12 + seeded(i + 4, 37) * 10}s`,
        drift: `${(seeded(i + 5, 41) - 0.5) * 12}vw`,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
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
      className="bg-grain pointer-events-none absolute inset-0 opacity-[0.16] mix-blend-overlay"
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
      {petals > 0 && <Petals count={petals} />}
      <FilmGrain />
    </>
  );
}
