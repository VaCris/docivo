"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

import enData from '@/locales/en/navbar.json';
import esData from '@/locales/es/navbar.json';
import { NAVBAR_CONFIG } from './Navbar.config';
import styles from './Navbar.module.css';

export const Navbar = () => {
    const [currentLang, setCurrentLang] = useState<'en' | 'es'>('en');
    const t = currentLang === 'en' ? enData : esData;

    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLanguage = () => setCurrentLang(currentLang === 'en' ? 'es' : 'en');

    return (
        <nav className={`${styles.navbarBase} ${scrolled ? styles.navbarScrolled : ''}`}>
            <div className="mx-auto px-6 max-w-6xl">
                <div className="flex justify-between items-center h-16">

                    <Link href="/" className="group flex items-center gap-2.5">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="group-hover:scale-105 transition-transform duration-300">
                            <rect width="32" height="32" rx="8" fill="#14B8A6" fillOpacity="0.08" />
                            <path d="M10 8H22C24.2 8 26 9.8 26 12V20C26 22.2 24.2 24 22 24H10C7.8 24 6 22.2 6 20V12C6 9.8 7.8 8 10 8Z" stroke="#14B8A6" strokeWidth="2" fill="none" />
                            <path d="M10 8V24" stroke="#14B8A6" strokeWidth="2.5" strokeLinecap="round" />
                        </svg>
                        <span className="font-bold text-surface-800 text-lg tracking-tight">{t.brand}</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8">
                        {NAVBAR_CONFIG.navItems.map((item) => (
                            <Link key={item.id} href={item.href} className={styles.navLink}>
                                {t.links[item.id as keyof typeof t.links]}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-4">
                        <button onClick={toggleLanguage} className="px-2 font-bold text-surface-500 hover:text-brand-600 text-sm transition-colors">
                            {currentLang === 'en' ? 'ES' : 'EN'}
                        </button>
                        <Link href="#upload" className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 px-5 py-2.5 rounded-xl font-semibold text-white text-sm transition-colors">
                            {t.actions.tryNow}
                            <Icon icon={NAVBAR_CONFIG.icons.arrowRight} width="15" />
                        </Link>
                    </div>

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-2 text-surface-600 hover:text-surface-800 transition-colors"
                    >
                        <Icon icon={menuOpen ? NAVBAR_CONFIG.icons.menuClose : NAVBAR_CONFIG.icons.menuOpen} width="22" />
                    </button>
                </div>
            </div>

            <div className={`md:hidden ${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
                <div className="bg-white/95 shadow-lg backdrop-blur-xl px-6 py-4 border-surface-200 border-t">
                    <div className="space-y-1 mb-3">
                        {NAVBAR_CONFIG.navItems.map((item) => (
                            <Link key={item.id} href={item.href} onClick={() => setMenuOpen(false)} className="block hover:bg-surface-50 px-4 py-3 rounded-xl font-medium text-surface-600 hover:text-surface-800 text-sm transition-colors">
                                {t.links[item.id as keyof typeof t.links]}
                            </Link>
                        ))}
                    </div>
                    <div className="flex justify-between items-center px-4 pt-3 pb-2 border-surface-100 border-t">
                        <span className="font-medium text-surface-600 text-sm">{t.actions.languageLabel}</span>
                        <button onClick={toggleLanguage} className="bg-brand-50 px-4 py-1 rounded-lg font-bold text-brand-600 text-sm">
                            {currentLang === 'en' ? 'Español' : 'English'}
                        </button>
                    </div>
                    <div className="pt-3 border-surface-100 border-t">
                        <Link href="#upload" onClick={() => setMenuOpen(false)} className="flex justify-center items-center gap-2 bg-brand-600 hover:bg-brand-700 px-4 py-3 rounded-xl w-full font-semibold text-white text-sm text-center transition-colors">
                            {t.actions.tryNow}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};