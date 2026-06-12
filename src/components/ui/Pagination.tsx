import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  pageSize?: number;
  onPage: (page: number) => void;
}

export function Pagination({ page, totalPages, total, pageSize = 15, onPage }: PaginationProps) {
  const disabled = totalPages <= 1;

  const pages: (number | "…")[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(1);
    if (page > 3) {
      pages.push("…");
    }
    for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
      pages.push(i);
    }
    if (page < totalPages - 2) {
      pages.push("…");
    }
    pages.push(totalPages);
  }

  return (
    <div className={`${styles.pagination} ${disabled ? styles.paginationDisabled : ""}`}>
      <span className={styles.info}>
        {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total}
      </span>

      <div className={styles.controls}>
        <button
          className={styles.arrow}
          disabled={disabled || page === 1}
          onClick={() => { onPage(page - 1); }}
          aria-label="Previous page"
        >
          <ChevronLeft size={15} />
        </button>

        {pages.map((p, i) => {
          if (p === "…") {
            return (
              <span key={`ellipsis-${i}`} className={styles.ellipsis}>
                …
              </span>
            );
          }
          return (
            <button
              key={p}
              className={`${styles.page} ${p === page ? styles.pageActive : ""}`}
              onClick={() => { onPage(p); }}
            >
              {p}
            </button>
          );
        })}

        <button
          className={styles.arrow}
          disabled={disabled || page === totalPages}
          onClick={() => { onPage(page + 1); }}
          aria-label="Next page"
        >
          <ChevronRight size={15} />
        </button>
      </div>
    </div>
  );
}
