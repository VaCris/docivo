"use client";

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useLanguage } from '@/hooks/useLanguage';
import enData from '@/locales/en/cta.json';
import esData from '@/locales/es/cta.json';
import { CTA_CONFIG } from './CtaSection.config';
import styles from './CtaSection.module.css';

export const CtaSection = () => {
    const { currentLang } = useLanguage();
    const t = currentLang === 'en' ? enData : esData;

    return (
        <section className={styles.section}>
            <div className={`max-w-2xl mx-auto text-center ${styles.animFadeUp}`}>
                <h2 className="font-extrabold text-white text-3xl md:text-4xl tracking-tight">
                    {t.title}
                </h2>
                <p className="mx-auto mt-4 max-w-md text-surface-400 text-base leading-relaxed">
                    {t.subtitle}
                </p>

                <div className="flex sm:flex-row flex-col justify-center items-center gap-4 mt-10">
                    <Link href={CTA_CONFIG.links.primary} className={styles.primaryBtn}>
                        {t.buttons.primary}
                        <Icon icon={CTA_CONFIG.icons.arrowRight} width="16" />
                    </Link>
                    <Link href={CTA_CONFIG.links.secondary} className={styles.secondaryBtn}>
                        {t.buttons.secondary}
                        <Icon icon={CTA_CONFIG.icons.arrowRight} width="15" />
                    </Link>
                </div>
            </div>
        </section>
    );
};