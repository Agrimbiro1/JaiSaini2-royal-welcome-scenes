import { useEffect, useRef, useState } from "react";
import { wedding } from "../data/wedding";
import { usePrefersReducedMotion } from "../engine/SceneProvider";
import { AmbientLayer, WarmGlow } from "../ui/Ambient";
import countdownGardenBg from "/assets/countdown-garden-background.png";
import { Calendar, MapPin, Sparkles } from "lucide-react";

interface TimeUnits {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  over: boolean;
}

function getRemainingTime(targetMs: number): TimeUnits {
  const diff = Math.max(0, targetMs - Date.now());
  return {
    over: diff === 0,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

interface FlipTileProps {
  value: number;
  labelEn: string;
  labelHi: string;
}

function FlipTile({ value, labelEn, labelHi }: FlipTileProps) {
  const reduced = usePrefersReducedMotion();
  const [displayVal, setDisplayVal] = useState(value);
  const [nextVal, setNextVal] = useState(value);
  const [isFlipping, setIsFlipping] = useState(false);
  const animatingValRef = useRef<number | null>(null);

  useEffect(() => {
    if (value === displayVal || value === animatingValRef.current) {
      return;
    }

    if (reduced) {
      setDisplayVal(value);
      setNextVal(value);
      return;
    }

    animatingValRef.current = value;
    setNextVal(value);
    setIsFlipping(true);

    const timer = setTimeout(() => {
      setDisplayVal(value);
      setIsFlipping(false);
      animatingValRef.current = null;
    }, 500);

    return () => clearTimeout(timer);
  }, [value, displayVal, reduced]);

  return (
    <div className="pillar group">
      <div className="capital" />
      <div className={`flip ${isFlipping ? "do-flip" : ""}`}>
        <div className="inner">
          <div className="face front">
            <span className="digit-glow">{pad(displayVal)}</span>
          </div>
          <div className="face back">
            <span className="digit-glow">{pad(nextVal)}</span>
          </div>
        </div>
      </div>
      <div className="unit-label">
        <span className="en">{labelEn}</span>
        <span className="hi">{labelHi}</span>
      </div>
      <div className="shaft" />
      <div className="base" />
    </div>
  );
}

export default function CountdownScene() {
  const reduced = usePrefersReducedMotion();

  const targetDateMs = new Date(wedding.countdown.date).getTime();
  const [time, setTime] = useState<TimeUnits>(() => getRemainingTime(targetDateMs));

  // Live 1-second ticker
  useEffect(() => {
    const interval = window.setInterval(() => {
      setTime(getRemainingTime(targetDateMs));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [targetDateMs]);

  // Petals for countdown completion
  const [petals, setPetals] = useState<Array<{ id: number; left: number; drift: string; spin: string; duration: string; delay: string; isGold: boolean }>>([]);

  useEffect(() => {
    if (time.over && !reduced) {
      const newPetals = [];
      for (let i = 0; i < 28; i++) {
        newPetals.push({
          id: i,
          left: Math.random() * 100,
          drift: `${(Math.random() * 140 - 70).toFixed(0)}px`,
          spin: `${(Math.random() * 540 - 270).toFixed(0)}deg`,
          duration: `${(2.6 + Math.random() * 2.2).toFixed(2)}s`,
          delay: `${(Math.random() * 1.2).toFixed(2)}s`,
          isGold: Math.random() > 0.5,
        });
      }
      setPetals(newPetals);
    }
  }, [time.over, reduced]);

  // Garland beads along SVG cubic curve path
  const garlandPathD = "M20,6 C100,50 140,50 220,6 C300,50 340,50 420,6 C500,50 540,50 620,6";
  const [beads, setBeads] = useState<Array<{ cx: number; cy: number; r: number; fill: string; delay: string }>>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const svgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    svgPath.setAttribute("d", garlandPathD);
    const totalLen = svgPath.getTotalLength() || 640;
    const beadCount = 26;
    const computedBeads = [];

    for (let i = 0; i <= beadCount; i++) {
      const pt = svgPath.getPointAtLength((totalLen * i) / beadCount);
      computedBeads.push({
        cx: pt.x,
        cy: pt.y,
        r: i % 3 === 0 ? 3.4 : 2.6,
        fill: i % 2 === 0 ? "#F2A93C" : "#CBA135",
        delay: `${(Math.random() * 2).toFixed(2)}s`,
      });
    }
    setBeads(computedBeads);
  }, []);

  // Clockwise hands angles for Standalone Analog Clock
  const cwSeconds = (60 - (time.seconds % 60)) % 60;
  const cwMinutes = (60 - (time.minutes % 60)) % 60;
  const cwHours = (12 - (time.hours % 12)) % 12;

  // Google Calendar Link generator
  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`${wedding.couple.bride} & ${wedding.couple.groom}'s Royal Wedding`);
    const details = encodeURIComponent(`You are cordially invited to celebrate the auspicious wedding union of ${wedding.couple.brideFull || wedding.couple.bride} & ${wedding.couple.groomFull || wedding.couple.groom}. Venue: ${wedding.couple.venue || "Jaipur, Rajasthan"}`);
    const location = encodeURIComponent(wedding.couple.venue || "Umaid Bhawan Palace, Jodhpur, Rajasthan");
    const dates = "20261128T113000Z/20261128T183000Z";
    const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
    window.open(googleUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="shubh-muhurat-root relative w-full h-full min-h-screen max-h-none sm:max-h-screen overflow-y-auto sm:overflow-hidden flex flex-col items-center justify-between py-2 sm:py-4 px-3 sm:px-4 select-none">
      <style>{`
        .shubh-muhurat-root {
          --maroon: #3E0C1B;
          --maroon-deep: #20040E;
          --maroon-mid: #681730;
          --gold: #CBA135;
          --gold-light: #F1DEC0;
          --ivory: #FFFDF8;
          --ink: #331019;
          --teal: #0F6B62;
          --teal-light: #4FA89B;
          --marigold: #E2790E;
          --marigold-2: #F2A93C;

          background: radial-gradient(120% 140% at 50% -10%, #5E142B 0%, var(--maroon) 45%, var(--maroon-deep) 100%);
          font-family: 'Rajdhani', sans-serif;
          color: var(--ivory);
          isolation: isolate;
        }

        .shubh-muhurat-root .jaali {
          position: absolute; inset: 0; opacity: 0.08;
          background-image:
            linear-gradient(45deg, var(--gold) 1px, transparent 1px),
            linear-gradient(-45deg, var(--gold) 1px, transparent 1px);
          background-size: 32px 32px;
          mask-image: radial-gradient(120% 100% at 50% 20%, black 30%, transparent 80%);
          pointer-events: none;
        }

        /* Header Styles */
        .shubh-muhurat-root .head {
          position: relative;
          text-align: center;
          max-width: 620px;
          z-index: 2;
          margin-top: 14px;
          padding: 0 8px;
        }

        .shubh-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 3px 14px;
          border-radius: 999px;
          background: rgba(203, 161, 53, 0.15);
          border: 1px solid rgba(203, 161, 53, 0.5);
          color: #F8E7CD;
          font-family: 'Cinzel', serif;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          box-shadow: 0 0 16px rgba(203, 161, 53, 0.2);
          margin-bottom: 4px;
        }

        .shubh-muhurat-root .head h1 {
          font-family: 'Cinzel', serif; font-weight: 700; font-size: 22px; letter-spacing: 0.12em; text-transform: uppercase; color: var(--ivory); margin: 0 0 2px; line-height: 1.15;
          text-shadow: 0 2px 10px rgba(0,0,0,0.6);
        }

        .shubh-shloka {
          font-family: 'Cormorant_Garamond', serif;
          font-style: italic;
          font-size: 13px;
          color: #EAD59A;
          letter-spacing: 0.3px;
          max-width: 520px;
          margin: 0 auto;
          line-height: 1.35;
          opacity: 0.92;
        }

        @media (min-width: 640px) {
          .shubh-muhurat-root .head { margin-top: 4px; }
          .shubh-badge { font-size: 12px; padding: 4px 18px; }
          .shubh-muhurat-root .head h1 { font-size: 32px; }
          .shubh-shloka { font-size: 15px; }
        }

        /* Center Body */
        .countdown-body-center {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          margin: auto 0;
          z-index: 2;
        }

        /* Standalone Analog Celestial Clock Dial */
        .standalone-clock-wrap {
          position: relative;
          z-index: 3;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .analog-clock-dial {
          position: relative;
          width: 105px;
          height: 105px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d4af37, #fef08a, #854d0e);
          padding: 4px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.85), inset 0 2px 6px rgba(255,255,255,0.6), 0 0 22px rgba(203,161,53,0.4);
          transition: transform 0.3s ease;
        }

        @media (min-width: 640px) {
          .analog-clock-dial {
            width: 125px;
            height: 125px;
            padding: 5px;
          }
          .standalone-clock-wrap {
            margin-bottom: 10px;
          }
        }

        .analog-clock-dial:hover {
          transform: scale(1.04);
        }

        .analog-clock-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle, #FFFDF5 0%, #FAF0D8 65%, #F0DDB3 100%);
          border: 2px solid #6E1B34;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 0 14px rgba(110,27,52,0.3);
          overflow: hidden;
        }

        /* Mandap Layout */
        .mandap { position: relative; width: min(580px, 100%); z-index: 2; margin-bottom: 6px; }
        .finial { position: absolute; top: -16px; left: 50%; transform: translateX(-50%); width: 22px; height: 22px; }

        .canopy { width: 100%; height: 32px; display: block; overflow: visible; }
        .garland { width: 100%; height: 36px; display: block; margin-top: -10px; }

        .garland .bead { animation: twinkle 2.6s ease-in-out infinite; }
        @keyframes twinkle { 0%,100%{ opacity: 0.55; } 50%{ opacity: 1; } }
        @keyframes garlandSway { 0%,100%{ transform: rotate(-0.6deg); } 50%{ transform: rotate(0.6deg); } }
        .garland-wrap.animate .garland { animation: garlandSway 5s ease-in-out infinite; transform-origin: 50% 0%; }

        .pillars {
          display: flex; justify-content: space-between; align-items: flex-start;
          padding: 0 4px; margin-top: 1px;
        }
        .pillar { display: flex; flex-direction: column; align-items: center; width: 23.5%; }

        .capital {
          width: 0; height: 0; margin-bottom: 3px;
          border-left: 7px solid transparent; border-right: 7px solid transparent; border-bottom: 7px solid var(--gold);
          opacity: 0.9;
        }

        .flip { position: relative; width: 100%; max-width: 86px; height: 52px; perspective: 320px; }
        
        @media (min-width: 640px) {
          .flip { height: 60px; max-width: 96px; }
          .capital { border-left-width: 9px; border-right-width: 9px; border-bottom-width: 9px; }
        }

        .flip .inner { position: absolute; inset: 0; transform-style: preserve-3d; }
        .flip.do-flip .inner { animation: singleCardFlip 0.5s cubic-bezier(.45,.05,.2,1) forwards; }

        @keyframes singleCardFlip {
          0% { transform: rotateX(0deg); }
          100% { transform: rotateX(-180deg); }
        }

        .flip .face {
          position: absolute; inset: 0; backface-visibility: hidden;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(180deg, #FFFDF8 0%, #F8ECCD 60%, #EED9AA 100%);
          border-radius: 8px;
          box-shadow: 0 8px 20px -6px rgba(0,0,0,0.7), inset 0 1px 2px rgba(255,255,255,0.9), 0 0 0 1.5px rgba(203,161,53,0.6);
          font-family: 'Cinzel', serif; font-weight: 700; font-size: 22px; color: var(--maroon-mid);
        }
        .flip .back { transform: rotateX(180deg); }
        .flip::after {
          content: ""; position: absolute; left: 0; right: 0; top: 50%; height: 1px;
          background: rgba(62,12,27,0.25); z-index: 2; pointer-events: none;
        }

        .digit-glow {
          text-shadow: 0 1px 1px rgba(255,255,255,0.8);
        }

        .unit-label { margin-top: 4px; text-align: center; }
        .unit-label .en {
          display: block; font-family: 'Cinzel', serif; font-weight: 700; font-size: 10px;
          letter-spacing: 0.16em; text-transform: uppercase; color: var(--gold-light);
        }
        .unit-label .hi {
          display: block; font-family: 'Cormorant_Garamond', serif; font-style: italic; font-weight: 600; font-size: 12px;
          color: #92E3D4; margin-top: 0.5px;
        }

        @media (min-width: 640px) {
          .flip .face { font-size: 26px; }
          .unit-label .en { font-size: 11.5px; }
          .unit-label .hi { font-size: 13.5px; }
        }

        .shaft { width: 2px; flex: 1; min-height: 10px; margin-top: 4px; background: linear-gradient(180deg, var(--gold), rgba(203,161,53,0.2)); }
        .base { width: 28px; height: 4px; background: var(--gold); opacity: 0.85; border-radius: 2px; margin-top: 2px; }
        .plinth { width: 100%; height: 2px; background: linear-gradient(90deg, transparent, var(--gold), transparent); margin-top: 2px; opacity: 0.7; }

        /* Dual Auspicious Diya Lamps - Perfectly aligned with outer pillars */
        .diya-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 8px;
          width: 100%;
          padding: 0 16px;
        }
        .diya { position: relative; width: 44px; height: 30px; flex-shrink: 0; }
        .diya .oil {
          position: absolute; bottom: 0; left: 0; right: 0; height: 12px;
          background: linear-gradient(180deg, var(--gold), #8a6a1f);
          border-radius: 0 0 24px 24px / 0 0 12px 12px;
          clip-path: ellipse(50% 100% at 50% 100%);
        }
        .diya .flame {
          position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);
          width: 8px; height: 14px;
          background: radial-gradient(circle at 50% 70%, #FFE9B0, var(--marigold-2) 55%, var(--marigold) 90%);
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          filter: blur(0.2px);
          animation: flicker 1.6s ease-in-out infinite;
        }
        .diya .glow {
          position: absolute; bottom: 4px; left: 50%; transform: translateX(-50%);
          width: 46px; height: 46px; border-radius: 50%;
          background: radial-gradient(circle, rgba(242,169,60,0.6), transparent 70%);
          filter: blur(3px);
          animation: glowPulse 2.4s ease-in-out infinite;
        }

        @keyframes flicker {
          0%,100%{ transform: translateX(-50%) scaleY(1) rotate(0deg); }
          30%{ transform: translateX(-50%) scaleY(1.08) rotate(-2deg); }
          60%{ transform: translateX(-50%) scaleY(0.95) rotate(2deg); }
        }
        @keyframes glowPulse {
          0%,100%{ opacity: 0.7; transform: translateX(-50%) scale(1); }
          50%{ opacity: 1; transform: translateX(-50%) scale(1.08); }
        }

        /* Auspicious Muhurat Details Card */
        .muhurat-badge-card {
          position: relative;
          z-index: 3;
          margin-top: 4px;
          padding: 8px 16px;
          border-radius: 12px;
          background: rgba(32, 4, 14, 0.65);
          border: 1px solid rgba(203, 161, 53, 0.4);
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.5);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          max-width: 440px;
          width: 100%;
        }

        .save-date-btn {
          margin-top: 8px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: 'Cinzel', serif;
          font-weight: 700;
          font-size: 10.5px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #3E0C1B;
          background: linear-gradient(135deg, #FDF3E3 0%, #E6CA85 100%);
          border: 1.5px solid #CBA135;
          padding: 10px 22px;
          border-radius: 999px;
          cursor: pointer;
          box-shadow: 0 4px 14px rgba(0,0,0,0.4), 0 0 10px rgba(203,161,53,0.3);
          transition: all 0.25s ease;
        }

        @media (min-width: 640px) {
          .save-date-btn {
            font-size: 11px;
            padding: 12px 26px;
          }
        }

        .save-date-btn:hover {
          transform: translateY(-1.5px) scale(1.02);
          background: #CBA135;
          color: #FFFDF8;
          box-shadow: 0 6px 18px rgba(0,0,0,0.6), 0 0 16px rgba(203,161,53,0.5);
        }

        /* Complete Reveal */
        .complete-reveal {
          position: relative; z-index: 2;
          text-align: center; max-width: 480px;
          margin-top: 14px;
          opacity: 0; transform: translateY(10px);
          transition: opacity 0.7s ease, transform 0.7s ease;
          pointer-events: none;
        }
        .complete-reveal.show { opacity: 1; transform: translateY(0); pointer-events: auto; }
        .complete-reveal .r-eyebrow { font-family: 'Cinzel', serif; font-weight: 700; font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold-light); margin: 0 0 8px; }
        .complete-reveal .r-msg { font-family: 'Cormorant_Garamond', serif; font-style: italic; font-weight: 600; font-size: 26px; color: var(--ivory); margin: 0; }

        .mandap.hidden { display: none; }

        /* Petal Rain */
        .petal {
          position: fixed; top: -24px; width: 14px; height: 14px;
          background: linear-gradient(135deg, var(--marigold-2), var(--marigold));
          border-radius: 0% 60% 0% 60%;
          opacity: 0.95; pointer-events: none; z-index: 50;
        }
        .petal.gold { background: linear-gradient(135deg, var(--gold-light), var(--gold)); }
        @keyframes fall {
          0%{ transform: translate(0,-10px) rotate(0deg); opacity: 0; }
          8%{ opacity: 1; }
          100%{ transform: translate(var(--drift), 620px) rotate(var(--spin)); opacity: 0.15; }
        }

        @media (max-width: 480px) {
          .shubh-muhurat-root {
            padding-bottom: 74px !important;
          }
          .shubh-muhurat-root .head h1 { font-size: 20px; }
          .flip { height: 48px; }
          .flip .face { font-size: 19px; }
          .pillar { width: 23.5%; }
          .analog-clock-dial { width: 95px; height: 95px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .flip .inner { transition: none; }
          .garland .bead, .garland-wrap.animate .garland, .diya .flame, .diya .glow, .petal { animation: none !important; }
        }
      `}</style>

      {/* Background Image Layer */}
      <img
        src={countdownGardenBg}
        alt="Royal Garden Background"
        aria-hidden="true"
        className="fixed inset-0 w-full h-full object-cover object-center opacity-35 scale-105 pointer-events-none z-0"
      />
      <div className="jaali" aria-hidden="true" />
      <WarmGlow className="left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-25 pointer-events-none" />

      {/* Top Header Section */}
      <div className="head">
        <div className="shubh-badge">
          <span>✦</span>
          <span>शुभ लग्न मुहूर्त</span>
          <span>✦</span>
        </div>
        <h1>Counting Down to Forever</h1>
        <p className="shubh-shloka">
          {wedding.couple.shloka || "मङ्गलम् भगवान् विष्णुः, मङ्गलम् गरुडध्वजः। मङ्गलम् पुण्डरीकाक्षः, मङ्गलाय तनो हरिः॥"}
        </p>
      </div>

      {/* Countdown Center Body (Watch, Mandap Canopy, Timer, Diya & Reveal) */}
      <div className="countdown-body-center">
        {/* Celestial Royal Heirloom Analog Clock Dial */}
        <div className="standalone-clock-wrap" title="Celestial Muhurat Timepiece">
          <div className="analog-clock-dial">
            <div className="analog-clock-inner">
              <svg viewBox="0 0 200 200" className="w-full h-full text-[#451a03]">
                {/* Outer Celestial Gold Ring */}
                <circle cx="100" cy="100" r="92" stroke="#CBA135" strokeWidth="1.8" fill="none" opacity="0.6" />
                <circle cx="100" cy="100" r="86" stroke="#6E1B34" strokeWidth="0.8" fill="none" opacity="0.5" />

                {/* Roman Numerals */}
                <text x="100" y="32" textAnchor="middle" fontSize="16" fontFamily="Cinzel, serif" fontWeight="bold" fill="#3b1502">
                  XII
                </text>
                <text x="172" y="106" textAnchor="middle" fontSize="15" fontFamily="Cinzel, serif" fontWeight="bold" fill="#3b1502">
                  III
                </text>
                <text x="100" y="180" textAnchor="middle" fontSize="16" fontFamily="Cinzel, serif" fontWeight="bold" fill="#3b1502">
                  VI
                </text>
                <text x="28" y="106" textAnchor="middle" fontSize="15" fontFamily="Cinzel, serif" fontWeight="bold" fill="#3b1502">
                  IX
                </text>

                {/* Minute Ticks */}
                {Array.from({ length: 60 }, (_, i) => {
                  const angle = i * 6;
                  const isMajor = i % 5 === 0;
                  return (
                    <line
                      key={i}
                      x1="100"
                      y1={isMajor ? "12" : "14"}
                      x2="100"
                      y2={isMajor ? "20" : "17"}
                      stroke={isMajor ? "#8C2338" : "#A37326"}
                      strokeWidth={isMajor ? "2" : "0.9"}
                      opacity={isMajor ? "0.9" : "0.5"}
                      transform={`rotate(${angle} 100 100)`}
                    />
                  );
                })}

                {/* Rotating Astrological Gear */}
                <g opacity="0.25" style={{ transformOrigin: "100px 100px", transform: `rotate(${cwSeconds * 6}deg)` }}>
                  <circle cx="100" cy="100" r="32" stroke="#78350f" strokeWidth="1.8" strokeDasharray="5 3" fill="none" />
                  <path d="M100 70 L100 130 M70 100 L130 100" stroke="#78350f" strokeWidth="1" />
                </g>

                {/* Hour Hand */}
                <line
                  x1="100"
                  y1="100"
                  x2="100"
                  y2="58"
                  stroke="#3b1502"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  style={{
                    transformOrigin: "100px 100px",
                    transform: `rotate(${(cwHours + cwMinutes / 60) * 30}deg)`,
                  }}
                />

                {/* Minute Hand */}
                <line
                  x1="100"
                  y1="100"
                  x2="100"
                  y2="40"
                  stroke="#6E1B34"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{
                    transformOrigin: "100px 100px",
                    transform: `rotate(${cwMinutes * 6}deg)`,
                  }}
                />

                {/* Second Hand */}
                <line
                  x1="100"
                  y1="110"
                  x2="100"
                  y2="26"
                  stroke="#b91c1c"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  style={{
                    transformOrigin: "100px 100px",
                    transform: `rotate(${cwSeconds * 6}deg)`,
                    transition: "transform 0.15s cubic-bezier(0.4, 2.08, 0.55, 0.44)",
                  }}
                />

                {/* Center Pivot */}
                <circle cx="100" cy="100" r="5.5" fill="#ca8a04" stroke="#451a03" strokeWidth="1.5" />
                <circle cx="100" cy="100" r="2" fill="#fef08a" />
              </svg>
            </div>
          </div>
        </div>

        {/* Royal Mandap Timer */}
        <div className={`mandap ${time.over ? "hidden" : ""}`}>
          <svg className="finial" viewBox="0 0 26 26" aria-hidden="true">
            <circle cx="13" cy="16" r="7" fill="#CBA135" />
            <path d="M13,2 C9,7 9,11 13,14 C17,11 17,7 13,2 Z" fill="#8C2338" />
          </svg>

          <svg className="canopy" viewBox="0 0 640 44" preserveAspectRatio="none" aria-hidden="true">
            <path
              d="M0,40 Q80,2 160,40 Q240,2 320,40 Q400,2 480,40 Q560,2 640,40"
              fill="none"
              stroke="#CBA135"
              strokeWidth="2.4"
            />
            <path
              d="M0,40 Q80,10 160,40 Q240,10 320,40 Q400,10 480,40 Q560,10 640,40"
              fill="none"
              stroke="#8C2338"
              strokeWidth="1"
              opacity="0.7"
            />
          </svg>

          <div className="garland-wrap animate">
            <svg className="garland" viewBox="0 0 640 46" preserveAspectRatio="none" aria-hidden="true">
              <path
                d={garlandPathD}
                fill="none"
                stroke="#8a5a1f"
                strokeWidth="1"
                opacity="0.5"
              />
              {beads.map((b, idx) => (
                <circle
                  key={idx}
                  cx={b.cx}
                  cy={b.cy}
                  r={b.r}
                  fill={b.fill}
                  className="bead"
                  style={{ animationDelay: b.delay }}
                />
              ))}
            </svg>
          </div>

          {/* Pillars & Independent 3D Flip Card Tiles */}
          <div className="pillars">
            <FlipTile value={time.days} labelEn="Days" labelHi="दिवस" />
            <FlipTile value={time.hours} labelEn="Hours" labelHi="प्रहर" />
            <FlipTile value={time.minutes} labelEn="Minutes" labelHi="घटी" />
            <FlipTile value={time.seconds} labelEn="Seconds" labelHi="पल" />
          </div>

          <div className="plinth" />

          {/* Twin Diya Lamps perfectly aligned with outer pillars */}
          <div className="diya-row">
            <div className="diya" title="Auspicious Diya">
              <div className="glow" />
              <div className="oil" />
              <div className="flame" />
            </div>

            <div className="flex items-center justify-center gap-2 text-[#F1DEC0] text-xs sm:text-sm font-['Cormorant_Garamond',serif] italic opacity-90 px-3.5 py-0.5 rounded-full bg-[#20040E]/60 border border-[#CBA135]/35 shadow-xs mx-auto">
              <span className="text-[#CBA135] text-xs">𑁍</span>
              <span>Saat Phere & Sacred Vows</span>
              <span className="text-[#CBA135] text-xs">𑁍</span>
            </div>

            <div className="diya" title="Auspicious Diya">
              <div className="glow" />
              <div className="oil" />
              <div className="flame" />
            </div>
          </div>
        </div>

        {/* Sacred Muhurat Milestone Badge & Save Date Action */}
        <div className="muhurat-badge-card">
          <div className="flex items-center justify-center gap-3 text-xs sm:text-sm text-[#FDF3E3]">
            <span className="flex items-center gap-1 font-['Cinzel',serif] font-bold text-[#CBA135]">
              <Calendar className="w-3.5 h-3.5" />
              {wedding.couple.weddingDate || wedding.countdown.displayDate}
            </span>
            <span className="text-[#CBA135]/60">•</span>
            <span className="flex items-center gap-1 font-['Cormorant_Garamond',serif] italic text-[#EAD59A]">
              <MapPin className="w-3.5 h-3.5 text-[#CBA135]" />
              {wedding.couple.venue ? "Umaid Bhawan Palace, Jodhpur" : "Jaipur, Rajasthan"}
            </span>
          </div>

          <button
            type="button"
            onClick={handleAddToCalendar}
            className="save-date-btn"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8C2338]" />
            Save The Auspicious Date
          </button>
        </div>

        {/* Complete Reveal State */}
        <div className={`complete-reveal ${time.over ? "show" : ""}`}>
          <p className="r-eyebrow">✦ शुभ लग्न मुहूर्त ✦</p>
          <p className="r-msg">The blessed moment has arrived — May love & joy reign forever!</p>
        </div>
      </div>

      {/* Falling Petals when completed */}
      {petals.map((p) => (
        <div
          key={p.id}
          className={`petal ${p.isGold ? "gold" : ""}`}
          style={{
            left: `${p.left}vw`,
            "--drift": p.drift,
            "--spin": p.spin,
            animation: `fall ${p.duration} ease-in ${p.delay} forwards`,
          } as React.CSSProperties}
        />
      ))}

      <p className="sr-only" role="status" aria-live="polite">
        {time.over
          ? "The countdown has ended."
          : `${time.days} days, ${time.hours} hours, ${time.minutes} minutes, ${time.seconds} seconds until the wedding.`}
      </p>

      <AmbientLayer dust={8} petals={8} />
    </section>
  );
}
