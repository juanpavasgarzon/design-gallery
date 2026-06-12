import { InputHTMLAttributes, forwardRef } from "react";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ invalid, className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`${styles.input} ${invalid ? styles.invalid : ""} ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
