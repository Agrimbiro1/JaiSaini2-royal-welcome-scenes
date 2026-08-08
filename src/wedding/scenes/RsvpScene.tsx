import { useRef } from "react";
import gsap from "gsap";
import { wedding } from "../data/wedding";
import { useScene, usePrefersReducedMotion } from "../engine/SceneProvider";
import { useSceneEnter } from "../engine/useSceneEnter";
import { SceneShell } from "../ui/SceneShell";
import { Divider } from "../ui/Ornaments";
import { AmbientLayer, Petals, WarmGlow } from "../ui/Ambient";

export default function RsvpScene() {
  const ref = useSceneEnter<HTMLDivElement>();
  const envelope = useRef<HTMLDivElement>(null);
  const { accepted, setAccepted } = useScene();
  const reduced = usePrefersReducedMotion();

  const accept = () => {
    if (accepted) return;
    const root = envelope.current;
    if (!root || reduced) {
      setAccepted(true);
      return;
    }
    const q = gsap.utils.selector(root);
    gsap
      .timeline({ onComplete: () => setAccepted(true) })
      .to(q("[data-seal]"), { scale: 1.35, duration: 0.25, ease: "power2.out" })
      .to(q("[data-seal]"), { scale: 0, opacity: 0, duration: 0.3 })
      .to(q("[data-flap]"), { rotateX: -160, duration: 0.55, ease: "power3.inOut" }, "-=0.1")
      .to(q("[data-inner-glow]"), { opacity: 1, scale: 1.4, duration: 0.6 }, "-=0.35");
  };

  return (
    <SceneShell>
      <WarmGlow className="left-1/2 top-[42%] h-56 w-56 -translate-x-1/2 opacity-35" />

      <div
        ref={ref}
        className="relative z-10 flex h-full flex-col items-center justify-center px-8 pb-24 pt-20"
      >
        <div
          ref={envelope}
          className="relative w-[74%] max-w-[17rem]"
          data-enter
          data-enter-order={1}
          style={{ animation: reduced ? undefined : "light-breathe 8s ease-in-out infinite" }}
        >
          <div
            data-inner-glow
            className="pointer-events-none absolute inset-0 rounded-sm opacity-0 blur-xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--gold-bright) 70%, transparent), transparent 70%)",
            }}
          />
          <div className="relative aspect-[4/3] rounded-sm border-2 border-gold/60 bg-gradient-to-b from-ivory to-ivory-dim shadow-[0_18px_40px_-18px_oklch(0.12_0.05_20_/_0.9)]">
            <div className="absolute inset-2 border border-maroon/25 bg-jaali opacity-70" />
            <div
              data-flap
              className="absolute inset-x-0 top-0 h-1/2 origin-top"
              style={{
                transformStyle: "preserve-3d",
                background: "linear-gradient(180deg, var(--ivory) 0%, var(--ivory-dim) 100%)",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                borderBottom: "1px solid color-mix(in oklab, var(--gold) 55%, transparent)",
              }}
            />
            <div
              data-seal
              className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-gold/70 bg-maroon"
            >
              <span className="font-display text-sm text-gold-bright">
                {wedding.couple.groom[0]}
                {wedding.couple.bride[0]}
              </span>
            </div>
          </div>
        </div>

        {accepted ? (
          <div className="mt-8 text-center" data-enter data-enter-order={2}>
            <p className="font-display text-2xl tracking-[0.12em] text-gold-bright">
              {wedding.rsvp.confirmation}
            </p>
            <Divider className="mx-auto mt-3 h-3 w-32 text-gold/70" />
            <p className="mt-3 font-sans text-[0.75rem] text-ivory/70">
              {wedding.rsvp.confirmationNote}
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={accept}
            className="mt-9 min-h-14 rounded-sm border border-gold px-8 py-4 font-sans text-[0.66rem] uppercase tracking-[0.34em] text-gold-bright"
            data-enter
            data-enter-order={2}
          >
            {wedding.rsvp.label}
          </button>
        )}
      </div>

      {accepted && <Petals count={8} />}
      <AmbientLayer dust={5} />
    </SceneShell>
  );
}
