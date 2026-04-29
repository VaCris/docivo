import React from "react";

import { Navbar } from "@/components/layout/Navbar/Navbar";
import { Footer } from "@/components/layout/Footer/Footer";

import { HeroSection } from "@/features/home/components/HeroSection/HeroSection";
import { ToolGrid } from "@/features/home/components/ToolGrid/ToolGrid";
import { HowItWorksSection } from "@/features/home/components/HowItWorksSection/HowItWorksSection";
import { ArchitectureSection } from "@/features/home/components/ArchitectureSection/ArchitectureSection";
import { StepsSection } from "@/features/home/components/StepsSection/StepsSection";
import { CtaSection } from "@/features/home/components/CtaSection/CtaSection";

import { DropZone } from "@/features/files/components/DropZone/DropZone";

export default function HomePage() {
  return (
    <main className="relative flex flex-col min-h-screen">
      <Navbar />

      <div className="flex-grow">
        <HeroSection />
        <ToolGrid />
        <HowItWorksSection />
        <ArchitectureSection />
        <StepsSection />
        <DropZone />
        <CtaSection />
      </div>

      <Footer />
    </main>
  );
}