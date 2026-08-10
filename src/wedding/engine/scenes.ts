import type { ComponentType } from "react";
import type { TransitionName } from "./transitions";

import WelcomeScene from "../scenes/WelcomeScene";
import StoryScene from "../scenes/StoryScene";
import GalleryScene from "../scenes/GalleryScene";
import FamilyScene from "../scenes/FamilyScene";
import CountdownScene from "../scenes/CountdownScene";
import CeremoniesScene from "../scenes/CeremoniesScene";
import RsvpScene from "../scenes/RsvpScene";
import BlessingsScene from "../scenes/BlessingsScene";
import ThankYouScene from "../scenes/ThankYouScene";

export type SceneDef = {
  id: string;
  label: string;
  chapterTitle: string;
  component: ComponentType;
  /** transition used when moving from this scene to the next one */
  transitionOut: TransitionName;
  assets?: string[];
};

export const scenes: SceneDef[] = [
  {
    id: "welcome",
    label: "Welcome",
    chapterTitle: "A Royal Welcome",
    component: WelcomeScene,
    transitionOut: "curtain",
  },
  {
    id: "story",
    label: "Our Story",
    chapterTitle: "A Story Written in Gold",
    component: StoryScene,
    transitionOut: "line-draw",
  },
  {
    id: "gallery",
    label: "Gallery",
    chapterTitle: "The Royal Memory Gallery",
    component: GalleryScene,
    transitionOut: "thread",
  },
  {
    id: "family",
    label: "Family Tree",
    chapterTitle: "Two Families, One Beginning",
    component: FamilyScene,
    transitionOut: "light-sweep",
  },
  {
    id: "countdown",
    label: "Countdown",
    chapterTitle: "The Moment Draws Near",
    component: CountdownScene,
    transitionOut: "jharokha",
  },
  {
    id: "ceremonies",
    label: "Ceremonies",
    chapterTitle: "The Royal Celebration",
    component: CeremoniesScene,
    transitionOut: "envelope",
  },
  {
    id: "rsvp",
    label: "RSVP",
    chapterTitle: "Will You Join Us?",
    component: RsvpScene,
    transitionOut: "light-sweep",
  },
  {
    id: "blessings",
    label: "Blessings",
    chapterTitle: "The Wish Tree",
    component: BlessingsScene,
    transitionOut: "star",
  },
  {
    id: "thankyou",
    label: "Thank You",
    chapterTitle: "The Story Continues",
    component: ThankYouScene,
    transitionOut: "light-sweep",
  },
];

export const totalScenes = scenes.length;

export function sceneIndexById(id: string | undefined): number {
  if (!id) return 0;
  const idx = scenes.findIndex((s) => s.id === id);
  return idx >= 0 ? idx : 0;
}
