import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";
import haveliWallBg from "/assets/haveli-wall-bg.jpg";
import { wedding } from "../data/wedding";
import { useScene, usePrefersReducedMotion } from "../engine/SceneProvider";
import { AmbientLayer } from "../ui/Ambient";
import { RotateCcw } from "lucide-react";

interface FloralPetal {
  id: number;
  left: number;
  drift: string;
  spin: string;
  duration: string;
  delay: string;
  size: number;
  color: string;
  blur: number;
}

export default function RsvpScene() {
  const { accepted, setAccepted } = useScene();
  const reduced = usePrefersReducedMotion();

  const [guestName, setGuestName] = useState(() => wedding.welcome.guestName || "Meera & Family");
  const [petals, setPetals] = useState<FloralPetal[]>([]);
  const [isClicking, setIsClicking] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const guest = params.get("guest");
      if (guest) setGuestName(guest);
    }
  }, []);

  // Multi-stage Floral & Golden Confetti Explosion
  const triggerAcceptExperience = () => {
    if (accepted) return;
    setIsClicking(true);

    setTimeout(() => {
      setIsClicking(false);
      setAccepted(true);
      spawnFloralRain();

      if (!reduced) {
        // Stage 1: Central Golden & Rose Sparkles
        confetti({
          particleCount: 90,
          spread: 85,
          origin: { y: 0.62 },
          colors: ["#d90429", "#ff758f", "#ffd700", "#ffffff"],
          startVelocity: 32,
          zIndex: 120,
        });

        // Stage 2: Side Bougainvillea Canopy Explosion
        setTimeout(() => {
          confetti({
            particleCount: 75,
            angle: 60,
            spread: 80,
            origin: { x: 0.1, y: 0.5 },
            colors: ["#e63946", "#ff4d6d", "#ffb3c1"],
            startVelocity: 38,
            zIndex: 120,
          });
          confetti({
            particleCount: 75,
            angle: 120,
            spread: 80,
            origin: { x: 0.9, y: 0.5 },
            colors: ["#e63946", "#ff4d6d", "#ffb3c1"],
            startVelocity: 38,
            zIndex: 120,
          });
        }, 220);

        // Stage 3: Falling Petal Shower
        setTimeout(() => {
          confetti({
            particleCount: 140,
            spread: 140,
            origin: { y: 0.1, x: 0.5 },
            colors: ["#d90429", "#ff758f", "#ffffff", "#ffd700"],
            startVelocity: 15,
            gravity: 0.65,
            scalar: 1.1,
            zIndex: 120,
          });
        }, 500);
      }
    }, 240);
  };

  const spawnFloralRain = () => {
    if (reduced) return;
    const colors = ["#e63946", "#d90429", "#ff758f", "#ffb3c1", "#ffffff", "#ffd700"];
    const newPetals: FloralPetal[] = [];
    for (let i = 0; i < 55; i++) {
      newPetals.push({
        id: Date.now() + i,
        left: Math.random() * 100,
        drift: (Math.random() * 180 - 90).toFixed(0) + "px",
        spin: (Math.random() * 720 - 360).toFixed(0) + "deg",
        duration: (3.2 + Math.random() * 3.5).toFixed(2) + "s",
        delay: (Math.random() * 2).toFixed(2) + "s",
        size: Math.floor(10 + Math.random() * 15),
        color: colors[Math.floor(Math.random() * colors.length)]!,
        blur: Math.random() > 0.75 ? 2 : 0,
      });
    }
    setPetals(newPetals);
  };

  const handleReset = () => {
    setAccepted(false);
    setPetals([]);
  };

  return (
    <section className="rsvp-wall-direct-root relative w-full h-[100svh] overflow-hidden flex items-center justify-center p-4 select-none">
      <style>{`
        .rsvp-wall-direct-root {
          font-family: 'Playfair Display', Georgia, serif;
          color: #4a2818;
          isolation: isolate;
          background-color: #e5d3bc;
        }

        /* User's Exact Haveli Wall Photo Background */
        .rsvp-wall-direct-root .wall-bg-photo {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          z-index: 0;
          filter: brightness(1.02) contrast(1.02);
        }

        /* Soft Gradient Radial Vignette to focus on Center Arch */
        .rsvp-wall-direct-root .wall-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, transparent 35%, rgba(0, 0, 0, 0.12) 100%);
          z-index: 1;
          pointer-events: none;
        }

        /* --- Center Arch Content (Placed DIRECTLY on Wall - NO CARD) --- */
        .rsvp-wall-direct-root .wall-center-content {
          position: relative;
          z-index: 10;
          max-width: 440px;
          width: 100%;
          height: min(580px, 80vh);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          padding: 30px 16px 20px;
          text-align: center;
        }

        /* Arch Apex Relief Ornament */
        .rsvp-wall-direct-root .arch-apex-ornament {
          opacity: 0.85;
          margin-bottom: 2px;
        }

        /* --- RSVP Title Placed Directly on Sandstone Wall --- */
        .rsvp-wall-direct-root .wall-rsvp-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 2.8rem;
          font-weight: 700;
          letter-spacing: 9px;
          color: #6b2619;
          line-height: 1;
          margin-bottom: 8px;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.7), 0 2px 4px rgba(70, 30, 10, 0.15);
        }

        .rsvp-wall-direct-root .wall-rsvp-subhead {
          font-family: 'Cinzel', serif;
          font-size: 0.72rem;
          letter-spacing: 3.2px;
          color: #634331;
          text-transform: uppercase;
          font-weight: 600;
          text-shadow: 0 1px 1px rgba(255, 255, 255, 0.6);
        }

        /* --- Middle Message Formation Directly on Wall --- */
        .rsvp-wall-direct-root .wall-message-formation {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 12px 0;
          padding: 10px;
        }

        .rsvp-wall-direct-root .guest-name-script {
          font-family: 'Great Vibes', 'Cormorant Garamond', cursive, serif;
          font-size: 2.4rem;
          color: #7a2216;
          margin-bottom: 8px;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
        }

        .rsvp-wall-direct-root .wall-rsvp-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.12rem;
          line-height: 1.55;
          color: #4a2d1e;
          font-style: italic;
          margin-bottom: 20px;
          max-width: 320px;
          text-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);
        }

        /* --- Golden Wax Seal Monogram Floating on Wall --- */
        .rsvp-wall-direct-root .wax-seal-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 6px 0 20px;
        }

        .rsvp-wall-direct-root .wax-seal-stamp {
          position: relative;
          width: 62px;
          height: 62px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #F7D44A 0%, #D4A12A 50%, #8C6218 100%);
          box-shadow:
            0 8px 22px rgba(90, 60, 15, 0.4),
            inset 0 2px 4px rgba(255, 255, 255, 0.75),
            inset 0 -2px 4px rgba(0, 0, 0, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1.5px solid rgba(255, 240, 180, 0.9);
          animation: floatSeal 4s infinite alternate ease-in-out;
        }

        @keyframes floatSeal {
          0% { transform: translateY(0px) rotate(-1deg); }
          100% { transform: translateY(-4px) rotate(1deg); }
        }

        .rsvp-wall-direct-root .wax-seal-monogram {
          font-family: 'Cinzel', serif;
          font-weight: 700;
          font-size: 1.02rem;
          color: #3D2305;
          letter-spacing: 1px;
          text-shadow: 0 1px 1px rgba(255, 255, 255, 0.4);
        }

        /* Hanging Silk Tassels */
        .rsvp-wall-direct-root .tassels-svg {
          width: 32px;
          height: 28px;
          margin-top: -4px;
          filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.3));
        }

        /* --- Golden Plaque Button Directly Placed on Wall --- */
        .rsvp-wall-direct-root .btn-golden-plaque {
          position: relative;
          width: 100%;
          max-width: 300px;
          background: linear-gradient(180deg, #F7D44A 0%, #D4A12A 60%, #B3821A 100%);
          border: 1.5px solid rgba(255, 245, 200, 0.9);
          border-radius: 12px;
          padding: 14px 28px;
          font-family: 'Cinzel', serif;
          font-weight: 700;
          font-size: 0.92rem;
          letter-spacing: 3px;
          color: #2B1805;
          text-transform: uppercase;
          cursor: pointer;
          box-shadow:
            0 10px 24px rgba(160, 110, 20, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
          overflow: hidden;
        }

        .rsvp-wall-direct-root .btn-golden-plaque:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 14px 32px rgba(160, 110, 20, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.95);
          background: linear-gradient(180deg, #FFE066 0%, #E0B030 60%, #C49220 100%);
        }

        .rsvp-wall-direct-root .btn-golden-plaque.is-pressing {
          transform: scale(0.95);
          box-shadow: 0 4px 10px rgba(160, 110, 20, 0.4);
        }

        /* Golden Radial Glow Ripple on Click */
        .rsvp-wall-direct-root .btn-glow-ripple {
          position: absolute;
          inset: -24px;
          border-radius: 30px;
          background: radial-gradient(circle, rgba(247, 212, 74, 0.9) 0%, rgba(247, 212, 74, 0) 70%);
          opacity: 0;
          pointer-events: none;
        }
        .rsvp-wall-direct-root .btn-golden-plaque.is-pressing .btn-glow-ripple {
          animation: glowRippleOut 0.6s ease-out forwards;
        }
        @keyframes glowRippleOut {
          0% { opacity: 0.95; transform: scale(0.4); }
          100% { opacity: 0; transform: scale(1.7); }
        }

        /* --- Confirmation State Directly on Wall --- */
        .rsvp-wall-direct-root .welcome-confirm-wall {
          animation: zoomInConfirm 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          text-align: center;
          width: 100%;
        }

        @keyframes zoomInConfirm {
          0% { opacity: 0; transform: scale(0.9) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        .rsvp-wall-direct-root .welcome-main-title {
          font-family: 'Great Vibes', cursive;
          font-size: 3.6rem;
          color: #7a2216;
          margin-bottom: 2px;
          line-height: 1;
          text-shadow: 0 1px 3px rgba(255, 255, 255, 0.8);
        }

        .rsvp-wall-direct-root .welcome-sub-title {
          font-family: 'Cinzel', serif;
          font-size: 0.82rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #5c3e2e;
          font-weight: 600;
          margin-bottom: 14px;
          text-shadow: 0 1px 1px rgba(255, 255, 255, 0.6);
        }

        /* 3D Falling Flower Petals Particles */
        .rsvp-wall-direct-root .floral-petal-particle {
          position: absolute;
          top: -20px;
          border-radius: 0% 70% 0% 70%;
          pointer-events: none;
          z-index: 40;
          will-change: transform, opacity;
        }

        @keyframes petalFallAnimation {
          0% {
            transform: translate3d(0, -10px, 0) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: 0.95; }
          100% {
            transform: translate3d(var(--drift), 105vh, 0) rotate(var(--spin));
            opacity: 0.1;
          }
        }

        @media (max-width: 480px) {
          .rsvp-wall-direct-root .wall-center-content {
            padding: 24px 12px 16px;
          }
          .rsvp-wall-direct-root .wall-rsvp-title { font-size: 2.2rem; }
          .rsvp-wall-direct-root .welcome-main-title { font-size: 2.8rem; }
          .rsvp-wall-direct-root .btn-golden-plaque { padding: 12px 20px; font-size: 0.84rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .rsvp-wall-direct-root .btn-golden-plaque {
            transition: none !important;
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* User's Exact Rajasthani Haveli Sandstone Wall Background Photo */}
      <img
        src={haveliWallBg}
        alt="Rajasthani Haveli Arch Wall"
        className="wall-bg-photo"
      />

      {/* Soft Vignette Overlay */}
      <div className="wall-vignette" aria-hidden="true" />

      {/* Center Arch Content (Placed DIRECTLY on Wall) */}
      <div className="wall-center-content">
        {/* Arch Apex Ornament */}
        <svg className="arch-apex-ornament" width="60" height="24" viewBox="0 0 60 24" fill="none" aria-hidden="true">
          <path d="M30 0 C20 12 8 8 0 20 H60 C52 8 40 12 30 0 Z" fill="#8c5838" opacity="0.6" />
          <circle cx="30" cy="10" r="2.5" fill="#7a2216" />
        </svg>

        {/* Arch Header Title */}
        <div>
          <h1 className="wall-rsvp-title">RSVP</h1>
          <p className="wall-rsvp-subhead">WE WOULD BE HONOURED BY YOUR PRESENCE</p>
        </div>

        {/* Middle Message Formation Directly Placed on Wall (NO CARD CONTAINER) */}
        <div className="wall-message-formation">
          {!accepted ? (
            <>
              <div className="guest-name-script">{guestName}</div>
              <p className="wall-rsvp-text">
                Your presence will make our wedding celebration complete.
              </p>

              {/* Golden Wax Seal Monogram Floating Directly on Wall */}
              <div className="wax-seal-wrapper">
                <div className="wax-seal-stamp">
                  <span className="wax-seal-monogram">
                    {wedding.couple.groom[0]} ♥ {wedding.couple.bride[0]}
                  </span>
                </div>
                {/* Hanging Silk Tassels */}
                <svg className="tassels-svg" viewBox="0 0 32 28" fill="none" aria-hidden="true">
                  <path d="M12 0 L8 28 M20 0 L24 28 M16 0 L16 26" stroke="#d4a12a" strokeWidth="2.5" />
                  <circle cx="8" cy="26" r="3" fill="#f7d44a" />
                  <circle cx="24" cy="26" r="3" fill="#f7d44a" />
                  <circle cx="16" cy="24" r="3" fill="#d4a12a" />
                </svg>
              </div>

              {/* Golden Plaque Button Placed Directly on Wall */}
              <button
                type="button"
                className={`btn-golden-plaque ${isClicking ? "is-pressing" : ""}`}
                onClick={triggerAcceptExperience}
              >
                <div className="btn-glow-ripple" aria-hidden="true" />
                <span>ACCEPT INVITATION</span>
              </button>
            </>
          ) : (
            /* Confirmation Welcome Message Transformation Directly on Wall */
            <div className="welcome-confirm-wall">
              <div className="welcome-main-title">Welcome!</div>
              <div className="welcome-sub-title">YOUR PRESENCE MEANS THE WORLD TO US</div>

              <div className="wax-seal-wrapper">
                <div className="wax-seal-stamp">
                  <span className="wax-seal-monogram">
                    {wedding.couple.groom[0]} ♥ {wedding.couple.bride[0]}
                  </span>
                </div>
                <svg className="tassels-svg" viewBox="0 0 32 28" fill="none" aria-hidden="true">
                  <path d="M12 0 L8 28 M20 0 L24 28 M16 0 L16 26" stroke="#d4a12a" strokeWidth="2.5" />
                  <circle cx="8" cy="26" r="3" fill="#f7d44a" />
                  <circle cx="24" cy="26" r="3" fill="#f7d44a" />
                </svg>
              </div>

              <p className="text-xs text-[#5c3e2e] mb-3 font-semibold">
                Confirmed for {guestName}
              </p>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 text-xs text-[#7a2216] underline underline-offset-4 cursor-pointer hover:opacity-80 transition-opacity font-semibold"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Replay Floral Bloom
              </button>
            </div>
          )}
        </div>

        {/* Traditional Bottom Inscription Directly on Wall */}
        <div className="text-[10px] tracking-[3px] text-[#634331] uppercase font-semibold text-shadow">
          —— PADHARO MHARE DESH ——
        </div>
      </div>

      {/* 3D Falling Flower Petals Rain */}
      {petals.map((p) => (
        <div
          key={p.id}
          className="floral-petal-particle"
          style={
            {
              left: `${p.left}vw`,
              width: `${p.size}px`,
              height: `${p.size * 1.3}px`,
              backgroundColor: p.color,
              filter: p.blur ? `blur(${p.blur}px)` : "none",
              "--drift": p.drift,
              "--spin": p.spin,
              animation: `petalFallAnimation ${p.duration} linear ${p.delay} forwards`,
            } as React.CSSProperties
          }
        />
      ))}

      <AmbientLayer dust={5} petals={8} />
    </section>
  );
}
