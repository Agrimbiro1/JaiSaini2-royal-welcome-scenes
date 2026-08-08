import { useScene } from "../engine/SceneProvider";
import { totalScenes } from "../engine/scenes";
import { wedding } from "../data/wedding";

export function Navigation({ onOpenChapters }: { onOpenChapters: () => void }) {
  const { index, prev, next, goPrev, goNext, isAnimating } = useScene();
  const { groom, bride } = wedding.couple;

  return (
    <>
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 pt-[max(1rem,env(safe-area-inset-top))]">
        <p className="font-display text-[0.95rem] tracking-[0.2em] text-ivory/90">
          {groom.toUpperCase()} <span className="text-gold">×</span> {bride.toUpperCase()}
        </p>
        <button
          type="button"
          onClick={onOpenChapters}
          className="pointer-events-auto -m-2 flex items-center gap-2 p-2 font-sans text-[0.7rem] tracking-[0.3em] text-gold"
          aria-label="Open chapters"
        >
          {String(index + 1).padStart(2, "0")}
          <span className="text-gold/45">/</span>
          {String(totalScenes).padStart(2, "0")}
        </button>
      </header>

      <nav className="absolute inset-x-0 bottom-0 z-30 flex items-stretch justify-between gap-2 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        {prev ? (
          <button
            type="button"
            onClick={goPrev}
            disabled={isAnimating}
            className="min-h-12 flex-1 px-3 py-3 text-left font-sans text-[0.66rem] uppercase tracking-[0.28em] text-ivory/70 transition-opacity disabled:opacity-40"
          >
            <span className="text-gold">←</span> {prev.label}
          </button>
        ) : (
          <span className="flex-1" />
        )}
        {next ? (
          <button
            type="button"
            onClick={goNext}
            disabled={isAnimating}
            className="min-h-12 flex-1 px-3 py-3 text-right font-sans text-[0.66rem] uppercase tracking-[0.28em] text-ivory/70 transition-opacity disabled:opacity-40"
          >
            {next.label} <span className="text-gold">→</span>
          </button>
        ) : (
          <span className="flex-1" />
        )}
      </nav>
    </>
  );
}
