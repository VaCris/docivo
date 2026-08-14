import React from "react";
import type { Metadata } from "next";

import { RecentFiles } from "@/features/dashboard/components/RecentFiles/RecentFiles";

export const metadata: Metadata = {
  title: "Dashboard — Docivo",
  description: "Gestiona tus archivos PDF recientes y accede a las herramientas de Docivo.",
};

export default function DashboardOverviewPage() {
    return (
        <div className="mx-auto max-w-5xl">
            <h1 className="mb-8 font-extrabold text-surface-900 text-2xl md:text-3xl tracking-tight">
                Overview
            </h1>
            <RecentFiles />
        </div>
    );
}