import { SelectHTMLAttributes, forwardRef } from "react";
import styles from "./Input.module.css";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ invalid, className = "", children, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={`${styles.select} ${invalid ? styles.invalid : ""} ${className}`}
        {...props}
      >
        {children}
      </select>
    );
  }
);
Select.displayName = "Select";
