import { useState } from "react";
import { wedding } from "../data/wedding";
import { usePrefersReducedMotion } from "../engine/SceneProvider";
import { AmbientLayer, WarmGlow } from "../ui/Ambient";
import { Divider } from "../ui/Ornaments";
import familyBg from "/assets/family-tree-background.png";
import groomFamilyPhoto from "/assets/groom-family.png";
import brideFamilyPhoto from "/assets/bride-family.png";

interface FamilyMemberDetail {
  name: string;
  relation: string;
  relationshipToGroomOrBride: string;
  roleDescription: string;
}

interface FamilyData {
  title: string;
  sideName: string;
  subtitle: string;
  parentsSummary: string;
  photo: string;
  members: FamilyMemberDetail[];
}

const groomFamilyData: FamilyData = {
  title: `${wedding.couple.groom}'s Family`,
  sideName: "Groom's Lineage",
  subtitle: "The Esteemed House of Sharma",
  parentsSummary: "Rajesh & Sunita Sharma",
  photo: groomFamilyPhoto,
  members: [
    {
      name: "Rajesh Sharma",
      relation: "Father",
      relationshipToGroomOrBride: `Father of the Groom (${wedding.couple.groom})`,
      roleDescription: "Guiding pillar of the family, extending warm greetings to all guests.",
    },
    {
      name: "Sunita Sharma",
      relation: "Mother",
      relationshipToGroomOrBride: `Mother of the Groom (${wedding.couple.groom})`,
      roleDescription: "Heart of the household, bestowing unconditional love and blessings.",
    },
    {
      name: "Dadi Maa & Dadu Ji",
      relation: "Grandparents",
      relationshipToGroomOrBride: `Paternal Grandparents of ${wedding.couple.groom}`,
      roleDescription: "Elders of the royal tree, sharing wisdom and traditional heritage.",
    },
    {
      name: "Chacha Ji & Chachi Ji",
      relation: "Paternal Relatives",
      relationshipToGroomOrBride: `Uncle & Aunt of ${wedding.couple.groom}`,
      roleDescription: "Bringing warmth, laughter, and enthusiastic support to the celebration.",
    },
  ],
};

const brideFamilyData: FamilyData = {
  title: `${wedding.couple.bride}'s Family`,
  sideName: "Bride's Lineage",
  subtitle: "The Graceful House of Sharma",
  parentsSummary: "Vikram & Kavita Sharma",
  photo: brideFamilyPhoto,
  members: [
    {
      name: "Vikram Sharma",
      relation: "Father",
      relationshipToGroomOrBride: `Father of the Bride (${wedding.couple.bride})`,
      roleDescription: "Proud father, extending a royal welcome to our family and esteemed guests.",
    },
    {
      name: "Kavita Sharma",
      relation: "Mother",
      relationshipToGroomOrBride: `Mother of the Bride (${wedding.couple.bride})`,
      roleDescription: "Loving mother, welcoming the groom with warmth and divine auspiciousness.",
    },
    {
      name: "Nani Maa & Nana Ji",
      relation: "Grandparents",
      relationshipToGroomOrBride: `Maternal Grandparents of ${wedding.couple.bride}`,
      roleDescription: "Treasured matriarchs and patriarchs, blessing the new couple's union.",
    },
    {
      name: "Foi Ba & Fupa Ji",
      relation: "Paternal Relatives",
      relationshipToGroomOrBride: `Aunt & Uncle of ${wedding.couple.bride}`,
      roleDescription: "Bringing festive joy, traditional songs, and heartwarming blessings.",
    },
  ],
};

export default function FamilyScene() {
  const reduced = usePrefersReducedMotion();
  const [activeModal, setActiveModal] = useState<"groom" | "bride" | null>(null);

  const selectedFamily = activeModal === "groom" ? groomFamilyData : activeModal === "bride" ? brideFamilyData : null;

  return (
    <section className="family-scene-root relative w-full h-full min-h-screen overflow-x-hidden overflow-y-auto flex flex-col items-center justify-between py-6 px-4 pb-20 select-none">
      <style>{`
        .family-scene-root {
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

        .family-scene-root .jaali {
          position: absolute; inset: 0; opacity: 0.10;
          background-image:
            linear-gradient(45deg, var(--gold) 1px, transparent 1px),
            linear-gradient(-45deg, var(--gold) 1px, transparent 1px);
          background-size: 34px 34px;
          mask-image: radial-gradient(120% 100% at 50% 20%, black 30%, transparent 78%);
          pointer-events: none;
        }

        .family-cards-grid {
          display: flex;
          flex-direction: column;
          gap: 24px;
          width: min(920px, 100%);
          margin: auto 0;
          z-index: 2;
        }

        @media (min-width: 680px) {
          .family-cards-grid {
            flex-direction: row;
            align-items: stretch;
          }
        }

        /* White & Golden Glassmorphism Card Style */
        .white-gold-glass-card {
          flex: 1;
          position: relative;
          background: rgba(251, 241, 222, 0.18);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1.5px solid rgba(234, 213, 154, 0.65);
          border-radius: 20px;
          padding: 24px 20px 22px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: 0 18px 45px rgba(0, 0, 0, 0.6), inset 0 0 25px rgba(255, 252, 245, 0.2), 0 0 15px rgba(203, 161, 53, 0.25);
          transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
          overflow: hidden;
        }

        .white-gold-glass-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #EAD59A, transparent);
          opacity: 0.95;
        }

        .white-gold-glass-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 26px 55px rgba(0,0,0,0.8), inset 0 0 35px rgba(255, 252, 245, 0.3), 0 0 25px rgba(234, 213, 154, 0.45);
          border-color: #EAD59A;
        }

        /* Family Photo Frame */
        .family-photo-wrap {
          position: relative;
          width: 100%;
          max-width: 260px;
          height: 160px;
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 16px;
          border: 2px solid var(--gold);
          box-shadow: 0 8px 20px rgba(0,0,0,0.5);
        }

        .family-photo-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.5s ease;
        }

        .white-gold-glass-card:hover .family-photo-wrap img {
          transform: scale(1.05);
        }

        .explore-btn {
          margin-top: auto;
          font-family: 'Rajdhani', sans-serif;
          font-weight: 700;
          font-size: 13px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--ink);
          background: linear-gradient(180deg, var(--gold-light), var(--gold));
          border: none;
          padding: 11px 24px;
          border-radius: 999px;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(203,161,53,0.4), inset 0 0 0 1px rgba(255,255,255,0.4);
          transition: transform 0.25s ease, background 0.25s ease, box-shadow 0.25s ease;
        }

        .explore-btn:hover {
          transform: translateY(-2px);
          background: linear-gradient(180deg, #FFF0C4, var(--marigold-2));
          box-shadow: 0 12px 26px rgba(242,169,60,0.5);
        }
      `}</style>

      {/* Background Image Layer */}
      <img
        src={familyBg}
        alt="Royal Courtyard Background"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-30 scale-105 pointer-events-none"
      />
      <div className="jaali" aria-hidden="true" />
      <WarmGlow className="left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 opacity-35 pointer-events-none" />

      {/* Top Header Section (Aligned at the top like all other chapters) */}
      <div className="relative z-20 flex flex-col items-center text-center mt-2">
        <span className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.35em] text-[#EAD59A] font-semibold">
          Chapter Four • Family Heritage
        </span>
        <h1 className="mt-1 font-['Cormorant_Garamond',serif] italic font-semibold text-3xl sm:text-4xl text-[#EAD59A] tracking-wide drop-shadow-md">
          Two Families, One Divine Bond
        </h1>
        <p className="mt-1 font-sans text-xs sm:text-sm text-[#d8c1af] max-w-md">
          Explore the cherished lineages of the Bride and Groom who come together to celebrate this royal union.
        </p>
        <Divider className="mt-2.5 h-2.5 w-36 text-[#CBA135]/80" />
      </div>

      {/* Main Two Cards Layout: Centered & White-Golden Glassmorphism */}
      <div className="family-cards-grid">
        {/* Groom Family Card */}
        <div className="white-gold-glass-card">
          {/* Family Photo */}
          <div className="family-photo-wrap">
            <img src={groomFamilyData.photo} alt={groomFamilyData.title} />
          </div>

          <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-bold text-[#4FA89B]">
            {groomFamilyData.sideName}
          </span>
          <h2 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl font-semibold text-[#EAD59A] mt-1 mb-0.5">
            {groomFamilyData.title}
          </h2>
          <p className="font-['Cormorant_Garamond',serif] italic text-base text-[#FBF1DE]/90 mb-2">
            {groomFamilyData.subtitle}
          </p>
          <div className="w-12 h-[1px] bg-[#CBA135]/60 mb-2" />
          <p className="font-sans text-xs uppercase tracking-wider text-[#EAD59A]/90 font-semibold mb-5">
            Parents: <span className="text-[#FBF1DE] font-bold">{groomFamilyData.parentsSummary}</span>
          </p>

          <button
            type="button"
            className="explore-btn"
            onClick={() => setActiveModal("groom")}
          >
            Explore Family ✦
          </button>
        </div>

        {/* Bride Family Card */}
        <div className="white-gold-glass-card">
          {/* Family Photo */}
          <div className="family-photo-wrap">
            <img src={brideFamilyData.photo} alt={brideFamilyData.title} />
          </div>

          <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-bold text-[#4FA89B]">
            {brideFamilyData.sideName}
          </span>
          <h2 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl font-semibold text-[#EAD59A] mt-1 mb-0.5">
            {brideFamilyData.title}
          </h2>
          <p className="font-['Cormorant_Garamond',serif] italic text-base text-[#FBF1DE]/90 mb-2">
            {brideFamilyData.subtitle}
          </p>
          <div className="w-12 h-[1px] bg-[#CBA135]/60 mb-2" />
          <p className="font-sans text-xs uppercase tracking-wider text-[#EAD59A]/90 font-semibold mb-5">
            Parents: <span className="text-[#FBF1DE] font-bold">{brideFamilyData.parentsSummary}</span>
          </p>

          <button
            type="button"
            className="explore-btn"
            onClick={() => setActiveModal("bride")}
          >
            Explore Family ✦
          </button>
        </div>
      </div>

      {/* Explore Family Modal Popup Component */}
      {selectedFamily && (
        <div
          onClick={() => setActiveModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2C0714]/85 backdrop-blur-md px-4 py-8 animate-in fade-in transition-all duration-300 select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[85vh] bg-gradient-to-b from-[#FBF1DE] via-[#F5E7CC] to-[#EAD59A] text-[#331019] p-5 sm:p-7 rounded-xl border-2 border-[#CBA135] shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_35px_rgba(203,161,53,0.4)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300"
          >
            {/* Corner Filigree Accents */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#0F6B62] rounded-tl-xs pointer-events-none" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#0F6B62] rounded-tr-xs pointer-events-none" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#0F6B62] rounded-bl-xs pointer-events-none" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#0F6B62] rounded-br-xs pointer-events-none" />

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#331019]/10 border border-[#0F6B62]/40 text-[#6E1B34] hover:text-[#331019] hover:bg-[#331019]/20 flex items-center justify-center text-xs cursor-pointer transition-colors font-bold"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Modal Header */}
            <div className="relative z-10 text-center pb-4 border-b border-[#0F6B62]/30">
              <span className="font-['Cinzel',serif] text-[11px] uppercase tracking-[0.3em] font-bold text-[#0F6B62]">
                {selectedFamily.sideName}
              </span>
              <h2 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl font-semibold text-[#6E1B34] tracking-wide mt-0.5">
                {selectedFamily.title}
              </h2>
              <p className="font-['Cormorant_Garamond',serif] italic text-sm text-[#430E1F]">
                {selectedFamily.subtitle}
              </p>
              <div className="w-16 h-[1.5px] bg-[#CBA135] mx-auto mt-2 opacity-80" />
            </div>

            {/* Scrollable Members List showing parents and relationship */}
            <div className="relative z-10 mt-4 flex-1 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {selectedFamily.members.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-lg bg-[#FBF1DE] border border-[#CBA135]/60 shadow-sm flex flex-col justify-between hover:border-[#0F6B62] hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3 mb-2.5">
                    {/* Medallion Avatar */}
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#CBA135] via-[#EAD59A] to-[#6E1B34] p-0.5 shadow-sm shrink-0">
                      <div className="w-full h-full rounded-full bg-[#2C0714] flex items-center justify-center text-[#EAD59A] font-bold text-base">
                        {m.name[0]}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-['Cormorant_Garamond',serif] text-lg font-bold text-[#6E1B34] leading-tight">
                        {m.name}
                      </h3>
                      <p className="font-['Rajdhani',sans-serif] text-[11px] uppercase tracking-wider font-semibold text-[#0F6B62]">
                        {m.relation}
                      </p>
                    </div>
                  </div>

                  {/* Relationship to Bride or Groom */}
                  <div className="pt-2 border-t border-[#CBA135]/30">
                    <span className="inline-block px-2.5 py-0.5 rounded bg-[#0F6B62]/10 border border-[#0F6B62]/30 text-[#0F6B62] font-['Rajdhani',sans-serif] text-[10px] uppercase tracking-widest font-bold mb-1">
                      {m.relationshipToGroomOrBride}
                    </span>
                    <p className="font-['Cormorant_Garamond',serif] italic text-xs text-[#331019]/80 leading-snug">
                      {m.roleDescription}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <AmbientLayer dust={7} petals={2} />
    </section>
  );
}
