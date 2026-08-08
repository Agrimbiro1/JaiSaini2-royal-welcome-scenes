import { useState } from "react";
import { wedding } from "../data/wedding";
import { useSceneEnter } from "../engine/useSceneEnter";
import { SceneShell, SceneTitle } from "../ui/SceneShell";
import { OrnateFrame } from "../ui/Ornaments";
import { AmbientLayer, WarmGlow } from "../ui/Ambient";
import sandstone from "@/assets/sandstone-wall.jpg";

export default function GalleryScene() {
  const ref = useSceneEnter<HTMLDivElement>();
  const [active, setActive] = useState(0);
  // Gallery placeholders: the couple portrait repeated until real photos land.
  const items =
    wedding.gallery.length >= 3
      ? wedding.gallery
      : Array.from({ length: 3 }, () => wedding.gallery[0]!);
  const current = items[active]!;

  return (
    <SceneShell tone="ivory">
      <img
        src={sandstone}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={1024}
        height={1024}
        className="absolute inset-0 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ivory/40 via-transparent to-maroon-deep/45" />
      <WarmGlow className="left-1/2 top-[38%] h-56 w-56 -translate-x-1/2 opacity-40" />

      <div
        ref={ref}
        className="relative z-10 flex h-full flex-col items-center justify-center px-7 pb-24 pt-20"
      >
        <SceneTitle kicker="Chapter Four" title="Memory Gallery" tone="dark" />

        <div className="mt-6 w-[64%] max-w-[15rem]" data-enter data-enter-order={2}>
          <OrnateFrame className="[animation:light-breathe_7s_ease-in-out_infinite]">
            <img
              src={current.image}
              alt={current.caption ?? "Wedding memory"}
              loading="lazy"
              width={768}
              height={1024}
              className="aspect-[3/4] w-full object-cover"
            />
          </OrnateFrame>
        </div>

        {current.caption && (
          <p
            className="mt-5 font-sans text-[0.6rem] uppercase tracking-[0.36em] text-maroon/70"
            data-enter
            data-enter-order={3}
          >
            {current.caption}
          </p>
        )}

        <div className="mt-5 flex items-center gap-3" data-enter data-enter-order={4}>
          {items.map((it, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View memory ${i + 1}`}
              className={`h-12 w-9 overflow-hidden rounded-sm border transition-all duration-300 ${
                i === active
                  ? "scale-110 border-gold shadow-[0_4px_14px_-4px_oklch(0.32_0.11_20_/_0.6)]"
                  : "border-gold/35 opacity-60"
              }`}
            >
              <img
                src={it.image}
                alt=""
                loading="lazy"
                width={768}
                height={1024}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <AmbientLayer dust={6} />
    </SceneShell>
  );
}
