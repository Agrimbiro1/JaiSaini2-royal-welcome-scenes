import { useEffect, useState } from "react";
import { wedding } from "../data/wedding";
import { useScene, usePrefersReducedMotion } from "../engine/SceneProvider";
import { AmbientLayer } from "../ui/Ambient";

interface Petal {
  id: number;
  left: number;
  drift: string;
  spin: string;
  duration: string;
  delay: string;
  size: string;
  isGold: boolean;
}

export default function RsvpScene() {
  const { accepted, setAccepted } = useScene();
  const reduced = usePrefersReducedMotion();

  const [guestName, setGuestName] = useState(() => wedding.welcome.guestName || "Aarav & Priya Sharma");
  const [petals, setPetals] = useState<Petal[]>([]);
  const [overlayRun, setOverlayRun] = useState(false);
  const [showReveal, setShowReveal] = useState(false);
  const [showReplay, setShowReplay] = useState(false);
  const [liveStatusText, setLiveStatusText] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const guest = params.get("guest");
      if (guest) {
        setGuestName(guest);
      }
    }
  }, []);

  const spawnPetals = (count = 30) => {
    const newPetals: Petal[] = [];
    for (let i = 0; i < count; i++) {
      const left = Math.random() * 100;
      const drift = (Math.random() * 140 - 70).toFixed(0) + "px";
      const spin = (Math.random() * 540 - 270).toFixed(0) + "deg";
      const duration = (2.6 + Math.random() * 2.2).toFixed(2) + "s";
      const delay = (Math.random() * 1.4).toFixed(2) + "s";
      const size = (9 + Math.random() * 10).toFixed(0) + "px";
      newPetals.push({
        id: Math.random() + Date.now() + i,
        left,
        drift,
        spin,
        duration,
        delay,
        size,
        isGold: Math.random() > 0.6,
      });
    }
    setPetals(newPetals);
  };

  const handleAccept = () => {
    if (accepted) return;
    setAccepted(true);
    setLiveStatusText("Invitation accepted.");

    requestAnimationFrame(() => setOverlayRun(true));

    if (!reduced) {
      spawnPetals(30);
    }

    const revealTimer = setTimeout(() => setShowReveal(true), reduced ? 100 : 650);
    const replayTimer = setTimeout(() => setShowReplay(true), reduced ? 400 : 2000);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(replayTimer);
    };
  };

  const handleReplay = () => {
    setAccepted(false);
    setOverlayRun(false);
    setShowReveal(false);
    setShowReplay(false);
    setLiveStatusText("");
    setPetals([]);
  };

  return (
    <section className="rsvp-stage-root relative w-full h-full min-h-screen overflow-hidden flex items-center justify-center p-5 select-none">
      <style>{`
        .rsvp-stage-root {
          --maroon: #430E1F;
          --maroon-deep: #2C0714;
          --maroon-mid: #6E1B34;
          --gold: #CBA135;
          --gold-light: #EAD59A;
          --gold-soft: #F3E3B8;
          --ivory: #FBF1DE;
          --ink: #331019;
          --teal: #0F6B62;
          --teal-light: #4FA89B;
          --marigold: #E2790E;
          --marigold-2: #F2A93C;

          background: radial-gradient(120% 140% at 50% -10%, var(--maroon-mid) 0%, var(--maroon) 45%, var(--maroon-deep) 100%);
          font-family: 'Rajdhani', sans-serif;
          color: var(--ivory);
          isolation: isolate;
        }

        /* ambient jaali lattice background */
        .rsvp-stage-root .jaali {
          position: absolute; inset: 0;
          opacity: 0.10;
          background-image:
            linear-gradient(45deg, var(--gold) 1px, transparent 1px),
            linear-gradient(-45deg, var(--gold) 1px, transparent 1px);
          background-size: 34px 34px;
          mask-image: radial-gradient(120% 100% at 50% 30%, black 30%, transparent 78%);
          pointer-events: none;
        }

        .rsvp-stage-root .corner-motif {
          position: absolute;
          width: 130px; height: 130px;
          opacity: 0.55;
          pointer-events: none;
          z-index: 1;
        }
        .rsvp-stage-root .corner-motif.tl { top: 18px; left: 18px; }
        .rsvp-stage-root .corner-motif.tr { top: 18px; right: 18px; transform: scaleX(-1); }
        .rsvp-stage-root .corner-motif.bl { bottom: 18px; left: 18px; transform: scaleY(-1); }
        .rsvp-stage-root .corner-motif.br { bottom: 18px; right: 18px; transform: scale(-1,-1); }

        /* ============ CARD ============ */
        .rsvp-stage-root .invite-wrap {
          position: relative;
          width: min(420px, 100%);
          z-index: 2;
        }

        .rsvp-stage-root .crest {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
          margin-bottom: -34px;
          z-index: 3;
        }
        .rsvp-stage-root .crest svg { width: 190px; height: auto; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.35)); }

        .rsvp-stage-root .card {
          position: relative;
          background: linear-gradient(180deg, var(--ivory) 0%, #F5E7CC 100%);
          color: var(--ink);
          border-radius: 18px;
          padding: 56px 34px 36px;
          text-align: center;
          box-shadow:
            0 30px 60px -20px rgba(0,0,0,0.55),
            0 0 0 1px rgba(203,161,53,0.35),
            inset 0 0 0 8px rgba(203,161,53,0.12);
          transition: transform 0.6s cubic-bezier(.22,1,.36,1), box-shadow 0.6s ease, opacity 0.6s ease;
        }
        .rsvp-stage-root .card::before {
          content: "";
          position: absolute; inset: 10px;
          border: 1px solid rgba(203,161,53,0.55);
          border-radius: 12px;
          pointer-events: none;
        }
        .rsvp-stage-root .card.is-accepted {
          transform: scale(0.96);
          box-shadow:
            0 20px 50px -20px rgba(0,0,0,0.5),
            0 0 0 1px rgba(203,161,53,0.6),
            0 0 40px 4px rgba(203,161,53,0.35),
            inset 0 0 0 8px rgba(203,161,53,0.16);
        }

        .rsvp-stage-root .eyebrow {
          font-family: 'Cinzel', serif;
          font-size: 11.5px;
          letter-spacing: 3.5px;
          text-transform: uppercase;
          color: var(--teal);
          margin: 0 0 6px;
        }

        .rsvp-stage-root .to-line {
          font-family: 'Rajdhani', sans-serif;
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #8a5a3f;
          margin: 4px 0 2px;
        }

        .rsvp-stage-root .guest-name {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 600;
          font-size: 34px;
          line-height: 1.15;
          color: var(--maroon-mid);
          margin: 2px 0 18px;
        }

        .rsvp-stage-root .divider {
          display: flex; align-items: center; justify-content: center;
          gap: 10px; margin: 6px 0 18px;
          color: var(--gold);
        }
        .rsvp-stage-root .divider svg { width: 90px; height: 14px; }

        .rsvp-stage-root .message {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18.5px;
          line-height: 1.55;
          color: #4a2a1f;
          margin: 0 0 30px;
        }

        .rsvp-stage-root .details {
          font-family: 'Rajdhani', sans-serif;
          font-size: 13.5px;
          letter-spacing: 1px;
          color: var(--teal);
          margin: -14px 0 26px;
          text-transform: uppercase;
          font-weight: 600;
        }

        .rsvp-stage-root .accept-btn {
          position: relative;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: var(--ivory);
          background: linear-gradient(180deg, var(--marigold-2), var(--marigold));
          border: none;
          padding: 15px 38px;
          border-radius: 999px;
          cursor: pointer;
          box-shadow: 0 10px 24px -8px rgba(226,121,14,0.65), inset 0 0 0 1px rgba(255,255,255,0.25);
          transition: transform 0.25s ease, box-shadow 0.25s ease, opacity 0.4s ease;
        }
        .rsvp-stage-root .accept-btn:hover { transform: translateY(-2px); box-shadow: 0 14px 28px -8px rgba(226,121,14,0.75), inset 0 0 0 1px rgba(255,255,255,0.35); }
        .rsvp-stage-root .accept-btn:active { transform: translateY(0); }
        .rsvp-stage-root .accept-btn:focus-visible { outline: 3px solid var(--gold); outline-offset: 3px; }
        .rsvp-stage-root .accept-btn[disabled] { cursor: default; opacity: 0.85; transform: none; }

        .rsvp-stage-root .accept-btn .check {
          display: inline-flex; margin-right: 6px; vertical-align: -3px;
        }

        .rsvp-stage-root .replay {
          margin-top: 16px;
          background: none; border: none;
          font-family: 'Rajdhani', sans-serif;
          font-size: 12.5px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--teal);
          text-decoration: underline;
          text-underline-offset: 3px;
          cursor: pointer;
          opacity: 0;
          transform: translateY(4px);
          transition: opacity 0.5s ease, transform 0.5s ease;
          pointer-events: none;
        }
        .rsvp-stage-root .replay.show { opacity: 0.85; transform: translateY(0); pointer-events: auto; }

        .rsvp-stage-root .sr-only {
          position: absolute; width: 1px; height: 1px;
          padding: 0; margin: -1px; overflow: hidden;
          clip: rect(0,0,0,0); white-space: nowrap; border: 0;
        }

        /* ============ ACCEPTANCE ANIMATION ============ */
        .rsvp-stage-root .rsvp-overlay {
          position: fixed; inset: 0;
          display: flex; align-items: center; justify-content: center;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 50;
        }
        .rsvp-stage-root .rsvp-overlay.active { opacity: 1; }

        .rsvp-stage-root .rsvp-overlay .veil {
          position: absolute; inset: 0;
          background: radial-gradient(60% 60% at 50% 45%, rgba(67,14,31,0.55) 0%, rgba(44,7,20,0.85) 70%, rgba(44,7,20,0.94) 100%);
        }

        .rsvp-stage-root .mandala {
          position: relative;
          width: 340px; height: 340px;
          display: flex; align-items: center; justify-content: center;
        }
        .rsvp-stage-root .mandala svg { position: absolute; inset: 0; width: 100%; height: 100%; }

        .rsvp-stage-root .ring {
          transform-origin: 170px 170px;
          transform: scale(0);
          opacity: 0;
        }
        .rsvp-stage-root .rsvp-overlay.run .ring {
          animation: ringGrow 1.1s cubic-bezier(.16,1,.3,1) forwards;
        }
        @keyframes ringGrow {
          0% { transform: scale(0); opacity: 0; }
          55% { opacity: 1; }
          100% { transform: scale(1); opacity: 0.9; }
        }

        .rsvp-stage-root .dots-ring {
          transform-origin: 170px 170px;
          opacity: 0;
        }
        .rsvp-stage-root .rsvp-overlay.run .dots-ring {
          animation: dotsFade 0.8s ease forwards 0.5s, dotsSpin 26s linear infinite 0.5s;
        }
        @keyframes dotsFade { to { opacity: 0.85; } }
        @keyframes dotsSpin { to { transform: rotate(360deg); } }

        .rsvp-stage-root .flame-glow {
          position: absolute;
          width: 90px; height: 90px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(242,169,60,0.9) 0%, rgba(226,121,14,0.35) 45%, transparent 72%);
          filter: blur(2px);
          opacity: 0;
          transform: scale(0.6);
        }
        .rsvp-stage-root .rsvp-overlay.run .flame-glow {
          animation: flameIn 1s ease forwards 0.15s, flameFlicker 1.8s ease-in-out infinite 1.1s;
        }
        @keyframes flameIn { to { opacity: 1; transform: scale(1); } }
        @keyframes flameFlicker {
          0%,100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.08); opacity: 1; }
        }

        .rsvp-stage-root .reveal {
          position: absolute;
          bottom: 12%;
          left: 50%;
          transform: translate(-50%, 14px);
          text-align: center;
          width: min(360px, 88vw);
          opacity: 0;
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .rsvp-stage-root .reveal.show { opacity: 1; transform: translate(-50%, 0); }
        .rsvp-stage-root .reveal .r-eyebrow {
          font-family: 'Cinzel', serif;
          font-size: 11px; letter-spacing: 3px; text-transform: uppercase;
          color: var(--gold-light);
          margin: 0 0 8px;
        }
        .rsvp-stage-root .reveal .r-msg {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 22px;
          color: var(--ivory);
          margin: 0;
        }
        .rsvp-stage-root .reveal svg { width: 120px; height: 14px; margin: 10px auto 0; display:block; }
        .rsvp-stage-root .reveal .underline-path {
          stroke-dasharray: 200;
          stroke-dashoffset: 200;
        }
        .rsvp-stage-root .reveal.show .underline-path {
          animation: drawLine 1s ease forwards 0.2s;
        }
        @keyframes drawLine { to { stroke-dashoffset: 0; } }

        /* petals */
        .rsvp-stage-root .petal {
          position: absolute;
          top: -24px;
          width: 14px; height: 14px;
          background: linear-gradient(135deg, var(--marigold-2), var(--marigold));
          border-radius: 0% 60% 0% 60%;
          opacity: 0.95;
          pointer-events: none;
          will-change: transform, opacity;
        }
        .rsvp-stage-root .petal.gold {
          background: linear-gradient(135deg, var(--gold-light), var(--gold));
        }
        @keyframes fall {
          0% { transform: translate(0, -10px) rotate(0deg); opacity: 0; }
          8% { opacity: 1; }
          100% { transform: translate(var(--drift), 620px) rotate(var(--spin)); opacity: 0.15; }
        }

        @media (max-width: 480px) {
          .rsvp-stage-root .card { padding: 50px 22px 30px; }
          .rsvp-stage-root .guest-name { font-size: 28px; }
          .rsvp-stage-root .message { font-size: 17px; }
          .rsvp-stage-root .mandala { width: 280px; height: 280px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .rsvp-stage-root .card, .rsvp-stage-root .accept-btn, .rsvp-stage-root .reveal, .rsvp-stage-root .replay { transition: none !important; }
          .rsvp-stage-root .ring, .rsvp-stage-root .dots-ring, .rsvp-stage-root .flame-glow, .rsvp-stage-root .petal { animation: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      {/* Ambient jaali lattice background */}
      <div className="jaali" aria-hidden="true" />

      {/* Corner motifs */}
      <svg className="corner-motif tl" viewBox="0 0 100 100" aria-hidden="true"><path d="M2,2 C2,40 30,50 30,90 M2,2 C40,2 50,30 90,30" fill="none" stroke="#CBA135" strokeWidth="1.4" /><circle cx="30" cy="90" r="3" fill="#CBA135" /><circle cx="90" cy="30" r="3" fill="#CBA135" /></svg>
      <svg className="corner-motif tr" viewBox="0 0 100 100" aria-hidden="true"><path d="M2,2 C2,40 30,50 30,90 M2,2 C40,2 50,30 90,30" fill="none" stroke="#CBA135" strokeWidth="1.4" /><circle cx="30" cy="90" r="3" fill="#CBA135" /><circle cx="90" cy="30" r="3" fill="#CBA135" /></svg>
      <svg className="corner-motif bl" viewBox="0 0 100 100" aria-hidden="true"><path d="M2,2 C2,40 30,50 30,90 M2,2 C40,2 50,30 90,30" fill="none" stroke="#CBA135" strokeWidth="1.4" /><circle cx="30" cy="90" r="3" fill="#CBA135" /><circle cx="90" cy="30" r="3" fill="#CBA135" /></svg>
      <svg className="corner-motif br" viewBox="0 0 100 100" aria-hidden="true"><path d="M2,2 C2,40 30,50 30,90 M2,2 C40,2 50,30 90,30" fill="none" stroke="#CBA135" strokeWidth="1.4" /><circle cx="30" cy="90" r="3" fill="#CBA135" /><circle cx="90" cy="30" r="3" fill="#CBA135" /></svg>

      <div className="invite-wrap">
        {/* Jharokha crest */}
        <div className="crest">
          <svg viewBox="0 0 240 130" aria-hidden="true">
            <path d="M20,120 Q20,58 62,50 Q62,20 90,16 Q120,8 150,16 Q178,20 178,50 Q220,58 220,120"
              fill="none" stroke="#CBA135" strokeWidth="2.2" />
            <path d="M40,120 Q40,68 70,60 Q75,32 120,26 Q165,32 170,60 Q200,68 200,120"
              fill="none" stroke="#0F6B62" strokeWidth="1.2" opacity="0.8" />
            <circle cx="120" cy="40" r="6" fill="#CBA135" />
            <path d="M120,46 C104,54 104,72 120,80 C136,72 136,54 120,46 Z" fill="#0F6B62" opacity="0.9" />
            <circle cx="62" cy="50" r="3" fill="#CBA135" />
            <circle cx="178" cy="50" r="3" fill="#CBA135" />
          </svg>
        </div>

        <div className={`card ${accepted ? "is-accepted" : ""}`} id="card">
          <p className="eyebrow">You Are Invited</p>
          <p className="to-line">Dear</p>
          <p className="guest-name" id="guestName">{guestName}</p>

          <div className="divider" aria-hidden="true">
            <svg viewBox="0 0 90 14"><path d="M0,7 H30 M60,7 H90 M45,2 L50,7 L45,12 L40,7 Z" fill="#CBA135" stroke="#CBA135" strokeWidth="1" /></svg>
          </div>

          <p className="message">
            With the blessings of our elders and hearts full of joy, we invite you to be part of our wedding celebrations — an evening of rituals, music and togetherness.
          </p>

          <p className="details">18 February 2027 · Jaipur, Rajasthan</p>

          <button
            className="accept-btn"
            id="acceptBtn"
            type="button"
            onClick={handleAccept}
            disabled={accepted}
          >
            {accepted ? (
              <>
                <span className="check">&#10003;</span>
                <span className="btn-label">Accepted</span>
              </>
            ) : (
              <span className="btn-label">Accept Invitation</span>
            )}
          </button>
          <div>
            <button
              className={`replay ${accepted && showReplay ? "show" : ""}`}
              id="replayBtn"
              type="button"
              onClick={handleReplay}
            >
              RSVP again
            </button>
          </div>
          <p className="sr-only" id="liveStatus" role="status" aria-live="polite">{liveStatusText}</p>
        </div>
      </div>

      {/* Full-page acceptance animation */}
      <div className={`rsvp-overlay ${accepted ? "active" : ""} ${overlayRun ? "run" : ""}`} id="overlay" aria-hidden={!accepted}>
        <div className="veil"></div>
        <div className="mandala">
          <svg viewBox="0 0 340 340">
            <g>
              <circle className="ring" cx="170" cy="170" r="150" fill="none" stroke="#CBA135" strokeWidth="1" style={{ animationDelay: "0s" }} />
              <circle className="ring" cx="170" cy="170" r="118" fill="none" stroke="#4FA89B" strokeWidth="1" style={{ animationDelay: "0.08s" }} />
              <circle className="ring" cx="170" cy="170" r="88" fill="none" stroke="#EAD59A" strokeWidth="1.4" style={{ animationDelay: "0.16s" }} />
              <circle className="ring" cx="170" cy="170" r="58" fill="none" stroke="#CBA135" strokeWidth="1" style={{ animationDelay: "0.24s" }} />
              <g className="dots-ring">
                <circle cx="170" cy="30" r="3" fill="#F2A93C" />
                <circle cx="170" cy="310" r="3" fill="#F2A93C" />
                <circle cx="30" cy="170" r="3" fill="#F2A93C" />
                <circle cx="310" cy="170" r="3" fill="#F2A93C" />
                <circle cx="66" cy="66" r="2.4" fill="#CBA135" />
                <circle cx="274" cy="66" r="2.4" fill="#CBA135" />
                <circle cx="66" cy="274" r="2.4" fill="#CBA135" />
                <circle cx="274" cy="274" r="2.4" fill="#CBA135" />
              </g>
            </g>
          </svg>
          <div className="flame-glow"></div>
        </div>

        {/* Petals */}
        {accepted &&
          petals.map((p) => (
            <div
              key={p.id}
              className={`petal ${p.isGold ? "gold" : ""}`}
              style={
                {
                  left: `${p.left}vw`,
                  width: p.size,
                  height: p.size,
                  "--drift": p.drift,
                  "--spin": p.spin,
                  animation: `fall ${p.duration} ease-in ${p.delay} forwards`,
                } as React.CSSProperties
              }
            />
          ))}

        <div className={`reveal ${showReveal ? "show" : ""}`} id="reveal">
          <p className="r-eyebrow">Shubh Aagman</p>
          <p className="r-msg" id="revealMsg">Your presence will make our celebration complete.</p>
          <svg viewBox="0 0 120 14" aria-hidden="true"><path className="underline-path" d="M2,7 C30,-2 90,16 118,7" fill="none" stroke="#CBA135" strokeWidth="1.4" /></svg>
        </div>
      </div>

      <AmbientLayer dust={6} petals={2} />
    </section>
  );
}

