"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useLanguage } from "@/hooks/useLanguage";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { GlassPanel } from "@/components/ui/GlassPanel/GlassPanel";
import styles from "./HeroSection.module.css";

const TOOL_PREVIEW = [
    { icon: "solar:layers-minimalistic-bold-duotone", label: "Merge PDF", mode: "Local" },
    { icon: "solar:scissors-bold-duotone", label: "Split PDF", mode: "Local" },
    { icon: "solar:gallery-bold-duotone", label: "Image to PDF", mode: "Local" },
    { icon: "solar:eye-scan-bold-duotone", label: "OCR PDF", mode: "Cloud" },
];

export const HeroSection = () => {
    const { t } = useLanguage();
    const strings = t.hero;

    const [titleRef, titleRevealed] = useScrollReveal<HTMLHeadingElement>();
    const [descRef, descRevealed] = useScrollReveal<HTMLParagraphElement>();
    const [actionsRef, actionsRevealed] = useScrollReveal<HTMLDivElement>();
    const [visualRef, visualRevealed] = useScrollReveal<HTMLDivElement>();

    // Parallax state — offset per layer
    const [offsets, setOffsets] = useState({ back: 0, middle: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    const handleScroll = useCallback(() => {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const scrollProgress = -rect.top / (rect.height || 1);
        setOffsets({
            back: scrollProgress * 30,
            middle: scrollProgress * 18,
        });
    }, []);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    return (
        <section className={styles.heroContainer} ref={containerRef}>
            <div className="mx-auto max-w-7xl px-4 relative z-10">
                <div className="flex flex-col items-center text-center">
                    <h1
                        ref={titleRef}
                        className={`${styles.heroTitle} ${titleRevealed ? styles.revealed : ""} dark:text-surface-100`}
                    >
                        {strings.titleLine1}{" "}
                        {strings.titleHighlight}{" "}
                        {strings.titleLine2}
                    </h1>

                    <p
                        ref={descRef}
                        className={`${styles.heroDescription} ${descRevealed ? styles.revealed : ""} dark:text-surface-400`}
                    >
                        {strings.description}
                    </p>

                    <div
                        ref={actionsRef}
                        className={`${styles.heroActions} ${actionsRevealed ? styles.revealed : ""}`}
                    >
                        <Link href="/dashboard" className={`${styles.ctaPrimary} dark:text-surface-0`} aria-label="Start using Docivo tools">
                            {strings.buttons.primary}
                            <Icon icon="solar:arrow-right-linear" width="18" />
                        </Link>
                        <Link href="#tools" className={`${styles.ctaSecondary} dark:bg-surface-800 dark:border-surface-300 dark:text-surface-0`} aria-label="View available tools">
                            {strings.buttons.secondary}
                            <Icon icon="solar:arrow-down-linear" width="18" />
                        </Link>
                    </div>
                </div>

                {/* Parallax floating glass panels */}
                <div
                    ref={visualRef}
                    className={`${styles.heroVisual} ${visualRevealed ? styles.revealed : ""}`}
                >
                    {/* Back layer — Engine Status */}
                    <div
                        className={`${styles.parallaxLayer} ${styles.parallaxBack}`}
                        style={{ transform: `translateY(${offsets.back}px)` }}
                    >
                        <GlassPanel variant="light" className={`${styles.enginePanel} dark:bg-surface-800/60`}>
                            <div className={styles.engineHeader}>
                                <div>
                                    <p className={`${styles.engineTitle} dark:text-surface-100`}>{strings.panels.engineTitle}</p>
                                    <p className={`${styles.engineSubtitle} dark:text-surface-400`}>{strings.panels.engineSubtitle}</p>
                                </div>
                                <div className={styles.engineIcon}>
                                    <Icon icon="solar:cpu-bolt-bold-duotone" width="24" />
                                </div>
                            </div>
                            <div className={styles.engineProgress}>
                                <div className={styles.engineProgressBar} />
                            </div>
                            <div className={styles.engineStats}>
                                <div className={`${styles.engineStat} dark:bg-surface-700/40 dark:border-surface-600`}>
                                    <div className={`${styles.engineStatNumber} dark:text-surface-0`}>3</div>
                                    <div className={`${styles.engineStatLabel} dark:text-surface-400`}>{strings.panels.localTools}</div>
                                </div>
                                <div className={`${styles.engineStat} dark:bg-surface-700/40 dark:border-surface-600`}>
                                    <div className={`${styles.engineStatNumber} dark:text-surface-0`}>2</div>
                                    <div className={`${styles.engineStatLabel} dark:text-surface-400`}>{strings.panels.cloudTools}</div>
                                </div>
                            </div>
                        </GlassPanel>
                    </div>

                    {/* Middle layer — Tool List */}
                    <div
                        className={`${styles.parallaxLayer} ${styles.parallaxMiddle}`}
                        style={{ transform: `translateY(${offsets.middle}px)` }}
                    >
                        <GlassPanel variant="light" className={`${styles.toolPanel} dark:bg-surface-800/60`}>
                            <p className={`${styles.toolPanelTitle} dark:text-surface-100`}>{strings.panels.workflowTitle}</p>
                            <p className={`${styles.toolPanelSubtitle} dark:text-surface-400`}>{strings.panels.workflowSubtitle}</p>
                            <div className={styles.toolList}>
                                {TOOL_PREVIEW.map((tool) => (
                                    <div key={tool.label} className={`${styles.toolItem} dark:bg-surface-700/40 dark:border-surface-600`}>
                                        <div className={styles.toolLeft}>
                                            <div className={styles.toolIcon}>
                                                <Icon icon={tool.icon} width="18" />
                                            </div>
                                            <span className={`${styles.toolLabel} dark:text-surface-100`}>{tool.label}</span>
                                        </div>
                                        <span className={`${styles.toolBadge} dark:bg-surface-600 dark:text-surface-200 dark:border-surface-500`}>{tool.mode}</span>
                                    </div>
                                ))}
                            </div>
                        </GlassPanel>
                    </div>
                </div>
            </div>
        </section>
    );
};
