"use client";

import React from 'react';
import { Icon } from '@iconify/react';
import { useLanguage } from '@/hooks/useLanguage';

import enData from '@/locales/en/merge.json';
import esData from '@/locales/es/merge.json';

const MOCK_FILES = [
    { id: '1', key: 'file1', pages: 12, size: '1.2 MB' },
    { id: '2', key: 'file2', pages: 4, size: '450 KB' },
    { id: '3', key: 'file3', pages: 8, size: '890 KB' },
];

export const MergeTool = () => {
    const { currentLang } = useLanguage();
    const t = currentLang === 'en' ? enData : esData;

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

            <div className="relative flex flex-col flex-1 bg-white shadow-sm p-6 border border-surface-200 rounded-2xl overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                    <button className="font-semibold text-surface-500 hover:text-red-600 text-sm transition-colors">
                        {t.actions.clearAll}
                    </button>
                </div>

                <div className="gap-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mb-8">
                    {MOCK_FILES.map((file, index) => (
                        <div
                            key={file.id}
                            className="group relative flex flex-col justify-center items-center bg-surface-50 hover:shadow-md p-4 border border-surface-200 hover:border-brand-400 rounded-xl text-center transition-all cursor-move"
                        >
                            <div className="-top-2 -left-2 z-10 absolute flex justify-center items-center bg-surface-800 rounded-full w-6 h-6 font-bold text-white text-xs">
                                {index + 1}
                            </div>

                            <button className="-top-2 -right-2 z-10 absolute flex justify-center items-center bg-white opacity-0 group-hover:opacity-100 shadow-sm border border-surface-200 rounded-full w-6 h-6 text-surface-400 hover:text-red-600 transition-opacity">
                                <Icon icon="solar:close-circle-bold" width="16" />
                            </button>

                            <Icon icon="solar:file-bold-duotone" width="48" className="mb-3 text-brand-500" />

                            <p className="px-1 w-full font-semibold text-surface-700 text-xs truncate">
                                {t.mockFiles[file.key as keyof typeof t.mockFiles]}
                            </p>
                            <p className="mt-1 font-mono text-[10px] text-surface-400">
                                {file.pages} pages • {file.size}
                            </p>
                        </div>
                    ))}

                    <button className="group flex flex-col justify-center items-center hover:bg-brand-50 p-4 border-2 border-surface-300 hover:border-brand-500 border-dashed rounded-xl min-h-[140px] transition-colors">
                        <div className="flex justify-center items-center bg-surface-100 group-hover:bg-brand-100 mb-2 rounded-full w-10 h-10 transition-colors">
                            <Icon icon="solar:add-circle-linear" width="24" className="text-surface-500 group-hover:text-brand-600" />
                        </div>
                        <p className="font-bold text-surface-600 group-hover:text-brand-700 text-xs">
                            {t.workspace.addMore}
                        </p>
                        <p className="mt-0.5 text-[10px] text-surface-400">
                            {t.workspace.dropHint}
                        </p>
                    </button>
                </div>

                <div className="flex justify-end mt-auto pt-6 border-surface-100 border-t">
                    <button className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 shadow-brand-500/20 shadow-lg px-8 py-3 rounded-xl font-bold text-white text-sm active:scale-95 transition-all">
                        <Icon icon="solar:layers-minimalistic-bold" width="18" />
                        {t.actions.mergeButton}
                    </button>
                </div>
            </div>
        </div>
    );
};