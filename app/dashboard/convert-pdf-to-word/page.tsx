import React from "react";
import type { Metadata } from "next";
import { PdfToWordTool } from "@/features/dashboard/components/PdfToWordTool/PdfToWordTool";

export const metadata: Metadata = {
  title: "PDF a Word — Docivo",
  description: "Convierte archivos PDF en documentos Word editables conservando formato y estructura.",
};

export default function ConvertPdfToWordPage() {
    return (
        <div className="mx-auto max-w-6xl h-full">
            <PdfToWordTool />
        </div>
    );
}