import { ReactNode } from "react";
import styles from "./Input.module.css";

interface FieldProps {
  label: string;
  error?: string;
  children: ReactNode;
}

export function Field({ label, error, children }: FieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      {children}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
