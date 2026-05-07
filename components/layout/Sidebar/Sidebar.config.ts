export const SIDEBAR_CONFIG = {
    navItems: [
        { id: 'overview', href: '/dashboard', icon: 'solar:home-smile-linear' },
        { id: 'merge', href: '/dashboard/merge', icon: "solar:layers-minimalistic-bold-duotone" },
        { id: 'split', href: '/dashboard/split', icon: 'solar:scissors-linear' },
        { id: 'ocr', href: '/dashboard/ocr', icon: 'solar:eye-scan-linear' },
        { id: 'convert-pdf', href: '/dashboard/convert-pdf-to-word', icon: 'solar:file-text-linear' },
        { id: 'convert-image', href: '/dashboard/convert-image-to-pdf', icon: 'solar:gallery-add-linear' },
    ],
    bottomItems: [
        { id: 'settings', href: '/dashboard/settings', icon: 'solar:settings-linear' }
    ]
};