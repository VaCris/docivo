"use client";

import { useState, useCallback } from "react";
import { sileo } from "sileo";

import {
    imagesToPdf,
    type ImageToPdfOptions,
} from "@/services/pdf/image-to-pdf.client";
import { useLanguage } from "@/hooks/useLanguage";
import { jobStorage } from "@/utils/jobStorage";
import type { ToolProgressCallbacks } from "@/hooks/useToolProcessFeedback";

type Status = "idle" | "loading" | "success" | "error";

const sleep = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms));

export function useClientImageToPdf() {
    const [status, setStatus] = useState<Status>("idle");
    const { t } = useLanguage();

    const run = useCallback(
        async (
            files: File[],
            options: ImageToPdfOptions,
            progress?: ToolProgressCallbacks
        ) => {
            const strings = t.imageToPdf.notifications;

            if (files.length === 0) {
                sileo.error({
                    title: strings.validation_error,
                    description: strings.validation_desc,
                });
                return false;
            }

            const jobId = crypto.randomUUID();

            jobStorage.upsert({
                jobId,
                tool: "image-to-pdf",
                status: "pending",
                createdAt: Date.now(),
                updatedAt: Date.now(),
                lastUsedAt: Date.now(),
            });

            setStatus("loading");
            progress?.onStarting?.();

            try {
                await sleep(350);
                progress?.onProcessing?.();
                jobStorage.updateStatus(jobId, "started");

                const [blob] = await Promise.all([
                    imagesToPdf(files, options),
                    sleep(450),
                ]);

                progress?.onGenerating?.();
                await sleep(280);

                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");

                a.href = url;
                a.download = `docivo-${jobId}.pdf`;

                const triggerDownload = () => a.click();

                jobStorage.updateStatus(jobId, "success");

                if (progress?.onSuccess) {
                    await progress.onSuccess(triggerDownload);
                } else {
                    triggerDownload();
                }

                setTimeout(() => URL.revokeObjectURL(url), 1000);

                setStatus("success");
                return true;
            } catch {
                jobStorage.updateStatus(jobId, "failure");
                setStatus("error");
                progress?.onError?.();
                sileo.error({
                    title: strings.error,
                });
                return false;
            }
        },
        [t]
    );

    return {
        run,
        status,
        isLoading: status === "loading",
    };
}
