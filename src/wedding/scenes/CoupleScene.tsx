import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { wedding } from "../data/wedding";
import { usePrefersReducedMotion } from "../engine/SceneProvider";
import { AmbientLayer, WarmGlow } from "../ui/Ambient";
import { Divider } from "../ui/Ornaments";
import coupleBg from "/assets/couple-royal-courtyard.png";
import coupleFrame from "/assets/couple-frame.png";

type Focus = "groom" | "bride" | null;

export default function CoupleScene() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const groomCardRef = useRef<HTMLDivElement>(null);
  const brideCardRef = useRef<HTMLDivElement>(null);

  const [focus, setFocus] = useState<Focus>(null);
  const { groom, bride, portrait } = wedding.couple;

  useEffect(() => {
    if (!rootRef.current || reduced) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.to(bgRef.current, { opacity: 1, duration: 1.0 })
      .fromTo(
        groomCardRef.current,
        { y: -80, opacity: 0, rotation: -6 },
        { y: 0, opacity: 1, rotation: 0, duration: 0.8, ease: "back.out(1.4)" },
        "-=0.4"
      )
      .fromTo(
        brideCardRef.current,
        { y: -80, opacity: 0, rotation: 6 },
        { y: 0, opacity: 1, rotation: 0, duration: 0.8, ease: "back.out(1.4)" },
        "-=0.6"
      );

    return () => {
      tl.kill();
    };
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="relative w-full h-full overflow-hidden bg-[#0d0f07] text-[#e3e3d5] font-sans select-none flex flex-col items-center justify-between py-6 px-4"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-0 transition-opacity duration-1000 overflow-hidden"
      >
        <img
          src={coupleBg}
          alt="Royal Courtyard Balcony"
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f07]/90 via-[#0d0f07]/40 to-[#0d0f07]/75" />
      </div>

      <WarmGlow className="left-1/2 top-1/3 h-80 w-80 -translate-x-1/2 opacity-45 pointer-events-none" />

      {/* Header */}
      <div className="relative z-20 flex flex-col items-center text-center mt-2">
        <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#e9c349] font-medium">
          Chapter Two • The Royal Pair
        </span>
        <h1 className="mt-1 font-display text-2xl sm:text-3xl text-[#fef08a] font-medium tracking-wide drop-shadow-md">
          {groom} <span className="text-[#e9c349]">×</span> {bride}
        </h1>
        <Divider className="mt-2 h-2.5 w-36 text-[#e9c349]/80" />
      </div>

      {/* Main Couple Frames Container */}
      <div className="relative z-20 w-full max-w-4xl flex-1 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 my-4">
        {/* Groom Frame */}
        <div
          ref={groomCardRef}
          onClick={() => setFocus(focus === "groom" ? null : "groom")}
          className={`relative flex flex-col items-center cursor-pointer transition-all duration-300 ${
            focus === "bride" ? "opacity-50 scale-95" : focus === "groom" ? "scale-105 z-30" : "hover:scale-102"
          }`}
        >
          {/* Wall Hook */}
          <div className="flex flex-col items-center mb-[-4px]">
            <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-b from-[#fef08a] via-[#ca8a04] to-[#78350f] border border-[#fef08a]/80 shadow-md" />
            <div className="w-[1.5px] h-6 bg-gradient-to-b from-[#ca8a04] to-[#92400e]" />
          </div>

          <div className="relative w-[180px] sm:w-[220px] md:w-[260px] aspect-[4/3] flex items-center justify-center">
            <div className="absolute top-[16%] bottom-[16%] left-[16%] right-[16%] overflow-hidden rounded-[2px] z-0 bg-[#0d0f07]">
              <img
                src={portrait}
                alt={groom}
                className="w-full h-full object-cover object-[25%_25%]"
              />
            </div>
            <img
              src={coupleFrame}
              alt="Groom Frame"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10 filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
            />
          </div>

          <div className="mt-2 px-3 py-1 rounded bg-[#0d0f07]/85 border border-[#e9c349]/40 text-center backdrop-blur-md">
            <p className="font-display text-sm text-[#fef08a] font-semibold tracking-wider">{groom}</p>
            <p className="font-sans text-[8px] uppercase tracking-[0.25em] text-[#e9c349]">The Royal Groom</p>
          </div>
        </div>

        {/* Center Seal Badge */}
        <div className="hidden sm:flex flex-col items-center z-20">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#fef08a] via-[#ca8a04] to-[#78350f] border-2 border-[#fef08a] shadow-[0_0_20px_rgba(233,195,73,0.5)] flex items-center justify-center">
            <span className="font-display text-xs font-bold text-[#451a03]">✦</span>
          </div>
        </div>

        {/* Bride Frame */}
        <div
          ref={brideCardRef}
          onClick={() => setFocus(focus === "bride" ? null : "bride")}
          className={`relative flex flex-col items-center cursor-pointer transition-all duration-300 ${
            focus === "groom" ? "opacity-50 scale-95" : focus === "bride" ? "scale-105 z-30" : "hover:scale-102"
          }`}
        >
          {/* Wall Hook */}
          <div className="flex flex-col items-center mb-[-4px]">
            <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-b from-[#fef08a] via-[#ca8a04] to-[#78350f] border border-[#fef08a]/80 shadow-md" />
            <div className="w-[1.5px] h-6 bg-gradient-to-b from-[#ca8a04] to-[#92400e]" />
          </div>

          <div className="relative w-[180px] sm:w-[220px] md:w-[260px] aspect-[4/3] flex items-center justify-center">
            <div className="absolute top-[16%] bottom-[16%] left-[16%] right-[16%] overflow-hidden rounded-[2px] z-0 bg-[#0d0f07]">
              <img
                src={portrait}
                alt={bride}
                className="w-full h-full object-cover object-[75%_25%]"
              />
            </div>
            <img
              src={coupleFrame}
              alt="Bride Frame"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10 filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)]"
            />
          </div>

          <div className="mt-2 px-3 py-1 rounded bg-[#0d0f07]/85 border border-[#e9c349]/40 text-center backdrop-blur-md">
            <p className="font-display text-sm text-[#fef08a] font-semibold tracking-wider">{bride}</p>
            <p className="font-sans text-[8px] uppercase tracking-[0.25em] text-[#e9c349]">The Royal Bride</p>
          </div>
        </div>
      </div>

      <AmbientLayer dust={7} petals={2} />
    </section>
  );
}
