import { useRef, useState } from "react";
import gsap from "gsap";

export type CountdownTime = {
  over: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function RoyalClock({
  time,
  onTap,
  className = "",
}: {
  time: CountdownTime;
  onTap?: () => void;
  className?: string;
}) {
  const clockRef = useRef<HTMLDivElement>(null);
  const gear1Ref = useRef<SVGGElement>(null);
  const gear2Ref = useRef<SVGGElement>(null);
  const [isWinding, setIsWinding] = useState(false);

  // Clockwise rotation values
  const cwSeconds = (60 - (time.seconds % 60)) % 60;
  const cwMinutes = (60 - (time.minutes % 60)) % 60;
  const cwHours = (12 - (time.hours % 12)) % 12;

  // Handle interactive tap response
  const handleClick = () => {
    if (isWinding) return;
    setIsWinding(true);
    onTap?.();

    if (clockRef.current) {
      const tl = gsap.timeline({
        onComplete: () => setIsWinding(false),
      });

      tl.to(clockRef.current, {
        scale: 1.04,
        rotation: 1,
        duration: 0.25,
        ease: "power2.out",
      })
        .to(
          [gear1Ref.current, gear2Ref.current],
          {
            rotation: "+=180",
            duration: 0.5,
            ease: "back.out(1.7)",
          },
          0
        )
        .to(clockRef.current, {
          scale: 1,
          rotation: 0,
          duration: 0.45,
          ease: "elastic.out(1, 0.4)",
        });
    }
  };

  return (
    <div
      ref={clockRef}
      onClick={handleClick}
      className={`relative flex flex-col items-center select-none cursor-pointer group ${className}`}
    >
      {/* ── 1. RAJASTHANI JHAROKHA CROWN ─────────────────────── */}
      <div className="relative w-[220px] sm:w-[260px] md:w-[290px] h-[48px] sm:h-[56px] md:h-[64px] flex items-end justify-center z-20">
        {/* Crown Background Arch */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#451a03] via-[#78350f] to-[#291003] rounded-t-[50%] border-t-2 border-x-2 border-[#ca8a04]/70 shadow-[0_-6px_16px_rgba(0,0,0,0.6)]" />

        {/* Miniature Jharokha Crest & Gold Ornament */}
        <div className="absolute -top-3.5 w-9 h-9 rounded-full bg-gradient-to-b from-[#fef08a] via-[#ca8a04] to-[#78350f] border-2 border-[#fef08a] shadow-[0_2px_12px_rgba(233,195,73,0.6)] flex items-center justify-center">
          <div className="w-3.5 h-3.5 rounded-full bg-[#fef08a] animate-pulse" />
        </div>

        {/* Carved Gold Molding Line */}
        <div className="w-full h-3 bg-gradient-to-r from-[#78350f] via-[#fef08a] to-[#78350f] border-y border-[#ca8a04]/90 shadow-md" />
      </div>

      {/* ── 2. MAIN WALNUT CLOCK BODY (No Pendulum) ──────────── */}
      <div className="relative w-[210px] sm:w-[245px] md:w-[275px] bg-gradient-to-b from-[#291003] via-[#451a03] to-[#1c0a02] border-x-[6px] md:border-x-[8px] border-[#78350f] shadow-[0_25px_50px_rgba(0,0,0,0.9),inset_0_0_25px_rgba(0,0,0,0.9)] flex flex-col items-center px-3.5 pt-4 pb-5 z-10 rounded-b-sm">
        {/* Antique Corner Inlays */}
        <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#ca8a04] opacity-90" />
        <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#ca8a04] opacity-90" />
        <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#ca8a04] opacity-90" />
        <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#ca8a04] opacity-90" />

        {/* ── 3. CLOCK DIAL (Ivory & Antique Gold) ───────────── */}
        <div className="relative w-[165px] h-[165px] sm:w-[195px] sm:h-[195px] md:w-[220px] md:h-[220px] rounded-full bg-gradient-to-br from-[#ca8a04] via-[#fef08a] to-[#854d0e] p-1.5 shadow-[0_10px_25px_rgba(0,0,0,0.8),inset_0_2px_6px_rgba(255,255,255,0.5)]">
          {/* Inner Ivory Face */}
          <div className="relative w-full h-full rounded-full bg-gradient-to-br from-[#fefce8] via-[#fef9c3] to-[#fef08a] border-2 border-[#78350f] flex items-center justify-center shadow-[inset_0_0_18px_rgba(120,53,15,0.4)] overflow-hidden">
            {/* SVG Clock Markings & Dial Details */}
            <svg viewBox="0 0 200 200" className="w-full h-full text-[#451a03]">
              {/* Outer Minute Ring */}
              <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4" />
              <circle cx="100" cy="100" r="86" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.6" />

              {/* Roman Numerals */}
              <text x="100" y="32" textAnchor="middle" fontSize="17" fontFamily="serif" fontWeight="bold" fill="#3b1502">
                XII
              </text>
              <text x="172" y="106" textAnchor="middle" fontSize="16" fontFamily="serif" fontWeight="bold" fill="#3b1502">
                III
              </text>
              <text x="100" y="180" textAnchor="middle" fontSize="17" fontFamily="serif" fontWeight="bold" fill="#3b1502">
                VI
              </text>
              <text x="28" y="106" textAnchor="middle" fontSize="16" fontFamily="serif" fontWeight="bold" fill="#3b1502">
                IX
              </text>

              {/* Minute Ticks */}
              {Array.from({ length: 60 }, (_, i) => {
                const angle = i * 6;
                const isMajor = i % 5 === 0;
                return (
                  <line
                    key={i}
                    x1="100"
                    y1={isMajor ? "12" : "14"}
                    x2="100"
                    y2={isMajor ? "20" : "17"}
                    stroke="currentColor"
                    strokeWidth={isMajor ? "2" : "0.9"}
                    opacity={isMajor ? "0.85" : "0.45"}
                    transform={`rotate(${angle} 100 100)`}
                  />
                );
              })}

              {/* Rotating Internal Gears (visible behind center pivot) */}
              <g ref={gear1Ref} opacity="0.28" style={{ transformOrigin: "100px 100px", transform: `rotate(${cwSeconds * 6}deg)` }}>
                <circle cx="100" cy="100" r="30" stroke="#78350f" strokeWidth="2" strokeDasharray="4 3" fill="none" />
              </g>

              {/* Hour Hand (Clockwise) */}
              <line
                x1="100"
                y1="100"
                x2="100"
                y2="56"
                stroke="#3b1502"
                strokeWidth="3.5"
                strokeLinecap="round"
                style={{
                  transformOrigin: "100px 100px",
                  transform: `rotate(${(cwHours + cwMinutes / 60) * 30}deg)`,
                }}
              />

              {/* Minute Hand (Clockwise) */}
              <line
                x1="100"
                y1="100"
                x2="100"
                y2="38"
                stroke="#451a03"
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{
                  transformOrigin: "100px 100px",
                  transform: `rotate(${cwMinutes * 6}deg)`,
                }}
              />

              {/* Second Hand (Clockwise ticking every second) */}
              <line
                x1="100"
                y1="110"
                x2="100"
                y2="28"
                stroke="#b91c1c"
                strokeWidth="1.4"
                strokeLinecap="round"
                style={{
                  transformOrigin: "100px 100px",
                  transform: `rotate(${cwSeconds * 6}deg)`,
                  transition: "transform 0.15s cubic-bezier(0.4, 2.08, 0.55, 0.44)",
                }}
              />

              {/* Golden Center Pivot */}
              <circle cx="100" cy="100" r="5.5" fill="#ca8a04" stroke="#451a03" strokeWidth="1.5" />
              <circle cx="100" cy="100" r="2" fill="#fef08a" />
            </svg>
          </div>
        </div>

        {/* ── 4. MESMERIZING GLOWING COUNTDOWN DISPLAY ────────── */}
        <div className="mt-4 w-full bg-gradient-to-b from-[#1c0a02]/95 via-[#291003]/90 to-[#1c0a02]/95 border border-[#ca8a04]/70 rounded p-2.5 shadow-[inset_0_0_20px_rgba(0,0,0,0.9),0_6px_20px_rgba(0,0,0,0.7)] flex flex-col items-center">
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2 w-full items-center justify-items-center">
            {/* Days Ring */}
            <div className="flex flex-col items-center group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full bg-gradient-to-b from-[#451a03] to-[#1c0a02] border border-[#fef08a]/60 shadow-[0_0_12px_rgba(233,195,73,0.35)] flex items-center justify-center transition-transform group-hover:scale-105">
                <span className="font-display text-sm sm:text-base md:text-lg font-bold text-[#fef08a] tracking-tight tabular-nums drop-shadow-[0_2px_8px_rgba(254,240,138,0.7)]">
                  {String(time.days).padStart(2, "0")}
                </span>
              </div>
              <span className="mt-1 font-sans text-[7px] sm:text-[8px] uppercase tracking-[0.2em] font-semibold text-[#e9c349]">
                Days
              </span>
            </div>

            {/* Hours Ring */}
            <div className="flex flex-col items-center group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full bg-gradient-to-b from-[#451a03] to-[#1c0a02] border border-[#fef08a]/60 shadow-[0_0_12px_rgba(233,195,73,0.35)] flex items-center justify-center transition-transform group-hover:scale-105">
                <span className="font-display text-sm sm:text-base md:text-lg font-bold text-[#fef08a] tracking-tight tabular-nums drop-shadow-[0_2px_8px_rgba(254,240,138,0.7)]">
                  {String(time.hours).padStart(2, "0")}
                </span>
              </div>
              <span className="mt-1 font-sans text-[7px] sm:text-[8px] uppercase tracking-[0.2em] font-semibold text-[#e9c349]">
                Hours
              </span>
            </div>

            {/* Mins Ring */}
            <div className="flex flex-col items-center group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full bg-gradient-to-b from-[#451a03] to-[#1c0a02] border border-[#fef08a]/60 shadow-[0_0_12px_rgba(233,195,73,0.35)] flex items-center justify-center transition-transform group-hover:scale-105">
                <span className="font-display text-sm sm:text-base md:text-lg font-bold text-[#fef08a] tracking-tight tabular-nums drop-shadow-[0_2px_8px_rgba(254,240,138,0.7)]">
                  {String(time.minutes).padStart(2, "0")}
                </span>
              </div>
              <span className="mt-1 font-sans text-[7px] sm:text-[8px] uppercase tracking-[0.2em] font-semibold text-[#e9c349]">
                Mins
              </span>
            </div>

            {/* Secs Ring (Pulsing every second) */}
            <div className="flex flex-col items-center group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-13 md:h-13 rounded-full bg-gradient-to-b from-[#78350f] to-[#291003] border-2 border-[#fef08a] shadow-[0_0_18px_rgba(254,240,138,0.65)] flex items-center justify-center transition-transform animate-[pulse_1s_infinite_ease-in-out]">
                <span className="font-display text-sm sm:text-base md:text-lg font-bold text-[#ffffff] tracking-tight tabular-nums drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]">
                  {String(time.seconds).padStart(2, "0")}
                </span>
              </div>
              <span className="mt-1 font-sans text-[7px] sm:text-[8px] uppercase tracking-[0.2em] font-semibold text-[#fef08a]">
                Secs
              </span>
            </div>
          </div>
        </div>

        {/* ── 5. ENGRAVED INSCRIPTION PLAQUE ──────────────────── */}
        <div className="mt-2.5 px-3 py-1 bg-gradient-to-r from-[#78350f]/60 via-[#ca8a04]/40 to-[#78350f]/60 rounded border border-[#fef08a]/30 text-center shadow-inner">
          <p className="font-display text-[9px] sm:text-[10px] md:text-[11px] italic text-[#fef08a] tracking-wider">
            “Counting moments until forever.”
          </p>
        </div>
      </div>

      {/* ── BASE PEDESTAL ─────────────────────────────────────── */}
      <div className="w-[225px] sm:w-[260px] md:w-[290px] h-4 bg-gradient-to-r from-[#291003] via-[#78350f] to-[#291003] border-t border-[#ca8a04]/80 rounded-b shadow-[0_8px_18px_rgba(0,0,0,0.85)] z-20" />
    </div>
  );
}
