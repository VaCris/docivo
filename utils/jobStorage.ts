import { PersistedJob } from "@/types/job-cache";

const KEY = "docivo.jobs";

type Listener = () => void;

let listeners: Listener[] = [];

const emit = () => {
    listeners.forEach(l => l());
};

const safeRead = (): PersistedJob[] => {
    try {
        const raw = localStorage.getItem(KEY);
        if (!raw) return [];

        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
};

const write = (jobs: PersistedJob[]) => {
    localStorage.setItem(KEY, JSON.stringify(jobs));
    emit();
};

export const jobStorage = {
    getAll: (): PersistedJob[] => {
        try {
            const raw = localStorage.getItem(KEY);
            if (!raw) return [];
            return JSON.parse(raw) as PersistedJob[];
        } catch {
            return [];
        }
    },

    getById: (jobId: string): PersistedJob | null =>
        safeRead().find(j => j.jobId === jobId) ?? null,

    getByTool: (tool: string): PersistedJob[] =>
        safeRead().filter(j => j.tool === tool),

    upsert: (job: PersistedJob) => {
        const jobs = safeRead();
        const idx = jobs.findIndex(j => j.jobId === job.jobId);

        if (idx >= 0) {
            jobs[idx] = {
                ...job,
                updatedAt: Date.now(),
            };
        } else {
            jobs.push(job);
        }

        write(jobs);
    },

    updateStatus: (jobId: string, status: PersistedJob["status"]) => {
        const jobs = safeRead();
        const idx = jobs.findIndex(j => j.jobId === jobId);
        if (idx === -1) return;

        jobs[idx] = {
            ...jobs[idx],
            status,
            updatedAt: Date.now(),
        };

        write(jobs);
    },

    remove: (jobId: string) => {
        write(safeRead().filter(j => j.jobId !== jobId));
    },

    clear: () => {
        localStorage.removeItem(KEY);
        emit();
    },

    subscribe: (listener: Listener) => {
        listeners.push(listener);

        return () => {
            listeners = listeners.filter(l => l !== listener);
        };
    },

    markAsUsed: (jobId: string) => {
        const jobs = safeRead();
        const idx = jobs.findIndex(j => j.jobId === jobId);
        if (idx === -1) return;

        jobs[idx] = {
            ...jobs[idx],
            lastUsedAt: Date.now(),
        };

        write(jobs);
    },
};