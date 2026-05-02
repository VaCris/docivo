"use client";

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useLanguage } from '@/hooks/useLanguage';

import enData from '@/locales/en/pdfToWord.json';
import esData from '@/locales/es/pdfToWord.json';

export const PdfToWordTool = () => {
    const { currentLang } = useLanguage();
    const t = currentLang === 'en' ? enData : esData;

    const [layoutMode, setLayoutMode] = useState<'exact' | 'flowing'>('exact');

    const mockFile = "Q3_Financial_Report_Final.pdf";

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
                <div className="relative flex flex-col flex-1 justify-center items-center bg-surface-50 shadow-sm p-6 border border-surface-200 border-dashed rounded-2xl overflow-hidden">
                    <div className="top-6 right-6 left-6 z-10 absolute flex justify-between items-center bg-white shadow-sm p-4 border border-surface-200 rounded-xl">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <Icon icon="solar:file-bold-duotone" width="24" className="text-brand-600 shrink-0" />
                            <div className="truncate">
                                <p className="font-medium text-surface-500 text-xs">{t.workspace.fileLoaded}</p>
                                <p className="font-bold text-surface-800 text-sm truncate">{mockFile}</p>
                            </div>
                        </div>
                        <button className="bg-surface-50 px-3 py-1.5 rounded-lg font-bold text-surface-500 hover:text-brand-600 text-xs transition-colors shrink-0">
                            {t.workspace.changeFile}
                        </button>
                    </div>

                    <div className="flex items-center gap-6 opacity-90 mt-12">
                        <div className="relative flex flex-col justify-center items-center bg-white shadow-md border border-surface-200 rounded-xl w-24 h-32 text-red-500">
                            <span className="top-2 right-2 absolute bg-red-100 px-1.5 py-0.5 rounded font-bold text-[10px] text-red-700">PDF</span>
                            <Icon icon="solar:document-text-bold" width="48" />
                        </div>

                        <Icon icon="solar:arrow-right-line-duotone" width="32" className="text-surface-300" />

                        <div className="relative flex flex-col justify-center items-center bg-white shadow-md border border-brand-200 rounded-xl w-24 h-32 text-blue-600">
                            <span className="top-2 right-2 absolute bg-blue-100 px-1.5 py-0.5 rounded font-bold text-[10px] text-blue-700">DOCX</span>
                            <Icon icon="solar:document-bold" width="48" />
                        </div>
                    </div>
                </div>

                <div className="flex flex-col bg-white shadow-sm p-6 border border-surface-200 rounded-2xl w-full lg:w-80 shrink-0">
                    <h3 className="flex items-center gap-2 mb-6 font-bold text-surface-800 text-base">
                        <Icon icon="solar:settings-bold-duotone" width="20" className="text-surface-400" />
                        {t.settings.title}
                    </h3>

                    <div className="flex-1 space-y-6">
                        <div>
                            <p className="block mb-3 font-bold text-surface-500 text-xs uppercase tracking-wider">
                                {t.settings.flowLabel}
                            </p>
                            <div className="space-y-3">
                                <label className={`flex flex-col gap-1 p-4 rounded-xl border cursor-pointer transition-colors ${layoutMode === 'exact' ? 'border-brand-500 bg-brand-50 shadow-sm' : 'border-surface-200 hover:bg-surface-50'}`}>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="layoutMode"
                                            value="exact"
                                            checked={layoutMode === 'exact'}
                                            onChange={() => setLayoutMode('exact')}
                                            className="focus:ring-brand-500 text-brand-600"
                                        />
                                        <span className={`text-sm font-bold ${layoutMode === 'exact' ? 'text-brand-900' : 'text-surface-800'}`}>
                                            {t.settings.flowOptions.exact.title}
                                        </span>
                                    </div>
                                    <p className="pl-6 text-surface-500 text-xs leading-relaxed">
                                        {t.settings.flowOptions.exact.desc}
                                    </p>
                                </label>

                                <label className={`flex flex-col gap-1 p-4 rounded-xl border cursor-pointer transition-colors ${layoutMode === 'flowing' ? 'border-brand-500 bg-brand-50 shadow-sm' : 'border-surface-200 hover:bg-surface-50'}`}>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="radio"
                                            name="layoutMode"
                                            value="flowing"
                                            checked={layoutMode === 'flowing'}
                                            onChange={() => setLayoutMode('flowing')}
                                            className="focus:ring-brand-500 text-brand-600"
                                        />
                                        <span className={`text-sm font-bold ${layoutMode === 'flowing' ? 'text-brand-900' : 'text-surface-800'}`}>
                                            {t.settings.flowOptions.flowing.title}
                                        </span>
                                    </div>
                                    <p className="pl-6 text-surface-500 text-xs leading-relaxed">
                                        {t.settings.flowOptions.flowing.desc}
                                    </p>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-surface-100 border-t">
                        <button className="inline-flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 shadow-blue-600/20 shadow-lg px-6 py-3.5 rounded-xl w-full font-bold text-white text-sm active:scale-95 transition-all">
                            <Icon icon="solar:file-text-bold" width="18" />
                            {t.actions.convertButton}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};