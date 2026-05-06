"use client";

import React from 'react';
import { Icon } from '@iconify/react';
import { useLanguage } from '@/hooks/useLanguage';
import { useJobs } from '@/hooks/useJobs';

import { STATUS_STYLES } from './RecentFiles.config';
import { mapJobStatusToUI } from "@/utils/jobStatus";

const TOOL_LABELS: Record<string, string> = {
    merge: "Merge",
    split: "Split",
    ocr: "OCR",
    "pdf-to-word": "PDF → Word",
    "image-to-pdf": "Image → PDF"
};

export const RecentFiles = () => {
    const { t } = useLanguage();

    const files = useJobs()
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, 10);

    return (
        <div className="bg-white shadow-sm border border-surface-200 rounded-2xl overflow-hidden">
            <div className="flex justify-between items-center bg-surface-0 px-6 py-5 border-surface-100 border-b">
                <div>
                    <h2 className="font-bold text-surface-900 text-lg">{t.recentFiles.title}</h2>
                    <p className="text-surface-500 text-sm">{t.recentFiles.subtitle}</p>
                </div>

                <button className="hover:bg-brand-50 p-2 rounded-lg text-surface-400 hover:text-brand-600 transition-colors">
                    <Icon icon="solar:menu-dots-bold" width="24" />
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">

                    <thead>
                        <tr className="bg-surface-50 border-surface-100 border-b font-semibold text-surface-500 text-xs uppercase tracking-wider">
                            <th className="px-6 py-4">{t.recentFiles.columns.name}</th>
                            <th className="px-6 py-4">{t.recentFiles.columns.tool}</th>
                            <th className="px-6 py-4">{t.recentFiles.columns.date}</th>
                            <th className="px-6 py-4">{t.recentFiles.columns.status}</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-surface-100">

                        {files.map((file) => (
                            <tr key={file.jobId} className="group hover:bg-surface-50/50 transition-colors">

                                <td className="px-6 py-4">
                                    <div>
                                        <p className="font-semibold text-surface-800 text-sm line-clamp-1">
                                            {file.jobId}
                                        </p>
                                        <p className="mt-0.5 font-mono text-surface-400 text-xs">
                                            {file.jobId}
                                        </p>
                                    </div>
                                </td>

                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center gap-1.5 bg-surface-100 px-2.5 py-1 rounded-md font-semibold text-surface-600 text-xs">
                                        {TOOL_LABELS[file.tool] ?? file.tool}
                                    </span>
                                </td>

                                <td className="px-6 py-4 text-surface-500 text-sm">
                                    {new Date(file.createdAt).toLocaleString()}
                                </td>

                                <td className="px-6 py-4">
                                    {(() => {
                                        const status = mapJobStatusToUI(file.status);

                                        return (
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${STATUS_STYLES[status]}`}>
                                                <span className="bg-current opacity-60 rounded-full w-1.5 h-1.5"></span>
                                                {t.recentFiles.status[status]}
                                            </span>
                                        );
                                    })()}
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
};