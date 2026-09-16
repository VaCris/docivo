"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useLanguage } from "@/hooks/useLanguage";

type Props = {
    accept: string;
    multiple?: boolean;
    onFiles: (files: File[]) => void;
    title?: string;
    subtitle?: string;
    className?: string;
};

const FILE_PREPARE_MS = 550;

export const FileUploader = ({
    accept,
    multiple = false,
    onFiles,
    title,
    subtitle,
    className = "",
}: Props) => {
    const { t, currentLang } = useLanguage();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const prepareTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [isPreparing, setIsPreparing] = useState(false);

    const defaultTitle = t.dropzone?.heading.title || "Upload file";
    const defaultSubtitle = t.dropzone?.heading.subtitle || "PDF only";
    const resolvedTitle = title || defaultTitle;
    const preparingLabel = currentLang === "es"
        ? multiple ? "Preparando archivos..." : "Preparando archivo..."
        : multiple ? "Preparing files..." : "Preparing file...";

    useEffect(() => {
        return () => {
            if (prepareTimerRef.current) {
                clearTimeout(prepareTimerRef.current);
            }
        };
    }, []);

    const handleSelectedFiles = (files: File[]) => {
        if (files.length === 0) return;

        if (prepareTimerRef.current) {
            clearTimeout(prepareTimerRef.current);
        }

        setIsPreparing(true);
        prepareTimerRef.current = setTimeout(() => {
            prepareTimerRef.current = null;
            onFiles(files);
            setIsPreparing(false);
        }, FILE_PREPARE_MS);
    };

    return (
        <label
            role="button"
            tabIndex={isPreparing ? -1 : 0}
            aria-label={resolvedTitle}
            aria-busy={isPreparing}
            aria-disabled={isPreparing}
            onKeyDown={(event) => {
                if (isPreparing) return;

                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    inputRef.current?.click();
                }
            }}
            className={`
                dashboard-uploader
                group flex flex-col justify-center items-center
                hover:bg-brand-500/5 dark:hover:bg-brand-300/10
                p-6
                border-2 border-dashed border-surface-300 hover:border-brand-500 dark:hover:border-brand-300
                rounded-xl
                transition-all duration-200
                w-full
                ${isPreparing ? "cursor-wait opacity-90" : "cursor-pointer"}
                ${className}
            `}
        >
            <input
                ref={inputRef}
                type="file"
                accept={accept}
                multiple={multiple}
                disabled={isPreparing}
                tabIndex={-1}
                className="sr-only"
                onChange={(event) => {
                    if (!event.target.files) return;
                    handleSelectedFiles(Array.from(event.target.files));
                    event.target.value = "";
                }}
            />

            <div className="flex justify-center items-center bg-surface-100 group-hover:bg-brand-500/10 mb-3 rounded-full w-12 h-12 transition-colors">
                <Icon
                    icon={isPreparing ? "solar:refresh-circle-linear" : "solar:upload-linear"}
                    width="24"
                    className={`text-surface-500 group-hover:text-brand-600 dark:group-hover:text-brand-300 ${isPreparing ? "animate-spin motion-reduce:animate-none text-brand-display" : ""}`}
                />
            </div>

            <p className="font-bold text-surface-600 group-hover:text-brand-700 dark:group-hover:text-brand-200 text-sm text-center">
                {isPreparing ? preparingLabel : resolvedTitle}
            </p>

            <p className="mt-1 text-surface-400 text-xs text-center" aria-live="polite">
                {isPreparing
                    ? currentLang === "es" ? "Validando y preparando la vista previa" : "Validating and preparing preview"
                    : subtitle || defaultSubtitle}
            </p>
        </label>
    );
};
