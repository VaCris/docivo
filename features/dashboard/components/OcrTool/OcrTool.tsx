"use client";

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useLanguage } from '@/hooks/useLanguage';

import enData from '@/locales/en/ocr.json';
import esData from '@/locales/es/ocr.json';

export const OcrTool = () => {
    const { currentLang } = useLanguage();
    const t = currentLang === 'en' ? enData : esData;

    const [docLanguage, setDocLanguage] = useState('eng');
    const [outputFormat, setOutputFormat] = useState('searchablePdf');

    const mockFile = "Scanned_Invoice_001.pdf";

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
                            <Icon icon="solar:scanner-bold-duotone" width="24" className="text-brand-600 shrink-0" />
                            <div className="truncate">
                                <p className="font-medium text-surface-500 text-xs">{t.workspace.fileLoaded}</p>
                                <p className="font-bold text-surface-800 text-sm truncate">{mockFile}</p>
                            </div>
                        </div>
                        <button className="bg-surface-50 px-3 py-1.5 rounded-lg font-bold text-surface-500 hover:text-brand-600 text-xs transition-colors shrink-0">
                            {t.workspace.changeFile}
                        </button>
                    </div>

                    <div className="flex flex-col gap-4 bg-white opacity-80 shadow-md blur-[0.5px] mt-16 p-8 border border-surface-200 rounded-lg w-full max-w-sm aspect-[1/1.4] filter contrast-125">
                        <div className="bg-surface-200 rounded w-3/4 h-6"></div>
                        <div className="bg-surface-100 mt-4 rounded w-full h-3"></div>
                        <div className="bg-surface-100 rounded w-5/6 h-3"></div>
                        <div className="bg-surface-100 rounded w-full h-3"></div>
                        <div className="bg-surface-100 rounded w-4/5 h-3"></div>
                        <div className="bg-surface-100 mx-auto mt-8 rounded w-1/2 h-32"></div>
                    </div>

                    <div className="hidden top-0 left-0 absolute bg-brand-500 opacity-50 shadow-[0_0_15px_rgba(20,184,166,0.8)] w-full h-1"></div>
                </div>

                <div className="flex flex-col flex-shrink-0 bg-white shadow-sm p-6 border border-surface-200 rounded-2xl w-full lg:w-80">
                    <h3 className="flex items-center gap-2 mb-6 font-bold text-surface-800 text-base">
                        <Icon icon="solar:settings-bold-duotone" width="20" className="text-surface-400" />
                        {t.settings.title}
                    </h3>

                    <div className="flex-1 space-y-6">
                        <div>
                            <label className="block mb-2 font-bold text-surface-500 text-xs uppercase tracking-wider">
                                {t.settings.languageLabel}
                            </label>
                            <div className="relative">
                                <select
                                    value={docLanguage}
                                    onChange={(e) => setDocLanguage(e.target.value)}
                                    className="bg-surface-50 px-4 py-3 pr-10 border border-surface-200 focus:border-brand-500 rounded-xl focus:ring-2 focus:ring-brand-500 w-full font-medium text-surface-800 text-sm transition-colors appearance-none"
                                >
                                    {Object.entries(t.settings.languages).map(([key, value]) => (
                                        <option key={key} value={key}>{value}</option>
                                    ))}
                                </select>
                                <Icon icon="solar:alt-arrow-down-linear" width="16" className="top-1/2 right-4 absolute text-surface-400 -translate-y-1/2 pointer-events-none" />
                            </div>
                        </div>

                        <div>
                            <p className="block mb-3 font-bold text-surface-500 text-xs uppercase tracking-wider">
                                {t.settings.formatLabel}
                            </p>
                            <div className="space-y-2">
                                <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${outputFormat === 'searchablePdf' ? 'border-brand-500 bg-brand-50' : 'border-surface-200 hover:bg-surface-50'}`}>
                                    <input
                                        type="radio"
                                        name="outputFormat"
                                        value="searchablePdf"
                                        checked={outputFormat === 'searchablePdf'}
                                        onChange={(e) => setOutputFormat(e.target.value)}
                                        className="focus:ring-brand-500 text-brand-600"
                                    />
                                    <div className="flex flex-col">
                                        <span className={`text-sm font-semibold leading-tight ${outputFormat === 'searchablePdf' ? 'text-brand-900' : 'text-surface-700'}`}>
                                            {t.settings.formats.searchablePdf}
                                        </span>
                                    </div>
                                </label>

                                <label className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${outputFormat === 'plainText' ? 'border-brand-500 bg-brand-50' : 'border-surface-200 hover:bg-surface-50'}`}>
                                    <input
                                        type="radio"
                                        name="outputFormat"
                                        value="plainText"
                                        checked={outputFormat === 'plainText'}
                                        onChange={(e) => setOutputFormat(e.target.value)}
                                        className="focus:ring-brand-500 text-brand-600"
                                    />
                                    <div className="flex flex-col">
                                        <span className={`text-sm font-semibold leading-tight ${outputFormat === 'plainText' ? 'text-brand-900' : 'text-surface-700'}`}>
                                            {t.settings.formats.plainText}
                                        </span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-surface-100 border-t">
                        <button className="inline-flex justify-center items-center gap-2 bg-amber-500 hover:bg-amber-600 shadow-amber-500/20 shadow-lg px-6 py-3.5 rounded-xl w-full font-bold text-white text-sm active:scale-95 transition-all">
                            <Icon icon="solar:eye-scan-bold" width="18" />
                            {t.actions.recognizeText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};