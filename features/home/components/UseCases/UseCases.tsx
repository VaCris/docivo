"use client";

import { Icon } from "@iconify/react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./UseCases.module.css";

const USE_CASES = [
  { icon: "solar:pen-bold-duotone", title: "Designers", desc: "Merge portfolio PDFs, convert mockup images, extract pages from presentations." },
  { icon: "solar:code-bold-duotone", title: "Developers", desc: "Combine documentation, split large reports, OCR scanned specs and receipts." },
  { icon: "solar:chat-round-dots-bold-duotone", title: "Content & Marketing", desc: "Merge campaign decks, convert research screenshots, organize pitch decks." },
  { icon: "solar:phone-bold-duotone", title: "Sales & Support", desc: "Combine contracts, split invoices, OCR signed documents for quick search." },
  { icon: "solar:lightbulb-bold-duotone", title: "Founders & Ops", desc: "Organize investor docs, merge reports, convert meeting notes to PDF." },
  { icon: "solar:heart-bold-duotone", title: "Personal Use", desc: "Merge recipes, split boarding passes, OCR handwritten notes and receipts." },
];

export const UseCases = () => {
  const [titleRef, titleRevealed] = useScrollReveal<HTMLDivElement>();

  return (
    <section className={styles.section}>
      <div className="mx-auto max-w-7xl">
        <div
          ref={titleRef}
          className={`mb-16 flex flex-col items-center text-center scroll-reveal ${titleRevealed ? "revealed" : ""}`}
        >
          <h2 className={styles.title}>Built for everything you process</h2>
          <p className={styles.subtitle}>
            From design assets to legal docs, Docivo keeps every workflow simple.
          </p>
        </div>

        <div className={styles.chips}>
          {USE_CASES.map((useCase, index) => (
            <Chip key={useCase.title} useCase={useCase} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Chip = ({ useCase, index }: { useCase: typeof USE_CASES[number]; index: number }) => {
  const [ref, revealed] = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`${styles.chip} glass-hover scroll-reveal ${revealed ? "revealed" : ""}`}
      style={{
        animationDelay: `${index * 0.08}s`,
        animationDuration: `${3 + (index % 3)}s`,
      }}
    >
      <div className={styles.chipIcon}>
        <Icon icon={useCase.icon} width="24" />
      </div>
      <div className={styles.chipContent}>
        <h3 className={styles.chipTitle}>{useCase.title}</h3>
        <p className={styles.chipDesc}>{useCase.desc}</p>
      </div>
    </div>
  );
};
