import { lazy, type ComponentType } from "react";
import type { TransitionName } from "./transitions";

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
    },
    transitionOut,
  };
  if (assets) {
    scene.assets = assets;
  }
  return scene;
}

export const scenes: SceneDef[] = [
  createScene("welcome", "Welcome", "A Royal Welcome", "curtain"),
  createScene("couple", "The Couple", "The Royal Proclamation", "curtain"),
  createScene("story", "Our Story", "A Story Written in Gold", "line-draw"),
  createScene("gallery", "Gallery", "The Royal Memory Gallery", "thread"),
  createScene("family", "Family Tree", "Two Families, One Beginning", "light-sweep"),
  createScene("countdown", "Countdown", "The Moment Draws Near", "jharokha"),
  createScene("ceremonies", "Ceremonies", "The Royal Celebration", "envelope"),
  createScene("rsvp", "RSVP", "Will You Join Us?", "light-sweep"),
  createScene("blessings", "Blessings", "The Wish Tree", "star"),
  createScene("thankyou", "Thank You", "The Story Continues", "light-sweep"),
];

export const totalScenes = scenes.length;

export function sceneIndexById(id: string | undefined): number {
  if (!id) return 0;
  const idx = scenes.findIndex((s) => s.id === id);
  return idx >= 0 ? idx : 0;
}
