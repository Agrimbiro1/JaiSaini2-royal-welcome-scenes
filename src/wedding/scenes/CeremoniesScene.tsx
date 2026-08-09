import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { wedding } from "../data/wedding";
import { usePrefersReducedMotion } from "../engine/SceneProvider";
import { AmbientLayer, WarmGlow } from "../ui/Ambient";
import { Divider } from "../ui/Ornaments";
import ceremoniesBg from "/assets/ceremonies-palace-courtyard.png";

// Vector icons for each ceremony type
const ceremonyIcons: Record<string, string> = {
  haldi: "🌼",
  mehendi: "🌿",
  sangeet: "🪕",
  wedding: "👑",
  reception: "✨",
};

export default function CeremoniesScene() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [activeId, setActiveId] = useState(wedding.ceremonies[0]?.id ?? "");
  const active = wedding.ceremonies.find((c) => c.id === activeId);

  useEffect(() => {
    if (!rootRef.current || reduced) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.to(bgRef.current, { opacity: 1, duration: 1.0 }).fromTo(
      cardRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
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
          src={ceremoniesBg}
          alt="Palace Ceremonies Courtyard"
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f07]/90 via-[#0d0f07]/45 to-[#0d0f07]/80" />
      </div>

      <WarmGlow className="left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 opacity-40 pointer-events-none" />

      {/* Header */}
      <div className="relative z-20 flex flex-col items-center text-center mt-2">
        <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#e9c349] font-medium">
          Chapter Eight • The Royal Celebration
        </span>
        <h1 className="mt-1 font-display text-2xl sm:text-3xl text-[#fef08a] font-medium tracking-wide drop-shadow-md">
          Wedding Ceremonies
        </h1>
        <Divider className="mt-2 h-2.5 w-36 text-[#e9c349]/80" />
      </div>

      {/* Ceremony Selection Tabs */}
      <div className="relative z-20 flex flex-wrap justify-center gap-2 my-2 max-w-xl">
        {wedding.ceremonies.map((c) => {
          const isActive = c.id === activeId;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveId(c.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-[#e9c349] border-[#fef08a] text-[#451a03] shadow-[0_0_15px_rgba(233,195,73,0.5)] scale-105"
                  : "bg-[#0d0f07]/80 border-[#e9c349]/40 text-[#e3e3d5] hover:border-[#fef08a]"
              }`}
            >
              <span>{ceremonyIcons[c.id] || "✦"}</span>
              <span>{c.name}</span>
            </button>
          );
        })}
      </div>

      {/* Active Ceremony Card */}
      {active && (
        <div
          ref={cardRef}
          className="relative z-20 w-full max-w-md bg-gradient-to-b from-[#fefce8] via-[#fef9c3] to-[#fef08a] text-[#451a03] p-6 sm:p-7 rounded-[4px] border-2 border-[#e9c349] shadow-[0_22px_55px_rgba(0,0,0,0.85),0_0_25px_rgba(233,195,73,0.3)] flex flex-col items-center text-center my-3"
        >
          {/* Filigree Corner Accents */}
          <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#b45309] rounded-tl-xs pointer-events-none" />
          <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#b45309] rounded-tr-xs pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#b45309] rounded-bl-xs pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#b45309] rounded-br-xs pointer-events-none" />

          {/* Ceremony Icon & Name */}
          <div className="w-12 h-12 rounded-full bg-[#451a03] text-[#fef08a] text-xl flex items-center justify-center border border-[#e9c349] shadow-md mb-2">
            {ceremonyIcons[active.id] || "✦"}
          </div>

          <h2 className="font-display text-xl sm:text-2xl font-bold text-[#451a03] tracking-wide">
            {active.name}
          </h2>

          <div className="w-16 h-[1.5px] bg-[#b45309] mx-auto my-3 opacity-80" />

          {/* Date, Time & Venue */}
          <div className="space-y-1.5 font-sans text-xs sm:text-sm text-[#451a03]">
            {active.date && (
              <p className="font-semibold text-[#92400e] tracking-wider uppercase">
                {active.date} • {active.time}
              </p>
            )}
            {active.venue && <p className="font-medium">{active.venue}</p>}
            {active.dressCode && (
              <p className="text-[11px] italic text-[#b45309] mt-2">
                Dress Code: {active.dressCode}
              </p>
            )}
          </div>

          {/* Map Directions CTA */}
          {active.mapUrl && (
            <a
              href={active.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded bg-[#451a03] text-[#fef08a] font-sans text-[10px] uppercase tracking-[0.25em] font-bold shadow-md hover:bg-[#78350f] transition-colors"
            >
              <span>Get Directions</span>
              <span>📍</span>
            </a>
          )}
        </div>
      )}

      <AmbientLayer dust={7} petals={2} />
    </section>
  );
}
