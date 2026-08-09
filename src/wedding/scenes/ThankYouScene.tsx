import { useEffect, useRef } from "react";
import gsap from "gsap";
import { wedding } from "../data/wedding";
import { usePrefersReducedMotion } from "../engine/SceneProvider";
import { AmbientLayer, WarmGlow } from "../ui/Ambient";
import { Divider } from "../ui/Ornaments";
import thankYouBg from "/assets/thankyou-night-palace.png";

export default function ThankYouScene() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lanternsRef = useRef<(HTMLDivElement | null)[]>([]);

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

    // Floating Sky Lanterns continuous animation
    lanternsRef.current.filter(Boolean).forEach((lantern, i) => {
      gsap.to(lantern, {
        y: "-15vh",
        x: (i % 2 === 0 ? 1 : -1) * 20,
        rotation: (i % 2 === 0 ? 3 : -3),
        duration: 4 + i * 1.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    });

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

      {/* Floating Royal Sky Lanterns (Kandils) */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        {[
          { left: "15%", top: "60%" },
          { left: "80%", top: "55%" },
          { left: "30%", top: "75%" },
          { left: "70%", top: "70%" },
        ].map((pos, i) => (
          <div
            key={i}
            ref={(el) => {
              lanternsRef.current[i] = el;
            }}
            style={{ left: pos.left, top: pos.top }}
            className="absolute flex flex-col items-center"
          >
            {/* Glowing Lantern Disc */}
            <div className="w-6 h-9 sm:w-8 sm:h-12 rounded-t-lg bg-gradient-to-b from-[#fef08a] via-[#f59e0b] to-[#ea580c] border border-[#fef08a] shadow-[0_0_25px_rgba(245,158,11,0.85)] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#ffffff] animate-pulse" />
            </div>
            {/* Lantern Tassel */}
            <div className="w-0.5 h-4 bg-[#fef08a]/70" />
          </div>
        ))}
      </div>

      <WarmGlow className="left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 opacity-50 pointer-events-none" />

      {/* Main Content */}
      <div
        ref={contentRef}
        className="relative z-20 flex flex-col items-center text-center my-auto max-w-md px-4"
      >
        <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#e9c349] font-medium">
          Chapter Eleven • The Story Continues
        </span>

        <h1 className="mt-2 font-display text-3xl sm:text-4xl md:text-5xl text-[#fef08a] font-light tracking-widest drop-shadow-md">
          THANK YOU
        </h1>

        <Divider className="mt-3 h-3 w-40 text-[#e9c349]" />

        <p className="mt-4 font-display text-base sm:text-lg italic leading-relaxed text-[#e3e3d5]/90">
          “{message}”
        </p>

        <p className="mt-6 font-script text-2xl text-[#fef08a]">
          {signOff},
        </p>

        <p className="mt-1 font-display text-xl tracking-[0.2em] text-[#e9c349] font-medium">
          {wedding.couple.groom.toUpperCase()} <span className="text-[#ffffff]">×</span> {wedding.couple.bride.toUpperCase()}
        </p>
      </div>

      <AmbientLayer dust={8} petals={3} />
    </section>
  );
}
