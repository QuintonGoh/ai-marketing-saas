import { Sidebar } from "@/components/sidebar";
import type { ReactNode } from "react";

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-mist md:flex">
      <Sidebar />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-5 py-6 md:px-8 md:py-8">{children}</div>
      </main>
    </div>
  );
}
