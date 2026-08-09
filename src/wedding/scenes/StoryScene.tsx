import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { wedding } from "../data/wedding";
import { usePrefersReducedMotion } from "../engine/SceneProvider";
import { AmbientLayer, WarmGlow } from "../ui/Ambient";
import { Divider } from "../ui/Ornaments";
import storyBg from "/assets/story-palace-scroll.png";

export default function StoryScene() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [activeIdx, setActiveIdx] = useState(0);
  const milestones = wedding.story;
  const current = milestones[activeIdx]!;

  useEffect(() => {
    if (!rootRef.current || reduced) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.to(bgRef.current, { opacity: 1, duration: 1.0 })
      .fromTo(
        scrollRef.current,
        { scale: 0.9, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 1.0, ease: "back.out(1.3)" },
        "-=0.4"
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
          src={storyBg}
          alt="Palace Gallery Hallway"
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f07]/90 via-[#0d0f07]/45 to-[#0d0f07]/80" />
      </div>

      <WarmGlow className="left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 opacity-40 pointer-events-none" />

      {/* Header */}
      <div className="relative z-20 flex flex-col items-center text-center mt-2">
        <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#e9c349] font-medium">
          Chapter Five • Our Journey
        </span>
        <h1 className="mt-1 font-display text-2xl sm:text-3xl text-[#fef08a] font-medium tracking-wide drop-shadow-md">
          A Story Written in Gold
        </h1>
        <Divider className="mt-2 h-2.5 w-36 text-[#e9c349]/80" />
      </div>

      {/* Royal Manuscript Scroll Card */}
      <div
        ref={scrollRef}
        className="relative z-20 w-full max-w-lg bg-gradient-to-b from-[#fefce8] via-[#fef9c3] to-[#fef08a] text-[#451a03] p-6 sm:p-8 rounded-[4px] border-2 border-[#e9c349] shadow-[0_22px_55px_rgba(0,0,0,0.85),0_0_25px_rgba(233,195,73,0.3)] flex flex-col items-center text-center my-4"
      >
        {/* Filigree Corner Accents */}
        <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#b45309] rounded-tl-xs pointer-events-none" />
        <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#b45309] rounded-tr-xs pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#b45309] rounded-bl-xs pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#b45309] rounded-br-xs pointer-events-none" />

        {/* Milestone Date Badge */}
        <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.3em] font-bold text-[#92400e]">
          {current.date}
        </span>

        {/* Title */}
        <h2 className="mt-1.5 font-display text-xl sm:text-2xl font-semibold text-[#451a03] tracking-wide">
          {current.title}
        </h2>

        {/* Divider */}
        <div className="w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#b45309] to-transparent my-3.5" />

        {/* Description */}
        <p className="font-display text-sm sm:text-base italic leading-relaxed text-[#451a03] max-w-sm">
          “{current.description}”
        </p>

        {/* Interactive Timeline Stepper */}
        <div className="mt-6 flex items-center justify-center gap-3">
          {milestones.map((m, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                idx === activeIdx
                  ? "bg-[#451a03] border-[#78350f] text-[#fef08a] shadow-md scale-105"
                  : "bg-[#fefce8] border-[#ca8a04]/50 text-[#78350f] hover:border-[#78350f]"
              }`}
            >
              <span className="text-[10px]">{idx === activeIdx ? "✦" : "•"}</span>
              <span className="font-sans text-[10px] uppercase tracking-wider font-semibold">
                {m.date}
              </span>
            </button>
          ))}
        </div>
      </div>

      <AmbientLayer dust={7} petals={2} />
    </section>
  );
}
