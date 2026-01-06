"use client";

import DesktopSidebar from "./DesktopSidebar";
import MobileFooter from "./MobileFooter";
import { useAuthStore } from "@/stores/useAuthStore";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();

  return (
    <div className="h-full">
      <DesktopSidebar currentUser={user!} />
      <MobileFooter />
      <main className="lg:pl-20 h-full">{children}</main>
    </div>
  );
}
