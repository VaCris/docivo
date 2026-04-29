"use client";

import { Icon } from '@iconify/react';
import { useLanguage } from '@/hooks/useLanguage';
import enData from '@/locales/en/toolGrid.json';
import esData from '@/locales/es/toolGrid.json';
import { TOOLGRID_CONFIG } from './ToolGrid.config';
import styles from './ToolGrid.module.css';

export const ToolGrid = () => {
    const { currentLang } = useLanguage();
    const t = currentLang === 'en' ? enData : esData;

    return (
        <section id="tools" className={styles.section}>
            <div className="mx-auto max-w-6xl">

                <div className="mx-auto mb-14 max-w-xl text-center">
                    <div className="inline-flex items-center gap-2 bg-white mb-5 px-3 py-1 border border-surface-200 rounded-full">
                        <Icon icon="solar:widget-4-linear" width="14" className="text-brand-600" />
                        <span className="font-semibold text-surface-600 text-xs tracking-wide">{t.badge}</span>
                    </div>
                    <h2 className="font-extrabold text-surface-900 text-3xl md:text-4xl tracking-tight">{t.title}</h2>
                    <p className="mt-4 text-surface-500 text-base leading-relaxed">{t.subtitle}</p>
                </div>

                <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {TOOLGRID_CONFIG.map((tool) => {
                        const toolContent = t.items[tool.id as keyof typeof t.items];
                        const typeLabel = t.labels[tool.type as keyof typeof t.labels];

                        return (
                            <div key={tool.id} className={`${styles.toolCard} ${tool.delay}`}>
                                <div className={styles.iconWrap}>
                                    <Icon icon={tool.icon} width="22" />
                                </div>
                                <h3 className="mb-2 font-bold text-surface-800 text-base">{toolContent.title}</h3>
                                <p className="mb-4 text-surface-500 text-sm leading-relaxed">{toolContent.desc}</p>
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${tool.bgClass}`}>
                                    {typeLabel}
                                </span>
                            </div>
                        );
                    })}

                    <div className={`${styles.toolCard} cursor-default hover:translate-y-0 hover:shadow-none border-dashed bg-surface-50`}>
                        <div className={`${styles.iconWrap} bg-surface-100 text-surface-400`}>
                            <Icon icon="solar:lock-linear" width="22" />
                        </div>
                        <h3 className="mb-2 font-bold text-surface-400 text-base">{t.comingSoon.title}</h3>
                        <p className="text-surface-400 text-sm leading-relaxed">{t.comingSoon.desc}</p>
                    </div>
                </div>

            </div>
        </section>
    );
};