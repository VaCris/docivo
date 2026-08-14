import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import { LanguageProvider } from "@/hooks/useLanguage";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import "./globals.css";

const interDisplay = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  style: ["normal", "italic"],
});

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
        <body suppressHydrationWarning className={`${interDisplay.className} ${instrumentSerif.className} antialiased`}>
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
