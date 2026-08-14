"use client";

import { useEffect } from "react";
import { Icon } from "@iconify/react";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Footer } from "@/components/layout/Footer/Footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Docivo Runtime Error]:", error);
  }, [error]);

  return (
    <main className="relative flex flex-col bg-surface-0 min-h-screen">
      <Navbar />

      <section className="relative flex-grow flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(239,68,68,0.08),transparent_32rem)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-surface-0),var(--color-surface-50))] pointer-events-none" />

        <div className="relative mx-auto px-6 py-20 max-w-xl text-center">
          <div className="inline-flex items-center justify-center bg-red-50 mb-6 rounded-full w-16 h-16">
            <Icon icon="solar:danger-circle-bold" width="32" className="text-red-600" />
          </div>

          <h1 className="mb-3 font-extrabold text-surface-900 text-3xl tracking-tight">
            Algo salió mal
          </h1>

          <p className="mb-8 text-surface-500 text-lg">
            Ocurrió un error inesperado. Por favor intenta de nuevo.
          </p>

          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 px-6 py-3 rounded-xl font-sans font-semibold text-white text-sm transition-colors cursor-pointer"
          >
            <Icon icon="solar:refresh-circle-bold" width="16" />
            Intentar de nuevo
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
