import { useEffect, useRef } from "react";
import gsap from "gsap";
import { overlayHooks, useScene } from "../engine/SceneProvider";
import { playTransition, type TransitionName } from "../engine/transitions";

function Layers({ name }: { name: TransitionName }) {
  switch (name) {
    case "curtain":
      return (
        <>
          <div
            data-t="curtain-l"
            className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-maroon-deep via-maroon to-maroon-deep"
          >
            <div className="absolute inset-y-0 right-0 w-1 bg-gold/60" />
          </div>
          <div
            data-t="curtain-r"
            className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-maroon-deep via-maroon to-maroon-deep"
          >
            <div className="absolute inset-y-0 left-0 w-1 bg-gold/60" />
          </div>
        </>
      );
    case "jharokha":
      return (
        <>
          <div data-t="veil" className="absolute inset-0 bg-maroon-deep" />
          <svg
            data-t="arch"
            viewBox="0 0 100 150"
            className="absolute left-1/2 top-1/2 h-40 w-28 -translate-x-1/2 -translate-y-1/2 text-gold"
            fill="none"
          >
            <path
              d="M8 150V62C8 32 26 10 50 10s42 22 42 52v88"
              stroke="currentColor"
              strokeWidth="3"
            />
          </svg>
        </>
      );
    case "light-sweep":
      return (
        <>
          <div data-t="veil" className="absolute inset-0 bg-maroon-deep/95" />
          <div
            data-t="sweep"
            className="absolute inset-y-0 -left-1/4 w-[150%]"
            style={{
              background:
                "linear-gradient(100deg, transparent 0%, color-mix(in oklab, var(--gold) 70%, transparent) 45%, color-mix(in oklab, var(--gold-bright) 85%, transparent) 52%, transparent 100%)",
            }}
          />
        </>
      );
    case "line-draw":
      return (
        <>
          <div data-t="veil" className="absolute inset-0 bg-maroon-deep" />
          <svg
            viewBox="0 0 400 400"
            className="absolute inset-0 h-full w-full text-gold"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
          >
            <path
              data-t="path"
              d="M-20 200C60 120 120 280 200 200s140-80 220 0"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              data-t="path"
              d="M-20 250C60 170 120 330 200 250s140-80 220 0"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.6"
            />
          </svg>
        </>
      );
    case "thread":
      return (
        <>
          <div data-t="veil" className="absolute inset-0 bg-maroon-deep" />
          <svg
            viewBox="0 0 300 500"
            className="absolute inset-0 h-full w-full text-gold-bright"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
          >
            <path
              data-t="thread"
              d="M40 480C120 400 60 320 150 250S220 140 260 20"
              stroke="currentColor"
              strokeWidth="2.5"
            />
          </svg>
        </>
      );
    case "envelope":
      return (
        <>
          <div
            data-t="fold-t"
            className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-ivory to-ivory-dim"
          />
          <div
            data-t="fold-b"
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ivory to-ivory-dim"
          />
          <div
            data-t="seal"
            className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-gold/70 bg-maroon"
          />
        </>
      );
    case "star":
      return (
        <>
          <div data-t="veil" className="absolute inset-0 bg-[oklch(0.16_0.06_265)]" />
          <div
            data-t="glow"
            className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--gold-bright) 80%, transparent) 0%, transparent 70%)",
            }}
          />
          {Array.from({ length: 14 }, (_, i) => (
            <span
              key={i}
              data-t="star"
              className="absolute h-[3px] w-[3px] rounded-full bg-ivory"
              style={{ left: `${(i * 37) % 94 + 3}%`, top: `${(i * 53) % 88 + 6}%` }}
            />
          ))}
        </>
      );
  }
}

export function TransitionOverlay() {
  const { transition } = useScene();
  const ref = useRef<HTMLDivElement>(null);
  const active = useRef(false);

  useEffect(() => {
    const root = ref.current;
    if (!transition || !root || active.current) return;
    active.current = true;
    const tl = gsap.timeline({
      onComplete: () => {
        active.current = false;
        overlayHooks.finish?.();
      },
    });
    tl.add(playTransition(transition.name, root, "in"));
    tl.call(() => overlayHooks.swap?.(), undefined, "+=0.03");
    tl.add(playTransition(transition.name, root, "out"), "+=0.08");
    return () => {
      tl.kill();
      active.current = false;
    };
  }, [transition]);

  if (!transition) return null;

  return (
    <div
      ref={ref}
      key={transition.token}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
    >
      <Layers name={transition.name} />
    </div>
  );
}
