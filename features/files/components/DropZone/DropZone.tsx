"use client";

import React, { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import { useLanguage } from "@/hooks/useLanguage";

import enData from "@/locales/en/dropzone.json";
import esData from "@/locales/es/dropzone.json";
import { DROPZONE_CONFIG } from "./DropZone.config";

import styles from "./DropZone.module.css";

interface DropZoneProps {
    onFiles?: (files: FileList) => void;
}

export const DropZone = ({ onFiles }: DropZoneProps) => {
    const { currentLang } = useLanguage();
    const t = currentLang === "en" ? enData : esData;

    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFiles = (files: FileList) => {
        if (!files.length) return;
        onFiles?.(files);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) handleFiles(e.target.files);
    };

    return (
        <section id="upload" className="bg-surface-50 px-6 py-20 md:py-28">
            <div className={`max-w-6xl mx-auto ${styles.dropzoneContainer}`}>
                <div className="mx-auto mb-14 max-w-xl text-center">
                    <h2 className="font-extrabold text-surface-900 text-3xl md:text-4xl tracking-tight">
                        {t.heading.title}
                    </h2>
                    <p className="mt-4 text-surface-500 text-base leading-relaxed">
                        {t.heading.subtitle}
                    </p>
                </div>

                <div className="mx-auto max-w-2xl">
                    <div
                        onClick={handleClick}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        role="button"
                        tabIndex={0}
                        aria-label="Upload files by clicking or dragging"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                handleClick();
                            }
                        }}
                        className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-10 md:p-16 text-center cursor-pointer transition-all duration-300 ${isDragging
                                ? styles.dropzoneActive
                                : "border-surface-300 bg-white hover:border-surface-400 hover:bg-surface-50/50"
                            }`}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            multiple
                            accept={DROPZONE_CONFIG.acceptedExtensions}
                            onChange={handleFileSelect}
                        />

                        <div className="mb-6">
                            <div className="flex justify-center items-center bg-surface-50 mx-auto border border-surface-100 rounded-2xl w-16 h-16">
                                <Icon
                                    icon={DROPZONE_CONFIG.icons.uploadMain}
                                    width="28"
                                    className={`transition-all duration-300 ${isDragging ? styles.dropIconActive : "text-surface-400"
                                        }`}
                                />
                            </div>
                        </div>

                        <p className="mb-2 font-semibold text-surface-700 text-base">
                            {t.uploadArea.title}
                        </p>
                        <p className="mb-6 text-surface-400 text-sm">
                            {t.uploadArea.hint}
                        </p>

                        <button className="inline-flex justify-center items-center gap-2 bg-brand-600 px-6 py-2.5 rounded-xl font-semibold text-white text-sm pointer-events-none">
                            <Icon icon={DROPZONE_CONFIG.icons.folderOpen} width="16" />
                            {t.uploadArea.button}
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};