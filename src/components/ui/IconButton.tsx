import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  danger?: boolean;
  children: ReactNode;
}

export function IconButton({ danger = false, className = "", children, ...props }: IconButtonProps) {
  return (
    <button
      className={`${styles.iconBtn} ${danger ? styles.iconBtnDanger : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
