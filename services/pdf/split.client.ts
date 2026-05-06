"use client";

import { PDFDocument } from "pdf-lib";

export type SplitOptions = {
    mode: "extract" | "separate";
    pages: number[];
};

function toPdfBlob(bytes: Uint8Array): Blob {
    const safeBuffer = new Uint8Array(bytes).buffer;
    return new Blob([safeBuffer], { type: "application/pdf" });
}

export const splitPdf = async (
    file: File,
    options: SplitOptions
): Promise<Blob[]> => {
    const fileBytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(fileBytes);

    const totalPages = pdf.getPageCount();

    if (!options.pages.length) {
        throw new Error("No pages selected");
    }

    const normalizedPages = Array.from(
        new Set(
            options.pages
                .filter(p => p >= 1 && p <= totalPages)
                .map(p => p - 1)
        )
    );

    if (!normalizedPages.length) {
        throw new Error("No valid pages after normalization");
    }

    if (options.mode === "extract") {
        const newPdf = await PDFDocument.create();

        const copied = await newPdf.copyPages(pdf, normalizedPages);
        copied.forEach(p => newPdf.addPage(p));

        const outputBytes = await newPdf.save();

        return [toPdfBlob(outputBytes)];
    }

    const results: Blob[] = [];

    for (const pageIndex of normalizedPages) {
        const newPdf = await PDFDocument.create();

        const [page] = await newPdf.copyPages(pdf, [pageIndex]);
        newPdf.addPage(page);

        const outputBytes = await newPdf.save();

        results.push(toPdfBlob(outputBytes));
    }

    return results;
};