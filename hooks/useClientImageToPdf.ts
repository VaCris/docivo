"use client";

import { useState, useCallback } from "react";
import { sileo } from "sileo";

import {
    imagesToPdf,
    type ImageToPdfOptions,
} from "@/services/pdf/image-to-pdf.client";
import { useLanguage } from "@/hooks/useLanguage";
import { jobStorage } from "@/utils/jobStorage";

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

export function useClientImageToPdf() {
    const [status, setStatus] = useState<Status>("idle");
    const { t } = useLanguage();

    const run = useCallback(
        async (files: File[], options: ImageToPdfOptions) => {
            const strings = t.imageToPdf.notifications;

            if (files.length === 0) {
                sileo.error({
                    title: strings.validation_error,
                    description: strings.validation_desc,
                    ...SILEO_STYLE,
                });
                return;
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

            try {
                jobStorage.updateStatus(jobId, "started");

                await sileo.promise(
                    (async () => {
                        const blob = await imagesToPdf(files, options);

                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");

                        a.href = url;
                        a.download = `docivo-${jobId}.pdf`;
                        a.click();

                        setTimeout(() => URL.revokeObjectURL(url), 1000);
                    })(),
                    {
                        loading: {
                            title: strings.loading,
                            ...SILEO_STYLE,
                        },
                        success: {
                            title: strings.success,
                            ...SILEO_STYLE,
                        },
                        error: {
                            title: strings.error,
                            ...SILEO_STYLE,
                        },
                    }
                );

                jobStorage.updateStatus(jobId, "success");
                setStatus("success");
            } catch (error) {
                jobStorage.updateStatus(jobId, "failure");
                setStatus("error");
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