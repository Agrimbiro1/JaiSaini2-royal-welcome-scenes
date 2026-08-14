import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useScene, usePrefersReducedMotion } from "../engine/SceneProvider";
import { wedding } from "../data/wedding";

import reelMehendi from "/assets/reel-mehendi.jpg";
import reelJewellery from "/assets/reel-jewellery.jpg";
import reelMarigold from "/assets/reel-marigold.jpg";
import reelPalace from "/assets/reel-palace.jpg";
import palaceNight from "/assets/palace-night.jpg";

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
  const rohanRef = useRef<HTMLSpanElement>(null);
  const ampRef = useRef<HTMLSpanElement>(null);
  const ananyaRef = useRef<HTMLSpanElement>(null);
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
        gsap.set(textContainerRef.current, { opacity: 1, y: 0, scale: 1 });
        gsap.set(heroImageRef.current, { filter: "grayscale(0%)", opacity: 1, scale: 1 });
        gsap.set(heroSpotlightRef.current, { opacity: 0.8 });
      }
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tlRef.current = tl;

    // Dynamic center calculations for mobile & desktop
    const getFrame1CenterX = () => {
      if (!filmStripRef.current) return 0;
      const stripWidth = filmStripRef.current.offsetWidth;
      const firstChild = filmStripRef.current.firstElementChild as HTMLElement;
      if (!firstChild) return 0;
      const frame1Left = firstChild.offsetLeft;
      const frame1Width = firstChild.offsetWidth;
      const frame1Center = frame1Left + frame1Width / 2;
      return -(frame1Center - stripWidth / 2);
    };

    const getHeroCenterX = () => {
      if (!heroFrameRef.current || !filmStripRef.current) return 0;
      const stripWidth = filmStripRef.current.offsetWidth;
      const heroLeft = heroFrameRef.current.offsetLeft;
      const heroWidth = heroFrameRef.current.offsetWidth;
      const heroCenter = heroLeft + heroWidth / 2;
      return -(heroCenter - stripWidth / 2);
    };

    // Initialize strip position
    gsap.set(filmStripRef.current, { x: () => getFrame1CenterX(), opacity: 0 });

    // Phase 1: Reel appearance & spin start, skip button fade in
    tl.to(filmReelRef.current, { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" })
      .to(skipBtnRef.current, { opacity: 0.8, duration: 0.6 }, "-=0.6")
      .to(filmStripRef.current, { opacity: 1, duration: 0.6 }, "-=0.4")

      // Phase 2 & 3: Film strip rolls continuously to DEAD-CENTER of Frame 6 (Couple Photo)
      .to(filmReelRef.current, { rotation: 360, duration: 5.0, ease: "none" }, 0.6)
      .to(filmStripRef.current, { x: () => getHeroCenterX(), duration: 3.4, ease: "power2.inOut" }, 0.6)

      // Phase 4: Focus on couple photo at the end - color reveal & spotlight
      .to(heroImageRef.current, { filter: "grayscale(0%)", opacity: 1, scale: 1, duration: 1.2 }, "-=1.2")
      .to(heroSpotlightRef.current, { opacity: 0.8, duration: 1.2 }, "-=1.2")

      // Phase 5: Reveal Typography Container
      .to(filmReelRef.current, { opacity: 0, duration: 0.8 }, "-=1.0")
      .to(textContainerRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" });

    // Writing Animation for Staggered Rohan & Ananya Heading
    if (rohanRef.current && ampRef.current && ananyaRef.current) {
      tl.fromTo(
        rohanRef.current,
        { clipPath: "inset(-25px 100% -25px 0)" },
        { clipPath: "inset(-25px -25px -25px -25px)", duration: 0.85, ease: "power1.inOut" },
        "-=0.2"
      )
        .fromTo(
          ampRef.current,
          { opacity: 0, scale: 0.4 },
          { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)" },
          "-=0.15"
        )
        .fromTo(
          ananyaRef.current,
          { clipPath: "inset(-25px 100% -25px 0)" },
          { clipPath: "inset(-25px -25px -25px -25px)", duration: 0.85, ease: "power1.inOut" },
          "-=0.15"
        );
    }

    // Phase 6: Zoom in & expand couple photo into full screen, then transition to Welcome page
    tl.to(
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
      {/* Cinematic Film Overlays */}
      <div className="film-grain" />
      <div className="light-leak" id="lightLeak" />

      {/* Main Container for Animation Sequence */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden" id="introContainer">
        
        {/* Responsive Typography Container (NO top margin on PC version) */}
        <div
          ref={textContainerRef}
          className="absolute inset-0 flex flex-col items-center justify-center z-20 opacity-0 pointer-events-none drop-shadow-2xl pt-6 sm:pt-2 px-4"
          id="textContainer"
        >
          {/* Staggered Big Font Title with Writing Animation: Rohan & Ananya */}
          <div className="flex flex-col items-center select-none my-0 w-full max-w-xs sm:max-w-sm md:max-w-md overflow-visible">
            <span
              ref={rohanRef}
              className="font-script text-[42px] sm:text-[58px] md:text-[70px] lg:text-[78px] text-[#e9c349] tracking-wider self-start pl-2 sm:pl-6 pt-1 pb-0 leading-tight overflow-visible drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)]"
            >
              Rohan
            </span>
            <span
              ref={ampRef}
              className="font-serif italic font-bold text-[22px] sm:text-[32px] md:text-[40px] text-[#FBF1DE] opacity-90 -my-2.5 sm:-my-4 md:-my-5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
            >
              &
            </span>
            <span
              ref={ananyaRef}
              className="font-script text-[42px] sm:text-[58px] md:text-[70px] lg:text-[78px] text-[#e9c349] tracking-wider self-end pr-2 sm:pr-6 pt-1 pb-0 leading-tight overflow-visible drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)]"
            >
              Ananya
            </span>
          </div>

          <h1 className="font-display text-[22px] sm:text-[38px] md:text-[64px] text-[#e3e3d5] text-center max-w-5xl leading-[1.15] tracking-wider sm:tracking-widest mt-1 drop-shadow-[0_0_25px_rgba(233,195,73,0.3)]">
            {wedding.couple.tagline || "Glimpse of Our Forever"}
          </h1>
          <p className="mt-2 sm:mt-4 text-[10px] sm:text-[12px] md:text-[14px] text-[#c4c7c7] font-sans tracking-[0.2em] sm:tracking-[0.3em] uppercase opacity-80 text-center">
            {wedding.couple.subtitle || "A Royal Wedding Invitation"}
          </p>
        </div>

        {/* Reel & Film Strip Container */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden" id="reelSequence">
          
          {/* Vintage Reel Silhouette */}
          <div
            ref={filmReelRef}
            className="absolute w-[300px] h-[300px] sm:w-[340px] sm:h-[340px] md:w-[600px] md:h-[600px] opacity-0 scale-50 z-10 rounded-full border-[6px] sm:border-[8px] md:border-[12px] border-[#e9c349]/30 flex items-center justify-center shadow-[0_0_80px_rgba(233,195,73,0.15)] pointer-events-none"
            id="filmReel"
          >
            <div className="absolute inset-0 border-3 sm:border-4 border-dashed border-[#e9c349]/40 rounded-full animate-[spin_20s_linear_infinite]" />
            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-20 md:h-20 bg-[#e9c349]/80 rounded-full shadow-[0_0_40px_rgba(233,195,73,0.5)]" />
          </div>

          {/* Long Horizontal Film Strip (6 frames, ending with couple photo) */}
          <div
            ref={filmStripRef}
            className="absolute flex gap-4 sm:gap-6 md:gap-12 items-center opacity-0 z-0"
            id="filmStrip"
          >
            {reelFrames.map((frame) => {
              if (frame.hero) {
                return (
                  /* Frame 6 (Final Hero Frame - Couple Photo: Same size as other frames) */
                  <div
                    key={frame.id}
                    ref={heroFrameRef}
                    className="w-[340px] h-[226px] sm:w-[360px] sm:h-[240px] md:w-[700px] md:h-[466px] relative shrink-0 border-y-[8px] sm:border-y-[10px] md:border-y-[16px] border-x-[3px] sm:border-x-[4px] md:border-x-[6px] border-[#12140c] bg-[#12140c] p-1.5 sm:p-2 md:p-3 flex items-center justify-center overflow-hidden transition-all duration-1000 origin-center"
                    id="heroFrame"
                  >
                    <img
                      ref={heroImageRef}
                      src={frame.src}
                      alt={frame.alt}
                      className="w-full h-full object-cover filter grayscale opacity-70 transition-all duration-1000"
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
                  className="w-[340px] h-[226px] sm:w-[360px] sm:h-[240px] md:w-[700px] md:h-[466px] relative shrink-0 border-y-[8px] sm:border-y-[10px] md:border-y-[16px] border-x-[3px] sm:border-x-[4px] md:border-x-[6px] border-[#12140c] bg-[#12140c] p-1.5 sm:p-2 md:p-3 flex items-center justify-center"
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

      {/* Skip Button */}
      {!closing && (
        <button
          ref={skipBtnRef}
          type="button"
          onClick={triggerExpandAndNext}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-12 md:right-12 z-50 text-[#c4c7c7] font-sans text-[11px] md:text-[12px] uppercase tracking-[0.2em] font-semibold hover:text-[#e9c349] transition-colors duration-300 flex items-center gap-2 group opacity-0 cursor-pointer bg-[#12140c]/70 px-3 py-1.5 rounded-full border border-[#e9c349]/30 backdrop-blur-xs"
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
