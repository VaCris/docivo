import JSZip from "jszip";

export const createZipFromBlobs = async (
    files: { name: string; blob: Blob }[]
): Promise<Blob> => {
    const zip = new JSZip();

    files.forEach(({ name, blob }) => {
        zip.file(name, blob);
    });

    return await zip.generateAsync({ type: "blob" });
};