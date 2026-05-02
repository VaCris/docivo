"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';
import { useLanguage } from '@/hooks/useLanguage';

import enData from '@/locales/en/sidebar.json';
import esData from '@/locales/es/sidebar.json';
import { SIDEBAR_CONFIG } from './Sidebar.config';
import styles from './Sidebar.module.css';

export const Sidebar = () => {
    const { currentLang, toggleLanguage } = useLanguage();
    const t = currentLang === 'en' ? enData : esData;
    const pathname = usePathname();

    return (
        <aside className={styles.sidebar}>
            <Link href="/dashboard" className={styles.brand}>
                <img src="/images/Logo.png" alt="Docivo Logo" className="w-auto h-8 object-contain" />
                <span className="font-bold text-surface-800 text-lg tracking-tight">docivo</span>
            </Link>

            <div className="flex-1">
                <p className="mb-4 px-2 font-bold text-surface-400 text-xs uppercase tracking-wider">
                    {t.menu}
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
                                {t.links[item.id as keyof typeof t.links]}
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
                                {t.links[item.id as keyof typeof t.links]}
                            </Link>
                        );
                    })}

                    <button
                        onClick={toggleLanguage}
                        className={`${styles.navLink} w-full text-left justify-between`}
                    >
                        <div className="flex items-center gap-3">
                            <Icon icon="solar:global-linear" width="20" />
                            {t.language}
                        </div>
                        <span className="bg-surface-200 px-2 py-0.5 rounded font-bold text-[10px] text-surface-600 uppercase">
                            {currentLang}
                        </span>
                    </button>
                </nav>
                {/* 
        <div className="bg-surface-50 p-4 border border-surface-200 rounded-xl">
          <p className="mb-1 font-semibold text-surface-500 text-xs">{t.usage.title}</p>
          <div className="bg-surface-200 mb-2 rounded-full w-full h-1.5 overflow-hidden">
            <div className="bg-brand-500 rounded-full h-full" style={{ width: '4.5%' }}></div>
          </div>
          <p className="font-medium text-[11px] text-surface-500">{t.usage.value}</p>
        </div> */}
            </div>
        </aside>
    );
};