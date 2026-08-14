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
  const rohanRef = useRef<HTMLSpanElement>(null);
  const ampRef = useRef<HTMLSpanElement>(null);
  const ananyaRef = useRef<HTMLSpanElement>(null);
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

      // Phase 5: Reveal Title Container
      .to(handwritingTitleRef.current, { opacity: 1, duration: 0.3 });

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

    tl
      // Phase 6: Photo zooms smoothly to cover screen
      .to(
        heroFrameRef.current,
        {
          scale: () => getCoverageScale(),
          borderWidth: 0,
          padding: 0,
          duration: 1.6,
          ease: "expo.inOut",
          delay: 1.4,
        },
      )
      .to(handwritingTitleRef.current, { scale: 1.05, opacity: 0, duration: 0.8 }, "-=1.0")
      .to(whiteFlashRef.current, { opacity: 1, duration: 0.4 }, "-=0.4")
      .add(() => {
        setWelcomeRevealed(true);
        if (welcomeCardRef.current) {
          gsap.set(welcomeCardRef.current, { opacity: 1, scale: 1 });
        }
      })
      .to(whiteFlashRef.current, { opacity: 0, duration: 0.8 }, "+=0.1");

    return () => {
      tl.kill();
    };
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="relative w-full h-[100svh] max-h-[100svh] overflow-hidden bg-[#0d0f07] text-[#e3e3d5] font-sans select-none"
    >
      {/* Background Ornaments */}
      <JaaliPanel className="absolute inset-0 opacity-[0.07] pointer-events-none" />
      <WarmGlow className="absolute inset-0 pointer-events-none" />

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
        {/* Handwriting Title "Rohan & Ananya" Positioned Elegantly on Top of Centered Couple Frame */}
        <div
          ref={handwritingTitleRef}
          className="absolute bottom-[calc(50%+85px)] sm:bottom-[calc(50%+110px)] md:bottom-[calc(50%+140px)] inset-x-0 z-30 flex justify-center opacity-0 pointer-events-none px-4"
        >
          <div className="flex flex-col items-center select-none my-0 w-full max-w-xs sm:max-w-sm md:max-w-md overflow-visible">
            <span
              ref={rohanRef}
              className="font-script text-[42px] sm:text-[58px] md:text-[70px] lg:text-[78px] text-[#e9c349] tracking-wider self-start pl-3 sm:pl-6 pt-1 pb-0 leading-tight overflow-visible drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
            >
              Rohan
            </span>
            <span
              ref={ampRef}
              className="font-serif italic font-bold text-[22px] sm:text-[32px] md:text-[40px] text-[#FBF1DE] opacity-95 -my-2.5 sm:-my-4 md:-my-5 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
            >
              &
            </span>
            <span
              ref={ananyaRef}
              className="font-script text-[42px] sm:text-[58px] md:text-[70px] lg:text-[78px] text-[#e9c349] tracking-wider self-end pr-3 sm:pr-6 pt-1 pb-0 leading-tight overflow-visible drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
            >
              Ananya
            </span>
          </div>
        </div>

        {/* Vintage Reel Silhouette */}
        <div
          ref={filmReelRef}
          className="absolute w-[250px] h-[250px] sm:w-[340px] sm:h-[340px] md:w-[480px] md:h-[480px] opacity-0 scale-50 z-10 rounded-full border-[4px] sm:border-[6px] md:border-[10px] border-[#e9c349]/30 flex items-center justify-center shadow-[0_0_60px_rgba(233,195,73,0.15)] pointer-events-none"
        >
          <div className="absolute inset-0 border-2 sm:border-3 md:border-4 border-dashed border-[#e9c349]/40 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="w-7 h-7 sm:w-10 sm:h-10 md:w-20 md:h-20 bg-[#e9c349]/80 rounded-full shadow-[0_0_30px_rgba(233,195,73,0.5)]" />
        </div>

        {/* 6-Frame Film Strip */}
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden z-0">
          <div
            ref={filmStripRef}
            className="absolute flex gap-3 sm:gap-4 md:gap-10 items-center"
            id="filmStrip"
          >
            {reelFrames.map((frame) => {
              if (frame.hero) {
                return (
                  /* Frame 6 (Final Hero Frame - Couple Photo: Same size as other frames) */
                  <div
                    key={frame.id}
                    ref={heroFrameRef}
                    className="w-[280px] h-[186px] sm:w-[360px] sm:h-[240px] md:w-[500px] md:h-[333px] relative shrink-0 border-y-[5px] sm:border-y-[8px] md:border-y-[14px] border-x-[2px] sm:border-x-[3px] md:border-x-[5px] border-[#12140c] bg-[#12140c] p-1 sm:p-1.5 md:p-2.5 flex items-center justify-center overflow-hidden transition-all duration-1000 origin-center"
                    id="heroFrame"
                  >
                    <img
                      ref={heroImageRef}
                      src={frame.src}
                      alt={frame.alt}
                      className="w-full h-full object-cover filter grayscale opacity-70 transition-all duration-1000"
                    />
                    <div
                      ref={heroSpotlightRef}
                      className="absolute inset-0 bg-gradient-to-t from-[#0d0f07] via-transparent to-transparent opacity-0 pointer-events-none"
                    />
                  </div>
                );
              }

              return (
                /* Regular Film Frames 1 to 5 */
                <div
                  key={frame.id}
                  className="w-[280px] h-[186px] sm:w-[360px] sm:h-[240px] md:w-[500px] md:h-[333px] relative shrink-0 border-y-[5px] sm:border-y-[8px] md:border-y-[14px] border-x-[2px] sm:border-x-[3px] md:border-x-[5px] border-[#12140c] bg-[#12140c] p-1 sm:p-1.5 md:p-2.5 flex items-center justify-center"
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

        {/* Skip Button - Enlarged & Highly Clickable */}
        {!welcomeRevealed && (
          <button
            type="button"
            onClick={revealWelcomeCard}
            className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 text-[#FFFDF8] font-sans text-xs sm:text-[13px] uppercase tracking-[0.2em] font-bold hover:text-[#e9c349] transition-all cursor-pointer bg-[#1c1917]/90 hover:bg-[#1c1917] px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border-2 border-[#e9c349]/70 shadow-[0_6px_20px_rgba(0,0,0,0.85),0_0_15px_rgba(233,195,73,0.3)] hover:shadow-[0_0_22px_rgba(233,195,73,0.6)] backdrop-blur-md active:scale-95 flex items-center gap-1.5"
          >
            <span>Skip Intro</span>
            <span className="text-sm font-extrabold text-[#e9c349]">→</span>
          </button>
        )}
      </div>

      {/* ── STAGE 2: Welcome Page & Open Invitation Button ─────── */}
      <div
        ref={welcomeCardRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4 sm:px-6 pb-16 sm:pb-20 pt-4 sm:pt-8 opacity-0 scale-95 transition-all duration-700 overflow-y-auto"
      >
        {/* Full Cover Welcome Background Image (z-0) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src={welcomeBg}
            alt="Welcome Background"
            className="w-full h-full object-cover object-center scale-105"
          />
          {/* Elegant dark vignette overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f07]/90 via-[#0d0f07]/50 to-[#0d0f07]/70" />
        </div>

        {/* Falling Particles Layer (z-10): Peacock Feathers & Golden Petals */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          <PeacockFeathers active={welcomeRevealed} count={16} />
        </div>

        {/* ==================== CORNER WELCOME IMAGES LAYERED ON TOP (z-30) ==================== */}

        {/* Left Corner: Royal Rajasthani Welcome Man - LAYERED ON TOP OF CARD (z-30) */}
        <div className="absolute left-0 bottom-0 z-30 pointer-events-none max-w-[105px] sm:max-w-[200px] md:max-w-[320px] lg:max-w-[340px] max-h-[32vh] sm:max-h-[55vh] md:max-h-[65vh]">
          <img
            src={welcomeMan}
            alt="Royal Rajasthani Welcome Man"
            className="w-full h-auto object-contain object-left-bottom filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
          />
        </div>

        {/* Right Corner: Royal Rajasthani Welcome Woman - LAYERED ON TOP OF CARD (z-30) */}
        <div className="absolute right-0 bottom-0 z-30 pointer-events-none max-w-[105px] sm:max-w-[200px] md:max-w-[320px] lg:max-w-[340px] max-h-[32vh] sm:max-h-[55vh] md:max-h-[65vh]">
          <img
            src={welcomeWomen}
            alt="Royal Rajasthani Welcome Woman"
            className="w-full h-auto object-contain object-right-bottom filter drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]"
          />
        </div>

        {/* Foreground Content Layer (z-20): Couple Image, Text & Button */}
        <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-xl my-auto">
          {/* Royal Couple Frame (couple-frame.png) - Grand & Screen Covering */}
          <div className="relative w-[92%] sm:w-[86%] max-w-[19.5rem] sm:max-w-[24rem] md:max-w-[28rem] aspect-[4/3] flex items-center justify-center my-1.5 sm:my-2.5">
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
              className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10 filter drop-shadow-[0_8px_30px_rgba(233,195,73,0.5)]"
            />
          </div>

          {/* Guest Greeting */}
          <p className="mt-2.5 sm:mt-4 font-display text-xl sm:text-2xl md:text-3xl tracking-wide text-[#e3e3d5] text-center font-medium">
            Dear <span className="text-[#e9c349]">{guestName}</span>
          </p>
          <Divider className="mt-1.5 sm:mt-2 h-2.5 sm:h-3 w-28 sm:w-36 text-[#e9c349]/80" />

          <p className="mt-2 sm:mt-2.5 max-w-[19rem] sm:max-w-[22rem] md:max-w-[26rem] text-center font-display text-[13px] sm:text-base md:text-lg italic leading-snug sm:leading-relaxed text-[#e9c349]/95 px-2">
            “{quote}”
          </p>
          <p className="mt-1.5 sm:mt-2 max-w-[20rem] sm:max-w-[23rem] md:max-w-[27rem] text-center font-sans text-[0.8rem] sm:text-[0.85rem] md:text-[0.92rem] leading-relaxed text-[#e3e3d5]/85 px-2">
            {message}
          </p>

          {/* Open Invitation Button - Grand & Full Width */}
          <button
            type="button"
            onClick={goNext}
            className="mt-3.5 sm:mt-6 group relative inline-flex items-center justify-center gap-2.5 sm:gap-3 w-[82%] sm:w-auto max-w-xs px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#e9c349] via-[#f7e08b] to-[#e9c349] text-[#12140c] font-sans text-[11.5px] sm:text-[13px] font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] shadow-[0_0_30px_rgba(233,195,73,0.5)] hover:shadow-[0_0_40px_rgba(233,195,73,0.8)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer z-20"
          >
            <span>Open Invitation</span>
            <span className="text-[13px] sm:text-[15px] group-hover:translate-x-1 transition-transform font-bold">→</span>
          </button>
        </div>
      </div>

      <AmbientLayer dust={9} petals={8} />
    </section>
  );
}
