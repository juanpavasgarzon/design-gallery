"use client";

import { useState, useEffect, useCallback } from "react";
import { login as loginService, logout as logoutService } from "@/services/auth.service";
import { getToken } from "@/services/api";

export function useAuth() {
  const [authed, setAuthed] = useState<boolean>(false);
  const [checking, setChecking] = useState<boolean>(true);

  useEffect(() => {
    setAuthed(getToken() !== null);
    setChecking(false);
  }, []);

  const login = useCallback(async (password: string): Promise<boolean> => {
    try {
      await loginService({ password });
      setAuthed(true);
      return true;
    } catch {
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    logoutService();
    setAuthed(false);
  }, []);

  return { authed, checking, login, logout };
}
