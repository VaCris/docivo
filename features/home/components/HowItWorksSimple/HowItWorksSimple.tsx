"use client";

import { Icon } from "@iconify/react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { GlassPanel } from "@/components/ui/GlassPanel/GlassPanel";
import styles from "./HowItWorksSimple.module.css";

const STEPS = [
    {
        number: "01",
        icon: "solar:upload-linear",
        title: "Upload your file",
        desc: "Drag and drop or click to select. PDFs, images, scans — we handle them all.",
    },
    {
        number: "02",
        icon: "solar:settings-linear",
        title: "Choose your tool",
        desc: "Merge, split, convert, OCR. Pick what you need, adjust settings if you want.",
    },
    {
        number: "03",
        icon: "solar:downloadminimalistic-linear",
        title: "Download result",
        desc: "Your processed file is ready in seconds. Download it instantly, no waiting.",
    },
];

const REVEAL_DELAYS = [
    "reveal-delay-0",
    "reveal-delay-1",
    "reveal-delay-2",
];

const FLOAT_OFFSETS = ["float-offset-a", "float-offset-b", "float-offset-a"];

export const HowItWorksSimple = () => {
    const [headerRef, headerRevealed] = useScrollReveal<HTMLDivElement>();
    const [timelineRef, timelineRevealed] = useScrollReveal<HTMLDivElement>();

    return (
        <section className={styles.section}>
            <div className="mx-auto max-w-7xl">
                <div
                    ref={headerRef}
                    className={`mb-16 flex flex-col items-center text-center scroll-reveal ${headerRevealed ? "revealed" : ""}`}
                >
                    <h2 className={styles.title}>
                        How it works
                    </h2>
                    <p className={styles.subtitle}>
                        Three steps. No account needed. Files never leave your browser for local tools.
                    </p>
                </div>

                <div
                    ref={timelineRef}
                    className={styles.timeline}
                >
                    <div
                        className={`${styles.line} scroll-reveal ${timelineRevealed ? "revealed" : ""}`}
                        aria-hidden="true"
                    />

                    {STEPS.map((step, index) => (
                        <div
                            key={step.number}
                            className={`${styles.step} ${FLOAT_OFFSETS[index] ?? ""} scroll-reveal ${timelineRevealed ? "revealed" : ""} ${REVEAL_DELAYS[index] ?? ""}`}
                        >
                            <div className={styles.dotWrap}>
                                <div className={styles.dot}>
                                    <Icon icon={step.icon} width="20" />
                                </div>
                            </div>

                            <GlassPanel variant="light" className={styles.card}>
                                <span className={styles.cardNumber}>{step.number}</span>
                                <h3 className={styles.cardTitle}>{step.title}</h3>
                                <p className={styles.cardDesc}>{step.desc}</p>
                            </GlassPanel>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
