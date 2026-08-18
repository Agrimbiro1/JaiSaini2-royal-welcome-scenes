import gsap from "gsap";

/**
 * Named scene-to-scene transitions. Each entry has markup rendered by
 * TransitionOverlay (matched via data-t attributes) and a pair of timelines:
 * `in` covers the outgoing scene, `out` reveals the incoming one.
 */
export type TransitionName =
  | "curtain"
  | "jharokha"
  | "light-sweep"
  | "line-draw"
  | "thread"
  | "envelope"
  | "star";

type Build = (q: (s: string) => Element[]) => gsap.core.Timeline;

const EASE_SMOOTH = "power2.inOut";
const EASE_OUT = "power2.out";

const builders: Record<TransitionName, { in: Build; out: Build }> = {
  curtain: {
    in: (q) =>
      gsap
        .timeline()
        .fromTo(
          q("[data-t=curtain-l]"),
          { xPercent: -102 },
          { xPercent: 0, duration: 0.6, ease: EASE_SMOOTH },
          0,
        )
        .fromTo(
          q("[data-t=curtain-r]"),
          { xPercent: 102 },
          { xPercent: 0, duration: 0.6, ease: EASE_SMOOTH },
          0,
        ),
    out: (q) =>
      gsap
        .timeline()
        .to(q("[data-t=curtain-l]"), { xPercent: -102, duration: 0.7, ease: EASE_SMOOTH }, 0)
        .to(q("[data-t=curtain-r]"), { xPercent: 102, duration: 0.7, ease: EASE_SMOOTH }, 0),
  },
  jharokha: {
    in: (q) =>
      gsap
        .timeline()
        .fromTo(q("[data-t=arch]"), { scale: 0.35, opacity: 0 }, { scale: 5.5, opacity: 1, duration: 0.6, ease: EASE_SMOOTH }, 0)
        .fromTo(q("[data-t=veil]"), { opacity: 0 }, { opacity: 1, duration: 0.45, ease: EASE_SMOOTH }, 0.1),
    out: (q) =>
      gsap
        .timeline()
        .to(q("[data-t=arch]"), { scale: 0.4, opacity: 0, duration: 0.65, ease: EASE_OUT }, 0)
        .to(q("[data-t=veil]"), { opacity: 0, duration: 0.55, ease: EASE_SMOOTH }, 0.05),
  },
  "light-sweep": {
    in: (q) =>
      gsap
        .timeline()
        .fromTo(q("[data-t=sweep]"), { xPercent: -140, opacity: 0.9 }, { xPercent: 0, opacity: 1, duration: 0.55, ease: EASE_SMOOTH }, 0)
        .fromTo(q("[data-t=veil]"), { opacity: 0 }, { opacity: 1, duration: 0.4, ease: EASE_SMOOTH }, 0.1),
    out: (q) =>
      gsap
        .timeline()
        .to(q("[data-t=sweep]"), { xPercent: 140, opacity: 0, duration: 0.65, ease: EASE_SMOOTH }, 0)
        .to(q("[data-t=veil]"), { opacity: 0, duration: 0.5, ease: EASE_SMOOTH }, 0.05),
  },
  "line-draw": {
    in: (q) =>
      gsap
        .timeline()
        .fromTo(
          q("[data-t=path]"),
          { strokeDasharray: 1200, strokeDashoffset: 1200, opacity: 1 },
          { strokeDashoffset: 0, duration: 0.55, ease: EASE_SMOOTH },
          0,
        )
        .fromTo(q("[data-t=veil]"), { opacity: 0 }, { opacity: 1, duration: 0.4, ease: EASE_SMOOTH }, 0.1),
    out: (q) =>
      gsap
        .timeline()
        .to(q("[data-t=path]"), { strokeDashoffset: -1200, opacity: 0, duration: 0.6, ease: EASE_SMOOTH }, 0)
        .to(q("[data-t=veil]"), { opacity: 0, duration: 0.5, ease: EASE_SMOOTH }, 0.05),
  },
  thread: {
    in: (q) =>
      gsap
        .timeline()
        .fromTo(
          q("[data-t=thread]"),
          { strokeDasharray: 900, strokeDashoffset: 900, opacity: 1 },
          { strokeDashoffset: 0, duration: 0.55, ease: EASE_SMOOTH },
          0,
        )
        .fromTo(q("[data-t=veil]"), { opacity: 0 }, { opacity: 1, duration: 0.4, ease: EASE_SMOOTH }, 0.1),
    out: (q) =>
      gsap
        .timeline()
        .to(q("[data-t=thread]"), { strokeDashoffset: 900, opacity: 0, duration: 0.6, ease: EASE_SMOOTH }, 0)
        .to(q("[data-t=veil]"), { opacity: 0, duration: 0.5, ease: EASE_SMOOTH }, 0.05),
  },
  envelope: {
    in: (q) =>
      gsap
        .timeline()
        .fromTo(q("[data-t=fold-t]"), { yPercent: -101 }, { yPercent: 0, duration: 0.55, ease: EASE_SMOOTH }, 0)
        .fromTo(q("[data-t=fold-b]"), { yPercent: 101 }, { yPercent: 0, duration: 0.55, ease: EASE_SMOOTH }, 0)
        .fromTo(q("[data-t=seal]"), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(1.4)" }, 0.3),
    out: (q) =>
      gsap
        .timeline()
        .to(q("[data-t=seal]"), { scale: 1.4, opacity: 0, duration: 0.3, ease: "power2.in" }, 0)
        .to(q("[data-t=fold-t]"), { yPercent: -101, duration: 0.65, ease: EASE_SMOOTH }, 0.1)
        .to(q("[data-t=fold-b]"), { yPercent: 101, duration: 0.65, ease: EASE_SMOOTH }, 0.1),
  },
  star: {
    in: (q) =>
      gsap
        .timeline()
        .fromTo(q("[data-t=glow]"), { scale: 0.25, opacity: 0 }, { scale: 3.5, opacity: 1, duration: 0.6, ease: EASE_SMOOTH }, 0)
        .fromTo(q("[data-t=veil]"), { opacity: 0 }, { opacity: 1, duration: 0.45, ease: EASE_SMOOTH }, 0.1),
    out: (q) =>
      gsap
        .timeline()
        .to(q("[data-t=glow]"), { scale: 0.45, opacity: 0, duration: 0.7, ease: EASE_OUT }, 0)
        .fromTo(q("[data-t=star]"), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.03 }, 0.05)
        .to(q("[data-t=veil]"), { opacity: 0, duration: 0.6, ease: EASE_SMOOTH }, 0.15),
  },
};

export function playTransition(
  name: TransitionName,
  root: HTMLElement,
  phase: "in" | "out",
): gsap.core.Timeline {
  const q = gsap.utils.selector(root);
  return builders[name][phase](q);
}
