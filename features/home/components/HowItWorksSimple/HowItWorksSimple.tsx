"use client";

import { Icon } from "@iconify/react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/hooks/useLanguage";
import { GlassPanel } from "@/components/ui/GlassPanel/GlassPanel";
import styles from "./HowItWorksSimple.module.css";

const REVEAL_DELAYS = [
    "reveal-delay-0",
    "reveal-delay-1",
    "reveal-delay-2",
];

const STEP_ICONS = [
    "solar:upload-linear",
    "solar:settings-linear",
    "solar:downloadminimalistic-linear",
];

export const HowItWorksSimple = () => {
    const { t } = useLanguage();
    const strings = t.howItWorks.simple;
    const [headerRef, headerRevealed] = useScrollReveal<HTMLDivElement>();
    const [timelineRef, timelineRevealed] = useScrollReveal<HTMLDivElement>();

    return (
        <section className={styles.section}>
            <div className="mx-auto max-w-7xl">
                <div
                    ref={headerRef}
                    className={`mb-8 flex flex-col items-center text-center scroll-reveal scroll-reveal-scale ${headerRevealed ? "revealed" : ""}`}
                >
                    <div className={styles.logoStrip}>
                        <img src="/images/Logo.png" alt="Docivo" className="h-6 w-auto" />
                        <span className={styles.logoStripText}>Docivo</span>
                    </div>
                    <h2 className={styles.title}>
                        <span className={styles.titleGradient}>{strings.title}</span>
                    </h2>
                    <p className={styles.subtitle}>
                        {strings.subtitle}
                    </p>
                </div>

                <div
                    ref={timelineRef}
                    className={styles.timeline}
                >
                    <div
                        className={`${styles.line} ${timelineRevealed ? styles.revealed : ""}`}
                        aria-hidden="true"
                    />

                    {strings.steps.map((step, index) => {
                        const directionClass = index % 2 === 0
                            ? "scroll-reveal-right"
                            : "scroll-reveal-left";

                        return (
                            <div
                                key={step.number}
                                className={`${styles.step} scroll-reveal ${directionClass} ${timelineRevealed ? "revealed" : ""} ${REVEAL_DELAYS[index] ?? ""}`}
                            >
                                <div className={styles.dotWrap}>
                                    <div className={styles.dot}>
                                        <Icon icon={STEP_ICONS[index] ?? STEP_ICONS[0]} width="20" />
                                    </div>
                                </div>

                                <GlassPanel variant="light" className={styles.card}>
                                    <span className={styles.cardNumber}>{step.number}</span>
                                    <h3 className={styles.cardTitle}>{step.title}</h3>
                                    <p className={styles.cardDesc}>{step.desc}</p>
                                </GlassPanel>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
