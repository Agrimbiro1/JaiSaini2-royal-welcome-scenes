import type { ComponentType } from "react";
import type { TransitionName } from "./transitions";

import OpeningScene from "../scenes/OpeningScene";
import WelcomeScene from "../scenes/WelcomeScene";
import CoupleScene from "../scenes/CoupleScene";
import GalleryScene from "../scenes/GalleryScene";
import StoryScene from "../scenes/StoryScene";
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
    id: "opening",
    label: "Opening",
    chapterTitle: "Glimpse of Our Forever",
    component: OpeningScene,
    transitionOut: "light-sweep",

  },
  {
    id: "welcome",
    label: "Welcome",
    chapterTitle: "A Royal Welcome",
    component: WelcomeScene,
    transitionOut: "curtain",
  },
  {
    id: "couple",
    label: "Couple",
    chapterTitle: "The Royal Pair",
    component: CoupleScene,
    transitionOut: "light-sweep",
  },
  {
    id: "gallery",
    label: "Gallery",
    chapterTitle: "The Royal Memory Gallery",
    component: GalleryScene,
    transitionOut: "thread",
  },
  {
    id: "story",
    label: "Our Story",
    chapterTitle: "A Story Written in Gold",
    component: StoryScene,
    transitionOut: "line-draw",
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
  const i = scenes.findIndex((s) => s.id === id);
  return i < 0 ? 0 : i;
}
