"use client";

import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { useLanguage } from '@/hooks/useLanguage';

import enData from '@/locales/en/split.json';
import esData from '@/locales/es/split.json';

const MOCK_PAGES = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    number: i + 1,
}));

export const SplitTool = () => {
    const { currentLang } = useLanguage();
    const t = currentLang === 'en' ? enData : esData;

    const [selectedPages, setSelectedPages] = useState<number[]>([1, 2, 4]);

    const togglePage = (pageNumber: number) => {
        setSelectedPages(prev =>
            prev.includes(pageNumber)
                ? prev.filter(p => p !== pageNumber)
                : [...prev, pageNumber]
        );
    };

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
                    <div className="flex justify-between items-center mb-6 pb-4 border-surface-100 border-b">
                        <div className="flex items-center gap-3">
                            <div className="flex justify-center items-center bg-brand-50 rounded-xl w-10 h-10">
                                <Icon icon="solar:file-bold-duotone" width="24" className="text-brand-600" />
                            </div>
                            <div>
                                <p className="font-bold text-surface-800 text-sm">{t.workspace.fileName}</p>
                                <p className="text-surface-500 text-xs">{t.workspace.pageCount}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setSelectedPages(MOCK_PAGES.map(p => p.id))}
                                className="bg-brand-50 px-3 py-1.5 rounded-lg font-semibold text-brand-600 hover:text-brand-700 text-xs transition-colors"
                            >
                                {t.workspace.selectAll}
                            </button>
                            <button
                                onClick={() => setSelectedPages([])}
                                className="bg-surface-50 px-3 py-1.5 rounded-lg font-semibold text-surface-500 hover:text-red-600 text-xs transition-colors"
                            >
                                {t.workspace.clearSelection}
                            </button>
                        </div>
                    </div>

                    <div className="gap-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 pb-6">
                        {MOCK_PAGES.map((page) => {
                            const isSelected = selectedPages.includes(page.id);

                            return (
                                <div
                                    key={page.id}
                                    onClick={() => togglePage(page.id)}
                                    className={`relative cursor-pointer group flex flex-col items-center transition-all ${isSelected ? 'scale-[0.98]' : 'hover:scale-[1.02]'
                                        }`}
                                >
                                    <div className={`w-full aspect-[1/1.4] rounded-xl flex items-center justify-center shadow-sm transition-all border-2 ${isSelected
                                            ? 'bg-brand-50 border-brand-500 shadow-brand-500/20'
                                            : 'bg-white border-surface-200 group-hover:border-surface-300'
                                        }`}>
                                        <div className={`absolute top-3 left-3 w-6 h-6 rounded-full flex items-center justify-center transition-all ${isSelected
                                                ? 'bg-brand-500 text-white scale-100'
                                                : 'bg-surface-100 border border-surface-200 text-transparent opacity-0 group-hover:opacity-100 scale-90'
                                            }`}>
                                            <Icon icon="solar:check-read-linear" width="14" />
                                        </div>

                                        <Icon icon="solar:document-text-linear" width="32" className={isSelected ? 'text-brand-300' : 'text-surface-300'} />
                                    </div>

                                    <p className={`mt-3 text-xs font-bold transition-colors ${isSelected ? 'text-brand-600' : 'text-surface-500'
                                        }`}>
                                        Page {page.number}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex flex-col bg-white shadow-sm p-6 border border-surface-200 rounded-2xl w-full lg:w-80 shrink-0">
                    <h3 className="mb-6 font-bold text-surface-800 text-base">{t.sidebar.title}</h3>

                    <div className="flex-1 space-y-6">
                        <div>
                            <p className="mb-3 font-bold text-surface-500 text-xs uppercase tracking-wider">{t.sidebar.modeLabel}</p>
                            <div className="space-y-2">
                                <label className="flex items-start gap-3 bg-brand-50 p-3 border-2 border-brand-500 rounded-xl cursor-pointer">
                                    <input type="radio" name="splitMode" defaultChecked className="mt-1 focus:ring-brand-500 text-brand-600" />
                                    <span className="font-semibold text-brand-900 text-sm leading-tight">
                                        {t.sidebar.modes.extract}
                                    </span>
                                </label>
                                <label className="flex items-start gap-3 hover:bg-surface-50 p-3 border border-surface-200 rounded-xl transition-colors cursor-pointer">
                                    <input type="radio" name="splitMode" className="mt-1 text-surface-400" />
                                    <span className="font-medium text-surface-600 text-sm leading-tight">
                                        {t.sidebar.modes.separate}
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <p className="mb-3 font-bold text-surface-500 text-xs uppercase tracking-wider">{t.sidebar.rangeLabel}</p>
                            <input
                                type="text"
                                placeholder="1, 3, 5-8"
                                className="bg-surface-50 px-4 py-2.5 border border-surface-200 focus:border-brand-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 w-full font-mono text-surface-800 text-sm transition-all"
                                value={selectedPages.sort((a, b) => a - b).join(', ')}
                                readOnly
                            />
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-surface-100 border-t">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-surface-500 text-sm">{t.sidebar.summary}</span>
                            <span className="bg-brand-50 px-2 py-0.5 rounded-md font-bold text-brand-600 text-sm">
                                {selectedPages.length}
                            </span>
                        </div>
                        <button
                            className="inline-flex justify-center items-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 shadow-brand-500/20 shadow-lg px-6 py-3.5 rounded-xl w-full font-bold text-white text-sm active:scale-95 transition-all disabled:cursor-not-allowed"
                            disabled={selectedPages.length === 0}
                        >
                            <Icon icon="solar:scissors-bold" width="18" />
                            {t.actions.splitButton}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};