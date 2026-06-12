import api, { setToken, removeToken } from "./api";
import type { AuthToken, LoginPayload } from "@/types/auth";

export async function login(payload: LoginPayload): Promise<AuthToken> {
  const { data } = await api.post<AuthToken>("/auth/login", payload);
  setToken(data.token);
  return data;
}

export function logout(): void {
  removeToken();
}
