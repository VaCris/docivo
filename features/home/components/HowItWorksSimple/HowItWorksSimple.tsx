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
        <section className={`${styles.section} dark:bg-surface-800 dark:border-surface-300`}>
            <div className="mx-auto max-w-7xl">
                <div
                    ref={headerRef}
                    className={`mb-8 flex flex-col items-center text-center scroll-reveal ${headerRevealed ? "revealed" : ""}`}
                >
                    <div className={`${styles.logoStrip}`}>
                        <img src="/images/Logo.png" alt="Docivo" className="h-6 w-auto" />
                        <span className={`${styles.logoStripText} dark:text-surface-100`}>Docivo</span>
                    </div>
                    <h2 className={`${styles.title} dark:text-surface-100`}>
                        <span className={styles.titleGradient}>{strings.title}</span>
                    </h2>
                    <p className={`${styles.subtitle} dark:text-surface-400`}>
                        {strings.subtitle}
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

                    {strings.steps.map((step, index) => (
                        <div
                            key={step.number}
                            className={`${styles.step} scroll-reveal ${timelineRevealed ? "revealed" : ""} ${REVEAL_DELAYS[index] ?? ""}`}
                        >
                            <div className={styles.dotWrap}>
                                <div className={`${styles.dot} dark:bg-gradient-to-br dark:from-brand-900 dark:to-brand-800 dark:border-brand-500 dark:text-brand-200 dark:shadow-brand-500/25`}>
                                    <Icon icon={STEP_ICONS[index] ?? STEP_ICONS[0]} width="20" />
                                </div>
                            </div>

                            <GlassPanel variant="light" className={`${styles.card} dark:bg-surface-800/60`}>
                                <span className={`${styles.cardNumber} dark:text-surface-400`}>{step.number}</span>
                                <h3 className={`${styles.cardTitle} dark:text-surface-100`}>{step.title}</h3>
                                <p className={`${styles.cardDesc} dark:text-surface-400`}>{step.desc}</p>
                            </GlassPanel>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
