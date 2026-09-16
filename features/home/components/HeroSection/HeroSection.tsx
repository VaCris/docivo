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
                        className={`${styles.heroTitle} ${titleRevealed ? styles.revealed : ""}`}
                    >
                        {strings.titleLine1}{" "}
                        {strings.titleHighlight}{" "}
                        {strings.titleLine2}
                    </h1>

                    <p
                        ref={descRef}
                        className={`${styles.heroDescription} ${descRevealed ? styles.revealed : ""}`}
                    >
                        {strings.description}
                    </p>

                    <div
                        ref={actionsRef}
                        className={`${styles.heroActions} ${actionsRevealed ? styles.revealed : ""}`}
                    >
                        <Link href="/dashboard" className={styles.ctaPrimary} aria-label="Start using Docivo tools">
                            {strings.buttons.primary}
                            <Icon icon="solar:arrow-right-linear" width="18" />
                        </Link>
                        <Link href="#tools" className={styles.ctaSecondary} aria-label="View available tools">
                            {strings.buttons.secondary}
                            <Icon icon="solar:arrow-down-linear" width="18" />
                        </Link>
                    </div>
                </div>

                <div
                    ref={visualRef}
                    className={`${styles.heroVisual} ${visualRevealed ? styles.revealed : ""}`}
                >
                    <div
                        className={`${styles.parallaxLayer} ${styles.parallaxBack}`}
                        style={{ transform: `translateY(${offsets.back}px)` }}
                    >
                        <GlassPanel variant="light" className={styles.enginePanel}>
                            <div className={styles.engineHeader}>
                                <div>
                                    <p className={styles.engineTitle}>{strings.panels.engineTitle}</p>
                                    <p className={styles.engineSubtitle}>{strings.panels.engineSubtitle}</p>
                                </div>
                                <div className={styles.engineIcon}>
                                    <Icon icon="solar:cpu-bolt-bold-duotone" width="24" />
                                </div>
                            </div>
                            <div className={styles.engineProgress}>
                                <div className={styles.engineProgressBar} />
                            </div>
                            <div className={styles.engineStats}>
                                <div className={styles.engineStat}>
                                    <div className={styles.engineStatNumber}>3</div>
                                    <div className={styles.engineStatLabel}>{strings.panels.localTools}</div>
                                </div>
                                <div className={styles.engineStat}>
                                    <div className={styles.engineStatNumber}>2</div>
                                    <div className={styles.engineStatLabel}>{strings.panels.cloudTools}</div>
                                </div>
                            </div>
                        </GlassPanel>
                    </div>

                    <div
                        className={`${styles.parallaxLayer} ${styles.parallaxMiddle}`}
                        style={{ transform: `translateY(${offsets.middle}px)` }}
                    >
                        <GlassPanel variant="light" className={styles.toolPanel}>
                            <p className={styles.toolPanelTitle}>{strings.panels.workflowTitle}</p>
                            <p className={styles.toolPanelSubtitle}>{strings.panels.workflowSubtitle}</p>
                            <div className={styles.toolList}>
                                {TOOL_PREVIEW.map((tool) => (
                                    <div key={tool.label} className={styles.toolItem}>
                                        <div className={styles.toolLeft}>
                                            <div className={styles.toolIcon}>
                                                <Icon icon={tool.icon} width="18" />
                                            </div>
                                            <span className={styles.toolLabel}>{tool.label}</span>
                                        </div>
                                        <span className={styles.toolBadge}>{tool.mode}</span>
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
