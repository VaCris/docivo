"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { useLanguage } from "@/hooks/useLanguage";
import { CTA_CONFIG } from "./CtaSection.config";
import styles from "./CtaSection.module.css";

export const CtaSection = () => {
    const { t } = useLanguage();
    const strings = t.cta;

    return (
        <section className={styles.section}>
            <div className="mx-auto max-w-6xl">
                <div className={`${styles.ctaCard} ${styles.animFadeUp}`}>
                    <div className={styles.glow} />

                    <div className="z-10 relative mx-auto max-w-2xl text-center">
                        <div className="inline-flex items-center gap-2 bg-white/10 mb-6 px-3 py-1 border border-white/10 rounded-full">
                            <span className="font-semibold text-white/70 text-xs tracking-wide">
                                Docivo
                            </span>
                        </div>

                        <h2 className="font-extrabold text-white text-3xl md:text-5xl tracking-tight">
                            {strings.title}
                        </h2>

                        <p className="mx-auto mt-4 max-w-md text-surface-300 text-base leading-relaxed">
                            {strings.subtitle}
                        </p>

                        <div className="flex sm:flex-row flex-col justify-center items-center gap-4 mt-10">
                            <Link
                                href={CTA_CONFIG.links.primary}
                                className={styles.primaryBtn}
                            >
                                {strings.buttons.primary}
                                <Icon
                                    icon={CTA_CONFIG.icons.arrowRight}
                                    width="16"
                                    className="transition-transform group-hover:translate-x-0.5"
                                />
                            </Link>

                            <Link
                                href={CTA_CONFIG.links.secondary}
                                className={styles.secondaryBtn}
                            >
                                {strings.buttons.secondary}
                                <Icon
                                    icon={CTA_CONFIG.icons.arrowRight}
                                    width="15"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};