"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useLanguage } from "@/hooks/useLanguage";
import { useToolProcessFeedback } from "@/hooks/useToolProcessFeedback";
import { FileUploader } from "@/features/files/components/FileUploader/FileUploader";
import { useBackendJob } from "@/hooks/useBackendJob";
import { toolsService } from "@/services/tools/tools.service";
import { PdfPreview } from "@/features/files/components/PdfPreview/PdfPreview";
import { ToolProcessFeedback } from "@/components/feedback/ToolProcessFeedback/ToolProcessFeedback";

export const PdfToWordTool = () => {
    const { t } = useLanguage();
    const strings = t.pdfToWord;
    const { run, isLoading } = useBackendJob();
    const feedback = useToolProcessFeedback(strings.feedback);

    const [layoutMode, setLayoutMode] = useState<"exact" | "flowing">("exact");
    const [file, setFile] = useState<File | null>(null);

    const handleConvert = async () => {
        if (!file) return;

        await run({
            tool: "pdf-to-word",
            strings: strings.notifications,
            start: () => toolsService.pdfToWord.start(file),
            filename: (jobId) => `docivo-${jobId}.docx`,
            progress: feedback.callbacks,
        });
    };

    return (
        <div className="tool-accent-word flex flex-col h-[calc(100vh-8rem)]">
            <ToolProcessFeedback stage={feedback.stage} message={feedback.message} />

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
                            <div className="top-6 right-6 left-6 z-10 absolute flex justify-between items-center bg-surface-0 shadow-sm p-4 border border-surface-200 rounded-xl">
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="dashboard-tool-accent-surface flex justify-center items-center border rounded-lg w-9 h-9 shrink-0">
                                        <Icon icon="solar:file-bold-duotone" width="22" />
                                    </div>
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
                                    className="dashboard-tool-accent-text bg-surface-50 px-3 py-1.5 rounded-lg font-sans font-bold text-xs transition-colors shrink-0"
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

                                <div className="dashboard-tool-accent-surface relative flex flex-col justify-center items-center shadow-md border rounded-xl w-24 h-32">
                                    <span className="top-2 right-2 absolute bg-surface-0/80 px-1.5 py-0.5 border border-surface-200 rounded font-bold text-[10px]">
                                        DOCX
                                    </span>
                                    <Icon icon="solar:document-bold" width="48" />
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="dashboard-panel flex flex-col shadow-sm p-6 border rounded-2xl w-full lg:w-80 shrink-0">
                    <h3 className="flex items-center gap-2 mb-6 font-bold text-surface-800 text-base">
                        <Icon icon="solar:settings-bold-duotone" width="20" className="dashboard-tool-accent-text" />
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
                                        className={`flex flex-col gap-1 p-4 rounded-xl border cursor-pointer transition-colors ${layoutMode === mode ? "dashboard-tool-choice-selected shadow-sm" : "border-surface-200 hover:bg-surface-50"}`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <input
                                                type="radio"
                                                name="layoutMode"
                                                value={mode}
                                                checked={layoutMode === mode}
                                                onChange={() => setLayoutMode(mode)}
                                                className="dashboard-radio"
                                            />
                                            <span className={`text-sm font-bold ${layoutMode === mode ? "dashboard-tool-accent-text" : "text-surface-800"}`}>
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
                            className="dashboard-primary-action px-6 py-3.5 rounded-xl w-full font-sans font-bold text-sm"
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
