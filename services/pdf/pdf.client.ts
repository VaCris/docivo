import { PDFDocument } from "pdf-lib";

export const pdfClient = {
    merge: async (files: File[]): Promise<Blob> => {
        const mergedPdf = await PDFDocument.create();

        for (const file of files) {
            const bytes = await file.arrayBuffer();
            const pdf = await PDFDocument.load(bytes);

            const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            pages.forEach((p) => mergedPdf.addPage(p));
        }

        const finalBytes = await mergedPdf.save();
        return new Blob([finalBytes], { type: "application/pdf" });
    },

    split: async (file: File): Promise<Blob[]> => {
        const bytes = await file.arrayBuffer();
        const pdf = await PDFDocument.load(bytes);

        const result: Blob[] = [];

        for (const index of pdf.getPageIndices()) {
            const newPdf = await PDFDocument.create();
            const [page] = await newPdf.copyPages(pdf, [index]);
            newPdf.addPage(page);

            const bytes = await newPdf.save();
            result.push(new Blob([bytes], { type: "application/pdf" }));
        }

        return result;
    },
};