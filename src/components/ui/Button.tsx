import { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

export function Button({ variant = "ghost", className = "", children, ...props }: ButtonProps) {
  const variantClass = {
    primary: styles.primary,
    ghost: styles.ghost,
    danger: styles.danger,
  }[variant];

  return (
    <button className={`${styles.btn} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
