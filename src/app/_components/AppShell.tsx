"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AuthProvider, useAuthContext } from "@/contexts/AuthContext";

function Shell({ children }: { children: React.ReactNode }) {
  const { authed } = useAuthContext();
  const pathname = usePathname();
  const showFooter = !pathname.startsWith("/admin") || authed;

  return (
    <div className="app">
      <Header />
      {children}
      {showFooter && <Footer />}
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: { staleTime: 1000 * 60, retry: 1 },
      },
    });
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Shell>{children}</Shell>
      </AuthProvider>
    </QueryClientProvider>
  );
}
