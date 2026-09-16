"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { useLanguage } from "@/hooks/useLanguage";
import { useClientMerge } from "@/hooks/useClientMerge";
import { PdfPreview } from "@/features/files/components/PdfPreview/PdfPreview";

type FileItem = {
    id: string;
    file: File;
};

const previewCache = new Set<string>();

export const MergeTool = () => {
    const { t } = useLanguage();
    const strings = t.merge;
    const { run, isLoading } = useClientMerge();

    const [files, setFiles] = useState<FileItem[]>([]);
    const [dragIndex, setDragIndex] = useState<number | null>(null);

    const handleAddFiles = (newFiles: File[]) => {
        const valid = newFiles.filter(f => f.type === "application/pdf");

        setFiles(prev => {
            const existing = new Set(prev.map(f => f.file.name));

            const unique = valid
                .filter(f => !existing.has(f.name))
                .map(f => ({
                    id: crypto.randomUUID(),
                    file: f
                }));

            return [...prev, ...unique];
        });
    };

    const handleRemove = (id: string) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    const handleClear = () => {
        setFiles([]);
        previewCache.clear();
    };

    const handleMerge = async () => {
        await run(files.map(f => f.file));
        setFiles([]);
        previewCache.clear();
    };

    const handleDragStart = (index: number) => {
        setDragIndex(index);
    };

    const handleDragEnter = (index: number) => {
        if (dragIndex === null || dragIndex === index) return;

        setFiles(prev => {
            const updated = [...prev];
            const [moved] = updated.splice(dragIndex, 1);
            updated.splice(index, 0, moved);
            return updated;
        });

        setDragIndex(index);
    };

    const handleDragEnd = () => {
        setDragIndex(null);
    };

    return (
        <div className="tool-accent-merge flex flex-col h-[calc(100vh-8rem)]">
            <div className="mb-8">
                <h1 className="font-extrabold text-surface-900 text-2xl md:text-3xl tracking-tight">
                    {strings.header.title}
                </h1>
                <p className="mt-2 text-surface-500 text-sm md:text-base">
                    {strings.header.subtitle}
                </p>
            </div>

            <div className="dashboard-panel relative flex flex-col flex-1 shadow-sm p-6 border rounded-2xl overflow-hidden">
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={handleClear}
                        className="font-semibold text-surface-500 hover:text-red-600 text-sm transition-colors"
                    >
                        {strings.actions.clearAll}
                    </button>
                </div>

                <div className="gap-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mb-8">
                    {files.map((item, index) => (
                        <div
                            key={item.id}
                            draggable
                            onDragStart={() => handleDragStart(index)}
                            onDragEnter={() => handleDragEnter(index)}
                            onDragEnd={handleDragEnd}
                            className="dashboard-tool-accent-hover group relative flex flex-col justify-center items-center bg-surface-50 hover:shadow-md p-4 border border-surface-200 rounded-xl text-center transition-all cursor-move"
                        >
                            <div className="dashboard-tool-accent-surface -top-2 -left-2 z-10 absolute flex justify-center items-center border rounded-full w-6 h-6 font-bold text-xs">
                                {index + 1}
                            </div>

                            <button
                                onClick={() => handleRemove(item.id)}
                                className="-top-2 -right-2 z-10 absolute flex justify-center items-center bg-surface-0 opacity-0 group-hover:opacity-100 shadow-sm border border-surface-200 rounded-full w-6 h-6 text-surface-400 hover:text-red-600 transition-opacity"
                            >
                                <Icon icon="solar:close-circle-bold" width="16" />
                            </button>

                            <PdfPreview file={item.file} />

                            <p className="px-1 w-full font-semibold text-surface-700 text-xs truncate">
                                {item.file.name}
                            </p>

                            <p className="mt-1 font-mono text-[10px] text-surface-400">
                                {(item.file.size / 1000).toFixed(1)} KB
                            </p>
                        </div>
                    ))}

                    <label className="dashboard-tool-accent-hover group flex flex-col justify-center items-center p-4 border-2 border-surface-300 border-dashed rounded-xl min-h-[140px] transition-all cursor-pointer">
                        <input
                            type="file"
                            multiple
                            accept="application/pdf"
                            className="hidden"
                            onChange={(e) => {
                                if (!e.target.files) return;
                                handleAddFiles(Array.from(e.target.files));
                                e.target.value = "";
                            }}
                        />

                        <div className="dashboard-tool-accent-surface flex justify-center items-center mb-2 border rounded-full w-10 h-10 transition-colors">
                            <Icon
                                icon="solar:add-circle-linear"
                                width="24"
                            />
                        </div>

                        <p className="dashboard-tool-accent-text font-bold text-xs">
                            {strings.workspace.addMore}
                        </p>

                        <p className="mt-0.5 text-[10px] text-surface-400">
                            {strings.workspace.dropHint}
                        </p>
                    </label>
                </div>

                <div className="flex justify-end mt-auto pt-6 border-surface-100 border-t">
                    <button
                        onClick={handleMerge}
                        disabled={isLoading}
                        className="dashboard-primary-action px-8 py-3 rounded-xl font-sans font-bold text-sm"
                    >
                        <Icon icon="solar:layers-minimalistic-bold" width="18" />
                        {strings.actions.mergeButton}
                    </button>
                </div>
            </div>
        </div>
    );
};
