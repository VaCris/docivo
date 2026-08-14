import React from "react";

import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Footer } from "@/components/layout/Footer/Footer";

import { HeroSection } from "@/features/home/components/HeroSection/HeroSection";
import { ToolGrid } from "@/features/home/components/ToolGrid/ToolGrid";
import { HowItWorksSimple } from "@/features/home/components/HowItWorksSimple/HowItWorksSimple";
import { UseCases } from "@/features/home/components/UseCases/UseCases";
import { Testimonials } from "@/features/home/components/Testimonials/Testimonials";
import { FAQ } from "@/features/home/components/FAQ/FAQ";
import { CtaSection } from "@/features/home/components/CtaSection/CtaSection";

import { DropZone } from "@/features/files/components/DropZone/DropZone";

export default function HomePage() {
  return (
    <main id="main-content" className="relative flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow">
        <HeroSection />
        <ToolGrid />
        <HowItWorksSimple />
        <UseCases />
        <DropZone />
        <Testimonials />
        <FAQ />
        <CtaSection />
      </div>

      <Footer />
    </main>
  );
}