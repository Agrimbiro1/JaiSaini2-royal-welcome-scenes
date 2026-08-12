import { useState } from "react";
import { wedding } from "../data/wedding";
import { usePrefersReducedMotion } from "../engine/SceneProvider";
import { AmbientLayer, WarmGlow } from "../ui/Ambient";
import familyBg from "/assets/family-tree-bg.jpg";
import familyCardFrame from "/assets/family-card-frame.png";
import groomFamilyPhoto from "/assets/groom-family.png";
import brideFamilyPhoto from "/assets/bride-family.png";
import couplePhoto from "/assets/couple.jpg";
import { X } from "lucide-react";

interface FamilyMemberDetail {
  name: string;
  relation: string;
  relationshipToGroomOrBride: string;
  roleDescription: string;
}

interface FamilyData {
  title: string;
  cardTitle: string;
  sideName: string;
  subtitle: string;
  parentsSummary: string;
  grandparents: string[];
  siblings: string[];
  photo: string;
  members: FamilyMemberDetail[];
}

const brideFamilyData: FamilyData = {
  title: `${wedding.couple.bride}'s Family`,
  cardTitle: "THE BRIDE'S FAMILY",
  sideName: "Bride's Lineage",
  subtitle: "The Graceful House of Sharma",
  parentsSummary: "Mr. & Mrs. Rajesh Sharma",
  grandparents: ["Late Shri Mohanlal Sharma", "Late Smt. Kamla Sharma"],
  siblings: ["Ritika Sharma (Sister)", "Rohit Sharma (Brother)"],
  photo: brideFamilyPhoto,
  members: [
    {
      name: "Rajesh Sharma",
      relation: "Father",
      relationshipToGroomOrBride: `Father of the Bride (${wedding.couple.bride})`,
      roleDescription: "Proud father, extending warm hospitality and royal honor to all guests.",
    },
    {
      name: "Sunita Sharma",
      relation: "Mother",
      relationshipToGroomOrBride: `Mother of the Bride (${wedding.couple.bride})`,
      roleDescription: "Loving mother, welcoming the groom with warmth and divine auspiciousness.",
    },
    {
      name: "Late Shri Mohanlal Sharma & Smt. Kamla Sharma",
      relation: "Grandparents",
      relationshipToGroomOrBride: `Maternal Grandparents of ${wedding.couple.bride}`,
      roleDescription: "Treasured matriarchs and patriarchs, blessing the new couple's sacred union.",
    },
    {
      name: "Ritika Sharma & Rohit Sharma",
      relation: "Siblings",
      relationshipToGroomOrBride: `Sister & Brother of ${wedding.couple.bride}`,
      roleDescription: "Bringing festive joy, cheerful laughter, and heartfelt blessings.",
    },
  ],
};

const groomFamilyData: FamilyData = {
  title: `${wedding.couple.groom}'s Family`,
  cardTitle: "THE GROOM'S FAMILY",
  sideName: "Groom's Lineage",
  subtitle: "The Esteemed House of Verma",
  parentsSummary: "Mr. & Mrs. Amit Verma",
  grandparents: ["Late Shri Suresh Verma", "Late Smt. Lata Verma"],
  siblings: ["Ankit Verma (Brother)", "Neha Verma (Sister)"],
  photo: groomFamilyPhoto,
  members: [
    {
      name: "Amit Verma",
      relation: "Father",
      relationshipToGroomOrBride: `Father of the Groom (${wedding.couple.groom})`,
      roleDescription: "Guiding pillar of the Verma family, extending a warm welcome to all guests.",
    },
    {
      name: "Meena Verma",
      relation: "Mother",
      relationshipToGroomOrBride: `Mother of the Groom (${wedding.couple.groom})`,
      roleDescription: "Heart of the household, bestowing unconditional love and motherly blessings.",
    },
    {
      name: "Late Shri Suresh Verma & Smt. Lata Verma",
      relation: "Grandparents",
      relationshipToGroomOrBride: `Paternal Grandparents of ${wedding.couple.groom}`,
      roleDescription: "Elders of the family tree, sharing eternal wisdom and heritage traditions.",
    },
    {
      name: "Ankit Verma & Neha Verma",
      relation: "Siblings",
      relationshipToGroomOrBride: `Brother & Sister of ${wedding.couple.groom}`,
      roleDescription: "Bringing warmth, enthusiasm, and royal fanfare to the celebration.",
    },
  ],
};

// Lotus Crest Icon
const LotusCrest = ({ className = "w-4 h-4 text-[#8C2338]" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 3C10.5 6 8 8.5 5 9.5C7.5 10.5 10 13 11 16C12 13 14.5 10.5 17 9.5C14 8.5 11.5 6 12 3Z"
      fill="currentColor"
      fillOpacity="0.85"
    />
    <path
      d="M12 6C11 8 9.5 9.5 7.5 10.2C9.5 11 11 12.5 11.8 14.5C12.5 12.5 14 11 16 10.2C14 9.5 12.5 8 12 6Z"
      fill="#CBA135"
    />
    <path
      d="M12 17C9 17 6 15.8 4 13.5C7 13.5 10 14.8 12 17ZM12 17C15 17 18 15.8 20 13.5C17 13.5 14 14.8 12 17Z"
      fill="currentColor"
      fillOpacity="0.6"
    />
  </svg>
);

// Center Couple Medallion with Actual Bride & Groom Photo
const CouplePhotoMedallion = () => (
  <div className="hidden lg:flex flex-col items-center justify-center relative w-48 mx-2 z-10 select-none">
    {/* Center Medallion Frame with Decorative Golden Vines */}
    <div className="relative flex items-center justify-center">
      
      {/* Left Floral Vine Branch */}
      <svg className="w-14 h-24 text-[#A37326]/70 absolute -left-10 top-1/2 -translate-y-1/2 pointer-events-none" viewBox="0 0 60 100" fill="none">
        <path d="M50 10C30 30 20 60 40 90" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="25" cy="30" r="3.5" fill="#8C2338" />
        <circle cx="15" cy="55" r="3.5" fill="#8C2338" />
        <circle cx="30" cy="75" r="3.5" fill="#8C2338" />
      </svg>

      {/* Center Circular Photo Medallion */}
      <div className="w-32 h-32 rounded-full border-2 border-[#CBA135] bg-[#FBF1DE]/70 backdrop-blur-xs p-1 flex items-center justify-center shadow-xl relative overflow-hidden group">
        <div className="w-full h-full rounded-full border border-dashed border-[#A37326]/70 overflow-hidden relative">
          <img
            src={couplePhoto}
            alt={`${wedding.couple.bride} & ${wedding.couple.groom}`}
            className="w-full h-full object-cover object-center transform transition-transform duration-500 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Right Floral Vine Branch */}
      <svg className="w-14 h-24 text-[#A37326]/70 absolute -right-10 top-1/2 -translate-y-1/2 pointer-events-none scale-x-[-1]" viewBox="0 0 60 100" fill="none">
        <path d="M50 10C30 30 20 60 40 90" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="25" cy="30" r="3.5" fill="#8C2338" />
        <circle cx="15" cy="55" r="3.5" fill="#8C2338" />
        <circle cx="30" cy="75" r="3.5" fill="#8C2338" />
      </svg>
    </div>

    <p className="font-['Cinzel',serif] text-[11px] font-bold text-[#3B0D1A] uppercase tracking-[0.2em] mt-2.5">
      BRIDE & GROOM
    </p>

    <div className="flex items-center gap-1.5 text-[#CBA135] text-[10px] mt-0.5">
      <span className="w-3 h-[1px] bg-[#CBA135]" />
      <span className="text-[#8C2338]">💛</span>
      <span className="w-3 h-[1px] bg-[#CBA135]" />
    </div>
  </div>
);

export default function FamilyScene() {
  const reduced = usePrefersReducedMotion();
  const [activeModal, setActiveModal] = useState<"groom" | "bride" | null>(null);

  const selectedFamily = activeModal === "groom" ? groomFamilyData : activeModal === "bride" ? brideFamilyData : null;

  return (
    <section className="family-scene-root relative w-full h-full min-h-screen max-h-screen overflow-hidden flex flex-col items-center justify-between py-3 px-4 select-none">
      <style>{`
        .family-scene-root {
          font-family: 'Rajdhani', sans-serif;
          color: #3B0D1A;
          isolation: isolate;
        }

        .family-cards-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
          width: min(1040px, 100%);
          margin: auto 0;
          z-index: 2;
        }

        @media (min-width: 768px) {
          .family-cards-container {
            flex-direction: row;
            align-items: center;
            justify-content: center;
          }
        }

        /* Royal Arch Frame Card - Padding Top 104px gives ample top margin to bring titles down into the blank parchment center */
        .royal-arch-card {
          flex: 1;
          position: relative;
          width: 100%;
          max-width: 370px;
          height: 520px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 104px 24px 52px;
          transition: transform 0.35s cubic-bezier(0.34, 1.45, 0.64, 1), filter 0.35s ease;
        }

        .royal-arch-card:hover {
          transform: translateY(-4px) scale(1.012);
        }

        .royal-arch-card-frame {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: fill;
          pointer-events: none;
          filter: drop-shadow(0 12px 25px rgba(0, 0, 0, 0.4));
          transition: filter 0.35s ease;
        }

        .royal-arch-card:hover .royal-arch-card-frame {
          filter: drop-shadow(0 18px 35px rgba(0, 0, 0, 0.55)) drop-shadow(0 0 12px rgba(203, 161, 53, 0.3));
        }

        /* Family Photo Frame inside Arched Card */
        .family-photo-wrap {
          position: relative;
          width: 100%;
          max-width: 255px;
          height: 140px;
          border-radius: 10px;
          overflow: hidden;
          margin: 8px 0;
          border: 1.5px solid #CBA135;
          box-shadow: 0 5px 15px rgba(59, 13, 26, 0.2);
        }

        .family-photo-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.5s ease;
        }

        .royal-arch-card:hover .family-photo-wrap img {
          transform: scale(1.05);
        }

        .view-family-btn {
          margin-top: auto;
          font-family: 'Cinzel', serif;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #3B0D1A;
          background: rgba(245, 230, 200, 0.45);
          border: 1.5px solid rgba(163, 115, 38, 0.65);
          padding: 8px 24px;
          border-radius: 999px;
          cursor: pointer;
          box-shadow: 0 3px 10px rgba(59, 13, 26, 0.12);
          transition: all 0.25s ease;
        }

        .view-family-btn:hover {
          transform: translateY(-1.5px);
          background: #3B0D1A;
          color: #FBF1DE;
          border-color: #3B0D1A;
          box-shadow: 0 6px 16px rgba(59, 13, 26, 0.35);
        }
      `}</style>

      {/* FULL UN-DARKENED BACKGROUND IMAGE */}
      <img
        src={familyBg}
        alt="Royal Palace Courtyard Background"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none z-0"
      />

      {/* Ambient Glow */}
      <WarmGlow className="left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none" />

      {/* TOP HEADER SECTION */}
      <div className="relative z-20 flex flex-col items-center text-center mt-1 sm:mt-2 max-w-xl px-4">
        {/* Top Lotus Crest */}
        <div className="flex items-center justify-center gap-2 mb-0.5">
          <span className="w-6 h-[1px] bg-gradient-to-r from-transparent to-[#A37326]" />
          <LotusCrest className="w-4 h-4 text-[#8C2338]" />
          <span className="w-6 h-[1px] bg-gradient-to-l from-transparent to-[#A37326]" />
        </div>

        {/* Main Title: OUR FAMILIES */}
        <h1 className="font-['Cinzel',serif] font-bold text-2xl sm:text-3xl md:text-4xl text-[#3B0D1A] tracking-[0.14em]">
          OUR FAMILIES
        </h1>

        {/* Subtitle */}
        <p className="font-['Cormorant_Garamond',serif] italic font-medium text-sm sm:text-base text-[#3B0D1A]/90 mt-0.5">
          Two families, one beautiful beginning
        </p>

        {/* Bottom Ornament */}
        <div className="flex items-center justify-center gap-1 mt-0.5 text-[#A37326] text-[10px]">
          <span>✦</span>
          <span className="w-3 h-[1px] bg-[#A37326]" />
          <span>✦</span>
        </div>
      </div>

      {/* MAIN LAYOUT: BRIDE CARD | CENTER PHOTO MEDALLION | GROOM CARD */}
      <div className="family-cards-container relative z-10 my-auto">
        
        {/* ==================== LEFT CARD: THE BRIDE'S FAMILY ==================== */}
        <div className="royal-arch-card">
          <img src={familyCardFrame} alt="Royal Arch Frame" className="royal-arch-card-frame" />

          <div className="relative z-10 w-full flex flex-col items-center h-full justify-between">
            {/* Heading with extra top margin so it sits comfortably in the center blank parchment area */}
            <h2 className="font-['Cinzel',serif] text-lg sm:text-xl font-bold text-[#3B0D1A] tracking-[0.14em] uppercase leading-tight mt-1">
              THE BRIDE'S<br />FAMILY
            </h2>

            {/* Divider */}
            <div className="w-10 h-[1px] bg-[#A37326]/40 my-1" />

            {/* Family Photo */}
            <div className="family-photo-wrap">
              <img src={brideFamilyData.photo} alt={brideFamilyData.title} />
            </div>

            {/* PARENTS Section */}
            <div className="w-full text-center my-1.5">
              <p className="font-['Cinzel',serif] text-[10px] sm:text-[10.5px] uppercase tracking-[0.2em] text-[#3B0D1A]/80 font-bold">
                PARENTS
              </p>
              <p className="font-['Cormorant_Garamond',serif] font-bold text-base sm:text-lg text-[#3B0D1A] mt-0.5">
                {brideFamilyData.parentsSummary}
              </p>
            </div>

            {/* Button */}
            <button
              type="button"
              className="view-family-btn"
              onClick={() => setActiveModal("bride")}
            >
              ✦ VIEW FAMILY ✦
            </button>
          </div>
        </div>


        {/* ==================== CENTER EMBLEM: BRIDE & GROOM PHOTO MEDALLION ==================== */}
        <CouplePhotoMedallion />


        {/* ==================== RIGHT CARD: THE GROOM'S FAMILY ==================== */}
        <div className="royal-arch-card">
          <img src={familyCardFrame} alt="Royal Arch Frame" className="royal-arch-card-frame" />

          <div className="relative z-10 w-full flex flex-col items-center h-full justify-between">
            {/* Heading with extra top margin so it sits comfortably in the center blank parchment area */}
            <h2 className="font-['Cinzel',serif] text-lg sm:text-xl font-bold text-[#3B0D1A] tracking-[0.14em] uppercase leading-tight mt-1">
              THE GROOM'S<br />FAMILY
            </h2>

            {/* Divider */}
            <div className="w-10 h-[1px] bg-[#A37326]/40 my-1" />

            {/* Family Photo */}
            <div className="family-photo-wrap">
              <img src={groomFamilyData.photo} alt={groomFamilyData.title} />
            </div>

            {/* PARENTS Section */}
            <div className="w-full text-center my-1.5">
              <p className="font-['Cinzel',serif] text-[10px] sm:text-[10.5px] uppercase tracking-[0.2em] text-[#3B0D1A]/80 font-bold">
                PARENTS
              </p>
              <p className="font-['Cormorant_Garamond',serif] font-bold text-base sm:text-lg text-[#3B0D1A] mt-0.5">
                {groomFamilyData.parentsSummary}
              </p>
            </div>

            {/* Button */}
            <button
              type="button"
              className="view-family-btn"
              onClick={() => setActiveModal("groom")}
            >
              ✦ VIEW FAMILY ✦
            </button>
          </div>
        </div>

      </div>

      {/* POPUP MODAL: DETAILED FAMILY MEMBERS */}
      {selectedFamily && (
        <div
          onClick={() => setActiveModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C050E]/85 backdrop-blur-md px-4 py-8 animate-in fade-in transition-all duration-300 select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[85vh] bg-[#FBF1DE] text-[#2E0B15] p-5 sm:p-7 rounded-xl border-2 border-[#CBA135] shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_35px_rgba(203,161,53,0.4)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-[#3B0D1A]/10 hover:bg-[#3B0D1A] text-[#3B0D1A] hover:text-[#FBF1DE] border border-[#CBA135]/50 flex items-center justify-center cursor-pointer transition-colors font-bold"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="relative z-10 text-center pb-3.5 border-b border-[#A37326]/40">
              <span className="font-['Cinzel',serif] text-[11px] uppercase tracking-[0.3em] font-bold text-[#3B0D1A]">
                {selectedFamily.sideName}
              </span>
              <h2 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl font-bold text-[#3B0D1A] tracking-wide mt-0.5">
                {selectedFamily.title}
              </h2>
              <p className="font-['Cormorant_Garamond',serif] italic text-base text-[#591426]">
                {selectedFamily.subtitle}
              </p>
              <div className="w-16 h-[1.5px] bg-[#CBA135] mx-auto mt-2 opacity-80" />
            </div>

            {/* Scrollable Members List */}
            <div className="relative z-10 mt-4 flex-1 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {selectedFamily.members.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-[#F8EBCD] border border-[#A37326]/40 shadow-xs flex flex-col justify-between hover:border-[#3B0D1A] hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    {/* Medallion Avatar */}
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#CBA135] via-[#EAD59A] to-[#4A0E1C] p-0.5 shadow-sm shrink-0">
                      <div className="w-full h-full rounded-full bg-[#3B0D1A] flex items-center justify-center text-[#EAD59A] font-bold text-base">
                        {m.name[0]}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-['Cormorant_Garamond',serif] text-lg font-bold text-[#3B0D1A] leading-tight">
                        {m.name}
                      </h3>
                      <p className="font-['Cinzel',serif] text-[10px] uppercase tracking-wider font-bold text-[#8C2338]">
                        {m.relation}
                      </p>
                    </div>
                  </div>

                  {/* Relationship to Bride or Groom */}
                  <div className="pt-2 border-t border-[#A37326]/25">
                    <span className="inline-block px-2.5 py-0.5 rounded bg-[#3B0D1A]/10 border border-[#3B0D1A]/30 text-[#3B0D1A] font-['Cinzel',serif] text-[9.5px] uppercase tracking-widest font-bold mb-1">
                      {m.relationshipToGroomOrBride}
                    </span>
                    <p className="font-['Cormorant_Garamond',serif] italic text-xs text-[#2E0B15]/85 leading-snug">
                      {m.roleDescription}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Ambient Layer */}
      <AmbientLayer dust={7} petals={2} />
    </section>
  );
}
