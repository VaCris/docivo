export const DROPZONE_CONFIG = {
    maxSizeMB: 50,
    maxFiles: 20,
    acceptedMimeTypes: ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'],
    acceptedExtensions: '.pdf,.jpg,.jpeg,.png,.webp',

    icons: {
        uploadMain: 'solar:upload-minimalistic-linear',
        folderOpen: 'solar:folder-open-linear',
        close: 'solar:close-circle-linear',
        play: 'solar:play-circle-linear',
        download: 'solar:download-minimalistic-linear',

        fileTypes: {
            pdf: 'solar:document-bold',
            image: 'solar:gallery-bold',
            default: 'solar:file-bold'
        }
    }
};