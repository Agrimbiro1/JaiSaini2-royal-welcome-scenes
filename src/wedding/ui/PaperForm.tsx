import React, { useState } from "react";

export function PaperForm({
  onSubmit,
  className = "",
}: {
  onSubmit: (blessing: { guestName: string; message: string }) => void;
  className?: string;
}) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("Please enter both your name and blessing.");
      return;
    }

    onSubmit({ guestName: name.trim(), message: message.trim() });
    setName("");
    setMessage("");
    setError("");
    setSubmitted(true);

    setTimeout(() => setSubmitted(false), 3500);
  };

  return (
    <div
      className={`relative bg-gradient-to-b from-[#fefce8] via-[#fef9c3] to-[#fef08a] text-[#451a03] p-5 sm:p-6 md:p-7 rounded-[4px] border-2 border-[#e9c349] shadow-[0_18px_45px_rgba(0,0,0,0.85),inset_0_0_18px_rgba(180,83,9,0.15)] flex flex-col select-none ${className}`}
    >
      {/* Paper Fiber Texture Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#b45309_0.5px,transparent_0.5px)] [background-size:10px_10px] opacity-[0.07] pointer-events-none" />

      {/* Filigree Corner Ornaments */}
      <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#b45309] rounded-tl-xs pointer-events-none" />
      <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#b45309] rounded-tr-xs pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#b45309] rounded-bl-xs pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#b45309] rounded-br-xs pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center">
        <span className="font-sans text-[9px] uppercase tracking-[0.3em] font-bold text-[#92400e]">
          Send Your Wishes
        </span>
        <h3 className="font-display text-lg sm:text-xl font-semibold text-[#451a03] tracking-wide mt-0.5">
          Leave a Blessing
        </h3>
        <div className="w-14 h-[1.5px] bg-gradient-to-r from-transparent via-[#ca8a04] to-transparent mx-auto mt-2 opacity-90" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="relative z-10 mt-4 flex flex-col gap-3.5">
        <div>
          <label className="block font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-[#92400e] mb-1">
            Your Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
            placeholder="e.g. Meera & Rajesh"
            className="w-full px-3.5 py-2.5 rounded-[3px] bg-[#fefce8]/95 border border-[#ca8a04]/80 text-[#451a03] font-sans text-xs focus:outline-none focus:border-[#78350f] focus:ring-2 focus:ring-[#78350f]/30 placeholder-[#a16207]/50 shadow-[inset_0_2px_4px_rgba(180,83,9,0.08)] transition-all"
          />
        </div>

        <div>
          <label className="block font-sans text-[10px] uppercase tracking-[0.2em] font-bold text-[#92400e] mb-1">
            Your Blessing Message
          </label>
          <textarea
            rows={3}
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setError("");
            }}
            placeholder="May your journey together be blessed with endless happiness..."
            className="w-full px-3.5 py-2.5 rounded-[3px] bg-[#fefce8]/95 border border-[#ca8a04]/80 text-[#451a03] font-sans text-xs focus:outline-none focus:border-[#78350f] focus:ring-2 focus:ring-[#78350f]/30 placeholder-[#a16207]/50 resize-none shadow-[inset_0_2px_4px_rgba(180,83,9,0.08)] transition-all"
          />
        </div>

        {error && <p className="text-xs text-[#b91c1c] text-center font-medium">{error}</p>}
        {submitted && (
          <p className="text-xs text-[#15803d] text-center font-semibold animate-in fade-in">
            ✦ Your blessing has been added to the wishbook!
          </p>
        )}

        <button
          type="submit"
          className="mt-1 group relative w-full py-3 rounded-[3px] bg-gradient-to-r from-[#ca8a04] via-[#fef08a] to-[#ca8a04] text-[#451a03] font-sans text-[11px] uppercase tracking-[0.28em] font-bold border border-[#78350f]/50 shadow-[0_5px_15px_rgba(202,138,4,0.4)] hover:shadow-[0_8px_22px_rgba(202,138,4,0.65)] hover:scale-[1.01] active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden"
        >
          <span className="relative z-10">Send Blessing ✦</span>
          <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
        </button>
      </form>
    </div>
  );
}
