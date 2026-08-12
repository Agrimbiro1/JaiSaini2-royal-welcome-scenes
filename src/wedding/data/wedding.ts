import couplePhoto from "/assets/couple.jpg?url";
import palaceNight from "/assets/palace-night.jpg";
import prewedding1 from "/assets/prewedding-1.jpg";
import prewedding2 from "/assets/prewedding-2.jpg";
import prewedding3 from "/assets/prewedding-3.jpg";
import prewedding4 from "/assets/prewedding-4.jpg";


export type Milestone = {
  date: string;
  title: string;
  description: string;
  image?: string;
};

export type GalleryItem = {
  id: string;
  image: string;
  caption: string;
  date?: string;
  location?: string;
  isHero?: boolean;
  aspectRatio?: "portrait" | "landscape" | "square";
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
    groomFull?: string;
    brideFull?: string;
    groomParents?: string;
    brideParents?: string;
    tagline: string;
    subtitle: string;
    shloka?: string;
    shlokaTranslation?: string;
    royalAnnouncement?: string;
    weddingDate?: string;
    venue?: string;
    portrait: string;
    groomPortrait?: string;
    bridePortrait?: string;
  };
  welcome: {
    guestName: string;
    quote: string;
    message: string;
  };
  gallery: GalleryItem[];
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
    groomFull: "Rohan Singh Rathore",
    brideFull: "Ananya Kumari Shekhawat",
    groomParents: "Son of Thakur Vikram Singh & Thakurani Sunita Devi",
    brideParents: "Daughter of Thakur Rajendra Singh & Thakurani Gayatri Devi",
    tagline: "Glimpse of Our Forever",
    subtitle: "A Royal Rajasthani Wedding Celebration",
    shloka: "मङ्गलम् भगवान् विष्णुः, मङ्गलम् गरुडध्वजः। मङ्गलम् पुण्डरीकाक्षः, मङ्गलाय तनो हरिः॥",
    shlokaTranslation: "May divine blessings illuminate this sacred bond with eternal joy, prosperity, and togetherness.",
    royalAnnouncement: "By Royal Grace & Sacred Blessings, the Rathore & Shekhawat families joyfully announce the grand matrimony of their beloved children.",
    weddingDate: "28th November, 2026",
    venue: "Umaid Bhawan Palace Courtyard • Jodhpur, Rajasthan",
    portrait: couplePhoto,
  },
  welcome: {
    guestName: "Meera & Family",
    quote: "Padharo mhare desh — may our joy become yours.",
    message:
      "With hearts full of gratitude, we open this window of our home to you. Your presence would turn our celebration into a memory we keep forever.",
  },
  gallery: [
    {
      id: "pw-1",
      image: prewedding1,
      caption: "Udaipur Palace Terrace",
      date: "Sunset Memories",
      location: "Udaipur, Rajasthan",
      aspectRatio: "landscape",
    },
    {
      id: "pw-2",
      image: prewedding2,
      caption: "Haveli Courtyard Romance",
      date: "Golden Hour",
      location: "Haveli Courtyard",
      aspectRatio: "portrait",
    },
    {
      id: "hero",
      image: couplePhoto,
      caption: "Rohan & Ananya — Royal Portrait",
      date: "Pre-Wedding Shoot",
      location: "Palace Terrace",
      isHero: true,
      aspectRatio: "landscape",
    },
    {
      id: "pw-3",
      image: prewedding3,
      caption: "Lakeside Boat Sunset",
      date: "Dusk Reflections",
      location: "Lake Pichola",
      aspectRatio: "portrait",
    },
    {
      id: "pw-4",
      image: prewedding4,
      caption: "Golden Sand Dunes",
      date: "Desert Sunset",
      location: "Sam Sand Dunes, Jaisalmer",
      aspectRatio: "landscape",
    },
  ],


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
    { message: "Wishing you both a lifetime of happiness, warmth, and laughter.", guestName: "Priya & Family" },
    { message: "May your home always be filled with divine light and love.", guestName: "Arjun & Neha" },
    { message: "Two beautiful souls, one magnificent Rajasthani journey.", guestName: "Naina & Vikram" },
    { message: "May your togetherness grow sweeter with every passing year.", guestName: "Kavita Aunty" },
    { message: "May your bond be as everlasting and regal as royalty.", guestName: "Devraj Uncle" },
    { message: "Abundant blessings and endless joy for your new beginning.", guestName: "Meera & Rajesh" },
  ],

  thankYou: {
    message: "Thank you for being part of our story.",
    signOff: "With Love",
    background: palaceNight,
  },
};
