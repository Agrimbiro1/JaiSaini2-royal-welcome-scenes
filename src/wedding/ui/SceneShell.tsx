import type { ReactNode } from "react";
import { CornerFlourish } from "./Ornaments";

/**
 * Shared scene frame: fills the viewport, never scrolls, and carries the
 * royal architectural framing every scene sits inside.
 */
export function SceneShell({
  children,
  tone = "maroon",
  className = "",
}: {
  children: ReactNode;
  tone?: "maroon" | "ivory" | "night";
  className?: string;
}) {
  const bg =
    tone === "ivory"
      ? "bg-gradient-to-b from-ivory via-sandstone/60 to-sandstone"
      : tone === "night"
        ? "bg-[oklch(0.17_0.06_265)]"
        : "bg-gradient-to-b from-maroon-deep via-maroon to-maroon-deep";

  return (
    <section
      className={`relative h-full w-full overflow-hidden ${bg} ${className}`}
      aria-live="polite"
    >
      {children}
      <div className="pointer-events-none absolute inset-3 z-20 rounded-sm border border-gold/20" />
      <CornerFlourish className="pointer-events-none absolute left-3 top-3 z-20 h-6 w-6 text-gold/45" />
      <CornerFlourish className="pointer-events-none absolute right-3 top-3 z-20 h-6 w-6 rotate-90 text-gold/45" />
    </section>
  );
}

export function SceneTitle({
  kicker,
  title,
  order = 1,
  tone = "gold",
}: {
  kicker?: string;
  title: string;
  order?: number;
  tone?: "gold" | "dark";
}) {
  return (
    <div className="text-center" data-enter data-enter-order={order}>
      {kicker && (
        <p
          className={`font-sans text-[0.62rem] uppercase tracking-[0.42em] ${
            tone === "dark" ? "text-maroon/70" : "text-gold/75"
          }`}
        >
          {kicker}
        </p>
      )}
      <h2
        className={`mt-2 font-display text-3xl font-light leading-tight tracking-wide ${
          tone === "dark" ? "text-maroon" : "text-ivory"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
