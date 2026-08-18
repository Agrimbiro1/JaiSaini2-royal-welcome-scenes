import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { SceneProvider, useScene } from "./engine/SceneProvider";
import { sceneIndexById, scenes } from "./engine/scenes";
import { Navigation } from "./ui/Navigation";
import { ChapterMenu } from "./ui/ChapterMenu";
import { TransitionOverlay } from "./ui/TransitionOverlay";

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
      <div key={scene.id} className="absolute inset-0">
        <Suspense fallback={<div className="w-full h-full bg-maroon-deep" />}>
          <Active />
        </Suspense>
      </div>
      <Navigation onOpenChapters={() => setChaptersOpen(true)} />
      <ChapterMenu open={chaptersOpen} onClose={() => setChaptersOpen(false)} />
      <TransitionOverlay />
    </main>
  );
}

export function WeddingExperience({
  initialChapter,
  onChapterChange,
}: {
  initialChapter?: string;
  onChapterChange?: (id: string) => void;
}) {
  const handleChange = useCallback(
    (scene: { id: string }) => onChapterChange?.(scene.id),
    [onChapterChange],
  );

  return (
    <SceneProvider initialIndex={sceneIndexById(initialChapter)} onSceneChange={handleChange}>
      <Stage />
    </SceneProvider>
  );
}
