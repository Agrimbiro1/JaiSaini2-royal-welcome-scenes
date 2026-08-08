import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "./SceneProvider";

/**
 * Staggered entrance for a scene. Elements marked with `data-enter` animate in
 * order; `data-enter-order` can override the sequence. Reduced motion skips
 * straight to the settled state so no content depends on animation.
 */
export function useSceneEnter<T extends HTMLElement>(deps: unknown[] = []) {
  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>("[data-enter]")).sort(
      (a, b) =>
        Number(a.dataset["enterOrder"] ?? 0) - Number(b.dataset["enterOrder"] ?? 0),
    );
    if (!targets.length) return;

    if (reduced) {
      gsap.set(targets, { opacity: 1, y: 0, scale: 1, clearProps: "all" });
      return;
    }

    const tl = gsap.timeline();
    tl.fromTo(
      targets,
      { opacity: 0, y: 18, scale: 0.985 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.11,
        clearProps: "transform",
      },
    );
    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, ...deps]);

  return ref;
}
