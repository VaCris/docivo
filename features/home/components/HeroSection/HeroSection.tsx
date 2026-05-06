"use client";

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useLanguage } from '@/hooks/useLanguage';
import enData from '@/locales/en/hero.json';
import esData from '@/locales/es/hero.json';
import { HERO_CONFIG } from './HeroSection.config';
import styles from './HeroSection.module.css';

export const HeroSection = () => {
    const { currentLang } = useLanguage();
    const t = currentLang === 'en' ? enData : esData;

    return (
        <section className={styles.heroContainer}>
            <div className="mx-auto max-w-6xl">
                <div className="mx-auto max-w-3xl text-center">
                    <div className={`${styles.animFadeUp} inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 border border-brand-200/60 mb-8`}>
                        <span className="bg-brand-500 rounded-full w-1.5 h-1.5"></span>
                        <span className="font-semibold text-brand-700 text-xs tracking-wide">{t.badge}</span>
                    </div>

                    <h1 className={`${styles.animFadeUp} ${styles.delay1} text-4xl md:text-6xl lg:text-[3.75rem] font-extrabold text-surface-900 leading-[1.08] tracking-tight`}>
                        {t.titleLine1}<br />
                        <span className="text-brand-600">{t.titleHighlight}</span> {t.titleLine2}
                    </h1>

                    <p className={`${styles.animFadeUp} ${styles.delay2} mt-6 text-lg md:text-xl text-surface-500 leading-relaxed max-w-xl mx-auto`}>
                        {t.description}
                    </p>

                    <div className={`${styles.animFadeUp} ${styles.delay3} mt-10 flex flex-col sm:flex-row items-center justify-center gap-4`}>
                        <Link href="/dashboard" className="group inline-flex items-center gap-2.5 bg-brand-600 hover:bg-brand-700 shadow-brand-600/20 shadow-lg px-7 py-3.5 rounded-xl font-semibold text-white text-sm transition-all">
                            {t.buttons.primary}
                            <Icon icon={HERO_CONFIG.icons.arrowDown} width="16" className="transition-transform group-hover:translate-y-0.5" />
                        </Link>
                        <Link href="#tools" className="inline-flex items-center gap-2 hover:bg-surface-50 px-7 py-3.5 border border-surface-200 rounded-xl font-medium text-surface-600 hover:text-surface-800 text-sm transition-all">
                            {t.buttons.secondary}
                            <Icon icon={HERO_CONFIG.icons.arrowRight} width="16" />
                        </Link>
                    </div>

                    <div className={`${styles.animFadeUp} ${styles.delay4} mt-14 flex items-center justify-center gap-6 text-surface-400`}>
                        <div className="flex items-center gap-1.5 font-medium text-xs">
                            <Icon icon={HERO_CONFIG.icons.speed} width="15" className="text-brand-500" />
                            {t.features.speed}
                        </div>
                        <div className="bg-surface-200 w-px h-3"></div>
                        <div className="flex items-center gap-1.5 font-medium text-xs">
                            <Icon icon={HERO_CONFIG.icons.security} width="15" className="text-brand-500" />
                            {t.features.security}
                        </div>
                        <div className="hidden sm:block bg-surface-200 w-px h-3"></div>
                        <div className="hidden sm:flex items-center gap-1.5 font-medium text-xs">
                            <Icon icon={HERO_CONFIG.icons.tools} width="15" className="text-brand-500" />
                            {t.features.tools}
                        </div>
                    </div>
                </div>

                <div className={`${styles.animFadeUp} ${styles.delay5} mt-16 md:mt-20 max-w-4xl mx-auto relative`}>
                    <div className={styles.visualGlow}></div>
                    <div className="relative bg-surface-50 shadow-surface-200/40 shadow-xl p-2 border border-surface-200/80 rounded-2xl">
                        <div className="bg-white border border-surface-100 rounded-xl overflow-hidden">
                            <div className="flex items-center gap-2 px-4 py-3 border-surface-100 border-b">
                                <div className="flex gap-1.5">
                                    <div className="bg-red-400/70 rounded-full w-3 h-3"></div>
                                    <div className="bg-amber-400/70 rounded-full w-3 h-3"></div>
                                    <div className="bg-green-400/70 rounded-full w-3 h-3"></div>
                                </div>
                                <div className="flex flex-1 justify-center">
                                    <div className="bg-surface-50 px-4 py-1 rounded-lg font-medium text-surface-400 text-xs">
                                        {t.visual.url}
                                    </div>
                                </div>
                                <div className="w-12"></div>
                            </div>

                            <div className="p-6 md:p-10">
                                <div className="gap-4 grid grid-cols-3">
                                    <div className={`${styles.animFloat} col-span-1 bg-surface-50 border border-surface-100 rounded-xl p-5 flex flex-col items-center gap-3`}>
                                        <div className="bg-brand-100 border border-brand-200/50 rounded-lg w-10 h-14"></div>
                                        <div className="font-medium text-surface-500 text-xs">{t.visual.fileName1}</div>
                                        <div className="text-[10px] text-surface-400">{HERO_CONFIG.mockFiles.file1Size}</div>
                                    </div>
                                    <div className={`${styles.animFloat} ${styles.delay2} col-span-1 bg-surface-50 border border-surface-100 rounded-xl p-5 flex flex-col items-center gap-3`}>
                                        <div className="bg-blue-100 border border-blue-200/50 rounded-lg w-10 h-14"></div>
                                        <div className="font-medium text-surface-500 text-xs">{t.visual.fileName2}</div>
                                        <div className="text-[10px] text-surface-400">{HERO_CONFIG.mockFiles.file2Size}</div>
                                    </div>
                                    <div className={`${styles.animFloat} ${styles.delay4} col-span-1 bg-surface-50 border border-dashed border-brand-300 rounded-xl p-5 flex flex-col items-center justify-center gap-2 hover:bg-brand-50 cursor-pointer transition-colors`}>
                                        <Icon icon={HERO_CONFIG.icons.addCircle} width="24" className="text-brand-400" />
                                        <div className="font-medium text-[10px] text-brand-500">{t.visual.addMore}</div>
                                    </div>
                                </div>
                                <div className="flex justify-center mt-6">
                                    <div className="inline-flex items-center gap-2 bg-brand-600 px-6 py-2.5 rounded-xl font-semibold text-white text-sm">
                                        <Icon icon={HERO_CONFIG.icons.merge} width="16" />
                                        {t.visual.actionBtn}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};