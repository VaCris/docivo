"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { useLanguage } from "@/hooks/useLanguage";
import { HERO_CONFIG } from "./HeroSection.config";
import styles from "./HeroSection.module.css";

const TOOL_PREVIEW = [
    {
        icon: "solar:layers-minimalistic-bold-duotone",
        label: "Merge PDF",
        mode: "Local",
    },
    {
        icon: "solar:scissors-bold-duotone",
        label: "Split PDF",
        mode: "Local",
    },
    {
        icon: "solar:gallery-bold-duotone",
        label: "Image to PDF",
        mode: "Local",
    },
    {
        icon: "solar:eye-scan-bold-duotone",
        label: "OCR PDF",
        mode: "Cloud",
    },
];

export const HeroSection = () => {
    const { t } = useLanguage();
    const strings = t.hero;

    return (
        <section className={styles.heroContainer}>
            <div className="mx-auto max-w-7xl px-4 relative z-10">
                <div className="flex flex-col items-center text-center">
                    <h1
                        className={`${styles.animFadeUp} ${styles.delay1} font-extrabold text-surface-950 text-5xl md:text-7xl lg:text-[5rem] leading-[1.0] tracking-tighter max-w-4xl`}
                    >
                        {strings.titleLine1}
                        <br />
                        <span className={styles.gradientText}>
                            {strings.titleHighlight}
                        </span>{" "}
                        {strings.titleLine2}
                    </h1>

                    <p
                        className={`${styles.animFadeUp} ${styles.delay2} mt-8 text-surface-500 text-lg md:text-xl leading-relaxed max-w-2xl`}
                    >
                        {strings.description}
                    </p>

                    <div
                        className={`${styles.animFadeUp} ${styles.delay3} flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 w-full sm:w-auto`}
                    >
                        <Link
                            href="/dashboard"
                            className="group flex w-full sm:w-auto justify-center items-center gap-2.5 bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/40 hover:-translate-y-1 px-8 py-4 rounded-2xl font-bold text-white text-base transition-all duration-300"
                        >
                            {strings.buttons.primary}
                        </Link>

                        <Link
                            href="#tools"
                            className="flex w-full sm:w-auto justify-center items-center gap-2.5 bg-white dark:bg-surface-100 hover:bg-surface-50 dark:hover:bg-surface-200 border border-surface-200 dark:border-surface-300 px-8 py-4 rounded-2xl font-bold text-surface-700 dark:text-surface-900 text-base transition-all duration-300"
                        >
                            {strings.buttons.secondary}
                        </Link>
                    </div>

                    <div
                        className={`${styles.animFadeUp} ${styles.delay4} flex flex-wrap justify-center items-center gap-x-6 gap-y-3 mt-8 text-surface-400`}
                    >
                        <div className="flex items-center gap-1.5 font-medium text-sm">
                            <Icon
                                icon={HERO_CONFIG.icons.speed}
                                width="18"
                                className="text-surface-900"
                            />
                            {strings.features.speed}
                        </div>
                        <div className="hidden sm:block bg-surface-200 w-1 h-1 rounded-full" />
                        <div className="flex items-center gap-1.5 font-medium text-sm">
                            <Icon
                                icon={HERO_CONFIG.icons.security}
                                width="18"
                                className="text-surface-900"
                            />
                            {strings.features.security}
                        </div>
                        <div className="hidden sm:block bg-surface-200 w-1 h-1 rounded-full" />
                        <div className="flex items-center gap-1.5 font-medium text-sm">
                            <Icon
                                icon={HERO_CONFIG.icons.tools}
                                width="18"
                                className="text-surface-900"
                            />
                            {strings.features.tools}
                        </div>
                    </div>
                </div>

                <div
                    className={`${styles.animFadeUp} ${styles.delay5} relative mx-auto mt-20 max-w-5xl`}
                >
                    <div className={styles.visualGlow} />

                    <div className="relative bg-white/40 shadow-2xl shadow-surface-900/10 backdrop-blur-xl p-3 border border-white/60 rounded-[2rem]">
                        <div className="bg-white border border-surface-100/50 rounded-3xl overflow-hidden shadow-inner">
                            <div className="flex items-center gap-2 px-6 py-4 bg-surface-50/50 border-surface-100/50 border-b">
                                <div className="flex gap-2">
                                    <div className="bg-surface-300 rounded-full w-3.5 h-3.5 hover:bg-red-400 transition-colors" />
                                    <div className="bg-surface-300 rounded-full w-3.5 h-3.5 hover:bg-amber-400 transition-colors" />
                                    <div className="bg-surface-300 rounded-full w-3.5 h-3.5 hover:bg-green-400 transition-colors" />
                                </div>

                                <div className="flex flex-1 justify-center">
                                    <div className="bg-white shadow-sm border border-surface-100 px-6 py-1.5 rounded-full font-medium text-surface-400 text-xs flex items-center gap-2">
                                        <Icon icon="solar:lock-bold" width="12" className="text-surface-300" />
                                        {strings.visual.url}
                                    </div>
                                </div>

                                <div className="w-16" />
                            </div>

                            <div className="gap-8 grid md:grid-cols-2 p-8 md:p-12">
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center mb-6">
                                        <div>
                                            <h3 className="font-bold text-surface-900 text-xl tracking-tight">
                                                Document workflow
                                            </h3>
                                            <p className="text-surface-500 text-sm mt-1">
                                                Choose a tool and process files securely
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {TOOL_PREVIEW.map((tool) => (
                                            <div
                                                key={tool.label}
                                                className="group flex justify-between items-center bg-surface-0 hover:bg-surface-50 p-4 border border-surface-200 hover:border-surface-300 rounded-2xl transition-all cursor-pointer shadow-sm hover:shadow-md"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="flex justify-center items-center bg-surface-100 group-hover:bg-surface-200 group-hover:shadow-sm border border-transparent group-hover:border-surface-300 rounded-xl w-12 h-12 text-surface-900 transition-all">
                                                        <Icon
                                                            icon={tool.icon}
                                                            width="24"
                                                        />
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-surface-900 text-sm">
                                                            {tool.label}
                                                        </p>
                                                    </div>
                                                </div>

                                                <span className="bg-surface-100 group-hover:bg-brand-50 px-3 py-1.5 border border-surface-200 group-hover:border-brand-200 rounded-lg font-bold text-[10px] text-surface-600 group-hover:text-brand-600 uppercase tracking-wider transition-colors">
                                                    {tool.mode}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col justify-between bg-surface-950 p-8 rounded-3xl overflow-hidden text-white relative isolate">
                                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl -z-10" />

                                    <div>
                                        <div className="flex justify-between items-start mb-8">
                                            <div>
                                                <p className="font-bold text-lg text-white mb-1">
                                                    Engine Status
                                                </p>
                                                <p className="text-surface-400 text-sm">
                                                    Active processing nodes
                                                </p>
                                            </div>
                                            <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-md">
                                                <Icon
                                                    icon="solar:cpu-bolt-bold-duotone"
                                                    width="28"
                                                    className="text-white"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <div className="bg-white/5 rounded-full w-full h-2 overflow-hidden">
                                                <div className="bg-white rounded-full w-2/3 h-full shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="gap-4 grid grid-cols-2 mt-12">
                                        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                                            <p className="font-extrabold text-3xl mb-1 text-white">
                                                3
                                            </p>
                                            <p className="text-surface-400 text-xs font-bold uppercase tracking-wider">
                                                Local tools
                                            </p>
                                        </div>

                                        <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm hover:bg-white/10 transition-colors">
                                            <p className="font-extrabold text-3xl mb-1 text-white">
                                                2
                                            </p>
                                            <p className="text-surface-400 text-xs font-bold uppercase tracking-wider">
                                                Cloud tools
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};