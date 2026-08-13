import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import gsap from "gsap";
import { usePrefersReducedMotion } from "../engine/SceneProvider";
import { AmbientLayer } from "../ui/Ambient";
import { Calendar, Clock, MapPin, Navigation, CalendarPlus, X, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";

export type CeremonyDetail = {
  id: string;
  name: string;
  tagline: string;
  quote: string;
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
    quote: "Where laughter meets turmeric.",
    day: "WEDNESDAY",
    date: "14 NOVEMBER 2026",
    time: "11:00 AM",
    venue: "SUVARNA MAHAL COURTYARD",
    location: "JAIPUR, RAJASTHAN",
    isoStart: "20261114T053000Z",
    isoEnd: "20261114T093000Z",
    mapUrl: "https://maps.google.com/?q=Suvarna+Mahal+Jaipur",
  },
  {
    id: "mehendi",
    name: "MEHENDI",
    tagline: "THE HENNA RITUAL",
    quote: "Stories written on skin.",
    day: "WEDNESDAY",
    date: "14 NOVEMBER 2026",
    time: "5:00 PM",
    venue: "ZANANA GARDENS",
    location: "JAIPUR, RAJASTHAN",
    isoStart: "20261114T113000Z",
    isoEnd: "20261114T163000Z",
    mapUrl: "https://maps.google.com/?q=Zanana+Gardens+Jaipur",
  },
  {
    id: "sangeet",
    name: "SANGEET",
    tagline: "THE NIGHT OF MUSIC & DANCE",
    quote: "A night the music refused to end.",
    day: "THURSDAY",
    date: "15 NOVEMBER 2026",
    time: "8:00 PM",
    venue: "THE PALACE LAWNS",
    location: "JAIPUR, RAJASTHAN",
    isoStart: "20261115T143000Z",
    isoEnd: "20261115T193000Z",
    mapUrl: "https://maps.google.com/?q=Palace+Lawns+Jaipur",
  },
  {
    id: "shaadi",
    name: "SHAADI",
    tagline: "THE MAIN SACRED CEREMONY",
    quote: "Under sacred flames, two souls become one.",
    day: "MONDAY",
    date: "21 DECEMBER 2026",
    time: "7:00 PM",
    venue: "THE GRAND PALACE MANDAP",
    location: "JAIPUR, RAJASTHAN",
    isoStart: "20261221T133000Z",
    isoEnd: "20261221T193000Z",
    mapUrl: "https://maps.google.com/?q=The+Grand+Palace+Jaipur",
  },
  {
    id: "reception",
    name: "RECEPTION",
    tagline: "THE ROYAL BANQUET",
    quote: "A night of royal elegance and toasts.",
    day: "SATURDAY",
    date: "5 DECEMBER 2026",
    time: "8:00 PM",
    venue: "ROYAL BALLROOM",
    location: "JAIPUR, RAJASTHAN",
    isoStart: "20261205T143000Z",
    isoEnd: "20261205T193000Z",
    mapUrl: "https://maps.google.com/?q=Royal+Ballroom+Jaipur",
  },
  {
    id: "banquet",
    name: "ROYAL BANQUET",
    tagline: "THE FEAST OF JOY",
    quote: "Celebrating love in regal grandeur.",
    day: "SUNDAY",
    date: "6 DECEMBER 2026",
    time: "1:00 PM",
    venue: "PALACE COURTYARD",
    location: "JAIPUR, RAJASTHAN",
    isoStart: "20261206T073000Z",
    isoEnd: "20261206T123000Z",
    mapUrl: "https://maps.google.com/?q=Palace+Courtyard+Jaipur",
  },
];

// Ceremony Floral Color Palettes for Matter.js physics background
const CEREMONY_FLORAL_PALETTES: Record<string, string[]> = {
  haldi: ["#F59E0B", "#FCD34D", "#FEF08A", "#D97706", "#FBBF24"],
  mehendi: ["#10B981", "#059669", "#34D399", "#A7F3D0", "#047857"],
  sangeet: ["#8B5CF6", "#EC4899", "#C084FC", "#E879F9", "#6D28D9"],
  shaadi: ["#DC2626", "#991B1B", "#F87171", "#EF4444", "#7F1D1D"],
  reception: ["#D97706", "#F59E0B", "#FDE68A", "#FBBF24", "#92400E"],
  banquet: ["#CA8A04", "#EAB308", "#FEF08A", "#A16207", "#FDE047"],
};

// Blend-in SVG Icons with Soft Glowing Radial Aura matching user's exact reference image
function CardBlendedSVG({ id }: { id: string }) {
  switch (id) {
    case "haldi":
      return (
        <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 my-0.5">
          <div className="absolute inset-0 rounded-full bg-amber-400/25 blur-xl scale-125" />
          <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 relative z-10 drop-shadow-xs">
            <circle cx="50" cy="50" r="38" fill="none" stroke="#FBBF24" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
            <circle cx="50" cy="50" r="28" fill="rgba(251, 191, 36, 0.12)" />
            <ellipse cx="50" cy="62" rx="28" ry="12" fill="#D97706" />
            <ellipse cx="50" cy="60" rx="25" ry="10" fill="#F59E0B" />
            <ellipse cx="50" cy="58" rx="21" ry="7" fill="#FCD34D" />
            <circle cx="50" cy="48" r="7" fill="#FEF08A" />
            <circle cx="38" cy="52" r="4.5" fill="#F59E0B" />
            <circle cx="62" cy="52" r="4.5" fill="#F59E0B" />
            <circle cx="50" cy="40" r="3" fill="#D97706" />
          </svg>
        </div>
      );
    case "mehendi":
      return (
        <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 my-0.5">
          <div className="absolute inset-0 rounded-full bg-emerald-400/25 blur-xl scale-125" />
          <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 relative z-10 drop-shadow-xs">
            <circle cx="50" cy="50" r="38" fill="none" stroke="#34D399" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
            <circle cx="50" cy="50" r="28" fill="rgba(52, 211, 153, 0.12)" />
            <g stroke="#059669" strokeWidth="1.5" fill="none">
              <polygon points="50,22 58,36 74,36 62,46 66,62 50,52 34,62 38,46 26,36 42,36" fill="rgba(16, 185, 129, 0.15)" />
              <circle cx="50" cy="44" r="8" fill="#10B981" />
            </g>
            <path d="M46 68 L60 38 L54 36 Z" fill="#047857" opacity="0.9" />
          </svg>
        </div>
      );
    case "sangeet":
      return (
        <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 my-0.5">
          <div className="absolute inset-0 rounded-full bg-purple-400/25 blur-xl scale-125" />
          <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 relative z-10 drop-shadow-xs">
            <circle cx="50" cy="50" r="38" fill="none" stroke="#C084FC" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
            <circle cx="50" cy="50" r="28" fill="rgba(192, 132, 252, 0.12)" />
            <path d="M22 28 Q50 36 78 28" fill="none" stroke="#8B5CF6" strokeWidth="1.5" />
            <circle cx="34" cy="31" r="3" fill="#EC4899" />
            <circle cx="50" cy="33" r="3" fill="#F472B6" />
            <circle cx="66" cy="31" r="3" fill="#EC4899" />
            <rect x="30" y="46" width="40" height="22" rx="7" fill="#6D28D9" />
            <ellipse cx="30" cy="57" rx="4" ry="11" fill="#8B5CF6" stroke="#DDD6FE" strokeWidth="1" />
            <ellipse cx="70" cy="57" rx="4" ry="11" fill="#8B5CF6" stroke="#DDD6FE" strokeWidth="1" />
          </svg>
        </div>
      );
    case "shaadi":
      return (
        <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 my-0.5">
          <div className="absolute inset-0 rounded-full bg-red-500/25 blur-xl scale-125" />
          <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 relative z-10 drop-shadow-xs">
            <circle cx="50" cy="50" r="38" fill="none" stroke="#F87171" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
            <circle cx="50" cy="50" r="28" fill="rgba(248, 113, 113, 0.12)" />
            <path d="M26 68 V38 Q50 22 74 38 V68" fill="none" stroke="#991B1B" strokeWidth="2.5" />
            <rect x="22" y="66" width="56" height="5" fill="#7F1D1D" rx="2" />
            <path d="M50 42 Q42 56 50 64 Q58 56 50 42 Z" fill="#EF4444" />
            <path d="M50 47 Q45 57 50 64 Q55 57 50 47 Z" fill="#F59E0B" />
          </svg>
        </div>
      );
    case "reception":
      return (
        <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 my-0.5">
          <div className="absolute inset-0 rounded-full bg-amber-500/25 blur-xl scale-125" />
          <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 relative z-10 drop-shadow-xs">
            <circle cx="50" cy="50" r="38" fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
            <circle cx="50" cy="50" r="28" fill="rgba(245, 158, 11, 0.12)" />
            <path d="M28 68 V40 C28 26 72 26 72 40 V68" fill="none" stroke="#D97706" strokeWidth="2" />
            <circle cx="34" cy="34" r="2" fill="#FDE68A" />
            <circle cx="50" cy="28" r="2.5" fill="#FDE68A" />
            <circle cx="66" cy="34" r="2" fill="#FDE68A" />
            <path d="M42 68 L50 56 L58 68 Z" fill="rgba(217, 119, 6, 0.3)" stroke="#D97706" strokeWidth="1" />
          </svg>
        </div>
      );
    case "banquet":
      return (
        <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 my-0.5">
          <div className="absolute inset-0 rounded-full bg-yellow-400/25 blur-xl scale-125" />
          <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 relative z-10 drop-shadow-xs">
            <circle cx="50" cy="50" r="38" fill="none" stroke="#CA8A04" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
            <circle cx="50" cy="50" r="28" fill="rgba(202, 138, 4, 0.12)" />
            <g stroke="#854D0E" strokeWidth="1.2" fill="none">
              <circle cx="50" cy="50" r="14" fill="rgba(234, 179, 8, 0.2)" />
              <circle cx="50" cy="50" r="6" fill="#CA8A04" />
              {[0, 45, 90, 135, 180, 225, 270, 315].map((ang, i) => (
                <circle
                  key={i}
                  cx={50 + Math.cos((ang * Math.PI) / 180) * 16}
                  cy={50 + Math.sin((ang * Math.PI) / 180) * 16}
                  r="3.5"
                  fill="#FEF08A"
                />
              ))}
            </g>
          </svg>
        </div>
      );
    default:
      return null;
  }
}

// Organic 3D Shaded Realistic Flower & Petal Renderer
function drawRealisticFlower(
  ctx: CanvasRenderingContext2D,
  radius: number,
  petalCount: number,
  colors: string[],
  colorIndex: number,
  type: "full" | "petal",
  flipProgress: number
) {
  const primaryColor = colors[colorIndex % colors.length] || colors[0]!;
  const secondaryColor = colors[(colorIndex + 1) % colors.length] || colors[1]!;

  if (type === "petal") {
    ctx.scale(1, Math.cos(flipProgress));
    const grad = ctx.createLinearGradient(0, -radius, 0, radius);
    grad.addColorStop(0, secondaryColor);
    grad.addColorStop(0.7, primaryColor);
    grad.addColorStop(1, "rgba(255,255,255,0.2)");

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(0, -radius * 1.2);
    ctx.bezierCurveTo(radius * 0.8, -radius * 0.5, radius * 0.9, radius * 0.5, 0, radius * 1.1);
    ctx.bezierCurveTo(-radius * 0.9, radius * 0.5, -radius * 0.8, -radius * 0.5, 0, -radius * 1.2);
    ctx.fill();
    return;
  }

  for (let p = 0; p < petalCount; p++) {
    const angle = (p * Math.PI * 2) / petalCount;
    ctx.save();
    ctx.rotate(angle);

    const petalGrad = ctx.createRadialGradient(0, radius * 0.3, radius * 0.1, 0, radius * 0.8, radius * 1.1);
    petalGrad.addColorStop(0, primaryColor);
    petalGrad.addColorStop(0.75, secondaryColor);
    petalGrad.addColorStop(1, "rgba(255, 255, 255, 0.4)");

    ctx.fillStyle = petalGrad;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-radius * 0.45, radius * 0.4, -radius * 0.5, radius * 1.1, 0, radius * 1.25);
    ctx.bezierCurveTo(radius * 0.5, radius * 1.1, radius * 0.45, radius * 0.4, 0, 0);
    ctx.fill();

    ctx.restore();
  }

  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.22, 0, Math.PI * 2);
  ctx.fillStyle = "#FDE047";
  ctx.fill();
}

// Matter.js Interactive Floral Physics Canvas
function MatterFloralCanvas({ ceremonyId }: { ceremonyId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorTargetRef = useRef<string[]>(CEREMONY_FLORAL_PALETTES[ceremonyId] || CEREMONY_FLORAL_PALETTES.shaadi!);

  useEffect(() => {
    colorTargetRef.current = CEREMONY_FLORAL_PALETTES[ceremonyId] || CEREMONY_FLORAL_PALETTES.shaadi!;
  }, [ceremonyId]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const Engine = Matter.Engine;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Body = Matter.Body;

    const engine = Engine.create({ gravity: { x: 0, y: 0.08, scale: 0.001 } });
    const flowerCount = 30;
    const flowerBodies: {
      body: Matter.Body;
      radius: number;
      colorIndex: number;
      petalCount: number;
      type: "full" | "petal";
      swaySpeed: number;
      swayPhase: number;
    }[] = [];

    for (let i = 0; i < flowerCount; i++) {
      const radius = 10 + Math.random() * 22;
      const x = Math.random() * width;
      const y = Math.random() * height;
      const type: "full" | "petal" = i % 3 === 0 ? "petal" : "full";

      const body = Bodies.circle(x, y, radius, { frictionAir: 0.02, restitution: 0.4 });
      Body.setAngle(body, Math.random() * Math.PI * 2);

      flowerBodies.push({
        body,
        radius,
        colorIndex: Math.floor(Math.random() * 5),
        petalCount: 5 + Math.floor(Math.random() * 3),
        type,
        swaySpeed: 0.01 + Math.random() * 0.02,
        swayPhase: Math.random() * Math.PI * 2,
      });

      World.add(engine.world, body);
    }

    let animId: number;
    const renderLoop = () => {
      Engine.update(engine, 1000 / 60);
      ctx.clearRect(0, 0, width, height);
      const activePalette = colorTargetRef.current;

      flowerBodies.forEach(({ body, radius, colorIndex, petalCount, type, swaySpeed, swayPhase }) => {
        swayPhase += swaySpeed;
        Body.setVelocity(body, {
          x: body.velocity.x + Math.sin(swayPhase) * 0.06,
          y: body.velocity.y,
        });

        if (body.position.y > height + 40) {
          Body.setPosition(body, { x: Math.random() * width, y: -30 });
        }

        ctx.save();
        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);
        ctx.globalAlpha = radius > 20 ? 0.25 : 0.35;

        drawRealisticFlower(ctx, radius, petalCount, activePalette, colorIndex, type, swayPhase);
        ctx.restore();
      });

      animId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-1" />;
}

export default function CeremoniesScene() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);

  const [activeId, setActiveId] = useState<string>("shaadi");
  const [mobileIndex, setMobileIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const active = ceremonyDetails.find((c) => c.id === activeId) || ceremonyDetails[3]!;

  const handlePrevMobileCard = () => {
    setMobileIndex((prev) => (prev > 0 ? prev - 1 : ceremonyDetails.length - 1));
  };

  const handleNextMobileCard = () => {
    setMobileIndex((prev) => (prev < ceremonyDetails.length - 1 ? prev + 1 : 0));
  };

  const prevIndex = (mobileIndex - 1 + ceremonyDetails.length) % ceremonyDetails.length;
  const nextIndex = (mobileIndex + 1) % ceremonyDetails.length;
  const prevMobileCard = ceremonyDetails[prevIndex]!;
  const currentMobileCard = ceremonyDetails[mobileIndex] || ceremonyDetails[0]!;
  const nextMobileCard = ceremonyDetails[nextIndex]!;

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
      data-lenis-prevent
      onTouchMove={(e) => e.stopPropagation()}
      className="ceremonies-scene-root relative w-full h-[100svh] overflow-y-auto overscroll-contain touch-pan-y flex flex-col justify-start items-center py-4 sm:py-2 pb-32 sm:pb-20 px-3 sm:px-8 select-none z-10"
    >
      <style>{`
        .ceremonies-scene-root {
          font-family: 'Playfair Display', Georgia, serif;
          color: #3d261a;
          isolation: isolate;
          background: linear-gradient(135deg, #FAF8F5 0%, #EFECE6 45%, #E5E0D6 75%, #F5F2EC 100%);
        }

        .ceremonies-scene-root .paper-texture-layer {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0.08;
          background-image: radial-gradient(#333 1px, transparent 1px), radial-gradient(#666 1px, #e5e5e5 1px);
          background-size: 20px 20px;
          background-position: 0 0, 10px 10px;
          pointer-events: none;
          z-index: 0;
        }

        .ceremonies-scene-root .vignette-layer {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 45%, transparent 35%, rgba(180, 170, 155, 0.25) 75%, rgba(130, 120, 105, 0.45) 100%);
          z-index: 1;
          pointer-events: none;
        }
      `}</style>

      {/* White & Grey Paper Noise Texture & Vignette Background */}
      <div className="paper-texture-layer" aria-hidden="true" />
      <div className="vignette-layer" aria-hidden="true" />

      {/* Dynamic Matter.js Interactive Physics Floral Background Canvas */}
      <MatterFloralCanvas ceremonyId={activeId} />

      {/* Top Header Section with Enriched Font Size and Generous Gap */}
      <header className="relative z-20 text-center mt-3 sm:mt-2 mb-6 sm:mb-5 px-2">
        <span className="font-['Cinzel',serif] text-xs sm:text-sm font-extrabold uppercase tracking-[0.35em] text-[#7A1C1C]">
          Royal Celebrations & Events
        </span>
        <h1 className="font-['Playfair_Display',serif] text-3xl sm:text-4xl lg:text-5xl font-black text-[#3B0D1A] tracking-widest uppercase mt-1 sm:mt-1.5 drop-shadow-xs">
          THE CEREMONIES
        </h1>
      </header>

      {/* Main Responsive Layout Container */}
      <div className="relative z-20 w-full max-w-6xl h-auto sm:h-full sm:max-h-[calc(100svh-175px)] my-auto flex flex-col lg:grid lg:grid-cols-12 gap-6 sm:gap-4 items-stretch pb-4 sm:pb-2">
        
        {/* MOBILE VIEW: Clean Single Card Carousel with Left & Right Arrow Controls */}
        <div className="block sm:hidden w-full flex flex-col items-center justify-center my-1 px-1">
          
          <div className="relative w-full flex items-center justify-between gap-1.5 px-0.5 min-h-[380px] py-1">
            {/* Left Carousel Arrow Button */}
            <button
              type="button"
              onClick={handlePrevMobileCard}
              className="p-3 rounded-full bg-[#FFFDF8] border-2 border-[#CBA135] text-[#7A1C1C] shadow-xl active:scale-90 transition-transform z-30 flex-shrink-0 cursor-pointer"
              aria-label="Previous Ceremony"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>

            {/* Mobile Active Ceremony Card - Full Height, Unclipped */}
            <div
              onTouchStart={(e) => {
                touchStartX.current = e.touches[0]?.clientX || 0;
              }}
              onTouchEnd={(e) => {
                const touchEndX = e.changedTouches[0]?.clientX || 0;
                const diff = touchStartX.current - touchEndX;
                if (diff > 40) handleNextMobileCard();
                if (diff < -40) handlePrevMobileCard();
              }}
              onClick={() => {
                setActiveId(currentMobileCard.id);
                setIsModalOpen(true);
              }}
              className="group relative flex-1 bg-gradient-to-b from-[#FFFDF8] via-[#FAF6F0] to-[#F5EFE6] rounded-[28px] p-4 border-2 border-[#CBA135] shadow-[0_16px_40px_rgba(0,0,0,0.14)] flex flex-col items-center justify-between text-center cursor-pointer select-none min-h-[360px] my-1"
            >
              {/* Inner Gold Filigree Frame Line */}
              <div className="absolute inset-2 rounded-[22px] border border-[#7A1C1C]/25 pointer-events-none" />

              {/* Blended SVG Header Icon */}
              <div className="pt-1">
                <CardBlendedSVG id={currentMobileCard.id} />
              </div>

              {/* Ceremony Title & Quote */}
              <div className="flex flex-col items-center my-2">
                <h3 className="font-['Cinzel',serif] text-base font-black tracking-[0.25em] text-[#3B0D1A] uppercase">
                  {currentMobileCard.name}
                </h3>
                <p className="font-['Cormorant_Garamond',serif] text-sm italic text-[#634331] font-semibold mt-1 leading-relaxed px-2">
                  "{currentMobileCard.quote}"
                </p>
              </div>

              {/* Date & Time Stamp */}
              <div className="py-2 border-y border-[#CBA135]/50 w-full my-2">
                <p className="font-['Cinzel',serif] text-xs font-bold text-[#3D261A] tracking-wider uppercase">
                  {currentMobileCard.date} • {currentMobileCard.time}
                </p>
              </div>

              {/* Explore Ceremony Button Link */}
              <button
                type="button"
                className="inline-flex items-center gap-2 font-['Cinzel',serif] text-xs font-black text-[#A37326] uppercase tracking-widest pb-1"
              >
                <span>EXPLORE CEREMONY</span>
                <span className="text-sm">→</span>
              </button>
            </div>

            {/* Right Carousel Arrow Button */}
            <button
              type="button"
              onClick={handleNextMobileCard}
              className="p-3 rounded-full bg-[#FFFDF8] border-2 border-[#CBA135] text-[#7A1C1C] shadow-xl active:scale-90 transition-transform z-30 flex-shrink-0 cursor-pointer"
              aria-label="Next Ceremony"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex items-center justify-center gap-2 mt-3">
            {ceremonyDetails.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setMobileIndex(idx)}
                className={`h-2.5 rounded-full transition-all ${
                  idx === mobileIndex ? "w-7 bg-[#7A1C1C]" : "w-2.5 bg-[#CBA135]/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

        {/* DESKTOP VIEW: 6 Ceremony Cards Grid (3 cols x 2 rows) */}
        <div className="hidden sm:grid lg:col-span-7 xl:col-span-7 grid-cols-3 grid-rows-2 gap-2 sm:gap-3 h-full">
          {ceremonyDetails.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setActiveId(item.id);
                setIsModalOpen(true);
              }}
              className="group relative bg-gradient-to-b from-[#FFFDF8] via-[#FAF6F0] to-[#F5EFE6] rounded-[26px] p-1.5 sm:p-2.5 border-2 border-[#CBA135]/50 shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:shadow-[0_14px_30px_rgba(203,161,53,0.3)] hover:border-[#7A1C1C] transition-all duration-300 flex flex-col items-center justify-between text-center cursor-pointer hover:-translate-y-1 select-none h-full"
            >
              {/* Inner Gold Filigree Frame Line */}
              <div className="absolute inset-1.5 rounded-[20px] border border-[#7A1C1C]/15 pointer-events-none group-hover:border-[#7A1C1C]/40 transition-colors" />

              {/* Blended SVG Header Icon */}
              <CardBlendedSVG id={item.id} />

              {/* Ceremony Title & Quote */}
              <div className="flex flex-col items-center my-0.5">
                <h3 className="font-['Cinzel',serif] text-xs sm:text-sm font-extrabold tracking-[0.2em] text-[#3B0D1A] group-hover:text-[#7A1C1C] transition-colors uppercase">
                  {item.name}
                </h3>
                <p className="font-['Cormorant_Garamond',serif] text-[11px] sm:text-[12.5px] italic text-[#634331] font-semibold mt-0.5 leading-tight px-1 line-clamp-2">
                  "{item.quote}"
                </p>
              </div>

              {/* Date & Time Stamp */}
              <div className="py-0.5 border-y border-[#CBA135]/40 w-full my-0.5">
                <p className="font-['Cinzel',serif] text-[9px] sm:text-[10.5px] font-bold text-[#3D261A] tracking-wider uppercase truncate">
                  {item.date} • {item.time}
                </p>
              </div>

              {/* Explore Ceremony Button Link */}
              <button
                type="button"
                className="inline-flex items-center gap-1 font-['Cinzel',serif] text-[9.5px] sm:text-[10.5px] font-extrabold text-[#A37326] group-hover:text-[#7A1C1C] uppercase tracking-widest transition-colors mt-0.5"
              >
                <span>EXPLORE CEREMONY</span>
                <span className="text-xs transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          ))}
        </div>

        {/* RIGHT COLUMN: Large Featured Venue & Mandap Card (Scrollable below carousel on Mobile, side-by-side on Desktop) */}
        <div className="lg:col-span-5 xl:col-span-5 relative w-full h-full min-h-[340px] sm:min-h-[280px] rounded-[28px] overflow-hidden border-2 border-[#CBA135] shadow-[0_20px_50px_rgba(0,0,0,0.22)] flex flex-col justify-between p-4 sm:p-4 text-white group select-none mt-2 sm:mt-0">
          {/* Real Jaipur Royal Palace Mandap Background Image */}
          <img
            src="/assets/royal-palace-mandap.png"
            alt="Royal Jaipur Palace Mandap & Reception Venue"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 pointer-events-none z-0"
          />

          {/* Dark Luxury Vignette & Radiant Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C050E]/95 via-[#1C050E]/45 to-black/25 z-10 pointer-events-none" />

          {/* Top Tag & Ornament */}
          <div className="relative z-20 flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full bg-[#CBA135]/95 text-[#1C050E] font-['Cinzel',serif] text-[8px] sm:text-[9px] font-bold uppercase tracking-widest shadow-md">
              ROYAL VENUE & MANDAP
            </span>
            <span className="font-['Cinzel',serif] text-[9px] text-[#FDE68A] uppercase tracking-widest font-bold">
              JAIPUR, RAJASTHAN
            </span>
          </div>

          {/* Bottom Content Area */}
          <div className="relative z-20 flex flex-col gap-1 mt-auto">
            <h2 className="font-['Playfair_Display',serif] text-lg sm:text-xl lg:text-2xl font-bold text-[#FFFBEB] leading-tight tracking-wide drop-shadow-md">
              Suvarna Mahal & The Grand Palace Lawns
            </h2>
            <p className="font-['Cormorant_Garamond',serif] text-[11px] sm:text-xs italic text-[#FDE68A] font-medium leading-snug">
              "Where royal heritage meets sacred traditions, hosting our Shaadi Mandap and Royal Reception Banquet."
            </p>

            <div className="w-12 h-[1.5px] bg-[#CBA135] my-0.5" />

            {/* Venue Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-1.5 mt-0.5 w-full">
              <a
                href="https://maps.google.com/?q=Suvarna+Mahal+Jaipur"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto flex-1 py-1.5 px-3 rounded-full bg-gradient-to-r from-[#CBA135] to-[#D97706] text-[#1C050E] font-['Cinzel',serif] text-[9px] sm:text-[9.5px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 shadow-lg hover:brightness-110 transition-all cursor-pointer"
              >
                <Navigation className="w-3 h-3" />
                <span>GET DIRECTIONS</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setActiveId("shaadi");
                  setIsModalOpen(true);
                }}
                className="w-full sm:w-auto flex-1 py-1.5 px-3 rounded-full bg-[#3B0D1A]/85 hover:bg-[#3B0D1A] border border-[#CBA135]/60 text-[#FBF1DE] font-['Cinzel',serif] text-[9px] sm:text-[9.5px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all cursor-pointer shadow-lg"
              >
                <CalendarPlus className="w-3 h-3 text-[#CBA135]" />
                <span>VIEW DETAILS</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* POPUP MODAL: CEREMONY DETAILS (Opens on EXPLORE CEREMONY click) */}
      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C050E]/85 backdrop-blur-md px-3 sm:px-4 py-6 animate-in fade-in duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
            className="relative w-full max-w-lg bg-gradient-to-b from-[#FFFDF8] to-[#FAF6F0] text-[#2E0B15] p-5 sm:p-7 rounded-2xl border-2 border-[#CBA135] shadow-[0_30px_70px_rgba(0,0,0,0.95)] flex flex-col items-center text-center animate-in zoom-in-95 duration-300 select-text"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-[#3B0D1A]/10 hover:bg-[#3B0D1A] text-[#3B0D1A] hover:text-[#FBF1DE] border border-[#CBA135]/50 flex items-center justify-center cursor-pointer transition-colors font-bold"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Blended SVG Icon */}
            <CardBlendedSVG id={active.id} />

            <span className="font-['Cinzel',serif] text-[10px] uppercase tracking-[0.25em] font-bold text-[#7A1C1C] mt-1">
              {active.tagline}
            </span>
            <h3 className="font-['Playfair_Display',serif] text-2xl sm:text-3xl font-bold text-[#3B0D1A] tracking-wider mt-0.5">
              {active.name}
            </h3>
            <p className="font-['Cormorant_Garamond',serif] text-base italic text-[#634331] font-medium mt-0.5">
              "{active.quote}"
            </p>

            <div className="w-16 h-[1.5px] bg-[#CBA135] my-3" />

            {/* 3 Detail Badges */}
            <div className="w-full flex flex-col gap-2.5 max-w-sm text-left my-1">
              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#F8EBCD] border border-[#A37326]/30">
                <div className="w-8 h-8 rounded-full bg-[#CBA135]/20 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4 text-[#7A1C1C]" />
                </div>
                <div>
                  <p className="font-['Cinzel',serif] text-[10px] uppercase font-bold text-[#3B0D1A]">{active.day}</p>
                  <p className="font-['Inter',sans-serif] text-xs font-semibold text-[#7A5843]">{active.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#F8EBCD] border border-[#A37326]/30">
                <div className="w-8 h-8 rounded-full bg-[#CBA135]/20 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-[#7A1C1C]" />
                </div>
                <div>
                  <p className="font-['Cinzel',serif] text-[10px] uppercase font-bold text-[#3B0D1A]">TIMING</p>
                  <p className="font-['Inter',sans-serif] text-xs font-semibold text-[#7A5843]">{active.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#F8EBCD] border border-[#A37326]/30">
                <div className="w-8 h-8 rounded-full bg-[#CBA135]/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-[#7A1C1C]" />
                </div>
                <div>
                  <p className="font-['Cinzel',serif] text-[10px] uppercase font-bold text-[#3B0D1A]">{active.venue}</p>
                  <p className="font-['Inter',sans-serif] text-xs font-semibold text-[#7A5843]">{active.location}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 w-full max-w-sm mt-4">
              <a
                href={active.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 px-3 rounded-full bg-gradient-to-r from-[#CBA135] to-[#D97706] text-[#1C050E] font-['Cinzel',serif] text-[10.5px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>GET DIRECTIONS</span>
              </a>

              <a
                href={getGoogleCalendarUrl(active)}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2.5 px-3 rounded-full bg-[#3B0D1A] text-[#FBF1DE] border border-[#CBA135]/60 font-['Cinzel',serif] text-[10.5px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
              >
                <CalendarPlus className="w-3.5 h-3.5 text-[#CBA135]" />
                <span>ADD CALENDAR</span>
              </a>
            </div>
          </div>
        </div>
      )}

      <AmbientLayer dust={6} petals={2} />
    </section>
  );
}
