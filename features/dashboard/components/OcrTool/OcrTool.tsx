"use client";

import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useLanguage } from "@/hooks/useLanguage";
import { FileUploader } from "@/features/files/components/FileUploader/FileUploader";
import { PdfPreview } from "@/features/files/components/PdfPreview/PdfPreview";
import { useBackendJob } from "@/hooks/useBackendJob";
import { toolsService } from "@/services/tools/tools.service";

type OutputFormat = "searchablePdf" | "textPdf" | "word";

type JobConfig = {
    tool: string;
    start: () => Promise<{ job_id: string }>;
    filename: (jobId: string) => string;
};

export const OcrTool = () => {
    const { t } = useLanguage();
    const strings = t.ocr;

    const { run, isLoading } = useBackendJob();

    const [outputFormat, setOutputFormat] =
        useState<OutputFormat>("searchablePdf");

    const [file, setFile] = useState<File | null>(null);

    const handleRun = async () => {
        if (!file) return;

        const jobConfig = {
            searchablePdf: {
                tool: "ocr",
                start: () => toolsService.ocr.start(file),
                filename: (jobId: string) => `docivo-${jobId}.pdf`,
            },
            textPdf: {
                tool: "extract-text-pdf",
                start: () => toolsService.extractTextPdf.start(file),
                filename: (jobId: string) => `docivo-${jobId}.pdf`,
            },
            word: {
                tool: "ocr-to-word",
                start: () => toolsService.ocrToWord.start(file),
                filename: (jobId: string) => `docivo-${jobId}.docx`,
            },
        } satisfies Record<OutputFormat, JobConfig>;

        const selected = jobConfig[outputFormat];

        await run({
            tool: selected.tool,
            strings: strings.notifications,
            start: selected.start,
            filename: selected.filename,
        });
    };

    return (
        <div className="tool-accent-ocr flex flex-col h-[calc(100vh-8rem)]">
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
                                    const selectedFile = files[0];
                                    if (selectedFile) setFile(selectedFile);
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
                                        <Icon icon="solar:scanner-bold-duotone" width="22" />
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

                            <div className="mt-16">
                                <PdfPreview file={file} scale={0.7} />
                            </div>
                        </>
                    )}
                </div>

                <div className="dashboard-panel flex flex-col flex-shrink-0 shadow-sm p-6 border rounded-2xl w-full lg:w-80">
                    <h3 className="flex items-center gap-2 mb-6 font-bold text-surface-800 text-base">
                        <Icon
                            icon="solar:settings-bold-duotone"
                            width="20"
                            className="dashboard-tool-accent-text"
                        />
                        {strings.settings.title}
                    </h3>

                    <div className="flex-1 space-y-6">
                        <div>
                            <p className="block mb-3 font-bold text-surface-500 text-xs uppercase tracking-wider">
                                {strings.settings.formatLabel}
                            </p>

                            <div className="space-y-2">
                                {(["searchablePdf", "textPdf", "word"] as const).map(
                                    (format) => (
                                        <label
                                            key={format}
                                            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${outputFormat === format
                                                ? "dashboard-tool-choice-selected"
                                                : "border-surface-200 hover:bg-surface-50"
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="outputFormat"
                                                value={format}
                                                checked={outputFormat === format}
                                                onChange={() =>
                                                    setOutputFormat(format)
                                                }
                                                className="focus:ring-brand-500 text-brand-600"
                                            />

                                            <div className="flex flex-col">
                                                <span className={`text-sm font-semibold leading-tight ${outputFormat === format ? "dashboard-tool-accent-text" : "text-surface-700"}`}>
                                                    {strings.settings.formats[format]}
                                                </span>
                                            </div>
                                        </label>
                                    )
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-surface-100 border-t">
                        <button
                            onClick={handleRun}
                            disabled={!file || isLoading}
                            className="dashboard-primary-action px-6 py-3.5 rounded-xl w-full font-sans font-bold text-sm"
                        >
                            <Icon icon="solar:eye-scan-bold" width="18" />
                            {strings.actions.recognizeText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
