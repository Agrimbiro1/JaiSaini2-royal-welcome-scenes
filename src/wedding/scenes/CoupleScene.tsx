import { useState } from "react";
import { wedding } from "../data/wedding";
import { useSceneEnter } from "../engine/useSceneEnter";
import { SceneShell } from "../ui/SceneShell";
import { OrnateFrame, JaaliPanel } from "../ui/Ornaments";
import { AmbientLayer, WarmGlow } from "../ui/Ambient";

type Focus = "groom" | "bride" | null;

export default function CoupleScene() {
  const ref = useSceneEnter<HTMLDivElement>();
  const [focus, setFocus] = useState<Focus>(null);
  const { groom, bride, portrait } = wedding.couple;

  const portraits: { key: Exclude<Focus, null>; name: string }[] = [
    { key: "groom", name: groom },
    { key: "bride", name: bride },
  ];

  return (
    <SceneShell>
      <JaaliPanel className="absolute inset-0 opacity-[0.06]" />
      <WarmGlow className="left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 opacity-35" />

      <div
        ref={ref}
        className="relative z-10 flex h-full flex-col items-center justify-center gap-0 px-8 pb-24 pt-20"
      >
        {portraits.map((p, i) => {
          const dim = focus !== null && focus !== p.key;
          return (
            <button
              key={p.key}
              type="button"
              onClick={() => setFocus(focus === p.key ? null : p.key)}
              data-enter
              data-enter-order={i + 1}
              className={`relative w-[52%] max-w-[13rem] transition-all duration-500 ${
                i === 1 ? "-mt-8" : ""
              } ${dim ? "scale-95 opacity-45" : focus === p.key ? "z-10 scale-105" : ""}`}
              style={{ marginLeft: i === 0 ? "-14%" : "16%" }}
            >
              <OrnateFrame>
                <img
                  src={portrait}
                  alt={p.name}
                  loading="lazy"
                  width={768}
                  height={1024}
                  className="aspect-[3/4] w-full object-cover"
                  style={{ objectPosition: p.key === "groom" ? "28% 20%" : "72% 20%" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/60 via-transparent to-transparent" />
                <span className="absolute bottom-2 left-0 right-0 text-center font-display text-sm tracking-[0.24em] text-ivory">
                  {p.name.toUpperCase()}
                </span>
              </OrnateFrame>
            </button>
          );
        })}

        <div className="mt-6 text-center" data-enter data-enter-order={3}>
          <p className="font-display text-2xl tracking-[0.16em] text-ivory">
            {groom.toUpperCase()} <span className="text-gold">×</span> {bride.toUpperCase()}
          </p>
          <p className="mt-2 font-script text-xl text-gold-bright">Together, Always</p>
        </div>
      </div>

      <AmbientLayer dust={7} />
    </SceneShell>
  );
}
