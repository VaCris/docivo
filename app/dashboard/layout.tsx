import React from "react";
import { Sidebar } from "@/components/layout/Sidebar/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div suppressHydrationWarning className="flex bg-surface-50 min-h-screen">
            <Sidebar />

            <main className="flex-1 ml-64 p-8 md:p-10">
                {children}
            </main>
        </div>
    );
}