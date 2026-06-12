"use client";

import { useRouter } from "next/navigation";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import type { Design } from "@/types/design";
import type { Category } from "@/types/category";
import styles from "./DesignRow.module.css";

interface DesignRowProps {
  design: Design;
  category: Category | undefined;
  onEdit: (design: Design) => void;
  onDelete: (id: string, name: string) => void;
}

export function DesignRow({ design, category, onEdit, onDelete }: DesignRowProps) {
  const router = useRouter();

  return (
    <div className={styles.row}>
      <div className={styles.rowMain}>
        <p className={styles.rowTitle}>{design.title}</p>
        <span className={styles.rowCat}>{category?.name ?? "Uncategorized"}</span>
      </div>
      <div className={styles.rowActions}>
        <IconButton
          title="View"
          onClick={() => {
            router.push(`/design/${design.id}`);
          }}
        >
          <Eye size={15} />
        </IconButton>
        <IconButton
          title="Edit"
          onClick={() => {
            onEdit(design);
          }}
        >
          <Pencil size={15} />
        </IconButton>
        <IconButton
          danger
          title="Delete"
          onClick={() => {
            onDelete(design.id, design.title);
          }}
        >
          <Trash2 size={15} />
        </IconButton>
      </div>
    </div>
  );
}
