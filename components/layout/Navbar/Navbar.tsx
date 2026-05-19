"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { NAVBAR_CONFIG } from "./Navbar.config";
import styles from "./Navbar.module.css";

export const Navbar = () => {
    const { currentLang, toggleLanguage, t } = useLanguage();
    const { resolvedTheme, setTheme } = useTheme();
    const strings = t.navbar;

    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const isDark = resolvedTheme === "dark";

    const toggleTheme = () => {
        setTheme(isDark ? "light" : "dark");
    };

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);

        handleScroll();
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`${styles.navbarBase} ${
                scrolled ? styles.navbarScrolled : ""
            }`}
        >
            <div className="mx-auto px-6 max-w-6xl">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="group flex items-center gap-2">
                        <img
                            src="/images/Logo.png"
                            alt="Docivo Logo"
                            className="w-auto h-11 object-contain group-hover:scale-105 transition-transform duration-300"
                        />

                        <span className="font-extrabold text-surface-900 text-xl tracking-tight">
                            {strings.brand}
                        </span>
                    </Link>

                    <div className="hidden md:flex items-center bg-white/70 shadow-sm backdrop-blur px-2 py-1 border border-surface-200/80 rounded-full">
                        {NAVBAR_CONFIG.navItems.map((item) => (
                            <Link
                                key={item.id}
                                href={item.href}
                                className={styles.navLink}
                            >
                                {strings.links[item.id as keyof typeof strings.links]}
                            </Link>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-3">
                        <button
                            type="button"
                            onClick={toggleTheme}
                            className="inline-flex justify-center items-center bg-white hover:bg-surface-50 border border-surface-200 rounded-full w-10 h-10 text-surface-500 hover:text-brand-600 transition-colors"
                            aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
                            title={isDark ? "Light mode" : "Dark mode"}
                        >
                            <Icon
                                icon={
                                    isDark
                                        ? "solar:sun-2-bold-duotone"
                                        : "solar:moon-bold-duotone"
                                }
                                width="18"
                            />
                        </button>

                        <button
                            type="button"
                            onClick={toggleLanguage}
                            className="inline-flex justify-center items-center bg-white hover:bg-surface-50 border border-surface-200 rounded-full w-10 h-10 font-bold text-surface-500 hover:text-brand-600 text-xs transition-colors"
                            aria-label={strings.actions.languageLabel}
                        >
                            {currentLang === "en" ? "ES" : "EN"}
                        </button>

                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 shadow-lg shadow-slate-950/15 px-5 py-2.5 rounded-full font-semibold text-white text-sm transition-colors"
                        >
                            {strings.actions.tryNow}
                            <Icon
                                icon={NAVBAR_CONFIG.icons.arrowRight}
                                width="15"
                            />
                        </Link>
                    </div>

                    <div className="md:hidden flex items-center gap-2">
                        <button
                            type="button"
                            onClick={toggleTheme}
                            className="flex justify-center items-center bg-white border border-surface-200 rounded-full w-10 h-10 text-surface-600 hover:text-surface-900 transition-colors"
                            aria-label={isDark ? "Activate light mode" : "Activate dark mode"}
                        >
                            <Icon
                                icon={
                                    isDark
                                        ? "solar:sun-2-bold-duotone"
                                        : "solar:moon-bold-duotone"
                                }
                                width="20"
                            />
                        </button>

                        <button
                            type="button"
                            onClick={() => setMenuOpen((prev) => !prev)}
                            className="flex justify-center items-center bg-white border border-surface-200 rounded-full w-10 h-10 text-surface-600 hover:text-surface-900 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <Icon
                                icon={
                                    menuOpen
                                        ? NAVBAR_CONFIG.icons.menuClose
                                        : NAVBAR_CONFIG.icons.menuOpen
                                }
                                width="22"
                            />
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={`md:hidden ${styles.mobileMenu} ${
                    menuOpen ? styles.mobileMenuOpen : ""
                }`}
            >
                <div className="bg-white/95 shadow-lg backdrop-blur-xl mx-4 px-3 py-4 border border-surface-200 rounded-2xl">
                    <div className="space-y-1 mb-3">
                        {NAVBAR_CONFIG.navItems.map((item) => (
                            <Link
                                key={item.id}
                                href={item.href}
                                onClick={() => setMenuOpen(false)}
                                className="block hover:bg-surface-50 px-4 py-3 rounded-xl font-medium text-surface-600 hover:text-surface-900 text-sm transition-colors"
                            >
                                {
                                    strings.links[
                                        item.id as keyof typeof strings.links
                                    ]
                                }
                            </Link>
                        ))}
                    </div>

                    <div className="flex justify-between items-center px-4 pt-3 pb-2 border-surface-100 border-t">
                        <span className="font-medium text-surface-600 text-sm">
                            {strings.actions.languageLabel}
                        </span>

                        <button
                            type="button"
                            onClick={toggleLanguage}
                            className="bg-brand-50 px-4 py-1.5 rounded-lg font-bold text-brand-600 text-sm"
                        >
                            {currentLang === "en" ? "Español" : "English"}
                        </button>
                    </div>

                    <div className="flex justify-between items-center px-4 pt-3 pb-2 border-surface-100 border-t">
                        <span className="font-medium text-surface-600 text-sm">
                            Theme
                        </span>

                        <button
                            type="button"
                            onClick={toggleTheme}
                            className="inline-flex items-center gap-2 bg-brand-50 px-4 py-1.5 rounded-lg font-bold text-brand-600 text-sm"
                        >
                            <Icon
                                icon={
                                    isDark
                                        ? "solar:sun-2-bold-duotone"
                                        : "solar:moon-bold-duotone"
                                }
                                width="16"
                            />
                            {isDark ? "Light" : "Dark"}
                        </button>
                    </div>

                    <div className="pt-3 border-surface-100 border-t">
                        <Link
                            href="/dashboard"
                            onClick={() => setMenuOpen(false)}
                            className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-xl w-full font-semibold text-white text-sm text-center transition-colors"
                        >
                            {strings.actions.tryNow}
                            <Icon
                                icon={NAVBAR_CONFIG.icons.arrowRight}
                                width="15"
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};
