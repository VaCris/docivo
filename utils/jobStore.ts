import { useEffect, useState } from "react";
import { jobStorage } from "@/utils/jobStorage";
import { PersistedJob } from "@/types/job-cache";

export const useJobs = () => {
    const [jobs, setJobs] = useState<PersistedJob[]>(() =>
        jobStorage.getAll()
    );

    useEffect(() => {
        return jobStorage.subscribe(() => {
            setJobs(jobStorage.getAll());
        });
    }, []);

    return jobs;
};