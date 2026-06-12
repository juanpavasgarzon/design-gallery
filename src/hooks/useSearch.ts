"use client";

import { useState, useMemo } from "react";

interface Searchable {
  title: string;
  description?: string | null;
}

export function useSearch<T extends Searchable>(items: T[]) {
  const [query, setQuery] = useState<string>("");

  const results = useMemo<T[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return items;
    }
    return items.filter((item) => {
      const inTitle = item.title.toLowerCase().includes(q);
      const inDesc = (item.description ?? "").toLowerCase().includes(q);
      return inTitle || inDesc;
    });
  }, [items, query]);

  return { query, setQuery, results };
}
