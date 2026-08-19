import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { SceneProvider, useScene } from "./engine/SceneProvider";
import { sceneIndexById, scenes } from "./engine/scenes";
import { Navigation } from "./ui/Navigation";
import { ChapterMenu } from "./ui/ChapterMenu";
import { TransitionOverlay } from "./ui/TransitionOverlay";
import { preloadAllAssets } from "./engine/preloader";

function Stage() {
  const { scene, index, goNext, goPrev, isAnimating } = useScene();
  const [chaptersOpen, setChaptersOpen] = useState(false);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const Active = scene.component;

  // Swipe navigation (touch-first, no scrolling anywhere).
  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    if (t) touch.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touch.current;
    const t = e.changedTouches[0];
    touch.current = null;
    if (!start || !t || isAnimating) return;
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) < 56 || Math.abs(dx) < Math.abs(dy) * 1.4) return;
    if (dx < 0) goNext();
    else goPrev();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  return (
    <main
      className="scene-safe relative h-[100svh] w-full overflow-hidden bg-maroon-deep select-none"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <h1 className="sr-only">
        Rohan and Ananya — Rajasthani Wedding Invitation, chapter {index + 1} of{" "}
        {scenes.length}: {scene.chapterTitle}
      </h1>
      <div key={scene.id} className="absolute inset-0 will-change-[opacity,transform]">
        <Suspense fallback={<div className="w-full h-full bg-maroon-deep transition-opacity duration-300" />}>
          <Active />
        </Suspense>
      </div>
      <Navigation onOpenChapters={() => setChaptersOpen(true)} />
      <ChapterMenu open={chaptersOpen} onClose={() => setChaptersOpen(false)} />
      <TransitionOverlay />
    </main>
  );
}

/**
 * Royal Initial Preloader Overlay to ensure fonts, backgrounds, and assets
 * are fully loaded into browser cache before unveiling the experience.
 */
function InitialPreloader({ onReady }: { onReady: () => void }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    let mounted = true;
    void preloadAllAssets().then(() => {
      if (!mounted) return;
      // Brief aesthetic pause for smooth entrance
      setFading(true);
      const timer = setTimeout(() => {
        if (mounted) onReady();
      }, 400);
      return () => clearTimeout(timer);
    });

    // Safety fallback: unveil after max 1.5s regardless of slow network
    const safetyTimer = setTimeout(() => {
      if (mounted) {
        setFading(true);
        setTimeout(() => {
          if (mounted) onReady();
        }, 300);
      }
    }, 1500);

    return () => {
      mounted = false;
      clearTimeout(safetyTimer);
    };
  }, [onReady]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1E050D] text-gold transition-opacity duration-500 pointer-events-none select-none ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Decorative Golden Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(203,161,53,0.18)_0%,transparent_70%)]" />

      {/* Royal Motif Icon */}
      <div className="relative mb-4 flex items-center justify-center">
        <div className="h-16 w-16 rounded-full border-2 border-gold/40 border-t-gold animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-gold font-['DM_Serif_Display',serif] text-xl font-bold">
          ॐ
        </div>
      </div>

      <p className="font-['Cinzel',serif] tracking-[0.3em] uppercase text-xs text-gold/90 animate-pulse">
        Unveiling Royal Invitation
      </p>
    </div>
  );
}

export function WeddingExperience({
  initialChapter,
  onChapterChange,
}: {
  initialChapter?: string;
  onChapterChange?: (id: string) => void;
}) {
  const [initialReady, setInitialReady] = useState(false);

  const handleChange = useCallback(
    (scene: { id: string }) => onChapterChange?.(scene.id),
    [onChapterChange],
  );

  return (
    <SceneProvider initialIndex={sceneIndexById(initialChapter)} onSceneChange={handleChange}>
      <Stage />
      {!initialReady && <InitialPreloader onReady={() => setInitialReady(true)} />}
    </SceneProvider>
  );
}

