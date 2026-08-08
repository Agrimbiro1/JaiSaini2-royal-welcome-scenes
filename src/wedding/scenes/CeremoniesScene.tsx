import { useState } from "react";
import { wedding } from "../data/wedding";
import { useSceneEnter } from "../engine/useSceneEnter";
import { SceneShell, SceneTitle } from "../ui/SceneShell";
import { Divider, JaaliPanel } from "../ui/Ornaments";
import { AmbientLayer, WarmGlow } from "../ui/Ambient";

const toneFor: Record<string, string> = {
  haldi: "oklch(0.8 0.13 88)",
  mehendi: "oklch(0.55 0.1 150)",
  sangeet: "oklch(0.5 0.12 300)",
  wedding: "oklch(0.78 0.11 84)",
  reception: "oklch(0.45 0.1 262)",
};

export default function CeremoniesScene() {
  const ref = useSceneEnter<HTMLDivElement>();
  const [activeId, setActiveId] = useState(wedding.ceremonies[0]?.id ?? "");
  const active = wedding.ceremonies.find((c) => c.id === activeId);
  const tint = toneFor[activeId] ?? "oklch(0.78 0.11 84)";

  return (
    <SceneShell>
      <JaaliPanel className="absolute inset-0 opacity-[0.06]" />
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{ background: `radial-gradient(60% 45% at 50% 34%, ${tint}22, transparent 70%)` }}
      />
      <WarmGlow className="left-1/2 top-[30%] h-48 w-48 -translate-x-1/2 opacity-35" />

      {/* Courtyard arches */}
      <svg
        viewBox="0 0 320 200"
        className="absolute bottom-24 left-0 right-0 h-40 w-full text-gold/45"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {[20, 120, 220].map((x) => (
          <path
            key={x}
            d={`M${x} 200V90c0-22 18-40 40-40s40 18 40 40v110`}
            stroke="currentColor"
            strokeWidth="1.2"
          />
        ))}
      </svg>

      <div
        ref={ref}
        className="relative z-10 flex h-full flex-col items-center justify-center px-7 pb-28 pt-20"
      >
        <SceneTitle kicker="Chapter Eight" title="The Royal Celebration" />

        <div
          className="mt-6 flex flex-wrap justify-center gap-2"
          data-enter
          data-enter-order={2}
        >
          {wedding.ceremonies.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveId(c.id)}
              className={`min-h-11 rounded-sm border px-3 py-2 font-sans text-[0.58rem] uppercase tracking-[0.24em] transition-colors ${
                c.id === activeId
                  ? "border-gold bg-gold/15 text-gold-bright"
                  : "border-gold/25 text-ivory/60"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {active && (
          <div
            className="mt-6 w-full max-w-[19rem] rounded-sm border border-gold/35 bg-maroon-deep/70 px-5 py-5 text-center"
            data-enter
            data-enter-order={3}
          >
            <p className="font-display text-2xl tracking-wide text-ivory">{active.name}</p>
            <Divider className="mx-auto mt-2 h-3 w-24 text-gold/70" />
            <dl className="mt-3 space-y-1 font-sans text-[0.72rem] text-ivory/75">
              {active.date && <dd>{active.date}</dd>}
              {active.time && <dd>{active.time}</dd>}
              {active.venue && <dd>{active.venue}</dd>}
              {active.dressCode && (
                <dd className="text-gold/80">Dress code — {active.dressCode}</dd>
              )}
            </dl>
            {active.mapUrl && (
              <a
                href={active.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block min-h-11 border-b border-gold/60 pb-1 font-sans text-[0.58rem] uppercase tracking-[0.3em] text-gold"
              >
                Get Directions
              </a>
            )}
          </div>
        )}
      </div>

      {/* Diyas */}
      <div className="pointer-events-none absolute bottom-20 left-0 right-0 z-10 flex justify-center gap-10">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2 w-2 rounded-full bg-gold-bright"
            style={{
              boxShadow: "0 0 12px 4px color-mix(in oklab, var(--gold) 55%, transparent)",
              animation: `flame-flicker ${2 + i * 0.4}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      <AmbientLayer dust={6} />
    </SceneShell>
  );
}
