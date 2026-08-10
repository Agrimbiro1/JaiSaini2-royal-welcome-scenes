import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { wedding } from "../data/wedding";
import { usePrefersReducedMotion } from "../engine/SceneProvider";
import { AmbientLayer, WarmGlow } from "../ui/Ambient";
import { Divider } from "../ui/Ornaments";

import coupleBg from "/assets/couple-background.png";
import coupleFrame from "/assets/couple-frame.png";
import royalCouplePortrait from "/assets/royal-couple-portrait.png";

type Focus = "groom" | "bride" | "couple" | null;

export default function CoupleScene() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const centralFrameRef = useRef<HTMLDivElement>(null);
  const groomCardRef = useRef<HTMLDivElement>(null);
  const brideCardRef = useRef<HTMLDivElement>(null);

  const [focus, setFocus] = useState<Focus>(null);
  const { groom, bride } = wedding.couple;

  useEffect(() => {
    if (!rootRef.current || reduced) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.to(bgRef.current, { opacity: 1, duration: 1.0 })
      .fromTo(
        centralFrameRef.current,
        { scale: 0.85, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 1.0, ease: "back.out(1.3)" },
        "-=0.4"
      )
      .fromTo(
        groomCardRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7 },
        "-=0.5"
      )
      .fromTo(
        brideCardRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7 },
        "-=0.7"
      );

    return () => {
      tl.kill();
    };
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="relative w-full h-full min-h-screen overflow-hidden bg-[#0d0f07] text-[#e3e3d5] font-sans select-none flex flex-col items-center justify-between py-6 px-4 pb-20"
    >
      {/* Background Image: couple-background.png */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-0 transition-opacity duration-1000 overflow-hidden"
      >
        <img
          src={coupleBg}
          alt="Palace Courtyard Heritage Background"
          className="w-full h-full object-cover object-center scale-105 filter brightness-90 contrast-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2C0714]/90 via-[#2C0714]/40 to-[#2C0714]/75" />
      </div>

      <WarmGlow className="left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 opacity-40 pointer-events-none" />

      {/* Header */}
      <div className="relative z-20 flex flex-col items-center text-center mt-2">
        <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-[#EAD59A] font-semibold">
          Chapter Two • The Royal Pair
        </span>
        <h1 className="mt-1 font-['Cormorant_Garamond',serif] italic font-semibold text-3xl sm:text-4xl text-[#EAD59A] tracking-wide drop-shadow-md">
          {groom} <span className="text-[#CBA135]">×</span> {bride}
        </h1>
        <p className="mt-1 font-sans text-xs sm:text-sm text-[#d8c1af] max-w-md">
          Two souls bound by love, stepping into eternity together.
        </p>
        <Divider className="mt-2.5 h-2.5 w-36 text-[#CBA135]/80" />
      </div>

      {/* Main Center Portrait & Cards Layout */}
      <div className="relative z-20 w-full max-w-5xl flex-1 flex flex-col lg:flex-row items-center justify-center gap-6 my-auto">
        {/* Left Card: Groom Bio */}
        <div
          ref={groomCardRef}
          onClick={() => setFocus(focus === "groom" ? null : "groom")}
          className={`w-full max-w-xs p-5 rounded-2xl bg-[#FBF1DE]/15 backdrop-blur-md border border-[#EAD59A]/60 shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex flex-col items-center text-center transition-all duration-300 cursor-pointer ${
            focus === "bride" ? "opacity-40 scale-95" : focus === "groom" ? "scale-105 z-30 border-[#EAD59A]" : "hover:scale-102"
          }`}
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#4FA89B] font-bold">
            The Royal Groom
          </span>
          <h2 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl font-semibold text-[#EAD59A] mt-1 mb-1">
            {groom}
          </h2>
          <p className="font-['Cormorant_Garamond',serif] italic text-sm text-[#FBF1DE]/85 mb-3">
            Son of Rajesh & Sunita Sharma
          </p>
          <div className="w-10 h-[1px] bg-[#CBA135]/60 mb-3" />
          <p className="font-sans text-xs text-[#FBF1DE]/90 leading-relaxed">
            "With courage in his heart and devotion in his soul, stepping into a lifetime of endless joy with his beloved Ananya."
          </p>
        </div>

        {/* Center Main Frame with Fitted Generated Royal Couple Portrait */}
        <div
          ref={centralFrameRef}
          onClick={() => setFocus(focus === "couple" ? null : "couple")}
          className="relative flex flex-col items-center cursor-pointer transition-all duration-300 my-2"
        >
          {/* Ornate Hanging Wall Hook */}
          <div className="flex flex-col items-center mb-[-6px] z-20">
            <div className="w-4 h-4 rounded-full bg-gradient-to-b from-[#EAD59A] via-[#CBA135] to-[#430E1F] border border-[#EAD59A] shadow-md" />
            <div className="w-[2px] h-7 bg-gradient-to-b from-[#CBA135] to-[#430E1F]" />
          </div>

          {/* Central Royal Frame Box */}
          <div className="relative w-[290px] sm:w-[360px] md:w-[410px] aspect-[4/3] flex items-center justify-center">
            {/* Fitted Generated Couple Image placed behind the frame cutout */}
            <div className="absolute top-[14%] bottom-[14%] left-[14%] right-[14%] overflow-hidden rounded-md z-0 bg-[#2C0714] shadow-inner">
              <img
                src={royalCouplePortrait}
                alt={`${groom} and ${bride} Royal Portrait`}
                className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Royal Gold Frame Overlay */}
            <img
              src={coupleFrame}
              alt="Royal Gold Frame"
              className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)]"
            />
          </div>

          {/* Center Caption Badge */}
          <div className="mt-3 px-4 py-1.5 rounded-full bg-[#2C0714]/90 border border-[#EAD59A]/60 text-center backdrop-blur-md shadow-lg">
            <p className="font-['Cormorant_Garamond',serif] text-base text-[#EAD59A] font-semibold tracking-wider">
              {groom} & {bride}
            </p>
          </div>
        </div>

        {/* Right Card: Bride Bio */}
        <div
          ref={brideCardRef}
          onClick={() => setFocus(focus === "bride" ? null : "bride")}
          className={`w-full max-w-xs p-5 rounded-2xl bg-[#FBF1DE]/15 backdrop-blur-md border border-[#EAD59A]/60 shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex flex-col items-center text-center transition-all duration-300 cursor-pointer ${
            focus === "groom" ? "opacity-40 scale-95" : focus === "bride" ? "scale-105 z-30 border-[#EAD59A]" : "hover:scale-102"
          }`}
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#4FA89B] font-bold">
            The Royal Bride
          </span>
          <h2 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl font-semibold text-[#EAD59A] mt-1 mb-1">
            {bride}
          </h2>
          <p className="font-['Cormorant_Garamond',serif] italic text-sm text-[#FBF1DE]/85 mb-3">
            Daughter of Vikram & Kavita Sharma
          </p>
          <div className="w-10 h-[1px] bg-[#CBA135]/60 mb-3" />
          <p className="font-sans text-xs text-[#FBF1DE]/90 leading-relaxed">
            "With grace, poise, and eternal love, walking hand in hand with Rohan to weave their royal fairytale together."
          </p>
        </div>
      </div>

      <AmbientLayer dust={7} petals={2} />
    </section>
  );
}
