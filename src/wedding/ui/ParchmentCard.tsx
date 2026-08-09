import React from "react";

export function ParchmentCard({
  message,
  guestName,
  onClose,
  className = "",
}: {
  message: string;
  guestName: string;
  onClose: () => void;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full max-w-sm sm:max-w-md bg-gradient-to-b from-[#fefce8] via-[#fef9c3] to-[#fef08a] text-[#451a03] p-6 sm:p-8 rounded-[4px] border-2 border-[#e9c349] shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_25px_rgba(233,195,73,0.35)] flex flex-col items-center text-center select-none animate-in zoom-in-95 duration-300 ${className}`}
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
        onClick={onClose}
        className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-[#451a03]/10 border border-[#b45309]/50 text-[#78350f] hover:text-[#451a03] hover:bg-[#451a03]/20 flex items-center justify-center text-xs cursor-pointer transition-colors"
        aria-label="Close blessing card"
      >
        ✕
      </button>

      {/* Inner Decorative Bevel Frame */}
      <div className="relative z-10 w-full h-full border border-[#d97706]/40 p-5 sm:p-7 flex flex-col items-center justify-center">
        {/* Top Gold Crest Ornament */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#ca8a04] text-xs">✦</span>
          <div className="w-10 h-[1.5px] bg-[#ca8a04] opacity-80" />
          <span className="text-[#ca8a04] text-xs">✦</span>
        </div>

        {/* Handwritten Blessing Quote */}
        <p className="font-display text-base sm:text-lg md:text-xl italic leading-relaxed text-[#451a03] font-medium tracking-wide">
          “{message}”
        </p>

        {/* Divider */}
        <div className="w-20 h-[1.5px] bg-gradient-to-r from-transparent via-[#b45309] to-transparent my-4" />

        {/* Guest Name Sign-Off */}
        <p className="font-sans text-[11px] sm:text-xs uppercase tracking-[0.3em] font-bold text-[#92400e]">
          — {guestName}
        </p>
      </div>
    </div>
  );
}
