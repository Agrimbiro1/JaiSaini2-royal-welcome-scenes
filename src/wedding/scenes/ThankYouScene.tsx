import { wedding } from "../data/wedding";
import { useSceneEnter } from "../engine/useSceneEnter";
import { SceneShell } from "../ui/SceneShell";
import { Divider } from "../ui/Ornaments";
import { FilmGrain } from "../ui/Ambient";

export default function ThankYouScene() {
  const ref = useSceneEnter<HTMLDivElement>();
  const { message, signOff, background } = wedding.thankYou;

  return (
    <SceneShell tone="night">
      <img
        src={background}
        alt="Rajasthani palace at night"
        loading="lazy"
        width={1024}
        height={1024}
        className="absolute inset-0 h-full w-full object-cover opacity-80"
        style={{ animation: "light-breathe 18s ease-in-out infinite" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.17_0.06_265)]/70 via-transparent to-[oklch(0.15_0.05_265)]/92" />

      {/* Stars */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {Array.from({ length: 22 }, (_, i) => (
          <span
            key={i}
            className="absolute h-[2px] w-[2px] rounded-full bg-ivory"
            style={{
              left: `${(i * 41) % 96 + 2}%`,
              top: `${(i * 29) % 46 + 4}%`,
              animation: `twinkle ${2.5 + (i % 5) * 0.7}s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Lanterns */}
      <div className="pointer-events-none absolute inset-x-8 top-16 flex justify-between">
        {[0, 1].map((i) => (
          <span key={i} className="flex flex-col items-center">
            <span className="h-10 w-px bg-gold/40" />
            <span
              className="h-5 w-3 rounded-sm bg-gold-bright/85"
              style={{
                boxShadow: "0 0 16px 6px color-mix(in oklab, var(--gold) 45%, transparent)",
                animation: `flame-flicker ${2.4 + i * 0.6}s ease-in-out infinite`,
              }}
            />
          </span>
        ))}
      </div>

      <div
        ref={ref}
        className="relative z-10 flex h-full flex-col items-center justify-end px-8 pb-28 text-center"
      >
        <p
          className="font-sans text-[0.6rem] uppercase tracking-[0.45em] text-gold/80"
          data-enter
          data-enter-order={1}
        >
          ✦
        </p>
        <h2
          className="mt-3 font-display text-[2.4rem] font-light tracking-[0.16em] text-ivory"
          data-enter
          data-enter-order={2}
        >
          THANK YOU
        </h2>
        <Divider className="mt-4 h-3 w-40 text-gold/70" />
        <p
          className="mt-4 max-w-[18rem] font-display text-base italic leading-relaxed text-ivory/80"
          data-enter
          data-enter-order={3}
        >
          {message}
        </p>
        <p
          className="mt-6 font-script text-2xl text-gold-bright"
          data-enter
          data-enter-order={4}
        >
          {signOff},
        </p>
        <p
          className="mt-1 font-display text-xl tracking-[0.18em] text-ivory"
          data-enter
          data-enter-order={5}
        >
          {wedding.couple.groom.toUpperCase()} <span className="text-gold">×</span>{" "}
          {wedding.couple.bride.toUpperCase()}
        </p>
      </div>

      <FilmGrain />
    </SceneShell>
  );
}
