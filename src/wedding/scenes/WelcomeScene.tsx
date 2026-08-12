import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useScene, usePrefersReducedMotion } from "../engine/SceneProvider";
import { wedding } from "../data/wedding";
import { Divider, JaaliPanel } from "../ui/Ornaments";
import { AmbientLayer, WarmGlow } from "../ui/Ambient";
import { PeacockFeathers } from "../ui/PeacockFeathers";

import welcomeBg from "/assets/welcome-background.png";
import welcomeMan from "/assets/welcome-man.png";
import welcomeWomen from "/assets/welcome-women.png";
import coupleFrame from "/assets/couple-frame.png";

import reelMehendi from "/assets/reel-mehendi.jpg";
import reelJewellery from "/assets/reel-jewellery.jpg";
import reelMarigold from "/assets/reel-marigold.jpg";
import reelPalace from "/assets/reel-palace.jpg";
import palaceNight from "/assets/palace-night.jpg";
import couplePhoto from "/assets/couple.jpg?url";

/** 6-frame film strip ending with couple photo */
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
    src: couplePhoto,
    alt: `${wedding.couple.groom} and ${wedding.couple.bride} in royal Rajasthani attire`,
    hero: true,
  },
];

export default function WelcomeScene() {
  const { goNext } = useScene();
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const filmReelRef = useRef<HTMLDivElement>(null);
  const filmStripRef = useRef<HTMLDivElement>(null);
  const heroFrameRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);
  const heroSpotlightRef = useRef<HTMLDivElement>(null);
  const handwritingTitleRef = useRef<HTMLDivElement>(null);
  const whiteFlashRef = useRef<HTMLDivElement>(null);
  const welcomeCardRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const [welcomeRevealed, setWelcomeRevealed] = useState(false);
  const { guestName, quote, message } = wedding.welcome;

  /** Skip opening animation and reveal Welcome card directly */
  const revealWelcomeCard = () => {
    if (welcomeRevealed) return;
    setWelcomeRevealed(true);

    if (tlRef.current) {
      tlRef.current.kill();
    }

    if (reduced) {
      if (filmReelRef.current) filmReelRef.current.style.display = "none";
      if (filmStripRef.current) filmStripRef.current.style.display = "none";
      if (handwritingTitleRef.current) handwritingTitleRef.current.style.display = "none";
      if (whiteFlashRef.current) whiteFlashRef.current.style.display = "none";
      if (welcomeCardRef.current) {
        gsap.set(welcomeCardRef.current, { opacity: 1, scale: 1 });
      }
      return;
    }

    const cardTl = gsap.timeline();
    cardTl
      .to(
        [
          filmReelRef.current,
          filmStripRef.current,
          handwritingTitleRef.current,
        ],
        {
          opacity: 0,
          duration: 0.3,
          ease: "power2.out",
        },
      )
      .to(whiteFlashRef.current, { opacity: 1, duration: 0.4 }, 0.1)
      .add(() => {
        if (welcomeCardRef.current) {
          gsap.set(welcomeCardRef.current, { opacity: 1, scale: 1 });
        }
      })
      .to(whiteFlashRef.current, { opacity: 0, duration: 0.8 }, 0.5);
  };

  useEffect(() => {
    if (!rootRef.current || reduced) {
      if (reduced) {
        setWelcomeRevealed(true);
        if (welcomeCardRef.current) {
          gsap.set(welcomeCardRef.current, { opacity: 1, scale: 1 });
        }
      }
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tlRef.current = tl;

    // Calculate exact X transform so Frame 1 starts centered
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

    // Calculate exact X transform so couple photo (Frame 6) lands in the absolute dead-center of the viewport
    const getHeroCenterX = () => {
      if (!heroFrameRef.current || !filmStripRef.current) return 0;
      const stripWidth = filmStripRef.current.offsetWidth;
      const heroLeft = heroFrameRef.current.offsetLeft;
      const heroWidth = heroFrameRef.current.offsetWidth;
      const heroCenter = heroLeft + heroWidth / 2;
      return -(heroCenter - stripWidth / 2);
    };

    // Calculate exact scale so couple photo covers screen comfortably without over-zooming
    const getCoverageScale = () => {
      if (!heroFrameRef.current) return 1.5;
      const rect = heroFrameRef.current.getBoundingClientRect();
      if (!rect.width || !rect.height) return 1.5;
      const scaleX = window.innerWidth / rect.width;
      const scaleY = window.innerHeight / rect.height;
      return Math.max(scaleX, scaleY) * 1.05;
    };

    // Initialize film strip position centered at Frame 1
    gsap.set(filmStripRef.current, { x: () => getFrame1CenterX(), opacity: 0 });

    // Phase 1: Pure Reel Motion
    tl.to(filmReelRef.current, { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" })
      .to(filmStripRef.current, { opacity: 1, duration: 0.6 }, 0.4)

      // Phase 2 & 3: Reel rotates and film strip rolls continuously to Frame 6 (Couple Photo at DEAD CENTER)
      .to(filmReelRef.current, { rotation: 360, duration: 4.8, ease: "none" }, 0.6)
      .to(filmStripRef.current, { x: () => getHeroCenterX(), duration: 3.2, ease: "power2.inOut" }, 0.6)

      // Phase 4: Focus on couple photo
      .to(filmReelRef.current, { opacity: 0, duration: 0.5 }, 3.8)
      .to(heroImageRef.current, { filter: "grayscale(0%)", opacity: 1, scale: 1, duration: 1.0 }, 3.8)
      .to(heroSpotlightRef.current, { opacity: 0.8, duration: 1.0 }, 3.8)

      // Phase 5: Writing animation for "Rohan & Ananya"
      .to(handwritingTitleRef.current, { opacity: 1, duration: 0.3 });

    const titleH1 = handwritingTitleRef.current?.querySelector("h1");
    if (titleH1) {
      tl.fromTo(
        titleH1,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 2.2, ease: "power1.inOut" },
        "-=0.2",
      );
    }

    tl
      // Phase 6: Photo zooms smoothly to cover screen
      .to(
        heroFrameRef.current,
        {
          scale: () => getCoverageScale(),
          transformOrigin: "50% 50%",
          duration: 1.5,
          ease: "power2.inOut",
          delay: 0.4,
        },
      )
      .to([filmReelRef.current, handwritingTitleRef.current], { opacity: 0, duration: 1.0, ease: "power2.out" }, "-=1.5")

      // Phase 7: White flash transition
      .to(whiteFlashRef.current, { opacity: 1, duration: 0.8, ease: "power2.in" })

      // Phase 8: Welcome page appears cleanly out of the white transition
      .add(() => {
        setWelcomeRevealed(true);
        if (welcomeCardRef.current) {
          gsap.set(welcomeCardRef.current, { opacity: 1, scale: 1 });
        }
      })
      .to(whiteFlashRef.current, { opacity: 0, duration: 1.2, ease: "power2.out" });

    return () => {
      tl.kill();
    };
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="relative w-full h-full overflow-hidden bg-[#0d0f07] text-[#e3e3d5] font-sans select-none"
    >
      {/* Background Ornaments */}
      <JaaliPanel className="absolute inset-0 opacity-[0.07] pointer-events-none" />
      <WarmGlow className="left-1/2 top-[26%] h-64 w-64 -translate-x-1/2 opacity-45 pointer-events-none" />

      {/* Film Overlays */}
      <div className="film-grain" />
      <div className="light-leak" id="lightLeak" />

      {/* White Flash Transition Screen */}
      <div
        ref={whiteFlashRef}
        className="fixed inset-0 z-50 bg-white opacity-0 pointer-events-none transition-opacity"
      />

      {/* ── STAGE 1: Opening Reel Animation ───────────────────── */}
      <div
        className={`relative w-full h-full flex items-center justify-center overflow-hidden transition-opacity duration-700 ${
          welcomeRevealed ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        {/* Handwriting Title "Rohan & Ananya" */}
        <div
          ref={handwritingTitleRef}
          className="absolute top-4 sm:top-6 md:top-10 inset-x-0 z-30 flex justify-center opacity-0 pointer-events-none"
        >
          <h1 className="font-script text-[32px] sm:text-[54px] md:text-[80px] text-[#e9c349] tracking-wider text-center leading-tight px-4">
            Rohan & Ananya
          </h1>
        </div>

        {/* Vintage Reel Silhouette */}
        <div
          ref={filmReelRef}
          className="absolute w-[200px] h-[200px] sm:w-[320px] sm:h-[320px] md:w-[480px] md:h-[480px] opacity-0 scale-50 z-10 rounded-full border-[5px] sm:border-[6px] md:border-[10px] border-[#e9c349]/30 flex items-center justify-center shadow-[0_0_60px_rgba(233,195,73,0.15)] pointer-events-none"
        >
          <div className="absolute inset-0 border-3 md:border-4 border-dashed border-[#e9c349]/40 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-20 md:h-20 bg-[#e9c349]/80 rounded-full shadow-[0_0_30px_rgba(233,195,73,0.5)]" />
        </div>

        {/* 6-Frame Film Strip */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden z-0">
          <div
            ref={filmStripRef}
            className="absolute flex gap-3 sm:gap-4 md:gap-10 items-center"
          >
            {reelFrames.map((frame) => {
              if (frame.hero) {
                return (
                  <div
                    key={frame.id}
                    ref={heroFrameRef}
                    className="w-[220px] h-[147px] sm:w-[320px] sm:h-[213px] md:w-[540px] md:h-[360px] relative shrink-0 border-y-[6px] sm:border-y-[8px] md:border-y-[14px] border-x-[2.5px] sm:border-x-[3px] md:border-x-[5px] border-[#12140c] bg-[#12140c] p-1 sm:p-1.5 md:p-2.5 flex items-center justify-center overflow-hidden origin-center"
                  >
                    <img
                      ref={heroImageRef}
                      src={frame.src}
                      alt={frame.alt}
                      className="w-full h-full object-cover filter grayscale opacity-70 transition-all duration-1000 scale-105"
                    />
                    <div
                      ref={heroSpotlightRef}
                      className="absolute inset-0 bg-gradient-to-t from-[#0d0f07] via-transparent to-transparent opacity-0 pointer-events-none"
                    />
                  </div>
                );
              }

              return (
                <div
                  key={frame.id}
                  className="w-[200px] h-[133px] sm:w-[300px] sm:h-[200px] md:w-[500px] md:h-[333px] relative shrink-0 border-y-[6px] sm:border-y-[8px] md:border-y-[14px] border-x-[2.5px] sm:border-x-[3px] md:border-x-[5px] border-[#12140c] bg-[#12140c] p-1 sm:p-1.5 md:p-2.5 flex items-center justify-center"
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

        {/* Skip Button */}
        {!welcomeRevealed && (
          <button
            type="button"
            onClick={revealWelcomeCard}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 text-[#c4c7c7] font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-medium hover:text-[#e9c349] transition-colors cursor-pointer bg-[#12140c]/70 px-3 py-1.5 rounded-full border border-[#e9c349]/30 backdrop-blur-xs"
          >
            Skip Intro →
          </button>
        )}
      </div>

      {/* ── STAGE 2: Welcome Page & Open Invitation Button ─────── */}
      <div
        ref={welcomeCardRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-6 pb-12 sm:pb-20 pt-6 sm:pt-10 opacity-0 scale-95 transition-all duration-700 overflow-hidden"
      >
        {/* Full Cover Welcome Background Image (z-0) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src={welcomeBg}
            alt="Welcome Background"
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* Elegant dark vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f07]/85 via-[#0d0f07]/50 to-[#0d0f07]/65" />
        </div>

        {/* Falling Particles Layer (z-10): Peacock Feathers & Golden Petals */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <PeacockFeathers active={welcomeRevealed} count={16} />
        </div>

        {/* ==================== CORNER WELCOME IMAGES LAYERED ON TOP (z-30) ==================== */}

        {/* Left Corner: Royal Rajasthani Welcome Man - LAYERED ON TOP OF CARD (z-30) */}
        <div className="absolute left-0 bottom-0 z-30 pointer-events-none max-w-[130px] sm:max-w-[200px] md:max-w-[320px] lg:max-w-[340px] max-h-[38vh] sm:max-h-[55vh] md:max-h-[65vh]">
          <img
            src={welcomeMan}
            alt="Royal Rajasthani Welcome Man"
            className="w-full h-auto object-contain object-left-bottom filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
          />
        </div>

        {/* Right Corner: Royal Rajasthani Welcome Woman - LAYERED ON TOP OF CARD (z-30) */}
        <div className="absolute right-0 bottom-0 z-30 pointer-events-none max-w-[130px] sm:max-w-[200px] md:max-w-[320px] lg:max-w-[340px] max-h-[38vh] sm:max-h-[55vh] md:max-h-[65vh]">
          <img
            src={welcomeWomen}
            alt="Royal Rajasthani Welcome Woman"
            className="w-full h-auto object-contain object-right-bottom filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
          />
        </div>

        {/* Foreground Content Layer (z-20): Couple Image, Text & Button */}
        <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-xl">
          {/* Royal Couple Frame (couple-frame.png) */}
          <div className="relative w-[82%] max-w-[17rem] sm:max-w-[22rem] md:max-w-[27rem] aspect-[4/3] flex items-center justify-center my-1.5 sm:my-2">
            {/* Inner Photo */}
            <div className="absolute top-[16%] bottom-[16%] left-[16%] right-[16%] overflow-hidden rounded-xs z-0 bg-[#0d0f07]">
              <img
                src={wedding.couple.portrait}
                alt={`${wedding.couple.groom} and ${wedding.couple.bride}`}
                width={768}
                height={1024}
                className="h-full w-full object-cover object-[center_25%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f07]/30 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* couple-frame.png Ornate Frame Overlay */}
            <img
              src={coupleFrame}
              alt="Royal Couple Frame"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10 filter drop-shadow-[0_6px_25px_rgba(233,195,73,0.45)]"
            />
          </div>

          {/* Guest Greeting */}
          <p className="mt-3 sm:mt-5 font-display text-lg sm:text-xl md:text-2xl tracking-wide text-[#e3e3d5] text-center">
            Dear <span className="text-[#e9c349]">{guestName}</span>
          </p>
          <Divider className="mt-2 h-2.5 sm:h-3 w-28 sm:w-32 text-[#e9c349]/70" />

          <p className="mt-2.5 max-w-[17rem] sm:max-w-[20rem] md:max-w-[24rem] text-center font-display text-xs sm:text-sm md:text-base italic leading-relaxed text-[#e9c349]/90 px-2">
            “{quote}”
          </p>
          <p className="mt-2 max-w-[18rem] sm:max-w-[21rem] md:max-w-[26rem] text-center font-sans text-[0.72rem] sm:text-[0.75rem] md:text-[0.82rem] leading-relaxed text-[#e3e3d5]/70 px-2">
            {message}
          </p>

          {/* Open Invitation Button */}
          <button
            type="button"
            onClick={goNext}
            className="mt-4 sm:mt-6 group relative inline-flex items-center gap-2.5 sm:gap-3 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#e9c349] via-[#f7e08b] to-[#e9c349] text-[#12140c] font-sans text-[11px] sm:text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.25em] sm:tracking-[0.3em] shadow-[0_0_25px_rgba(233,195,73,0.4)] hover:shadow-[0_0_35px_rgba(233,195,73,0.7)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer z-20"
          >
            <span>Open Invitation</span>
            <span className="text-[13px] sm:text-[14px] group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>

      <AmbientLayer dust={9} petals={3} />
    </section>
  );
}
