import React from "react";
import type { Metadata } from "next";
import { MergeTool } from "@/features/dashboard/components/MergeTool/MergeTool";

export const metadata: Metadata = {
  title: "Unir PDF — Docivo",
  description: "Combina múltiples archivos PDF en un solo documento de forma rápida y segura.",
};

export default function MergePage() {
    return (
        <div className="mx-auto max-w-6xl">
            <MergeTool />
        </div>
    );
}