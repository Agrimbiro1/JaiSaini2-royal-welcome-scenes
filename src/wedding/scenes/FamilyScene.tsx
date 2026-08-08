import { useState } from "react";
import { wedding } from "../data/wedding";
import { useSceneEnter } from "../engine/useSceneEnter";
import { SceneShell, SceneTitle } from "../ui/SceneShell";
import { JaaliPanel } from "../ui/Ornaments";
import { AmbientLayer, WarmGlow } from "../ui/Ambient";

export default function FamilyScene() {
  const ref = useSceneEnter<HTMLDivElement>();
  const [focus, setFocus] = useState<string | null>(null);
  const groomSide = wedding.family.filter((m) => m.side === "groom");
  const brideSide = wedding.family.filter((m) => m.side === "bride");

  const Member = ({ name, relation }: { name: string; relation: string }) => {
    const dim = focus !== null && focus !== name;
    return (
      <button
        type="button"
        onClick={() => setFocus(focus === name ? null : name)}
        className={`min-h-12 w-[6.5rem] transition-all duration-400 ${
          dim ? "opacity-45" : focus === name ? "scale-110" : ""
        }`}
      >
        <span className="mx-auto block h-14 w-14 rounded-t-full border border-gold/55 bg-maroon/70 bg-jaali" />
        <span className="mt-2 block font-display text-sm tracking-wide text-ivory">
          {name}
        </span>
        <span className="block font-sans text-[0.55rem] uppercase tracking-[0.24em] text-gold/70">
          {relation}
        </span>
      </button>
    );
  };

  return (
    <SceneShell>
      <JaaliPanel className="absolute inset-0 opacity-[0.06]" />
      <WarmGlow className="left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 opacity-35" />

      {/* Golden connections */}
      <svg
        viewBox="0 0 320 480"
        className="absolute inset-0 h-full w-full text-gold/70"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <path d="M70 150 L160 240 L250 150" stroke="currentColor" strokeWidth="1.4" />
        <path d="M70 330 L160 240 L250 330" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="160" cy="240" r="5" fill="currentColor" />
      </svg>

      <div
        ref={ref}
        className="relative z-10 flex h-full flex-col items-center justify-center px-5 pb-24 pt-20"
      >
        <SceneTitle kicker="Chapter Six" title="Two Families, One Beginning" />

        <div className="mt-6 flex w-full justify-between" data-enter data-enter-order={2}>
          {groomSide.map((m) => (
            <Member key={m.name} name={m.name} relation={m.relation} />
          ))}
        </div>

        <div
          className="my-5 rounded-sm border border-gold/45 px-5 py-3 text-center"
          data-enter
          data-enter-order={3}
        >
          <p className="font-display text-lg tracking-[0.14em] text-gold-bright">
            {wedding.couple.groom.toUpperCase()} × {wedding.couple.bride.toUpperCase()}
          </p>
        </div>

        <div className="flex w-full justify-between" data-enter data-enter-order={4}>
          {brideSide.map((m) => (
            <Member key={m.name} name={m.name} relation={m.relation} />
          ))}
        </div>
      </div>

      <AmbientLayer dust={6} />
    </SceneShell>
  );
}
