"use client";

import { useState, useCallback } from "react";
import { splitPdf } from "@/services/pdf/split.client";
import { sileo } from "sileo";
import { useLanguage } from "@/hooks/useLanguage";
import { jobStorage } from "@/utils/jobStorage";
import { createZipFromBlobs } from "@/utils/zip";
import type { ToolProgressCallbacks } from "@/hooks/useToolProcessFeedback";

type Status = "idle" | "loading" | "success" | "error";

const sleep = (ms: number) =>
    new Promise<void>((resolve) => setTimeout(resolve, ms));

export function useClientSplit() {
    const [status, setStatus] = useState<Status>("idle");
    const { t } = useLanguage();

    const run = useCallback(
        async (
            file: File,
            pages: number[],
            mode: "extract" | "separate",
            progress?: ToolProgressCallbacks
        ) => {
            if (pages.length === 0) {
                sileo.error({
                    title: t.split.notifications.validation_error,
                    description: t.split.notifications.validation_desc,
                });
                return false;
            }

            const jobId = crypto.randomUUID();

            jobStorage.upsert({
                jobId,
                tool: "split",
                status: "pending",
                createdAt: Date.now(),
            });

            setStatus("loading");
            progress?.onStarting?.();

            try {
                await sleep(350);
                progress?.onProcessing?.();
                jobStorage.updateStatus(jobId, "started");

                const [blobs] = await Promise.all([
                    splitPdf(file, {
                        mode,
                        pages,
                    }),
                    sleep(450),
                ]);

                progress?.onGenerating?.();
                await sleep(280);

                if (mode === "extract") {
                    const blob = blobs[0];
                    const url = URL.createObjectURL(blob);

                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `docivo-${jobId}.pdf`;
                    a.click();

                    setTimeout(() => URL.revokeObjectURL(url), 1000);
                } else {
                    const zipBlob = await createZipFromBlobs(
                        blobs.map((blob, index) => ({
                            name: `docivo-${jobId}-${index + 1}.pdf`,
                            blob,
                        }))
                    );

                    const url = URL.createObjectURL(zipBlob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `docivo-${jobId}.zip`;
                    a.click();
                    setTimeout(() => URL.revokeObjectURL(url), 1000);
                }

                jobStorage.updateStatus(jobId, "success");
                setStatus("success");
                progress?.onSuccess?.();
                return true;
            } catch {
                jobStorage.updateStatus(jobId, "failure");
                setStatus("error");
                progress?.onError?.();

                sileo.error({
                    title: t.split.notifications.error,
                    description: "Unexpected error",
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
