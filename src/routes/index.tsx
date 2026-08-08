import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { WeddingExperience } from "@/wedding/WeddingExperience";

const searchSchema = z.object({
  chapter: z.string().optional(),
});

const TITLE = "Rohan × Ananya — A Rajasthani Wedding Invitation";
const DESCRIPTION =
  "Step through eleven royal scenes — curtains, jharokhas, a golden thread and a wish tree — and accept your invitation to Rohan and Ananya's Rajasthani wedding.";

export const Route = createFileRoute("/")({
  validateSearch: searchSchema,
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
  const { chapter } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  return (
    <WeddingExperience
      {...(chapter ? { initialChapter: chapter } : {})}
      onChapterChange={(id) =>
        navigate({ search: { chapter: id }, replace: true, resetScroll: false })
      }
    />
  );
}
