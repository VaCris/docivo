export const FOOTER_CONFIG = {
    columns: {
        tools: [
            { id: 'merge', href: '/dashboard/merge' },
            { id: 'split', href: '/dashboard/split' },
            { id: 'ocr', href: '/dashboard/ocr' },
            { id: 'pdfToWord', href: '/dashboard/convert-pdf-to-word' },
            { id: 'imageToPdf', href: '/dashboard/convert-image-to-pdf' }
        ],
        project: [
            { id: 'architecture', href: '#architecture' },
            { id: 'howItWorks', href: '#details' },
            { id: 'roadmap', href: '/roadmap' },
            { id: 'contact', href: '/contact' }
        ],
        legal: [
            { id: 'privacy', href: '/privacy' },
            { id: 'terms', href: '/terms' }
        ]
    },
    social: [
        { name: 'GitHub', icon: 'mdi:github', href: 'https://github.com/VaCris' }
    ]
};