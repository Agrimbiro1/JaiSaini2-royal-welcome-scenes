import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useScene, usePrefersReducedMotion } from "../engine/SceneProvider";
import { wedding } from "../data/wedding";
import { Divider } from "../ui/Ornaments";
import { Dust, FilmGrain } from "../ui/Ambient";

import reelMehendi from "@/assets/reel-mehendi.jpg";
import reelJewellery from "@/assets/reel-jewellery.jpg";
import reelMarigold from "@/assets/reel-marigold.jpg";
import reelPalace from "@/assets/reel-palace.jpg";

/** Only the frames that are actually on screen — nothing else preloads here. */
const strip = [
  { src: reelMarigold, alt: "Marigold garlands in a haveli courtyard" },
  { src: reelMehendi, alt: "Mehendi and bangles on the bride's hands" },
  { src: wedding.couple.portrait, alt: `${wedding.couple.groom} and ${wedding.couple.bride}`, hero: true },
  { src: reelJewellery, alt: "Kundan bridal jewellery on velvet" },
  { src: reelPalace, alt: "Rajasthani palace at dusk" },
];

function Sprockets({ side }: { side: "top" | "bottom" }) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 flex h-[9%] items-center justify-around px-1 ${
        side === "top" ? "top-0" : "bottom-0"
      }`}
      aria-hidden="true"
    >
      {Array.from({ length: 26 }, (_, i) => (
        <span
          key={i}
          className="h-[52%] w-[1.6%] rounded-[1px] bg-[oklch(0.14_0.02_40)] shadow-[inset_0_0_1px_oklch(0.5_0.02_60_/_0.6)]"
        />
      ))}
    </div>
  );
}

export default function OpeningScene() {
  const { goNext } = useScene();
  const reduced = usePrefersReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const expandRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [closing, setClosing] = useState(false);

  /** Frame-to-Welcome: the photograph itself grows out of the film. */
  const expandIntoWelcome = () => {
    if (closing) return;
    setClosing(true);
    tlRef.current?.kill();
    const hero = heroRef.current;
    const overlay = expandRef.current;
    if (!hero || !overlay || reduced) {
      goNext();
      return;
    }
    const r = hero.getBoundingClientRect();
    gsap.set(overlay, {
      opacity: 1,
      top: r.top,
      left: r.left,
      width: r.width,
      height: r.height,
      borderRadius: 2,
    });
    gsap
      .timeline({ onComplete: goNext })
      .to(root.current!.querySelectorAll("[data-fade-out]"), { opacity: 0, duration: 0.4 }, 0)
      .to(
        overlay,
        {
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          borderRadius: 0,
          duration: 1.15,
          ease: "power3.inOut",
        },
        0,
      )
      .to(overlay.querySelector("[data-veil]"), { opacity: 0.55, duration: 1.1 }, 0.1);
  };

  useEffect(() => {
    const el = root.current;
    const stripEl = stripRef.current;
    const hero = heroRef.current;
    if (!el || !stripEl || !hero) return;
    const q = gsap.utils.selector(el);

    // Centre the hero frame in the viewport, whatever the screen width.
    // Measured with the strip untransformed, so the result is the target x.
    const heroOffset = () => {
      const current = (gsap.getProperty(stripEl, "x") as number) || 0;
      const r = hero.getBoundingClientRect();
      return window.innerWidth / 2 - (r.left - current + r.width / 2);
    };


    if (reduced) {
      gsap.set(q("[data-o]"), { opacity: 1, y: 0, scale: 1 });
      gsap.set(q("[data-reel]"), { opacity: 1 });
      gsap.set(stripEl, { x: heroOffset(), opacity: 1 });
      gsap.set(hero, { scale: 1.06 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tlRef.current = tl;

    // 0.0–0.7s  darkness → a tiny golden light → the reel silhouette
    tl.fromTo(q("[data-spark]"), { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1, duration: 0.45 }, 0)
      .to(q("[data-spark]"), { opacity: 0, scale: 3, duration: 0.7 }, 0.45)
      .fromTo(
        q("[data-reel]"),
        { opacity: 0, scale: 0.82, filter: "brightness(0.15)" },
        { opacity: 1, scale: 1, filter: "brightness(1)", duration: 1.1 },
        0.35,
      )
      // 0.7–2.0s  the reel turns and feeds the film out
      .to(q("[data-reel-spin]"), { rotate: 420, duration: 5.2, ease: "none" }, 0.5)
      .fromTo(q("[data-leader]"), { scaleY: 0 }, { scaleY: 1, duration: 0.7 }, 0.7)
      .fromTo(
        stripEl,
        { x: window.innerWidth * 0.95, opacity: 0 },
        { x: heroOffset(), opacity: 1, duration: 2.6, ease: "power2.out" },
        0.9,
      )
      // camera pushes in as the hero frame arrives
      .to(q("[data-camera]"), { scale: 1.12, y: "-4%", duration: 2.4, ease: "power2.inOut" }, 1.5)
      .to(hero, { scale: 1.08, duration: 0.9, ease: "power2.out" }, 2.4)
      .to(q("[data-spot]"), { opacity: 1, duration: 0.9 }, 2.3)
      .to(q("[data-dim]"), { opacity: 1, duration: 0.8 }, 2.4)
      // light leak sweeps across the film
      .fromTo(
        q("[data-leak]"),
        { xPercent: -140, opacity: 0 },
        { xPercent: 140, opacity: 0.85, duration: 1.5, ease: "sine.inOut" },
        2.1,
      )
      .to(q("[data-leak]"), { opacity: 0, duration: 0.4 }, 3.3)
      // 3.0–4.0s  ROHAN × ANANYA
      .fromTo(q("[data-o=names]"), { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.9 }, 3.0)
      // 4.0–4.8s  Glimpse of Our Forever
      .fromTo(q("[data-o=rule]"), { opacity: 0, scaleX: 0.15 }, { opacity: 1, scaleX: 1, duration: 0.7 }, 3.95)
      .fromTo(q("[data-o=title]"), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8 }, 4.1)
      .fromTo(q("[data-o=sub]"), { opacity: 0 }, { opacity: 1, duration: 0.6 }, 4.5)
      // 4.8–6.0s  the frame becomes the Welcome
      .add(() => expandIntoWelcome(), 5.2);

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return (
    <section className="relative h-full w-full overflow-hidden bg-[oklch(0.11_0.03_30)]">
      <div ref={root} className="absolute inset-0">
        {/* first spark of projector light */}
        <span
          data-spark
          className="pointer-events-none absolute left-1/2 top-[34%] z-30 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0"
          style={{
            background:
              "radial-gradient(circle, var(--gold-bright), color-mix(in oklab, var(--gold) 35%, transparent) 45%, transparent 70%)",
          }}
        />

        <div data-camera className="absolute inset-0" style={{ perspective: "900px" }}>
          {/* ── The reel ───────────────────────────────────────────── */}
          <div
            data-reel
            data-fade-out
            className="absolute left-[6%] top-[9%] z-20 h-[38vw] w-[38vw] max-h-44 max-w-44 opacity-0"
          >
            <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-[0_14px_26px_oklch(0.08_0.02_30/0.9)]">
              <defs>
                <radialGradient id="reelBody" cx="38%" cy="30%" r="75%">
                  <stop offset="0%" stopColor="oklch(0.42 0.03 60)" />
                  <stop offset="55%" stopColor="oklch(0.26 0.02 45)" />
                  <stop offset="100%" stopColor="oklch(0.15 0.02 40)" />
                </radialGradient>
                <linearGradient id="reelFilm" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.3 0.04 40)" />
                  <stop offset="100%" stopColor="oklch(0.17 0.03 35)" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="49" fill="url(#reelFilm)" />
              <g data-reel-spin style={{ transformOrigin: "50px 50px" }}>
                <circle cx="50" cy="50" r="49" fill="none" stroke="oklch(0.24 0.03 40)" strokeWidth="1" />
                {Array.from({ length: 40 }, (_, i) => (
                  <line
                    key={i}
                    x1="50"
                    y1="6"
                    x2="50"
                    y2="16"
                    stroke="oklch(0.42 0.03 55)"
                    strokeWidth="0.5"
                    opacity="0.5"
                    transform={`rotate(${i * 9} 50 50)`}
                  />
                ))}
                <circle cx="50" cy="50" r="34" fill="url(#reelBody)" stroke="var(--gold)" strokeWidth="0.8" opacity="0.95" />
                {Array.from({ length: 6 }, (_, i) => (
                  <g key={i} transform={`rotate(${i * 60} 50 50)`}>
                    <path
                      d="M50 24C57 27 62 33 62 41L50 44Z"
                      fill="oklch(0.13 0.02 35)"
                      opacity="0.85"
                    />
                    <line x1="50" y1="20" x2="50" y2="42" stroke="var(--gold)" strokeWidth="0.5" opacity="0.55" />
                  </g>
                ))}
                <circle cx="50" cy="50" r="10" fill="oklch(0.2 0.02 40)" stroke="var(--gold)" strokeWidth="1" />
                <circle cx="50" cy="50" r="3.4" fill="var(--gold-bright)" opacity="0.85" />
              </g>
              <circle cx="50" cy="50" r="49" fill="none" stroke="var(--gold)" strokeWidth="0.6" opacity="0.45" />
              <path d="M18 20A45 45 0 0 1 58 6" stroke="oklch(0.95 0.02 90)" strokeWidth="1.2" opacity="0.18" fill="none" />
            </svg>
            {/* film leader dropping from the reel toward the strip */}
            <div
              data-leader
              className="absolute left-1/2 top-full h-[9vh] w-3 origin-top -translate-x-1/2 bg-[linear-gradient(180deg,oklch(0.2_0.03_35),oklch(0.14_0.02_35))]"
            />
          </div>

          {/* ── The film strip ─────────────────────────────────────── */}
          <div
            data-dim
            className="pointer-events-none absolute inset-0 z-10 bg-[oklch(0.09_0.02_30)]/55 opacity-0"
          />
          <div
            className="absolute inset-x-0 top-[46%] z-20 -translate-y-1/2"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              ref={stripRef}
              data-fade-out
              className="flex w-max items-stretch gap-0 opacity-0"
              style={{
                transform: "rotateY(-8deg) rotateX(3deg)",
                transformStyle: "preserve-3d",
                filter: "drop-shadow(0 18px 26px oklch(0.08 0.02 30 / 0.85))",
              }}
            >
              {strip.map((f, i) => (
                <div
                  key={i}
                  ref={f.hero ? heroRef : undefined}
                  className="relative w-[62vw] max-w-[19rem] shrink-0 border-x border-[oklch(0.1_0.01_40)] bg-[oklch(0.13_0.02_38)] px-[3%] py-[10%]"
                >
                  <Sprockets side="top" />
                  <Sprockets side="bottom" />
                  <div className="relative aspect-[5/4] overflow-hidden bg-black">
                    <img
                      src={f.src}
                      alt={f.alt}
                      width={640}
                      height={512}
                      loading={f.hero ? "eager" : "lazy"}
                      decoding="async"
                      className="h-full w-full object-cover"
                    />
                    {!f.hero && <div className="absolute inset-0 bg-[oklch(0.11_0.03_30)]/45" />}
                    {f.hero && (
                      <div
                        data-spot
                        className="absolute inset-0 opacity-0"
                        style={{
                          background:
                            "radial-gradient(60% 55% at 50% 42%, color-mix(in oklab, var(--gold-bright) 22%, transparent), transparent 75%)",
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* warm light leak passing across the film */}
            <div
              data-leak
              className="pointer-events-none absolute inset-y-[-30%] left-0 z-30 w-1/3 opacity-0"
              style={{
                background:
                  "linear-gradient(100deg, transparent, color-mix(in oklab, var(--gold-bright) 55%, transparent) 45%, oklch(0.72 0.16 45 / 0.45) 65%, transparent)",
                filter: "blur(14px)",
              }}
            />
          </div>
        </div>

        {/* ── Typography ─────────────────────────────────────────── */}
        <div
          data-fade-out
          className="pointer-events-none absolute inset-x-0 bottom-[13%] z-30 flex flex-col items-center px-8 text-center"
        >
          <div data-o="names" className="opacity-0">
            <p className="font-display text-[2.4rem] font-light leading-[1.05] tracking-[0.16em] text-ivory">
              {wedding.couple.groom.toUpperCase()}
              <span className="mx-3 align-middle font-display text-xl text-gold">×</span>
              {wedding.couple.bride.toUpperCase()}
            </p>
          </div>
          <Divider data-o="rule" className="mt-4 h-4 w-48 text-gold opacity-0" />
          <p
            data-o="title"
            className="mt-4 font-display text-xl italic tracking-wide text-gold-bright opacity-0"
          >
            {wedding.couple.tagline}
          </p>
          <p
            data-o="sub"
            className="mt-3 font-sans text-[0.58rem] uppercase tracking-[0.42em] text-ivory/55 opacity-0"
          >
            {wedding.couple.subtitle}
          </p>
        </div>

        <Dust count={7} />
        <FilmGrain />

        {/* Skip — never a hard cut, it just selects the hero frame early. */}
        {!closing && (
          <button
            type="button"
            onClick={expandIntoWelcome}
            data-fade-out
            className="absolute bottom-5 left-4 z-40 min-h-11 px-4 py-2 font-sans text-[0.58rem] uppercase tracking-[0.34em] text-ivory/55"
          >
            Skip →
          </button>
        )}

        {/* The photograph that continues into the Welcome scene. */}
        <div
          ref={expandRef}
          className="pointer-events-none fixed z-50 overflow-hidden opacity-0"
          style={{ top: 0, left: 0, width: 0, height: 0 }}
        >
          <img
            src={wedding.couple.portrait}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
          <div
            data-veil
            className="absolute inset-0 bg-gradient-to-t from-maroon-deep to-transparent opacity-0"
          />
        </div>
      </div>
    </section>
  );
}
