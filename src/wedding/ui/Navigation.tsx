import { useState } from "react";
import { useScene } from "../engine/SceneProvider";
import { scenes } from "../engine/scenes";
import { Menu, X, ChevronLeft, ChevronRight } from "lucide-react";

export function Navigation({ onOpenChapters }: { onOpenChapters?: () => void }) {
  const { index, prev, next, goTo, goPrev, goNext, isAnimating } = useScene();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((v) => !v);
  };

  const handleSelectScene = (i: number) => {
    goTo(i);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* NO TOP HEADER - Removed ROHAN x ANANYA & 03 / 10 top header completely */}

      {/* Backdrop overlay for Mobile Menu Dialog Box */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs transition-opacity duration-300 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Popup Dialog Box (Positioned Just Above Bottom Navbar) */}
      {mobileMenuOpen && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 w-[92vw] max-w-sm rounded-2xl bg-[#1a0c10]/95 border-2 border-[#e9c349]/70 backdrop-blur-xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.9)] animate-in slide-in-from-bottom-4 duration-300 md:hidden select-none">
          {/* Dialog Header */}
          <div className="flex items-center justify-between pb-2.5 border-b border-[#e9c349]/25">
            <div className="flex items-center gap-2">
              <span className="text-[#e9c349] text-xs">✦</span>
              <span className="font-sans text-[11px] uppercase tracking-[0.25em] font-semibold text-[#e9c349]">
                Select Scene
              </span>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="w-6 h-6 rounded-full bg-[#e9c349]/15 text-[#e9c349] hover:bg-[#e9c349]/30 flex items-center justify-center text-xs transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Dialog Scenes Grid */}
          <div className="mt-3 grid grid-cols-2 gap-2 max-h-[60vh] overflow-y-auto pr-1">
            {scenes.map((s, i) => {
              const isActive = i === index;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => handleSelectScene(i)}
                  disabled={isAnimating}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer border ${
                    isActive
                      ? "bg-gradient-to-r from-[#e9c349] to-[#f7e08b] text-[#12140c] border-[#e9c349] font-bold shadow-[0_0_15px_rgba(233,195,73,0.4)]"
                      : "bg-[#12140c]/80 text-[#e3e3d5]/80 border-[#e9c349]/20 hover:border-[#e9c349]/50 hover:bg-[#e9c349]/10"
                  }`}
                >
                  <span className={`text-[10px] font-mono ${isActive ? "text-[#12140c]" : "text-[#e9c349]"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[12px] font-sans truncate font-medium">
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom Floating Navigation Bar */}
      <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex items-center justify-between gap-2 max-w-[95vw] px-2.5 py-1.5 rounded-full bg-[#12140c]/90 border border-[#e9c349]/40 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.85)] select-none">
        {/* Previous Button (←) */}
        <button
          type="button"
          onClick={goPrev}
          disabled={!prev || isAnimating}
          aria-label="Previous chapter"
          className="flex items-center justify-center w-8 h-8 rounded-full bg-[#e9c349]/15 hover:bg-[#e9c349]/30 text-[#e9c349] disabled:opacity-30 disabled:pointer-events-none transition-all shrink-0 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* DESKTOP VIEW: Horizontal Section Pills Scroll */}
        <div className="hidden md:flex items-center gap-1.5 overflow-x-auto scrollbar-none px-1 py-0.5 max-w-[75vw]">
          {scenes.map((s, i) => {
            const isActive = i === index;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => goTo(i)}
                disabled={isAnimating}
                className={`px-3 py-1 text-[12px] font-sans rounded-full whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-gradient-to-r from-[#e9c349] to-[#f7e08b] text-[#12140c] font-semibold shadow-[0_0_14px_rgba(233,195,73,0.5)] scale-105"
                    : "text-[#e3e3d5]/70 hover:text-[#e9c349] hover:bg-[#e9c349]/10"
                }`}
              >
                {i + 1}. {s.label}
              </button>
            );
          })}
        </div>

        {/* MOBILE VIEW: Center "Menu" Button */}
        <button
          type="button"
          onClick={toggleMobileMenu}
          className="flex md:hidden items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#e9c349]/20 to-[#e9c349]/30 hover:bg-[#e9c349]/35 border border-[#e9c349]/60 text-[#e9c349] font-sans text-[12px] uppercase tracking-[0.2em] font-semibold transition-all cursor-pointer shadow-[0_0_12px_rgba(233,195,73,0.2)]"
        >
          <Menu className="w-3.5 h-3.5" />
          <span>Menu</span>
        </button>

        {/* Next Button (→) */}
        <button
          type="button"
          onClick={goNext}
          disabled={!next || isAnimating}
          aria-label="Next chapter"
          className="flex items-center justify-center w-8 h-8 rounded-full bg-[#e9c349]/15 hover:bg-[#e9c349]/30 text-[#e9c349] disabled:opacity-30 disabled:pointer-events-none transition-all shrink-0 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </nav>
    </>
  );
}
