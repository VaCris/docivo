"use client";

import { useState, useCallback } from "react";
import { mergePdfs } from "@/services/pdf/merge.client";
import { sileo } from "sileo";
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
    button:
      "bg-[#1E3A8A]! text-white! hover:bg-[#1E3A8A]/90! transition-colors!",
  },
} as const;

export function useClientMerge() {
  const [status, setStatus] = useState<Status>("idle");
  const { t } = useLanguage();

  const run = useCallback(
    async (files: File[]) => {
      const strings = t.merge.notifications;

      if (files.length < 2) {
        sileo.error({
          title: strings.validation_error,
          description: (
            <span className="text-xs">{strings.validation_desc}</span>
          ),
          ...SILEO_STYLE,
        });
        return;
      }

      setStatus("loading");

      try {
        await sileo.promise(
          (async () => {
            const blob = await mergePdfs(files);

            const jobId = crypto.randomUUID();

            jobStorage.upsert({
              jobId,
              tool: "merge",
              status: "success",
              createdAt: Date.now(),
              updatedAt: Date.now(),
              lastUsedAt: Date.now(),
            });

            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `docivo-${jobId}.pdf`;
            a.click();
            URL.revokeObjectURL(url);
          })(),
          {
            loading: {
              title: strings.loading,
              ...SILEO_STYLE,
            },
            success: {
              title: strings.success_title,
              description: (
                <div className="flex flex-col gap-2 mt-1">
                  <span className="text-slate-500! text-xs!">
                    {strings.success_desc}
                  </span>
                </div>
              ),
              ...SILEO_STYLE,
            },
            error: {
              title: strings.error_title,
              description: strings.error_desc,
              ...SILEO_STYLE,
            },
          }
        );

        setStatus("success");
      } catch (error) {
        console.error("[Docivo Client Error]:", error);
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