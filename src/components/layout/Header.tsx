"use client";

import { useRouter, usePathname } from "next/navigation";
import { useAuthContext } from "@/contexts/AuthContext";
import styles from "./Header.module.css";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { authed, logout } = useAuthContext();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <nav className={styles.nav}>
      <div className={`wrap ${styles.inner}`}>
        <button
          className={styles.brand}
          onClick={() => {
            router.push("/");
          }}
        >
          Design Gallery
        </button>
        <div className={styles.links}>
          {authed && isAdmin ? (
            <button className={styles.adminLink} onClick={logout}>
              Logout
            </button>
          ) : (
            <button
              className={styles.adminLink}
              onClick={() => {
                router.push("/admin");
              }}
            >
              Admin
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
