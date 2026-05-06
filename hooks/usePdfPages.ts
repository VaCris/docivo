import { useEffect, useState } from "react";

export function usePdfPages(file: File | null) {
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        if (!file) return;

        let cancelled = false;

        const load = async () => {
            const pdfjs = await import("pdfjs-dist/legacy/build/pdf");
            pdfjs.GlobalWorkerOptions.workerSrc = new URL(
                "pdfjs-dist/build/pdf.worker.min.mjs",
                import.meta.url
            ).toString();

            const buffer = await file.arrayBuffer();
            const pdf = await pdfjs.getDocument({ data: buffer }).promise;

            if (!cancelled) {
                setTotalPages(pdf.numPages);
            }
        };

        load();

        return () => {
            cancelled = true;
        };
    }, [file]);

    return totalPages;
}