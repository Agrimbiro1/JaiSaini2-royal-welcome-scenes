import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "../engine/SceneProvider";
import { AmbientLayer, WarmGlow } from "../ui/Ambient";
import { Divider } from "../ui/Ornaments";

import rajasthanMapBg from "/assets/rajasthan-vintage-map.png";
import prewedding1 from "/assets/prewedding-1.jpg";
import prewedding2 from "/assets/prewedding-2.jpg";
import prewedding3 from "/assets/prewedding-3.jpg";
import couplePhoto from "/assets/couple.jpg";

interface StoryWaypoint {
  id: string;
  year: string;
  title: string;
  location: string;
  description: string;
  photo: string;
  x: number; // percentage X on full-screen map (0 - 100)
  y: number; // percentage Y on full-screen map (0 - 100)
}

// Staggered in a winding pattern across Rajasthan map
const storyNodes: StoryWaypoint[] = [
  {
    id: "node-1",
    year: "2019",
    title: "The First Meeting",
    location: "Udaipur Lake Pichola",
    description: "Beside the glistening waters of Lake Pichola, our paths crossed for the very first time. A single glance that sparked a lifetime of togetherness.",
    photo: prewedding3,
    x: 18,
    y: 28,
  },
  {
    id: "node-2",
    year: "2021",
    title: "The First Journey",
    location: "Jodhpur Blue City",
    description: "Two cities, one long scenic road, and endless hours of deep conversation beneath the blue city skies of Jodhpur.",
    photo: prewedding1,
    x: 38,
    y: 64,
  },
  {
    id: "node-3",
    year: "2024",
    title: "The Proposal",
    location: "Jaipur Amber Palace Terrace",
    description: "Under a blanket of royal stars atop Amber Fort, a ring was presented, a heart was pledged, and one joyous 'Yes!' echoed forever.",
    photo: prewedding2,
    x: 64,
    y: 32,
  },
  {
    id: "node-4",
    year: "2026",
    title: "The Royal Wedding",
    location: "The Palace Courtyard",
    description: "Two souls, two royal families, united in eternal matrimony before loved ones under the sacred mandap.",
    photo: couplePhoto,
    x: 82,
    y: 72,
  },
];

export default function StoryScene() {
  const reduced = usePrefersReducedMotion();
  const [selectedNode, setSelectedNode] = useState<StoryWaypoint | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const maskPathRef = useRef<SVGPathElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Compute responsive node coordinates matching user's diagram for mobile view:
  // Node 1 (top-left) -> Node 2 (top-right) -> Node 3 (bottom-left) -> Node 4 (bottom-right)
  const nodesToRender = storyNodes.map((n) => {
    if (isMobile) {
      if (n.id === "node-1") return { ...n, x: 24, y: 22 };
      if (n.id === "node-2") return { ...n, x: 76, y: 34 };
      if (n.id === "node-3") return { ...n, x: 24, y: 58 };
      if (n.id === "node-4") return { ...n, x: 76, y: 74 };
    }
    return n;
  });

  // SVG Bezier Wavy Curve path connecting nodes
  const n0 = nodesToRender[0]!;
  const n1 = nodesToRender[1]!;
  const n2 = nodesToRender[2]!;
  const n3 = nodesToRender[3]!;

  const pathD = isMobile
    ? `M ${n0.x} ${n0.y} C 40 24, 58 30, ${n1.x} ${n1.y} C 70 45, 30 45, ${n2.x} ${n2.y} C 42 60, 60 66, ${n3.x} ${n3.y}`
    : `M ${n0.x} ${n0.y} C 24 45, 30 60, ${n1.x} ${n1.y} C 48 68, 54 34, ${n2.x} ${n2.y} C 72 30, 76 56, ${n3.x} ${n3.y}`;

  // Cinematic Sequential Dotted Wavy Path Reveal & Photo Pop-In Animation
  useEffect(() => {
    if (reduced) return;

    const maskPath = maskPathRef.current;
    if (!maskPath) return;

    let length = 100;
    try {
      length = maskPath.getTotalLength();
    } catch {
      length = 100;
    }

    // Set up mask path stroke dash for revealing the dotted line
    gsap.set(maskPath, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    // Initially hide all 4 photo nodes
    nodeRefs.current.forEach((el) => {
      if (el) gsap.set(el, { scale: 0, opacity: 0 });
    });

    const tl = gsap.timeline({ delay: 0.3 });

    // Step 1: 1st Photo pops in
    if (nodeRefs.current[0]) {
      tl.to(nodeRefs.current[0], {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      });
    }

    // Step 2: Dotted wavy path draws from Node 1 to Node 2
    tl.to(maskPath, {
      strokeDashoffset: length * 0.67,
      duration: 0.8,
      ease: "power1.inOut",
    });

    // Step 3: 2nd Photo pops in
    if (nodeRefs.current[1]) {
      tl.to(nodeRefs.current[1], {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      });
    }

    // Step 4: Dotted wavy path draws from Node 2 to Node 3
    tl.to(maskPath, {
      strokeDashoffset: length * 0.33,
      duration: 0.8,
      ease: "power1.inOut",
    });

    // Step 5: 3rd Photo pops in
    if (nodeRefs.current[2]) {
      tl.to(nodeRefs.current[2], {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      });
    }

    // Step 6: Dotted wavy path draws from Node 3 to Node 4
    tl.to(maskPath, {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: "power1.inOut",
    });

    // Step 7: 4th Photo pops in
    if (nodeRefs.current[3]) {
      tl.to(nodeRefs.current[3], {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: "back.out(1.7)",
      });
    }

    return () => {
      tl.kill();
    };
  }, [isMobile, reduced, pathD]);

  return (
    <section className="story-fullscreen-root relative w-full h-[100svh] overflow-hidden select-none">
      <style>{`
        .story-fullscreen-root {
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

          font-family: 'Rajdhani', sans-serif;
          color: var(--ivory);
          isolation: isolate;
        }

        /* Full Screen Background Map */
        .fullscreen-map-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: contrast(1.08) saturate(1.15) brightness(0.85);
          transform: scale(1.02);
        }

        /* Zoom background significantly more on mobile so top printed text (MAPPA REGNI RAJASTHAN) is completely cropped out */
        @media (max-width: 640px) {
          .fullscreen-map-img {
            object-position: center 95%;
            transform: scale(1.95);
          }
        }

        .jaali-overlay {
          position: absolute; inset: 0; opacity: 0.08;
          background-image:
            linear-gradient(45deg, var(--gold) 1px, transparent 1px),
            linear-gradient(-45deg, var(--gold) 1px, transparent 1px);
          background-size: 34px 34px;
          pointer-events: none;
        }

        .map-vignette {
          position: absolute; inset: 0;
          background: radial-gradient(circle at 50% 50%, transparent 35%, rgba(44, 7, 20, 0.72) 85%, rgba(44, 7, 20, 0.95) 100%);
          pointer-events: none;
        }

        /* SVG Connecting Path Overlay across Fullscreen */
        .fullscreen-svg-overlay {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 10;
        }

        /* Vintage Cartography Dotted Wavy Line */
        .journey-path-dash {
          stroke: #1c0a02;
          stroke-width: 0.35;
          stroke-dasharray: 1 1;
          stroke-linecap: round;
          fill: none;
          opacity: 0.9;
        }

        /* Circle Photo Node */
        .circle-photo-node {
          position: absolute;
          transform: translate(-50%, -50%);
          z-index: 20;
          cursor: pointer;
          transition: box-shadow 0.35s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .circle-photo-node:hover {
          transform: translate(-50%, -55%) scale(1.08);
        }

        .circle-frame {
          position: relative;
          width: 114px;
          height: 114px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--gold-light), var(--gold), var(--maroon-mid));
          padding: 3.5px;
          box-shadow: 0 10px 22px rgba(0,0,0,0.85), 0 0 16px rgba(203,161,53,0.45);
          transition: box-shadow 0.35s ease;
        }

        @media (min-width: 640px) {
          .circle-frame {
            width: 136px;
            height: 136px;
            padding: 4.5px;
          }
        }
        @media (min-width: 1024px) {
          .circle-frame {
            width: 160px;
            height: 160px;
            padding: 5.5px;
          }
        }

        .circle-frame.selected {
          box-shadow: 0 0 0 4px var(--gold-light), 0 16px 36px rgba(0,0,0,0.9), 0 0 30px rgba(242,169,60,0.9);
          transform: scale(1.08);
        }

        .circle-inner-img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
          border: 1.5px solid var(--gold);
          background: #1c0a02;
        }

        .circle-inner-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .circle-photo-node:hover .circle-inner-img img {
          transform: scale(1.08);
        }

        .node-pill-label {
          margin-top: 5px;
          background: rgba(44, 7, 20, 0.92);
          backdrop-filter: blur(8px);
          border: 1px solid var(--gold);
          color: var(--gold-light);
          padding: 3px 11px;
          border-radius: 999px;
          font-family: 'Rajdhani', sans-serif;
          font-size: 10.5px;
          font-weight: 700;
          letter-spacing: 0.8px;
          white-space: nowrap;
          box-shadow: 0 6px 14px rgba(0,0,0,0.7);
        }

        @media (min-width: 640px) {
          .node-pill-label {
            margin-top: 10px;
            font-size: 13px;
            padding: 5px 16px;
            letter-spacing: 1.5px;
          }
        }

        /* Detail Modal Popup */
        .modal-detail-card {
          position: relative;
          z-index: 50;
          width: min(640px, 92vw);
          background: linear-gradient(180deg, var(--ivory), #F5E7CC);
          color: var(--ink);
          border-radius: 16px;
          padding: 20px 22px;
          border: 2px solid var(--gold);
          box-shadow: 0 25px 65px rgba(0,0,0,0.92), 0 0 30px rgba(203,161,53,0.35);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        @media (prefers-reduced-motion: reduce) {
          .journey-path-dash { animation: none !important; }
          .circle-photo-node { transition: none !important; }
        }
      `}</style>

      {/* Full-Screen Vintage Rajasthani Map Image */}
      <img
        src={rajasthanMapBg}
        alt="Vintage Rajasthani Map Fullscreen"
        className="fullscreen-map-img"
      />
      <div className="jaali-overlay" aria-hidden="true" />
      <div className="map-vignette" aria-hidden="true" />
      <WarmGlow className="left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none" />

      {/* Header Overlay at Top Center */}
      <div className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-center px-4 pointer-events-none w-full max-w-xl">
        <span className="font-sans text-[9.5px] sm:text-[11.5px] uppercase tracking-[0.3em] sm:tracking-[0.35em] text-[#EAD59A] font-bold drop-shadow-md">
          Chapter Three • Our Journey
        </span>
        <h1 className="font-['Cormorant_Garamond',serif] italic font-semibold text-xl sm:text-4xl text-[#EAD59A] tracking-wide drop-shadow-lg mt-0.5">
          A Story Written in Gold
        </h1>
        <Divider className="mt-1.5 sm:mt-2 h-2 sm:h-2.5 w-28 sm:w-40 text-[#CBA135]" />
      </div>

      {/* SVG Wavy Path Overlay across Fullscreen (Masked for Sequential Reveal of Dotted Wavy Path) */}
      <svg className="fullscreen-svg-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <mask id="story-dotted-path-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="100" height="100">
            <path
              ref={maskPathRef}
              d={pathD}
              fill="none"
              stroke="white"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </mask>
        </defs>

        {/* Visible Dotted Wavy Cartography Path */}
        <path
          d={pathD}
          className="journey-path-dash"
          mask="url(#story-dotted-path-mask)"
        />
      </svg>

      {/* 4 Staggered Wavy Circular Photo Nodes */}
      {nodesToRender.map((node, idx) => {
        const isSelected = selectedNode?.id === node.id;
        return (
          <div
            key={node.id}
            ref={(el) => {
              nodeRefs.current[idx] = el;
            }}
            className="circle-photo-node"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            onClick={() => setSelectedNode(node)}
          >
            <div className={`circle-frame ${isSelected ? "selected" : ""}`}>
              <div className="circle-inner-img">
                <img src={node.photo} alt={node.title} />
              </div>
            </div>

            <div className="node-pill-label">
              {node.year} • {node.title}
            </div>
          </div>
        );
      })}

      {/* Selected Milestone Detail Pop-Up Modal */}
      {selectedNode && (
        <div
          onClick={() => setSelectedNode(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#2C0714]/80 backdrop-blur-md px-4 py-8 animate-in fade-in transition-all duration-300 select-none"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="modal-detail-card animate-in zoom-in-95 duration-300"
          >
            {/* Filigree Corner Accents */}
            <div className="absolute top-2.5 left-2.5 w-3.5 h-3.5 border-t-2 border-l-2 border-[#0F6B62] rounded-tl-xs pointer-events-none" />
            <div className="absolute top-2.5 right-2.5 w-3.5 h-3.5 border-t-2 border-r-2 border-[#0F6B62] rounded-tr-xs pointer-events-none" />
            <div className="absolute bottom-2.5 left-2.5 w-3.5 h-3.5 border-b-2 border-l-2 border-[#0F6B62] rounded-bl-xs pointer-events-none" />
            <div className="absolute bottom-2.5 right-2.5 w-3.5 h-3.5 border-b-2 border-r-2 border-[#0F6B62] rounded-br-xs pointer-events-none" />

            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedNode(null)}
              className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-[#331019]/10 border border-[#0F6B62]/40 text-[#6E1B34] hover:text-[#331019] hover:bg-[#331019]/20 flex items-center justify-center text-xs cursor-pointer transition-colors font-bold"
              aria-label="Close detail card"
            >
              ✕
            </button>

            {/* Header info */}
            <span className="font-sans text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#0F6B62] mb-1">
              {selectedNode.year} • {selectedNode.location}
            </span>

            <h2 className="font-['Cormorant_Garamond',serif] text-xl sm:text-3xl font-semibold text-[#430E1F] tracking-wide mb-2 sm:mb-3">
              {selectedNode.title}
            </h2>

            {/* Photo inside Modal */}
            <div className="w-full max-w-md h-52 sm:h-64 rounded-xl overflow-hidden border-2 border-[#CBA135] shadow-lg mb-3 sm:mb-4">
              <img src={selectedNode.photo} alt={selectedNode.title} className="w-full h-full object-cover" />
            </div>

            {/* Description Quote */}
            <p className="font-['Cormorant_Garamond',serif] italic text-xs sm:text-lg text-[#331019] leading-relaxed mb-3 sm:mb-4 px-2">
              "{selectedNode.description}"
            </p>

            {/* Next/Prev Navigation inside Modal */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
              {storyNodes.map((n) => (
                <button
                  key={n.id}
                  type="button"
                  onClick={() => setSelectedNode(n)}
                  className={`px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold font-sans tracking-wider transition-all ${
                    n.id === selectedNode.id
                      ? "bg-[#6E1B34] text-[#EAD59A] border border-[#CBA135]"
                      : "bg-[#0F6B62]/15 text-[#331019] hover:bg-[#0F6B62]/30"
                  }`}
                >
                  {n.year}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <AmbientLayer dust={7} petals={8} />
    </section>
  );
}
