import { api } from "@/services/api/client";
import {
    JobInitResponse,
    JobStatusResponse,
    CeleryJobStatus,
} from "@/types/api.dto";

const mapStatus = (status: CeleryJobStatus) => {
    switch (status) {
        case "PENDING":
            return "pending";
        case "STARTED":
            return "processing";
        case "SUCCESS":
            return "completed";
        case "FAILURE":
            return "failed";
    }
};

export const toolsService = {
    merge: {
        start: async (files: File[]): Promise<JobInitResponse> => {
            const formData = new FormData();
            files.forEach((file) => formData.append("files", file));

            const { data } = await api.post<JobInitResponse>(
                "/tools/merge",
                formData
            );

            return data;
        },
    },

    pdfToWord: {
        start: async (file: File): Promise<JobInitResponse> => {
            const formData = new FormData();
            formData.append("file", file);

            const { data } = await api.post<JobInitResponse>(
                "/tools/pdf-to-word",
                formData
            );

            return data;
        },
    },

    ocr: {
        start: async (file: File): Promise<JobInitResponse> => {
            const formData = new FormData();
            formData.append("file", file);

            const { data } = await api.post<JobInitResponse>(
                "/tools/ocr",
                formData
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
                status: mapStatus(data.status),
            };
        },

        download: async (jobId: string): Promise<Blob> => {
            const { data } = await api.get(
                `/downloads/${jobId}`,
                { responseType: "blob" }
            );

            return data;
        },
    },
};