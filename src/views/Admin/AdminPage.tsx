"use client";

import { useAuthContext } from "@/contexts/AuthContext";
import { LoginPage } from "./LoginPage";
import { AdminPanel } from "./AdminPanel";
import styles from "./AdminPage.module.css";

export function AdminPage() {
  const { authed, checking, login } = useAuthContext();

  if (checking) {
    return (
      <div className={styles.authLoader}>
        <span className={styles.spinner} />
      </div>
    );
  }

  if (!authed) {
    return <LoginPage onLogin={login} />;
  }

  return <AdminPanel />;
}
