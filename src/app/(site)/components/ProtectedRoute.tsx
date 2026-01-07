"use client";

import { ReactNode } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { accessToken, user, loading, fetchCurrentUser, refresh } =
    useAuthStore();

  const init = async () => {
    if (!accessToken) {
      await refresh();
    }

    if (accessToken && !user) {
      await fetchCurrentUser();
    }
  };

  useEffect(() => {
    init();
  }, []);

  return children;
}
