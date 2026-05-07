"use client";

import { PDFDocument } from "pdf-lib";

export type ImageToPdfOrientation = "portrait" | "landscape";
export type ImageToPdfPageSize = "fit" | "a4" | "letter";
export type ImageToPdfMargin = "none" | "small" | "large";

export type ImageToPdfOptions = {
    orientation: ImageToPdfOrientation;
    pageSize: ImageToPdfPageSize;
    margin: ImageToPdfMargin;
};

const PAGE_SIZES: Record<Exclude<ImageToPdfPageSize, "fit">, [number, number]> = {
    a4: [595.28, 841.89],
    letter: [612, 792],
};

const MARGINS: Record<ImageToPdfMargin, number> = {
    none: 0,
    small: 24,
    large: 48,
};

const getPageSize = (
    imageWidth: number,
    imageHeight: number,
    options: ImageToPdfOptions
): [number, number] => {
    const margin = MARGINS[options.margin];

    if (options.pageSize === "fit") {
        return [imageWidth + margin * 2, imageHeight + margin * 2];
    }

    const [baseWidth, baseHeight] = PAGE_SIZES[options.pageSize];

    return options.orientation === "landscape"
        ? [baseHeight, baseWidth]
        : [baseWidth, baseHeight];
};

const webpToJpegBytes = async (file: File): Promise<ArrayBuffer> => {
    const bitmap = await createImageBitmap(file);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        throw new Error("Canvas context not available");
    }

    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    ctx.drawImage(bitmap, 0, 0);

    const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
            (result) => {
                if (!result) {
                    reject(new Error("Could not convert WebP image"));
                    return;
                }

                resolve(result);
            },
            "image/jpeg",
            0.95
        );
    });

    return blob.arrayBuffer();
};

export async function imagesToPdf(
    files: File[],
    options: ImageToPdfOptions
): Promise<Blob> {
    const pdf = await PDFDocument.create();

    for (const file of files) {
        const isPng = file.type === "image/png";
        const isJpeg = file.type === "image/jpeg" || file.type === "image/jpg";
        const isWebp = file.type === "image/webp";

        if (!isPng && !isJpeg && !isWebp) {
            throw new Error(`Unsupported image type: ${file.type}`);
        }

        const bytes = isWebp
            ? await webpToJpegBytes(file)
            : await file.arrayBuffer();

        const image = isPng
            ? await pdf.embedPng(bytes)
            : await pdf.embedJpg(bytes);

        const imageWidth = image.width;
        const imageHeight = image.height;
        const margin = MARGINS[options.margin];
        const [pageWidth, pageHeight] = getPageSize(
            imageWidth,
            imageHeight,
            options
        );

        const page = pdf.addPage([pageWidth, pageHeight]);

        const availableWidth = Math.max(pageWidth - margin * 2, 1);
        const availableHeight = Math.max(pageHeight - margin * 2, 1);

        const scale = Math.min(
            availableWidth / imageWidth,
            availableHeight / imageHeight
        );

        const drawWidth = imageWidth * scale;
        const drawHeight = imageHeight * scale;

        page.drawImage(image, {
            x: (pageWidth - drawWidth) / 2,
            y: (pageHeight - drawHeight) / 2,
            width: drawWidth,
            height: drawHeight,
        });
    }

    const pdfBytes = await pdf.save();

    return new Blob([pdfBytes], {
        type: "application/pdf",
    });
}