"use client";

import React from 'react';
import { Icon } from '@iconify/react';
import { useLanguage } from '@/hooks/useLanguage';

import enData from '@/locales/en/recentFiles.json';
import esData from '@/locales/es/recentFiles.json';
import { MOCK_RECENT_FILES, STATUS_STYLES } from './RecentFiles.config';

export const RecentFiles = () => {
    const { currentLang } = useLanguage();
    const t = currentLang === 'en' ? enData : esData;

    return (
        <div className="bg-white shadow-sm border border-surface-200 rounded-2xl overflow-hidden">
            <div className="flex justify-between items-center bg-surface-0 px-6 py-5 border-surface-100 border-b">
                <div>
                    <h2 className="font-bold text-surface-900 text-lg">{t.title}</h2>
                    <p className="text-surface-500 text-sm">{t.subtitle}</p>
                </div>
                <button className="hover:bg-brand-50 p-2 rounded-lg text-surface-400 hover:text-brand-600 transition-colors">
                    <Icon icon="solar:menu-dots-bold" width="24" />
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-surface-50 border-surface-100 border-b font-semibold text-surface-500 text-xs uppercase tracking-wider">
                            <th className="px-6 py-4">{t.columns.name}</th>
                            <th className="px-6 py-4">{t.columns.tool}</th>
                            <th className="px-6 py-4">{t.columns.date}</th>
                            <th className="px-6 py-4">{t.columns.size}</th>
                            <th className="px-6 py-4">{t.columns.status}</th>
                            <th className="px-6 py-4 text-right">{t.columns.actions}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-surface-100">
                        {MOCK_RECENT_FILES.map((file) => (
                            <tr key={file.id} className="group hover:bg-surface-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex justify-center items-center bg-surface-100 rounded-xl w-10 h-10 shrink-0">
                                            <Icon icon={file.icon} width="20" className="text-brand-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-surface-800 text-sm line-clamp-1">{file.name}</p>
                                            <p className="mt-0.5 font-mono text-surface-400 text-xs">{file.id}</p>
                                        </div>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center gap-1.5 bg-surface-100 px-2.5 py-1 rounded-md font-semibold text-surface-600 text-xs">
                                        {file.toolLabel}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-surface-500 text-sm">
                                    {file.date}
                                </td>

                                <td className="px-6 py-4 font-medium text-surface-600 text-sm">
                                    {file.size}
                                </td>

                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${STATUS_STYLES[file.status as keyof typeof STATUS_STYLES]}`}>
                                        <span className="bg-current opacity-60 rounded-full w-1.5 h-1.5"></span>
                                        {t.status[file.status as keyof typeof t.status]}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="hover:bg-brand-50 p-2 rounded-lg text-surface-400 hover:text-brand-600 transition-colors" aria-label="Download">
                                            <Icon icon="solar:download-square-linear" width="20" />
                                        </button>
                                        <button className="hover:bg-red-50 p-2 rounded-lg text-surface-400 hover:text-red-600 transition-colors" aria-label="Delete">
                                            <Icon icon="solar:trash-bin-trash-linear" width="20" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};