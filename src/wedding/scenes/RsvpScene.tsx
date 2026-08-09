import { useEffect, useRef } from "react";
import gsap from "gsap";
import { wedding } from "../data/wedding";
import { useScene, usePrefersReducedMotion } from "../engine/SceneProvider";
import { AmbientLayer, WarmGlow } from "../ui/Ambient";
import { Divider } from "../ui/Ornaments";
import rsvpBg from "/assets/rsvp-palace-background.png";

export default function RsvpScene() {
  const { accepted, setAccepted } = useScene();
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const envelopeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current || reduced) return;

    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.to(bgRef.current, { opacity: 1, duration: 1.0 }).fromTo(
      envelopeRef.current,
      { scale: 0.85, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 1.0, ease: "back.out(1.4)" },
      "-=0.4"
    );

    return () => {
      tl.kill();
    };
  }, [reduced]);

  const accept = () => {
    if (accepted) return;
    const root = envelopeRef.current;
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
    <section
      ref={rootRef}
      className="relative w-full h-full overflow-hidden bg-[#0d0f07] text-[#e3e3d5] font-sans select-none flex flex-col items-center justify-between py-6 px-4"
    >
      {/* Background Image */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-0 transition-opacity duration-1000 overflow-hidden"
      >
        <img
          src={rsvpBg}
          alt="Royal Invitation Chamber"
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f07]/90 via-[#0d0f07]/45 to-[#0d0f07]/80" />
      </div>

      <WarmGlow className="left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 opacity-45 pointer-events-none" />

      {/* Header */}
      <div className="relative z-20 flex flex-col items-center text-center mt-2">
        <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#e9c349] font-medium">
          Chapter Nine • RSVP
        </span>
        <h1 className="mt-1 font-display text-2xl sm:text-3xl text-[#fef08a] font-medium tracking-wide drop-shadow-md">
          Will You Join Us?
        </h1>
        <Divider className="mt-2 h-2.5 w-36 text-[#e9c349]/80" />
      </div>

      {/* Royal Wax Seal Invitation Envelope */}
      <div
        ref={envelopeRef}
        className="relative z-20 w-full max-w-sm flex flex-col items-center my-4"
      >
        <div className="relative w-full aspect-[4/3] rounded-[4px] border-2 border-[#e9c349] bg-gradient-to-b from-[#fefce8] via-[#fef9c3] to-[#fef08a] shadow-[0_22px_55px_rgba(0,0,0,0.85),0_0_25px_rgba(233,195,73,0.3)] p-4 flex flex-col items-center justify-between">
          <div data-inner-glow className="pointer-events-none absolute inset-0 rounded-sm opacity-0 blur-xl bg-[#fef08a]/60" />

          {/* Envelope Flap */}
          <div
            data-flap
            className="absolute inset-x-0 top-0 h-1/2 origin-top z-10"
            style={{
              transformStyle: "preserve-3d",
              background: "linear-gradient(180deg, #fefce8 0%, #fef08a 100%)",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              borderBottom: "1px solid #ca8a04",
            }}
          />

          {/* Royal Wax Seal */}
          <div
            data-seal
            onClick={accept}
            className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#fef08a] bg-gradient-to-br from-[#ca8a04] to-[#78350f] shadow-[0_4px_15px_rgba(0,0,0,0.6)] z-20 cursor-pointer hover:scale-110 transition-transform"
          >
            <span className="font-display text-sm font-bold text-[#fef08a]">
              {wedding.couple.groom[0]}{wedding.couple.bride[0]}
            </span>
          </div>

          <div className="relative z-0 text-center my-auto">
            <p className="font-display text-base sm:text-lg font-semibold text-[#451a03]">
              Royal Wedding Invitation
            </p>
            <p className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#92400e] mt-1">
              Rohan & Ananya
            </p>
          </div>
        </div>

        {/* Confirmation or Accept Button */}
        {accepted ? (
          <div className="mt-6 text-center animate-in fade-in">
            <p className="font-display text-xl sm:text-2xl text-[#fef08a] font-medium tracking-wide">
              {wedding.rsvp.confirmation}
            </p>
            <Divider className="mx-auto mt-2 h-2.5 w-32 text-[#e9c349]" />
            <p className="mt-2 font-sans text-xs text-[#e3e3d5]/80">
              {wedding.rsvp.confirmationNote}
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={accept}
            className="mt-6 px-8 py-3 rounded bg-gradient-to-r from-[#ca8a04] via-[#fef08a] to-[#ca8a04] text-[#451a03] font-sans text-xs uppercase tracking-[0.3em] font-bold shadow-[0_6px_20px_rgba(202,138,4,0.4)] hover:shadow-[0_8px_25px_rgba(202,138,4,0.65)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            {wedding.rsvp.label} ✦
          </button>
        )}
      </div>

      <AmbientLayer dust={7} petals={2} />
    </section>
  );
}
