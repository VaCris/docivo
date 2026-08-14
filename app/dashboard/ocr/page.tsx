import React from "react";
import type { Metadata } from "next";
import { OcrTool } from "@/features/dashboard/components/OcrTool/OcrTool";

export const metadata: Metadata = {
  title: "OCR PDF — Docivo",
  description: "Convierte PDFs escaneados en documentos con texto buscable mediante reconocimiento óptico de caracteres.",
};

export default function OcrPage() {
    return (
        <div className="mx-auto max-w-6xl h-full">
            <OcrTool />
        </div>
    );
}