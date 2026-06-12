"use client";

import { useState } from "react";

export function usePagination<T>(items: T[], pageSize: number = 15) {
  const [page, setPage] = useState<number>(1);

  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const paged = items.slice(start, start + pageSize);

  const goTo = (p: number) => {
    setPage(Math.max(1, Math.min(p, totalPages)));
  };

  const reset = () => {
    setPage(1);
  };

  return { page: safePage, totalPages, paged, goTo, reset, total: items.length };
}
