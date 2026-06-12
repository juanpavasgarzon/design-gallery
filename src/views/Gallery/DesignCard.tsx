"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import type { Design } from "@/types/design";
import type { Category } from "@/types/category";
import styles from "./DesignCard.module.css";

interface DesignCardProps {
  design: Design;
  category: Category | undefined;
}

export function DesignCard({ design, category }: DesignCardProps) {
  const router = useRouter();
  const preview =
    (design.description ?? "")
      .split("\n")
      .map((s: string) => { return s.trim(); })
      .filter(Boolean)[0] ?? "";

  return (
    <article
      className={styles.card}
      onClick={() => {
        router.push(`/design/${design.id}`);
      }}
    >
      <div className={styles.body}>
        <span className={styles.cat}>{category?.name ?? "Uncategorized"}</span>
        <h3 className={styles.title}>{design.title}</h3>
        {preview && <p className={styles.excerpt}>{preview}</p>}
        <div className={styles.foot}>
          View design <ArrowRight size={14} />
        </div>
      </div>
    </article>
  );
}
