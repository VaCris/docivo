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

export const ToolGrid = () => {
    const { t } = useLanguage();
    const strings = t.toolGrid;

    return (
        <section id="tools" className={styles.section}>
            <div className="mx-auto max-w-6xl">
                <div className="mx-auto mb-14 max-w-xl text-center">
                    <div className="inline-flex items-center gap-2 bg-white shadow-sm mb-5 px-3 py-1 border border-surface-200 rounded-full">
                        <Icon
                            icon="solar:widget-4-linear"
                            width="14"
                            className="text-brand-600"
                        />
                        <span className="font-semibold text-surface-600 text-xs tracking-wide">
                            {strings.badge}
                        </span>
                    </div>

                    <h2 className="font-extrabold text-surface-900 text-3xl md:text-4xl tracking-tight">
                        {strings.title}
                    </h2>

                    <p className="mt-4 text-surface-500 text-base leading-relaxed">
                        {strings.subtitle}
                    </p>
                </div>

                <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {TOOLGRID_CONFIG.map((tool) => {
                        const toolContent =
                            strings.items[
                            tool.id as keyof typeof strings.items
                            ];

                        const meta = TOOL_META[tool.id];

                        return (
                            <Link
                                key={tool.id}
                                href={meta?.href ?? "/dashboard"}
                                className={`${styles.toolCard} ${tool.delay} group`}
                            >
                                <div className="flex justify-between items-start gap-4">
                                    <div className={styles.iconWrap}>
                                        <Icon icon={tool.icon} width="22" />
                                    </div>

                                    {meta && (
                                        <span
                                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${meta.badge === "local"
                                                ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                                : "bg-blue-50 text-blue-600 border border-blue-100"
                                                }`}
                                        >
                                            {strings.meta[meta.badge]}
                                        </span>
                                    )}
                                </div>

                                <h3 className="mb-2 font-bold text-surface-900 text-base">
                                    {toolContent.title}
                                </h3>

                                <p className="text-surface-500 text-sm leading-relaxed">
                                    {toolContent.desc}
                                </p>

                                <div className="flex items-center gap-1 mt-5 font-semibold text-brand-600 text-xs">
                                    <span>{strings.meta.openTool}</span>
                                    <Icon
                                        icon="solar:arrow-right-linear"
                                        width="14"
                                        className="transition-transform group-hover:translate-x-0.5"
                                    />
                                </div>
                            </Link>
                        );
                    })}

                    <div
                        className={`${styles.toolCardMuted} cursor-default border-dashed`}
                    >
                        <div className={`${styles.iconWrap} ${styles.iconMuted}`}>
                            <Icon icon="solar:lock-linear" width="22" />
                        </div>

                        <h3 className="mb-2 font-bold text-surface-400 text-base">
                            {strings.comingSoon.title}
                        </h3>

                        <p className="text-surface-400 text-sm leading-relaxed">
                            {strings.comingSoon.desc}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};