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
            const { data } = await api.post<JobInitResponse>(
                "/tools/pdf-to-word",
                createFileFormData(file)
            );

            return data;
        },
    },

    ocr: {
        start: async (file: File): Promise<JobInitResponse> => {
            const { data } = await api.post<JobInitResponse>(
                "/tools/ocr",
                createFileFormData(file)
            );

            return data;
        },
    },

    ocrToWord: {
        start: async (file: File): Promise<JobInitResponse> => {
            const { data } = await api.post<JobInitResponse>(
                "/tools/ocr-to-word",
                createFileFormData(file)
            );

            return data;
        },
    },

    pdfToImages: {
        start: async (
            file: File,
            pages: string = "all"
        ): Promise<JobInitResponse> => {
            const formData = createFileFormData(file);
            formData.append("pages", pages);

            const { data } = await api.post<JobInitResponse>(
                "/tools/pdf-to-images",
                formData
            );

            return data;
        },
    },

    extractTextPdf: {
        start: async (file: File): Promise<JobInitResponse> => {
            const { data } = await api.post<JobInitResponse>(
                "/tools/extract-text-pdf",
                createFileFormData(file)
            );

            return data;
        },
    },

    wordToPdf: {
        start: async (file: File): Promise<JobInitResponse> => {
            const { data } = await api.post<JobInitResponse>(
                "/tools/word-to-pdf",
                createFileFormData(file)
            );

            return data;
        },
    },

    jobs: {
        getStatus: async (jobId: string) => {
            const { data } = await api.get<JobStatusResponse>(
                `/jobs/${jobId}`
            );

            return {
                jobId: data.job_id,
                status: mapCeleryStatusToJobStatus(data.status),
                result: data.result,
            };
        },

        download: async (jobId: string): Promise<Blob> => {
            const { data } = await api.get(`/downloads/${jobId}`, {
                responseType: "blob",
            });

            return data;
        },
    },
};