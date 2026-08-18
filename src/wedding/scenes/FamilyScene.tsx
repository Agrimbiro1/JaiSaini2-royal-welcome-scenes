import { useState, useEffect, useRef } from "react";
import { wedding } from "../data/wedding";
import { usePrefersReducedMotion } from "../engine/SceneProvider";
import { AmbientLayer, WarmGlow } from "../ui/Ambient";
import familyBg from "/assets/family-tree-bg.webp";
import familyCardFrame from "/assets/family-card-frame.webp";
import groomFamilyPhoto from "/assets/groom-family.webp";
import brideFamilyPhoto from "/assets/bride-family.webp";
import couplePhoto from "/assets/couple-namaste.webp";
import familyFatherPhoto from "/assets/family-father.webp";
import familyMotherPhoto from "/assets/family-mother.webp";
import familyBrotherPhoto from "/assets/family-brother.webp";
import familyBridePhoto from "/assets/family-bride.webp";
import familyGroomPhoto from "/assets/family-groom.webp";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface MemberCardInfo {
  role: string;
  name: string;
  photo: string;
  isMain?: boolean;
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
  photo: string;
  parents: MemberCardInfo[];
  children: MemberCardInfo[];
}

const brideFamilyData: FamilyData = {
  id: "bride",
  title: "Bride's Family",
  cardTitle: "THE BRIDE'S FAMILY",
  headingLine1: "THE BRIDE'S",
  headingLine2: "FAMILY",
  sideName: "Bride's Lineage",
  subtitle: "The Graceful House of Sharma",
  parentsSummary: "Mr. & Mrs. Rajesh Sharma",
  photo: brideFamilyPhoto,
  parents: [
    {
      role: "FATHER",
      name: "Mr. Rajesh Sharma",
      photo: familyFatherPhoto,
    },
    {
      role: "MOTHER",
      name: "Mrs. Sunita Sharma",
      photo: familyMotherPhoto,
    },
  ],
  children: [
    {
      role: "BRIDE",
      name: `${wedding.couple.bride} Sharma`,
      photo: familyBridePhoto,
      isMain: true,
    },
  ],
};

const groomFamilyData: FamilyData = {
  id: "groom",
  title: "Groom's Family",
  cardTitle: "THE GROOM'S FAMILY",
  headingLine1: "THE GROOM'S",
  headingLine2: "FAMILY",
  sideName: "Groom's Lineage",
  subtitle: "The Esteemed House of Verma",
  parentsSummary: "Mr. & Mrs. Amit Verma",
  photo: groomFamilyPhoto,
  parents: [
    {
      role: "FATHER",
      name: "Mr. Amit Verma",
      photo: familyFatherPhoto,
    },
    {
      role: "MOTHER",
      name: "Mrs. Meena Verma",
      photo: familyMotherPhoto,
    },
  ],
  children: [
    {
      role: "GROOM",
      name: `${wedding.couple.groom} Verma`,
      photo: familyGroomPhoto,
      isMain: true,
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
            loading="lazy"
            decoding="async"
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
    touchStartX.current = e.touches[0]?.clientX || 0;
    setIsPaused(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0]?.clientX || 0;
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
      <img src={familyCardFrame} alt="Royal Arch Frame" loading="lazy" decoding="async" className="royal-arch-card-frame" />

      <div className="relative z-10 w-full flex flex-col items-center h-full justify-between">
        {/* Heading with extra top margin so it sits comfortably in the center blank parchment area */}
        <h2 className="font-['Cinzel',serif] text-lg sm:text-xl font-bold text-[#3B0D1A] tracking-[0.14em] uppercase leading-tight mt-1">
          {family.headingLine1}<br />{family.headingLine2}
        </h2>

        {/* Divider */}
        <div className="w-10 h-[1px] bg-[#A37326]/40 my-1" />

        {/* Family Photo */}
        <div className="family-photo-wrap">
          <img src={family.photo} alt={family.title} loading="lazy" decoding="async" />
        </div>

        {/* Parents Names */}
        <div className="w-full text-center my-1.5">
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
        loading="lazy"
        decoding="async"
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
            <img src={familyCardFrame} alt="Royal Arch Frame" loading="lazy" decoding="async" className="royal-arch-card-frame" />

            <div className="relative z-10 w-full flex flex-col items-center h-full justify-between">
              <h2 className="font-['Cinzel',serif] text-lg sm:text-xl font-bold text-[#3B0D1A] tracking-[0.14em] uppercase leading-tight mt-1">
                THE BRIDE'S<br />FAMILY
              </h2>

              <div className="w-10 h-[1px] bg-[#A37326]/40 my-1" />

              <div className="family-photo-wrap">
                <img src={brideFamilyData.photo} alt={brideFamilyData.title} loading="lazy" decoding="async" />
              </div>

              <div className="w-full text-center my-1.5">
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
            <img src={familyCardFrame} alt="Royal Arch Frame" loading="lazy" decoding="async" className="royal-arch-card-frame" />

            <div className="relative z-10 w-full flex flex-col items-center h-full justify-between">
              <h2 className="font-['Cinzel',serif] text-lg sm:text-xl font-bold text-[#3B0D1A] tracking-[0.14em] uppercase leading-tight mt-1">
                THE GROOM'S<br />FAMILY
              </h2>

              <div className="w-10 h-[1px] bg-[#A37326]/40 my-1" />

              <div className="family-photo-wrap">
                <img src={groomFamilyData.photo} alt={groomFamilyData.title} loading="lazy" decoding="async" />
              </div>

              <div className="w-full text-center my-1.5">
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
                  <img src={familyCardFrame} alt="Royal Arch Frame" loading="lazy" decoding="async" className="royal-arch-card-frame" />

                  <div className="relative z-10 w-full flex flex-col items-center h-full justify-between">
                    <h2 className="font-['Cinzel',serif] text-base sm:text-lg font-bold text-[#3B0D1A] tracking-[0.14em] uppercase leading-tight mt-0.5">
                      THE BRIDE'S<br />FAMILY
                    </h2>
                    <div className="w-9 h-[1px] bg-[#A37326]/40 my-0.5" />
                    <div className="family-photo-wrap">
                      <img src={brideFamilyData.photo} alt={brideFamilyData.title} loading="lazy" decoding="async" />
                    </div>
                    <div className="w-full text-center my-1">
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
                  <img src={familyCardFrame} alt="Royal Arch Frame" loading="lazy" decoding="async" className="royal-arch-card-frame" />

                  <div className="relative z-10 w-full flex flex-col items-center h-full justify-between">
                    <h2 className="font-['Cinzel',serif] text-base sm:text-lg font-bold text-[#3B0D1A] tracking-[0.14em] uppercase leading-tight mt-0.5">
                      THE GROOM'S<br />FAMILY
                    </h2>
                    <div className="w-9 h-[1px] bg-[#A37326]/40 my-0.5" />
                    <div className="family-photo-wrap">
                      <img src={groomFamilyData.photo} alt={groomFamilyData.title} loading="lazy" decoding="async" />
                    </div>
                    <div className="w-full text-center my-1">
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

      {/* POPUP MODAL: EXACT ROYAL FAMILY TREE MATCHING REFERENCE */}
      {selectedFamily && (
        <div
          onClick={() => setActiveModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#15030B]/85 backdrop-blur-md px-3 sm:px-4 py-4 sm:py-6 animate-in fade-in duration-300 select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg max-h-[92vh] sm:max-h-[88vh] bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E8] to-[#F5EBD6] text-[#3B0D1A] p-5 sm:p-8 rounded-[28px] sm:rounded-[36px] border border-[#E2D2B5] shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_40px_rgba(203,161,53,0.25)] flex flex-col items-center overflow-y-auto animate-in zoom-in-95 duration-300 custom-scrollbar"
          >
            {/* Top-Right Circle Close Button */}
            <button
              type="button"
              onClick={() => setActiveModal(null)}
              className="absolute top-4 right-4 z-30 w-8 h-8 rounded-full border border-[#CBA135]/40 bg-white/70 hover:bg-[#CBA135]/20 text-[#3B0D1A] flex items-center justify-center cursor-pointer shadow-xs transition-all active:scale-95 text-xs font-bold"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Modal Title */}
            <div className="text-center w-full mt-1 mb-3 sm:mb-4">
              <h2 className="font-['Cormorant_Garamond',serif] text-3xl sm:text-4xl font-bold text-[#A87932] tracking-wide">
                {selectedFamily.id === "bride" ? "Bride's Family" : "Groom's Family"}
              </h2>
              <div className="w-16 h-[1.5px] bg-[#CBA135]/50 mx-auto mt-2" />
            </div>

            {/* All Member Cards Directly Without Category Headers */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 w-full">
              {[...selectedFamily.parents, ...selectedFamily.children].map((member, idx) => (
                <div
                  key={idx}
                  className={`rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 flex flex-col items-center text-center transition-all duration-300 ${
                    member.isMain
                      ? "col-span-2 sm:col-span-1 max-w-[220px] sm:max-w-none justify-self-center w-full bg-[#FDF9EE] border-2 border-[#CBA135] shadow-[0_4px_16px_rgba(203,161,53,0.22)] ring-1 ring-[#CBA135]/30 hover:shadow-lg"
                      : "bg-[#FAF4E8]/90 border border-[#E8DCB8] shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-md"
                  }`}
                >
                  {/* Circular Photo with Gold Ring */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-[#CBA135] overflow-hidden p-0.5 shadow-sm bg-[#1c0a02]">
                    <img
                      src={member.photo}
                      alt={member.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top rounded-full"
                    />
                  </div>

                  {/* Role Label */}
                  <span className="font-['Cinzel',serif] text-[9.5px] sm:text-[10.5px] tracking-widest text-[#A87932] uppercase font-bold mt-2.5 sm:mt-3">
                    {member.role}
                  </span>

                  {/* Name */}
                  <h3 className="font-sans text-xs sm:text-[15px] font-bold text-[#2A1017] mt-0.5 sm:mt-1 leading-tight">
                    {member.name}
                  </h3>
                </div>
              ))}
            </div>

            {/* Bottom Pill Close Button */}
            <div className="mt-5 sm:mt-6 flex justify-center w-full">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-8 sm:px-10 py-1.5 sm:py-2 rounded-full border border-[#CBA135]/70 bg-white/70 hover:bg-[#CBA135]/15 text-[#2A1017] font-['Cinzel',serif] text-xs font-semibold tracking-wider transition-all shadow-xs active:scale-95 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Ambient Layer */}
      <AmbientLayer dust={7} petals={8} />
    </section>
  );
}
