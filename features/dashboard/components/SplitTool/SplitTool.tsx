"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useLanguage } from "@/hooks/useLanguage";
import { useClientSplit } from "@/hooks/useClientSplit";
import { PdfPreview } from "@/features/files/components/PdfPreview/PdfPreview";
import { FileUploader } from "@/features/files/components/FileUploader/FileUploader";

export const SplitTool = () => {
    const { t } = useLanguage();
    const strings = t.split;

    const { run, isLoading } = useClientSplit();

    const [file, setFile] = useState<File | null>(null);
    const [totalPages, setTotalPages] = useState(0);
    const [orderedPages, setOrderedPages] = useState<number[]>([]);
    const [selectedPages, setSelectedPages] = useState<number[]>([]);
    const [dragIndex, setDragIndex] = useState<number | null>(null);
    const [mode, setMode] = useState<"extract" | "separate">("extract");

    useEffect(() => {
        if (!file) return;

        const load = async () => {
            const pdfjs = await import("pdfjs-dist/legacy/build/pdf");

            pdfjs.GlobalWorkerOptions.workerSrc = new URL(
                "pdfjs-dist/build/pdf.worker.min.mjs",
                import.meta.url
            ).toString();

            const buffer = await file.arrayBuffer();
            const pdf = await pdfjs.getDocument({ data: buffer }).promise;
            const loadedPages = Array.from(
                { length: pdf.numPages },
                (_, index) => index + 1
            );

            setTotalPages(pdf.numPages);
            setOrderedPages(loadedPages);
            setSelectedPages([]);
        };

        load();
    }, [file]);

    const togglePage = (page: number) => {
        setSelectedPages((prev) =>
            prev.includes(page)
                ? prev.filter((p) => p !== page)
                : [...prev, page]
        );
    };

    const handleDragStart = (index: number) => {
        setDragIndex(index);
    };

    const handleDragEnter = (index: number) => {
        if (dragIndex === null || dragIndex === index) return;

        setOrderedPages((prev) => {
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

    const handleRun = () => {
        if (!file) return;

        const orderedSelection = orderedPages.filter((page) =>
            selectedPages.includes(page)
        );

        run(file, orderedSelection, mode);
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
                <div className="relative flex flex-col flex-1 bg-white shadow-sm p-6 border border-surface-200 rounded-2xl overflow-y-auto">
                    <FileUploader
                        accept="application/pdf"
                        onFiles={(files) => {
                            const nextFile = files[0];
                            if (nextFile) setFile(nextFile);
                        }}
                    />

                    <div className="flex justify-between items-center mt-6 mb-6 pb-4 border-surface-100 border-b" />

                    <div className="flex justify-between items-center mb-6 pb-4 border-surface-100 border-b">
                        <div className="flex items-center gap-3">
                            <div className="flex justify-center items-center bg-brand-50 rounded-xl w-10 h-10">
                                <Icon
                                    icon="solar:file-bold-duotone"
                                    width="24"
                                    className="text-brand-600"
                                />
                            </div>

                            <div>
                                <p className="font-bold text-surface-800 text-sm">
                                    {file?.name || strings.workspace.fileNameLabel}
                                </p>
                                <p className="text-surface-500 text-xs">
                                    {file
                                        ? strings.workspace.pageCount.replace(
                                              "{count}",
                                              String(totalPages)
                                          )
                                        : strings.workspace.pageCountLabel}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={() => setSelectedPages(orderedPages)}
                                className="bg-brand-50 px-3 py-1.5 rounded-lg font-semibold text-brand-600 hover:text-brand-700 text-xs transition-colors"
                            >
                                {strings.workspace.selectAll}
                            </button>

                            <button
                                type="button"
                                onClick={() => setSelectedPages([])}
                                className="bg-surface-50 px-3 py-1.5 rounded-lg font-semibold text-surface-500 hover:text-red-600 text-xs transition-colors"
                            >
                                {strings.workspace.clearSelection}
                            </button>
                        </div>
                    </div>

                    <div className="gap-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 pb-6">
                        {orderedPages.map((page, index) => {
                            const isSelected = selectedPages.includes(page);

                            return (
                                <div
                                    key={page}
                                    draggable
                                    onDragStart={() => handleDragStart(index)}
                                    onDragEnter={() => handleDragEnter(index)}
                                    onDragEnd={handleDragEnd}
                                    onDragOver={(event) => event.preventDefault()}
                                    onClick={() => togglePage(page)}
                                    className={`relative cursor-move group flex flex-col items-center transition-all ${
                                        isSelected
                                            ? "scale-[0.98]"
                                            : "hover:scale-[1.02]"
                                    }`}
                                >
                                    <div
                                        className={`w-full aspect-[1/1.4] rounded-xl flex items-center justify-center shadow-sm transition-all border-2 ${
                                            isSelected
                                                ? "bg-brand-50 border-brand-500 shadow-brand-500/20"
                                                : "bg-white border-surface-200 group-hover:border-surface-300"
                                        }`}
                                    >
                                        <div className="-top-2 -left-2 z-20 absolute flex justify-center items-center bg-surface-800 rounded-full w-6 h-6 font-bold text-white text-xs">
                                            {index + 1}
                                        </div>

                                        <div
                                            className={`absolute top-3 left-3 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                                                isSelected
                                                    ? "bg-brand-500 text-white scale-100"
                                                    : "bg-surface-100 border border-surface-200 text-transparent opacity-0 group-hover:opacity-100 scale-90"
                                            }`}
                                        >
                                            <Icon
                                                icon="solar:check-read-linear"
                                                width="14"
                                            />
                                        </div>

                                        {file && (
                                            <PdfPreview file={file} page={page} />
                                        )}
                                    </div>

                                    <p
                                        className={`mt-3 text-xs font-bold transition-colors ${
                                            isSelected
                                                ? "text-brand-600"
                                                : "text-surface-500"
                                        }`}
                                    >
                                        Page {page}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex flex-col bg-white shadow-sm p-6 border border-surface-200 rounded-2xl w-full lg:w-80 shrink-0">
                    <h3 className="mb-6 font-bold text-surface-800 text-base">
                        {strings.sidebar.title}
                    </h3>

                    <div className="flex-1 space-y-6">
                        <div>
                            <p className="mb-3 font-bold text-surface-500 text-xs uppercase tracking-wider">
                                {strings.sidebar.modeLabel}
                            </p>

                            <div className="space-y-2">
                                <label
                                    className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer border transition-colors ${
                                        mode === "extract"
                                            ? "bg-brand-50 border-2 border-brand-500"
                                            : "hover:bg-surface-50 border-surface-200"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        checked={mode === "extract"}
                                        onChange={() => setMode("extract")}
                                        className="mt-1"
                                    />
                                    <span
                                        className={`text-sm ${
                                            mode === "extract"
                                                ? "font-semibold text-brand-900"
                                                : "font-medium text-surface-600"
                                        }`}
                                    >
                                        {strings.sidebar.modes.extract}
                                    </span>
                                </label>

                                <label
                                    className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer border transition-colors ${
                                        mode === "separate"
                                            ? "bg-brand-50 border-2 border-brand-500"
                                            : "hover:bg-surface-50 border-surface-200"
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        checked={mode === "separate"}
                                        onChange={() => setMode("separate")}
                                        className="mt-1"
                                    />
                                    <span
                                        className={`text-sm ${
                                            mode === "separate"
                                                ? "font-semibold text-brand-900"
                                                : "font-medium text-surface-600"
                                        }`}
                                    >
                                        {strings.sidebar.modes.separate}
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <p className="mb-3 font-bold text-surface-500 text-xs uppercase tracking-wider">
                                {strings.sidebar.rangeLabel}
                            </p>
                            <div className="bg-surface-50 px-4 py-2.5 border border-surface-200 rounded-xl w-full min-h-10 font-mono text-surface-700 text-sm">
                                {orderedPages
                                    .filter((page) => selectedPages.includes(page))
                                    .join(", ") || "—"}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-surface-100 border-t">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-surface-500 text-sm">
                                {strings.sidebar.summary}
                            </span>
                            <span className="bg-brand-50 px-2 py-0.5 rounded-md font-bold text-brand-600 text-sm">
                                {selectedPages.length}
                            </span>
                        </div>

                        <button
                            type="button"
                            onClick={handleRun}
                            disabled={!file || selectedPages.length === 0 || isLoading}
                            className="inline-flex justify-center items-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-50 px-6 py-3.5 rounded-xl w-full font-bold text-white text-sm"
                        >
                            <Icon icon="solar:scissors-bold" width="18" />
                            {strings.actions.splitButton}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
