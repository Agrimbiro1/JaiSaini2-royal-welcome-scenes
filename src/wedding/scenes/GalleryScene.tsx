import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { wedding, type GalleryItem } from "../data/wedding";
import { useSceneEnter } from "../engine/useSceneEnter";
import { usePrefersReducedMotion } from "../engine/SceneProvider";
import { RoyalFrame } from "../ui/RoyalFrame";
import { AmbientLayer, WarmGlow } from "../ui/Ambient";
import galleryBg from "/assets/gallery-background-wall.png";

export default function GalleryScene() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const lightSweepRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);

  const touchStartX = useRef(0);

  const handleNextPhoto = () => {
    setItems((prev) => {
      if (prev.length < 2) return prev;
      const next = [...prev];
      const first = next.shift()!;
      next.push(first);
      return next;
    });
  };

  const handlePrevPhoto = () => {
    setItems((prev) => {
      if (prev.length < 2) return prev;
      const next = [...prev];
      const last = next.pop()!;
      next.unshift(last);
      return next;
    });
  };

  // Position layout configuration for 5 frames on the haveli wall
  // Vertically raised so bottom frames leave ample clearance above the bottom navigation bar
  // Position layout configuration for 5 frames on the haveli wall with increased frame sizes & clear spacing
  const frameLayouts = [
    {
      id: "slot-0",
      left: "2%",
      top: "5%",
      width: "w-[145px] sm:w-[190px] md:w-[245px]",
    },
    {
      id: "slot-1",
      left: "71%",
      top: "5%",
      width: "w-[145px] sm:w-[190px] md:w-[245px]",
    },
    {
      id: "hero",
      left: "27%",
      top: "17%",
      width: "w-[230px] sm:w-[320px] md:w-[410px]",
      isHero: true,
    },
    {
      id: "slot-3",
      left: "3%",
      top: "47%",
      width: "w-[145px] sm:w-[190px] md:w-[245px]",
    },
    {
      id: "slot-4",
      left: "70%",
      top: "47%",
      width: "w-[145px] sm:w-[190px] md:w-[245px]",
    },
  ];

  const mobileShowcaseRef = useRef<HTMLDivElement>(null);

  const [items, setItems] = useState<GalleryItem[]>(wedding.gallery);
  const [focusedItem, setFocusedItem] = useState<GalleryItem | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(typeof window !== "undefined" && window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Automatic Carousel ONLY for mobile view (< 640px)
  // Disabled on PC/Desktop so the 5 Haveli wall frames stay steady and interactive
  useEffect(() => {
    if (!isMobile || !isAutoPlay || focusedItem || reduced) return;

    const timer = setInterval(() => {
      handleNextPhoto();
    }, 3500);

    return () => clearInterval(timer);
  }, [isMobile, isAutoPlay, focusedItem, reduced]);

  // Physical Entrance Animation: Frames drop IMMEDIATELY when section opens
  useEffect(() => {
    if (!rootRef.current || reduced) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Step 1: Background light sweep reveals in parallel (no blocking delay)
    if (lightSweepRef.current) {
      tl.to(
        lightSweepRef.current,
        {
          opacity: 0.4,
          duration: 0.6,
          ease: "power1.inOut",
        },
        0
      );
    }

    if (spotlightRef.current) {
      tl.to(spotlightRef.current, { opacity: 0.75, duration: 0.8 }, 0.2);
    }

    // Step 2: Drop desktop frames if mounted
    const dropOrder = [0, 1, 3, 4, 2];

    dropOrder.forEach((itemIdx, seqIdx) => {
      const frameEl = frameRefs.current[itemIdx];
      if (!frameEl) return;

      const isHero = itemIdx === 2;
      const initialRot = (itemIdx % 2 === 0 ? 1 : -1) * (isHero ? 5 : 8);

      tl.fromTo(
        frameEl,
        {
          y: -120,
          opacity: 0,
          rotation: initialRot,
        },
        {
          y: 0,
          opacity: 1,
          rotation: 0,
          duration: isHero ? 0.7 : 0.55,
          ease: "back.out(1.2)",
        },
        seqIdx * 0.08
      );
    });

    // Step 3: Animate mobile showcase container if mounted
    if (mobileShowcaseRef.current) {
      tl.fromTo(
        mobileShowcaseRef.current,
        { opacity: 0, scale: 0.95, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power2.out" },
        0.1
      );
    }

    return () => {
      tl.kill();
    };
  }, [reduced]);

  /**
   * Handle Photo Click:
   * When clicking any side photo, it SWAPS with the middle photo (index 2)!
   * When clicking the middle photo (index 2), opens cinematic focused lightbox view.
   */
  const handlePhotoClick = (clickedIdx: number) => {
    if (clickedIdx === 2) {
      // Middle photo clicked -> open cinematic lightbox
      const middlePhoto = items[2];
      if (middlePhoto) setFocusedItem(middlePhoto);
      return;
    }

    const clickedEl = frameRefs.current[clickedIdx];
    const centerEl = frameRefs.current[2];

    if (clickedEl && centerEl) {
      // Smooth GSAP Swap Animation
      const tl = gsap.timeline({
        onComplete: () => {
          // Swap item state array so clicked photo becomes middle (index 2)
          setItems((prev) => {
            const next = [...prev];
            const temp = next[clickedIdx];
            next[clickedIdx] = next[2]!;
            next[2] = temp!;
            return next;
          });
          // Reset inline transforms after state swap
          gsap.set([clickedEl, centerEl], { scale: 1, rotation: 0 });
        },
      });

      tl.to(
        clickedEl,
        {
          scale: 1.12,
          rotation: 5,
          duration: 0.3,
          ease: "power2.in",
        },
        0
      )
        .to(
          centerEl,
          {
            scale: 0.92,
            rotation: -5,
            duration: 0.3,
            ease: "power2.in",
          },
          0
        )
        .to(
          clickedEl,
          {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "back.out(1.3)",
          },
          0.3
        )
        .to(
          centerEl,
          {
            scale: 1,
            rotation: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          0.3
        );
    } else {
      // Direct state swap fallback
      setItems((prev) => {
        const next = [...prev];
        const temp = next[clickedIdx];
        next[clickedIdx] = next[2]!;
        next[2] = temp!;
        return next;
      });
    }
  };

  return (
    <section
      ref={rootRef}
      className="relative w-full h-full overflow-hidden bg-[#0d0f07] text-[#e3e3d5] font-sans select-none"
    >
      {/* ── Fixed Haveli Background Environment ───────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img
          src={galleryBg}
          alt="Haveli Background Wall"
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Subtle Ambient Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f07]/75 via-[#0d0f07]/30 to-[#0d0f07]/60" />
      </div>

      {/* Warm Sunlight Sweep Layer */}
      <div
        ref={lightSweepRef}
        className="absolute inset-0 z-5 pointer-events-none bg-gradient-to-r from-transparent via-[#fef08a]/20 to-transparent opacity-0 mix-blend-soft-light transition-opacity duration-1000"
      />

      {/* Warm Spotlight Pools */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 z-5 pointer-events-none opacity-0 transition-opacity duration-1000"
      >
        <WarmGlow className="left-1/2 top-1/4 h-72 w-72 -translate-x-1/2 opacity-60" />
      </div>

      {/* Scene Title Header */}
      <div className="absolute top-2.5 sm:top-4 inset-x-0 z-30 flex flex-col items-center justify-center text-center pointer-events-none px-4">
        <span className="font-sans text-[9px] sm:text-[10px] md:text-[11px] uppercase tracking-[0.35em] text-[#e9c349]">
          Chapter Four • Pre-Wedding Memories
        </span>
        <h2 className="font-display text-base sm:text-lg md:text-xl text-[#e3e3d5] font-medium tracking-wide">
          Royal Memory Gallery
        </h2>
      </div>

      {/* ── Haveli Wall Gallery Canvas (Desktop: >= 640px) ───────────────── */}
      <div className="hidden sm:flex relative z-10 w-full h-full items-center justify-center">
        <div className="relative w-full max-w-5xl h-full">
          {items.map((item, idx) => {
            const layout = frameLayouts[idx] || frameLayouts[0]!;
            const isMiddle = idx === 2;

            return (
              <div
                key={item.id}
                ref={(el) => {
                  frameRefs.current[idx] = el;
                }}
                style={{
                  left: layout.left,
                  top: layout.top,
                }}
                className={`absolute transform -translate-x-1/2 ${layout.width} transition-all duration-300 ${
                  isMiddle ? "z-30 opacity-100 scale-105" : "z-20 opacity-90 hover:opacity-100"
                }`}
              >
                <RoyalFrame
                  item={item}
                  isHero={Boolean(layout.isHero)}
                  isSelected={isMiddle}
                  onClick={() => handlePhotoClick(idx)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Mobile Responsive Interactive Showcase (Mobile: < 640px) ───────── */}
      <div
        ref={mobileShowcaseRef}
        className="flex sm:hidden relative z-10 w-full h-full flex-col items-center justify-between pt-14 pb-20 px-3 overflow-y-auto select-none"
        onTouchStart={(e) => {
          touchStartX.current = e.targetTouches[0]?.clientX || 0;
        }}
        onTouchEnd={(e) => {
          const endX = e.changedTouches[0]?.clientX || 0;
          const diff = touchStartX.current - endX;
          if (diff > 40) {
            // Swiped left -> Next photo
            handleNextPhoto();
          } else if (diff < -40) {
            // Swiped right -> Previous photo
            handlePrevPhoto();
          }
        }}
      >
        {/* Main Active Hero Spotlight Frame with Nav Arrows */}
        <div className="relative w-full flex items-center justify-center my-auto">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrevPhoto}
            aria-label="Previous Photo"
            className="absolute left-0 z-30 w-8 h-8 rounded-full bg-[#1c1917]/90 border border-[#e9c349]/60 text-[#e9c349] flex items-center justify-center text-sm shadow-[0_4px_12px_rgba(0,0,0,0.8)] active:scale-95 transition-transform"
          >
            ‹
          </button>

          {/* Featured Center Frame */}
          <div className="w-[82vw] max-w-[310px]">
            {items[2] && (
              <RoyalFrame
                item={items[2]}
                isHero={true}
                isSelected={true}
                onClick={() => setFocusedItem(items[2] || null)}
              />
            )}
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNextPhoto}
            aria-label="Next Photo"
            className="absolute right-0 z-30 w-8 h-8 rounded-full bg-[#1c1917]/90 border border-[#e9c349]/60 text-[#e9c349] flex items-center justify-center text-sm shadow-[0_4px_12px_rgba(0,0,0,0.8)] active:scale-95 transition-transform"
          >
            ›
          </button>
        </div>

        {/* Horizontal Interactive Thumbnail Bar for 4 Side Photos */}
        <div className="w-full flex items-center justify-center gap-2 mt-2 px-1 z-20">
          {items.map((item, idx) => {
            const isCurrent = idx === 2;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handlePhotoClick(idx)}
                className={`relative rounded overflow-hidden border-2 transition-all duration-300 ${
                  isCurrent
                    ? "w-14 h-11 border-[#e9c349] shadow-[0_0_12px_rgba(233,195,73,0.6)] scale-105 z-10"
                    : "w-11 h-9 border-[#e9c349]/40 opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={item.image}
                  alt={item.caption}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Focused Photo Cinematic View Modal ─────────────────── */}
      {focusedItem && (
        <div
          onClick={() => setFocusedItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d0f07]/85 backdrop-blur-md px-4 py-8 transition-all duration-500 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-2xl w-full max-h-[85vh] flex flex-col items-center bg-[#1c1917] p-3 md:p-5 rounded-lg border-2 border-[#e9c349]/60 shadow-[0_20px_60px_rgba(0,0,0,0.9)] overflow-hidden"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setFocusedItem(null)}
              className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-[#0d0f07]/80 border border-[#e9c349]/40 text-[#e3e3d5] hover:text-[#e9c349] flex items-center justify-center text-sm cursor-pointer transition-colors"
            >
              ✕
            </button>

            {/* Focused Photograph */}
            <div className="relative w-full max-h-[62vh] overflow-hidden rounded bg-[#0d0f07] flex items-center justify-center">
              <img
                src={focusedItem.image}
                alt={focusedItem.caption}
                className="max-h-[62vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* Data-driven Caption & Date */}
            <div className="mt-4 text-center px-4">
              <h3 className="font-display text-lg md:text-xl text-[#e9c349] font-medium tracking-wide">
                {focusedItem.caption}
              </h3>
              {focusedItem.date && (
                <p className="mt-1 font-sans text-xs uppercase tracking-[0.25em] text-[#e3e3d5]/70">
                  {focusedItem.date} {focusedItem.location ? `• ${focusedItem.location}` : ""}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <AmbientLayer dust={8} petals={8} />
    </section>
  );
}
