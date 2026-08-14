export const NAVBAR_CONFIG = {
    navItems: [
        { id: 'tools', type: 'anchor', href: '#tools' },
        { id: 'howItWorks', type: 'anchor', href: '#details' },
        { id: 'upload', type: 'route', href: '/dashboard' },
    ],
    footerItems: [
        { id: 'privacy', type: 'route', href: '/privacy' },
        { id: 'terms', type: 'route', href: '/terms' },
    ],
    icons: {
        arrowRight: 'solar:arrow-right-linear',
        menuOpen: 'solar:hamburger-menu-linear',
        menuClose: 'solar:close-circle-linear',
    },
};