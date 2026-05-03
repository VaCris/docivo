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

                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <div className="inline-flex items-center gap-2 bg-white shadow-sm mb-5 px-3 py-1 border border-surface-200 rounded-full">
                        <Icon icon="solar:shield-network-linear" width="14" className="text-brand-600" />
                        <span className="font-semibold text-surface-600 text-xs uppercase tracking-wide">{t.badge}</span>
                    </div>
                    <h2 className="font-extrabold text-surface-900 text-3xl md:text-5xl tracking-tight">
                        {t.title}
                    </h2>
                    <p className="mt-4 text-surface-500 text-lg leading-relaxed">
                        {t.subtitle}
                    </p>
                </div>

                <div className="mx-auto max-w-4xl">
                    <div className={`${styles.card} border-brand-100 bg-gradient-to-b from-white to-surface-50`}>
                        <div className="flex md:flex-row flex-col md:items-center gap-6 mb-8">
                            <div className="flex justify-center items-center bg-brand-50 shadow-inner rounded-2xl w-14 h-14">
                                <Icon icon="solar:server-square-bold" width="32" className="text-brand-600" />
                            </div>
                            <div>
                                <h3 className="mb-1 font-bold text-surface-900 text-xl">{t.server.title}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {t.server.tools.split(' · ').map((tool, idx) => (
                                        <span key={idx} className="bg-brand-100/50 px-2 py-0.5 rounded-md font-bold text-brand-700 text-xs uppercase tracking-wider">
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="items-start gap-8 grid md:grid-cols-2">
                            <div className="text-surface-600 text-base leading-relaxed">
                                <p>{t.server.desc}</p>
                            </div>

                            <div className="bg-brand-50/50 p-5 border border-brand-100 rounded-2xl">
                                <div className="flex items-center gap-3 mb-3">
                                    <Icon icon="solar:shield-keyhole-bold-duotone" width="24" className="text-brand-600" />
                                    <span className="font-bold text-brand-900 text-sm uppercase tracking-widest">
                                        {t.server.guaranteeTitle}
                                    </span>
                                </div>
                                <p className="text-brand-800/80 text-sm leading-snug">
                                    {t.server.guaranteeDesc}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white shadow-sm mt-12 p-8 border border-surface-200/80 rounded-3xl">
                    <h3 className="mb-8 font-bold text-surface-900 text-lg text-center uppercase tracking-widest">{t.techStack}</h3>
                    <div className="gap-4 grid grid-cols-2 md:grid-cols-4">
                        {TECH_STACK.map((tech, i) => (
                            <div key={i} className="group bg-surface-50 hover:bg-white hover:shadow-md p-5 border border-transparent hover:border-surface-100 rounded-2xl transition-all duration-300">
                                <Icon icon={tech.icon} width="28" className="mb-3 text-surface-400 group-hover:text-brand-600 transition-colors" />
                                <p className="font-bold text-surface-800 text-sm">{tech.name}</p>
                                <p className="mt-1 font-medium text-[12px] text-surface-400">{tech.sub}</p>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};