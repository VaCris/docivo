"use client";

import { useState, useCallback } from "react";
import { mergePdfs } from "@/services/pdf/merge.client";
import { sileo } from "sileo";
import { useLanguage } from "@/hooks/useLanguage";
import { jobStorage } from "@/utils/jobStorage";
import type { ToolProgressCallbacks } from "@/hooks/useToolProcessFeedback";

type Status = "idle" | "loading" | "success" | "error";

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

export function useClientMerge() {
  const [status, setStatus] = useState<Status>("idle");
  const { t } = useLanguage();

  const run = useCallback(
    async (files: File[], progress?: ToolProgressCallbacks) => {
      const strings = t.merge.notifications;

      if (files.length < 2) {
        sileo.error({
          title: strings.validation_error,
          description: (
            <span className="text-xs">{strings.validation_desc}</span>
          ),
        });
        return false;
      }

      setStatus("loading");
      progress?.onStarting?.();

      try {
        await sleep(350);
        progress?.onProcessing?.();

        const [blob] = await Promise.all([
          mergePdfs(files),
          sleep(450),
        ]);

        const jobId = crypto.randomUUID();

        jobStorage.upsert({
          jobId,
          tool: "merge",
          status: "success",
          createdAt: Date.now(),
          updatedAt: Date.now(),
          lastUsedAt: Date.now(),
        });

        progress?.onGenerating?.();
        await sleep(280);

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `docivo-${jobId}.pdf`;

        const triggerDownload = () => a.click();

        if (progress?.onSuccess) {
          await progress.onSuccess(triggerDownload);
        } else {
          triggerDownload();
        }

        setTimeout(() => URL.revokeObjectURL(url), 1000);

        setStatus("success");
        return true;
      } catch {
        setStatus("error");
        progress?.onError?.();
        sileo.error({
          title: strings.error_title,
          description: strings.error_desc,
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
