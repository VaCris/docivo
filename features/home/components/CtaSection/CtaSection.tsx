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
        <section className={styles.section}>
            <div className="mx-auto max-w-7xl">
                <div
                    ref={cardRef}
                    className={`${styles.ctaCard} scroll-reveal ${cardRevealed ? "revealed" : ""}`}
                >
                    {/* Decorative orbs */}
                    <div className={`${styles.orb} ${styles.orb1}`} aria-hidden="true" />
                    <div className={`${styles.orb} ${styles.orb2}`} aria-hidden="true" />

                    <h2 className={styles.title}>
                        <span className={styles.gradientText}>{strings.title}</span>
                    </h2>

                    <p className={styles.subtitle}>
                        {strings.subtitle}
                    </p>

                    <div className={styles.actions}>
                        <Link href="/dashboard" className={styles.primaryBtn} aria-label="Start using Docivo tools">
                            {strings.buttons.primary}
                            <Icon icon="solar:arrow-right-linear" width="16" />
                        </Link>

                        <Link href="/dashboard" className={styles.secondaryBtn} aria-label="Learn more about Docivo">
                            {strings.buttons.secondary}
                            <Icon icon="solar:arrow-right-linear" width="15" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};
