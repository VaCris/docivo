"use client";

import { Icon } from '@iconify/react';
import { useLanguage } from '@/hooks/useLanguage';
import enData from '@/locales/en/howItWorks.json';
import esData from '@/locales/es/howItWorks.json';
import { HOW_IT_WORKS_CONFIG } from './HowItWorksSection.config';
import styles from './HowItWorksSection.module.css';

export const HowItWorksSection = () => {
    const { currentLang } = useLanguage();
    const t = currentLang === 'en' ? enData : esData;

    return (
        <section id="details" className={styles.section}>
            <div className="mx-auto max-w-6xl">
                <div className="mx-auto mb-16 max-w-xl text-center">
                    <h2 className="font-extrabold text-surface-900 text-3xl md:text-4xl tracking-tight">
                        {t.title}
                    </h2>
                    <p className="mt-4 text-surface-500 text-base leading-relaxed">
                        {t.subtitle}
                    </p>
                </div>

                <div className="space-y-6">
                    {HOW_IT_WORKS_CONFIG.map((tool) => {
                        const toolData = t.tools[tool.id as keyof typeof t.tools];

                        return (
                            <div key={tool.id} className={styles.detailCard}>
                                <div className="grid md:grid-cols-5">
                                    <div className={`md:col-span-2 bg-gradient-to-br ${tool.colors.gradient} ${styles.leftPanel}`}>
                                        <div className={`${styles.iconWrapper} ${tool.colors.iconBorder}`}>
                                            <Icon icon={tool.icon} width="30" className={tool.colors.iconText} />
                                        </div>
                                        <h3 className="font-bold text-surface-800 text-xl">{toolData.title}</h3>
                                        <span className={`mt-2 inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${tool.colors.badgeBg} ${tool.colors.badgeText}`}>
                                            {toolData.badge}
                                        </span>
                                    </div>

                                    <div className={`md:col-span-3 ${styles.rightPanel}`}>
                                        <h4 className={styles.sectionTitle}>{t.labels.whatItDoes}</h4>
                                        <p className="mb-6 text-surface-600 text-sm leading-relaxed">
                                            {toolData.whatItDoes}
                                        </p>

                                        <h4 className={styles.sectionTitle}>{t.labels.howItWorks}</h4>
                                        <div className="space-y-3">
                                            {toolData.steps.map((stepDesc, idx) => (
                                                <div key={idx} className="flex items-start gap-3">
                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${tool.colors.stepBg} ${tool.colors.stepText}`}>
                                                        {idx + 1}
                                                    </div>
                                                    <p className="text-surface-600 text-sm">{stepDesc}</p>
                                                </div>
                                            ))}
                                        </div>

                                        {'warning' in toolData && (
                                            <div className="flex items-start gap-2 bg-amber-50 mt-5 p-3 border border-amber-200/60 rounded-xl">
                                                <Icon icon="solar:info-circle-bold" width="16" className="mt-0.5 text-amber-600 shrink-0" />
                                                <p className="text-amber-800 text-xs leading-relaxed">
                                                    <strong>{t.labels.important}</strong> {toolData.warning}
                                                </p>
                                            </div>
                                        )}

                                        <h4 className={`mt-6 ${styles.sectionTitle}`}>{t.labels.bestFor}</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {toolData.bestFor.map((tag, idx) => (
                                                <span key={idx} className="bg-surface-50 px-3 py-1 border border-surface-200 rounded-lg font-medium text-surface-600 text-xs">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};