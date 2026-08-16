import { useEffect, useRef } from "react";
import gsap from "gsap";
import { wedding } from "../data/wedding";
import { usePrefersReducedMotion, useScene } from "../engine/SceneProvider";
import { AmbientLayer, WarmGlow } from "../ui/Ambient";
import { Divider } from "../ui/Ornaments";
import { SkyLanterns3D } from "../ui/SkyLanterns3D";
import thankYouBg from "/assets/thankyou-night-palace.png";
import { Heart, RotateCcw } from "lucide-react";

export default function ThankYouScene() {
  const reduced = usePrefersReducedMotion();
  const { goTo } = useScene();
  const rootRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { message, signOff } = wedding.thankYou;

  useEffect(() => {
    if (!rootRef.current || reduced) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.to(bgRef.current, { opacity: 1, duration: 1.2 })
      .fromTo(
        contentRef.current,
        { y: 35, opacity: 0, scale: 0.96 },
        { y: 0, opacity: 1, scale: 1, duration: 1.0 },
        "-=0.4"
      );

    return () => {
      tl.kill();
    };
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="relative w-full h-[100svh] min-h-[100svh] max-h-[100svh] overflow-hidden bg-[#0a0205] text-[#FBF1DE] font-sans select-none flex flex-col items-center justify-center pt-2 pb-20 sm:pb-8 px-3 sm:px-4"
    >
      {/* Background Image Layer */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-0 transition-opacity duration-1000 overflow-hidden"
      >
        <img
          src={thankYouBg}
          alt="Starlit Royal Palace at Night"
          className="w-full h-full object-cover object-center scale-105 opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0205]/95 via-[#0a0205]/60 to-[#0a0205]/75" />
      </div>

      {/* Realistic 3D Sky Lanterns Simulation Canvas */}
      <SkyLanterns3D count={36} interactive={false} />

      {/* Ambient Warm Glow */}
      <WarmGlow className="left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 opacity-40 pointer-events-none z-15" />

      {/* Royal Thank You Card Container - Tall Vertical Silhouette */}
      <div
        ref={contentRef}
        className="relative z-20 flex flex-col items-center justify-between text-center my-auto w-[min(92vw,360px)] sm:w-[400px] md:w-[430px] min-h-[500px] sm:min-h-[570px] md:min-h-[620px] max-h-[calc(100svh-90px)] py-7 sm:py-10 md:py-11 px-5 sm:px-8 md:px-9 select-none pointer-events-auto transition-transform"
      >
        {/* Card Background: Royal Ivory Frosted Silk Glass with Gold Rim Glow */}
        <div className="absolute inset-0 rounded-[28px] sm:rounded-[36px] bg-gradient-to-b from-[#FFFDF7]/96 via-[#FAF2E1]/94 to-[#F5E6CA]/96 backdrop-blur-2xl border-[1.5px] sm:border-2 border-[#D4AF37]/90 shadow-[0_30px_80px_rgba(0,0,0,0.9),0_0_45px_rgba(203,161,53,0.35),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_0_24px_rgba(203,161,53,0.12)] pointer-events-none" />

        {/* Subtle Silk / Parchment Micro-Texture Overlay */}
        <div className="absolute inset-2 sm:inset-3 rounded-[22px] sm:rounded-[30px] bg-[radial-gradient(#8C2338_0.4px,transparent_0.4px)] [background-size:12px_12px] opacity-[0.035] pointer-events-none" />

        {/* Inner Double Hairline Gold Border with Inward Scalloped Corners */}
        <div className="absolute inset-3 sm:inset-4.5 rounded-[18px] sm:rounded-[26px] border border-[#CBA135]/60 pointer-events-none">
          {/* 4 Corner Ornate Brackets */}
          <div className="absolute -top-[1px] -left-[1px] w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-[#8C2338] rounded-tl-[10px] sm:rounded-tl-[14px]">
            <span className="absolute -top-1 -left-1 text-[8px] sm:text-[10px] text-[#CBA135] font-serif">✦</span>
          </div>
          <div className="absolute -top-[1px] -right-[1px] w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-r-2 border-[#8C2338] rounded-tr-[10px] sm:rounded-tr-[14px]">
            <span className="absolute -top-1 -right-1 text-[8px] sm:text-[10px] text-[#CBA135] font-serif">✦</span>
          </div>
          <div className="absolute -bottom-[1px] -left-[1px] w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-l-2 border-[#8C2338] rounded-bl-[10px] sm:rounded-bl-[14px]">
            <span className="absolute -bottom-1 -left-1 text-[8px] sm:text-[10px] text-[#CBA135] font-serif">✦</span>
          </div>
          <div className="absolute -bottom-[1px] -right-[1px] w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-[#8C2338] rounded-br-[10px] sm:rounded-br-[14px]">
            <span className="absolute -bottom-1 -right-1 text-[8px] sm:text-[10px] text-[#CBA135] font-serif">✦</span>
          </div>
        </div>

        {/* ── Content Elements Inside the Card ── */}
        <div className="relative z-10 flex flex-col items-center justify-between w-full h-full my-auto">
          {/* Top Header Group */}
          <div className="flex flex-col items-center">
            {/* Top Royal Sanskrit Pill Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-[#430E1F] via-[#6E1B34] to-[#430E1F] border border-[#CBA135] text-[#F5D77F] text-[9.5px] sm:text-[11px] font-['Cinzel',serif] tracking-[0.22em] uppercase font-bold shadow-[0_4px_12px_rgba(67,14,31,0.4)] mb-1">
              <span>✦</span>
              <span>आभार एवं कृतज्ञता</span>
              <span>✦</span>
            </div>

            {/* Regal Lotus Crest with Ruby Center */}
            <div className="flex items-center justify-center gap-2 my-1 text-[#8C2338]">
              <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-[#CBA135]" />
              <span className="text-xs sm:text-sm text-[#8C2338] drop-shadow-sm">𑁍</span>
              <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-[#CBA135]" />
            </div>

            {/* Main Title: WITH HEARTFELT GRATITUDE */}
            <h1 className="font-['Cinzel',serif] text-lg sm:text-2xl md:text-[26px] text-[#330814] font-bold tracking-[0.14em] uppercase mt-1 sm:mt-1.5 leading-tight drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]">
              WITH HEARTFELT GRATITUDE
            </h1>

            {/* Gold Filigree Divider */}
            <div className="flex items-center justify-center gap-2 my-2 sm:my-2.5 text-[#CBA135] text-[10px] opacity-90">
              <span className="w-12 sm:w-16 h-[1.5px] bg-gradient-to-r from-transparent via-[#CBA135] to-[#8C2338]" />
              <span className="text-xs text-[#8C2338]">❖</span>
              <span className="w-12 sm:w-16 h-[1.5px] bg-gradient-to-l from-transparent via-[#CBA135] to-[#8C2338]" />
            </div>
          </div>

          {/* Emotional Gratitude Message */}
          <div className="my-2 sm:my-4 px-1 sm:px-2">
            <p className="font-['Cormorant_Garamond',serif] text-sm sm:text-base md:text-[17px] italic font-medium leading-relaxed text-[#4A1523]">
              “{message || "Your presence, prayers, and heartfelt blessings illuminate the beginning of our forever journey. Thank you for gracing our celebration with your love."}”
            </p>
          </div>

          {/* Sign Off & Family Section */}
          <div className="flex flex-col items-center my-1 sm:my-2">
            <p className="font-['Cormorant_Garamond',serif] italic font-semibold text-base sm:text-lg md:text-xl text-[#8C2338] flex items-center gap-1.5">
              <span>{signOff || "With Eternal Love & Respect"}</span>
              <Heart className="w-3.5 h-3.5 fill-[#8C2338] text-[#8C2338] inline drop-shadow-sm" />
            </p>

            {/* Couple Names: ROHAN & ANANYA */}
            <p className="font-['Cinzel',serif] text-xl sm:text-2xl md:text-3xl tracking-[0.16em] uppercase font-bold text-[#330814] mt-1 drop-shadow-sm">
              ROHAN <span className="text-[#CBA135] font-serif font-normal">&</span> ANANYA
            </p>

            <p className="font-['Cinzel',serif] text-[9.5px] sm:text-[11px] tracking-[0.22em] text-[#8C2338] uppercase font-semibold mt-1 opacity-90">
              ✦ The Rathore & Shekhawat Families ✦
            </p>
          </div>

          {/* Interactive Action: Replay Invitation Button */}
          <div className="mt-3 sm:mt-5 pt-3 sm:pt-4 border-t border-[#CBA135]/35 w-full flex justify-center">
            <button
              type="button"
              onClick={() => goTo(0)}
              className="inline-flex items-center gap-2 font-['Cinzel',serif] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#FFFDF8] bg-gradient-to-r from-[#430E1F] via-[#6E1B34] to-[#2C0714] hover:from-[#5C142B] hover:to-[#430E1F] px-6 sm:px-8 py-2 sm:py-2.5 rounded-full border border-[#CBA135] shadow-[0_6px_20px_rgba(67,14,31,0.45),0_0_15px_rgba(203,161,53,0.35)] hover:shadow-[0_8px_25px_rgba(203,161,53,0.55)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#F5D77F]" />
              <span>Replay Invitation</span>
            </button>
          </div>
        </div>
      </div>

      <AmbientLayer dust={8} petals={0} />
    </section>
  );
}
