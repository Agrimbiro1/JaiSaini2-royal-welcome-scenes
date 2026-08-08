import { useScene } from "../engine/SceneProvider";
import { scenes, totalScenes } from "../engine/scenes";
import { wedding } from "../data/wedding";

export function Navigation({ onOpenChapters }: { onOpenChapters: () => void }) {
  const { index, prev, next, goTo, goPrev, goNext, isAnimating } = useScene();
  const { groom, bride } = wedding.couple;

  return (
    <>
      {/* Top Header */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 pt-[max(1rem,env(safe-area-inset-top))]">
        <p className="font-display text-[0.95rem] tracking-[0.2em] text-ivory/90">
          {groom.toUpperCase()} <span className="text-gold">×</span> {bride.toUpperCase()}
        </p>
        <button
          type="button"
          onClick={onOpenChapters}
          className="pointer-events-auto -m-2 flex items-center gap-2 p-2 font-sans text-[0.7rem] tracking-[0.3em] text-gold cursor-pointer"
          aria-label="Open chapters"
        >
          {String(index + 1).padStart(2, "0")}
          <span className="text-gold/45">/</span>
          {String(totalScenes).padStart(2, "0")}
        </button>
      </header>

      {/* Bottom Center Floating Section Scroll Navigation Bar */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 max-w-[95vw] px-2.5 py-1.5 rounded-full bg-[#12140c]/85 border border-[#e9c349]/35 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.7)] select-none">
        {/* Previous Button (←) */}
        <button
          type="button"
          onClick={goPrev}
          disabled={!prev || isAnimating}
          aria-label="Previous chapter"
          className="flex items-center justify-center w-8 h-8 rounded-full bg-[#e9c349]/10 hover:bg-[#e9c349]/25 text-[#e9c349] text-sm disabled:opacity-30 disabled:pointer-events-none transition-all shrink-0 cursor-pointer"
        >
          ←
        </button>

        {/* Horizontal Section Pills Scroll */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none px-1 py-0.5 max-w-[68vw] md:max-w-[75vw]">
          {scenes.map((s, i) => {
            const isActive = i === index;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(i)}
                disabled={isAnimating}
                className={`px-3 py-1 text-[11px] md:text-[12px] font-sans rounded-full whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#e9c349] to-[#f7e08b] text-[#12140c] font-semibold shadow-[0_0_14px_rgba(233,195,73,0.5)] scale-105"
                    : "text-[#e3e3d5]/70 hover:text-[#e9c349] hover:bg-[#e9c349]/10"
                }`}
              >
                {i + 1}. {s.label}
              </button>
            );
          })}
        </div>

        {/* Next Button (→) */}
        <button
          type="button"
          onClick={goNext}
          disabled={!next || isAnimating}
          aria-label="Next chapter"
          className="flex items-center justify-center w-8 h-8 rounded-full bg-[#e9c349]/10 hover:bg-[#e9c349]/25 text-[#e9c349] text-sm disabled:opacity-30 disabled:pointer-events-none transition-all shrink-0 cursor-pointer"
        >
          →
        </button>
      </nav>
    </>
  );
}
