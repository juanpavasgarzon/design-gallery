import type { Metadata } from "next";
import db from "@/lib/db/database";
import type { Design } from "@/types/design";
import { DetailPage } from "@/views/Detail/DetailPage";

type Params = Promise<{ id: string }>;

function buildExcerpt(description: string | null): string {
  if (!description) {
    return "Explore this design through a live, interactive embedded viewer.";
  }
  const firstLine = description
    .split("\n")
    .map((line) => { return line.trim(); })
    .filter(Boolean)[0];
  if (!firstLine) {
    return "Explore this design through a live, interactive embedded viewer.";
  }
  return firstLine.length > 160 ? `${firstLine.slice(0, 157)}…` : firstLine;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const design = db.prepare("SELECT * FROM designs WHERE id = ?").get(id) as Design | undefined;

  if (!design) {
    return {
      title: "Design not found",
      description: "This design no longer exists.",
      robots: { index: false, follow: false },
    };
  }

  const description = buildExcerpt(design.description);

  return {
    title: design.title,
    description,
    alternates: {
      canonical: `/design/${design.id}`,
    },
    openGraph: {
      type: "article",
      title: design.title,
      description,
      url: `/design/${design.id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: design.title,
      description,
    },
  };
}

export default function Page() {
  return <DetailPage />;
}
