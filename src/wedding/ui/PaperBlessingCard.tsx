import React from "react";
import type { Blessing } from "../data/wedding";

export function BottomLeftDiya({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Radial Warm Glow Cast across Bottom-Left of Card */}
      <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-gradient-to-tr from-[#f59e0b]/60 via-[#fef08a]/40 to-transparent blur-xl pointer-events-none animate-[pulse_2.5s_infinite_ease-in-out]" />

      {/* Realistic Mini Flame */}
      <svg
        viewBox="0 0 30 50"
        className="absolute -top-5 left-2 w-4.5 h-7 text-[#fef08a] overflow-visible pointer-events-none animate-[flicker_2.2s_infinite_ease-in-out]"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M 15 2 C 7 18 4 30 9 40 C 12 47 20 47 23 40 C 27 30 25 18 15 2 Z"
          fill="url(#miniFlameGradPro)"
          filter="drop-shadow(0 0 8px rgba(245,158,11,0.95))"
        />
        <ellipse cx="15" cy="36" rx="2" ry="4" fill="#ffffff" />
        <defs>
          <radialGradient id="miniFlameGradPro" cx="50%" cy="80%" r="60%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="35%" stopColor="#fef08a" />
            <stop offset="75%" stopColor="#ea580c" />
            <stop offset="100%" stopColor="#b91c1c" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>

      {/* Mini Brass Diya Body */}
      <svg
        viewBox="0 0 80 50"
        className="w-9 h-5.5 text-[#b45309] filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M 10 15 C 5 35 25 45 40 45 C 55 45 75 35 70 15 C 58 22 48 24 40 24 C 32 24 22 22 10 15 Z"
          fill="url(#miniBrassGradPro)"
          stroke="#78350f"
          strokeWidth="1.2"
        />
        <ellipse cx="40" cy="18" rx="28" ry="6" fill="#451a03" />
        <defs>
          <linearGradient id="miniBrassGradPro" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="35%" stopColor="#d97706" />
            <stop offset="70%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

export function PaperBlessingCard({
  blessing,
  onClick,
  className = "",
}: {
  blessing: Blessing;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      onClick={onClick}
      className={`relative group bg-gradient-to-b from-[#fefce8] via-[#fef9c3] to-[#fef08a] text-[#451a03] p-4.5 sm:p-5 rounded-[4px] border-2 border-[#e9c349]/90 shadow-[0_12px_28px_rgba(0,0,0,0.7),inset_0_0_15px_rgba(180,83,9,0.12)] flex flex-col justify-between overflow-hidden select-none transition-all duration-300 hover:-translate-y-1 hover:scale-[1.015] hover:shadow-[0_18px_40px_rgba(0,0,0,0.85),0_0_25px_rgba(233,195,73,0.35)] active:scale-95 cursor-pointer ${className}`}
    >
      {/* Paper Fiber Texture Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#b45309_0.5px,transparent_0.5px)] [background-size:10px_10px] opacity-[0.07] pointer-events-none" />

      {/* Gold Foil Shimmer Line on Hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none z-30" />

      {/* Bottom-Left Corner Diya with Warm Glow */}
      <div className="absolute bottom-2.5 left-2.5 z-20 pointer-events-none">
        <BottomLeftDiya />
      </div>

      {/* Handcrafted Filigree Corner Ornaments */}
      <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#b45309]/70 rounded-tl-xs pointer-events-none" />
      <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#b45309]/70 rounded-tr-xs pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#b45309]/70 rounded-br-xs pointer-events-none" />

      {/* Card Content */}
      <div className="relative z-10 pl-10 pb-1.5 pt-0.5">
        {/* Guest Name */}
        <div className="flex items-center gap-1.5">
          <span className="text-[#ca8a04] text-xs">✦</span>
          <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-bold text-[#92400e] drop-shadow-xs">
            {blessing.guestName}
          </p>
        </div>

        {/* Message Snippet */}
        <p className="mt-2 font-display text-xs sm:text-sm italic leading-relaxed text-[#451a03] line-clamp-4 font-medium tracking-wide">
          “{blessing.message}”
        </p>
      </div>
    </div>
  );
}
