"use client";

import { Icon } from "@iconify/react";
import { useLanguage } from "@/hooks/useLanguage";
import { STEPS_CONFIG } from "./StepsSection.config";
import styles from "./StepsSection.module.css";

export const StepsSection = () => {
    const { t } = useLanguage();
    const strings = t.steps;

    return (
        <section className={styles.section}>
            <div className="mx-auto max-w-6xl">
                <div className="mx-auto mb-16 max-w-xl text-center">
                    <div className="inline-flex items-center gap-2 bg-white shadow-sm mb-5 px-3 py-1 border border-surface-200 rounded-full">
                        <Icon
                            icon="solar:route-linear"
                            width="14"
                            className="text-brand-600"
                        />
                        <span className="font-semibold text-surface-600 text-xs tracking-wide">
                            {strings.badge}
                        </span>
                    </div>

                    <h2
                        className={`font-extrabold text-surface-900 text-3xl md:text-4xl tracking-tight ${styles.animFadeUp}`}
                    >
                        {strings.title}
                    </h2>

                    {"subtitle" in strings && (
                        <p className="mt-4 text-surface-500 text-base leading-relaxed">
                            {strings.subtitle}
                        </p>
                    )}
                </div>

                <div className={styles.stepsGrid}>
                    {STEPS_CONFIG.map((step) => {
                        const stepData = strings[
                            step.id as keyof typeof strings
                        ] as {
                            title: string;
                            desc: string;
                        };

                        return (
                            <div
                                key={step.id}
                                className={`${styles.stepCard} ${styles.animFadeUp} ${step.delay}`}
                            >
                                <div className={styles.numberBadge}>
                                    <span className={styles.numberText}>
                                        {step.number}
                                    </span>
                                </div>

                                <h3 className="mb-2 font-bold text-surface-900 text-base">
                                    {stepData.title}
                                </h3>

                                <p className="text-surface-500 text-sm leading-relaxed">
                                    {stepData.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};