import React from "react";
import { Sidebar } from "@/components/layout/Sidebar/Sidebar";
import { LanguageProvider } from "@/hooks/useLanguage";
import { Toaster } from "sileo";
import "./dashboard.css";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <LanguageProvider>
            <div className="flex bg-surface-50 min-h-screen transition-colors">
                <Sidebar />

                <main className="flex-1 ml-64 p-8 md:p-10">
                    {children}

                    <Toaster
                        position="top-right"
                        offset={{
                            top: "clamp(16px, 2vw, 24px)",
                            right: "clamp(16px, 2vw, 24px)",
                        }}
                        options={{
                            fill: "var(--color-surface-0)",
                            roundness: 16,
                            styles: {
                                title: "text-surface-900! font-semibold",
                                description: "text-surface-500!",
                                badge: "bg-surface-100! text-surface-600! border border-surface-200!",
                                button:
                                    "bg-brand-600! text-white! hover:bg-brand-700! transition-colors!",
                            },
                        }}
                    />
                </main>
            </div>
        </LanguageProvider>
    );
}
