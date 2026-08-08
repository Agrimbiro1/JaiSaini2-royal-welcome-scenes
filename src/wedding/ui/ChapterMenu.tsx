import { useScene } from "../engine/SceneProvider";
import { scenes } from "../engine/scenes";
import { Divider, JaaliPanel } from "./Ornaments";

export function ChapterMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { index, goTo } = useScene();

  return (
    <div
      className={`fixed inset-0 z-40 transition-opacity duration-300 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Chapters"
    >
      <button
        type="button"
        aria-label="Close chapters"
        onClick={onClose}
        className="absolute inset-0 bg-maroon-deep/96 backdrop-blur-sm"
      />
      <JaaliPanel className="absolute inset-0 opacity-[0.09]" />
      <div className="relative flex h-full flex-col justify-center px-8 py-16">
        <p className="text-center font-sans text-[0.6rem] uppercase tracking-[0.42em] text-gold/70">
          Chapters
        </p>
        <Divider className="mx-auto mt-3 h-3 w-40 text-gold/60" />
        <ul className="mt-6 max-h-[70svh] space-y-0.5 overflow-y-auto">
          {scenes.map((s, i) => {
            const current = i === index;
            return (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    goTo(i);
                  }}
                  className="flex min-h-12 w-full items-baseline gap-3 border-b border-gold/10 px-1 py-3 text-left"
                >
                  <span
                    className={`font-sans text-[0.62rem] tracking-[0.2em] ${
                      current ? "text-gold" : "text-ivory/40"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span
                      className={`block font-display text-lg leading-snug ${
                        current ? "text-gold-bright" : "text-ivory/85"
                      }`}
                    >
                      {s.label}
                    </span>
                    <span className="block font-sans text-[0.6rem] uppercase tracking-[0.2em] text-ivory/35">
                      {s.chapterTitle}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
