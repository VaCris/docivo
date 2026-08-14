"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { useLanguage } from "@/hooks/useLanguage";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./CtaSection.module.css";

export const CtaSection = () => {
    const { t } = useLanguage();
    const strings = t.cta;
    const [cardRef, cardRevealed] = useScrollReveal<HTMLDivElement>();

    return (
        <section className={`${styles.section} dark:bg-surface-900 dark:border-surface-300`} aria-labelledby="cta-title">
            <div className="mx-auto max-w-7xl">
                <div
                    ref={cardRef}
                    className={`${styles.ctaCard} ${cardRevealed ? styles.revealed : ""} dark:bg-surface-900 dark:border-surface-300`}
                >
                    {/* Decorative orbs */}
                    <div className={`${styles.orb} ${styles.orb1}`} aria-hidden="true" />
                    <div className={`${styles.orb} ${styles.orb2}`} aria-hidden="true" />

                    <h2 className={`${styles.title} dark:text-surface-100`} id="cta-title">
                        <span className={`${styles.gradientText} dark:bg-gradient-to-r dark:from-brand-200 dark:to-accent`}>{strings.title}</span>
                    </h2>

                    <p className={`${styles.subtitle} dark:text-surface-300`}>
                        {strings.subtitle}
                    </p>

                    <div className={styles.actions}>
                        <Link href="/dashboard" className={`${styles.primaryBtn} dark:bg-surface-0 dark:text-surface-900 dark:shadow-white/15`} aria-label="Start using Docivo tools">
                            {strings.buttons.primary}
                            <Icon icon="solar:arrow-right-linear" width="16" />
                        </Link>

                        <Link href="/dashboard" className={`${styles.secondaryBtn} dark:text-surface-200 dark:hover:text-surface-900 dark:hover:border-surface-100 dark:hover:bg-surface-100`} aria-label="Learn more about Docivo">
                            {strings.buttons.secondary}
                            <Icon icon="solar:arrow-right-linear" width="15" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
