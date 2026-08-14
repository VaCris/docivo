import type { Metadata } from "next";
import { LanguageProvider } from "@/hooks/useLanguage";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Docivo — Herramientas PDF simplificadas",
  description: "Procesamiento rápido y privado de archivos PDF. Une, divide, convierte y aplica OCR a tus documentos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
        <head>
          <Script
            src="/init-theme.js"
            strategy="beforeInteractive"
          />
        </head>
        <body suppressHydrationWarning className="antialiased">
        <LanguageProvider>
          <ThemeProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-brand-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2"
            >
              Skip to content
            </a>
            {children}
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
