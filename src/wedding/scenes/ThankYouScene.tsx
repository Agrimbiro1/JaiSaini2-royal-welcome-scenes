import { useEffect, useRef } from "react";
import gsap from "gsap";
import { wedding } from "../data/wedding";
import { usePrefersReducedMotion } from "../engine/SceneProvider";
import { AmbientLayer, WarmGlow } from "../ui/Ambient";
import { Divider } from "../ui/Ornaments";
import { SkyLanterns3D } from "../ui/SkyLanterns3D";
import thankYouBg from "/assets/thankyou-night-palace.png";

export default function ThankYouScene() {
  const reduced = usePrefersReducedMotion();
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
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.0 },
        "-=0.5"
      );

    return () => {
      tl.kill();
    };
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="relative w-full h-full overflow-hidden bg-[#0d0f07] text-[#e3e3d5] font-sans select-none flex flex-col items-center justify-between py-8 px-4"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-0 transition-opacity duration-1000 overflow-hidden"
      >
        <img
          src={thankYouBg}
          alt="Starlit Royal Palace at Night"
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f07]/95 via-[#0d0f07]/50 to-[#0d0f07]/75" />
      </div>

      {/* Realistic 3D Sky Lanterns Simulation Canvas (Three.js) */}
      <SkyLanterns3D count={32} interactive={false} />

      <WarmGlow className="left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 opacity-50 pointer-events-none z-15" />

      {/* Main Content */}
      <div
        ref={contentRef}
        className="relative z-20 flex flex-col items-center text-center my-auto max-w-md px-6 py-8 rounded-2xl bg-[#0d0f07]/60 backdrop-blur-sm border border-[#e9c349]/30 shadow-2xl pointer-events-auto"
      >
        <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-[#e9c349] font-medium">
          Chapter Ten • The Story Continues
        </span>

        <h1 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl text-[#fef08a] font-light tracking-widest drop-shadow-md">
          THANK YOU
        </h1>

        <Divider className="mt-3 h-3 w-40 text-[#e9c349]" />

        <p className="mt-4 font-display text-base sm:text-lg italic leading-relaxed text-[#e3e3d5]/90">
          “{message}”
        </p>

        <p className="mt-6 font-script text-2xl sm:text-3xl text-[#fef08a]">
          {signOff},
        </p>

        <p className="mt-1 font-display text-xl sm:text-2xl tracking-[0.2em] text-[#e9c349] font-medium">
          {wedding.couple.groom.toUpperCase()} <span className="text-[#ffffff]">×</span> {wedding.couple.bride.toUpperCase()}
        </p>
      </div>

      <AmbientLayer dust={8} petals={3} />
    </section>
  );
}
