import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { wedding, type Blessing } from "../data/wedding";
import { useScene, usePrefersReducedMotion } from "../engine/SceneProvider";
import { PaperBlessingCard } from "../ui/PaperBlessingCard";
import { PaperForm } from "../ui/PaperForm";
import { ParchmentCard } from "../ui/ParchmentCard";
import { AmbientLayer, WarmGlow } from "../ui/Ambient";
import { Divider } from "../ui/Ornaments";
import blessingsBg from "/assets/blessings-background-wall.png";

export default function BlessingsScene() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const wallLayerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  // State array containing blessings (starts with 6)
  const [blessingsList, setBlessingsList] = useState<Blessing[]>(() => {
    const list = wedding.blessings;
    if (list.length >= 6) return list;
    return [
      ...list,
      { message: "May your journey together be filled with everlasting joy.", guestName: "Devraj Uncle" },
      { message: "Abundant blessings and warmth for your new royal chapter.", guestName: "Kavita Aunty" },
      { message: "Wishing you togetherness and happiness forever.", guestName: "Meera & Rajesh" },
    ];
  });

  const [selectedBlessing, setSelectedBlessing] = useState<Blessing | null>(null);
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);

  // GSAP Entrance Animation
  useEffect(() => {
    if (!rootRef.current || reduced) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Step 1: Reveal background wall
    tl.to(wallLayerRef.current, {
      opacity: 1,
      duration: 1.0,
      ease: "power1.inOut",
    })
      // Step 2: Heading slide down
      .fromTo(
        headingRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 },
        "-=0.4"
      )
      // Step 3: Left-side Form & Diya entrance
      .fromTo(
        leftColRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        "-=0.3"
      )
      // Step 4: Right-side Cards entrance
      .fromTo(
        rightColRef.current,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );

    return () => {
      tl.kill();
    };
  }, [reduced]);

  // Handle new blessing submission from left-side form
  const handleNewBlessing = (newBlessing: Blessing) => {
    setBlessingsList((prev) => [newBlessing, ...prev]);
  };

  return (
    <section
      ref={rootRef}
      className="relative w-full h-full overflow-hidden bg-[#0d0f07] text-[#e3e3d5] font-sans select-none flex flex-col items-center justify-between py-5 md:py-7 px-4 sm:px-6"
    >
      {/* ── Fixed Haveli Background Wall Environment ───────────── */}
      <div
        ref={wallLayerRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-0 transition-opacity duration-1000 overflow-hidden"
      >
        <img
          src={blessingsBg}
          alt="Haveli Wall at Night"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Subtle Ambient Night Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f07]/90 via-[#0d0f07]/45 to-[#0d0f07]/80" />
      </div>

      {/* Warm Ambient Glow Aura */}
      <WarmGlow className="left-1/3 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 opacity-40 pointer-events-none" />

      {/* ── Scene Header ──────────────────────────────────────── */}
      <div
        ref={headingRef}
        className="relative z-20 flex flex-col items-center text-center max-w-lg mb-2.5 md:mb-4"
      >
        <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#e9c349] font-medium">
          Chapter Ten • Guest Wishes
        </span>
        <h1 className="mt-0.5 font-display text-xl sm:text-2xl md:text-3xl text-[#fef08a] font-medium tracking-wide drop-shadow-md">
          Blessings for Our Journey
        </h1>
        <Divider className="mt-1 h-2 w-32 text-[#e9c349]/80" />
      </div>

      {/* ── Split Layout: Left (Form + Diya) | Right (6 Cards + View All) ── */}
      <div className="relative z-20 w-full max-w-6xl flex-1 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-4 lg:gap-8 overflow-y-auto lg:overflow-visible pb-16 lg:pb-0 scrollbar-none">
        {/* Left Column: Embedded Paper Blessing Form */}
        <div
          ref={leftColRef}
          className="w-full lg:w-[330px] xl:w-[360px] shrink-0 flex flex-col items-center justify-center"
        >
          {/* Embedded Paper Blessing Form */}
          <PaperForm onSubmit={handleNewBlessing} className="w-full" />
        </div>

        {/* Right Column: Global View All Bar + 6 Paper Blessing Cards Grid */}
        <div
          ref={rightColRef}
          className="w-full flex-1 flex flex-col gap-3"
        >
          {/* Header Bar with Global View All Button */}
          <div className="flex items-center justify-between px-1">
            <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-[#e9c349]">
              Guest Blessings ({blessingsList.length})
            </span>
            <button
              type="button"
              onClick={() => setIsViewAllOpen(true)}
              className="px-3.5 py-1.5 rounded bg-[#0d0f07]/80 border border-[#e9c349]/70 text-[#fef08a] font-sans text-[10px] uppercase tracking-[0.25em] font-semibold hover:border-[#fef08a] hover:shadow-[0_0_15px_rgba(233,195,73,0.4)] transition-all cursor-pointer backdrop-blur-md"
            >
              View All Blessings ✦
            </button>
          </div>

          {/* 6 Realistic Paper Blessing Cards Grid */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-h-[56vh] lg:max-h-none overflow-y-auto lg:overflow-visible pr-1 scrollbar-none">
            {blessingsList.slice(0, 6).map((bless, idx) => (
              <PaperBlessingCard
                key={idx}
                blessing={bless}
                onClick={() => setSelectedBlessing(bless)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Individual Card Inspection Modal ──────────────────── */}
      {selectedBlessing && (
        <div
          onClick={() => setSelectedBlessing(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d0f07]/85 backdrop-blur-md px-4 py-8 animate-in fade-in transition-all duration-300"
        >
          <div onClick={(e) => e.stopPropagation()}>
            <ParchmentCard
              message={selectedBlessing.message}
              guestName={selectedBlessing.guestName}
              onClose={() => setSelectedBlessing(null)}
            />
          </div>
        </div>
      )}

      {/* ── Global View All Blessings Modal ────────────────────── */}
      {isViewAllOpen && (
        <div
          onClick={() => setIsViewAllOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d0f07]/85 backdrop-blur-md px-4 py-8 animate-in fade-in transition-all duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[85vh] bg-gradient-to-b from-[#fefce8] via-[#fef9c3] to-[#fef08a] text-[#451a03] p-5 sm:p-7 rounded-[4px] border-2 border-[#e9c349] shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_30px_rgba(233,195,73,0.35)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 select-none"
          >
            {/* Paper Fiber Texture Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#b45309_0.5px,transparent_0.5px)] [background-size:10px_10px] opacity-[0.07] pointer-events-none" />

            {/* Filigree Corner Ornaments */}
            <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#b45309] rounded-tl-xs pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#b45309] rounded-tr-xs pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#b45309] rounded-bl-xs pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#b45309] rounded-br-xs pointer-events-none" />

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsViewAllOpen(false)}
              className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-[#451a03]/10 border border-[#b45309]/40 text-[#78350f] hover:text-[#451a03] hover:bg-[#451a03]/20 flex items-center justify-center text-xs cursor-pointer transition-colors"
              aria-label="Close wishbook"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="relative z-10 text-center pb-3.5 border-b border-[#b45309]/30">
              <span className="font-sans text-[10px] uppercase tracking-[0.3em] font-bold text-[#92400e]">
                Royal Wishbook
              </span>
              <h2 className="font-display text-xl sm:text-2xl font-semibold text-[#451a03] tracking-wide mt-0.5">
                All Guest Blessings ({blessingsList.length})
              </h2>
              <div className="w-16 h-[1.5px] bg-[#ca8a04] mx-auto mt-2 opacity-80" />
            </div>

            {/* Scrollable Grid of All Blessings */}
            <div className="relative z-10 mt-4 flex-1 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 gap-3.5 scrollbar-thin">
              {blessingsList.map((b, i) => (
                <div
                  key={i}
                  className="p-4 rounded-[3px] bg-[#fefce8] border border-[#ca8a04]/60 shadow-[0_4px_12px_rgba(0,0,0,0.08)] flex flex-col justify-between hover:border-[#b45309] transition-colors"
                >
                  <p className="font-display text-xs sm:text-sm italic leading-relaxed text-[#451a03] font-medium">
                    “{b.message}”
                  </p>
                  <div className="mt-3 pt-2 border-t border-[#b45309]/15 flex items-center justify-between">
                    <span className="text-[#ca8a04] text-[10px]">✦</span>
                    <p className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-[#92400e]">
                      — {b.guestName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <AmbientLayer dust={7} petals={2} />
    </section>
  );
}
