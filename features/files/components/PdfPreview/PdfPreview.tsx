"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

type Props = {
    file: File;
    page?: number;
    scale?: number;
};

const pdfCache = new Map<string, any>();

export const PdfPreview = ({ file, page = 1, scale = 0.3 }: Props) => {
    const { t } = useLanguage();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const renderTaskRef = useRef<any>(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const render = async () => {
            try {
                setError(false);

                const pdfjs = await import("pdfjs-dist/legacy/build/pdf");

                pdfjs.GlobalWorkerOptions.workerSrc = new URL(
                    "pdfjs-dist/build/pdf.worker.min.mjs",
                    import.meta.url
                ).toString();

                let pdf = pdfCache.get(file.name);

                if (!pdf) {
                    const buffer = await file.arrayBuffer();
                    pdf = await pdfjs.getDocument({ data: buffer }).promise;
                    pdfCache.set(file.name, pdf);
                }

                if (cancelled) return;

                const safePage = Math.min(page, pdf.numPages);
                const pdfPage = await pdf.getPage(safePage);

                const canvas = canvasRef.current;
                const ctx = canvas?.getContext("2d");

                if (!canvas || !ctx || cancelled) return;

                const viewport = pdfPage.getViewport({ scale });
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                renderTaskRef.current?.cancel?.();

                const task = pdfPage.render({
                    canvasContext: ctx,
                    canvas,
                    viewport,
                });

                renderTaskRef.current = task;
                await task.promise;

            } catch (err) {
                if (err instanceof Error) {
                    console.error("[Docivo Preview Error]:", {
                        message: err.message,
                        name: err.name,
                        stack: err.stack,
                    });
                } else {
                    console.error("[Docivo Preview Error]:", err);
                }
            }
        };

        render();

        return () => {
            cancelled = true;
            renderTaskRef.current?.cancel?.();
        };
    }, [file, page, scale]);

    if (error) {
        return (
            <div className="flex justify-center items-center bg-surface-100 px-2 rounded-md w-full max-w-[120px] aspect-[3/4] text-[10px] text-surface-400 text-center">
                {t.dropzone.preview_error}
            </div>
        );
    }

    return (
        <div className="flex justify-center items-center bg-surface-100 shadow-sm border border-surface-200 group-hover:border-brand-400 rounded-md w-full max-w-[120px] aspect-[3/4] overflow-hidden transition-colors">
            <canvas ref={canvasRef} className="w-full h-full object-contain" />
        </div>
    );
};