import React, { useState } from "react";

export function AddBlessingModal({
  onSubmit,
  onClose,
}: {
  onSubmit: (blessing: { guestName: string; message: string }) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError("Please fill in both your name and blessing.");
      return;
    }
    onSubmit({ guestName: name.trim(), message: message.trim() });
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0d0f07]/85 backdrop-blur-md px-4 py-8 animate-in fade-in transition-all duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm sm:max-w-md bg-gradient-to-b from-[#fefce8] via-[#fef9c3] to-[#fef08a] text-[#451a03] p-6 sm:p-8 rounded-[4px] border-2 border-[#e9c349] shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col items-center select-none"
      >
        {/* Corner Ornaments */}
        <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#b45309] rounded-tl-xs pointer-events-none" />
        <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#b45309] rounded-tr-xs pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#b45309] rounded-bl-xs pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#b45309] rounded-br-xs pointer-events-none" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#451a03]/10 border border-[#b45309]/40 text-[#78350f] hover:text-[#451a03] flex items-center justify-center text-xs cursor-pointer transition-colors"
          aria-label="Close form"
        >
          ✕
        </button>

        {/* Header */}
        <h3 className="font-display text-lg sm:text-xl font-semibold text-[#451a03] tracking-wide text-center">
          Leave a Blessing
        </h3>
        <p className="mt-1 font-sans text-xs text-[#78350f] text-center">
          Your warm wishes become another golden light around Rohan & Ananya.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 w-full flex flex-col gap-3.5">
          <div>
            <label className="block font-sans text-[10px] uppercase tracking-[0.2em] font-semibold text-[#92400e] mb-1">
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
              className="w-full px-3.5 py-2 rounded bg-[#fefce8]/90 border border-[#ca8a04]/60 text-[#451a03] font-sans text-sm focus:outline-none focus:border-[#78350f] focus:ring-1 focus:ring-[#78350f] placeholder-[#a16207]/50"
            />
          </div>

          <div>
            <label className="block font-sans text-[10px] uppercase tracking-[0.2em] font-semibold text-[#92400e] mb-1">
              Write Your Blessing
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setError("");
              }}
              placeholder="May your journey be filled with everlasting joy..."
              className="w-full px-3.5 py-2 rounded bg-[#fefce8]/90 border border-[#ca8a04]/60 text-[#451a03] font-sans text-sm focus:outline-none focus:border-[#78350f] focus:ring-1 focus:ring-[#78350f] placeholder-[#a16207]/50 resize-none"
            />
          </div>

          {error && <p className="text-xs text-[#b91c1c] text-center">{error}</p>}

          <button
            type="submit"
            className="mt-2 group relative w-full py-2.5 rounded bg-gradient-to-r from-[#ca8a04] via-[#fef08a] to-[#ca8a04] text-[#451a03] font-sans text-xs uppercase tracking-[0.3em] font-bold shadow-[0_4px_15px_rgba(202,138,4,0.4)] hover:shadow-[0_6px_20px_rgba(202,138,4,0.6)] active:scale-95 transition-all cursor-pointer"
          >
            Send Blessing
          </button>
        </form>
      </div>
    </div>
  );
}
