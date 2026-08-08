import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useScene, usePrefersReducedMotion } from "../engine/SceneProvider";
import { wedding } from "../data/wedding";

import reelMehendi from "@/assets/reel-mehendi.jpg";
import reelJewellery from "@/assets/reel-jewellery.jpg";
import reelMarigold from "@/assets/reel-marigold.jpg";
import reelPalace from "@/assets/reel-palace.jpg";
import palaceNight from "@/assets/palace-night.jpg";

/** 6-frame film strip with couple photo at the end */
const reelFrames = [
  {
    id: "f1",
    src: reelPalace,
    alt: "A wide cinematic shot of a Rajasthani palace at dusk",
    hero: false,
  },
  {
    id: "f2",
    src: reelMarigold,
    alt: "Marigold garlands and traditional lanterns in haveli courtyard",
    hero: false,
  },
  {
    id: "f3",
    src: reelMehendi,
    alt: "Detailed close-up of intricate mehendi designs on bride's hands",
    hero: false,
  },
  {
    id: "f4",
    src: reelJewellery,
    alt: "Kundan bridal jewellery on velvet",
    hero: false,
  },
  {
    id: "f5",
    src: palaceNight,
    alt: "Heritage palace courtyard illuminated at night",
    hero: false,
  },
  {
    id: "f6",
    src: wedding.couple.portrait,
    alt: `${wedding.couple.groom} and ${wedding.couple.bride} in royal Rajasthani attire`,
    hero: true,
  },
];

export default function OpeningScene() {
  const { goNext } = useScene();
  const reduced = usePrefersReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const filmReelRef = useRef<HTMLDivElement>(null);
  const filmStripRef = useRef<HTMLDivElement>(null);
  const heroFrameRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const heroSpotlightRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const skipBtnRef = useRef<HTMLButtonElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const [closing, setClosing] = useState(false);

  /** Skip or finish transition into full screen and advance scene */
  const triggerExpandAndNext = () => {
    if (closing) return;
    setClosing(true);

    if (tlRef.current) {
      tlRef.current.kill();
    }

    if (reduced || !heroFrameRef.current) {
      goNext();
      return;
    }

    const expandTl = gsap.timeline({ onComplete: goNext });
    expandTl
      .to([textContainerRef.current, skipBtnRef.current, filmReelRef.current], {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
      })
      .to(
        heroImageRef.current,
        {
          filter: "grayscale(0%)",
          opacity: 1,
          scale: 1,
          duration: 0.8,
        },
        0,
      )
      .to(
        heroFrameRef.current,
        {
          width: "100vw",
          height: "100vh",
          borderWidth: 0,
          padding: 0,
          borderRadius: 0,
          duration: 1.4,
          ease: "expo.inOut",
        },
        0.1,
      );
  };

  useEffect(() => {
    if (!root.current || reduced) {
      if (reduced) {
        gsap.set(textContainerRef.current, { opacity: 1, y: -20, scale: 1 });
        gsap.set(heroImageRef.current, { filter: "grayscale(0%)", opacity: 1, scale: 1 });
        gsap.set(heroSpotlightRef.current, { opacity: 0.8 });
      }
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tlRef.current = tl;

    // Phase 1: Reel appearance & spin start, skip button fade in
    tl.to(filmReelRef.current, { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" })
      .to(skipBtnRef.current, { opacity: 0.7, duration: 0.8 }, "-=0.8")

      // Phase 2: Film strip rolls across screen through frames 1 to 5
      .to(filmStripRef.current, { opacity: 1, x: "10vw", duration: 2.2, ease: "power1.inOut" }, "-=0.6")
      .to(filmReelRef.current, { rotation: 360, duration: 5.5, ease: "none" }, "-=2.2")

      // Phase 3: Roll continuously to the END of the strip to center Frame 6 (the couple photo)
      .to(filmStripRef.current, { x: "-42%", duration: 3.2, ease: "power2.inOut" }, "-=3.3")

      // Phase 4: Focus on couple photo at the end - color reveal & spotlight
      .to(heroImageRef.current, { filter: "grayscale(0%)", opacity: 1, scale: 1, duration: 1.5 }, "-=1.2")
      .to(heroSpotlightRef.current, { opacity: 0.8, duration: 1.5 }, "-=1.5")

      // Phase 5: Reveal Typography (Stitch Heritage Noir titles)
      .to(filmReelRef.current, { opacity: 0, duration: 0.8 }, "-=1.0")
      .to(textContainerRef.current, { opacity: 1, y: -20, duration: 1.6, ease: "power2.out" })

      // Phase 6: Zoom in & expand couple photo into full screen, then transition to Welcome page
      .to(
        heroFrameRef.current,
        {
          width: "100vw",
          height: "100vh",
          borderWidth: 0,
          padding: 0,
          duration: 1.8,
          ease: "expo.inOut",
          delay: 1.8,
        },
      )
      .to(skipBtnRef.current, { opacity: 0, duration: 0.4 }, "-=1.8")
      .to(textContainerRef.current, { scale: 1.05, opacity: 0, duration: 1.2, ease: "power1.out" }, "-=1.2")
      .add(() => {
        goNext();
      });

    return () => {
      tl.kill();
    };
  }, [reduced, goNext]);

  return (
    <section
      ref={root}
      className="relative w-full h-full overflow-hidden bg-[#0d0f07] text-[#e3e3d5] font-sans select-none"
    >
      {/* Cinematic Film Overlays from Stitch MCP */}
      <div className="film-grain" />
      <div className="light-leak" id="lightLeak" />

      {/* Main Container for Animation Sequence */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden" id="introContainer">
        
        {/* Stitch MCP Typography Container */}
        <div
          ref={textContainerRef}
          className="absolute inset-0 flex flex-col items-center justify-center z-20 opacity-0 pointer-events-none drop-shadow-2xl translate-y-5"
          id="textContainer"
        >
          <h2 className="font-display text-[18px] md:text-[24px] text-[#e9c349] mb-4 md:mb-6 tracking-[0.6em] uppercase drop-shadow-[0_0_15px_rgba(233,195,73,0.6)]">
            {wedding.couple.groom.toUpperCase()} × {wedding.couple.bride.toUpperCase()}
          </h2>
          <h1 className="font-display text-[40px] md:text-[80px] text-[#e3e3d5] text-center px-4 max-w-5xl leading-[1.1] tracking-widest drop-shadow-[0_0_25px_rgba(233,195,73,0.3)]">
            {wedding.couple.tagline || "Glimpse of Our Forever"}
          </h1>
          <p className="mt-4 text-[12px] md:text-[14px] text-[#c4c7c7] font-sans tracking-[0.3em] uppercase opacity-80">
            {wedding.couple.subtitle || "A Royal Wedding Invitation"}
          </p>
        </div>

        {/* Reel & Film Strip Container */}
        <div className="relative w-full h-full flex items-center justify-center" id="reelSequence">
          
          {/* Vintage Reel Silhouette */}
          <div
            ref={filmReelRef}
            className="absolute w-[320px] h-[320px] md:w-[600px] md:h-[600px] opacity-0 scale-50 z-10 rounded-full border-[8px] md:border-[12px] border-[#e9c349]/30 flex items-center justify-center shadow-[0_0_80px_rgba(233,195,73,0.15)]"
            id="filmReel"
          >
            <div className="absolute inset-0 border-4 border-dashed border-[#e9c349]/40 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="w-12 h-12 md:w-20 md:h-20 bg-[#e9c349]/80 rounded-full shadow-[0_0_40px_rgba(233,195,73,0.5)]" />
          </div>

          {/* Long Horizontal Film Strip (6 frames, ending with couple photo) */}
          <div
            ref={filmStripRef}
            className="absolute flex gap-6 md:gap-12 items-center opacity-0 z-0 translate-x-[60vw]"
            id="filmStrip"
          >
            {reelFrames.map((frame) => {
              if (frame.hero) {
                return (
                  /* Frame 6 (Final Hero Frame - Couple Photo) */
                  <div
                    key={frame.id}
                    ref={heroFrameRef}
                    className="w-[340px] h-[226px] md:w-[800px] md:h-[533px] relative shrink-0 border-y-[10px] md:border-y-[16px] border-x-[4px] md:border-x-[6px] border-[#12140c] bg-[#12140c] p-2 md:p-3 flex items-center justify-center overflow-hidden transition-all duration-1000"
                    id="heroFrame"
                  >
                    <img
                      ref={heroImageRef}
                      src={frame.src}
                      alt={frame.alt}
                      className="w-full h-full object-cover filter grayscale opacity-70 transition-all duration-1000 scale-105"
                      id="heroImage"
                    />
                    <div
                      ref={heroSpotlightRef}
                      className="absolute inset-0 bg-gradient-to-t from-[#0d0f07] via-transparent to-transparent opacity-0 pointer-events-none"
                      id="heroSpotlight"
                    />
                  </div>
                );
              }

              return (
                /* Regular Film Frames 1 to 5 */
                <div
                  key={frame.id}
                  className="w-[320px] h-[213px] md:w-[800px] md:h-[533px] relative shrink-0 border-y-[10px] md:border-y-[16px] border-x-[4px] md:border-x-[6px] border-[#12140c] bg-[#12140c] p-2 md:p-3 flex items-center justify-center"
                >
                  <img
                    src={frame.src}
                    alt={frame.alt}
                    className="w-full h-full object-cover filter grayscale opacity-60"
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Skip Button with Stitch MCP styling */}
      {!closing && (
        <button
          ref={skipBtnRef}
          type="button"
          onClick={triggerExpandAndNext}
          className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-50 text-[#c4c7c7] font-sans text-[11px] md:text-[12px] uppercase tracking-[0.2em] font-semibold hover:text-[#e9c349] transition-colors duration-300 flex items-center gap-2 group opacity-0 cursor-pointer"
          id="skipBtn"
        >
          Skip
          <span className="text-[14px] md:text-[16px] group-hover:translate-x-1 transition-transform">
            →
          </span>
        </button>
      )}
    </section>
  );
}
