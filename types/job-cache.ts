export type PersistedJobStatus =
    | "pending"
    | "started"
    | "success"
    | "failure";

export interface PersistedJob {
    jobId: string;
    tool: string;
    status: PersistedJobStatus;
    createdAt: number;
    updatedAt?: number;
    lastUsedAt?: number;
}