import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import gsap from "gsap";
import confetti from "canvas-confetti";
import { usePrefersReducedMotion } from "../engine/SceneProvider";
import { AmbientLayer } from "../ui/Ambient";
import { Calendar, Clock, MapPin, Navigation, CalendarPlus, X, BookOpen, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

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
  themeColor: string;
  dressCode?: string;
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
    themeColor: "#F59E0B",
    dressCode: "Yellow & Mustard Festive",
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
    themeColor: "#10B981",
    dressCode: "Emerald & Floral Chic",
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
    themeColor: "#8B5CF6",
    dressCode: "Glamorous Indo-Western",
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
    themeColor: "#DC2626",
    dressCode: "Imperial Royal Traditional",
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
    themeColor: "#D97706",
    dressCode: "Royal Formal / Black Tie",
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
    themeColor: "#CA8A04",
    dressCode: "Regal Daywear",
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

// Rotating Sacred Mandala Halo behind Ceremony SVGs
function RotatingMandalaAura({ color = "#CBA135" }: { color?: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none scale-125">
      <svg
        viewBox="0 0 120 120"
        className="w-full h-full animate-[spin_24s_linear_infinite] opacity-40"
      >
        <circle cx="60" cy="60" r="54" fill="none" stroke={color} strokeWidth="0.8" strokeDasharray="3 3" />
        <circle cx="60" cy="60" r="44" fill="none" stroke={color} strokeWidth="1" opacity="0.6" />
        <circle cx="60" cy="60" r="34" fill="none" stroke={color} strokeWidth="0.6" strokeDasharray="2 3" />
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <g key={deg} transform={`rotate(${deg} 60 60)`}>
            <path d="M60 16 C62 26 62 30 60 40 C58 30 58 26 60 16 Z" fill={color} opacity="0.4" />
            <circle cx="60" cy="12" r="1.5" fill={color} />
          </g>
        ))}
      </svg>
    </div>
  );
}

// Blend-in SVG Icons with Soft Glowing Radial Aura and Mandala Backing
function CardBlendedSVG({ id, isFocused = false }: { id: string; isFocused?: boolean }) {
  switch (id) {
    case "haldi":
      return (
        <div className={`relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 my-0.5 transition-transform duration-500 ${isFocused ? "scale-110" : ""}`}>
          <div className="absolute inset-0 rounded-full bg-amber-400/30 blur-xl scale-125 animate-pulse" />
          <RotatingMandalaAura color="#FBBF24" />
          <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 relative z-10 drop-shadow-md">
            <circle cx="50" cy="50" r="38" fill="none" stroke="#FBBF24" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
            <circle cx="50" cy="50" r="28" fill="rgba(251, 191, 36, 0.18)" />
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
        <div className={`relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 my-0.5 transition-transform duration-500 ${isFocused ? "scale-110" : ""}`}>
          <div className="absolute inset-0 rounded-full bg-emerald-400/30 blur-xl scale-125 animate-pulse" />
          <RotatingMandalaAura color="#34D399" />
          <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 relative z-10 drop-shadow-md">
            <circle cx="50" cy="50" r="38" fill="none" stroke="#34D399" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
            <circle cx="50" cy="50" r="28" fill="rgba(52, 211, 153, 0.18)" />
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
        <div className={`relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 my-0.5 transition-transform duration-500 ${isFocused ? "scale-110" : ""}`}>
          <div className="absolute inset-0 rounded-full bg-purple-400/30 blur-xl scale-125 animate-pulse" />
          <RotatingMandalaAura color="#C084FC" />
          <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 relative z-10 drop-shadow-md">
            <circle cx="50" cy="50" r="38" fill="none" stroke="#C084FC" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
            <circle cx="50" cy="50" r="28" fill="rgba(192, 132, 252, 0.18)" />
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
        <div className={`relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 my-0.5 transition-transform duration-500 ${isFocused ? "scale-110" : ""}`}>
          <div className="absolute inset-0 rounded-full bg-red-500/30 blur-xl scale-125 animate-pulse" />
          <RotatingMandalaAura color="#F87171" />
          <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 relative z-10 drop-shadow-md">
            <circle cx="50" cy="50" r="38" fill="none" stroke="#F87171" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
            <circle cx="50" cy="50" r="28" fill="rgba(248, 113, 113, 0.18)" />
            <path d="M26 68 V38 Q50 22 74 38 V68" fill="none" stroke="#991B1B" strokeWidth="2.5" />
            <rect x="22" y="66" width="56" height="5" fill="#7F1D1D" rx="2" />
            <path d="M50 42 Q42 56 50 64 Q58 56 50 42 Z" fill="#EF4444" />
            <path d="M50 47 Q45 57 50 64 Q55 57 50 47 Z" fill="#F59E0B" />
          </svg>
        </div>
      );
    case "reception":
      return (
        <div className={`relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 my-0.5 transition-transform duration-500 ${isFocused ? "scale-110" : ""}`}>
          <div className="absolute inset-0 rounded-full bg-amber-500/30 blur-xl scale-125 animate-pulse" />
          <RotatingMandalaAura color="#F59E0B" />
          <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 relative z-10 drop-shadow-md">
            <circle cx="50" cy="50" r="38" fill="none" stroke="#F59E0B" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
            <circle cx="50" cy="50" r="28" fill="rgba(245, 158, 11, 0.18)" />
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
        <div className={`relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 my-0.5 transition-transform duration-500 ${isFocused ? "scale-110" : ""}`}>
          <div className="absolute inset-0 rounded-full bg-yellow-400/30 blur-xl scale-125 animate-pulse" />
          <RotatingMandalaAura color="#CA8A04" />
          <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 relative z-10 drop-shadow-md">
            <circle cx="50" cy="50" r="38" fill="none" stroke="#CA8A04" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.6" />
            <circle cx="50" cy="50" r="28" fill="rgba(202, 138, 4, 0.18)" />
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

    const engine = Engine.create({ gravity: { x: 0, y: 0.015, scale: 0.0005 } });
    const flowerCount = 24;
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
      const radius = 10 + Math.random() * 20;
      const x = Math.random() * width;
      const y = Math.random() * height;
      const type: "full" | "petal" = i % 3 === 0 ? "petal" : "full";

      const body = Bodies.circle(x, y, radius, { frictionAir: 0.065, restitution: 0.2 });
      Body.setAngle(body, Math.random() * Math.PI * 2);

      flowerBodies.push({
        body,
        radius,
        colorIndex: Math.floor(Math.random() * 5),
        petalCount: 5 + Math.floor(Math.random() * 3),
        type,
        swaySpeed: 0.006 + Math.random() * 0.01,
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
          x: body.velocity.x * 0.95 + Math.sin(swayPhase) * 0.035,
          y: Math.min(Math.max(body.velocity.y, 0.2), 0.65),
        });

        if (body.position.y > height + 40) {
          Body.setPosition(body, { x: Math.random() * width, y: -30 });
          Body.setVelocity(body, { x: 0, y: 0.3 });
        }

        ctx.save();
        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);
        ctx.globalAlpha = radius > 20 ? 0.22 : 0.32;

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
  const touchDeltaX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  const [activeId, setActiveId] = useState<string>("shaadi");
  const [mobileIndex, setMobileIndex] = useState<number>(3); // default Shaadi
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const active = ceremonyDetails.find((c) => c.id === activeId) || ceremonyDetails[3]!;

  const triggerSparkles = (ceremony: CeremonyDetail) => {
    try {
      const palette = CEREMONY_FLORAL_PALETTES[ceremony.id] || ["#CBA135", "#F59E0B", "#DC2626", "#FDE68A"];
      confetti({
        particleCount: 24,
        spread: 55,
        origin: { y: 0.48 },
        colors: palette,
        scalar: 0.75,
        ticks: 160,
        disableForReducedMotion: true,
      });
    } catch (e) {
      // safe fallback
    }
  };

  const selectMobileIndex = (newIdx: number, burst = true) => {
    const wrappedIdx = (newIdx + ceremonyDetails.length) % ceremonyDetails.length;
    setMobileIndex(wrappedIdx);
    const targetCeremony = ceremonyDetails[wrappedIdx]!;
    setActiveId(targetCeremony.id);
    if (burst) {
      triggerSparkles(targetCeremony);
    }
  };

  const handlePrevMobileCard = () => {
    selectMobileIndex(mobileIndex - 1);
  };

  const handleNextMobileCard = () => {
    selectMobileIndex(mobileIndex + 1);
  };

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
      className="ceremonies-scene-root relative w-full h-[100svh] overflow-y-auto overscroll-contain touch-pan-y flex flex-col justify-start items-center py-4 sm:py-2 pb-20 sm:pb-16 px-3 sm:px-8 select-none z-10"
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

        @keyframes gold-shimmer-sweep {
          0% { transform: translateX(-160%) rotate(25deg); opacity: 0; }
          20% { opacity: 0.7; }
          60% { opacity: 0.9; }
          100% { transform: translateX(260%) rotate(25deg); opacity: 0; }
        }

        .gold-shimmer-sweep-fx {
          position: absolute;
          top: -60%;
          left: -60%;
          width: 220%;
          height: 220%;
          background: linear-gradient(
            110deg,
            transparent 30%,
            rgba(255, 235, 170, 0.4) 45%,
            rgba(255, 255, 255, 0.8) 50%,
            rgba(255, 235, 170, 0.4) 55%,
            transparent 70%
          );
          pointer-events: none;
          animation: gold-shimmer-sweep 4.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          z-index: 15;
        }

        @keyframes active-card-pulse {
          0%, 100% {
            box-shadow: 0 16px 40px rgba(0,0,0,0.18), 0 0 25px rgba(203,161,53,0.35);
          }
          50% {
            box-shadow: 0 20px 48px rgba(0,0,0,0.24), 0 0 35px rgba(203,161,53,0.6);
          }
        }

        .active-3d-card-glow {
          animation: active-card-pulse 3.5s ease-in-out infinite;
        }
      `}</style>

      {/* White & Grey Paper Noise Texture & Vignette Background */}
      <div className="paper-texture-layer" aria-hidden="true" />
      <div className="vignette-layer" aria-hidden="true" />

      {/* Dynamic Matter.js Interactive Physics Floral Background Canvas */}
      <MatterFloralCanvas ceremonyId={activeId} />

      {/* Top Header Section with Enriched Font Size and Generous Gap */}
      <header className="relative z-20 text-center mt-1 sm:mt-3 mb-2.5 sm:mb-7 px-2">
        <span className="font-['Cinzel',serif] text-[10px] sm:text-sm font-extrabold uppercase tracking-[0.3em] text-[#7A1C1C] flex items-center justify-center gap-1.5">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#CBA135] animate-pulse" />
          <span>Royal Celebrations & Events</span>
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#CBA135] animate-pulse" />
        </span>
        <h1 className="font-['Playfair_Display',serif] text-2xl sm:text-4xl lg:text-5xl font-black text-[#3B0D1A] tracking-widest uppercase mt-0.5 sm:mt-1.5 drop-shadow-xs">
          THE CEREMONIES
        </h1>
        {/* Subtle Ornate Gold Divider */}
        <div className="flex items-center justify-center gap-2 mt-1.5 select-none opacity-85">
          <span className="w-6 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-[#CBA135]" />
          <span className="w-1.5 h-1.5 rotate-45 bg-[#CBA135]" />
          <span className="w-6 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-[#CBA135]" />
        </div>
      </header>

      {/* Main Responsive Layout Container */}
      <div className="relative z-20 w-full max-w-6xl h-auto sm:h-full sm:max-h-[calc(100svh-175px)] my-auto flex flex-col lg:grid lg:grid-cols-12 gap-5 sm:gap-5 items-stretch pb-2 sm:pb-2">
        
        {/* MOBILE VIEW: Luxury 3D Coverflow Perspective Carousel & Interactive Effects */}
        <div className="block sm:hidden w-full flex flex-col items-center justify-center my-0 px-0">
          
          {/* Quick Ceremony Category Pills in Wrapped Multi-Row Format */}
          <div className="w-full flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-1 mb-2.5">
            {ceremonyDetails.map((item, idx) => {
              const isSelected = idx === mobileIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectMobileIndex(idx)}
                  className={`px-3 py-1 rounded-full font-['Cinzel',serif] text-[10px] font-bold tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 border cursor-pointer ${
                    isSelected
                      ? "bg-[#7A1C1C] text-[#FFFDF8] border-[#CBA135] shadow-[0_4px_12px_rgba(122,28,28,0.4)] scale-105"
                      : "bg-[#FFFDF8] text-[#3D261A] border-[#CBA135]/60 hover:border-[#7A1C1C] shadow-xs"
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full shrink-0 shadow-xs"
                    style={{ backgroundColor: item.themeColor }}
                  />
                  <span className="whitespace-nowrap">{item.name}</span>
                </button>
              );
            })}
          </div>

          {/* 3D Coverflow Card Stage */}
          <div
            className="relative w-full h-[335px] flex items-center justify-center overflow-hidden"
            style={{ perspective: "1000px" }}
            onTouchStart={(e) => {
              isDragging.current = true;
              touchStartX.current = e.touches[0]?.clientX || 0;
              touchDeltaX.current = 0;
            }}
            onTouchMove={(e) => {
              if (!isDragging.current) return;
              const currentX = e.touches[0]?.clientX || 0;
              touchDeltaX.current = currentX - touchStartX.current;
              setDragOffset(touchDeltaX.current);
            }}
            onTouchEnd={() => {
              isDragging.current = false;
              if (touchDeltaX.current > 40) {
                handlePrevMobileCard();
              } else if (touchDeltaX.current < -40) {
                handleNextMobileCard();
              }
              setDragOffset(0);
              touchDeltaX.current = 0;
            }}
          >
            {/* Render 3D Stack Cards */}
            {ceremonyDetails.map((item, idx) => {
              const count = ceremonyDetails.length;
              let diff = (idx - mobileIndex + count) % count;
              if (diff > count / 2) diff -= count;

              const isVisible = Math.abs(diff) <= 2;
              if (!isVisible) return null;

              const isCurrent = diff === 0;

              const dragFactor = isDragging.current ? dragOffset / 260 : 0;
              const effectiveDiff = diff - dragFactor;

              let translateX = effectiveDiff * 76; // % offset
              let rotateY = effectiveDiff * -24; // deg 3d rotation
              let translateZ = Math.abs(effectiveDiff) * -85; // px depth
              let scale = Math.max(0.8, 1 - Math.abs(effectiveDiff) * 0.16);
              let opacity = Math.max(0, 1 - Math.abs(effectiveDiff) * 0.5);
              let zIndex = 20 - Math.round(Math.abs(effectiveDiff) * 5);

              return (
                <div
                  key={item.id}
                  onClick={() => {
                    if (isCurrent) {
                      setActiveId(item.id);
                      setIsModalOpen(true);
                    } else {
                      selectMobileIndex(idx);
                    }
                  }}
                  style={{
                    transform: `translateX(${translateX}%) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity: opacity,
                    zIndex: zIndex,
                    transition: isDragging.current ? "none" : "transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.45s ease",
                  }}
                  className={`absolute w-[265px] max-w-[82vw] h-[315px] bg-gradient-to-b from-[#FFFDF8] via-[#FAF6F0] to-[#F5EFE6] rounded-[24px] p-3.5 border-2 flex flex-col items-center justify-between text-center select-none cursor-pointer overflow-hidden ${
                    isCurrent
                      ? "border-[#CBA135] active-3d-card-glow shadow-[0_16px_40px_rgba(0,0,0,0.18)]"
                      : "border-[#CBA135]/40 shadow-[0_6px_16px_rgba(0,0,0,0.08)] pointer-events-auto"
                  }`}
                >
                  {/* Luxury Gold Shimmer Sweep Effect on Current Card */}
                  {isCurrent && <div className="gold-shimmer-sweep-fx" />}

                  {/* Inner Gold Filigree Frame Line */}
                  <div className="absolute inset-1.5 rounded-[18px] border border-[#7A1C1C]/25 pointer-events-none" />

                  {/* Top Ceremony Category Tag */}
                  <div className="relative z-10 pt-0.5 flex items-center justify-center">
                    <span className="px-2 py-0.5 rounded-full bg-[#7A1C1C]/10 text-[#7A1C1C] border border-[#7A1C1C]/20 font-['Cinzel',serif] text-[8.5px] font-extrabold uppercase tracking-wider">
                      {item.tagline}
                    </span>
                  </div>

                  {/* Blended SVG Header Icon with Glowing Aura & Spinning Mandala */}
                  <div className="relative z-10 py-0.5 scale-90">
                    <CardBlendedSVG id={item.id} isFocused={isCurrent} />
                  </div>

                  {/* Ceremony Title & Quote */}
                  <div className="relative z-10 flex flex-col items-center my-0 px-1">
                    <h3 className="font-['Cinzel',serif] text-sm font-black tracking-[0.22em] text-[#3B0D1A] uppercase">
                      {item.name}
                    </h3>
                    <p className="font-['Cormorant_Garamond',serif] text-[12px] italic text-[#634331] font-semibold mt-0.5 leading-snug px-1 line-clamp-2">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Date & Time Stamp Badge */}
                  <div className="relative z-10 py-1 border-y border-[#CBA135]/60 w-full my-0.5 bg-[#FFFDF8]/40">
                    <p className="font-['Cinzel',serif] text-[10px] font-bold text-[#3D261A] tracking-wider uppercase">
                      {item.date} • {item.time}
                    </p>
                  </div>

                  {/* Explore Ceremony Glowing Button */}
                  <div className="relative z-10 w-full pb-0.5">
                    <button
                      type="button"
                      className="w-full py-1.5 px-3 rounded-full bg-gradient-to-r from-[#7A1C1C] via-[#8C2338] to-[#7A1C1C] text-[#FFFDF8] border border-[#CBA135] font-['Cinzel',serif] text-[9.5px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-transform"
                    >
                      <Sparkles className="w-3 h-3 text-[#FDE68A]" />
                      <span>EXPLORE CEREMONY</span>
                      <span className="text-xs">→</span>
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Left Carousel Arrow Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevMobileCard();
              }}
              className="absolute left-1 z-30 p-2 rounded-full bg-[#FFFDF8]/90 backdrop-blur-xs border-2 border-[#CBA135] text-[#7A1C1C] shadow-lg active:scale-90 transition-transform cursor-pointer"
              aria-label="Previous Ceremony"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Right Carousel Arrow Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNextMobileCard();
              }}
              className="absolute right-1 z-30 p-2 rounded-full bg-[#FFFDF8]/90 backdrop-blur-xs border-2 border-[#CBA135] text-[#7A1C1C] shadow-lg active:scale-90 transition-transform cursor-pointer"
              aria-label="Next Ceremony"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Carousel Indicators */}
          <div className="flex items-center justify-center gap-1.5 mt-1.5 mb-1">
            {ceremonyDetails.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => selectMobileIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === mobileIndex
                    ? "w-7 bg-[#7A1C1C] shadow-[0_0_8px_rgba(122,28,28,0.5)]"
                    : "w-2 bg-[#CBA135]/40 hover:bg-[#CBA135]"
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

        {/* RIGHT COLUMN: Featured Venue & Mandap Card (Fills height down to navbar on Mobile, Full Height on Desktop) */}
        <div className="lg:col-span-5 xl:col-span-5 relative w-full min-h-[460px] sm:min-h-[400px] lg:min-h-[480px] rounded-[28px] sm:rounded-[32px] overflow-hidden border-2 border-[#CBA135] shadow-[0_20px_50px_rgba(0,0,0,0.25)] flex flex-col justify-between p-5 sm:p-6 text-white group select-none mt-3 sm:mt-0 mb-1">
          {/* Real Jaipur Royal Palace Mandap Background Image */}
          <img
            src="/assets/royal-palace-mandap.png"
            alt="Royal Jaipur Palace Mandap & Reception Venue"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 pointer-events-none z-0"
          />

          {/* Dark Luxury Vignette & Radiant Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C050E]/95 via-[#1C050E]/50 to-black/35 z-10 pointer-events-none" />

          {/* Top Tag & Ornament */}
          <div className="relative z-20 flex items-center justify-between">
            <span className="px-3 py-1 rounded-full bg-[#CBA135]/95 text-[#1C050E] font-['Cinzel',serif] text-[9px] sm:text-[10px] font-bold uppercase tracking-widest shadow-md">
              ROYAL VENUE & MANDAP
            </span>
            <span className="font-['Cinzel',serif] text-[9.5px] sm:text-[10px] text-[#FDE68A] uppercase tracking-widest font-bold">
              JAIPUR, RAJASTHAN
            </span>
          </div>

          {/* Bottom Content Area */}
          <div className="relative z-20 flex flex-col gap-1.5 sm:gap-2 mt-auto pt-4">
            <h2 className="font-['Playfair_Display',serif] text-xl sm:text-2xl lg:text-3xl font-bold text-[#FFFBEB] leading-tight tracking-wide drop-shadow-md">
              Suvarna Mahal & The Grand Palace Lawns
            </h2>
            <p className="font-['Cormorant_Garamond',serif] text-xs sm:text-sm italic text-[#FDE68A] font-medium leading-relaxed">
              "Where royal heritage meets sacred traditions, hosting our Shaadi Mandap and Royal Reception Banquet."
            </p>

            <div className="w-16 h-[1.5px] bg-[#CBA135] my-1 sm:my-1.5" />

            {/* Venue Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-2.5 mt-1 sm:mt-1.5 w-full">
              <a
                href="https://maps.google.com/?q=Suvarna+Mahal+Jaipur"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto flex-1 py-3 px-4 sm:py-3.5 sm:px-5 rounded-full bg-gradient-to-r from-[#CBA135] to-[#D97706] text-[#1C050E] font-['Cinzel',serif] text-[9.5px] sm:text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md hover:brightness-110 active:scale-95 transition-all cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>GET DIRECTIONS</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setActiveId("shaadi");
                  setIsModalOpen(true);
                }}
                className="w-full sm:w-auto flex-1 py-3 px-4 sm:py-3.5 sm:px-5 rounded-full bg-[#3B0D1A]/85 hover:bg-[#3B0D1A] border border-[#CBA135]/60 text-[#FBF1DE] font-['Cinzel',serif] text-[9.5px] sm:text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer shadow-md"
              >
                <CalendarPlus className="w-3.5 h-3.5 text-[#CBA135]" />
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
                className="flex-1 py-3 px-3 sm:py-3.5 rounded-full bg-gradient-to-r from-[#CBA135] to-[#D97706] text-[#1C050E] font-['Cinzel',serif] text-[10.5px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>GET DIRECTIONS</span>
              </a>

              <a
                href={getGoogleCalendarUrl(active)}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-3 sm:py-3.5 rounded-full bg-[#3B0D1A] text-[#FBF1DE] border border-[#CBA135]/60 font-['Cinzel',serif] text-[10.5px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
              >
                <CalendarPlus className="w-3.5 h-3.5 text-[#CBA135]" />
                <span>ADD CALENDAR</span>
              </a>
            </div>
          </div>
        </div>
      )}

      <AmbientLayer dust={6} petals={0} />
    </section>
  );
}
