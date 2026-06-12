import { X } from "lucide-react";
import type { Category } from "@/types/category";
import styles from "./CategoryChip.module.css";

interface CategoryChipProps {
  category: Category;
  onDelete: (id: string, name: string) => void;
}

export function CategoryChip({ category, onDelete }: CategoryChipProps) {
  return (
    <div className={styles.chip}>
      {category.name}
      <button
        className={styles.chipRemove}
        title="Delete category"
        onClick={() => {
          onDelete(category.id, category.name);
        }}
      >
        <X size={13} />
      </button>
    </div>
  );
}
