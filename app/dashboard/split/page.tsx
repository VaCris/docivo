import React from "react";
import type { Metadata } from "next";
import { SplitTool } from "@/features/dashboard/components/SplitTool/SplitTool";

export const metadata: Metadata = {
  title: "Dividir PDF — Docivo",
  description: "Extrae páginas específicas de un PDF o divide documentos grandes en partes.",
};

export default function SplitPage() {
    return (
        <div className="mx-auto max-w-6xl h-full">
            <SplitTool />
        </div>
    );
}