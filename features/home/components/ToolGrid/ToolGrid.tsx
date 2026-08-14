"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { useLanguage } from "@/hooks/useLanguage";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { GlassPanel } from "@/components/ui/GlassPanel/GlassPanel";
import { TOOLGRID_CONFIG } from "./ToolGrid.config";
import styles from "./ToolGrid.module.css";

type ToolBadge = "local" | "cloud";

const TOOL_META: Record<string, { href: string; badge: ToolBadge }> = {
  merge: { href: "/dashboard/merge", badge: "local" },
  split: { href: "/dashboard/split", badge: "local" },
  imageToPdf: { href: "/dashboard/convert-image-to-pdf", badge: "local" },
  pdfToWord: { href: "/dashboard/convert-pdf-to-word", badge: "cloud" },
  ocr: { href: "/dashboard/ocr", badge: "cloud" },
};

const REVEAL_DELAYS = ["reveal-delay-0", "reveal-delay-1", "reveal-delay-2", "reveal-delay-3", "reveal-delay-4", "reveal-delay-5"];

export const ToolGrid = () => {
  const { t } = useLanguage();
  const strings = t.toolGrid;
  const [sectionRef, sectionRevealed] = useScrollReveal<HTMLDivElement>();

  return (
    <section id="tools" className={`${styles.section} dark:bg-surface-900 dark:border-surface-300`}>
      <div className="mx-auto max-w-7xl">
        <div
          ref={sectionRef}
          className={`mb-16 flex flex-col items-center text-center scroll-reveal ${sectionRevealed ? "revealed" : ""}`}
        >
          <div className={styles.sectionBadge}>
            <Icon icon="solar:widget-4-linear" width="14" className="text-brand-600" />
            {strings.badge}
          </div>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionTitleGradient}>{strings.title}</span>
          </h2>
          <p className={styles.sectionSubtitle}>{strings.subtitle}</p>
        </div>

        <div className={styles.constellation}>
          {/* SVG connection lines */}
          <svg className={styles.connections} viewBox="0 0 800 400" fill="none" aria-hidden="true">
            <line x1="150" y1="120" x2="400" y2="200" stroke="var(--color-surface-200)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="400" y1="200" x2="650" y2="100" stroke="var(--color-surface-200)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="400" y1="200" x2="250" y2="340" stroke="var(--color-surface-200)" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="400" y1="200" x2="600" y2="340" stroke="var(--color-surface-200)" strokeWidth="1" strokeDasharray="4 4" />
          </svg>

          {TOOLGRID_CONFIG.map((tool, index) => {
            const toolContent = strings.items[tool.id as keyof typeof strings.items];
            const meta = TOOL_META[tool.id];
            const delayClass = REVEAL_DELAYS[index] ?? REVEAL_DELAYS[0];

            return (
              <Link
                key={tool.id}
                href={meta?.href ?? "/dashboard"}
                className={`${styles.toolNode} scroll-reveal ${sectionRevealed ? "revealed" : ""} ${delayClass}`}
                aria-label={`${toolContent.title} - ${toolContent.desc}`}
              >
                <GlassPanel variant="subtle" className={`${styles.toolCard} dark:bg-surface-800/60`}>
                  <div className={`${styles.toolIconWrap} dark:bg-surface-700/50 dark:border-surface-300`}>
                    <Icon icon={tool.icon} width="24" />
                  </div>
                  <span className={`${styles.toolLabel} dark:text-surface-100`}>{toolContent.title}</span>
                </GlassPanel>

                {/* Tooltip */}
                <div className={`${styles.tooltip} dark:bg-surface-800 dark:border-surface-300 dark:shadow-black/40`}>
                  <p className={`${styles.tooltipTitle} dark:text-surface-100`}>{toolContent.title}</p>
                  <p className={`${styles.tooltipDesc} dark:text-surface-400`}>{toolContent.desc}</p>
                  {meta && (
                    <span className={`${styles.tooltipBadge} ${meta.badge === "local" ? styles.badgeLocal : styles.badgeCloud} dark:bg-surface-700 ${meta.badge === "local" ? "dark:text-brand-400" : "dark:text-brand-300"}`}>
                      {strings.meta[meta.badge]}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}

          {/* Coming soon */}
          <div className={`${styles.comingSoonNode} scroll-reveal ${sectionRevealed ? "revealed" : ""} reveal-delay-5`}>
            <div className={`${styles.toolIconWrap} ${styles.comingSoonIcon}`}>
              <Icon icon="solar:lock-linear" width="24" />
            </div>
            <span className={styles.toolLabel}>{strings.comingSoon.title}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
