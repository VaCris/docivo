"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';
import { useLanguage } from '@/hooks/useLanguage';

import { SIDEBAR_CONFIG } from './Sidebar.config';
import styles from './Sidebar.module.css';

export const Sidebar = () => {
    const { currentLang, toggleLanguage, t } = useLanguage();
    const pathname = usePathname();

    return (
        <aside className={styles.sidebar}>
            <Link href="/dashboard" className={styles.brand}>
                <img src="/images/Logo.png" alt="Docivo Logo" className="w-auto h-8 object-contain" />
                <span className="font-bold text-surface-800 text-lg tracking-tight">docivo</span>
            </Link>

            <div className="flex-1">
                <p className="mb-4 px-2 font-bold text-surface-400 text-xs uppercase tracking-wider">
                    {t.sidebar.menu}
                </p>

                <nav className="space-y-1">
                    {SIDEBAR_CONFIG.navItems.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                            >
                                <Icon icon={item.icon} width="20" />
                                {t.sidebar.links[item.id as keyof typeof t.sidebar.links]}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="space-y-4 mt-auto">
                <nav className="space-y-1">
                    {SIDEBAR_CONFIG.bottomItems.map((item) => {
                        const isActive = pathname === item.href;

                        return (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                            >
                                <Icon icon={item.icon} width="20" />
                                {t.sidebar.links[item.id as keyof typeof t.sidebar.links]}
                            </Link>
                        );
                    })}

                    <button
                        onClick={toggleLanguage}
                        className={`${styles.navLink} w-full text-left justify-between`}
                    >
                        <div className="flex items-center gap-3">
                            <Icon icon="solar:global-linear" width="20" />
                            {t.sidebar.language}
                        </div>

                        <span className="bg-surface-200 px-2 py-0.5 rounded font-bold text-[10px] text-surface-600 uppercase">
                            {currentLang}
                        </span>
                    </button>
                </nav>
            </div>
        </aside>
    );
};