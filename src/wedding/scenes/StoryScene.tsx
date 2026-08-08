import { useState } from "react";
import { wedding } from "../data/wedding";
import { useSceneEnter } from "../engine/useSceneEnter";
import { SceneShell, SceneTitle } from "../ui/SceneShell";
import { Divider } from "../ui/Ornaments";
import { AmbientLayer, WarmGlow } from "../ui/Ambient";

export default function StoryScene() {
  const ref = useSceneEnter<HTMLDivElement>();
  const [active, setActive] = useState(0);
  const milestones = wedding.story;
  const current = milestones[active]!;

  return (
    <SceneShell tone="ivory">
      <WarmGlow className="left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 opacity-30" />

      {/* The golden thread */}
      <svg
        viewBox="0 0 320 640"
        className="absolute inset-0 h-full w-full text-gold"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path
          d="M40 600C130 520 60 440 160 360S250 220 280 60"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.75"
        />
        {milestones.map((_, i) => {
          const pts = [
            { x: 40, y: 600 },
            { x: 160, y: 360 },
            { x: 280, y: 60 },
          ];
          const p = pts[Math.min(i, pts.length - 1)]!;
          return (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={i === active ? 7 : 4}
              fill="currentColor"
              opacity={i === active ? 1 : 0.5}
            />
          );
        })}
      </svg>

      <div
        ref={ref}
        className="relative z-10 flex h-full flex-col items-center justify-center px-8 pb-24 pt-20 text-center"
      >
        <SceneTitle kicker="Chapter Five" title="A Story Written in Gold" tone="dark" />

        <p
          className="mt-8 font-sans text-[0.66rem] uppercase tracking-[0.42em] text-terracotta"
          data-enter
          data-enter-order={2}
        >
          {current.date}
        </p>
        <h3
          className="mt-2 font-display text-[1.7rem] leading-tight text-maroon"
          data-enter
          data-enter-order={3}
        >
          {current.title}
        </h3>
        <Divider className="mt-3 h-3 w-32 text-gold" />
        <p
          className="mt-4 max-w-[19rem] font-display text-base italic leading-relaxed text-maroon/75"
          data-enter
          data-enter-order={4}
        >
          “{current.description}”
        </p>

        <div className="mt-7 flex gap-2" data-enter data-enter-order={5}>
          {milestones.map((m, i) => (
            <button
              key={m.title}
              type="button"
              onClick={() => setActive(i)}
              aria-label={m.title}
              className="min-h-11 px-3"
            >
              <span
                className={`block h-[3px] w-8 rounded-full transition-all ${
                  i === active ? "bg-gold" : "bg-maroon/25"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <AmbientLayer dust={5} />
    </SceneShell>
  );
}
