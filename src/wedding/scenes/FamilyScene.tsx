import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { wedding } from "../data/wedding";
import { usePrefersReducedMotion } from "../engine/SceneProvider";
import { AmbientLayer, WarmGlow } from "../ui/Ambient";
import { Divider } from "../ui/Ornaments";
import familyBg from "/assets/family-tree-background.png";

export default function FamilyScene() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const treeContainerRef = useRef<HTMLDivElement>(null);

  const [focus, setFocus] = useState<string | null>(null);
  const groomSide = wedding.family.filter((m) => m.side === "groom");
  const brideSide = wedding.family.filter((m) => m.side === "bride");

  useEffect(() => {
    if (!rootRef.current || reduced) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.to(bgRef.current, { opacity: 1, duration: 1.0 })
      .fromTo(
        treeContainerRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.0, ease: "power2.out" },
        "-=0.4"
      );

    return () => {
      tl.kill();
    };
  }, [reduced]);

  const MemberMedallion = ({ name, relation }: { name: string; relation: string }) => {
    const isDimmed = focus !== null && focus !== name;
    return (
      <button
        type="button"
        onClick={() => setFocus(focus === name ? null : name)}
        className={`group relative flex flex-col items-center cursor-pointer transition-all duration-300 ${
          isDimmed ? "opacity-45 scale-95" : focus === name ? "scale-110 z-30" : "hover:scale-105"
        }`}
      >
        {/* Ornate Gold Medallion Frame */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#fef08a] via-[#ca8a04] to-[#78350f] p-1 shadow-[0_8px_20px_rgba(0,0,0,0.7)]">
          <div className="w-full h-full rounded-full bg-gradient-to-b from-[#291003] to-[#1c0a02] border border-[#fef08a]/60 flex items-center justify-center overflow-hidden">
            <span className="font-display text-lg sm:text-xl font-bold text-[#fef08a]">
              {name[0]}
            </span>
          </div>
        </div>

        {/* Name & Relation Badge */}
        <div className="mt-2 px-3 py-1 rounded bg-[#0d0f07]/85 border border-[#e9c349]/40 text-center backdrop-blur-md">
          <p className="font-display text-xs sm:text-sm text-[#fef08a] font-medium">{name}</p>
          <p className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#e9c349]">{relation}</p>
        </div>
      </button>
    );
  };

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
          src={familyBg}
          alt="Royal Family Courtyard"
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f07]/90 via-[#0d0f07]/45 to-[#0d0f07]/80" />
      </div>

      <WarmGlow className="left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 opacity-40 pointer-events-none" />

      {/* Header */}
      <div className="relative z-20 flex flex-col items-center text-center mt-2">
        <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#e9c349] font-medium">
          Chapter Six • Family Heritage
        </span>
        <h1 className="mt-1 font-display text-2xl sm:text-3xl text-[#fef08a] font-medium tracking-wide drop-shadow-md">
          Two Families, One Beginning
        </h1>
        <Divider className="mt-2 h-2.5 w-36 text-[#e9c349]/80" />
      </div>

      {/* Main Family Tree Layout */}
      <div
        ref={treeContainerRef}
        className="relative z-20 w-full max-w-2xl flex-1 flex flex-col items-center justify-center gap-6 my-2"
      >
        {/* Groom Family Side (Top Row) */}
        <div className="flex items-center justify-center gap-8 sm:gap-14">
          {groomSide.map((m) => (
            <MemberMedallion key={m.name} name={m.name} relation={m.relation} />
          ))}
        </div>

        {/* Central Golden Couple Connector Seal */}
        <div className="relative flex flex-col items-center my-1">
          <div className="px-5 py-2 rounded-full bg-[#0d0f07]/90 border-2 border-[#e9c349] shadow-[0_0_25px_rgba(233,195,73,0.4)] backdrop-blur-md text-center">
            <span className="font-display text-sm sm:text-base text-[#fef08a] font-semibold tracking-wider">
              {wedding.couple.groom.toUpperCase()} <span className="text-[#e9c349]">×</span> {wedding.couple.bride.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Bride Family Side (Bottom Row) */}
        <div className="flex items-center justify-center gap-8 sm:gap-14">
          {brideSide.map((m) => (
            <MemberMedallion key={m.name} name={m.name} relation={m.relation} />
          ))}
        </div>
      </div>

      <AmbientLayer dust={7} petals={2} />
    </section>
  );
}
