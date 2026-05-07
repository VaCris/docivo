"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useLanguage } from "@/hooks/useLanguage";
import { FileUploader } from "@/features/files/components/FileUploader/FileUploader";
import { useBackendJob } from "@/hooks/useBackendJob";
import { toolsService } from "@/services/tools/tools.service";
import { PdfPreview } from "@/features/files/components/PdfPreview/PdfPreview";

export const PdfToWordTool = () => {
    const { t } = useLanguage();
    const strings = t.pdfToWord;

    const { run, isLoading } = useBackendJob();

    const [layoutMode, setLayoutMode] = useState<"exact" | "flowing">("exact");
    const [file, setFile] = useState<File | null>(null);

    const handleConvert = async () => {
        if (!file) return;

        await run({
            tool: "pdf-to-word",
            strings: strings.notifications,
            start: () => toolsService.pdfToWord.start(file),
            filename: (jobId) => `docivo-${jobId}.docx`,
        });
    };

    return (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
            <div className="mb-8">
                <h1 className="font-extrabold text-surface-900 text-2xl md:text-3xl tracking-tight">
                    {strings.header.title}
                </h1>
                <p className="mt-2 text-surface-500 text-sm md:text-base">
                    {strings.header.subtitle}
                </p>
            </div>

            <div className="flex lg:flex-row flex-col flex-1 gap-6 overflow-hidden">
                <div className="relative flex flex-col flex-1 justify-center items-center bg-surface-50 shadow-sm p-6 border border-surface-200 border-dashed rounded-2xl overflow-hidden">
                    {!file ? (
                        <div className="w-full max-w-md">
                            <FileUploader
                                accept="application/pdf"
                                onFiles={(files) => {
                                    const nextFile = files[0];
                                    if (nextFile) setFile(nextFile);
                                }}
                                title={strings.workspace.uploadTitle}
                                subtitle={strings.workspace.uploadHint}
                            />
                        </div>
                    ) : (
                        <>
                            <div className="top-6 right-6 left-6 z-10 absolute flex justify-between items-center bg-white shadow-sm p-4 border border-surface-200 rounded-xl">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <Icon
                                        icon="solar:file-bold-duotone"
                                        width="24"
                                        className="text-brand-600 shrink-0"
                                    />
                                    <div className="truncate">
                                        <p className="font-medium text-surface-500 text-xs">
                                            {strings.workspace.fileLoaded}
                                        </p>
                                        <p className="font-bold text-surface-800 text-sm truncate">
                                            {file.name}
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => setFile(null)}
                                    className="bg-surface-50 px-3 py-1.5 rounded-lg font-bold text-surface-500 hover:text-brand-600 text-xs transition-colors shrink-0"
                                >
                                    {strings.workspace.changeFile}
                                </button>
                            </div>

                            <div className="flex items-center gap-6 opacity-90 mt-12">
                                <PdfPreview file={file} scale={0.5} />

                                <Icon
                                    icon="solar:arrow-right-line-duotone"
                                    width="32"
                                    className="text-surface-300"
                                />

                                <div className="relative flex flex-col justify-center items-center bg-white shadow-md border border-brand-200 rounded-xl w-24 h-32 text-blue-600">
                                    <span className="top-2 right-2 absolute bg-blue-100 px-1.5 py-0.5 rounded font-bold text-[10px] text-blue-700">
                                        DOCX
                                    </span>
                                    <Icon icon="solar:document-bold" width="48" />
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="flex flex-col bg-white shadow-sm p-6 border border-surface-200 rounded-2xl w-full lg:w-80 shrink-0">
                    <h3 className="flex items-center gap-2 mb-6 font-bold text-surface-800 text-base">
                        <Icon icon="solar:settings-bold-duotone" width="20" className="text-surface-400" />
                        {strings.settings.title}
                    </h3>

                    <div className="flex-1 space-y-6">
                        <div>
                            <p className="block mb-3 font-bold text-surface-500 text-xs uppercase tracking-wider">
                                {strings.settings.flowLabel}
                            </p>

                            <div className="space-y-3">
                                {(["exact", "flowing"] as const).map((mode) => (
                                    <label
                                        key={mode}
                                        className={`flex flex-col gap-1 p-4 rounded-xl border cursor-pointer transition-colors ${
                                            layoutMode === mode
                                                ? "border-brand-500 bg-brand-50 shadow-sm"
                                                : "border-surface-200 hover:bg-surface-50"
                                        }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="layoutMode"
                                                value={mode}
                                                checked={layoutMode === mode}
                                                onChange={() => setLayoutMode(mode)}
                                                className="focus:ring-brand-500 text-brand-600"
                                            />
                                            <span
                                                className={`text-sm font-bold ${
                                                    layoutMode === mode
                                                        ? "text-brand-900"
                                                        : "text-surface-800"
                                                }`}
                                            >
                                                {strings.settings.flowOptions[mode].title}
                                            </span>
                                        </div>
                                        <p className="pl-6 text-surface-500 text-xs leading-relaxed">
                                            {strings.settings.flowOptions[mode].desc}
                                        </p>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-surface-100 border-t">
                        <button
                            onClick={handleConvert}
                            disabled={!file || isLoading}
                            className="inline-flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 shadow-blue-600/20 shadow-lg px-6 py-3.5 rounded-xl w-full font-bold text-white text-sm active:scale-95 transition-all disabled:cursor-not-allowed"
                        >
                            <Icon icon="solar:file-text-bold" width="18" />
                            {strings.actions.convertButton}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};