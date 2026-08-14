import React from "react";
import { Sidebar } from "@/components/layout/Sidebar/Sidebar";
import { LanguageProvider } from "@/hooks/useLanguage"
import { Toaster } from "sileo";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <LanguageProvider>
            <div className="flex bg-surface-50 min-h-screen">
                <Sidebar />

                <main className="flex-1 ml-64 p-8 md:p-10">
                    {children}

                    <Toaster
                        options={{
                            fill: "#FFFFFF",
                            roundness: 16,
                            styles: {
                                title: "text-slate-900! font-semibold",
                                description: "text-slate-500!",
                                badge: "bg-slate-100! text-slate-600! border border-slate-200/50!",
                                button:
                                    "bg-[#1E3A8A]! text-white! hover:bg-[#1E3A8A]/90! transition-colors!",
                            },
                        }}
                    />
                </main>
            </div>
        </LanguageProvider>
    );
}