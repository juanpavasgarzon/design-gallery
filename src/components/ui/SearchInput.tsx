import { Search, X } from "lucide-react";
import styles from "./SearchInput.module.css";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({ value, onChange, placeholder = "Search…" }: SearchInputProps) {
  return (
    <div className={styles.wrap}>
      <Search size={14} className={styles.icon} />
      <input
        type="text"
        className={styles.input}
        value={value}
        onChange={(e) => { onChange(e.target.value); }}
        placeholder={placeholder}
      />
      {value && (
        <button
          type="button"
          className={styles.clear}
          onClick={() => { onChange(""); }}
          aria-label="Clear search"
        >
          <X size={13} />
        </button>
      )}
    </div>
  );
}
