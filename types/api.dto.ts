export type CeleryJobStatus =
    | "PENDING"
    | "STARTED"
    | "SUCCESS"
    | "FAILURE";

export interface JobInitResponse {
    job_id: string;
    message?: string;
}

export interface JobStatusResponse<T = unknown> {
    job_id: string;
    status: CeleryJobStatus;
    result: T | null;
}