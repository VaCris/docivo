"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Footer } from "@/components/layout/Footer/Footer";
import { useLanguage } from "@/hooks/useLanguage";

export default function PrivacyPage() {
  const { t } = useLanguage();
  const strings = t.privacy;

  return (
    <main className="relative flex flex-col bg-white min-h-screen">
      <Navbar />

      <section className="relative flex-grow overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.08),transparent_32rem)] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#ffffff,#f8fafc)] pointer-events-none" />

        <div className="relative mx-auto px-6 pt-32 md:pt-40 pb-20 max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-8 font-semibold text-brand-600 hover:text-brand-700 text-sm transition-colors"
          >
            <Icon icon="solar:arrow-left-linear" width="16" />
            {strings.back}
          </Link>

          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-white shadow-sm mb-5 px-3 py-1 border border-surface-200 rounded-full">
              <Icon
                icon="solar:shield-check-linear"
                width="14"
                className="text-brand-600"
              />
              <span className="font-semibold text-surface-600 text-xs uppercase tracking-wide">
                {strings.badge}
              </span>
            </div>

            <h1 className="font-extrabold text-surface-900 text-4xl md:text-5xl tracking-tight">
              {strings.title}
            </h1>

            <p className="mt-4 text-surface-500 text-sm md:text-base">
              {strings.lastUpdated}
            </p>
          </div>

          <div className="bg-white/90 shadow-surface-200/40 shadow-xl backdrop-blur p-6 md:p-10 border border-surface-200 rounded-3xl">
            <div className="space-y-8">
              {strings.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="mb-3 font-bold text-surface-900 text-xl">
                    {section.title}
                  </h2>

                  <p className="text-surface-600 text-sm md:text-base leading-relaxed">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}