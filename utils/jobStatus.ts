import type { PersistedJobStatus } from "@/types/job-cache";

export type UIStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed";

export const mapJobStatusToUI = (
  status: PersistedJobStatus
): UIStatus => {
  switch (status) {
    case "pending":
      return "pending";
    case "started":
      return "processing";
    case "success":
      return "completed";
    case "failure":
      return "failed";
  }
};