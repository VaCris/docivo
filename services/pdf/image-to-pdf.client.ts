"use client";

import { PDFDocument } from "pdf-lib";

export async function imagesToPdf(files: File[]): Promise<Blob> {
    const pdf = await PDFDocument.create();

    for (const file of files) {
        const bytes = await file.arrayBuffer();

        const isPng = file.type === "image/png";

        const image = isPng
            ? await pdf.embedPng(bytes)
            : await pdf.embedJpg(bytes);

        const { width, height } = image.scale(1);

        const page = pdf.addPage([width, height]);

        page.drawImage(image, {
            x: 0,
            y: 0,
            width,
            height,
        });
    }

    const pdfBytes = await pdf.save();

    return new Blob([pdfBytes], {
        type: "application/pdf",
    });
}