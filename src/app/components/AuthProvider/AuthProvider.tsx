"use client";

import { ReactNode } from "react";
import { useAuthStore } from "@/stores/useAuthStore";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const { user, loading, fetchCurrentUser } = useAuthStore();
  const router = useRouter();

  const init = async () => {
    if (!user) {
      await fetchCurrentUser();
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (!loading && user) {
      router.push("/users");
    }
  }, [user, loading, router]);

  return children;
}
