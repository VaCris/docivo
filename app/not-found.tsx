"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Footer } from "@/components/layout/Footer/Footer";
import { useLanguage } from "@/hooks/useLanguage";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <main className="relative flex flex-col bg-surface-0 min-h-screen">
      <Navbar />

      <section className="relative flex-grow flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.08),transparent_32rem)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,var(--color-surface-0),var(--color-surface-50))] pointer-events-none" />

        <div className="relative mx-auto px-6 py-20 max-w-xl text-center">
          <div className="inline-flex items-center justify-center bg-brand-50 mb-6 rounded-full w-16 h-16">
            <Icon icon="solar:question-circle-bold" width="32" className="text-brand-600" />
          </div>

          <h1 className="mb-3 font-extrabold text-surface-900 text-6xl tracking-tight">
            404
          </h1>

          <p className="mb-8 text-surface-500 text-lg">
            {t.footer.notFound.message}
          </p>

          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 px-6 py-3 rounded-xl font-sans font-semibold text-white text-sm transition-colors"
          >
            <Icon icon="solar:arrow-left-linear" width="16" />
            {t.footer.notFound.back}
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
