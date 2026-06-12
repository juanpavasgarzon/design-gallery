import { TextareaHTMLAttributes, forwardRef } from "react";
import styles from "./Input.module.css";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ invalid, className = "", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`${styles.textarea} ${invalid ? styles.invalid : ""} ${className}`}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";
