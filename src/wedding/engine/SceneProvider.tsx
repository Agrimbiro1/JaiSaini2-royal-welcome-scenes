import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { scenes, totalScenes, type SceneDef } from "./scenes";
import type { TransitionName } from "./transitions";

type SceneState = {
  index: number;
  scene: SceneDef;
  prev: SceneDef | undefined;
  next: SceneDef | undefined;
  isAnimating: boolean;
  reducedMotion: boolean;
  transition: { name: TransitionName; token: number } | null;
  goTo: (index: number) => void;
  goNext: () => void;
  goPrev: () => void;
  /** phase of the currently visible scene: "enter" right after a swap */
  phase: "enter" | "idle";
  accepted: boolean;
  setAccepted: (v: boolean) => void;
};

const SceneCtx = createContext<SceneState | null>(null);

export function useScene(): SceneState {
  const ctx = useContext(SceneCtx);
  if (!ctx) throw new Error("useScene must be used inside SceneProvider");
  return ctx;
}

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function SceneProvider({
  initialIndex = 0,
  children,
  onSceneChange,
}: {
  initialIndex?: number;
  children: ReactNode;
  onSceneChange?: (scene: SceneDef, index: number) => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const [phase, setPhase] = useState<"enter" | "idle">("enter");
  const [transition, setTransition] = useState<SceneState["transition"]>(null);
  const [isAnimating, setAnimating] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const reducedMotion = usePrefersReducedMotion();
  const busy = useRef(false);
  const token = useRef(0);

  const goTo = useCallback(
    (target: number) => {
      const clamped = Math.max(0, Math.min(totalScenes - 1, target));
      if (busy.current || clamped === index) return;

      if (reducedMotion) {
        setIndex(clamped);
        setPhase("idle");
        return;
      }

      // The transition belongs to the scene we are leaving when going forward,
      // and to the scene we are landing on when going back.
      const name =
        clamped > index ? scenes[index]!.transitionOut : scenes[clamped]!.transitionOut;

      busy.current = true;
      setAnimating(true);
      token.current += 1;
      setTransition({ name, token: token.current });

      // handled by TransitionOverlay via callbacks below
      pending.current = () => {
        setIndex(clamped);
        setPhase("enter");
      };
      done.current = () => {
        setTransition(null);
        setAnimating(false);
        busy.current = false;
        setPhase("idle");
      };
    },
    [index, reducedMotion],
  );

  const pending = useRef<(() => void) | null>(null);
  const done = useRef<(() => void) | null>(null);

  // exposed to the overlay through context-adjacent refs
  useEffect(() => {
    overlayHooks.swap = () => pending.current?.();
    overlayHooks.finish = () => done.current?.();
  }, []);

  useEffect(() => {
    onSceneChange?.(scenes[index]!, index);
  }, [index, onSceneChange]);

  // preload the neighbouring scenes' images
  useEffect(() => {
    const urls = [scenes[index + 1], scenes[index - 1]]
      .filter(Boolean)
      .flatMap((s) => s!.assets ?? []);
    urls.forEach((u) => {
      const img = new Image();
      img.src = u;
    });
  }, [index]);

  const value = useMemo<SceneState>(
    () => ({
      index,
      scene: scenes[index]!,
      prev: scenes[index - 1],
      next: scenes[index + 1],
      isAnimating,
      reducedMotion,
      transition,
      phase,
      accepted,
      setAccepted,
      goTo,
      goNext: () => goTo(index + 1),
      goPrev: () => goTo(index - 1),
    }),
    [index, isAnimating, reducedMotion, transition, phase, accepted, goTo],
  );

  return <SceneCtx.Provider value={value}>{children}</SceneCtx.Provider>;
}

/** Bridge between the provider and the imperative GSAP overlay. */
export const overlayHooks: { swap?: () => void; finish?: () => void } = {};
