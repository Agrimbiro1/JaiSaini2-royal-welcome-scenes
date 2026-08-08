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

const EASE_IN = "power3.inOut";

const builders: Record<TransitionName, { in: Build; out: Build }> = {
  curtain: {
    in: (q) =>
      gsap
        .timeline()
        .fromTo(
          q("[data-t=curtain-l]"),
          { xPercent: -102 },
          { xPercent: 0, duration: 0.55, ease: EASE_IN },
          0,
        )
        .fromTo(
          q("[data-t=curtain-r]"),
          { xPercent: 102 },
          { xPercent: 0, duration: 0.55, ease: EASE_IN },
          0,
        ),
    out: (q) =>
      gsap
        .timeline()
        .to(q("[data-t=curtain-l]"), { xPercent: -102, duration: 0.7, ease: EASE_IN }, 0)
        .to(q("[data-t=curtain-r]"), { xPercent: 102, duration: 0.7, ease: EASE_IN }, 0),
  },
  jharokha: {
    in: (q) =>
      gsap
        .timeline()
        .fromTo(q("[data-t=arch]"), { scale: 0.3, opacity: 0 }, { scale: 6, opacity: 1, duration: 0.6, ease: "power2.in" })
        .fromTo(q("[data-t=veil]"), { opacity: 0 }, { opacity: 1, duration: 0.35 }, 0.2),
    out: (q) =>
      gsap
        .timeline()
        .to(q("[data-t=arch]"), { scale: 0.35, opacity: 0, duration: 0.65, ease: "power2.out" })
        .to(q("[data-t=veil]"), { opacity: 0, duration: 0.5 }, 0.1),
  },
  "light-sweep": {
    in: (q) =>
      gsap
        .timeline()
        .fromTo(q("[data-t=sweep]"), { xPercent: -130 }, { xPercent: 0, duration: 0.45, ease: "power2.in" })
        .fromTo(q("[data-t=veil]"), { opacity: 0 }, { opacity: 1, duration: 0.3 }, 0.15),
    out: (q) =>
      gsap
        .timeline()
        .to(q("[data-t=sweep]"), { xPercent: 130, duration: 0.6, ease: "power2.out" })
        .to(q("[data-t=veil]"), { opacity: 0, duration: 0.45 }, 0.05),
  },
  "line-draw": {
    in: (q) =>
      gsap
        .timeline()
        .fromTo(
          q("[data-t=path]"),
          { strokeDasharray: 1200, strokeDashoffset: 1200 },
          { strokeDashoffset: 0, duration: 0.5, ease: "power1.inOut" },
          0,
        )
        .fromTo(q("[data-t=veil]"), { opacity: 0 }, { opacity: 1, duration: 0.35 }, 0.2),

    out: (q) =>
      gsap
        .timeline()
        .to(q("[data-t=path]"), { strokeDashoffset: -1200, duration: 0.55, ease: "power1.inOut" })
        .to(q("[data-t=veil]"), { opacity: 0, duration: 0.5 }, 0.1),
  },
  thread: {
    in: (q) =>
      gsap
        .timeline()
        .fromTo(
          q("[data-t=thread]"),
          { strokeDasharray: 900, strokeDashoffset: 900, opacity: 1 },
          { strokeDashoffset: 0, duration: 0.5, ease: "sine.inOut" },
        )
        .fromTo(q("[data-t=veil]"), { opacity: 0 }, { opacity: 1, duration: 0.35 }, 0.15),
    out: (q) =>
      gsap
        .timeline()
        .to(q("[data-t=thread]"), { strokeDashoffset: 900, duration: 0.55, ease: "sine.inOut" })
        .to(q("[data-t=veil]"), { opacity: 0, duration: 0.5 }, 0.1),
  },
  envelope: {
    in: (q) =>
      gsap
        .timeline()
        .fromTo(q("[data-t=fold-t]"), { yPercent: -100 }, { yPercent: 0, duration: 0.5, ease: EASE_IN }, 0)
        .fromTo(q("[data-t=fold-b]"), { yPercent: 100 }, { yPercent: 0, duration: 0.5, ease: EASE_IN }, 0)
        .fromTo(q("[data-t=seal]"), { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3 }, 0.35),
    out: (q) =>
      gsap
        .timeline()
        .to(q("[data-t=seal]"), { scale: 1.6, opacity: 0, duration: 0.35 }, 0)
        .to(q("[data-t=fold-t]"), { yPercent: -100, duration: 0.6, ease: EASE_IN }, 0.15)
        .to(q("[data-t=fold-b]"), { yPercent: 100, duration: 0.6, ease: EASE_IN }, 0.15),
  },
  star: {
    in: (q) =>
      gsap
        .timeline()
        .fromTo(q("[data-t=glow]"), { scale: 0.2, opacity: 0 }, { scale: 3.2, opacity: 1, duration: 0.55, ease: "power2.in" })
        .fromTo(q("[data-t=veil]"), { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.1),
    out: (q) =>
      gsap
        .timeline()
        .to(q("[data-t=glow]"), { scale: 0.4, opacity: 0, duration: 0.7, ease: "power2.out" })
        .fromTo(q("[data-t=star]"), { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.04 }, 0.1)
        .to(q("[data-t=veil]"), { opacity: 0, duration: 0.6 }, 0.2),
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
