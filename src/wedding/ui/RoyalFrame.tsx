import React from "react";
import type { GalleryItem } from "../data/wedding";
import coupleFrame from "/assets/couple-frame.webp";

export function RoyalFrame({
  item,
  isHero = false,
  isSelected = false,
  onClick,
  className = "",
  style = {},
}: {
  item: GalleryItem;
  isHero?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      onClick={onClick}
      style={style}
      className={`group relative flex flex-col items-center cursor-pointer select-none transition-all duration-300 ${className}`}
    >
      {/* Golden Antique Wall Nail / Hook */}
      <div className="relative z-20 flex flex-col items-center pointer-events-none mb-[-4px]">
        {/* Nail Head */}
        <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-b from-[#fef08a] via-[#ca8a04] to-[#78350f] border border-[#fef08a]/80 shadow-[0_3px_6px_rgba(0,0,0,0.8)] flex items-center justify-center">
          <div className="w-1.5 h-1.5 rounded-full bg-[#451a03] opacity-90" />
        </div>
        {/* Cast shadow under nail */}
        <div className="w-2 h-1 bg-black/70 rounded-full blur-[1px] -mt-0.5" />
        {/* Fine Hanging Cord */}
        <div className="w-[1.5px] h-6 md:h-8 bg-gradient-to-b from-[#ca8a04] via-[#fef08a] to-[#92400e] opacity-95 shadow-[1px_2px_4px_rgba(0,0,0,0.6)]" />
      </div>

      {/* Frame Container using couple-frame.png */}
      <div
        className={`relative w-full aspect-[4/3] flex items-center justify-center transition-transform duration-300 ${
          isSelected ? "scale-[1.04]" : "group-hover:scale-[1.02]"
        }`}
      >
        {/* Inner Photo - clipped inside couple-frame golden border window */}
        <div className="absolute top-[16%] bottom-[16%] left-[16%] right-[16%] overflow-hidden rounded-[2px] z-0 bg-[#0d0f07]">
          <img
            src={item.image}
            alt={item.caption}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          />
          {/* Subtle Vignette / Warm Inner Shadow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15 pointer-events-none" />
        </div>

        {/* couple-frame.png Ornate Outer Frame Overlay */}
        <img
          src={coupleFrame}
          alt="Royal Couple Frame"
          className={`absolute inset-0 w-full h-full object-contain pointer-events-none z-10 ${
            isHero
              ? "filter drop-shadow-[0_16px_35px_rgba(0,0,0,0.85)] drop-shadow-[0_0_20px_rgba(233,195,73,0.35)]"
              : "filter drop-shadow-[0_10px_24px_rgba(0,0,0,0.75)]"
          }`}
        />
      </div>

      {/* Subtle Caption Label below frame */}
      {item.caption && (
        <div className="mt-1.5 px-2.5 py-1 rounded bg-[#0d0f07]/85 backdrop-blur-md border border-[#e9c349]/40 text-center shadow-lg opacity-90 transition-opacity group-hover:opacity-100 max-w-[95%]">
          <p className="font-display text-[10px] md:text-[12px] text-[#e3e3d5] tracking-wide font-medium truncate">
            {item.caption}
          </p>
          {item.date && (
            <p className="font-sans text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-[#e9c349]">
              {item.date}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
