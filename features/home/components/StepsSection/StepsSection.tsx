"use client";

import { useLanguage } from '@/hooks/useLanguage';
import enData from '@/locales/en/steps.json';
import esData from '@/locales/es/steps.json';
import { STEPS_CONFIG } from './StepsSection.config';
import styles from './StepsSection.module.css';

export const StepsSection = () => {
    const { currentLang } = useLanguage();
    const t = currentLang === 'en' ? enData : esData;

    return (
        <section className={styles.section}>
            <div className="mx-auto max-w-6xl">
                <div className="mx-auto mb-16 max-w-xl text-center">
                    <h2 className={`text-3xl md:text-4xl font-extrabold text-surface-900 tracking-tight ${styles.animFadeUp}`}>
                        {t.title}
                    </h2>
                </div>

                <div className="gap-8 md:gap-12 grid grid-cols-1 md:grid-cols-3">
                    {STEPS_CONFIG.map((step) => {
                        const stepData = t[step.id as keyof typeof t] as { title: string, desc: string };

                        return (
                            <div key={step.id} className={`text-center ${styles.animFadeUp} ${step.delay}`}>
                                <div className={styles.numberBadge}>
                                    <span className={styles.numberText}>{step.number}</span>
                                </div>
                                <h3 className="mb-2 font-bold text-surface-800 text-base">{stepData.title}</h3>
                                <p className="text-surface-500 text-sm leading-relaxed">{stepData.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};