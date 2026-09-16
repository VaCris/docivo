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

                let downloadBlob: Blob;
                let downloadName: string;

                if (mode === "extract") {
                    downloadBlob = blobs[0];
                    downloadName = `docivo-${jobId}.pdf`;
                } else {
                    downloadBlob = await createZipFromBlobs(
                        blobs.map((blob, index) => ({
                            name: `docivo-${jobId}-${index + 1}.pdf`,
                            blob,
                        }))
                    );
                    downloadName = `docivo-${jobId}.zip`;
                }

                const url = URL.createObjectURL(downloadBlob);
                const a = document.createElement("a");
                a.href = url;
                a.download = downloadName;

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
                    title: t.split.notifications.error,
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
