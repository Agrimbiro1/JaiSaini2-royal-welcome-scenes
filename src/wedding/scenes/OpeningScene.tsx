import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useScene, usePrefersReducedMotion } from "../engine/SceneProvider";
import { wedding } from "../data/wedding";
import { SceneShell } from "../ui/SceneShell";
import { Divider } from "../ui/Ornaments";
import { Dust, FilmGrain, Petals, WarmGlow } from "../ui/Ambient";

export default function OpeningScene() {
  const { goNext } = useScene();
  const reduced = usePrefersReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const { groom, bride, tagline, subtitle } = wedding.couple;

  const open = () => {
    if (entered) return;
    setEntered(true);
  };

  useEffect(() => {
    if (!entered || !root.current) return;
    const q = gsap.utils.selector(root.current);
    if (reduced) {
      gsap.set(q("[data-o]"), { opacity: 1, x: 0, y: 0 });
      gsap.set(q("[data-c=l]"), { xPercent: -96 });
      gsap.set(q("[data-c=r]"), { xPercent: 96 });
      return;
    }
    const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });
    tl.to(q("[data-c=l]"), { xPercent: -96, duration: 1.5 }, 0)
      .to(q("[data-c=r]"), { xPercent: 96, duration: 1.5 }, 0)
      .to(q("[data-glow]"), { opacity: 1, scale: 1.15, duration: 1.4 }, 0.1)
      .fromTo(q("[data-o=names]"), { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.9 }, 0.9)
      .fromTo(
        q("[data-o=rule]"),
        { opacity: 0, scaleX: 0.2 },
        { opacity: 1, scaleX: 1, duration: 0.7 },
        1.3,
      )
      .fromTo(q("[data-o=title]"), { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, 1.6)
      .fromTo(q("[data-o=sub]"), { opacity: 0 }, { opacity: 1, duration: 0.6 }, 2.1);
    return () => {
      tl.kill();
    };
  }, [entered, reduced]);

  return (
    <SceneShell>
      <div ref={root} className="absolute inset-0">
        <WarmGlow
          data-glow
          className="left-1/2 top-1/2 h-[70svh] w-[70svh] -translate-x-1/2 -translate-y-1/2 opacity-40"
        />

        {/* Couple reveal, behind the curtains */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
          <div data-o="names" className={entered ? "" : "opacity-0"}>
            <h1 className="font-display text-[2.9rem] font-light leading-[1.05] tracking-[0.12em] text-ivory">
              {groom.toUpperCase()}
              <span className="mx-3 align-middle font-display text-2xl text-gold">×</span>
              <br />
              {bride.toUpperCase()}
            </h1>
          </div>
          <Divider
            data-o="rule"
            className={`mt-5 h-4 w-52 text-gold ${entered ? "" : "opacity-0"}`}
          />
          <p
            data-o="title"
            className={`mt-6 font-display text-xl italic tracking-wide text-gold-bright ${entered ? "" : "opacity-0"}`}
          >
            {tagline}
          </p>
          <p
            data-o="sub"
            className={`mt-3 font-sans text-[0.6rem] uppercase tracking-[0.4em] text-ivory/55 ${entered ? "" : "opacity-0"}`}
          >
            {subtitle}
          </p>
        </div>

        {entered && (
          <>
            <Petals count={6} />
            <Dust count={8} />
          </>
        )}

        {/* Curtains */}
        <div
          data-c="l"
          className="absolute inset-y-0 left-0 z-10 w-1/2"
          style={{
            background:
              "repeating-linear-gradient(90deg, oklch(0.19 0.07 20) 0 8px, oklch(0.3 0.11 20) 8px 20px, oklch(0.24 0.09 20) 20px 30px)",
          }}
        >
          <div className="absolute inset-y-0 right-0 w-2 bg-gradient-to-l from-gold/60 to-transparent" />
          <div className="absolute inset-y-0 right-2 w-4 bg-jaali opacity-25" />
        </div>
        <div
          data-c="r"
          className="absolute inset-y-0 right-0 z-10 w-1/2"
          style={{
            background:
              "repeating-linear-gradient(-90deg, oklch(0.19 0.07 20) 0 8px, oklch(0.3 0.11 20) 8px 20px, oklch(0.24 0.09 20) 20px 30px)",
          }}
        >
          <div className="absolute inset-y-0 left-0 w-2 bg-gradient-to-r from-gold/60 to-transparent" />
          <div className="absolute inset-y-0 left-2 w-4 bg-jaali opacity-25" />
        </div>

        {!entered && (
          <button
            type="button"
            onClick={open}
            className="absolute inset-0 z-20 flex flex-col items-center justify-end pb-24"
            aria-label="Tap to enter the invitation"
          >
            <span className="mb-3 h-10 w-px bg-gradient-to-b from-transparent to-gold/70" />
            <span
              className="font-sans text-[0.62rem] uppercase tracking-[0.45em] text-gold"
              style={{ animation: "light-breathe 3.2s ease-in-out infinite" }}
            >
              Tap to Enter
            </span>
          </button>
        )}

        {entered && (
          <button
            type="button"
            onClick={goNext}
            className="absolute bottom-16 left-1/2 z-30 -translate-x-1/2 px-5 py-3 font-sans text-[0.58rem] uppercase tracking-[0.36em] text-ivory/50"
          >
            Skip
          </button>
        )}

        <FilmGrain />
      </div>
    </SceneShell>
  );
}
