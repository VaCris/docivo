import React from "react";
import type { Metadata } from "next";
import { SettingsView } from "@/features/dashboard/components/SettingsView/SettingsView";

export const metadata: Metadata = {
  title: "Configuración — Docivo",
  description: "Administra la configuración de tu cuenta y preferencias de Docivo.",
};

export default function SettingsPage() {
    return (
        <div className="mx-auto max-w-6xl h-full">
            <SettingsView />
        </div>
    );
}