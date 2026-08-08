import { useState } from "react";
import { wedding } from "../data/wedding";
import { useSceneEnter } from "../engine/useSceneEnter";
import { SceneShell } from "../ui/SceneShell";
import { Divider, JaaliPanel, JharokhaArch } from "../ui/Ornaments";
import { AmbientLayer, WarmGlow } from "../ui/Ambient";

export default function WelcomeScene() {
  const ref = useSceneEnter<HTMLDivElement>();
  const [focused, setFocused] = useState(false);
  const { guestName, quote, message } = wedding.welcome;

  return (
    <SceneShell>
      <JaaliPanel className="absolute inset-0 opacity-[0.07]" />
      <WarmGlow className="left-1/2 top-[26%] h-64 w-64 -translate-x-1/2 opacity-45" />

      <div
        ref={ref}
        className="relative z-10 flex h-full flex-col items-center justify-center px-7 pb-24 pt-20"
      >
        <div
          className="relative w-[62%] max-w-[15rem]"
          data-enter
          data-enter-order={1}
          onClick={() => setFocused((f) => !f)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setFocused((f) => !f)}
        >
          <JharokhaArch className="absolute -inset-x-4 -top-6 bottom-0 h-[calc(100%+1.5rem)] w-[calc(100%+2rem)] text-gold/70" />
          <div
            className={`relative mt-2 overflow-hidden rounded-t-[999px] border border-gold/40 transition-transform duration-500 ${
              focused ? "scale-[1.04]" : "scale-100"
            }`}
          >
            <img
              src={wedding.couple.portrait}
              alt={`${wedding.couple.groom} and ${wedding.couple.bride}`}
              width={768}
              height={1024}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/55 to-transparent" />
          </div>
        </div>

        <p
          className="mt-7 font-display text-2xl tracking-wide text-ivory"
          data-enter
          data-enter-order={2}
        >
          Dear {guestName}
        </p>
        <Divider className="mt-3 h-3 w-32 text-gold/70" />
        <p
          className="mt-4 max-w-[19rem] text-center font-display text-base italic leading-relaxed text-gold-bright/90"
          data-enter
          data-enter-order={3}
        >
          “{quote}”
        </p>
        <p
          className="mt-4 max-w-[20rem] text-center font-sans text-[0.78rem] leading-relaxed text-ivory/70"
          data-enter
          data-enter-order={4}
        >
          {message}
        </p>
      </div>

      <AmbientLayer dust={9} petals={3} />
    </SceneShell>
  );
}
