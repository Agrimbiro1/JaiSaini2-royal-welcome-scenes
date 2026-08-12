import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ceremoniesBg from "/assets/ceremonies-palace-courtyard.png";
import ceremonyCardClean from "/assets/ceremony-card-clean.png";
import { usePrefersReducedMotion } from "../engine/SceneProvider";
import { AmbientLayer } from "../ui/Ambient";
import { Calendar, Clock, MapPin, Navigation, CalendarPlus } from "lucide-react";

export type CeremonyDetail = {
  id: string;
  name: string;
  tagline: string;
  day: string;
  date: string;
  time: string;
  venue: string;
  location: string;
  isoStart: string;
  isoEnd: string;
  mapUrl: string;
};

const ceremonyDetails: CeremonyDetail[] = [
  {
    id: "haldi",
    name: "HALDI",
    tagline: "THE RITUAL OF COLOURS",
    day: "WEDNESDAY",
    date: "2 DECEMBER 2026",
    time: "10:00 AM ONWARDS",
    venue: "SUVARNA MAHAL COURTYARD",
    location: "JAIPUR, RAJASTHAN",
    isoStart: "20261202T043000Z",
    isoEnd: "20261202T083000Z",
    mapUrl: "https://maps.google.com/?q=Suvarna+Mahal+Jaipur",
  },
  {
    id: "mehendi",
    name: "MEHENDI",
    tagline: "THE HENNA RITUAL",
    day: "WEDNESDAY",
    date: "2 DECEMBER 2026",
    time: "4:00 PM ONWARDS",
    venue: "ZANANA GARDENS",
    location: "JAIPUR, RAJASTHAN",
    isoStart: "20261202T103000Z",
    isoEnd: "20261202T153000Z",
    mapUrl: "https://maps.google.com/?q=Zanana+Gardens+Jaipur",
  },
  {
    id: "sangeet",
    name: "SANGEET",
    tagline: "THE NIGHT OF MUSIC & DANCE",
    day: "THURSDAY",
    date: "3 DECEMBER 2026",
    time: "7:00 PM ONWARDS",
    venue: "THE PALACE LAWNS",
    location: "JAIPUR, RAJASTHAN",
    isoStart: "20261203T133000Z",
    isoEnd: "20261203T183000Z",
    mapUrl: "https://maps.google.com/?q=Palace+Lawns+Jaipur",
  },
  {
    id: "shaadi",
    name: "SHAADI",
    tagline: "THE MAIN CEREMONY",
    day: "MONDAY",
    date: "21 DECEMBER 2026",
    time: "7:00 PM ONWARDS",
    venue: "THE GRAND PALACE",
    location: "JAIPUR, RAJASTHAN",
    isoStart: "20261221T133000Z",
    isoEnd: "20261221T193000Z",
    mapUrl: "https://maps.google.com/?q=The+Grand+Palace+Jaipur",
  },
  {
    id: "reception",
    name: "RECEPTION",
    tagline: "THE ROYAL BANQUET",
    day: "SATURDAY",
    date: "5 DECEMBER 2026",
    time: "8:00 PM ONWARDS",
    venue: "ROYAL BALLROOM",
    location: "JAIPUR, RAJASTHAN",
    isoStart: "20261205T143000Z",
    isoEnd: "20261205T193000Z",
    mapUrl: "https://maps.google.com/?q=Royal+Ballroom+Jaipur",
  },
];

// Vector Icons for Ceremony Arch Tabs
function TabIcon({ id, active }: { id: string; active: boolean }) {
  const strokeColor = active ? "#7a1c1c" : "#8c6b54";
  const fillColor = active ? "#7a1c1c" : "none";

  switch (id) {
    case "haldi":
      return (
        <svg viewBox="0 0 40 40" className="w-4 h-4 sm:w-8 sm:h-8" aria-hidden="true">
          <ellipse cx="20" cy="25" rx="13" ry="6" stroke={strokeColor} strokeWidth="2" fill="none" />
          <path d="M11 25 C11 31 29 31 29 25" fill={fillColor} stroke={strokeColor} strokeWidth="1.5" />
          <circle cx="20" cy="18" r="4.5" fill="#f7d44a" />
          <circle cx="14" cy="20" r="2.5" fill="#f7d44a" />
          <circle cx="26" cy="20" r="2.5" fill="#f7d44a" />
        </svg>
      );
    case "mehendi":
      return (
        <svg viewBox="0 0 40 40" className="w-4 h-4 sm:w-8 sm:h-8" aria-hidden="true">
          <path d="M20 5 C14 11 10 19 14 29 C18 33 26 33 28 25 C30 17 24 9 20 5 Z" stroke={strokeColor} strokeWidth="2" fill={active ? "#7a1c1c" : "none"} opacity="0.9" />
          <path d="M20 11 L20 25 M16 17 L24 17 M17 21 L23 21" stroke={active ? "#fff" : strokeColor} strokeWidth="1.2" />
        </svg>
      );
    case "sangeet":
      return (
        <svg viewBox="0 0 40 40" className="w-4 h-4 sm:w-8 sm:h-8" aria-hidden="true">
          <rect x="9" y="16" width="22" height="13" rx="4" stroke={strokeColor} strokeWidth="2" fill={fillColor} />
          <ellipse cx="9" cy="22.5" rx="2" ry="6.5" stroke={strokeColor} strokeWidth="1.5" />
          <ellipse cx="31" cy="22.5" rx="2" ry="6.5" stroke={strokeColor} strokeWidth="1.5" />
          <path d="M24 12 L28 7 M28 7 L34 9 M28 7 L28 13" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      );
    case "shaadi":
    case "wedding":
      return (
        <svg viewBox="0 0 40 40" className="w-4 h-4 sm:w-8 sm:h-8" aria-hidden="true">
          <path d="M7 32 L7 16 L20 8 L33 16 L33 32" stroke={strokeColor} strokeWidth="2" fill="none" />
          <path d="M11 16 L20 10 L29 16" stroke={strokeColor} strokeWidth="1.5" fill="none" />
          <path d="M20 28 C18 24 18 21 20 19 C22 21 22 24 20 28 Z" fill="#e2790e" stroke="#f7d44a" strokeWidth="1" />
          <rect x="13" y="28" width="14" height="3" fill={strokeColor} />
        </svg>
      );
    case "reception":
      return (
        <svg viewBox="0 0 40 40" className="w-4 h-4 sm:w-8 sm:h-8" aria-hidden="true">
          <path d="M20 5 L20 13 M11 17 C11 23 29 23 29 17 M15 23 L15 29 M25 23 L25 29 M11 29 H29" stroke={strokeColor} strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="20" cy="15" r="2" fill={strokeColor} />
          <circle cx="13" cy="17" r="1.5" fill={strokeColor} />
          <circle cx="27" cy="17" r="1.5" fill={strokeColor} />
        </svg>
      );
    default:
      return null;
  }
}

export default function CeremoniesScene() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const parchmentRef = useRef<HTMLDivElement>(null);

  const [activeId, setActiveId] = useState<string>("shaadi");
  const active = ceremonyDetails.find((c) => c.id === activeId) || ceremonyDetails[3]!;

  // Smooth continuous levitation animation using GSAP sine easing (120fps GPU accelerated)
  useEffect(() => {
    if (!cardRef.current || reduced) return;

    const floatTween = gsap.to(cardRef.current, {
      y: -14,
      duration: 3.4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      floatTween.kill();
    };
  }, [reduced]);

  // Smooth tab switch animation for inner parchment content
  useEffect(() => {
    if (!parchmentRef.current || reduced) return;
    gsap.fromTo(
      parchmentRef.current,
      { opacity: 0.65, scale: 0.97 },
      { opacity: 1, scale: 1, duration: 0.38, ease: "power2.out" }
    );
  }, [activeId, reduced]);

  // Generate Google Calendar Event Link
  const getGoogleCalendarUrl = (item: CeremonyDetail) => {
    const title = encodeURIComponent(`Rohan & Ananya — ${item.name} Ceremony`);
    const details = encodeURIComponent(`${item.name} (${item.tagline}) at ${item.venue}, ${item.location}`);
    const location = encodeURIComponent(`${item.venue}, ${item.location}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${item.isoStart}/${item.isoEnd}`;
  };

  return (
    <section
      ref={rootRef}
      className="ceremonies-scene-root relative w-full h-[100svh] overflow-hidden flex flex-col justify-between items-center py-2 px-3 sm:px-6 select-none bg-[#120a06]"
    >
      <style>{`
        .ceremonies-scene-root {
          font-family: 'Playfair Display', Georgia, serif;
          color: #3d261a;
          isolation: isolate;
        }

        /* Full Screen Palace Background Photo */
        .ceremonies-scene-root .palace-bg-photo {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          z-index: 0;
          filter: brightness(0.98) contrast(1.02);
        }

        /* Subtle Radial Vignette Layer */
        .ceremonies-scene-root .vignette-layer {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 45%, rgba(0, 0, 0, 0.05) 0%, rgba(20, 10, 5, 0.35) 80%, rgba(15, 5, 0, 0.55) 100%);
          z-index: 1;
          pointer-events: none;
        }

        /* --- Top Header Section: Placed high at the top on desktop --- */
        .ceremonies-scene-root .top-header-section {
          position: relative;
          z-index: 20;
          text-align: center;
          margin-top: 10px;
        }

        .ceremonies-scene-root .header-flourish {
          margin: 0 auto 2px;
          opacity: 0.9;
        }

        .ceremonies-scene-root .header-title {
          font-family: 'Cinzel', 'Playfair Display', serif;
          font-size: min(1.5rem, 3.8vw);
          font-weight: 700;
          letter-spacing: 5px;
          color: #ffffff;
          text-transform: uppercase;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.7);
          margin-bottom: 2px;
        }

        .ceremonies-scene-root .header-subtitle {
          font-family: 'Cinzel', serif;
          font-size: min(0.58rem, 2.0vw);
          letter-spacing: 2.5px;
          color: rgba(255, 235, 200, 0.92);
          text-transform: uppercase;
          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
        }

        /* --- Grand Ornate Card Frame Wrapper (Hardware-Accelerated Floating) --- */
        .ceremonies-scene-root .ornate-card-wrapper {
          position: relative;
          z-index: 20;
          max-width: 560px;
          width: 100%;
          height: min(720px, 80vh);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 1px 0;
          filter: drop-shadow(0 26px 52px rgba(0, 0, 0, 0.52)) drop-shadow(0 0 25px rgba(233, 195, 73, 0.2));
          will-change: transform;
        }

        .ceremonies-scene-root .ornate-card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
          pointer-events: none;
          z-index: 0;
        }

        /* STRICT PARCHMENT SAFE AREA (Desktop Default) */
        .ceremonies-scene-root .parchment-safe-area {
          position: absolute;
          top: 23.5%;
          bottom: 21%;
          left: 20%;
          right: 20%;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          text-align: center;
          padding: 2px 6px;
        }

        .ceremonies-scene-root .ceremony-main-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: min(1.65rem, 4.5vw);
          font-weight: 700;
          letter-spacing: 5px;
          color: #7a1c1c;
          line-height: 1;
          margin-bottom: 2px;
        }

        .ceremonies-scene-root .ceremony-tagline {
          font-family: 'Cinzel', serif;
          font-size: 0.6rem;
          letter-spacing: 2.5px;
          color: #634331;
          text-transform: uppercase;
          font-weight: 600;
        }

        .ceremonies-scene-root .divider-ornament {
          width: 70px;
          height: 1px;
          background: linear-gradient(90deg, transparent, #c39b73, transparent);
          margin: 4px auto 6px;
        }

        /* 3 Details Grid - Desktop Default */
        .ceremonies-scene-root .details-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          margin: 2px 0;
          padding-left: 44px;
        }

        .ceremonies-scene-root .detail-row {
          display: grid;
          grid-template-columns: 32px 1fr;
          align-items: center;
          gap: 12px;
          width: 100%;
          max-width: 290px;
          margin-bottom: 8px;
          text-align: left;
        }

        .ceremonies-scene-root .detail-icon-badge {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(247, 212, 74, 0.18);
          border: 1.5px solid rgba(195, 155, 115, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #7a1c1c;
          flex-shrink: 0;
        }

        .ceremonies-scene-root .detail-text-primary {
          font-family: 'Cinzel', serif;
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 1.2px;
          color: #3d261a;
          text-transform: uppercase;
          line-height: 1.2;
        }

        .ceremonies-scene-root .detail-text-sub {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.6rem;
          letter-spacing: 1px;
          color: #7a5843;
          text-transform: uppercase;
          font-weight: 500;
        }

        /* --- Two Action Buttons Stacked VERTICALLY (Desktop Default) --- */
        .ceremonies-scene-root .action-buttons-vertical {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 7px;
          width: 100%;
          max-width: 270px;
          margin-top: 6px;
          margin-bottom: 2px;
        }

        .ceremonies-scene-root .btn-action-vertical {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 6.5px 14px;
          border-radius: 18px;
          font-family: 'Cinzel', serif;
          font-weight: 700;
          font-size: min(0.64rem, 2.0vw);
          letter-spacing: 1.1px;
          text-transform: uppercase;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        /* Get Directions Button */
        .ceremonies-scene-root .btn-action-direction {
          background: linear-gradient(180deg, #d4a12a 0%, #b3821a 100%);
          border: 1px solid rgba(255, 245, 200, 0.85);
          color: #2b1805;
          box-shadow: 0 4px 12px rgba(180, 130, 30, 0.38);
        }
        .ceremonies-scene-root .btn-action-direction:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(180, 130, 30, 0.52);
        }

        /* Add to Calendar Button */
        .ceremonies-scene-root .btn-action-calendar {
          background: linear-gradient(180deg, #7a1c1c 0%, #581111 100%);
          border: 1px solid rgba(255, 215, 150, 0.45);
          color: #fff6e5;
          box-shadow: 0 4px 12px rgba(100, 20, 10, 0.38);
        }
        .ceremonies-scene-root .btn-action-calendar:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(120, 25, 15, 0.52);
        }

        /* --- Bottom 5 Arch Tabs Bar (Desktop Default) --- */
        .ceremonies-scene-root .tabs-bar-container {
          position: relative;
          z-index: 25;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          gap: min(8px, 1.5vw);
          width: 100%;
          max-width: 580px;
          margin-bottom: 50px;
        }

        .ceremonies-scene-root .arch-tab-btn {
          position: relative;
          flex: 1;
          max-width: 98px;
          height: 78px;
          background: linear-gradient(180deg, #FAF6F0 0%, #EBE0D0 100%);
          border: 1.5px solid rgba(195, 155, 115, 0.5);
          border-radius: 34px 34px 8px 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 5px 3px 4px;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 8px 22px rgba(0, 0, 0, 0.28);
        }

        /* Active Selected Tab */
        .ceremonies-scene-root .arch-tab-btn.is-active {
          background: linear-gradient(180deg, #FFFFFF 0%, #FAF6F0 100%);
          border: 2px solid #7a1c1c;
          transform: translateY(-8px);
          box-shadow:
            0 16px 30px rgba(0, 0, 0, 0.4),
            0 0 16px rgba(122, 28, 28, 0.32);
        }

        .ceremonies-scene-root .tab-label {
          font-family: 'Cinzel', serif;
          font-size: min(0.68rem, 2.3vw);
          font-weight: 700;
          letter-spacing: 1px;
          color: #634331;
          text-transform: uppercase;
          margin-top: 2px;
        }

        .ceremonies-scene-root .arch-tab-btn.is-active .tab-label {
          color: #7a1c1c;
        }

        /* MOBILE RESPONSIVE MEDIA QUERIES ONLY - Strictly scoped to mobile screens (<= 640px) */
        @media (max-width: 640px) {
          .ceremonies-scene-root .top-header-section {
            margin-top: 46px;
          }
          .ceremonies-scene-root .header-title {
            font-size: 1.25rem;
            letter-spacing: 3px;
          }
          .ceremonies-scene-root .header-subtitle {
            font-size: 0.52rem;
            letter-spacing: 1.8px;
          }
          .ceremonies-scene-root .ornate-card-wrapper {
            height: min(490px, 64vh);
            max-width: 340px;
          }
          .ceremonies-scene-root .parchment-safe-area {
            top: 24%;
            bottom: 24.5%;
            left: 18%;
            right: 18%;
            padding: 1px 2px;
          }
          .ceremonies-scene-root .ceremony-main-title {
            font-size: 1.15rem;
            letter-spacing: 2px;
            margin-bottom: 0px;
          }
          .ceremonies-scene-root .ceremony-tagline {
            font-size: 0.5rem;
            letter-spacing: 1.5px;
          }
          .ceremonies-scene-root .divider-ornament {
            margin: 2px auto 2px;
            width: 40px;
          }
          .ceremonies-scene-root .details-container {
            padding-left: 20px;
            margin: 2px 0;
          }
          .ceremonies-scene-root .detail-row {
            max-width: 170px;
            gap: 7px;
            margin-bottom: 7px;
            grid-template-columns: 20px 1fr;
          }
          .ceremonies-scene-root .detail-icon-badge {
            width: 20px;
            height: 20px;
          }
          .ceremonies-scene-root .detail-text-primary {
            font-size: 0.6rem;
            letter-spacing: 0.4px;
            line-height: 1.15;
          }
          .ceremonies-scene-root .detail-text-sub {
            font-size: 0.5rem;
            letter-spacing: 0.4px;
          }
          .ceremonies-scene-root .action-buttons-vertical {
            gap: 3px;
            max-width: 155px;
            margin-top: 2px;
            margin-bottom: 6px;
          }
          .ceremonies-scene-root .btn-action-vertical {
            padding: 3.5px 6px;
            font-size: 0.5rem;
            letter-spacing: 0.5px;
            border-radius: 10px;
          }
          .ceremonies-scene-root .tabs-bar-container {
            margin-bottom: 58px;
            gap: 3px;
          }
          .ceremonies-scene-root .arch-tab-btn {
            height: 50px;
            border-radius: 16px 16px 4px 4px;
            padding: 2px 1px;
          }
          .ceremonies-scene-root .tab-label {
            font-size: 0.52rem;
            letter-spacing: 0.3px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ceremonies-scene-root .ornate-card-wrapper,
          .ceremonies-scene-root .arch-tab-btn {
            transition: none !important;
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* Full Screen Palace Background Photo */}
      <img
        src={ceremoniesBg}
        alt="Palace Courtyard"
        className="palace-bg-photo"
      />
      <div className="vignette-layer" aria-hidden="true" />

      {/* Top Header */}
      <header className="top-header-section">
        <svg className="header-flourish" width="50" height="12" viewBox="0 0 60 14" fill="none" aria-hidden="true">
          <path d="M0 7 H22 M38 7 H60 M30 2 L34 7 L30 12 L26 7 Z" fill="#ffd700" stroke="#ffd700" strokeWidth="1" />
        </svg>
        <h1 className="header-title">THE CELEBRATIONS</h1>
        <p className="header-subtitle">TOGETHER IS OUR FAVOURITE PLACE TO BE</p>
      </header>

      {/* Prominent Grand Ornate Clean PNG Card Container Wrapper */}
      <div ref={cardRef} className="ornate-card-wrapper">
        {/* User's Clean Transparent PNG Card Frame Asset */}
        <img
          src={ceremonyCardClean}
          alt="Royal Ceremonies Frame Card"
          className="ornate-card-img"
        />

        {/* Strict Parchment Safe Area Overlay */}
        <div ref={parchmentRef} className="parchment-safe-area">
          {/* Header Title & Tagline */}
          <div>
            <h2 className="ceremony-main-title">{active.name}</h2>
            <p className="ceremony-tagline">{active.tagline}</p>
            <div className="divider-ornament" aria-hidden="true" />
          </div>

          {/* 3 Detail Rows with Icons Aligned 100% Perfectly Straight */}
          <div className="details-container">
            {/* Date Row */}
            <div className="detail-row">
              <div className="detail-icon-badge">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7a1c1c]" />
              </div>
              <div>
                <div className="detail-text-primary">{active.day}</div>
                <div className="detail-text-sub">{active.date}</div>
              </div>
            </div>

            {/* Time Row */}
            <div className="detail-row">
              <div className="detail-icon-badge">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7a1c1c]" />
              </div>
              <div>
                <div className="detail-text-primary">{active.time}</div>
              </div>
            </div>

            {/* Venue Row */}
            <div className="detail-row">
              <div className="detail-icon-badge">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#7a1c1c]" />
              </div>
              <div>
                <div className="detail-text-primary">{active.venue}</div>
                <div className="detail-text-sub">{active.location}</div>
              </div>
            </div>
          </div>

          {/* Two Action Buttons Stacked VERTICALLY */}
          <div className="action-buttons-vertical">
            <a
              href={active.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-action-vertical btn-action-direction"
              title="Get Direction"
            >
              <Navigation className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Get Direction</span>
            </a>

            <a
              href={getGoogleCalendarUrl(active)}
              target="_blank"
              rel="noreferrer"
              className="btn-action-vertical btn-action-calendar"
              title="Add to Calendar"
            >
              <CalendarPlus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Add to Calendar</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom 5 Arch Tabs Bar */}
      <div className="tabs-bar-container">
        {ceremonyDetails.map((c) => {
          const isActive = c.id === activeId;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveId(c.id)}
              className={`arch-tab-btn ${isActive ? "is-active" : ""}`}
            >
              <TabIcon id={c.id} active={isActive} />
              <span className="tab-label">{c.name}</span>
            </button>
          );
        })}
      </div>

      <AmbientLayer dust={6} petals={2} />
    </section>
  );
}
