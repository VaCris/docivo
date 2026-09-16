"use client";

import type { ToolProcessStage } from "@/hooks/useToolProcessFeedback";
import styles from "./ToolProcessFeedback.module.css";

type ToolProcessFeedbackProps = {
    stage: ToolProcessStage;
    message: string;
};

const PROGRESS_STAGES: ToolProcessStage[] = [
    "starting",
    "processing",
    "generating",
];

export function ToolProcessFeedback({
    stage,
    message,
}: ToolProcessFeedbackProps) {
    if (stage === "idle" || stage === "error" || !message) return null;

    if (stage === "success") {
        return (
            <div className={styles.overlay} aria-live="polite" aria-atomic="true">
                <div className={styles.successCard} role="status">
                    <div className={styles.successIcon} aria-hidden="true">
                        <svg viewBox="0 0 52 52" className={styles.checkSvg}>
                            <circle className={styles.checkCircle} cx="26" cy="26" r="24" />
                            <path
                                className={styles.checkPath}
                                fill="none"
                                d="M15 27.5 22.5 35 38 18.5"
                            />
                        </svg>
                    </div>
                    <p className={styles.successEyebrow}>Docivo</p>
                    <p className={styles.successMessage}>{message}</p>
                </div>
            </div>
        );
    }

    if (!PROGRESS_STAGES.includes(stage)) return null;

    return (
        <div className={styles.toastRegion} aria-live="polite" aria-atomic="true">
            <div className={styles.progressToast} role="status">
                <div className={styles.spinner} aria-hidden="true" />
                <div className={styles.progressCopy}>
                    <span className={styles.progressLabel}>Docivo</span>
                    <span className={styles.progressMessage}>{message}</span>
                </div>
                <div className={styles.progressDots} aria-hidden="true">
                    <span />
                    <span />
                    <span />
                </div>
            </div>
        </div>
    );
}
