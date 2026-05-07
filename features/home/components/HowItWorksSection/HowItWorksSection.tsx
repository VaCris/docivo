"use client";

import { Icon } from "@iconify/react";
import { useLanguage } from "@/hooks/useLanguage";
import { HOW_IT_WORKS_CONFIG } from "./HowItWorksSection.config";
import styles from "./HowItWorksSection.module.css";

export const HowItWorksSection = () => {
    const { t } = useLanguage();
    const strings = t.howItWorks;

    return (
        <section id="details" className={styles.section}>
            <div className="mx-auto max-w-6xl">
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <div className="inline-flex items-center gap-2 bg-white shadow-sm mb-5 px-3 py-1 border border-surface-200 rounded-full">
                        <Icon
                            icon="solar:settings-minimalistic-linear"
                            width="14"
                            className="text-brand-600"
                        />
                        <span className="font-semibold text-surface-600 text-xs tracking-wide">
                            Workflow
                        </span>
                    </div>

                    <h2 className="font-extrabold text-surface-900 text-3xl md:text-4xl tracking-tight">
                        {strings.title}
                    </h2>

                    <p className="mt-4 text-surface-500 text-base leading-relaxed">
                        {strings.subtitle}
                    </p>
                </div>

                <div className="space-y-5">
                    {HOW_IT_WORKS_CONFIG.map((tool) => {
                        const toolData =
                            strings.tools[
                            tool.id as keyof typeof strings.tools
                            ];

                        return (
                            <div key={tool.id} className={styles.detailCard}>
                                <div className="grid md:grid-cols-[0.9fr_1.4fr]">
                                    <div
                                        className={`bg-gradient-to-br ${tool.colors.gradient} ${styles.leftPanel}`}
                                    >
                                        <div
                                            className={`${styles.iconWrapper} ${tool.colors.iconBorder}`}
                                        >
                                            <Icon
                                                icon={tool.icon}
                                                width="30"
                                                className={tool.colors.iconText}
                                            />
                                        </div>

                                        <h3 className="font-extrabold text-surface-900 text-xl tracking-tight">
                                            {toolData.title}
                                        </h3>

                                        <span
                                            className={`inline-flex items-center gap-1 mt-3 px-2.5 py-1 rounded-full font-bold text-xs ${tool.colors.badgeBg} ${tool.colors.badgeText}`}
                                        >
                                            {toolData.badge}
                                        </span>
                                    </div>

                                    <div className={styles.rightPanel}>
                                        <div className="gap-6 grid md:grid-cols-2">
                                            <div>
                                                <h4 className={styles.sectionTitle}>
                                                    {strings.labels.whatItDoes}
                                                </h4>

                                                <p className="text-surface-600 text-sm leading-relaxed">
                                                    {toolData.whatItDoes}
                                                </p>
                                            </div>

                                            <div>
                                                <h4 className={styles.sectionTitle}>
                                                    {strings.labels.bestFor}
                                                </h4>

                                                <div className="flex flex-wrap gap-2">
                                                    {toolData.bestFor.map(
                                                        (tag, idx) => (
                                                            <span
                                                                key={idx}
                                                                className="bg-surface-50 px-3 py-1 border border-surface-200 rounded-lg font-medium text-surface-600 text-xs"
                                                            >
                                                                {tag}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mt-7 pt-6 border-surface-100 border-t">
                                            <h4 className={styles.sectionTitle}>
                                                {strings.labels.howItWorks}
                                            </h4>

                                            <div className="gap-3 grid md:grid-cols-3">
                                                {toolData.steps.map(
                                                    (stepDesc, idx) => (
                                                        <div
                                                            key={idx}
                                                            className="bg-surface-50 p-4 border border-surface-100 rounded-xl"
                                                        >
                                                            <div
                                                                className={`flex justify-center items-center mb-3 rounded-full w-7 h-7 font-bold text-xs ${tool.colors.stepBg} ${tool.colors.stepText}`}
                                                            >
                                                                {idx + 1}
                                                            </div>

                                                            <p className="text-surface-600 text-sm leading-relaxed">
                                                                {stepDesc}
                                                            </p>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        {"warning" in toolData && (
                                            <div className="flex items-start gap-2 bg-amber-50 mt-5 p-3 border border-amber-200/60 rounded-xl">
                                                <Icon
                                                    icon="solar:info-circle-bold"
                                                    width="16"
                                                    className="mt-0.5 text-amber-600 shrink-0"
                                                />
                                                <p className="text-amber-800 text-xs leading-relaxed">
                                                    <strong>
                                                        {strings.labels.important}
                                                    </strong>{" "}
                                                    {toolData.warning}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};