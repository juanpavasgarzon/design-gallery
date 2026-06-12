"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { loginSchema } from "@/utils/loginSchema";
import type { LoginInput } from "@/utils/loginSchema";
import styles from "./LoginPage.module.css";

interface LoginPageProps {
  onLogin: (password: string) => Promise<boolean>;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [showPw, setShowPw] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginInput) => {
    const ok = await onLogin(data.password);
    if (!ok) {
      setError("password", { message: "Incorrect password. Try again." });
    }
  };

  return (
    <div className={styles.loginWrap}>
      <form className={styles.loginCard} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.lock}>
          <Lock size={20} />
        </div>
        <h2 className={styles.loginTitle}>Admin access</h2>
        <p className={styles.loginSub}>Enter the password to manage designs and categories.</p>

        <Field label="Password" error={errors.password?.message}>
          <div className={styles.pwWrap}>
            <Input
              {...register("password")}
              type={showPw ? "text" : "password"}
              invalid={!!errors.password}
              placeholder="••••••••"
              autoFocus
              style={{ paddingRight: 46 }}
            />
            <button
              type="button"
              className={styles.pwToggle}
              onClick={() => {
                setShowPw((s) => { return !s; });
              }}
              aria-label={showPw ? "Hide password" : "Show password"}
            >
              {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
            </button>
          </div>
        </Field>

        <Button
          variant="primary"
          type="submit"
          disabled={isSubmitting}
          style={{ width: "100%", justifyContent: "center" }}
        >
          Unlock
        </Button>
      </form>
    </div>
  );
}
