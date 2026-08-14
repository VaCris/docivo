"use client";

import React, { useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { useLanguage } from "@/hooks/useLanguage";
import { useClientImageToPdf } from "@/hooks/useClientImageToPdf";
import { FileUploader } from "@/features/files/components/FileUploader/FileUploader";
import type {
    ImageToPdfMargin,
    ImageToPdfOrientation,
    ImageToPdfPageSize,
} from "@/services/pdf/image-to-pdf.client";

type ImageItem = {
    id: string;
    file: File;
    previewUrl: string;
};

export const ImageToPdfTool = () => {
    const { t } = useLanguage();
    const strings = t.imageToPdf;

    const { run, isLoading } = useClientImageToPdf();

    const [images, setImages] = useState<ImageItem[]>([]);
    const [orientation, setOrientation] =
        useState<ImageToPdfOrientation>("portrait");
    const [pageSize, setPageSize] = useState<ImageToPdfPageSize>("a4");
    const [margin, setMargin] = useState<ImageToPdfMargin>("small");

    const files = useMemo(() => images.map((item) => item.file), [images]);

    const handleAddImages = (files: File[]) => {
        const validImages = files.filter((file) =>
            ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
                file.type
            )
        );

        setImages((prev) => {
            const existing = new Set(
                prev.map((item) => `${item.file.name}-${item.file.size}`)
            );

            const unique = validImages
                .filter((file) => !existing.has(`${file.name}-${file.size}`))
                .map((file) => ({
                    id: crypto.randomUUID(),
                    file,
                    previewUrl: URL.createObjectURL(file),
                }));

            return [...prev, ...unique];
        });
    };

    const handleRemove = (id: string) => {
        setImages((prev) => {
            const target = prev.find((item) => item.id === id);
            if (target) URL.revokeObjectURL(target.previewUrl);

            return prev.filter((item) => item.id !== id);
        });
    };

    const handleConvert = async () => {
        await run(files, {
            orientation,
            pageSize,
            margin,
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
                <div className="relative flex flex-col flex-1 bg-surface-0 shadow-sm p-6 border border-surface-200 rounded-2xl overflow-y-auto">
                    <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
                        {images.map((item) => (
                            <div
                                key={item.id}
                                className="group relative bg-surface-100 border border-surface-200 hover:border-brand-500 rounded-xl aspect-square overflow-hidden transition-all"
                            >
                                <img
                                    src={item.previewUrl}
                                    alt={item.file.name}
                                    className="w-full h-full object-cover"
                                />

                                <button
                                    onClick={() => handleRemove(item.id)}
                                    className="top-2 right-2 z-10 absolute flex justify-center items-center bg-surface-0/90 opacity-0 group-hover:opacity-100 shadow-sm backdrop-blur-sm border border-surface-200 rounded-full w-7 h-7 text-surface-500 hover:text-red-600 transition-opacity"
                                >
                                    <Icon
                                        icon="solar:trash-bin-trash-bold"
                                        width="14"
                                    />
                                </button>

                                <div className="right-0 bottom-0 left-0 absolute bg-gradient-to-t from-black/60 to-transparent p-3">
                                    <p className="font-medium text-white text-xs truncate">
                                        {item.file.name}
                                    </p>
                                </div>
                            </div>
                        ))}

                        <FileUploader
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            multiple
                            onFiles={handleAddImages}
                            title={strings.workspace.addMore}
                            subtitle="JPG, PNG, WebP"
                            className="aspect-square"
                        />
                    </div>
                </div>

                <div className="flex flex-col bg-surface-0 shadow-sm p-6 border border-surface-200 rounded-2xl w-full lg:w-80 overflow-y-auto shrink-0">
                    <h3 className="flex items-center gap-2 mb-6 font-bold text-surface-800 text-base">
                        <Icon
                            icon="solar:settings-bold-duotone"
                            width="20"
                            className="text-surface-400"
                        />
                        {strings.settings.title}
                    </h3>

                    <div className="flex-1 space-y-6">
                        <div>
                            <p className="block mb-3 font-bold text-surface-500 text-xs uppercase tracking-wider">
                                {strings.settings.orientationLabel}
                            </p>
                            <div className="gap-3 grid grid-cols-2">
                                <button
                                    onClick={() => setOrientation("portrait")}
                                    className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border-2 transition-colors ${
                                        orientation === "portrait"
                                            ? "border-brand-500 bg-brand-50 text-brand-700"
                                            : "border-surface-200 text-surface-500 hover:bg-surface-50"
                                    }`}
                                >
                                    <Icon icon="solar:document-linear" width="24" />
                                    <span className="font-bold text-xs">
                                        {strings.settings.orientation.portrait}
                                    </span>
                                </button>

                                <button
                                    onClick={() => setOrientation("landscape")}
                                    className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border-2 transition-colors ${
                                        orientation === "landscape"
                                            ? "border-brand-500 bg-brand-50 text-brand-700"
                                            : "border-surface-200 text-surface-500 hover:bg-surface-50"
                                    }`}
                                >
                                    <Icon
                                        icon="solar:document-linear"
                                        width="24"
                                        className="rotate-90"
                                    />
                                    <span className="font-bold text-xs">
                                        {strings.settings.orientation.landscape}
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-bold text-surface-500 text-xs uppercase tracking-wider">
                                {strings.settings.pageSizeLabel}
                            </label>
                            <div className="relative">
                                <select
                                    value={pageSize}
                                    onChange={(e) =>
                                        setPageSize(e.target.value as ImageToPdfPageSize)
                                    }
                                    className="bg-surface-50 px-4 py-3 pr-10 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 w-full font-medium text-surface-800 text-sm transition-colors appearance-none"
                                >
                                    <option value="fit">
                                        {strings.settings.sizes.fit}
                                    </option>
                                    <option value="a4">
                                        {strings.settings.sizes.a4}
                                    </option>
                                    <option value="letter">
                                        {strings.settings.sizes.letter}
                                    </option>
                                </select>
                                <Icon
                                    icon="solar:alt-arrow-down-linear"
                                    width="16"
                                    className="top-1/2 right-4 absolute text-surface-400 -translate-y-1/2 pointer-events-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-bold text-surface-500 text-xs uppercase tracking-wider">
                                {strings.settings.marginLabel}
                            </label>
                            <div className="relative">
                                <select
                                    value={margin}
                                    onChange={(e) =>
                                        setMargin(e.target.value as ImageToPdfMargin)
                                    }
                                    className="bg-surface-50 px-4 py-3 pr-10 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 w-full font-medium text-surface-800 text-sm transition-colors appearance-none"
                                >
                                    <option value="none">
                                        {strings.settings.margins.none}
                                    </option>
                                    <option value="small">
                                        {strings.settings.margins.small}
                                    </option>
                                    <option value="large">
                                        {strings.settings.margins.large}
                                    </option>
                                </select>
                                <Icon
                                    icon="solar:alt-arrow-down-linear"
                                    width="16"
                                    className="top-1/2 right-4 absolute text-surface-400 -translate-y-1/2 pointer-events-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-surface-100 border-t">
                        <button
                            onClick={handleConvert}
                            disabled={images.length === 0 || isLoading}
                            className="inline-flex justify-center items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 shadow-emerald-600/20 shadow-lg px-6 py-3.5 rounded-xl w-full font-sans font-bold text-white text-sm active:scale-95 transition-all disabled:cursor-not-allowed"
                        >
                            <Icon icon="solar:gallery-send-bold" width="18" />
                            {strings.actions.convertButton}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};