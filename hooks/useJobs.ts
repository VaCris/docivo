"use client";

import { useEffect, useState } from "react";
import { jobStorage } from "@/utils/jobStorage";
import { PersistedJob } from "@/types/job-cache";

export const useJobs = () => {
    const [jobs, setJobs] = useState<PersistedJob[]>([]);

    useEffect(() => {
        const sync = () => {
            setJobs(jobStorage.getAll());
        };

        sync();

        const unsubscribe = jobStorage.subscribe(sync);

        return unsubscribe;
    }, []);

    return jobs;
};