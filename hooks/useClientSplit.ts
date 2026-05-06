"use client";

import { useState, useCallback } from "react";
import { splitPdf } from "@/services/pdf/split.client";
import { sileo } from "sileo";
import { useLanguage } from "@/hooks/useLanguage";
import { jobStorage } from "@/utils/jobStorage";
import { createZipFromBlobs } from "@/utils/zip";

type Status = "idle" | "loading" | "success" | "error";

const SILEO_STYLE = {
    fill: "#FFFFFF",
    roundness: 16,
    styles: {
        title: "text-slate-900! font-semibold",
        description: "text-slate-500!",
        badge: "bg-slate-100! text-slate-600! border border-slate-200/50!",
        button: "bg-[#1E3A8A]! text-white! hover:bg-[#1E3A8A]/90!",
    },
} as const;

export function useClientSplit() {
    const [status, setStatus] = useState<Status>("idle");
    const { t } = useLanguage();

    const run = useCallback(
        async (file: File, pages: number[], mode: "extract" | "separate") => {
            const jobId = crypto.randomUUID();

            jobStorage.upsert({
                jobId,
                tool: "split",
                status: "pending",
                createdAt: Date.now(),
            });

            if (pages.length === 0) {
                sileo.error({
                    title: t.split.notifications.validation_error,
                    description: t.split.notifications.validation_desc,
                    ...SILEO_STYLE,
                });
                return;
            }

            setStatus("loading");

            try {
                jobStorage.updateStatus(jobId, "started");

                await sileo.promise(
                    (async () => {
                        const blobs = await splitPdf(file, {
                            mode,
                            pages,
                        });

                        if (mode === "extract") {
                            const blob = blobs[0];
                            const url = URL.createObjectURL(blob);

                            const a = document.createElement("a");
                            a.href = url;
                            a.download = `docivo-${jobId}.pdf`;
                            a.click();

                            URL.revokeObjectURL(url);
                            return;
                        }

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

                        URL.revokeObjectURL(url);
                    })(),
                    {
                        loading: {
                            title: t.split.notifications.loading,
                            ...SILEO_STYLE,
                        },
                        success: {
                            title: t.split.notifications.success,
                            ...SILEO_STYLE,
                        },
                        error: {
                            title: t.split.notifications.error,
                            ...SILEO_STYLE,
                        },
                    }
                );

                jobStorage.updateStatus(jobId, "success");
                setStatus("success");
            } catch (error) {
                console.error(error);

                jobStorage.updateStatus(jobId, "failure");
                setStatus("error");

                sileo.error({
                    title: t.split.notifications.error,
                    description: "Unexpected error",
                    ...SILEO_STYLE,
                });
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