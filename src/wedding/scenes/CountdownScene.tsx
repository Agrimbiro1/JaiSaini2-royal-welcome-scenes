import { useEffect, useState } from "react";
import { wedding } from "../data/wedding";
import { useSceneEnter } from "../engine/useSceneEnter";
import { SceneShell } from "../ui/SceneShell";
import { Divider } from "../ui/Ornaments";
import { AmbientLayer, WarmGlow } from "../ui/Ambient";

function remaining(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    over: diff === 0,
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownScene() {
  const ref = useSceneEnter<HTMLDivElement>();
  const target = new Date(wedding.countdown.date).getTime();
  const [t, setT] = useState(() => remaining(target));
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const id = window.setInterval(() => setT(remaining(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const cells = [
    { value: t.days, label: "Days" },
    { value: t.hours, label: "Hours" },
    { value: t.minutes, label: "Minutes" },
    { value: t.seconds, label: "Seconds" },
  ];

  return (
    <SceneShell>
      <WarmGlow className="left-1/2 top-[34%] h-56 w-56 -translate-x-1/2 opacity-40" />

      <div
        ref={ref}
        className="relative z-10 flex h-full flex-col items-center justify-center px-8 pb-24 pt-20"
      >
        {/* The royal timepiece */}
        <button
          type="button"
          onClick={() => {
            setPulse(true);
            window.setTimeout(() => setPulse(false), 700);
          }}
          aria-label="Wind the timepiece"
          className={`relative transition-transform duration-500 ${pulse ? "scale-105" : ""}`}
          data-enter
          data-enter-order={1}
        >
          <svg viewBox="0 0 120 120" className="h-36 w-36 text-gold" fill="none">
            <circle cx="60" cy="60" r="56" stroke="currentColor" strokeWidth="1.6" />
            <circle cx="60" cy="60" r="48" stroke="currentColor" strokeWidth="0.7" opacity="0.6" />
            <g
              opacity="0.85"
              style={{
                transformOrigin: "60px 60px",
                animation: pulse ? "sway 0.7s ease-in-out" : undefined,
              }}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <line
                  key={i}
                  x1="60"
                  y1="10"
                  x2="60"
                  y2="16"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  transform={`rotate(${i * 30} 60 60)`}
                />
              ))}
            </g>
            <line x1="60" y1="60" x2="60" y2="32" stroke="currentColor" strokeWidth="2.4" />
            <line
              x1="60"
              y1="60"
              x2="84"
              y2="60"
              stroke="currentColor"
              strokeWidth="1.6"
              opacity="0.8"
            />
            <line
              x1="60"
              y1="60"
              x2="60"
              y2="24"
              stroke="oklch(0.72 0.15 30)"
              strokeWidth="1"
              style={{
                transformOrigin: "60px 60px",
                transform: `rotate(${t.seconds * 6}deg)`,
              }}
            />
            <circle cx="60" cy="60" r="3" fill="currentColor" />
          </svg>
        </button>

        <div className="mt-7 grid grid-cols-2 gap-x-10 gap-y-4" data-enter data-enter-order={2}>
          {cells.map((c) => (
            <div key={c.label} className="text-center">
              <p className="font-display text-4xl font-light leading-none text-gold-bright tabular-nums">
                {String(c.value).padStart(2, "0")}
              </p>
              <p className="mt-1 font-sans text-[0.55rem] uppercase tracking-[0.34em] text-ivory/60">
                {c.label}
              </p>
            </div>
          ))}
        </div>

        <Divider className="mt-6 h-3 w-40 text-gold/70" />
        <p
          className="mt-3 font-display text-lg tracking-[0.14em] text-ivory"
          data-enter
          data-enter-order={3}
        >
          {t.over ? "Today We Celebrate Love" : wedding.countdown.displayDate}
        </p>
      </div>

      <AmbientLayer dust={7} petals={t.over ? 6 : 0} />
    </SceneShell>
  );
}
