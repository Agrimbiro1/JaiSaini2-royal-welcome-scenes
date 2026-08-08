import { useState } from "react";
import { wedding } from "../data/wedding";
import { useSceneEnter } from "../engine/useSceneEnter";
import { SceneShell, SceneTitle } from "../ui/SceneShell";
import { AmbientLayer, WarmGlow } from "../ui/Ambient";

export default function BlessingsScene() {
  const ref = useSceneEnter<HTMLDivElement>();
  const [open, setOpen] = useState<number | null>(null);
  const blessings = wedding.blessings;
  const spots = [
    { left: "18%", top: "34%" },
    { left: "52%", top: "26%" },
    { left: "76%", top: "42%" },
    { left: "34%", top: "48%" },
    { left: "64%", top: "54%" },
  ];

  return (
    <SceneShell>
      <WarmGlow className="left-1/2 top-[34%] h-64 w-64 -translate-x-1/2 opacity-30" />

      {/* Wish tree */}
      <svg
        viewBox="0 0 320 480"
        className="absolute inset-x-0 bottom-16 top-24 h-auto w-full text-gold/60"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <path d="M160 470V250" stroke="currentColor" strokeWidth="3" />
        <path d="M160 300C120 270 90 240 70 190" stroke="currentColor" strokeWidth="2" />
        <path d="M160 290C200 260 235 230 255 180" stroke="currentColor" strokeWidth="2" />
        <path d="M160 260C140 220 130 190 132 150" stroke="currentColor" strokeWidth="1.6" />
        <path d="M160 255C182 215 196 186 200 148" stroke="currentColor" strokeWidth="1.6" />
      </svg>

      <div
        ref={ref}
        className="relative z-10 flex h-full flex-col items-center px-7 pb-28 pt-20"
      >
        <SceneTitle kicker="Chapter Ten" title="The Wish Tree" />

        <div className="relative mt-2 w-full flex-1" data-enter data-enter-order={2}>
          {blessings.map((b, i) => {
            const spot = spots[i % spots.length]!;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Blessing from ${b.guestName}`}
                className="absolute flex h-12 w-12 items-center justify-center"
                style={{
                  left: spot.left,
                  top: spot.top,
                  animation: `sway ${3 + i * 0.5}s ease-in-out infinite`,
                  transformOrigin: "top center",
                }}
              >
                <span className="block h-5 w-px bg-gold/60" />
                <span
                  className="absolute bottom-0 h-6 w-6 rounded-full border border-gold/70 bg-maroon"
                  style={{
                    boxShadow: "0 0 10px 2px color-mix(in oklab, var(--gold) 40%, transparent)",
                  }}
                />
              </button>
            );
          })}
        </div>
      </div>

      {open !== null && blessings[open] && (
        <div className="absolute inset-0 z-30 flex items-center justify-center px-8">
          <button
            type="button"
            aria-label="Close blessing"
            onClick={() => setOpen(null)}
            className="absolute inset-0 bg-maroon-deep/85"
          />
          <div className="relative w-full max-w-[18rem] rounded-sm border border-gold/50 bg-gradient-to-b from-ivory to-ivory-dim px-6 py-7 text-center">
            <p className="font-display text-lg italic leading-relaxed text-maroon">
              “{blessings[open]!.message}”
            </p>
            <p className="mt-4 font-sans text-[0.62rem] uppercase tracking-[0.3em] text-terracotta">
              — {blessings[open]!.guestName}
            </p>
          </div>
        </div>
      )}

      <AmbientLayer dust={6} petals={2} />
    </SceneShell>
  );
}
