"use client";

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useLanguage } from '@/hooks/useLanguage';

import enData from '@/locales/en/imageToPdf.json';
import esData from '@/locales/es/imageToPdf.json';

export const ImageToPdfTool = () => {
    const { currentLang } = useLanguage();
    const t = currentLang === 'en' ? enData : esData;

    const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
    const [pageSize, setPageSize] = useState('a4');
    const [margin, setMargin] = useState('small');

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            <div className="mb-8">
                <h1 className="font-extrabold text-surface-900 text-2xl md:text-3xl tracking-tight">
                    {t.header.title}
                </h1>
                <p className="mt-2 text-surface-500 text-sm md:text-base">
                    {t.header.subtitle}
                </p>
            </div>

            <div className="flex lg:flex-row flex-col flex-1 gap-6 overflow-hidden">
                <div className="relative flex flex-col flex-1 bg-white shadow-sm p-6 border border-surface-200 rounded-2xl overflow-y-auto">
                    <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
                        <div className="group relative bg-surface-100 border border-surface-200 hover:border-brand-500 rounded-xl aspect-square overflow-hidden transition-all">
                            <div className="absolute inset-0 flex justify-center items-center bg-surface-50 text-surface-400">
                                <Icon icon="solar:gallery-bold-duotone" width="48" />
                            </div>
                            <button className="top-2 right-2 z-10 absolute flex justify-center items-center bg-white/90 opacity-0 group-hover:opacity-100 shadow-sm backdrop-blur-sm border border-surface-200 rounded-full w-7 h-7 text-surface-500 hover:text-red-600 transition-opacity">
                                <Icon icon="solar:trash-bin-trash-bold" width="14" />
                            </button>
                            <div className="right-0 bottom-0 left-0 absolute bg-gradient-to-t from-black/60 to-transparent p-3">
                                <p className="font-medium text-white text-xs truncate">{t.workspace.mockImage1}</p>
                            </div>
                        </div>

                        <div className="group relative bg-surface-100 border border-surface-200 hover:border-brand-500 rounded-xl aspect-square overflow-hidden transition-all">
                            <div className="absolute inset-0 flex justify-center items-center bg-surface-50 text-surface-400">
                                <Icon icon="solar:gallery-bold-duotone" width="48" />
                            </div>
                            <button className="top-2 right-2 z-10 absolute flex justify-center items-center bg-white/90 opacity-0 group-hover:opacity-100 shadow-sm backdrop-blur-sm border border-surface-200 rounded-full w-7 h-7 text-surface-500 hover:text-red-600 transition-opacity">
                                <Icon icon="solar:trash-bin-trash-bold" width="14" />
                            </button>
                            <div className="right-0 bottom-0 left-0 absolute bg-gradient-to-t from-black/60 to-transparent p-3">
                                <p className="font-medium text-white text-xs truncate">{t.workspace.mockImage2}</p>
                            </div>
                        </div>

                        <button className="group flex flex-col justify-center items-center hover:bg-brand-50 border-2 border-surface-300 hover:border-brand-500 border-dashed rounded-xl aspect-square transition-colors">
                            <div className="flex justify-center items-center bg-surface-100 group-hover:bg-brand-100 mb-3 rounded-full w-12 h-12 transition-colors">
                                <Icon icon="solar:add-circle-linear" width="28" className="text-surface-500 group-hover:text-brand-600" />
                            </div>
                            <p className="font-bold text-surface-600 group-hover:text-brand-700 text-xs">
                                {t.workspace.addMore}
                            </p>
                        </button>
                    </div>
                </div>

                <div className="flex flex-col bg-white shadow-sm p-6 border border-surface-200 rounded-2xl w-full lg:w-80 overflow-y-auto shrink-0">
                    <h3 className="flex items-center gap-2 mb-6 font-bold text-surface-800 text-base">
                        <Icon icon="solar:settings-bold-duotone" width="20" className="text-surface-400" />
                        {t.settings.title}
                    </h3>

                    <div className="flex-1 space-y-6">
                        <div>
                            <p className="block mb-3 font-bold text-surface-500 text-xs uppercase tracking-wider">
                                {t.settings.orientationLabel}
                            </p>
                            <div className="gap-3 grid grid-cols-2">
                                <button
                                    onClick={() => setOrientation('portrait')}
                                    className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border-2 transition-colors ${orientation === 'portrait' ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-surface-200 text-surface-500 hover:bg-surface-50'}`}
                                >
                                    <Icon icon="solar:document-linear" width="24" />
                                    <span className="font-bold text-xs">{t.settings.orientation.portrait}</span>
                                </button>
                                <button
                                    onClick={() => setOrientation('landscape')}
                                    className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border-2 transition-colors ${orientation === 'landscape' ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-surface-200 text-surface-500 hover:bg-surface-50'}`}
                                >
                                    <Icon icon="solar:document-linear" width="24" className="rotate-90" />
                                    <span className="font-bold text-xs">{t.settings.orientation.landscape}</span>
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-bold text-surface-500 text-xs uppercase tracking-wider">
                                {t.settings.pageSizeLabel}
                            </label>
                            <div className="relative">
                                <select
                                    value={pageSize}
                                    onChange={(e) => setPageSize(e.target.value)}
                                    className="bg-surface-50 px-4 py-3 pr-10 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 w-full font-medium text-surface-800 text-sm transition-colors appearance-none"
                                >
                                    <option value="fit">{t.settings.sizes.fit}</option>
                                    <option value="a4">{t.settings.sizes.a4}</option>
                                    <option value="letter">{t.settings.sizes.letter}</option>
                                </select>
                                <Icon icon="solar:alt-arrow-down-linear" width="16" className="top-1/2 right-4 absolute text-surface-400 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-bold text-surface-500 text-xs uppercase tracking-wider">
                                {t.settings.marginLabel}
                            </label>
                            <div className="relative">
                                <select
                                    value={margin}
                                    onChange={(e) => setMargin(e.target.value)}
                                    className="bg-surface-50 px-4 py-3 pr-10 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 w-full font-medium text-surface-800 text-sm transition-colors appearance-none"
                                >
                                    <option value="none">{t.settings.margins.none}</option>
                                    <option value="small">{t.settings.margins.small}</option>
                                    <option value="large">{t.settings.margins.large}</option>
                                </select>
                                <Icon icon="solar:alt-arrow-down-linear" width="16" className="top-1/2 right-4 absolute text-surface-400 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-surface-100 border-t">
                        <button className="inline-flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20 shadow-lg px-6 py-3.5 rounded-xl w-full font-bold text-white text-sm active:scale-95 transition-all">
                            <Icon icon="solar:gallery-send-bold" width="18" />
                            {t.actions.convertButton}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};