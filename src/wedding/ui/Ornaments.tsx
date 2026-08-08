import type { SVGProps } from "react";

/** Ornate palace arch / jharokha outline. */
export function JharokhaArch(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 200 300" fill="none" aria-hidden="true" {...props}>
      <path
        d="M14 300V120C14 66 52 22 100 22s86 44 86 98v180"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M26 300V124c0-46 33-86 74-86s74 40 74 86v176"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.55"
      />
      <path d="M100 8v16M92 22h16" stroke="currentColor" strokeWidth="2" />
      <circle cx="100" cy="6" r="4" fill="currentColor" />
      <path
        d="M60 300V150c0-22 18-40 40-40s40 18 40 40v150"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.35"
      />
    </svg>
  );
}

/** Fine ornamental divider rule with a central lotus knot. */
export function Divider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 16"
      className={className}
      fill="none"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <path d="M0 8h96" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <path d="M144 8h96" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      <path
        d="M120 1c6 4 10 5 16 7-6 2-10 3-16 7-6-4-10-5-16-7 6-2 10-3 16-7Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="102" cy="8" r="1.6" fill="currentColor" />
      <circle cx="138" cy="8" r="1.6" fill="currentColor" />
    </svg>
  );
}

/** Small corner flourish, mirrored via CSS transforms at call sites. */
export function CornerFlourish(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" aria-hidden="true" {...props}>
      <path d="M2 2h24M2 2v24" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 8c14 0 24 10 24 24"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.6"
      />
      <circle cx="34" cy="34" r="2" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

/** Ornamental frame used to hold portraits and photographs. */
export function OrnateFrame({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute -inset-2 rounded-[999px_999px_10px_10px] border border-gold/45" />
      <div className="absolute -inset-[3px] rounded-[999px_999px_8px_8px] border-2 border-gold/70" />
      <div className="relative overflow-hidden rounded-[999px_999px_6px_6px] bg-maroon">
        {children}
      </div>
      <CornerFlourish className="absolute -left-3 -bottom-3 h-6 w-6 rotate-180 text-gold/70" />
      <CornerFlourish className="absolute -right-3 -bottom-3 h-6 w-6 -rotate-90 text-gold/70" />
    </div>
  );
}

/** Jaali lattice panel used as a subtle architectural backdrop. */
export function JaaliPanel({ className = "" }: { className?: string }) {
  return <div className={`bg-jaali pointer-events-none ${className}`} />;
}
