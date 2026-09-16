"use client";

import { useCallback, useState } from "react";
import { sileo } from "sileo";
import { jobStorage } from "@/utils/jobStorage";
import { toolsService } from "@/services/tools/tools.service";
import type { PersistedJobStatus } from "@/types/job-cache";
import type { ToolProgressCallbacks } from "@/hooks/useToolProcessFeedback";

type Status = "idle" | "loading" | "success" | "error";

type BackendJobStrings = {
  loading: string;
  success: string;
  error: string;
  validation_error: string;
  validation_desc: string;
};

type UseBackendJobOptions = {
  tool: string;
  strings: BackendJobStrings;
  start: () => Promise<{ job_id: string }>;
  filename: (jobId: string) => string;
  progress?: ToolProgressCallbacks;
};

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

const isFinalStatus = (status: PersistedJobStatus) =>
  status === "success" || status === "failure";

export function useBackendJob() {
  const [status, setStatus] = useState<Status>("idle");

  const run = useCallback(
    async ({ tool, strings, start, filename, progress }: UseBackendJobOptions) => {
      setStatus("loading");
      progress?.onStarting?.();

      try {
        await sleep(350);
        const { job_id } = await start();

        jobStorage.upsert({
          jobId: job_id,
          tool,
          status: "pending",
          createdAt: Date.now(),
          updatedAt: Date.now(),
          lastUsedAt: Date.now(),
        });

        progress?.onProcessing?.();

        let currentStatus: PersistedJobStatus = "pending";

        while (!isFinalStatus(currentStatus)) {
          await sleep(1500);

          const res = await toolsService.jobs.getStatus(job_id);
          currentStatus = res.status;

          jobStorage.updateStatus(job_id, currentStatus);
        }

        if (currentStatus === "failure") {
          throw new Error(strings.error);
        }

        progress?.onGenerating?.();

        const blob = await toolsService.jobs.download(job_id);
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = filename(job_id);

        const triggerDownload = () => a.click();

        jobStorage.updateStatus(job_id, "success");

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
          title: strings.error,
        });
        return false;
      }
    },
    []
  );

  return {
    run,
    status,
    isLoading: status === "loading",
  };
}
