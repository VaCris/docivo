import { api } from "@/services/api/client";
import {
    JobInitResponse,
    JobStatusResponse,
    CeleryJobStatus,
} from "@/types/api.dto";
import type { PersistedJobStatus } from "@/types/job-cache";

const mapCeleryStatusToJobStatus = (
    status: CeleryJobStatus
): PersistedJobStatus => {
    switch (status) {
        case "PENDING":
            return "pending";
        case "STARTED":
            return "started";
        case "SUCCESS":
            return "success";
        case "FAILURE":
            return "failure";
    }
};

const createFileFormData = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return formData;
};

export const toolsService = {
    pdfToWord: {
        start: async (file: File): Promise<JobInitResponse> => {
            return api.post<JobInitResponse>(
                "/tools/pdf-to-word",
                createFileFormData(file)
            );
        },
    },

    ocr: {
        start: async (file: File): Promise<JobInitResponse> => {
            return api.post<JobInitResponse>(
                "/tools/ocr",
                createFileFormData(file)
            );
        },
    },

    ocrToWord: {
        start: async (file: File): Promise<JobInitResponse> => {
            return api.post<JobInitResponse>(
                "/tools/ocr-to-word",
                createFileFormData(file)
            );
        },
    },

    pdfToImages: {
        start: async (
            file: File,
            pages: string = "all"
        ): Promise<JobInitResponse> => {
            const formData = createFileFormData(file);
            formData.append("pages", pages);

            return api.post<JobInitResponse>(
                "/tools/pdf-to-images",
                formData
            );
        },
    },

    extractTextPdf: {
        start: async (file: File): Promise<JobInitResponse> => {
            return api.post<JobInitResponse>(
                "/tools/extract-text-pdf",
                createFileFormData(file)
            );
        },
    },

    wordToPdf: {
        start: async (file: File): Promise<JobInitResponse> => {
            return api.post<JobInitResponse>(
                "/tools/word-to-pdf",
                createFileFormData(file)
            );
        },
    },

    jobs: {
        getStatus: async (jobId: string) => {
            const data = await api.get<JobStatusResponse>(
                `/jobs/${jobId}`
            );

            return {
                jobId: data.job_id,
                status: mapCeleryStatusToJobStatus(data.status),
                result: data.result,
            };
        },

        download: async (jobId: string): Promise<Blob> => {
            return api.get(`/downloads/${jobId}`, {
                responseType: "blob",
            });
        },
    },
};
