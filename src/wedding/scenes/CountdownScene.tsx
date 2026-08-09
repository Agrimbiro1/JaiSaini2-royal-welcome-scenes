import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { wedding } from "../data/wedding";
import { useScene, usePrefersReducedMotion } from "../engine/SceneProvider";
import { RoyalClock, type CountdownTime } from "../ui/RoyalClock";
import { AmbientLayer, WarmGlow } from "../ui/Ambient";
import countdownGardenBg from "/assets/countdown-garden-background.png";

function getRemainingTime(targetMs: number): CountdownTime {
  const diff = Math.max(0, targetMs - Date.now());
  return {
    over: diff === 0,
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function CountdownScene() {
  const { goNext } = useScene();
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const clockContainerRef = useRef<HTMLDivElement>(null);
  const goldenCircleRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const targetDateMs = new Date(wedding.countdown.date).getTime();
  const [time, setTime] = useState<CountdownTime>(() => getRemainingTime(targetDateMs));

  // Live 1-second ticker
  useEffect(() => {
    const interval = window.setInterval(() => {
      setTime(getRemainingTime(targetDateMs));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [targetDateMs]);

  // Entrance Animation Sequence
  useEffect(() => {
    if (!rootRef.current || reduced) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    // Step 1: Golden Circle convergence
    tl.fromTo(
      goldenCircleRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 0.9, duration: 0.9, ease: "back.out(1.7)" }
    )
      .to(goldenCircleRef.current, { scale: 2.2, opacity: 0, duration: 0.6 })

      // Step 2: Clock builds into position
      .fromTo(
        clockContainerRef.current,
        { y: 80, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" },
        "-=0.4"
      )

      // Step 3: Warm Spotlight illuminates clock
      .to(spotlightRef.current, { opacity: 0.7, duration: 1.0 }, "-=0.5");

    return () => {
      tl.kill();
    };
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="relative w-full h-full overflow-hidden bg-[#0d0f07] text-[#e3e3d5] font-sans select-none flex flex-col items-center justify-center"
    >
      {/* ── Breathtaking Royal Palace Garden Background Environment ── */}
      <img
        src={countdownGardenBg}
        alt="Royal Palace Garden Courtyard"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-85 scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0f07]/80 via-transparent to-[#0d0f07]/90" />

      {/* Brass Lamp Glow & Spotlights */}
      <div ref={spotlightRef} className="absolute inset-0 pointer-events-none opacity-0 transition-opacity">
        <WarmGlow className="left-1/2 top-[32%] h-80 w-80 -translate-x-1/2 opacity-70" />
      </div>

      {/* Entry Golden Convergence Circle */}
      <div
        ref={goldenCircleRef}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-2 border-[#fef08a] bg-gradient-to-r from-[#e9c349]/40 to-[#ca8a04]/40 shadow-[0_0_40px_rgba(233,195,73,0.8)] pointer-events-none opacity-0"
      />

      {/* ── Main Clock & Announcement Container ───────────────── */}
      <div
        ref={clockContainerRef}
        className="relative z-10 flex flex-col items-center justify-center px-4 pt-6 pb-20 max-h-full"
      >
        {/* The Royal Timekeeper Heirloom Clock */}
        <RoyalClock time={time} onTap={() => {}} />

        {/* Wedding Announcement & Date */}
        <div className="mt-5 text-center px-4">
          <p className="font-sans text-[10px] sm:text-[11px] md:text-[12px] uppercase tracking-[0.35em] text-[#e9c349] font-medium drop-shadow-sm">
            {time.over ? "Today We Celebrate Love" : "THE WAIT IS ALMOST OVER"}
          </p>

          <h2 className="mt-1 font-display text-xl sm:text-2xl md:text-3xl text-[#fef08a] font-light tracking-wide drop-shadow-md">
            {wedding.countdown.displayDate}
          </h2>

          <p className="mt-1 font-sans text-[11px] sm:text-[12px] text-[#e3e3d5]/80 italic">
            Muhurat • {wedding.couple.groom} & {wedding.couple.bride}’s Royal Wedding
          </p>
        </div>
      </div>

      <AmbientLayer dust={8} petals={time.over ? 6 : 2} />
    </section>
  );
}
