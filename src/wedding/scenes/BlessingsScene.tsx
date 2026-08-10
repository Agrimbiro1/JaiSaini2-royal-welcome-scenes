import { useEffect, useRef, useState, FormEvent } from "react";
import Lenis from "lenis";
import { wedding, type Blessing } from "../data/wedding";
import { usePrefersReducedMotion } from "../engine/SceneProvider";
import { AmbientLayer } from "../ui/Ambient";

interface TagItem extends Blessing {
  id: string;
}

interface Spark {
  id: number;
  tx: string;
  ty: string;
}

const initialBlessingsList: Blessing[] = [
  ...wedding.blessings,
  { guestName: "Dadi Maa", message: "May your bond grow deeper with every sunrise." },
  { guestName: "Chacha & Chachi", message: "Wishing you a lifetime of laughter, love and good health." },
  { guestName: "Nani", message: "Blessed to witness this beautiful beginning." },
  { guestName: "Rohan Bhaiya", message: "Here's to forever starting today. Cheers to you both!" },
  { guestName: "Foi Ba", message: "May your home always be full of warmth and prosperity." },
];

export default function BlessingsScene() {
  const reduced = usePrefersReducedMotion();

  const [blessings, setBlessings] = useState<TagItem[]>(() =>
    initialBlessingsList.map((b, idx) => ({
      ...b,
      id: `blessing-${idx}-${Date.now()}`,
    }))
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);
  const [swapDir, setSwapDir] = useState<"left" | "right">("left");
  const [isSwapping, setIsSwapping] = useState(false);

  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [formStatus, setFormStatus] = useState("");
  const [sparks, setSparks] = useState<Spark[]>([]);

  const nameInputRef = useRef<HTMLInputElement>(null);

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Automatic Carousel loop (swaps left every 3.5 seconds)
  useEffect(() => {
    if (!isAutoPlaying || reduced || blessings.length <= 1) return;

    const interval = setInterval(() => {
      triggerSwap("left", (prev) => (prev + 1) % blessings.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [isAutoPlaying, blessings.length, reduced]);

  const triggerSwap = (dir: "left" | "right", getNextIndex: (prev: number) => number) => {
    setSwapDir(dir);
    setIsSwapping(true);
    setActiveIndex(getNextIndex);
    setTimeout(() => setIsSwapping(false), 650);
  };

  const goNext = () => {
    triggerSwap("left", (prev) => (prev + 1) % blessings.length);
  };

  const goPrev = () => {
    triggerSwap("right", (prev) => (prev - 1 + blessings.length) % blessings.length);
  };

  const triggerSparkles = () => {
    const newSparks: Spark[] = [];
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.3;
      const dist = 26 + Math.random() * 20;
      newSparks.push({
        id: Math.random() + i,
        tx: (Math.cos(angle) * dist).toFixed(1) + "px",
        ty: (Math.sin(angle) * dist).toFixed(1) + "px",
      });
    }
    setSparks(newSparks);
    setTimeout(() => setSparks([]), 1000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMsg = msg.trim();

    if (!trimmedName || !trimmedMsg) {
      setFormStatus("Please add your name and a blessing before sending.");
      return;
    }

    const newBlessing: TagItem = {
      id: `blessing-${Date.now()}`,
      guestName: trimmedName,
      message: trimmedMsg,
    };

    setBlessings((prev) => [newBlessing, ...prev]);
    triggerSwap("left", () => 0);
    setFormStatus(`Thank you, ${trimmedName}. Your blessing has been added!`);
    setName("");
    setMsg("");
    triggerSparkles();

    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  };

  const count = blessings.length;
  const prevIndex = (activeIndex - 1 + count) % count;
  const nextIndex = (activeIndex + 1) % count;

  const currentTag = blessings[activeIndex];
  const prevTag = blessings[prevIndex];
  const nextTag = blessings[nextIndex];

  return (
    <section className="toran-split-root relative w-full h-full min-h-screen overflow-x-hidden overflow-y-auto flex flex-col items-center p-4 sm:p-6 md:p-8 select-none">
      <style>{`
        .toran-split-root {
          --maroon: #430E1F;
          --maroon-deep: #2C0714;
          --maroon-mid: #6E1B34;
          --gold: #CBA135;
          --gold-light: #EAD59A;
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

        .toran-split-root .jaali {
          position: absolute; inset: 0;
          opacity: 0.10;
          background-image:
            linear-gradient(45deg, var(--gold) 1px, transparent 1px),
            linear-gradient(-45deg, var(--gold) 1px, transparent 1px);
          background-size: 34px 34px;
          mask-image: radial-gradient(120% 100% at 50% 20%, black 30%, transparent 78%);
          pointer-events: none;
        }

        .toran-split-root .head {
          position: relative;
          text-align: center;
          max-width: 560px;
          margin-bottom: 24px;
          z-index: 2;
        }
        .toran-split-root .head .eyebrow {
          font-family: 'Cinzel', 'Rajdhani', serif;
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--teal-light);
          margin: 0 0 8px;
        }
        .toran-split-root .head h2 {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-weight: 600;
          font-size: 34px;
          margin: 0 0 8px;
          color: var(--gold-light);
        }
        .toran-split-root .head p {
          font-family: 'Rajdhani', sans-serif;
          font-size: 15px;
          color: #d8c1af;
          margin: 0;
          line-height: 1.45;
        }

        /* Split Main Layout */
        .split-container {
          position: relative;
          width: min(1040px, 100%);
          display: flex;
          flex-direction: column;
          gap: 28px;
          z-index: 2;
          margin-bottom: 40px;
        }
        @media (min-width: 860px) {
          .split-container {
            flex-direction: row;
            align-items: flex-start;
          }
        }

        /* Left Side: Blessing Form */
        .form-side {
          width: 100%;
          max-width: 380px;
          margin: 0 auto;
          shrink: 0;
        }
        .bless-card-form {
          position: relative;
          background: linear-gradient(180deg, var(--ivory), #F5E7CC);
          color: var(--ink);
          border-radius: 16px;
          padding: 28px 24px 24px;
          box-shadow: 0 24px 48px -18px rgba(0,0,0,0.55), 0 0 0 1px rgba(203,161,53,0.4);
        }
        .bless-card-form h3 {
          font-family: 'Cinzel', serif;
          font-size: 15px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--maroon-mid);
          text-align: center;
          margin: 0 0 18px;
        }
        .field { margin-bottom: 14px; }
        .field label {
          display: block;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 5px;
        }
        .field input, .field textarea {
          width: 100%;
          font-family: 'Cormorant Garamond', serif;
          font-size: 16.5px;
          color: var(--ink);
          background: #fff;
          border: 1px solid rgba(203,161,53,0.5);
          border-radius: 8px;
          padding: 10px 12px;
          resize: vertical;
        }
        .field textarea { min-height: 76px; }
        .field input:focus, .field textarea:focus {
          outline: 2px solid var(--gold);
          outline-offset: 1px;
        }
        .char-count {
          text-align: right;
          font-size: 11px;
          color: #9a7a63;
          margin-top: 3px;
        }

        .send-btn {
          width: 100%;
          margin-top: 6px;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 700;
          font-size: 14px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--ivory);
          background: linear-gradient(180deg, var(--marigold-2), var(--marigold));
          border: none;
          padding: 13px 20px;
          border-radius: 999px;
          cursor: pointer;
          box-shadow: 0 10px 22px -8px rgba(226,121,14,0.6), inset 0 0 0 1px rgba(255,255,255,0.25);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .send-btn:hover { transform: translateY(-2px); }

        /* Right Side: Auto-Carousel moving left */
        .carousel-side {
          flex: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .right-header-bar {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 16px;
          padding: 0 4px;
        }

        .view-all-modal-btn {
          background: rgba(15, 107, 98, 0.35);
          border: 1px solid var(--gold);
          color: var(--gold-light);
          font-family: 'Rajdhani', sans-serif;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 7px 16px;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.25s ease;
          backdrop-blur: 4px;
        }
        .view-all-modal-btn:hover {
          background: var(--gold);
          color: var(--ink);
          transform: translateY(-2px);
        }

        /* 3D Auto Carousel with Swapping Animation */
        .auto-carousel-stage {
          position: relative;
          width: 100%;
          perspective: 1100px;
          height: 295px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .carousel-cards-track {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          transform-style: preserve-3d;
        }

        .auto-card-node {
          position: absolute;
          width: 250px;
          transform-style: preserve-3d;
          transition: transform 0.65s cubic-bezier(0.34, 1.45, 0.64, 1), opacity 0.65s ease, filter 0.65s ease, box-shadow 0.65s ease;
          cursor: pointer;
          will-change: transform, opacity;
        }

        /* Swapping positions */
        .auto-card-node.prev {
          transform: translateX(-190px) translateZ(-90px) rotateY(28deg) scale(0.83);
          opacity: 0.65;
          filter: brightness(0.78);
          z-index: 10;
        }

        .auto-card-node.current {
          transform: translateX(0px) translateZ(60px) rotateY(0deg) scale(1.06);
          opacity: 1;
          filter: brightness(1);
          z-index: 30;
        }

        .auto-card-node.next {
          transform: translateX(190px) translateZ(-90px) rotateY(-28deg) scale(0.83);
          opacity: 0.65;
          filter: brightness(0.78);
          z-index: 10;
        }

        /* Directional Swap Motion Keyframe Effects */
        .swapping-left .auto-card-node.current {
          animation: swapArcCenterFromRight 0.65s cubic-bezier(0.34, 1.45, 0.64, 1) forwards;
        }
        .swapping-left .auto-card-node.prev {
          animation: swapArcLeftFromCenter 0.65s cubic-bezier(0.34, 1.45, 0.64, 1) forwards;
        }

        .swapping-right .auto-card-node.current {
          animation: swapArcCenterFromLeft 0.65s cubic-bezier(0.34, 1.45, 0.64, 1) forwards;
        }
        .swapping-right .auto-card-node.next {
          animation: swapArcRightFromCenter 0.65s cubic-bezier(0.34, 1.45, 0.64, 1) forwards;
        }

        @keyframes swapArcCenterFromRight {
          0% { transform: translateX(190px) translateZ(-90px) rotateY(-28deg) scale(0.83); opacity: 0.65; z-index: 10; }
          40% { transform: translateX(90px) translateZ(0px) rotateY(-14deg) scale(0.95); opacity: 0.88; z-index: 25; }
          100% { transform: translateX(0px) translateZ(60px) rotateY(0deg) scale(1.06); opacity: 1; z-index: 30; }
        }

        @keyframes swapArcLeftFromCenter {
          0% { transform: translateX(0px) translateZ(60px) rotateY(0deg) scale(1.06); opacity: 1; z-index: 30; }
          60% { transform: translateX(-110px) translateZ(-30px) rotateY(15deg) scale(0.92); opacity: 0.8; z-index: 15; }
          100% { transform: translateX(-190px) translateZ(-90px) rotateY(28deg) scale(0.83); opacity: 0.65; z-index: 10; }
        }

        @keyframes swapArcCenterFromLeft {
          0% { transform: translateX(-190px) translateZ(-90px) rotateY(28deg) scale(0.83); opacity: 0.65; z-index: 10; }
          40% { transform: translateX(-90px) translateZ(0px) rotateY(14deg) scale(0.95); opacity: 0.88; z-index: 25; }
          100% { transform: translateX(0px) translateZ(60px) rotateY(0deg) scale(1.06); opacity: 1; z-index: 30; }
        }

        @keyframes swapArcRightFromCenter {
          0% { transform: translateX(0px) translateZ(60px) rotateY(0deg) scale(1.06); opacity: 1; z-index: 30; }
          60% { transform: translateX(110px) translateZ(-30px) rotateY(-15deg) scale(0.92); opacity: 0.8; z-index: 15; }
          100% { transform: translateX(190px) translateZ(-90px) rotateY(-28deg) scale(0.83); opacity: 0.65; z-index: 10; }
        }

        .toran-tag-card {
          position: relative;
          background: linear-gradient(180deg, var(--ivory), #F5E7CC);
          color: var(--ink);
          border-radius: 8px 8px 14px 14px;
          padding: 22px 18px 20px;
          text-align: center;
          box-shadow: 0 16px 32px -12px rgba(0,0,0,0.65), 0 0 0 1px rgba(203,161,53,0.5);
          transition: box-shadow 0.65s ease;
        }
        .toran-tag-card::before {
          content: "";
          position: absolute; top: -6px; left: 50%; transform: translateX(-50%);
          width: 9px; height: 9px;
          background: var(--gold);
          border-radius: 50%;
          box-shadow: 0 0 0 2px var(--ivory);
        }
        .toran-tag-card .leaf {
          width: 18px; height: 18px; margin: 0 auto 8px;
          display: block;
        }
        .toran-tag-card .b-name {
          font-family: 'Rajdhani', sans-serif;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--teal);
          margin: 0 0 6px;
        }
        .toran-tag-card .b-msg {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 17px;
          line-height: 1.42;
          color: #4a2a1f;
          margin: 0;
        }

        .auto-card-node.current .toran-tag-card {
          box-shadow: 0 22px 45px -10px rgba(0,0,0,0.75), 0 0 0 1.5px rgba(203,161,53,0.85), 0 0 25px rgba(203,161,53,0.3);
        }

        /* Controls below right carousel */
        .controls-bar {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 14px;
        }
        .ctrl-btn {
          background: rgba(15, 107, 98, 0.35);
          border: 1px solid rgba(203, 161, 53, 0.6);
          color: var(--gold-light);
          font-family: 'Rajdhani', sans-serif;
          font-size: 12.5px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          padding: 7px 16px;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .ctrl-btn:hover {
          background: rgba(15, 107, 98, 0.7);
          color: var(--ivory);
          border-color: var(--gold);
        }

        .pause-badge {
          font-size: 10px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #d8c1af;
          opacity: 0.7;
          margin-top: 6px;
        }

        /* Sparkle burst */
        .sparkle-layer {
          position: absolute;
          top: 50%; left: 50%;
          width: 0; height: 0;
          pointer-events: none;
          z-index: 40;
        }
        .spark {
          position: absolute;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--marigold-2);
          opacity: 0.95;
          animation: sparkBurst 0.9s ease-out forwards;
        }
        @keyframes sparkBurst {
          to {
            transform: translate(var(--tx), var(--ty)) scale(0.2);
            opacity: 0;
          }
        }

        .sr-only {
          position: absolute; width: 1px; height: 1px;
          padding: 0; margin: -1px; overflow: hidden;
          clip: rect(0,0,0,0); white-space: nowrap; border: 0;
        }

        @media (max-width: 640px) {
          .auto-card-node.prev { transform: translateX(-120px) scale(0.78); }
          .auto-card-node.next { transform: translateX(120px) scale(0.78); }
          .auto-card-node { width: 210px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .auto-card-node, .ctrl-btn, .view-all-modal-btn { transition: none !important; animation: none !important; }
          .spark { animation: none !important; }
        }
      `}</style>

      {/* Jaali background */}
      <div className="jaali" aria-hidden="true" />

      {/* Header */}
      <div className="head">
        <p className="eyebrow">आशीर्वाद</p>
        <h2>Blessings for the Journey Ahead</h2>
        <p>Family and friends have tied their wishes to our royal wishbook — add yours to the collection.</p>
      </div>

      {/* Split Container: Left Form | Right Auto-Carousel */}
      <div className="split-container">
        {/* Left Side: Blessing Form */}
        <div className="form-side">
          <form className="bless-card-form" onSubmit={handleSubmit} noValidate>
            <h3>Add Your Blessing</h3>

            <div className="field">
              <label htmlFor="bName">Your name</label>
              <input
                ref={nameInputRef}
                type="text"
                id="bName"
                maxLength={30}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Meera Aunty"
              />
            </div>

            <div className="field">
              <label htmlFor="bMsg">Your blessing</label>
              <textarea
                id="bMsg"
                maxLength={110}
                required
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                placeholder="Write a short wish for the couple..."
              />
              <div className="char-count">
                <span>{msg.length}</span>/110
              </div>
            </div>

            <button type="submit" className="send-btn">
              Send Blessing
            </button>

            <p className="sr-only" role="status" aria-live="polite">
              {formStatus}
            </p>
          </form>
        </div>

        {/* Right Side: Auto-Playing Carousel with Swapping Animation */}
        <div className="carousel-side">
          {/* Header Bar */}
          <div className="right-header-bar">
            <span className="font-sans text-xs tracking-widest text-[#EAD59A] uppercase font-semibold">
              Guest Wishes ({blessings.length})
            </span>
            <button
              type="button"
              className="view-all-modal-btn"
              onClick={() => setIsViewAllOpen(true)}
            >
              View All Blessings ✦
            </button>
          </div>

          {/* Auto-carousel Container (pauses on hover) */}
          <div
            className="auto-carousel-stage"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <div className={`carousel-cards-track ${isSwapping ? `swapping-${swapDir}` : ""}`}>
              {/* Previous Card */}
              {prevTag && (
                <div
                  className="auto-card-node prev"
                  onClick={goPrev}
                  title="Click to view previous blessing"
                >
                  <div className="toran-tag-card">
                    <svg className="leaf" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M10,1 C16,5 16,14 10,19 C4,14 4,5 10,1 Z" fill="#0F6B62" />
                      <path d="M10,3 L10,17" stroke="#EAD59A" strokeWidth="0.8" />
                    </svg>
                    <p className="b-name">{prevTag.guestName}</p>
                    <p className="b-msg">"{prevTag.message}"</p>
                  </div>
                </div>
              )}

              {/* Current Active Card */}
              {currentTag && (
                <div className="auto-card-node current">
                  {sparks.length > 0 && (
                    <div className="sparkle-layer">
                      {sparks.map((s) => (
                        <div
                          key={s.id}
                          className="spark"
                          style={{ "--tx": s.tx, "--ty": s.ty } as React.CSSProperties}
                        />
                      ))}
                    </div>
                  )}
                  <div className="toran-tag-card">
                    <svg className="leaf" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M10,1 C16,5 16,14 10,19 C4,14 4,5 10,1 Z" fill="#0F6B62" />
                      <path d="M10,3 L10,17" stroke="#EAD59A" strokeWidth="0.8" />
                    </svg>
                    <p className="b-name">{currentTag.guestName}</p>
                    <p className="b-msg">"{currentTag.message}"</p>
                  </div>
                </div>
              )}

              {/* Next Card */}
              {nextTag && (
                <div
                  className="auto-card-node next"
                  onClick={goNext}
                  title="Click to view next blessing"
                >
                  <div className="toran-tag-card">
                    <svg className="leaf" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M10,1 C16,5 16,14 10,19 C4,14 4,5 10,1 Z" fill="#0F6B62" />
                      <path d="M10,3 L10,17" stroke="#EAD59A" strokeWidth="0.8" />
                    </svg>
                    <p className="b-name">{nextTag.guestName}</p>
                    <p className="b-msg">"{nextTag.message}"</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="controls-bar">
            <button type="button" className="ctrl-btn" onClick={goPrev}>
              ← Previous
            </button>
            <span className="font-sans text-xs tracking-widest text-[#EAD59A] font-semibold">
              {activeIndex + 1} / {blessings.length}
            </span>
            <button type="button" className="ctrl-btn" onClick={goNext}>
              Next →
            </button>
          </div>

          <p className="pause-badge">
            {isAutoPlaying ? "• Swapping left automatically" : "• Paused (Hovering)"}
          </p>
        </div>
      </div>

      {/* Global Wishbook Pop-up Modal for View All Blessings */}
      {isViewAllOpen && (
        <div
          onClick={() => setIsViewAllOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2C0714]/85 backdrop-blur-md px-4 py-8 animate-in fade-in transition-all duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[85vh] bg-gradient-to-b from-[#FBF1DE] via-[#F5E7CC] to-[#EAD59A] text-[#331019] p-5 sm:p-7 rounded-lg border-2 border-[#CBA135] shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_30px_rgba(203,161,53,0.35)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 select-none"
          >
            {/* Corner Ornaments */}
            <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#0F6B62] rounded-tl-xs pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#0F6B62] rounded-tr-xs pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#0F6B62] rounded-bl-xs pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#0F6B62] rounded-br-xs pointer-events-none" />

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsViewAllOpen(false)}
              className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-[#331019]/10 border border-[#0F6B62]/40 text-[#6E1B34] hover:text-[#331019] hover:bg-[#331019]/20 flex items-center justify-center text-xs cursor-pointer transition-colors font-bold"
              aria-label="Close wishbook"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="relative z-10 text-center pb-3.5 border-b border-[#0F6B62]/30">
              <span className="font-['Cinzel',serif] text-[11px] uppercase tracking-[0.3em] font-bold text-[#0F6B62]">
                Royal Wishbook
              </span>
              <h2 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl font-semibold text-[#6E1B34] tracking-wide mt-0.5">
                All Guest Blessings ({blessings.length})
              </h2>
              <div className="w-16 h-[1.5px] bg-[#CBA135] mx-auto mt-2 opacity-80" />
            </div>

            {/* Scrollable Grid of All Blessings */}
            <div className="relative z-10 mt-4 flex-1 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {blessings.map((b, i) => (
                <div
                  key={b.id || i}
                  onClick={() => {
                    triggerSwap("left", () => i);
                    setIsViewAllOpen(false);
                  }}
                  className="p-4 rounded-md bg-[#FBF1DE] border border-[#CBA135]/60 shadow-sm flex flex-col justify-between hover:border-[#0F6B62] hover:shadow-md cursor-pointer transition-all"
                >
                  <p className="font-['Cormorant_Garamond',serif] text-sm sm:text-base italic leading-relaxed text-[#331019] font-medium">
                    "{b.message}"
                  </p>
                  <div className="mt-3 pt-2 border-t border-[#CBA135]/30 flex items-center justify-between">
                    <span className="text-[#CBA135] text-[10px]">✦</span>
                    <p className="font-['Rajdhani',sans-serif] text-[11px] uppercase tracking-[0.2em] font-bold text-[#0F6B62]">
                      — {b.guestName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <AmbientLayer dust={6} petals={2} />
    </section>
  );
}
