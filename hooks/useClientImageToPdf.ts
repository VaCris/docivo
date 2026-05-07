"use client";

import { useState, useCallback } from "react";
import { sileo } from "sileo";

import { imagesToPdf } from "@/services/pdf/image-to-pdf.client";
import { useLanguage } from "@/hooks/useLanguage";

type Status = "idle" | "loading" | "success" | "error";

export function useClientImageToPdf() {
    const [status, setStatus] = useState<Status>("idle");

    const { t } = useLanguage();

    const strings = t.imageToPdf.notifications;

    const run = useCallback(async (files: File[]) => {
        if (files.length === 0) {
            sileo.error({
                title: strings.validation_error,
                description: strings.validation_desc,
            });

            return;
        }

        setStatus("loading");

        try {
            await sileo.promise(
                (async () => {
                    const blob = await imagesToPdf(files);

                    const url = URL.createObjectURL(blob);

                    const a = document.createElement("a");

                    a.href = url;
                    a.download = `docivo-${crypto.randomUUID()}.pdf`;

                    a.click();

                    URL.revokeObjectURL(url);
                })(),
                {
                    loading: {
                        title: strings.loading,
                    },
                    success: {
                        title: strings.success,
                    },
                    error: {
                        title: strings.error,
                    },
                }
            );

            setStatus("success");
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    }, [strings]);

    return {
        run,
        status,
        isLoading: status === "loading",
    };
}