import couplePhoto from "/assets/couple.jpg?url";
import palaceNight from "@/assets/palace-night.jpg";

export type Milestone = {
  date: string;
  title: string;
  description: string;
  image?: string;
};

export type FamilyMember = {
  name: string;
  relation: string;
  side: "groom" | "bride";
  image?: string;
};

export type Ceremony = {
  id: string;
  name: string;
  date?: string;
  time?: string;
  venue?: string;
  dressCode?: string;
  mapUrl?: string;
};

export type Blessing = {
  message: string;
  guestName: string;
};

export type WeddingData = {
  couple: {
    groom: string;
    bride: string;
    tagline: string;
    subtitle: string;
    portrait: string;
    groomPortrait?: string;
    bridePortrait?: string;
  };
  welcome: {
    guestName: string;
    quote: string;
    message: string;
  };
  gallery: { image: string; caption?: string }[];
  story: Milestone[];
  family: FamilyMember[];
  countdown: {
    /** ISO date-time of the wedding muhurat */
    date: string;
    displayDate: string;
  };
  ceremonies: Ceremony[];
  rsvp: {
    label: string;
    confirmation: string;
    confirmationNote: string;
  };
  blessings: Blessing[];
  thankYou: {
    message: string;
    signOff: string;
    background: string;
  };
};

export const wedding: WeddingData = {
  couple: {
    groom: "Rohan",
    bride: "Ananya",
    tagline: "Glimpse of Our Forever",
    subtitle: "A Rajasthani Wedding Celebration",
    portrait: couplePhoto,
  },
  welcome: {
    guestName: "Meera & Family",
    quote: "Padharo mhare desh — may our joy become yours.",
    message:
      "With hearts full of gratitude, we open this window of our home to you. Your presence would turn our celebration into a memory we keep forever.",
  },
  gallery: [{ image: couplePhoto, caption: "Pre-Wedding" }],
  story: [
    {
      date: "2019",
      title: "The First Meeting",
      description: "And that is where our story quietly began.",
    },
    {
      date: "2021",
      title: "The First Journey",
      description: "Two cities, one long road, endless conversation.",
    },
    {
      date: "2024",
      title: "The Proposal",
      description: "A courtyard, a ring, and one certain yes.",
    },
  ],
  family: [
    { name: "Rajesh", relation: "Father", side: "groom" },
    { name: "Sunita", relation: "Mother", side: "groom" },
    { name: "Vikram", relation: "Father", side: "bride" },
    { name: "Kavita", relation: "Mother", side: "bride" },
  ],
  countdown: {
    date: "2026-12-04T19:30:00+05:30",
    displayDate: "4 December 2026",
  },
  ceremonies: [
    { id: "haldi", name: "Haldi", date: "2 Dec 2026", time: "10:00 AM" },
    { id: "mehendi", name: "Mehendi", date: "2 Dec 2026", time: "4:00 PM" },
    { id: "sangeet", name: "Sangeet", date: "3 Dec 2026", time: "7:00 PM" },
    { id: "wedding", name: "Wedding", date: "4 Dec 2026", time: "7:30 PM" },
    { id: "reception", name: "Reception", date: "5 Dec 2026", time: "8:00 PM" },
  ],
  rsvp: {
    label: "Accept Invitation",
    confirmation: "Invitation Accepted",
    confirmationNote: "We can't wait to celebrate with you.",
  },
  blessings: [
    { message: "Wishing you both a lifetime of happiness.", guestName: "Priya" },
    { message: "May your home always be full of light.", guestName: "Arjun" },
    { message: "Two beautiful souls, one beautiful journey.", guestName: "Naina" },
  ],
  thankYou: {
    message: "Thank you for being part of our story.",
    signOff: "With Love",
    background: palaceNight,
  },
};
