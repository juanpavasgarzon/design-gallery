"use client";

import { useState } from "react";
import { useDesigns } from "@/hooks/useDesign";
import { useCategories } from "@/hooks/useCategory";
import { usePagination } from "@/hooks/usePagination";
import { useSearch } from "@/hooks/useSearch";
import type { Design } from "@/types/design";
import type { Category } from "@/types/category";
import { GalleryHero } from "./GalleryHero";
import { DesignCard } from "./DesignCard";
import { Pagination } from "@/components/ui/Pagination";
import { SearchInput } from "@/components/ui/SearchInput";
import styles from "./GalleryPage.module.css";

export function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const { data: designs = [], isLoading: designsLoading } = useDesigns();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const isLoading = designsLoading || categoriesLoading;

  const catById = Object.fromEntries(
    categories.map((c: Category) => { return [c.id, c]; })
  );

  const byCategory =
    activeCategory === "all"
      ? designs
      : designs.filter((d: Design) => { return d.category_id === activeCategory; });

  const { query, setQuery, results: filtered } = useSearch(byCategory);
  const { page, totalPages, paged, goTo, reset, total } = usePagination(filtered);

  const handleSelectCategory = (value: string) => {
    setActiveCategory(value);
    reset();
  };

  const handleSearch = (value: string) => {
    setQuery(value);
    reset();
  };

  return (
    <>
      <GalleryHero />

      <main className="wrap">
        <div className={styles.filters}>
          <SearchInput
            value={query}
            onChange={handleSearch}
            placeholder="Search designs…"
          />
          <select
            className={styles.categorySelect}
            value={activeCategory}
            onChange={(e) => { handleSelectCategory(e.target.value); }}
          >
            <option value="all">All categories</option>
            {categories.map((c: Category) => {
              return (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              );
            })}
          </select>
        </div>

        {isLoading ? (
          <div className={styles.loaderWrap}>
            <span className={styles.spinner} />
          </div>
        ) : (
          <>
            <section className={styles.grid}>
              {paged.length === 0 ? (
                <div className={styles.empty}>
                  {query ? `No results for "${query}"` : "No designs in this category yet."}
                </div>
              ) : (
                paged.map((d: Design) => {
                  return (
                    <DesignCard
                      key={d.id}
                      design={d}
                      category={catById[d.category_id ?? ""]}
                    />
                  );
                })
              )}
            </section>

            <Pagination
              page={page}
              totalPages={totalPages}
              total={total}
              onPage={goTo}
            />
          </>
        )}
      </main>
    </>
  );
}
