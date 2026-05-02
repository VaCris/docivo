export const MOCK_RECENT_FILES = [
    {
        id: 'f_123',
        name: 'Q1_Financial_Report.pdf',
        tool: 'merge',
        toolLabel: 'Merge PDF',
        date: 'Today, 09:45 AM',
        size: '2.4 MB',
        status: 'completed',
        icon: 'solar:file-bold-duotone'
    },
    {
        id: 'f_124',
        name: 'Scanned_Contract_Signed.pdf',
        tool: 'ocr',
        toolLabel: 'OCR PDF',
        date: 'Yesterday, 14:20 PM',
        size: '5.1 MB',
        status: 'processing',
        icon: 'solar:scanner-bold-duotone'
    },
    {
        id: 'f_125',
        name: 'Presentation_Slides.docx',
        tool: 'convert-pdf',
        toolLabel: 'PDF to Word',
        date: 'Oct 24, 11:15 AM',
        size: '1.8 MB',
        status: 'failed',
        icon: 'solar:document-text-bold-duotone'
    }
];

export const STATUS_STYLES = {
    completed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    processing: 'bg-amber-50 text-amber-700 border-amber-200',
    failed: 'bg-red-50 text-red-700 border-red-200'
};