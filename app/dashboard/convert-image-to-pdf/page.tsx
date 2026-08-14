import React from "react";
import type { Metadata } from "next";
import { ImageToPdfTool } from "@/features/dashboard/components/ImageToPdfTool/ImageToPdfTool";

export const metadata: Metadata = {
  title: "Imagen a PDF — Docivo",
  description: "Convierte imágenes JPG, PNG y WebP en documentos PDF de forma rápida y privada.",
};

export default function ConvertImageToPdfPage() {
    return (
        <div className="mx-auto max-w-6xl h-full">
            <ImageToPdfTool />
        </div>
    );
}