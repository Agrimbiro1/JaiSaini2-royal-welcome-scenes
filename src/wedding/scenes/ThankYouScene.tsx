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

      {/* Royal Thank You Card Container - Centered */}
      <div
        ref={contentRef}
        className="relative z-20 flex flex-col items-center text-center my-auto w-full max-w-md sm:max-w-lg px-5 sm:px-9 py-5 sm:py-9 rounded-2xl bg-gradient-to-b from-[#2E0715]/85 via-[#1E050E]/90 to-[#120207]/95 backdrop-blur-md border-2 border-[#CBA135]/80 shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_40px_rgba(203,161,53,0.35)] pointer-events-auto"
      >
        {/* Ornate Filigree Corner Accents */}
        <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#CBA135] rounded-tl-sm pointer-events-none opacity-85" />
        <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#CBA135] rounded-tr-sm pointer-events-none opacity-85" />
        <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#CBA135] rounded-bl-sm pointer-events-none opacity-85" />
        <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#CBA135] rounded-br-sm pointer-events-none opacity-85" />

        {/* Top Auspicious Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#CBA135]/15 border border-[#CBA135]/60 text-[#F8E7CD] text-[10.5px] font-['Cinzel',serif] tracking-[0.24em] uppercase font-bold shadow-[0_0_15px_rgba(203,161,53,0.25)] mb-2">
          <span>✦</span>
          <span>आभार एवं कृतज्ञता</span>
          <span>✦</span>
        </div>

        {/* Top Lotus Crest Ornament */}
        <div className="flex items-center justify-center gap-2 my-1 text-[#CBA135]">
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#CBA135]" />
          <span className="text-sm text-[#E2790E]">𑁍</span>
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#CBA135]" />
        </div>

        {/* Main Title: WITH HEARTFELT GRATITUDE */}
        <h1 className="font-['Cinzel',serif] text-2xl sm:text-3xl md:text-4xl text-[#FFFDF8] font-bold tracking-[0.14em] uppercase mt-1 leading-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
          WITH HEARTFELT GRATITUDE
        </h1>

        {/* Gold Leaf Divider */}
        <div className="flex items-center justify-center gap-1.5 my-2.5 text-[#CBA135] text-[10px] opacity-85">
          <span className="w-12 h-[1px] bg-[#CBA135]" />
          <span>❖</span>
          <span className="w-12 h-[1px] bg-[#CBA135]" />
        </div>

        {/* Emotional Message */}
        <p className="font-['Cormorant_Garamond',serif] text-base sm:text-lg italic font-medium leading-relaxed text-[#FBF1DE]/95 max-w-md px-2">
          “{message || "Your presence, prayers, and heartfelt blessings illuminate the beginning of our forever journey. Thank you for gracing our celebration with your love."}”
        </p>

        {/* Sign Off */}
        <div className="mt-5 flex flex-col items-center">
          <p className="font-['Cormorant_Garamond',serif] italic font-semibold text-lg sm:text-xl text-[#EAD59A] flex items-center gap-1.5">
            <span>{signOff || "With Love & Respect"}</span>
            <Heart className="w-3.5 h-3.5 fill-[#8C2338] text-[#8C2338] inline" />
          </p>

          {/* Couple Names: ROHAN & ANANYA */}
          <p className="font-['Cinzel',serif] text-xl sm:text-2xl md:text-3xl tracking-[0.16em] uppercase font-bold text-[#FFFDF8] mt-1.5 drop-shadow-[0_0_20px_rgba(203,161,53,0.4)]">
            ROHAN <span className="text-[#CBA135] font-serif font-normal">&</span> ANANYA
          </p>

          <p className="font-['Cinzel',serif] text-[9.5px] sm:text-[10.5px] tracking-[0.22em] text-[#CBA135] uppercase font-semibold mt-1 opacity-90">
            ✦ The Rathore & Shekhawat Families ✦
          </p>
        </div>

        {/* Interactive Action: Replay Invitation */}
        <div className="mt-6 pt-4 border-t border-[#CBA135]/25 w-full flex justify-center">
          <button
            type="button"
            onClick={() => goTo(0)}
            className="inline-flex items-center gap-2 font-['Cinzel',serif] text-[10.5px] font-bold uppercase tracking-[0.16em] text-[#3B0D1A] bg-gradient-to-r from-[#FDF3E3] to-[#E6CA85] hover:from-[#FFFDF8] hover:to-[#F5D899] px-5 py-2 rounded-full border border-[#CBA135] shadow-[0_4px_16px_rgba(0,0,0,0.5),0_0_12px_rgba(203,161,53,0.3)] hover:scale-103 active:scale-95 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#8C2338]" />
            Replay Invitation
          </button>
        </div>
      </div>

      <AmbientLayer dust={8} petals={0} />
    </section>
  );
}
