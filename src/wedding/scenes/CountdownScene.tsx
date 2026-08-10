import { useEffect, useRef, useState } from "react";
import { wedding } from "../data/wedding";
import { usePrefersReducedMotion } from "../engine/SceneProvider";
import { AmbientLayer } from "../ui/Ambient";
import countdownGardenBg from "/assets/countdown-garden-background.png";

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
    }, 520);

    return () => clearTimeout(timer);
  }, [value, displayVal, reduced]);

  return (
    <div className="pillar">
      <div className="capital" />
      <div className={`flip ${isFlipping ? "do-flip" : ""}`}>
        <div className="inner">
          <div className="face front">{pad(displayVal)}</div>
          <div className="face back">{pad(nextVal)}</div>
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
      for (let i = 0; i < 26; i++) {
        newPetals.push({
          id: i,
          left: Math.random() * 100,
          drift: `${(Math.random() * 140 - 70).toFixed(0)}px`,
          spin: `${(Math.random() * 540 - 270).toFixed(0)}deg`,
          duration: `${(2.6 + Math.random() * 2.2).toFixed(2)}s`,
          delay: `${(Math.random() * 1.2).toFixed(2)}s`,
          isGold: Math.random() > 0.6,
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

  return (
    <section className="shubh-muhurat-root relative w-full h-full min-h-screen overflow-x-hidden overflow-y-auto flex flex-col items-center p-4 sm:p-6 md:p-8 select-none">
      <style>{`
        .shubh-muhurat-root {
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

        .shubh-muhurat-root .jaali {
          position: absolute; inset: 0; opacity: 0.10;
          background-image:
            linear-gradient(45deg, var(--gold) 1px, transparent 1px),
            linear-gradient(-45deg, var(--gold) 1px, transparent 1px);
          background-size: 34px 34px;
          mask-image: radial-gradient(120% 100% at 50% 20%, black 30%, transparent 78%);
          pointer-events: none;
        }

        .shubh-muhurat-root .head {
          position: relative; text-align:center; max-width:540px; margin-bottom:16px; z-index:2;
        }
        .shubh-muhurat-root .head .eyebrow {
          font-family:'Cinzel', serif; font-size:12.5px; letter-spacing:4px; text-transform:uppercase; color:var(--teal-light); margin:0 0 8px;
        }
        .shubh-muhurat-root .head h2 {
          font-family:'Cormorant Garamond', serif; font-style:italic; font-weight:600; font-size:35px; margin:0 0 6px; color:var(--gold-light);
        }
        .shubh-muhurat-root .head p {
          font-family:'Rajdhani', sans-serif; font-size:14px; letter-spacing:1px; text-transform:uppercase; color:#d8c1af; margin:0;
        }

        /* Standalone Analog Clock Dial (Only the Clock Face) */
        .standalone-clock-wrap {
          position: relative;
          z-index: 3;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .analog-clock-dial {
          position: relative;
          width: 145px;
          height: 145px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ca8a04, #fef08a, #854d0e);
          padding: 5px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.85), inset 0 2px 6px rgba(255,255,255,0.5), 0 0 20px rgba(203,161,53,0.35);
          transition: transform 0.3s ease;
        }
        .analog-clock-dial:hover {
          transform: scale(1.04);
        }

        .analog-clock-inner {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: radial-gradient(circle, #fefce8 0%, #fef9c3 60%, #fef08a 100%);
          border: 2px solid #78350f;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 0 16px rgba(120,53,15,0.4);
          overflow: hidden;
        }

        /* Mandap Layout */
        .mandap { position:relative; width:min(640px, 100%); z-index:2; margin-bottom: 30px; }
        .finial { position:absolute; top:-22px; left:50%; transform:translateX(-50%); width:26px; height:26px; }

        .canopy { width:100%; height:44px; display:block; overflow:visible; }
        .garland { width:100%; height:46px; display:block; margin-top:-14px; }

        .garland .bead { animation: twinkle 2.6s ease-in-out infinite; }
        @keyframes twinkle { 0%,100%{ opacity:0.55; } 50%{ opacity:1; } }
        @keyframes garlandSway { 0%,100%{ transform: rotate(-0.6deg); } 50%{ transform: rotate(0.6deg); } }
        .garland-wrap.animate .garland { animation: garlandSway 5s ease-in-out infinite; transform-origin: 50% 0%; }

        .pillars {
          display:flex; justify-content:space-between; align-items:flex-start;
          padding: 0 6px; margin-top: 4px;
        }
        .pillar { display:flex; flex-direction:column; align-items:center; width:23%; }

        .capital {
          width:0; height:0; margin-bottom:6px;
          border-left:9px solid transparent; border-right:9px solid transparent; border-bottom:9px solid var(--gold);
          opacity:0.85;
        }

        .flip { position:relative; width:100%; max-width:96px; height:64px; perspective: 320px; }
        .flip .inner { position:absolute; inset:0; transform-style:preserve-3d; }
        .flip.do-flip .inner { animation: singleCardFlip 0.5s cubic-bezier(.45,.05,.2,1) forwards; }

        @keyframes singleCardFlip {
          0% { transform: rotateX(0deg); }
          100% { transform: rotateX(-180deg); }
        }

        .flip .face {
          position:absolute; inset:0; backface-visibility:hidden;
          display:flex; align-items:center; justify-content:center;
          background: linear-gradient(180deg, var(--ivory), #F5E7CC);
          border-radius: 8px;
          box-shadow: 0 10px 20px -10px rgba(0,0,0,0.55), 0 0 0 1px rgba(203,161,53,0.5);
          font-family:'Cinzel', serif; font-weight:700; font-size:26px; color:var(--maroon-mid);
        }
        .flip .back { transform: rotateX(180deg); }
        .flip::after {
          content:""; position:absolute; left:0; right:0; top:50%; height:1px;
          background: rgba(67,14,31,0.25); z-index:2; pointer-events:none;
        }

        .unit-label { margin-top:9px; text-align:center; }
        .unit-label .en {
          display:block; font-family:'Rajdhani', sans-serif; font-weight:700; font-size:11.5px;
          letter-spacing:2px; text-transform:uppercase; color:var(--gold-light);
        }
        .unit-label .hi {
          display:block; font-family:'Cormorant Garamond', serif; font-style:italic; font-size:13px;
          color: var(--teal-light); margin-top:2px;
        }

        .shaft { width:2px; flex:1; min-height:22px; margin-top:10px; background: linear-gradient(180deg, var(--gold), rgba(203,161,53,0.25)); }
        .base { width:34px; height:6px; background: var(--gold); opacity:0.85; border-radius:2px; margin-top:2px; }
        .plinth { width:100%; height:3px; background: linear-gradient(90deg, transparent, var(--gold), transparent); margin-top:2px; opacity:0.7; }

        /* Diyas */
        .diya-row { display:flex; justify-content:center; margin-top:18px; }
        .diya { position:relative; width:60px; height:40px; }
        .diya .oil {
          position:absolute; bottom:0; left:0; right:0; height:16px;
          background: linear-gradient(180deg, var(--gold), #8a6a1f);
          border-radius: 0 0 30px 30px / 0 0 16px 16px;
          clip-path: ellipse(50% 100% at 50% 100%);
        }
        .diya .flame {
          position:absolute; bottom:14px; left:50%; transform:translateX(-50%);
          width:10px; height:18px;
          background: radial-gradient(circle at 50% 70%, #FFE9B0, var(--marigold-2) 55%, var(--marigold) 90%);
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          filter: blur(0.2px);
          animation: flicker 1.6s ease-in-out infinite;
        }
        .diya .glow {
          position:absolute; bottom:8px; left:50%; transform:translateX(-50%);
          width:64px; height:64px; border-radius:50%;
          background: radial-gradient(circle, rgba(242,169,60,0.55), transparent 70%);
          filter: blur(3px);
          animation: glowPulse 2.4s ease-in-out infinite;
        }

        @keyframes flicker {
          0%,100%{ transform: translateX(-50%) scaleY(1) rotate(0deg); }
          30%{ transform: translateX(-50%) scaleY(1.08) rotate(-2deg); }
          60%{ transform: translateX(-50%) scaleY(0.95) rotate(2deg); }
        }
        @keyframes glowPulse {
          0%,100%{ opacity:0.7; transform: translateX(-50%) scale(1); }
          50%{ opacity:1; transform: translateX(-50%) scale(1.08); }
        }

        /* Complete Reveal */
        .complete-reveal {
          position: relative; z-index:2;
          text-align:center; max-width: 480px;
          margin-top: 30px;
          opacity: 0; transform: translateY(10px);
          transition: opacity 0.7s ease, transform 0.7s ease;
          pointer-events: none;
        }
        .complete-reveal.show { opacity:1; transform:translateY(0); pointer-events:auto; }
        .complete-reveal .r-eyebrow { font-family:'Cinzel', serif; font-size:12px; letter-spacing:3px; text-transform:uppercase; color:var(--gold-light); margin:0 0 8px; }
        .complete-reveal .r-msg { font-family:'Cormorant Garamond', serif; font-style:italic; font-size:28px; color:var(--ivory); margin:0; }

        .mandap.hidden { display:none; }

        /* Petal Rain */
        .petal {
          position: fixed; top:-24px; width:14px; height:14px;
          background: linear-gradient(135deg, var(--marigold-2), var(--marigold));
          border-radius: 0% 60% 0% 60%;
          opacity: 0.95; pointer-events:none; z-index:50;
        }
        .petal.gold { background: linear-gradient(135deg, var(--gold-light), var(--gold)); }
        @keyframes fall {
          0%{ transform: translate(0,-10px) rotate(0deg); opacity:0; }
          8%{ opacity:1; }
          100%{ transform: translate(var(--drift), 620px) rotate(var(--spin)); opacity:0.15; }
        }

        @media (max-width: 480px) {
          .shubh-muhurat-root .head h2 { font-size:30px; }
          .flip { height:54px; }
          .flip .face { font-size:21px; }
          .pillar { width:24%; }
          .analog-clock-dial { width: 120px; height: 120px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .flip .inner { transition:none; }
          .garland .bead, .garland-wrap.animate .garland, .diya .flame, .diya .glow, .petal { animation:none !important; }
        }
      `}</style>

      {/* Background Image Layer */}
      <img
        src={countdownGardenBg}
        alt="Royal Garden Background"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-40 scale-105 pointer-events-none"
      />
      <div className="jaali" aria-hidden="true" />

      {/* Header */}
      <div className="head">
        <p className="eyebrow">शुभ मुहूर्त</p>
        <h2>Counting Down to Forever</h2>
        <p id="targetLabel">{wedding.countdown.displayDate} · Jaipur, Rajasthan</p>
      </div>

      {/* Standalone Analog Clock Dial (Only Clock, No Box) Above the Timer */}
      <div className="standalone-clock-wrap" title="Royal Heirloom Clock">
        <div className="analog-clock-dial">
          <div className="analog-clock-inner">
            <svg viewBox="0 0 200 200" className="w-full h-full text-[#451a03]">
              {/* Outer Minute Ring */}
              <circle cx="100" cy="100" r="92" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4" />
              <circle cx="100" cy="100" r="86" stroke="currentColor" strokeWidth="0.8" fill="none" opacity="0.6" />

              {/* Roman Numerals */}
              <text x="100" y="32" textAnchor="middle" fontSize="17" fontFamily="serif" fontWeight="bold" fill="#3b1502">
                XII
              </text>
              <text x="172" y="106" textAnchor="middle" fontSize="16" fontFamily="serif" fontWeight="bold" fill="#3b1502">
                III
              </text>
              <text x="100" y="180" textAnchor="middle" fontSize="17" fontFamily="serif" fontWeight="bold" fill="#3b1502">
                VI
              </text>
              <text x="28" y="106" textAnchor="middle" fontSize="16" fontFamily="serif" fontWeight="bold" fill="#3b1502">
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
                    stroke="currentColor"
                    strokeWidth={isMajor ? "2" : "0.9"}
                    opacity={isMajor ? "0.85" : "0.45"}
                    transform={`rotate(${angle} 100 100)`}
                  />
                );
              })}

              {/* Rotating Internal Gear */}
              <g opacity="0.28" style={{ transformOrigin: "100px 100px", transform: `rotate(${cwSeconds * 6}deg)` }}>
                <circle cx="100" cy="100" r="30" stroke="#78350f" strokeWidth="2" strokeDasharray="4 3" fill="none" />
              </g>

              {/* Hour Hand */}
              <line
                x1="100"
                y1="100"
                x2="100"
                y2="56"
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
                y2="38"
                stroke="#451a03"
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
                y2="28"
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

      {/* Mandap Timer */}
      <div className={`mandap ${time.over ? "hidden" : ""}`}>
        <svg className="finial" viewBox="0 0 26 26" aria-hidden="true">
          <circle cx="13" cy="16" r="7" fill="#CBA135" />
          <path d="M13,2 C9,7 9,11 13,14 C17,11 17,7 13,2 Z" fill="#0F6B62" />
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
            stroke="#0F6B62"
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
          <FlipTile value={time.days} labelEn="Days" labelHi="दिन" />
          <FlipTile value={time.hours} labelEn="Hours" labelHi="घंटे" />
          <FlipTile value={time.minutes} labelEn="Minutes" labelHi="मिनट" />
          <FlipTile value={time.seconds} labelEn="Seconds" labelHi="सेकंड" />
        </div>

        <div className="plinth" />

        <div className="diya-row">
          <div className="diya">
            <div className="glow" />
            <div className="oil" />
            <div className="flame" />
          </div>
        </div>
      </div>

      {/* Complete Reveal State */}
      <div className={`complete-reveal ${time.over ? "show" : ""}`}>
        <p className="r-eyebrow">Shubh Muhurat</p>
        <p className="r-msg">The moment has arrived — thank you for being here.</p>
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

      <AmbientLayer dust={8} petals={time.over ? 6 : 2} />
    </section>
  );
}
