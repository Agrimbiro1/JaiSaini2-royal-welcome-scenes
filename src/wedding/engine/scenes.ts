import { lazy, type ComponentType } from "react";
import type { TransitionName } from "./transitions";
import { preloadImages } from "./preloader";

export type SceneId =
  | "welcome"
  | "couple"
  | "story"
  | "gallery"
  | "family"
  | "countdown"
  | "ceremonies"
  | "rsvp"
  | "blessings"
  | "thankyou";

const sceneLoaders: Record<SceneId, () => Promise<{ default: ComponentType }>> = {
  welcome: () => import("../scenes/WelcomeScene"),
  couple: () => import("../scenes/CoupleScene"),
  story: () => import("../scenes/StoryScene"),
  gallery: () => import("../scenes/GalleryScene"),
  family: () => import("../scenes/FamilyScene"),
  countdown: () => import("../scenes/CountdownScene"),
  ceremonies: () => import("../scenes/CeremoniesScene"),
  rsvp: () => import("../scenes/RsvpScene"),
  blessings: () => import("../scenes/BlessingsScene"),
  thankyou: () => import("../scenes/ThankYouScene"),
};

export type SceneDef = {
  id: string;
  label: string;
  chapterTitle: string;
  component: ComponentType;
  preload: () => void;
  /** transition used when moving from this scene to the next one */
  transitionOut: TransitionName;
  assets?: string[] | undefined;
};

function createScene(
  id: SceneId,
  label: string,
  chapterTitle: string,
  transitionOut: TransitionName,
  assets?: string[],
): SceneDef {
  const loader = sceneLoaders[id];
  const scene: SceneDef = {
    id,
    label,
    chapterTitle,
    component: lazy(loader),
    preload: () => {
      void loader();
      if (assets && assets.length > 0) {
        void preloadImages(assets);
      }
    },
    transitionOut,
  };
  if (assets) {
    scene.assets = assets;
  }
  return scene;
}

export const scenes: SceneDef[] = [
  createScene("welcome", "Welcome", "A Royal Welcome", "curtain", [
    "/assets/welcome-background.webp",
    "/assets/welcome-man.webp",
    "/assets/welcome-women.webp",
    "/assets/couple-frame.webp",
    "/assets/couple.webp",
    "/assets/palace-night.webp",
    "/assets/reel-mehendi.webp",
    "/assets/reel-jewellery.webp",
    "/assets/reel-marigold.webp",
    "/assets/reel-palace.webp",
  ]),
  createScene("couple", "The Couple", "The Royal Proclamation", "curtain", [
    "/assets/royal-scroll-table.webp",
    "/assets/couple-namaste.webp",
    "/assets/couple-frame.webp",
  ]),
  createScene("story", "Our Story", "A Story Written in Gold", "line-draw", [
    "/assets/rajasthan-vintage-map.webp",
    "/assets/prewedding-1.webp",
    "/assets/prewedding-2.webp",
    "/assets/prewedding-3.webp",
    "/assets/couple.webp",
  ]),
  createScene("gallery", "Gallery", "The Royal Memory Gallery", "thread", [
    "/assets/gallery-background-wall.webp",
    "/assets/prewedding-1.webp",
    "/assets/prewedding-2.webp",
    "/assets/prewedding-3.webp",
    "/assets/prewedding-4.webp",
    "/assets/palace-night.webp",
    "/assets/couple.webp",
  ]),
  createScene("family", "Family Tree", "Two Families, One Beginning", "light-sweep", [
    "/assets/family-tree-bg.webp",
    "/assets/family-card-frame.webp",
    "/assets/groom-family.webp",
    "/assets/bride-family.webp",
    "/assets/couple-namaste.webp",
    "/assets/family-father.webp",
    "/assets/family-mother.webp",
    "/assets/family-brother.webp",
    "/assets/family-bride.webp",
    "/assets/family-groom.webp",
  ]),
  createScene("countdown", "Countdown", "The Moment Draws Near", "jharokha", [
    "/assets/countdown-garden-background.webp",
  ]),
  createScene("ceremonies", "Ceremonies", "The Royal Celebration", "envelope", [
    "/assets/royal-palace-mandap.webp",
  ]),
  createScene("rsvp", "RSVP", "Will You Join Us?", "light-sweep", [
    "/assets/haveli-wall-bg.webp",
  ]),
  createScene("blessings", "Blessings", "The Wish Tree", "star", [
    "/assets/blessings-open-book-bg.webp",
    "/assets/mobile-blessings-bg.webp",
  ]),
  createScene("thankyou", "Thank You", "The Story Continues", "light-sweep", [
    "/assets/thankyou-night-palace.webp",
  ]),
];

export const totalScenes = scenes.length;

export function sceneIndexById(id: string | undefined): number {
  if (!id) return 0;
  const idx = scenes.findIndex((s) => s.id === id);
  return idx >= 0 ? idx : 0;
}

/**
 * Preload all scene chunks and their assets in advance
 */
export function preloadAllScenes(): void {
  scenes.forEach((s) => s.preload());
}

