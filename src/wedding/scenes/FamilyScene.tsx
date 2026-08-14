import { useState, useEffect, useRef } from "react";
import { wedding } from "../data/wedding";
import { usePrefersReducedMotion } from "../engine/SceneProvider";
import { AmbientLayer, WarmGlow } from "../ui/Ambient";
import familyBg from "/assets/family-tree-bg.jpg";
import familyCardFrame from "/assets/family-card-frame.png";
import groomFamilyPhoto from "/assets/groom-family.png";
import brideFamilyPhoto from "/assets/bride-family.png";
import couplePhoto from "/assets/couple.jpg";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface FamilyMemberDetail {
  name: string;
  relation: string;
  relationshipToGroomOrBride: string;
  roleDescription: string;
}

interface FamilyData {
  id: "bride" | "groom";
  title: string;
  cardTitle: string;
  headingLine1: string;
  headingLine2: string;
  sideName: string;
  subtitle: string;
  parentsSummary: string;
  grandparents: string[];
  siblings: string[];
  photo: string;
  members: FamilyMemberDetail[];
}

const brideFamilyData: FamilyData = {
  id: "bride",
  title: `${wedding.couple.bride}'s Family`,
  cardTitle: "THE BRIDE'S FAMILY",
  headingLine1: "THE BRIDE'S",
  headingLine2: "FAMILY",
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
  id: "groom",
  title: `${wedding.couple.groom}'s Family`,
  cardTitle: "THE GROOM'S FAMILY",
  headingLine1: "THE GROOM'S",
  headingLine2: "FAMILY",
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

const familiesList: FamilyData[] = [brideFamilyData, groomFamilyData];

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

/* ==================== HANGING TREE BRANCHES & FLORAL BAIL WITH PENDULUM SWAY ==================== */
const LeftFloralBranch = () => (
  <div className="absolute -top-1 left-0 z-1 pointer-events-none origin-top-left branch-pendulum-left w-36 sm:w-56 md:w-72">
    <svg viewBox="0 0 240 180" fill="none" className="w-full h-auto drop-shadow-[0_6px_14px_rgba(0,0,0,0.35)]">
      {/* Main Arching Branch Stem */}
      <path
        d="M-10 0 C40 20 80 15 130 50 C170 78 190 120 215 160"
        stroke="#5C3814"
        strokeWidth="3.8"
        strokeLinecap="round"
      />
      {/* Sub twigs */}
      <path d="M70 18 C90 35 110 40 125 35" stroke="#7A4D1E" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M130 50 C145 68 155 90 150 110" stroke="#7A4D1E" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M175 88 C195 100 205 115 200 135" stroke="#7A4D1E" strokeWidth="1.8" strokeLinecap="round" />
      
      {/* Leaves (Gold & Royal Emerald) */}
      <path d="M50 14 C45 5 35 2 30 8 C25 14 38 18 50 14Z" fill="#1C6B56" stroke="#CBA135" strokeWidth="0.8" />
      <path d="M85 24 C90 15 102 12 105 20 C108 28 95 30 85 24Z" fill="#CBA135" opacity="0.9" />
      <path d="M125 35 C135 28 145 32 142 42 C139 50 128 45 125 35Z" fill="#1C6B56" stroke="#CBA135" strokeWidth="0.8" />
      <path d="M148 78 C158 70 168 76 164 86 C160 94 150 88 148 78Z" fill="#2D7A65" />
      <path d="M185 105 C198 98 208 106 202 118 C196 126 186 118 185 105Z" fill="#CBA135" opacity="0.85" />
      <path d="M215 160 C225 152 232 162 226 172 C220 180 212 170 215 160Z" fill="#1C6B56" />

      {/* Blossomed Popped Flowers (Multi-petal Royal Pink, Rose & Marigold) */}
      {/* Flower 1 */}
      <g transform="translate(125, 35)" className="flower-sway-pulse">
        <circle cx="0" cy="-6" r="4.5" fill="#C93B57" />
        <circle cx="6" cy="-2" r="4.5" fill="#C93B57" />
        <circle cx="4" cy="5" r="4.5" fill="#D94B67" />
        <circle cx="-4" cy="5" r="4.5" fill="#D94B67" />
        <circle cx="-6" cy="-2" r="4.5" fill="#C93B57" />
        <circle cx="0" cy="0" r="3" fill="#FFD700" stroke="#8C2338" strokeWidth="0.8" />
      </g>

      {/* Flower 2 */}
      <g transform="translate(150, 110)" className="flower-sway-pulse">
        <circle cx="0" cy="-5.5" r="4" fill="#E2790E" />
        <circle cx="5" cy="-1.5" r="4" fill="#E2790E" />
        <circle cx="3" cy="4.5" r="4" fill="#F49D37" />
        <circle cx="-3" cy="4.5" r="4" fill="#F49D37" />
        <circle cx="-5" cy="-1.5" r="4" fill="#E2790E" />
        <circle cx="0" cy="0" r="2.8" fill="#FFF275" stroke="#A37326" strokeWidth="0.8" />
      </g>

      {/* Flower 3 */}
      <g transform="translate(200, 135)" className="flower-sway-pulse">
        <circle cx="0" cy="-6" r="4.5" fill="#C93B57" />
        <circle cx="6" cy="-2" r="4.5" fill="#C93B57" />
        <circle cx="4" cy="5" r="4.5" fill="#E55B77" />
        <circle cx="-4" cy="5" r="4.5" fill="#E55B77" />
        <circle cx="-6" cy="-2" r="4.5" fill="#C93B57" />
        <circle cx="0" cy="0" r="3" fill="#FFD700" stroke="#8C2338" strokeWidth="0.8" />
      </g>

      {/* Flower 4 (Tip Blossom) */}
      <g transform="translate(215, 160)" className="flower-sway-pulse">
        <circle cx="0" cy="-4" r="3.2" fill="#F6AD55" />
        <circle cx="4" cy="-1" r="3.2" fill="#F6AD55" />
        <circle cx="2" cy="3" r="3.2" fill="#FBD38D" />
        <circle cx="-2" cy="3" r="3.2" fill="#FBD38D" />
        <circle cx="-4" cy="-1" r="3.2" fill="#F6AD55" />
        <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
      </g>
    </svg>
  </div>
);

const RightFloralBranch = () => (
  <div className="absolute -top-1 right-0 z-1 pointer-events-none origin-top-right branch-pendulum-right w-36 sm:w-56 md:w-72">
    <svg viewBox="0 0 240 180" fill="none" className="w-full h-auto drop-shadow-[0_6px_14px_rgba(0,0,0,0.35)] scale-x-[-1]">
      <path
        d="M-10 0 C40 20 80 15 130 50 C170 78 190 120 215 160"
        stroke="#5C3814"
        strokeWidth="3.8"
        strokeLinecap="round"
      />
      <path d="M70 18 C90 35 110 40 125 35" stroke="#7A4D1E" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M130 50 C145 68 155 90 150 110" stroke="#7A4D1E" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M175 88 C195 100 205 115 200 135" stroke="#7A4D1E" strokeWidth="1.8" strokeLinecap="round" />
      
      <path d="M50 14 C45 5 35 2 30 8 C25 14 38 18 50 14Z" fill="#1C6B56" stroke="#CBA135" strokeWidth="0.8" />
      <path d="M85 24 C90 15 102 12 105 20 C108 28 95 30 85 24Z" fill="#CBA135" opacity="0.9" />
      <path d="M125 35 C135 28 145 32 142 42 C139 50 128 45 125 35Z" fill="#1C6B56" stroke="#CBA135" strokeWidth="0.8" />
      <path d="M148 78 C158 70 168 76 164 86 C160 94 150 88 148 78Z" fill="#2D7A65" />
      <path d="M185 105 C198 98 208 106 202 118 C196 126 186 118 185 105Z" fill="#CBA135" opacity="0.85" />
      <path d="M215 160 C225 152 232 162 226 172 C220 180 212 170 215 160Z" fill="#1C6B56" />

      {/* Blossomed Popped Flowers */}
      <g transform="translate(125, 35)" className="flower-sway-pulse">
        <circle cx="0" cy="-6" r="4.5" fill="#C93B57" />
        <circle cx="6" cy="-2" r="4.5" fill="#C93B57" />
        <circle cx="4" cy="5" r="4.5" fill="#D94B67" />
        <circle cx="-4" cy="5" r="4.5" fill="#D94B67" />
        <circle cx="-6" cy="-2" r="4.5" fill="#C93B57" />
        <circle cx="0" cy="0" r="3" fill="#FFD700" stroke="#8C2338" strokeWidth="0.8" />
      </g>

      <g transform="translate(150, 110)" className="flower-sway-pulse">
        <circle cx="0" cy="-5.5" r="4" fill="#E2790E" />
        <circle cx="5" cy="-1.5" r="4" fill="#E2790E" />
        <circle cx="3" cy="4.5" r="4" fill="#F49D37" />
        <circle cx="-3" cy="4.5" r="4" fill="#F49D37" />
        <circle cx="-5" cy="-1.5" r="4" fill="#E2790E" />
        <circle cx="0" cy="0" r="2.8" fill="#FFF275" stroke="#A37326" strokeWidth="0.8" />
      </g>

      <g transform="translate(200, 135)" className="flower-sway-pulse">
        <circle cx="0" cy="-6" r="4.5" fill="#C93B57" />
        <circle cx="6" cy="-2" r="4.5" fill="#C93B57" />
        <circle cx="4" cy="5" r="4.5" fill="#E55B77" />
        <circle cx="-4" cy="5" r="4.5" fill="#E55B77" />
        <circle cx="-6" cy="-2" r="4.5" fill="#C93B57" />
        <circle cx="0" cy="0" r="3" fill="#FFD700" stroke="#8C2338" strokeWidth="0.8" />
      </g>

      <g transform="translate(215, 160)" className="flower-sway-pulse">
        <circle cx="0" cy="-4" r="3.2" fill="#F6AD55" />
        <circle cx="4" cy="-1" r="3.2" fill="#F6AD55" />
        <circle cx="2" cy="3" r="3.2" fill="#FBD38D" />
        <circle cx="-2" cy="3" r="3.2" fill="#FBD38D" />
        <circle cx="-4" cy="-1" r="3.2" fill="#F6AD55" />
        <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
      </g>
    </svg>
  </div>
);

const TopCanopyFloralBail = () => (
  <div className="absolute top-0 inset-x-0 z-1 pointer-events-none flex justify-center overflow-hidden opacity-85">
    <svg viewBox="0 0 1000 50" preserveAspectRatio="none" className="w-full h-8 sm:h-12">
      <path
        d="M0 6 Q 250 38 500 10 Q 750 38 1000 6"
        stroke="#A37326"
        strokeWidth="1.5"
        strokeDasharray="4 2"
        fill="none"
      />
      <g transform="translate(140, 22)">
        <line x1="0" y1="0" x2="0" y2="10" stroke="#A37326" strokeWidth="1" />
        <circle cx="0" cy="12" r="3" fill="#C93B57" />
        <circle cx="0" cy="12" r="1.2" fill="#FFD700" />
      </g>
      <g transform="translate(260, 28)">
        <line x1="0" y1="0" x2="0" y2="14" stroke="#A37326" strokeWidth="1" />
        <circle cx="0" cy="16" r="3.5" fill="#E2790E" />
        <circle cx="0" cy="16" r="1.5" fill="#FFF275" />
      </g>
      <g transform="translate(380, 22)">
        <line x1="0" y1="0" x2="0" y2="10" stroke="#A37326" strokeWidth="1" />
        <circle cx="0" cy="12" r="3" fill="#C93B57" />
        <circle cx="0" cy="12" r="1.2" fill="#FFD700" />
      </g>
      <g transform="translate(500, 10)">
        <circle cx="0" cy="0" r="4" fill="#CBA135" />
        <circle cx="0" cy="0" r="1.8" fill="#8C2338" />
      </g>
      <g transform="translate(620, 22)">
        <line x1="0" y1="0" x2="0" y2="10" stroke="#A37326" strokeWidth="1" />
        <circle cx="0" cy="12" r="3" fill="#C93B57" />
        <circle cx="0" cy="12" r="1.2" fill="#FFD700" />
      </g>
      <g transform="translate(740, 28)">
        <line x1="0" y1="0" x2="0" y2="14" stroke="#A37326" strokeWidth="1" />
        <circle cx="0" cy="16" r="3.5" fill="#E2790E" />
        <circle cx="0" cy="16" r="1.5" fill="#FFF275" />
      </g>
      <g transform="translate(860, 22)">
        <line x1="0" y1="0" x2="0" y2="10" stroke="#A37326" strokeWidth="1" />
        <circle cx="0" cy="12" r="3" fill="#C93B57" />
        <circle cx="0" cy="12" r="1.2" fill="#FFD700" />
      </g>
    </svg>
  </div>
);

/* ==================== BOTTOM CORNER ROTATING FLOWERS ==================== */
const BottomLeftRotatingFlower = () => (
  <div className="absolute -bottom-7 -left-7 sm:-bottom-9 sm:-left-9 z-1 pointer-events-none w-28 h-28 sm:w-40 sm:h-40 opacity-75 sm:opacity-85">
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full flower-spin-slow drop-shadow-[0_4px_14px_rgba(0,0,0,0.35)]">
      <g transform="translate(50,50)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <g key={i} transform={`rotate(${angle})`}>
            <path
              d="M0 -8 C-7 -20 0 -38 0 -40 C0 -38 7 -20 0 -8Z"
              fill="#8C2338"
              stroke="#CBA135"
              strokeWidth="0.8"
            />
            <path
              d="M0 -10 C-4 -18 0 -30 0 -30 C0 -30 4 -18 0 -10Z"
              fill="#B8334E"
            />
          </g>
        ))}
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
          <g key={i} transform={`rotate(${angle})`}>
            <path
              d="M0 -6 C-4 -14 0 -24 0 -24 C0 -24 4 -14 0 -6Z"
              fill="#E2790E"
              stroke="#FFF275"
              strokeWidth="0.6"
            />
          </g>
        ))}
        <circle cx="0" cy="0" r="9" fill="#CBA135" stroke="#3B0D1A" strokeWidth="1" />
        <circle cx="0" cy="0" r="5.5" fill="#8C2338" />
        <circle cx="0" cy="0" r="2.2" fill="#FFD700" />
      </g>
    </svg>
  </div>
);

const BottomRightRotatingFlower = () => (
  <div className="absolute -bottom-7 -right-7 sm:-bottom-9 sm:-right-9 z-1 pointer-events-none w-28 h-28 sm:w-40 sm:h-40 opacity-75 sm:opacity-85">
    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full flower-spin-slow-rev drop-shadow-[0_4px_14px_rgba(0,0,0,0.35)]">
      <g transform="translate(50,50)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <g key={i} transform={`rotate(${angle})`}>
            <path
              d="M0 -8 C-7 -20 0 -38 0 -40 C0 -38 7 -20 0 -8Z"
              fill="#8C2338"
              stroke="#CBA135"
              strokeWidth="0.8"
            />
            <path
              d="M0 -10 C-4 -18 0 -30 0 -30 C0 -30 4 -18 0 -10Z"
              fill="#B8334E"
            />
          </g>
        ))}
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle, i) => (
          <g key={i} transform={`rotate(${angle})`}>
            <path
              d="M0 -6 C-4 -14 0 -24 0 -24 C0 -24 4 -14 0 -6Z"
              fill="#E2790E"
              stroke="#FFF275"
              strokeWidth="0.6"
            />
          </g>
        ))}
        <circle cx="0" cy="0" r="9" fill="#CBA135" stroke="#3B0D1A" strokeWidth="1" />
        <circle cx="0" cy="0" r="5.5" fill="#8C2338" />
        <circle cx="0" cy="0" r="2.2" fill="#FFD700" />
      </g>
    </svg>
  </div>
);

export default function FamilyScene() {
  const reduced = usePrefersReducedMotion();
  const [activeModal, setActiveModal] = useState<"groom" | "bride" | null>(null);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const touchStartX = useRef<number>(0);

  const selectedFamily = activeModal === "groom" ? groomFamilyData : activeModal === "bride" ? brideFamilyData : null;

  // Auto-play carousel on mobile
  useEffect(() => {
    if (reduced || activeModal !== null || isPaused) return;

    const timer = setInterval(() => {
      setDirection("next");
      setActiveSlide((prev) => (prev + 1) % familiesList.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [reduced, activeModal, isPaused]);

  const handleNextSlide = () => {
    setDirection("next");
    setActiveSlide((prev) => (prev + 1) % familiesList.length);
  };

  const handlePrevSlide = () => {
    setDirection("prev");
    setActiveSlide((prev) => (prev - 1 + familiesList.length) % familiesList.length);
  };

  const handleSelectSlide = (idx: number) => {
    if (idx === activeSlide) return;
    setDirection(idx > activeSlide ? "next" : "prev");
    setActiveSlide(idx);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 40) {
      handleNextSlide();
    } else if (diff < -40) {
      handlePrevSlide();
    }
    setTimeout(() => setIsPaused(false), 2000);
  };

  const renderFamilyCard = (family: FamilyData) => (
    <div key={family.id} className="royal-arch-card">
      <img src={familyCardFrame} alt="Royal Arch Frame" className="royal-arch-card-frame" />

      <div className="relative z-10 w-full flex flex-col items-center h-full justify-between">
        {/* Heading with extra top margin so it sits comfortably in the center blank parchment area */}
        <h2 className="font-['Cinzel',serif] text-lg sm:text-xl font-bold text-[#3B0D1A] tracking-[0.14em] uppercase leading-tight mt-1">
          {family.headingLine1}<br />{family.headingLine2}
        </h2>

        {/* Divider */}
        <div className="w-10 h-[1px] bg-[#A37326]/40 my-1" />

        {/* Family Photo */}
        <div className="family-photo-wrap">
          <img src={family.photo} alt={family.title} />
        </div>

        {/* PARENTS Section */}
        <div className="w-full text-center my-1.5">
          <p className="font-['Cinzel',serif] text-[10px] sm:text-[10.5px] uppercase tracking-[0.2em] text-[#3B0D1A]/80 font-bold">
            PARENTS
          </p>
          <p className="font-['Cormorant_Garamond',serif] font-bold text-base sm:text-lg text-[#3B0D1A] mt-0.5">
            {family.parentsSummary}
          </p>
        </div>

        {/* Button */}
        <button
          type="button"
          className="view-family-btn"
          onClick={() => setActiveModal(family.id)}
        >
          ✦ VIEW FAMILY ✦
        </button>
      </div>
    </div>
  );

  return (
    <section className="family-scene-root relative w-full h-full min-h-[100svh] max-h-[100svh] overflow-hidden flex flex-col items-center justify-between pt-1 sm:pt-2 pb-16 sm:pb-8 px-3 sm:px-4 select-none">
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
          width: min(1040px, 100%);
          margin: auto 0;
          z-index: 2;
        }

        @media (max-width: 767px) {
          .family-scene-root {
            overflow: hidden !important;
            height: 100svh !important;
            max-height: 100svh !important;
            padding-top: 6px !important;
            padding-bottom: 70px !important;
            justify-content: space-between !important;
          }
          .family-cards-container {
            margin: auto 0 !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 100% !important;
            flex: 1 !important;
          }
          .royal-arch-card {
            height: 440px;
            max-width: 315px;
            padding: 92px 18px 44px;
          }
          .family-photo-wrap {
            max-width: 215px;
            height: 112px;
            margin: 3px 0;
          }
          .view-family-btn {
            padding: 6px 22px;
            font-size: 10px;
            margin-bottom: 3px;
          }
        }

        @media (min-width: 768px) {
          .family-cards-container {
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: 20px;
          }
          .royal-arch-card {
            flex: 1;
            max-width: 370px;
            height: 520px;
            padding: 104px 24px 52px;
          }
          .family-photo-wrap {
            max-width: 255px;
            height: 140px;
            margin: 8px 0;
          }
          .view-family-btn {
            padding: 8px 24px;
            font-size: 11px;
          }
        }

        /* Royal Arch Frame Card */
        .royal-arch-card {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: transform 0.35s cubic-bezier(0.34, 1.45, 0.64, 1), filter 0.35s ease;
        }

        .royal-arch-card:hover {
          transform: translateY(-3px) scale(1.01);
        }

        .royal-arch-card-frame {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: fill;
          pointer-events: none;
          filter: drop-shadow(0 10px 22px rgba(0, 0, 0, 0.35));
          transition: filter 0.35s ease;
        }

        .royal-arch-card:hover .royal-arch-card-frame {
          filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.48)) drop-shadow(0 0 10px rgba(203, 161, 53, 0.3));
        }

        /* Family Photo Frame inside Arched Card */
        .family-photo-wrap {
          position: relative;
          width: 100%;
          border-radius: 9px;
          overflow: hidden;
          border: 1.5px solid #CBA135;
          box-shadow: 0 4px 12px rgba(59, 13, 26, 0.2);
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
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #3B0D1A;
          background: rgba(245, 230, 200, 0.55);
          border: 1.5px solid rgba(163, 115, 38, 0.7);
          border-radius: 999px;
          cursor: pointer;
          box-shadow: 0 3px 8px rgba(59, 13, 26, 0.15);
          transition: all 0.25s ease;
        }

        .view-family-btn:hover {
          transform: translateY(-1.5px);
          background: #3B0D1A;
          color: #FBF1DE;
          border-color: #3B0D1A;
          box-shadow: 0 5px 14px rgba(59, 13, 26, 0.35);
        }

        /* 3D Royal Slide & Shimmer Keyframes for Family Card Switching */
        @keyframes royalSlideNext {
          0% {
            opacity: 0;
            transform: translateX(45px) scale(0.92) rotateY(-8deg);
            filter: blur(4px);
          }
          65% {
            opacity: 0.95;
            transform: translateX(-4px) scale(1.015) rotateY(1deg);
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1) rotateY(0deg);
            filter: blur(0px);
          }
        }

        @keyframes royalSlidePrev {
          0% {
            opacity: 0;
            transform: translateX(-45px) scale(0.92) rotateY(8deg);
            filter: blur(4px);
          }
          65% {
            opacity: 0.95;
            transform: translateX(4px) scale(1.015) rotateY(-1deg);
            filter: blur(0px);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1) rotateY(0deg);
            filter: blur(0px);
          }
        }

        @keyframes goldShimmerSweep {
          0% {
            transform: translateX(-160%) rotate(25deg);
            opacity: 0;
          }
          35% {
            opacity: 0.85;
          }
          100% {
            transform: translateX(260%) rotate(25deg);
            opacity: 0;
          }
        }

        .card-switch-anim-next {
          animation: royalSlideNext 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .card-switch-anim-prev {
          animation: royalSlidePrev 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .gold-shimmer-sweep {
          position: absolute;
          top: -60%;
          left: -60%;
          width: 220%;
          height: 220%;
          background: linear-gradient(
            to right,
            rgba(255, 255, 255, 0) 0%,
            rgba(203, 161, 53, 0.1) 40%,
            rgba(255, 245, 210, 0.45) 50%,
            rgba(203, 161, 53, 0.1) 60%,
            rgba(255, 255, 255, 0) 100%
          );
          pointer-events: none;
          z-index: 25;
          animation: goldShimmerSweep 0.85s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Pendulum swaying tree branches and subtle flower breathing */
        @keyframes pendulumLeft {
          0% {
            transform: rotate(-4.5deg);
          }
          50% {
            transform: rotate(3deg);
          }
          100% {
            transform: rotate(-4.5deg);
          }
        }

        @keyframes pendulumRight {
          0% {
            transform: rotate(4.5deg);
          }
          50% {
            transform: rotate(-3deg);
          }
          100% {
            transform: rotate(4.5deg);
          }
        }

        @keyframes flowerPulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .branch-pendulum-left {
          animation: pendulumLeft 5.6s ease-in-out infinite;
          transform-origin: top left;
        }

        .branch-pendulum-right {
          animation: pendulumRight 6.2s ease-in-out infinite;
          transform-origin: top right;
        }

        .flower-sway-pulse {
          animation: flowerPulse 3.8s ease-in-out infinite;
          transform-box: fill-box;
          transform-origin: center;
        }

        /* Slow rotating royal corner flowers */
        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spinSlowRev {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        .flower-spin-slow {
          animation: spinSlow 34s linear infinite;
          transform-origin: center;
        }

        .flower-spin-slow-rev {
          animation: spinSlowRev 38s linear infinite;
          transform-origin: center;
        }
      `}</style>

      {/* FULL UN-DARKENED BACKGROUND IMAGE (z-0) */}
      <img
        src={familyBg}
        alt="Royal Palace Courtyard Background"
        aria-hidden="true"
        className="fixed inset-0 w-full h-full object-cover object-center select-none pointer-events-none z-0"
      />

      {/* HANGING TREE BRANCHES & TOP FLORAL BAIL (z-1: Above BG, Below Cards/Text) */}
      <LeftFloralBranch />
      <RightFloralBranch />
      <TopCanopyFloralBail />

      {/* BOTTOM CORNER ROTATING FLOWERS (z-1: Above BG, Below Cards/Text) */}
      <BottomLeftRotatingFlower />
      <BottomRightRotatingFlower />

      {/* Ambient Glow */}
      <WarmGlow className="left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none z-0" />

      {/* TOP HEADER SECTION */}
      <div className="relative z-20 flex flex-col items-center text-center mt-0.5 sm:mt-2 max-w-xl px-2">
        {/* Top Lotus Crest */}
        <div className="flex items-center justify-center gap-1.5 mb-0.5">
          <span className="w-4 sm:w-6 h-[1px] bg-gradient-to-r from-transparent to-[#A37326]" />
          <LotusCrest className="w-3.5 h-3.5 text-[#8C2338]" />
          <span className="w-4 sm:w-6 h-[1px] bg-gradient-to-l from-transparent to-[#A37326]" />
        </div>

        {/* Main Title: OUR FAMILIES */}
        <h1 className="font-['Cinzel',serif] font-bold text-xl sm:text-3xl md:text-4xl text-[#3B0D1A] tracking-[0.14em] leading-tight">
          OUR FAMILIES
        </h1>

        {/* Subtitle */}
        <p className="font-['Cormorant_Garamond',serif] italic font-medium text-xs sm:text-base text-[#3B0D1A]/90">
          Two families, one beautiful beginning
        </p>

        {/* TOGGLE SWITCHES ABOVE CARD (Mobile View) */}
        <div className="flex md:hidden items-center justify-center gap-1.5 mt-1.5 bg-[#FBF1DE]/90 p-1 rounded-full border border-[#CBA135]/60 shadow-xs backdrop-blur-xs">
          <button
            type="button"
            onClick={() => handleSelectSlide(0)}
            className={`px-3.5 py-0.5 rounded-full text-[10.5px] font-['Cinzel',serif] font-bold tracking-wider transition-all duration-300 ${
              activeSlide === 0
                ? "bg-[#3B0D1A] text-[#FBF1DE] shadow-xs scale-102"
                : "text-[#3B0D1A]/70 hover:text-[#3B0D1A]"
            }`}
          >
            👰 Bride's Family
          </button>
          <button
            type="button"
            onClick={() => handleSelectSlide(1)}
            className={`px-3.5 py-0.5 rounded-full text-[10.5px] font-['Cinzel',serif] font-bold tracking-wider transition-all duration-300 ${
              activeSlide === 1
                ? "bg-[#3B0D1A] text-[#FBF1DE] shadow-xs scale-102"
                : "text-[#3B0D1A]/70 hover:text-[#3B0D1A]"
            }`}
          >
            🤵 Groom's Family
          </button>
        </div>
      </div>

      {/* MAIN LAYOUT: BRIDE CARD | CENTER PHOTO MEDALLION | GROOM CARD */}
      <div className="family-cards-container relative z-10 my-auto">
        
        {/* DESKTOP VIEW: BOTH CARDS + CENTER MEDALLION */}
        <div className="hidden md:flex items-center justify-center gap-5 w-full">
          {/* ==================== LEFT CARD: THE BRIDE'S FAMILY ==================== */}
          <div className="royal-arch-card">
            <img src={familyCardFrame} alt="Royal Arch Frame" className="royal-arch-card-frame" />

            <div className="relative z-10 w-full flex flex-col items-center h-full justify-between">
              <h2 className="font-['Cinzel',serif] text-lg sm:text-xl font-bold text-[#3B0D1A] tracking-[0.14em] uppercase leading-tight mt-1">
                THE BRIDE'S<br />FAMILY
              </h2>

              <div className="w-10 h-[1px] bg-[#A37326]/40 my-1" />

              <div className="family-photo-wrap">
                <img src={brideFamilyData.photo} alt={brideFamilyData.title} />
              </div>

              <div className="w-full text-center my-1.5">
                <p className="font-['Cinzel',serif] text-[10px] sm:text-[10.5px] uppercase tracking-[0.2em] text-[#3B0D1A]/80 font-bold">
                  PARENTS
                </p>
                <p className="font-['Cormorant_Garamond',serif] font-bold text-base sm:text-lg text-[#3B0D1A] mt-0.5">
                  {brideFamilyData.parentsSummary}
                </p>
              </div>

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
              <h2 className="font-['Cinzel',serif] text-lg sm:text-xl font-bold text-[#3B0D1A] tracking-[0.14em] uppercase leading-tight mt-1">
                THE GROOM'S<br />FAMILY
              </h2>

              <div className="w-10 h-[1px] bg-[#A37326]/40 my-1" />

              <div className="family-photo-wrap">
                <img src={groomFamilyData.photo} alt={groomFamilyData.title} />
              </div>

              <div className="w-full text-center my-1.5">
                <p className="font-['Cinzel',serif] text-[10px] sm:text-[10.5px] uppercase tracking-[0.2em] text-[#3B0D1A]/80 font-bold">
                  PARENTS
                </p>
                <p className="font-['Cormorant_Garamond',serif] font-bold text-base sm:text-lg text-[#3B0D1A] mt-0.5">
                  {groomFamilyData.parentsSummary}
                </p>
              </div>

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

        {/* MOBILE VIEW: SWIPEABLE CAROUSEL CARD WITH CHEVRON BUTTONS & 3D REVEAL */}
        <div
          className="flex md:hidden flex-col items-center justify-center relative w-full px-2"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Card Container with Floating Left / Right Buttons */}
          <div className="relative flex items-center justify-center w-full max-w-[335px]">
            {/* Left Chevron Button */}
            <button
              type="button"
              onClick={() => {
                handlePrevSlide();
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 3000);
              }}
              aria-label="Previous family"
              className="absolute -left-2 sm:-left-3 z-30 w-8 h-8 rounded-full bg-[#FBF1DE]/95 border border-[#CBA135] text-[#3B0D1A] flex items-center justify-center shadow-md active:scale-90 hover:bg-[#3B0D1A] hover:text-[#FBF1DE] transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Active Card with Directional Animation and Golden Shimmer */}
            <div
              key={activeSlide}
              className={`w-full flex justify-center relative overflow-hidden rounded-[24px] ${
                direction === "next" ? "card-switch-anim-next" : "card-switch-anim-prev"
              }`}
            >
              {/* Dynamic Gold Light Shimmer Sweep on card switch */}
              <div className="gold-shimmer-sweep" key={`shimmer-${activeSlide}`} />

              {activeSlide === 0 ? (
                <div className="royal-arch-card">
                  <img src={familyCardFrame} alt="Royal Arch Frame" className="royal-arch-card-frame" />

                  <div className="relative z-10 w-full flex flex-col items-center h-full justify-between">
                    <h2 className="font-['Cinzel',serif] text-base sm:text-lg font-bold text-[#3B0D1A] tracking-[0.14em] uppercase leading-tight mt-0.5">
                      THE BRIDE'S<br />FAMILY
                    </h2>
                    <div className="w-9 h-[1px] bg-[#A37326]/40 my-0.5" />
                    <div className="family-photo-wrap">
                      <img src={brideFamilyData.photo} alt={brideFamilyData.title} />
                    </div>
                    <div className="w-full text-center my-1">
                      <p className="font-['Cinzel',serif] text-[9.5px] uppercase tracking-[0.2em] text-[#3B0D1A]/80 font-bold">
                        PARENTS
                      </p>
                      <p className="font-['Cormorant_Garamond',serif] font-bold text-sm sm:text-base text-[#3B0D1A] mt-0.5 leading-tight">
                        {brideFamilyData.parentsSummary}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="view-family-btn"
                      onClick={() => setActiveModal("bride")}
                    >
                      ✦ VIEW FAMILY ✦
                    </button>
                  </div>
                </div>
              ) : (
                <div className="royal-arch-card">
                  <img src={familyCardFrame} alt="Royal Arch Frame" className="royal-arch-card-frame" />

                  <div className="relative z-10 w-full flex flex-col items-center h-full justify-between">
                    <h2 className="font-['Cinzel',serif] text-base sm:text-lg font-bold text-[#3B0D1A] tracking-[0.14em] uppercase leading-tight mt-0.5">
                      THE GROOM'S<br />FAMILY
                    </h2>
                    <div className="w-9 h-[1px] bg-[#A37326]/40 my-0.5" />
                    <div className="family-photo-wrap">
                      <img src={groomFamilyData.photo} alt={groomFamilyData.title} />
                    </div>
                    <div className="w-full text-center my-1">
                      <p className="font-['Cinzel',serif] text-[9.5px] uppercase tracking-[0.2em] text-[#3B0D1A]/80 font-bold">
                        PARENTS
                      </p>
                      <p className="font-['Cormorant_Garamond',serif] font-bold text-sm sm:text-base text-[#3B0D1A] mt-0.5 leading-tight">
                        {groomFamilyData.parentsSummary}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="view-family-btn"
                      onClick={() => setActiveModal("groom")}
                    >
                      ✦ VIEW FAMILY ✦
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Right Chevron Button */}
            <button
              type="button"
              onClick={() => {
                handleNextSlide();
                setIsPaused(true);
                setTimeout(() => setIsPaused(false), 3000);
              }}
              aria-label="Next family"
              className="absolute -right-2 sm:-right-3 z-30 w-8 h-8 rounded-full bg-[#FBF1DE]/95 border border-[#CBA135] text-[#3B0D1A] flex items-center justify-center shadow-md active:scale-90 hover:bg-[#3B0D1A] hover:text-[#FBF1DE] transition-all cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* POPUP MODAL: ENHANCED DETAILED FAMILY MEMBERS */}
      {selectedFamily && (
        <div
          onClick={() => setActiveModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#15030B]/85 backdrop-blur-md px-3 sm:px-4 py-4 sm:py-8 animate-in fade-in duration-300 select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[88vh] bg-gradient-to-b from-[#FFFDF9] via-[#FAF2E2] to-[#F3E3C3] text-[#3B0D1A] p-4 sm:p-7 rounded-2xl border-2 border-[#CBA135] shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_40px_rgba(203,161,53,0.3)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300"
          >
            {/* Ornate Filigree Corner Accents */}
            <div className="absolute top-2.5 left-2.5 w-5 h-5 border-t-2 border-l-2 border-[#A37326] rounded-tl-sm pointer-events-none opacity-80" />
            <div className="absolute top-2.5 right-2.5 w-5 h-5 border-t-2 border-r-2 border-[#A37326] rounded-tr-sm pointer-events-none opacity-80" />
            <div className="absolute bottom-2.5 left-2.5 w-5 h-5 border-b-2 border-l-2 border-[#A37326] rounded-bl-sm pointer-events-none opacity-80" />
            <div className="absolute bottom-2.5 right-2.5 w-5 h-5 border-b-2 border-r-2 border-[#A37326] rounded-br-sm pointer-events-none opacity-80" />

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-[#3B0D1A] text-[#FBF1DE] hover:bg-[#8C2338] border border-[#CBA135] flex items-center justify-center cursor-pointer shadow-md transition-all active:scale-95"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="relative z-10 text-center pb-3 border-b border-[#A37326]/30">
              {/* Auspicious Lineage Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-0.5 rounded-full bg-[#3B0D1A] text-[#FBF1DE] text-[10px] font-['Cinzel',serif] tracking-[0.24em] uppercase font-bold border border-[#CBA135]/60 shadow-xs mb-1">
                <span>✦</span>
                <span>{selectedFamily.sideName}</span>
                <span>✦</span>
              </div>

              {/* Family Title */}
              <h2 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl font-bold text-[#3B0D1A] tracking-wide mt-0.5">
                {selectedFamily.title}
              </h2>

              {/* Subtitle */}
              <p className="font-['Cormorant_Garamond',serif] italic text-sm sm:text-base text-[#591426] font-medium">
                {selectedFamily.subtitle}
              </p>

              {/* Ornate Gold Divider */}
              <div className="flex items-center justify-center gap-2 mt-1.5 text-[#A37326] text-[9px] opacity-80">
                <span className="w-8 h-[1px] bg-[#A37326]" />
                <span>❖</span>
                <span className="w-8 h-[1px] bg-[#A37326]" />
              </div>
            </div>

            {/* Scrollable Members List */}
            <div className="relative z-10 mt-3.5 flex-1 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 gap-3 custom-scrollbar">
              {selectedFamily.members.map((m, idx) => {
                const getRoleIcon = (rel: string) => {
                  if (rel.toLowerCase().includes("father") || rel.toLowerCase().includes("mother") || rel.toLowerCase().includes("parent")) return "👑";
                  if (rel.toLowerCase().includes("grandparent")) return "🕊️";
                  if (rel.toLowerCase().includes("sibling") || rel.toLowerCase().includes("sister") || rel.toLowerCase().includes("brother")) return "🌸";
                  return "✨";
                };

                return (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-br from-[#FFFDF9]/90 via-[#FAF1DD]/80 to-[#F5E5C4]/70 border border-[#CBA135]/50 shadow-xs flex flex-col justify-between hover:border-[#8C2338]/70 hover:shadow-md transition-all duration-300 group"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        {/* Royal Medallion Avatar */}
                        <div className="relative w-11 h-11 rounded-full p-[2px] bg-gradient-to-br from-[#CBA135] via-[#FBF1DE] to-[#8C2338] shadow-sm shrink-0">
                          <div className="w-full h-full rounded-full bg-[#3B0D1A] flex items-center justify-center text-[#FBF1DE] font-['Cinzel',serif] font-bold text-sm">
                            {m.name.charAt(0)}
                          </div>
                          <span className="absolute -bottom-1 -right-1 text-xs" title={m.relation}>
                            {getRoleIcon(m.relation)}
                          </span>
                        </div>

                        {/* Name & Relation */}
                        <div className="min-w-0 flex-1">
                          <h3 className="font-['Cormorant_Garamond',serif] text-base sm:text-lg font-bold text-[#3B0D1A] leading-snug truncate group-hover:text-[#8C2338] transition-colors">
                            {m.name}
                          </h3>
                          <p className="font-['Cinzel',serif] text-[9.5px] uppercase tracking-wider font-bold text-[#8C2338]">
                            {m.relation}
                          </p>
                        </div>
                      </div>

                      {/* Relationship Pill */}
                      <div className="mb-2">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#3B0D1A]/8 border border-[#A37326]/30 text-[#3B0D1A] font-['Cinzel',serif] text-[9px] uppercase tracking-wider font-bold">
                          {m.relationshipToGroomOrBride}
                        </span>
                      </div>
                    </div>

                    {/* Role Description Quote */}
                    <div className="pt-2 border-t border-[#A37326]/20 mt-auto">
                      <p className="font-['Cormorant_Garamond',serif] italic text-xs sm:text-[13px] text-[#2E0B15]/90 leading-snug">
                        "{m.roleDescription}"
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Modal Bottom Auspicious Ribbon */}
            <div className="relative z-10 pt-2.5 mt-2 border-t border-[#A37326]/30 text-center">
              <p className="font-['Cinzel',serif] text-[9px] sm:text-[10px] tracking-[0.18em] uppercase text-[#3B0D1A]/80 font-bold">
                ✦ Two Noble Families United in Eternal Love & Harmony ✦
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Ambient Layer */}
      <AmbientLayer dust={7} petals={8} />
    </section>
  );
}
