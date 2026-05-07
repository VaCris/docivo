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
            <div className="mx-auto max-w-6xl">
                <div className="mx-auto max-w-3xl text-center">
                    <div
                        className={`${styles.animFadeUp} inline-flex items-center gap-2 bg-white/80 shadow-sm backdrop-blur px-4 py-1.5 border border-brand-200/70 rounded-full mb-8`}
                    >
                        <span className="bg-brand-500 rounded-full w-1.5 h-1.5" />
                        <span className="font-semibold text-brand-700 text-xs tracking-wide">
                            {strings.badge}
                        </span>
                    </div>

                    <h1
                        className={`${styles.animFadeUp} ${styles.delay1} font-extrabold text-surface-950 text-4xl md:text-6xl lg:text-[4rem] leading-[1.05] tracking-tight`}
                    >
                        {strings.titleLine1}
                        <br />
                        <span className={styles.gradientText}>
                            {strings.titleHighlight}
                        </span>{" "}
                        {strings.titleLine2}
                    </h1>

                    <p
                        className={`${styles.animFadeUp} ${styles.delay2} mx-auto mt-6 max-w-2xl text-surface-500 text-lg md:text-xl leading-relaxed`}
                    >
                        {strings.description}
                    </p>

                    <div
                        className={`${styles.animFadeUp} ${styles.delay3} flex sm:flex-row flex-col justify-center items-center gap-4 mt-10`}
                    >
                        <Link
                            href="/dashboard"
                            className="group inline-flex items-center gap-2.5 bg-brand-600 hover:bg-brand-700 shadow-brand-600/20 shadow-lg px-7 py-3.5 rounded-xl font-semibold text-white text-sm transition-all"
                        >
                            {strings.buttons.primary}
                            <Icon
                                icon={HERO_CONFIG.icons.arrowDown}
                                width="16"
                                className="transition-transform group-hover:translate-y-0.5"
                            />
                        </Link>

                        <Link
                            href="#tools"
                            className="inline-flex items-center gap-2 bg-white hover:bg-surface-50 px-7 py-3.5 border border-surface-200 rounded-xl font-medium text-surface-600 hover:text-surface-900 text-sm transition-all"
                        >
                            {strings.buttons.secondary}
                            <Icon
                                icon={HERO_CONFIG.icons.arrowRight}
                                width="16"
                            />
                        </Link>
                    </div>

                    <div
                        className={`${styles.animFadeUp} ${styles.delay4} flex flex-wrap justify-center items-center gap-x-6 gap-y-3 mt-8 text-surface-400`}
                    >
                        <div className="flex items-center gap-1.5 font-medium text-xs">
                            <Icon
                                icon={HERO_CONFIG.icons.speed}
                                width="15"
                                className="text-brand-500"
                            />
                            {strings.features.speed}
                        </div>

                        <div className="hidden sm:block bg-surface-200 w-px h-3" />

                        <div className="flex items-center gap-1.5 font-medium text-xs">
                            <Icon
                                icon={HERO_CONFIG.icons.security}
                                width="15"
                                className="text-brand-500"
                            />
                            {strings.features.security}
                        </div>

                        <div className="hidden sm:block bg-surface-200 w-px h-3" />

                        <div className="flex items-center gap-1.5 font-medium text-xs">
                            <Icon
                                icon={HERO_CONFIG.icons.tools}
                                width="15"
                                className="text-brand-500"
                            />
                            {strings.features.tools}
                        </div>
                    </div>
                </div>

                <div
                    className={`${styles.animFadeUp} ${styles.delay5} relative mx-auto mt-16 md:mt-20 max-w-4xl`}
                >
                    <div className={styles.visualGlow} />

                    <div className="relative bg-white/80 shadow-2xl shadow-surface-200/60 backdrop-blur p-2 border border-white rounded-3xl">
                        <div className="bg-white border border-surface-100 rounded-2xl overflow-hidden">
                            <div className="flex items-center gap-2 px-4 py-3 border-surface-100 border-b">
                                <div className="flex gap-1.5">
                                    <div className="bg-red-400/70 rounded-full w-3 h-3" />
                                    <div className="bg-amber-400/70 rounded-full w-3 h-3" />
                                    <div className="bg-green-400/70 rounded-full w-3 h-3" />
                                </div>

                                <div className="flex flex-1 justify-center">
                                    <div className="bg-surface-50 px-4 py-1 rounded-lg font-medium text-surface-400 text-xs">
                                        {strings.visual.url}
                                    </div>
                                </div>

                                <div className="w-12" />
                            </div>

                            <div className="gap-6 grid md:grid-cols-[1.1fr_0.9fr] p-6 md:p-8">
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <p className="font-bold text-surface-900 text-sm">
                                                Document workflow
                                            </p>
                                            <p className="text-surface-400 text-xs">
                                                Choose a tool and process files
                                                securely
                                            </p>
                                        </div>

                                        <span className="bg-brand-50 px-2.5 py-1 rounded-full font-bold text-[10px] text-brand-600">
                                            Docivo
                                        </span>
                                    </div>

                                    {TOOL_PREVIEW.map((tool) => (
                                        <div
                                            key={tool.label}
                                            className="flex justify-between items-center bg-surface-50 hover:bg-brand-50/60 p-3 border border-surface-100 rounded-xl transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex justify-center items-center bg-white border border-surface-200 rounded-lg w-9 h-9 text-brand-600">
                                                    <Icon
                                                        icon={tool.icon}
                                                        width="19"
                                                    />
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-surface-800 text-sm">
                                                        {tool.label}
                                                    </p>
                                                    <p className="text-surface-400 text-xs">
                                                        PDF utility
                                                    </p>
                                                </div>
                                            </div>

                                            <span className="bg-white px-2 py-1 border border-surface-200 rounded-md font-semibold text-[10px] text-surface-500">
                                                {tool.mode}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-col justify-between bg-surface-950 p-5 rounded-2xl overflow-hidden text-white">
                                    <div>
                                        <div className="flex justify-between items-center mb-6">
                                            <p className="font-bold text-sm">
                                                Current task
                                            </p>
                                            <Icon
                                                icon="solar:shield-check-bold-duotone"
                                                width="22"
                                                className="text-brand-300"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <div className="bg-white/10 rounded-full w-full h-2 overflow-hidden">
                                                <div className="bg-brand-400 rounded-full w-2/3 h-full" />
                                            </div>

                                            <p className="text-white/60 text-xs">
                                                Files are processed with the
                                                right engine depending on the
                                                tool.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="gap-3 grid grid-cols-2 mt-8">
                                        <div className="bg-white/10 p-4 rounded-xl">
                                            <p className="font-extrabold text-2xl">
                                                3
                                            </p>
                                            <p className="text-white/50 text-xs">
                                                Local tools
                                            </p>
                                        </div>

                                        <div className="bg-white/10 p-4 rounded-xl">
                                            <p className="font-extrabold text-2xl">
                                                2
                                            </p>
                                            <p className="text-white/50 text-xs">
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