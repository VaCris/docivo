"use client";

import React, { useState, useRef } from "react";
import { Icon } from "@iconify/react";
import enData from "@/locales/en/dropzone.json";
import esData from "@/locales/es/dropzone.json";
import { DROPZONE_CONFIG } from "./DropZone.config";
import styles from "./DropZone.module.css";

export const DropZone = () => {
    const [currentLang] = useState<"en" | "es">("en");
    const t = currentLang === "en" ? enData : esData;

    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [step, setStep] = useState<"idle" | "processing" | "success">("idle");

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files.length > 0) {
            setFiles(Array.from(e.dataTransfer.files));
            setStep("idle");
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFiles(Array.from(e.target.files));
            setStep("idle");
        }
    };

    const simulateProcessing = () => {
        setStep("processing");

        setTimeout(() => {
            setStep("success");
        }, 2500);
    };

    return (
        <section id="upload" className={styles.section}>
            <div className={styles.wrapper}>
                <div className="mb-14 text-center">
                    <h2 className="font-extrabold text-surface-900 text-3xl md:text-4xl tracking-tight">
                        {t.heading.title}
                    </h2>
                    <p className="mt-4 text-surface-500 text-base leading-relaxed">
                        {t.heading.subtitle}
                    </p>
                </div>

                {step === "idle" && files.length === 0 && (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        onDragOver={handleDragOver}
                        onDragLeave={() => setIsDragging(false)}
                        onDrop={handleDrop}
                        className={`${styles.dropArea} ${isDragging ? styles.dropAreaActive : ""
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

                        <div className={styles.iconContainer}>
                            <Icon icon={DROPZONE_CONFIG.icons.uploadMain} width="28" />
                        </div>

                        <p className="mb-2 font-semibold text-surface-700 text-base">
                            {t.uploadArea.title}
                        </p>

                        <p className="mb-6 text-surface-400 text-sm">
                            {t.uploadArea.hint}
                        </p>

                        <button className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 px-6 py-2.5 rounded-xl font-semibold text-white text-sm transition-colors pointer-events-none">
                            <Icon icon={DROPZONE_CONFIG.icons.folderOpen} width="16" />
                            {t.uploadArea.button}
                        </button>
                    </div>
                )}

                {step === "idle" && files.length > 0 && (
                    <div className="text-left">
                        <div className={styles.fileList}>
                            {files.map((file, i) => (
                                <div
                                    key={i}
                                    className={styles.fileItem}
                                    style={{ animationDelay: `${i * 0.05}s` }}
                                >
                                    <div className="flex justify-center items-center bg-surface-50 border border-surface-100 rounded-lg w-9 h-9 shrink-0">
                                        <Icon
                                            icon={DROPZONE_CONFIG.icons.fileTypes.pdf}
                                            width="18"
                                            className="text-surface-500"
                                        />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-surface-700 text-sm truncate">
                                            {file.name}
                                        </p>
                                        <p className="text-surface-400 text-xs">
                                            {(file.size / 1024).toFixed(0)} KB
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => setFiles([])}
                                        className="hover:bg-surface-50 p-1.5 rounded-lg text-surface-300 hover:text-surface-600 transition-colors"
                                    >
                                        <Icon icon={DROPZONE_CONFIG.icons.close} width="18" />
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className={styles.actionBar}>
                            <span className="font-semibold text-surface-700 text-sm">
                                {files.length} archivo(s)
                            </span>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setFiles([])}
                                    className="font-medium text-surface-500 hover:text-surface-700 text-sm"
                                >
                                    Limpiar
                                </button>

                                <button
                                    onClick={simulateProcessing}
                                    className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 px-5 py-2.5 rounded-xl font-semibold text-white text-sm transition-colors"
                                >
                                    <Icon icon={DROPZONE_CONFIG.icons.play} width="16" />
                                    Procesar
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {step === "processing" && (
                    <div className={styles.stateCard}>
                        <div className="flex items-center gap-4">
                            <div className="border-2 border-brand-200 border-t-brand-600 rounded-full w-10 h-10 animate-spin"></div>

                            <div className="flex-1 text-left">
                                <p className="font-semibold text-surface-700 text-sm">
                                    {t.states.processing}
                                </p>
                                <p className="mt-0.5 text-surface-400 text-xs">
                                    {t.states.processingHint}
                                </p>
                            </div>
                        </div>

                        <div className="bg-surface-100 mt-4 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-brand-500 rounded-full w-[60%] h-full transition-all duration-300"></div>
                        </div>
                    </div>
                )}

                {step === "success" && (
                    <div className={`${styles.stateCard} ${styles.successCard}`}>
                        <div className="flex items-center gap-4">
                            <div className="flex justify-center items-center bg-brand-100 rounded-full w-10 h-10 shrink-0">
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path
                                        d="M6 10L9 13L14 7"
                                        stroke="#0D9488"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className={styles.checkAnimation}
                                    />
                                </svg>
                            </div>

                            <div className="flex-1 text-left">
                                <p className="font-semibold text-brand-800 text-sm">
                                    {t.states.success}
                                </p>
                                <p className="mt-0.5 text-brand-600 text-xs">
                                    {t.states.successHint}
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                    setFiles([]);
                                    setStep("idle");
                                }}
                                className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 px-5 py-2.5 rounded-xl font-semibold text-white text-sm transition-colors"
                            >
                                <Icon icon={DROPZONE_CONFIG.icons.download} width="16" />
                                {t.states.downloadBtn}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};