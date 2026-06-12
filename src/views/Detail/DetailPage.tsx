"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { useDesign } from "@/hooks/useDesign";
import { useCategories } from "@/hooks/useCategory";
import type { Category } from "@/types/category";
import styles from "./DetailPage.module.css";

export function DetailPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  const { data: design, isError } = useDesign(id);
  const { data: categories = [] } = useCategories();

  if (isError) {
    return (
      <main className={`wrap ${styles.detail}`}>
        <button
          className={styles.backBtn}
          onClick={() => {
            router.push("/");
          }}
        >
          <ArrowLeft size={15} /> Back to gallery
        </button>
        <div className={styles.notFound}>This design no longer exists.</div>
      </main>
    );
  }

  if (!design) {
    return null;
  }

  const category = categories.find((c: Category) => { return c.id === design.category_id; });
  const paragraphs = String(design.description ?? "")
    .split("\n")
    .map((p: string) => { return p.trim(); })
    .filter(Boolean);

  return (
    <main className={`wrap ${styles.detail}`}>
      <button
        className={styles.backBtn}
        onClick={() => {
          router.push("/");
        }}
      >
        <ArrowLeft size={15} /> Back to gallery
      </button>

      <div className={styles.detailHead}>
        <p className={styles.detailCat}>{category?.name ?? "Uncategorized"}</p>
        <h1 className={styles.detailTitle}>{design.title}</h1>
      </div>

      <div className={styles.embedFrame}>
        {!loaded && (
          <div className={styles.embedLoading}>
            <span className={styles.spinner} />
            Loading viewer
          </div>
        )}
        <iframe
          src={design.embed_url}
          title={design.title}
          loading="lazy"
          allow="fullscreen; xr-spatial-tracking"
          allowFullScreen
          onLoad={() => {
            setLoaded(true);
          }}
        />
      </div>

      <div className={styles.embedBar}>
        <a className={styles.btnOpen} href={design.embed_url} target="_blank" rel="noreferrer">
          Open full viewer <ArrowUpRight size={14} />
        </a>
      </div>

      {paragraphs.length > 0 && (
        <div className={styles.prose}>
          {paragraphs.map((p: string, i: number) => {
            return <p key={i}>{p}</p>;
          })}
        </div>
      )}
    </main>
  );
}
