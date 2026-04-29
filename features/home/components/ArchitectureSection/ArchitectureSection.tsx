"use client";

import { Icon } from '@iconify/react';
import { useLanguage } from '@/hooks/useLanguage';
import enData from '@/locales/en/architecture.json';
import esData from '@/locales/es/architecture.json';
import { TECH_STACK } from './ArchitectureSection.config';
import styles from './ArchitectureSection.module.css';

export const ArchitectureSection = () => {
    const { currentLang } = useLanguage();
    const t = currentLang === 'en' ? enData : esData;

    return (
        <section id="architecture" className={styles.section}>
            <div className="mx-auto max-w-6xl">

                <div className="mx-auto mb-14 max-w-xl text-center">
                    <div className="inline-flex items-center gap-2 bg-white mb-5 px-3 py-1 border border-surface-200 rounded-full">
                        <Icon icon="solar:server-square-linear" width="14" className="text-brand-600" />
                        <span className="font-semibold text-surface-600 text-xs tracking-wide">{t.badge}</span>
                    </div>
                    <h2 className="font-extrabold text-surface-900 text-3xl md:text-4xl tracking-tight">{t.title}</h2>
                    <p className="mt-4 text-surface-500 text-base leading-relaxed">{t.subtitle}</p>
                </div>

                <div className="gap-6 grid md:grid-cols-2">
                    <div className={styles.card}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex justify-center items-center bg-green-50 rounded-xl w-10 h-10">
                                <Icon icon="solar:monitor-linear" width="20" className="text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-surface-800 text-base">{t.client.title}</h3>
                                <span className="font-semibold text-green-600 text-xs">{t.client.tools}</span>
                            </div>
                        </div>
                        <div className="space-y-4 text-surface-600 text-sm leading-relaxed">
                            <p>{t.client.desc}</p>
                            <div className="bg-green-50/60 p-4 rounded-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <Icon icon="solar:shield-check-bold" width="16" className="text-green-600" />
                                    <span className="font-bold text-green-800 text-xs uppercase tracking-wider">{t.client.guaranteeTitle}</span>
                                </div>
                                <p className="text-green-700 text-xs">{t.client.guaranteeDesc}</p>
                            </div>
                        </div>
                    </div>

                    <div className={`${styles.card} anim-delay-2`}>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="flex justify-center items-center bg-amber-50 rounded-xl w-10 h-10">
                                <Icon icon="solar:server-square-linear" width="20" className="text-amber-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-surface-800 text-base">{t.server.title}</h3>
                                <span className="font-semibold text-amber-600 text-xs">{t.server.tools}</span>
                            </div>
                        </div>
                        <div className="space-y-4 text-surface-600 text-sm leading-relaxed">
                            <p>{t.server.desc}</p>
                            <div className="bg-amber-50/60 p-4 rounded-xl">
                                <div className="flex items-center gap-2 mb-2">
                                    <Icon icon="solar:clock-circle-bold" width="16" className="text-amber-600" />
                                    <span className="font-bold text-amber-800 text-xs uppercase tracking-wider">{t.server.guaranteeTitle}</span>
                                </div>
                                <p className="text-amber-700 text-xs">{t.server.guaranteeDesc}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-sm mt-8 p-8 border border-surface-200/80 rounded-2xl">
                    <h3 className="mb-6 font-bold text-surface-800 text-base">{t.techStack}</h3>
                    <div className="gap-4 grid grid-cols-2 md:grid-cols-4">
                        {TECH_STACK.map((tech, i) => (
                            <div key={i} className="bg-surface-50 p-4 rounded-xl">
                                <Icon icon={tech.icon} width="22" className="mb-2 text-surface-700" />
                                <p className="font-bold text-surface-700 text-xs">{tech.name}</p>
                                <p className="mt-0.5 text-[11px] text-surface-400">{tech.sub}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};