import { createFileRoute } from "@tanstack/react-router";
import { WeddingExperience } from "@/wedding/WeddingExperience";

const TITLE = "Rohan & Ananya — A Rajasthani Wedding Invitation";
const DESCRIPTION =
  "Step through eleven royal scenes — curtains, jharokhas, a golden thread and a wish tree — and accept your invitation to Rohan and Ananya's Rajasthani wedding.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <WeddingExperience />;
}

