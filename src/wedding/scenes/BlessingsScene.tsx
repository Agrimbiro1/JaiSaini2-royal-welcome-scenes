import { useEffect, useRef, useState, FormEvent } from "react";
import Lenis from "lenis";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  X,
  CheckCircle2,
} from "lucide-react";
import { wedding, type Blessing } from "../data/wedding";
import { usePrefersReducedMotion } from "../engine/SceneProvider";
import { AmbientLayer } from "../ui/Ambient";
import bookBgImage from "@/assets/blessings-open-book-bg.jpg";

interface TagItem extends Blessing {
  id: string;
  timestamp?: string;
}

// Lotus Icon Motif matching the reference design
const LotusMotif = ({ className = "w-3.5 h-3.5 text-[#8C2338]" }: { className?: string }) => (
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

// Delicate Scroll Divider
const ScrollOrnament = () => (
  <div className="flex items-center justify-center gap-1.5 my-1 sm:my-1.5 opacity-85 select-none">
    <span className="w-6 sm:w-8 h-[1px] bg-gradient-to-r from-transparent to-[#A37326]" />
    <LotusMotif className="w-3 h-3 text-[#8C2338]" />
    <span className="w-6 sm:w-8 h-[1px] bg-gradient-to-l from-transparent to-[#A37326]" />
  </div>
);

const initialBlessingsList: Blessing[] = [
  { guestName: "Priya & Family", message: "Wishing you both a lifetime filled with love, laughter and beautiful memories." },
  ...wedding.blessings,
  { guestName: "Kavita Aunty", message: "May your togetherness grow sweeter with every passing year." },
  { guestName: "Dadi Maa", message: "May your bond grow deeper and sweeter with every sunrise." },
  { guestName: "Chacha & Chachi", message: "Wishing you a lifetime of endless laughter, royal joy, and health." },
];

export default function BlessingsScene() {
  const reduced = usePrefersReducedMotion();

  const [blessings, setBlessings] = useState<TagItem[]>(() =>
    initialBlessingsList.map((b, idx) => ({
      ...b,
      id: `blessing-${idx}-${Date.now()}`,
    }))
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isViewAllOpen, setIsViewAllOpen] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [formStatus, setFormStatus] = useState<{ type: "idle" | "success" | "error"; text: string }>({
    type: "idle",
    text: "",
  });

  const nameInputRef = useRef<HTMLInputElement>(null);

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Automatic Carousel loop (advances every 4 seconds)
  useEffect(() => {
    if (!isAutoPlaying || reduced || blessings.length <= 1) return;

    const interval = setInterval(() => {
      changeSlide((activeIndex + 1) % blessings.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, activeIndex, blessings.length, reduced]);

  const changeSlide = (newIndex: number) => {
    setIsFading(true);
    setTimeout(() => {
      setActiveIndex(newIndex);
      setIsFading(false);
    }, 250);
  };

  const goNext = () => {
    changeSlide((activeIndex + 1) % blessings.length);
  };

  const goPrev = () => {
    changeSlide((activeIndex - 1 + blessings.length) % blessings.length);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedMsg = msg.trim();

    if (!trimmedName || !trimmedMsg) {
      setFormStatus({
        type: "error",
        text: "Please enter both your name and blessing.",
      });
      return;
    }

    const newBlessing: TagItem = {
      id: `blessing-${Date.now()}`,
      guestName: trimmedName,
      message: trimmedMsg,
      timestamp: "Just now",
    };

    setBlessings((prev) => [newBlessing, ...prev]);
    changeSlide(0);
    setFormStatus({
      type: "success",
      text: `Thank you, ${trimmedName}! Your blessing is printed on the page.`,
    });
    setName("");
    setMsg("");

    setTimeout(() => {
      setFormStatus({ type: "idle", text: "" });
    }, 4500);
  };

  const currentTag = blessings[activeIndex] ?? blessings[0] ?? {
    id: "fallback",
    guestName: "Guest",
    message: "Wishing you both a lifetime filled with love, laughter and beautiful memories.",
  };

  return (
    <section className="relative w-full h-full min-h-screen flex flex-col items-center justify-center select-none overflow-hidden p-0 bg-[#1C050E]">
      <style>{`
        .printed-heading {
          font-family: 'Cinzel', 'Playfair Display', serif;
          color: #3B0D1A;
          letter-spacing: 0.14em;
          font-weight: 700;
        }

        .printed-label {
          font-family: 'Cinzel', 'Playfair Display', serif;
          color: #3B0D1A;
          letter-spacing: 0.15em;
          font-weight: 700;
        }

        /* Transparent Paper Input Fields - Embedded in Book Page */
        .embedded-input-box {
          background: rgba(245, 230, 200, 0.35);
          border: 1.5px solid rgba(89, 20, 38, 0.32);
          border-radius: 0.55rem;
          color: #2E0B15;
          font-family: 'Cormorant Garamond', serif;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .embedded-input-box:focus-within {
          border-color: #591426;
          background: rgba(245, 230, 200, 0.6);
          box-shadow: 0 0 0 1px rgba(89, 20, 38, 0.3);
        }

        .embedded-input-box input, .embedded-input-box textarea {
          background: transparent;
          border: none;
          outline: none;
          color: #2E0B15;
          width: 100%;
          font-family: 'Cormorant Garamond', serif;
        }

        .embedded-input-box input::placeholder, .embedded-input-box textarea::placeholder {
          color: #7C4554;
          font-style: italic;
          font-weight: 400;
        }

        /* Printed Send Button */
        .embedded-send-btn {
          background: linear-gradient(180deg, #4A0E1C 0%, #330814 100%);
          border: 1px solid rgba(203, 161, 53, 0.85);
          color: #FBF1DE;
          font-family: 'Cinzel', serif;
          letter-spacing: 0.16em;
          border-radius: 9999px;
          box-shadow: 0 4px 12px rgba(51, 8, 20, 0.4);
          transition: all 0.2s ease;
        }

        .embedded-send-btn:hover {
          transform: translateY(-1px);
          background: linear-gradient(180deg, #5C1324 0%, #3E0B19 100%);
          box-shadow: 0 6px 16px rgba(203, 161, 53, 0.45);
        }

        .embedded-send-btn:active {
          transform: translateY(1px);
        }

        /* Embedded Blessing Card - Transparent Parchment Frame */
        .embedded-blessing-frame {
          background: rgba(245, 230, 200, 0.25);
          border: 1px dashed rgba(163, 115, 38, 0.42);
          border-radius: 0.75rem;
          position: relative;
        }

        .embedded-blessing-frame::before {
          content: "";
          position: absolute;
          inset: 3px;
          border: 1px solid rgba(163, 115, 38, 0.2);
          border-radius: 0.6rem;
          pointer-events: none;
        }

        /* Carousel Navigation Buttons */
        .carousel-arrow-btn {
          background: rgba(245, 230, 200, 0.4);
          border: 1px solid rgba(89, 20, 38, 0.4);
          color: #3B0D1A;
          border-radius: 9999px;
          transition: all 0.2s ease;
        }

        .carousel-arrow-btn:hover {
          background: #3B0D1A;
          color: #FBF1DE;
          border-color: #3B0D1A;
        }

        /* 3D Perspective Book Page Transforms */
        .left-page-perspective {
          transform: perspective(1000px) rotateX(-2deg) rotateY(2.2deg);
          transform-origin: center center;
        }

        .right-page-perspective {
          transform: perspective(1000px) rotateX(-2deg) rotateY(-2.2deg);
          transform-origin: center center;
        }
      `}</style>

      {/* 16:9 SYNCHRONIZED STAGE - FULL VIEWPORT COVERAGE */}
      <div className="relative w-full h-full min-h-screen flex items-center justify-center overflow-hidden">
        {/* Synchronized 16:9 Book Container */}
        <div className="relative w-full aspect-[16/9] max-h-screen flex items-center justify-center">
          
          {/* Background Image: Clean 16:9 Image */}
          <img
            src={bookBgImage}
            alt="Royal Manuscript Open Book"
            className="absolute inset-0 w-full h-full object-cover object-center select-none"
          />

          {/* ==================== LEFT PAGE (TILTED UPWARDS & SCALED TO MATCH BOOK) ==================== */}
          <div className="left-page-perspective absolute left-[22.2%] top-[16.5%] w-[25.5%] h-[65%] flex flex-col justify-between items-center text-center p-1 sm:p-2 z-10">
            
            {/* Header */}
            <div className="flex flex-col items-center w-full">
              <h2 className="printed-heading text-[1.15vw] sm:text-xs md:text-sm lg:text-base uppercase leading-tight">
                LEAVE A BLESSING
              </h2>
              <ScrollOrnament />
            </div>

            {/* Form - Generously Spaced */}
            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-[0.7vw] sm:gap-2 md:gap-2.5 my-auto text-left">
              {/* Field 1: YOUR NAME */}
              <div className="flex flex-col gap-1">
                <label htmlFor="guestName" className="printed-label text-[0.7vw] sm:text-[10px] md:text-[12px] uppercase">
                  YOUR NAME
                </label>
                <div className="embedded-input-box px-2.5 sm:px-3 py-1.5 sm:py-2 flex items-center justify-between">
                  <input
                    ref={nameInputRef}
                    type="text"
                    id="guestName"
                    maxLength={35}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="text-[0.95vw] sm:text-xs md:text-sm lg:text-base"
                    required
                  />
                  <LotusMotif className="w-3.5 h-3.5 text-[#8C2338] shrink-0 ml-1 opacity-80" />
                </div>
              </div>

              {/* Field 2: YOUR BLESSING */}
              <div className="flex flex-col gap-1">
                <label htmlFor="guestMessage" className="printed-label text-[0.7vw] sm:text-[10px] md:text-[12px] uppercase">
                  YOUR BLESSING
                </label>
                <div className="embedded-input-box px-2.5 sm:px-3 py-1.5 sm:py-2 flex flex-col justify-between h-[7.5vw] sm:h-24 md:h-28 lg:h-32">
                  <textarea
                    id="guestMessage"
                    maxLength={120}
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    placeholder="Write your blessing or message..."
                    className="resize-none h-full text-[0.95vw] sm:text-xs md:text-sm lg:text-base leading-relaxed"
                    required
                  />
                  <div className="flex items-center justify-between mt-1 pt-1 border-t border-[#8C2338]/15">
                    <span className="text-[0.6vw] sm:text-[9px] md:text-[11px] text-[#7C4554] font-sans font-semibold">
                      {msg.length}/120
                    </span>
                    <LotusMotif className="w-3.5 h-3.5 text-[#8C2338] shrink-0 opacity-80" />
                  </div>
                </div>
              </div>

              {/* Form Status Message */}
              {formStatus.text && (
                <div
                  className={`text-[0.65vw] sm:text-[9px] md:text-[11px] font-semibold px-2 py-0.5 rounded flex items-center gap-1 transition-all ${
                    formStatus.type === "success"
                      ? "text-[#3B0D1A] bg-[#3B0D1A]/10 border border-[#A37326]/30"
                      : "text-red-900 bg-red-900/10 border border-red-900/20"
                  }`}
                >
                  {formStatus.type === "success" && <CheckCircle2 className="w-3 h-3 text-[#A37326] shrink-0" />}
                  <span className="truncate">{formStatus.text}</span>
                </div>
              )}

              {/* Button: SEND BLESSING */}
              <div className="flex justify-center mt-1">
                <button
                  type="submit"
                  className="embedded-send-btn py-1.5 sm:py-2 px-5 sm:px-7 md:px-8 flex items-center justify-center gap-2 text-[0.75vw] sm:text-[11px] md:text-[12px] lg:text-[13px] font-semibold uppercase cursor-pointer"
                >
                  <LotusMotif className="w-3.5 h-3.5 text-[#CBA135]" />
                  <span>SEND BLESSING</span>
                </button>
              </div>
            </form>

            {/* Bottom Scroll Flourish */}
            <div className="w-full flex justify-center">
              <ScrollOrnament />
            </div>
          </div>


          {/* ==================== RIGHT PAGE (TILTED UPWARDS & VIEW ALL BUTTON BELOW HEADER) ==================== */}
          <div
            className="right-page-perspective absolute left-[52.3%] top-[16.5%] w-[25.5%] h-[65%] flex flex-col justify-between items-center text-center p-1 sm:p-2 z-10"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            {/* Header + View All Blessings Button directly below heading */}
            <div className="flex flex-col items-center w-full">
              <h2 className="printed-heading text-[1.15vw] sm:text-xs md:text-sm lg:text-base uppercase leading-tight">
                BLESSINGS FROM LOVED ONES
              </h2>
              <ScrollOrnament />
              
              {/* VIEW ALL BLESSINGS BUTTON BELOW THE HEADING TEXT */}
              <button
                type="button"
                onClick={() => setIsViewAllOpen(true)}
                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 mt-0.5 rounded-full bg-[#3B0D1A]/10 hover:bg-[#3B0D1A] text-[#3B0D1A] hover:text-[#FBF1DE] border border-[#A37326]/50 font-['Cinzel',serif] text-[0.65vw] sm:text-[9px] md:text-[10px] uppercase tracking-wider transition-all cursor-pointer shadow-xs"
              >
                <BookOpen className="w-3 h-3 text-[#A37326]" />
                <span>VIEW ALL BLESSINGS ({blessings.length})</span>
              </button>
            </div>

            {/* Embedded Blessing Card Container */}
            <div className="w-full my-auto flex flex-col justify-center">
              <div className="embedded-blessing-frame p-2.5 sm:p-3.5 md:p-4 flex flex-col items-center justify-center text-center">
                
                {/* Animated Text Content */}
                <div
                  className={`w-full flex flex-col items-center justify-center transition-all duration-300 ${
                    isFading ? "opacity-0 scale-95" : "opacity-100 scale-100"
                  }`}
                >
                  {/* Top Lotus Motif */}
                  <LotusMotif className="w-3.5 h-3.5 text-[#8C2338] mb-0.5" />

                  {/* Opening Quote */}
                  <span className="font-['Cormorant_Garamond',serif] text-xl sm:text-2xl md:text-3xl text-[#A37326] leading-none select-none">
                    “
                  </span>

                  {/* Message Text */}
                  <p className="font-['Cormorant_Garamond',serif] text-[0.95vw] sm:text-xs md:text-sm lg:text-base font-medium italic leading-relaxed text-[#2E0B15] max-w-full px-1">
                    {currentTag.message}
                  </p>

                  {/* Divider Line */}
                  <div className="w-10 sm:w-12 h-[1px] bg-[#A37326]/35 my-1 sm:my-1.5" />

                  {/* Author Name */}
                  <p className="printed-heading text-[0.75vw] sm:text-[10px] md:text-[11px] lg:text-[12px] uppercase text-[#3B0D1A]">
                    — {currentTag.guestName}
                  </p>
                </div>

              </div>
            </div>

            {/* Carousel Controls */}
            <div className="w-full flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-0.5">
              {/* Left Arrow Button */}
              <button
                type="button"
                onClick={goPrev}
                className="carousel-arrow-btn w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center cursor-pointer shadow-xs"
                title="Previous blessing"
              >
                <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>

              {/* Counter */}
              <div className="flex flex-col items-center">
                <span className="printed-heading text-[0.75vw] sm:text-[10px] md:text-[11px]">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(blessings.length).padStart(2, "0")}
                </span>
                <div className="w-8 sm:w-10 h-[1px] bg-[#A37326]/40 mt-0.5" />
              </div>

              {/* Right Arrow Button */}
              <button
                type="button"
                onClick={goNext}
                className="carousel-arrow-btn w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center cursor-pointer shadow-xs"
                title="Next blessing"
              >
                <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* POPUP MODAL: ALL GUEST BLESSINGS */}
      {isViewAllOpen && (
        <div
          onClick={() => setIsViewAllOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C050E]/85 backdrop-blur-md px-3 sm:px-4 py-6 animate-in fade-in transition-all duration-300"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl max-h-[85vh] bg-[#FBF1DE] text-[#2E0B15] p-5 sm:p-7 rounded-xl border-2 border-[#CBA135] shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_30px_rgba(203,161,53,0.35)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 select-none"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsViewAllOpen(false)}
              className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-[#3B0D1A]/10 hover:bg-[#3B0D1A] text-[#3B0D1A] hover:text-[#FBF1DE] border border-[#CBA135]/50 flex items-center justify-center cursor-pointer transition-colors font-bold"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="relative z-10 text-center pb-3 border-b border-[#A37326]/40">
              <span className="font-['Cinzel',serif] text-[11px] uppercase tracking-[0.3em] font-bold text-[#3B0D1A]">
                Complete Collection
              </span>
              <h3 className="font-['Cormorant_Garamond',serif] text-2xl sm:text-3xl font-bold text-[#3B0D1A] tracking-wide mt-0.5">
                All Guest Blessings ({blessings.length})
              </h3>
            </div>

            {/* Scrollable Grid */}
            <div className="relative z-10 mt-4 flex-1 overflow-y-auto pr-1.5 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {blessings.map((b, i) => (
                <div
                  key={b.id || i}
                  onClick={() => {
                    changeSlide(i);
                    setIsViewAllOpen(false);
                  }}
                  className="p-4 rounded-lg bg-[#F8EBCD] border border-[#A37326]/40 shadow-xs flex flex-col justify-between hover:border-[#3B0D1A] hover:shadow-md cursor-pointer transition-all hover:-translate-y-0.5"
                >
                  <p className="font-['Cormorant_Garamond',serif] text-base italic leading-relaxed text-[#2E0B15] font-medium">
                    "{b.message}"
                  </p>
                  <div className="mt-3 pt-2 border-t border-[#A37326]/25 flex items-center justify-between">
                    <LotusMotif className="w-3.5 h-3.5 text-[#8C2338]" />
                    <p className="font-['Cinzel',serif] text-[11px] uppercase tracking-[0.18em] font-bold text-[#3B0D1A]">
                      — {b.guestName}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Floating Ambient Layer */}
      <AmbientLayer dust={6} petals={2} />
    </section>
  );
}
