"use client";

import { useCallback, useState } from "react";
import { sileo } from "sileo";
import { jobStorage } from "@/utils/jobStorage";
import { toolsService } from "@/services/tools/tools.service";
import type { PersistedJobStatus } from "@/types/job-cache";

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
};

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

const sleep = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));

const isFinalStatus = (status: PersistedJobStatus) =>
  status === "success" || status === "failure";

export function useBackendJob() {
  const [status, setStatus] = useState<Status>("idle");

  const run = useCallback(
    async ({ tool, strings, start, filename }: UseBackendJobOptions) => {
      setStatus("loading");

      try {
        await sileo.promise(
          (async () => {
            const { job_id } = await start();

            jobStorage.upsert({
              jobId: job_id,
              tool,
              status: "pending",
              createdAt: Date.now(),
              updatedAt: Date.now(),
              lastUsedAt: Date.now(),
            });

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

            const blob = await toolsService.jobs.download(job_id);
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = filename(job_id);
            a.click();

            setTimeout(() => URL.revokeObjectURL(url), 1000);

            jobStorage.updateStatus(job_id, "success");
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

        setStatus("success");
      } catch (error) {
        console.error("[Docivo Backend Job Error]:", error);
        setStatus("error");
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