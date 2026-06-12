import type { Category } from "@/types/category";
import styles from "./CategoryFilters.module.css";

interface CategoryFiltersProps {
  categories: Category[];
  active: string;
  totalCount: number;
  countFor: (id: string) => number;
  filteredCount: number;
  onSelect: (id: string) => void;
}

export function CategoryFilters({
  categories,
  active,
  totalCount,
  countFor,
  filteredCount,
  onSelect,
}: CategoryFiltersProps) {
  return (
    <div className={styles.head}>
      <div className={styles.filters}>
        <button
          className={`${styles.pill} ${active === "all" ? styles.pillActive : ""}`}
          onClick={() => {
            onSelect("all");
          }}
        >
          All<span className={styles.count}>{totalCount}</span>
        </button>
        {categories.map((c) => {
          return (
            <button
              key={c.id}
              className={`${styles.pill} ${active === c.id ? styles.pillActive : ""}`}
              onClick={() => {
                onSelect(c.id);
              }}
            >
              {c.name}
              <span className={styles.count}>{countFor(c.id)}</span>
            </button>
          );
        })}
      </div>
      <span className={styles.resultCount}>
        {filteredCount} design{filteredCount !== 1 ? "s" : ""}
      </span>
    </div>
  );
}
