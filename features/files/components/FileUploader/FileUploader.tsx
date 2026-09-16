"use client";

import { Icon } from "@iconify/react";
import { useLanguage } from "@/hooks/useLanguage";

type Props = {
    accept: string;
    multiple?: boolean;
    onFiles: (files: File[]) => void;

    // opcional → override si algún tool quiere cambiar texto
    title?: string;
    subtitle?: string;

    className?: string;
};

export const FileUploader = ({
    accept,
    multiple = false,
    onFiles,
    title,
    subtitle,
    className = "",
}: Props) => {
    const { t } = useLanguage();

    const defaultTitle = t.dropzone?.heading.title || "Upload file";
    const defaultSubtitle = t.dropzone?.heading.subtitle || "PDF only";

    return (
        <label
            className={`
                group flex flex-col justify-center items-center
                hover:bg-brand-500/5 dark:hover:bg-brand-300/10
                p-6
                border-2 border-dashed border-surface-300 hover:border-brand-500 dark:hover:border-brand-300
                rounded-xl
                transition-all duration-200 cursor-pointer
                w-full
                ${className}
            `}
        >
            <input
                type="file"
                accept={accept}
                multiple={multiple}
                className="hidden"
                onChange={(e) => {
                    if (!e.target.files) return;
                    onFiles(Array.from(e.target.files));
                    e.target.value = "";
                }}
            />

            <div className="flex justify-center items-center bg-surface-100 group-hover:bg-brand-500/10 mb-3 rounded-full w-12 h-12 transition-colors">
                <Icon
                    icon="solar:upload-linear"
                    width="24"
                    className="text-surface-500 group-hover:text-brand-600 dark:group-hover:text-brand-300"
                />
            </div>

            <p className="font-bold text-surface-600 group-hover:text-brand-700 dark:group-hover:text-brand-200 text-sm text-center">
                {title || defaultTitle}
            </p>

            <p className="mt-1 text-surface-400 text-xs text-center">
                {subtitle || defaultSubtitle}
            </p>
        </label>
    );
};
