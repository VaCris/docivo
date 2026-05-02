"use client";

import React from 'react';
import { Icon } from '@iconify/react';
import { useLanguage } from '@/hooks/useLanguage';

import enData from '@/locales/en/settings.json';
import esData from '@/locales/es/settings.json';

export const SettingsView = () => {
    const { currentLang, toggleLanguage } = useLanguage();
    const t = currentLang === 'en' ? enData : esData;

    return (
        <div className="pb-10 max-w-4xl">
            <div className="mb-8">
                <h1 className="font-extrabold text-surface-900 text-2xl md:text-3xl tracking-tight">
                    {t.header.title}
                </h1>
                <p className="mt-2 text-surface-500 text-sm md:text-base">
                    {t.header.subtitle}
                </p>
            </div>

            <div className="space-y-8">
                <section className="bg-white shadow-sm p-6 md:p-8 border border-surface-200 rounded-2xl">
                    <h2 className="flex items-center gap-2 mb-6 font-bold text-surface-800 text-lg">
                        <Icon icon="solar:user-circle-bold-duotone" width="24" className="text-brand-500" />
                        {t.sections.profile.title}
                    </h2>

                    <div className="flex md:flex-row flex-col items-start gap-8">
                        <div className="flex flex-col items-center gap-3 shrink-0">
                            <div className="flex justify-center items-center bg-brand-100 shadow-md border-4 border-white rounded-full w-24 h-24 font-bold text-brand-600 text-3xl">
                                B
                            </div>
                            <button className="font-semibold text-brand-600 hover:text-brand-700 text-xs transition-colors">
                                {t.sections.profile.avatarBtn}
                            </button>
                        </div>

                        <div className="flex-1 space-y-5 w-full">
                            <div>
                                <label className="block mb-2 font-bold text-surface-500 text-xs uppercase tracking-wider">
                                    {t.sections.profile.nameLabel}
                                </label>
                                <input
                                    type="text"
                                    defaultValue="Bryan Vidal"
                                    className="bg-surface-50 px-4 py-2.5 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 w-full text-surface-800 text-sm transition-all"
                                />
                            </div>
                            <div>
                                <label className="block mb-2 font-bold text-surface-500 text-xs uppercase tracking-wider">
                                    {t.sections.profile.emailLabel}
                                </label>
                                <input
                                    type="email"
                                    defaultValue="bryan@example.com"
                                    disabled
                                    className="bg-surface-100 px-4 py-2.5 border border-surface-200 rounded-xl w-full text-surface-500 text-sm cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-white shadow-sm p-6 md:p-8 border border-surface-200 rounded-2xl">
                    <h2 className="flex items-center gap-2 mb-6 font-bold text-surface-800 text-lg">
                        <Icon icon="solar:settings-bold-duotone" width="24" className="text-surface-400" />
                        {t.sections.preferences.title}
                    </h2>

                    <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                        <div>
                            <label className="block mb-2 font-bold text-surface-500 text-xs uppercase tracking-wider">
                                {t.sections.preferences.languageLabel}
                            </label>
                            <div className="relative">
                                <select
                                    value={currentLang}
                                    onChange={toggleLanguage}
                                    className="bg-surface-50 px-4 py-3 pr-10 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 w-full font-medium text-surface-800 text-sm transition-colors appearance-none"
                                >
                                    <option value="en">English</option>
                                    <option value="es">Español</option>
                                </select>
                                <Icon icon="solar:alt-arrow-down-linear" width="16" className="top-1/2 right-4 absolute text-surface-400 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-bold text-surface-500 text-xs uppercase tracking-wider">
                                {t.sections.preferences.themeLabel}
                            </label>
                            <div className="relative">
                                <select
                                    defaultValue="light"
                                    className="bg-surface-50 px-4 py-3 pr-10 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 w-full font-medium text-surface-800 text-sm transition-colors appearance-none"
                                >
                                    <option value="light">{t.sections.preferences.themes.light}</option>
                                    <option value="dark">{t.sections.preferences.themes.dark}</option>
                                    <option value="system">{t.sections.preferences.themes.system}</option>
                                </select>
                                <Icon icon="solar:alt-arrow-down-linear" width="16" className="top-1/2 right-4 absolute text-surface-400 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </section>
{/* 
                <section className="bg-white shadow-sm p-6 md:p-8 border border-surface-200 rounded-2xl">
                    <h2 className="flex items-center gap-2 mb-6 font-bold text-surface-800 text-lg">
                        <Icon icon="solar:cloud-file-bold-duotone" width="24" className="text-brand-500" />
                        {t.sections.subscription.title}
                    </h2>

                    <div className="flex md:flex-row flex-col justify-between items-center gap-6 bg-surface-50 p-6 border border-surface-200 rounded-xl">
                        <div className="w-full md:w-1/2">
                            <div className="flex justify-between items-end mb-2">
                                <div>
                                    <p className="font-bold text-surface-500 text-xs uppercase tracking-wider">{t.sections.subscription.plan}</p>
                                    <p className="font-extrabold text-surface-900 text-lg">{t.sections.subscription.freePlan}</p>
                                </div>
                                <p className="font-bold text-brand-600 text-sm">45 MB / 1 GB</p>
                            </div>
                            <div className="bg-surface-200 rounded-full w-full h-2 overflow-hidden">
                                <div className="bg-brand-500 rounded-full h-full" style={{ width: '4.5%' }}></div>
                            </div>
                            <p className="mt-2 text-surface-500 text-xs">{t.sections.subscription.storageUsed}</p>
                        </div>

                        <button className="inline-flex justify-center items-center gap-2 bg-surface-900 hover:bg-black shadow-lg px-6 py-3 rounded-xl w-full md:w-auto font-bold text-white text-sm transition-all">
                            <Icon icon="solar:star-bold" width="18" className="text-amber-400" />
                            {t.sections.subscription.upgradeBtn}
                        </button>
                    </div>
                </section> */}

                <div className="flex justify-end gap-4 pt-6 border-surface-200 border-t">
                    <button className="hover:bg-surface-100 px-6 py-3 rounded-xl font-bold text-surface-600 text-sm transition-colors">
                        {t.actions.cancel}
                    </button>
                    <button className="bg-brand-600 hover:bg-brand-700 shadow-brand-500/20 shadow-lg px-6 py-3 rounded-xl font-bold text-white text-sm transition-all">
                        {t.actions.saveChanges}
                    </button>
                </div>
            </div>
        </div>
    );
};