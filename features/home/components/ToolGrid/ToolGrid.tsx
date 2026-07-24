"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { useLanguage } from "@/hooks/useLanguage";
import { TOOLGRID_CONFIG } from "./ToolGrid.config";
import styles from "./ToolGrid.module.css";

type ToolBadge = "local" | "cloud";

const TOOL_META: Record<
    string,
    {
        href: string;
        badge: ToolBadge;
    }
> = {
    merge: {
        href: "/dashboard/merge",
        badge: "local",
    },
    split: {
        href: "/dashboard/split",
        badge: "local",
    },
    imageToPdf: {
        href: "/dashboard/convert-image-to-pdf",
        badge: "local",
    },
    pdfToWord: {
        href: "/dashboard/convert-pdf-to-word",
        badge: "cloud",
    },
    ocr: {
        href: "/dashboard/ocr",
        badge: "cloud",
    },
};

const BENTO_CLASSES = [
    "md:col-span-2 md:row-span-2 flex flex-col justify-between",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-1",
    "md:col-span-1 md:row-span-1",
];

export const ToolGrid = () => {
    const { t } = useLanguage();
    const strings = t.toolGrid;

    return (
        <section id="tools" className={styles.section}>
            <div className="mx-auto max-w-7xl">
                <div className="mb-20 flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 bg-white shadow-sm mb-6 px-4 py-2 border border-surface-200 rounded-full">
                        <Icon
                            icon="solar:widget-4-linear"
                            width="16"
                            className="text-brand-600"
                        />
                        <span className="font-bold text-surface-900 text-xs uppercase tracking-wider">
                            {strings.badge}
                        </span>
                    </div>

                    <h2 className="font-extrabold text-surface-950 text-5xl md:text-6xl tracking-tighter max-w-3xl">
                        {strings.title}
                    </h2>

                    <p className="mt-6 text-surface-500 text-xl leading-relaxed max-w-2xl">
                        {strings.subtitle}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 auto-rows-[minmax(180px,auto)]">
                    {TOOLGRID_CONFIG.map((tool, index) => {
                        const toolContent =
                            strings.items[
                            tool.id as keyof typeof strings.items
                            ];

                        const meta = TOOL_META[tool.id];
                        const bentoClass = BENTO_CLASSES[index] || "md:col-span-1 md:row-span-1";
                        const isLargeCell = index === 0;

                        return (
                            <Link
                                key={tool.id}
                                href={meta?.href ?? "/dashboard"}
                                className={`${styles.toolCard} ${tool.delay} group ${bentoClass}`}
                            >
                                <div className="flex justify-between items-start gap-4 mb-auto">
                                    <div className={`${styles.iconWrap} ${isLargeCell ? 'w-14 h-14 rounded-xl' : 'w-12 h-12 rounded-lg'}`}>
                                        <Icon icon={tool.icon} width={isLargeCell ? "28" : "24"} />
                                    </div>

                                    {meta && (
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${meta.badge === "local"
                                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60"
                                                : "bg-blue-50 text-blue-700 border border-blue-200/60"
                                                }`}
                                        >
                                            {strings.meta[meta.badge]}
                                        </span>
                                    )}
                                </div>

                                <div className={isLargeCell ? "mt-8" : "mt-6"}>
                                    <h3 className={`font-bold text-surface-900 mb-2 ${isLargeCell ? 'text-2xl' : 'text-lg'}`}>
                                        {toolContent.title}
                                    </h3>

                                    <p className={`text-surface-500 leading-relaxed ${isLargeCell ? 'text-base' : 'text-sm'}`}>
                                        {toolContent.desc}
                                    </p>

                                    <div className="flex items-center gap-1.5 mt-6 font-bold text-brand-600 text-xs uppercase tracking-wide">
                                        <span>{strings.meta.openTool}</span>
                                        <Icon
                                            icon="solar:arrow-right-linear"
                                            width="16"
                                            className="transition-transform group-hover:translate-x-1"
                                        />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}

                    <div
                        className={`${styles.toolCardMuted} cursor-default border-dashed md:col-span-1 md:row-span-1`}
                    >
                        <div className={`${styles.iconWrap} ${styles.iconMuted} w-12 h-12 rounded-lg`}>
                            <Icon icon="solar:lock-linear" width="24" />
                        </div>

                        <div className="mt-6">
                            <h3 className="mb-2 font-bold text-surface-400 text-lg">
                                {strings.comingSoon.title}
                            </h3>

                            <p className="text-surface-400 text-sm leading-relaxed">
                                {strings.comingSoon.desc}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};