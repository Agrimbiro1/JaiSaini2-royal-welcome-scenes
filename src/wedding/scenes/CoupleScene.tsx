import { useState } from "react";
import { useScene, usePrefersReducedMotion } from "../engine/SceneProvider";
import { useSceneEnter } from "../engine/useSceneEnter";
import { wedding } from "../data/wedding";
import { Divider } from "../ui/Ornaments";
import { AmbientLayer, WarmGlow } from "../ui/Ambient";

import scrollTableBg from "/assets/royal-scroll-table.png";
import couplePhoto from "/assets/couple.jpg";

export default function CoupleScene() {
  const { goNext } = useScene();
  const containerRef = useSceneEnter<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const [showLineageModal, setShowLineageModal] = useState(false);

  const {
    groomFull,
    brideFull,
    groomParents,
    brideParents,
    shloka,
    shlokaTranslation,
    royalAnnouncement,
    weddingDate,
    venue,
  } = wedding.couple;

  return (
    <section
      ref={containerRef}
      className="couple-fullscreen-root relative w-full h-[100svh] overflow-hidden select-none flex flex-col items-center justify-between"
    >
      <style>{`
        .couple-fullscreen-root {
          --maroon: #430E1F;
          --maroon-deep: #2C0714;
          --maroon-mid: #6E1B34;
          --gold: #CBA135;
          --gold-light: #EAD59A;
          --gold-bright: #F5D77F;
          --ivory: #FBF1DE;
          --ink: #331019;
          --teal: #0F6B62;

          font-family: 'Rajdhani', sans-serif;
          color: var(--ivory);
          isolation: isolate;
        }

        /* Fullscreen Background Scroll-on-Table Image */
        .fullscreen-scroll-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: contrast(1.06) saturate(1.12) brightness(0.82);
          transform: scale(1.01);
        }

        .scroll-jaali-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.06;
          background-image:
            linear-gradient(45deg, var(--gold) 1px, transparent 1px),
            linear-gradient(-45deg, var(--gold) 1px, transparent 1px);
          background-size: 36px 36px;
          pointer-events: none;
        }

        .scroll-vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, transparent 35%, rgba(44, 7, 20, 0.75) 80%, rgba(44, 7, 20, 0.95) 100%);
          pointer-events: none;
        }

        /* Calligraphy Content Box - Positioned safely inside parchment scroll */
        .scroll-calligraphy-single-screen {
          position: relative;
          z-index: 20;
          width: min(720px, 86vw);
          height: calc(100svh - 110px);
          margin-top: 52px;
          margin-bottom: 58px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
          padding: 2% 6%;
          text-align: center;
          color: #2b0b14;
          overflow: hidden; /* Strictly no scrollbar */
        }

        /* Mobile specific scroll parchment containment - Zoomed background & enlarged readable fonts */
        @media (max-width: 640px) {
          .fullscreen-scroll-bg {
            transform: scale(1.4);
            object-position: center 48%;
          }
          .scroll-calligraphy-single-screen {
            position: absolute;
            top: 52%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: min(340px, 88vw);
            height: calc(100svh - 120px);
            max-height: 580px;
            margin: 0;
            padding: 8px 6px;
            justify-content: space-evenly;
          }
          .scroll-header-tag {
            font-size: 10.5px !important;
            letter-spacing: 0.15em !important;
          }
          .scroll-shloka-text {
            font-size: 11.5px !important;
            line-height: 1.35 !important;
          }
          .groom-title, .bride-title {
            font-size: 1.5rem !important;
            line-height: 1.1 !important;
          }
          .weds-script-text {
            font-size: 1.25rem !important;
          }
          .lineage-text-box p {
            font-size: 12px !important;
          }
          .lineage-text-box div {
            font-size: 9.5px !important;
          }
          .wedding-date-stamp {
            font-size: 10px !important;
            letter-spacing: 1px !important;
            padding: 4px 16px !important;
            max-width: 300px !important;
            line-height: 1.3 !important;
          }
          .wax-seal-button {
            top: 45px;
            right: 5%;
            width: 36px;
            height: 36px;
          }
        }

        .scroll-header-tag {
          font-family: 'Rajdhani', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #7a1d36;
          border-bottom: 1.5px solid #c59b27;
          padding-bottom: 1px;
        }

        .scroll-shloka-text {
          font-family: 'Cinzel', 'Noto Serif Devanagari', serif;
          font-size: 9.5px;
          line-height: 1.35;
          color: #5c1426;
          font-weight: 600;
          max-width: 95%;
        }

        .groom-title, .bride-title {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 700;
          color: #3b0916;
          line-height: 1.05;
          letter-spacing: -0.01em;
          text-shadow: 0 1px 2px rgba(234, 213, 154, 0.4);
        }

        .weds-script-text {
          font-family: 'Great Vibes', 'Cormorant Garamond', cursive;
          font-style: italic;
          color: #9e2343;
          font-weight: 600;
          line-height: 1;
        }

        .lineage-text-box {
          font-family: 'Cormorant Garamond', serif;
          color: #4a1523;
        }

        .royal-announcement-quote {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 13px;
          line-height: 1.4;
          color: #2b0b14;
          font-weight: 600;
          max-width: 86%;
        }

        .wedding-date-stamp {
          background: linear-gradient(135deg, #430e1f, #6e1b34);
          color: #ead59a;
          border: 1.5px solid #cba135;
          padding: 3px 14px;
          border-radius: 999px;
          font-family: 'Rajdhani', sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        }

        /* Wax Seal Button on top-right */
        .wax-seal-button {
          position: absolute;
          top: 36px;
          right: 6%;
          z-index: 30;
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 35%, #c21c2c, #700914, #3a0207);
          border: 2px solid #ead59a;
          box-shadow: 0 6px 18px rgba(0,0,0,0.85), 0 0 14px rgba(245, 215, 127, 0.7);
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .wax-seal-button:hover {
          transform: scale(1.12) rotate(6deg);
          box-shadow: 0 8px 24px rgba(0,0,0,0.9), 0 0 22px rgba(245, 215, 127, 0.9);
        }

        @media (min-width: 640px) {
          .scroll-header-tag { font-size: 12px; }
          .scroll-shloka-text { font-size: 13.5px; }
          .royal-announcement-quote { font-size: 15px; }
          .wedding-date-stamp { font-size: 11.5px; padding: 5px 22px; }
          .wax-seal-button { top: 60px; right: 7%; width: 52px; height: 52px; }
        }

        @media (min-width: 1024px) {
          .scroll-shloka-text { font-size: 14.5px; }
          .royal-announcement-quote { font-size: 16px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .wax-seal-button { transition: none !important; }
        }
      `}</style>

      {/* Fullscreen Scroll-on-Table Background Image */}
      <img
        src={scrollTableBg}
        alt="Royal Parchment Scroll on Palace Table"
        className="fullscreen-scroll-bg"
      />
      <div className="scroll-jaali-overlay" aria-hidden="true" />
      <div className="scroll-vignette" aria-hidden="true" />
      <WarmGlow className="left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none" />
      <AmbientLayer dust={8} petals={3} />

      {/* Wax Seal Crest Button */}
      <button
        type="button"
        onClick={() => setShowLineageModal(true)}
        className="wax-seal-button"
        title="Click to inspect Royal Family Crest & Lineage"
        aria-label="Royal Wax Seal"
      >
        <span className="text-[#F5D77F] font-bold text-xs sm:text-sm tracking-widest font-serif drop-shadow-md">
          ♔
        </span>
      </button>

      {/* Live Calligraphy Overlay - Fixed Single Screen (Non-Scrollable) */}
      <div
        data-enter
        data-enter-order="1"
        className="scroll-calligraphy-single-screen"
      >
        {/* Header Tag */}
        <div className="flex flex-col items-center shrink-0">
          <span className="scroll-header-tag">
            शाही पैगाम • Chapter Two • The Royal Proclamation
          </span>
          <Divider className="mt-0.5 sm:mt-1 h-1.5 sm:h-2 w-20 sm:w-32 text-[#7a1d36]" />
        </div>

        {/* Sacred Devanagari Sanskrit Shloka */}
        {shloka && (
          <p className="scroll-shloka-text shrink-0">
            {shloka}
          </p>
        )}

        {/* Rectangular Couple Portrait Frame */}
        <div className="flex items-center justify-center shrink-0 my-0.5">
          <div className="w-36 sm:w-52 h-20 sm:h-28 rounded-lg sm:rounded-xl overflow-hidden border-1.5 sm:border-3 border-[#cba135] shadow-lg ring-1 sm:ring-2 ring-[#7a1d36]/30 bg-[#1c0a02]">
            <img
              src={couplePhoto}
              alt="Rohan & Ananya Royal Portrait"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>

        {/* Main Calligraphy Couple Names */}
        <div className="flex flex-col items-center shrink-0 my-0">
          <h1 className="groom-title text-xl sm:text-4xl lg:text-5xl">
            {groomFull || wedding.couple.groom}
          </h1>
          <div className="weds-script-text text-sm sm:text-3xl lg:text-4xl my-0">
            — weds —
          </div>
          <h1 className="bride-title text-xl sm:text-4xl lg:text-5xl">
            {brideFull || wedding.couple.bride}
          </h1>
        </div>

        {/* Parentage & Royal Lineage */}
        <div className="lineage-text-box shrink-0">
          <p className="text-[10px] sm:text-[15px] font-bold text-[#541221]">
            {groomParents}
          </p>
          <div className="text-[8px] sm:text-[11px] uppercase tracking-widest font-sans text-[#8c1c38] my-0.5 font-bold">
            • United In Holy Matrimony With •
          </div>
          <p className="text-[10px] sm:text-[15px] font-bold text-[#541221]">
            {brideParents}
          </p>
        </div>

        {/* Royal Announcement Quote */}
        {royalAnnouncement && (
          <p className="royal-announcement-quote hidden sm:block shrink-0">
            "{royalAnnouncement}"
          </p>
        )}

        {/* Wedding Date & Venue Stamp */}
        <div className="wedding-date-stamp shrink-0">
          {weddingDate} • {venue?.split("•")[0]}
        </div>

        {/* Action Button to Next Chapter */}
        <button
          type="button"
          onClick={goNext}
          className="group inline-flex items-center gap-1 bg-gradient-to-r from-[#6E1B34] via-[#430E1F] to-[#2C0714] text-[#EAD59A] border border-[#CBA135] px-3.5 sm:px-5 py-1 sm:py-1.5 rounded-full font-sans text-[9.5px] sm:text-xs font-bold tracking-widest uppercase shadow-xl hover:shadow-[0_0_20px_rgba(203,161,53,0.7)] hover:border-[#F5D77F] transition-all duration-300 cursor-pointer active:scale-95 shrink-0"
        >
          <span>Explore Our Story</span>
          <span className="text-xs sm:text-sm group-hover:translate-x-1 transition-transform">
            →
          </span>
        </button>
      </div>

      {/* Royal Lineage Modal Popup */}
      {showLineageModal && (
        <div
          onClick={() => setShowLineageModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2C0714]/85 backdrop-blur-md px-4 py-8 animate-in fade-in duration-300 select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative z-50 w-full max-w-lg bg-gradient-to-b from-[#FBF1DE] to-[#F5E7CC] text-[#331019] rounded-2xl p-6 border-2 border-[#CBA135] shadow-[0_25px_65px_rgba(0,0,0,0.95)] flex flex-col items-center text-center animate-in zoom-in-95 duration-300"
          >
            {/* Corner Accents */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#0F6B62]" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#0F6B62]" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#0F6B62]" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#0F6B62]" />

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowLineageModal(false)}
              className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-[#331019]/10 border border-[#0F6B62]/40 text-[#6E1B34] hover:bg-[#331019]/20 flex items-center justify-center font-bold cursor-pointer"
            >
              ✕
            </button>

            {/* Modal Header */}
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.3em] text-[#0F6B62] mb-1">
              Royal Lineage & Decree
            </span>
            <h2 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl font-semibold text-[#430E1F] mb-3">
              The Sacred Royal Houses
            </h2>

            <Divider className="mb-4 h-2 w-32 text-[#CBA135]" />

            {/* Groom side info */}
            <div className="w-full bg-[#430E1F]/5 border border-[#CBA135]/40 rounded-xl p-3 mb-3 text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F6B62] block mb-0.5">
                The House of Rathore (Groom)
              </span>
              <h3 className="font-['Cormorant_Garamond',serif] text-lg font-bold text-[#430E1F]">
                {groomFull}
              </h3>
              <p className="text-xs text-[#331019]/80 font-serif italic">
                {groomParents}
              </p>
            </div>

            {/* Bride side info */}
            <div className="w-full bg-[#430E1F]/5 border border-[#CBA135]/40 rounded-xl p-3 mb-4 text-left">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#0F6B62] block mb-0.5">
                The House of Shekhawat (Bride)
              </span>
              <h3 className="font-['Cormorant_Garamond',serif] text-lg font-bold text-[#430E1F]">
                {brideFull}
              </h3>
              <p className="text-xs text-[#331019]/80 font-serif italic">
                {brideParents}
              </p>
            </div>

            {/* Shloka Translation Quote */}
            {shlokaTranslation && (
              <p className="font-['Cormorant_Garamond',serif] italic text-sm text-[#430E1F] bg-[#CBA135]/15 p-3 rounded-lg border border-[#CBA135]/40 mb-4">
                "{shlokaTranslation}"
              </p>
            )}

            <button
              type="button"
              onClick={() => setShowLineageModal(false)}
              className="bg-[#6E1B34] text-[#EAD59A] border border-[#CBA135] px-6 py-1.5 rounded-full font-sans text-xs font-bold tracking-wider uppercase hover:bg-[#430E1F] transition-colors cursor-pointer"
            >
              Close Announcement
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
