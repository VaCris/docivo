"use client";

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { useLanguage } from '@/hooks/useLanguage';
import enData from '@/locales/en/footer.json';
import esData from '@/locales/es/footer.json';
import { FOOTER_CONFIG } from './Footer.config';
import styles from './Footer.module.css';

export const Footer = () => {
    const { currentLang } = useLanguage();
    const t = currentLang === 'en' ? enData : esData;

    return (
        <footer className={styles.footer}>
            <div className="mx-auto max-w-6xl">
                <div className="gap-10 grid grid-cols-2 md:grid-cols-4">
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/" className={styles.brandLogo}>
                            <img
                                src="/images/Logo.png"
                                alt="Brand Logo"
                                className="w-auto h-12 object-contain transition-transform duration-300"
                            />
                            <span className={styles.brandText}>{t.brand}</span>
                        </Link>
                        <p className="max-w-xs text-surface-400 text-sm leading-relaxed">
                            {t.slogan}
                        </p>
                    </div>

                    <div>
                        <h4 className={styles.columnTitle}>{t.columns.tools}</h4>
                        <ul className={styles.linkList}>
                            {FOOTER_CONFIG.columns.tools.map((link) => (
                                <li key={link.id}>
                                    <Link href={link.href} className={styles.linkItem}>
                                        {t.links[link.id as keyof typeof t.links]}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className={styles.columnTitle}>{t.columns.project}</h4>
                        <ul className={styles.linkList}>
                            {FOOTER_CONFIG.columns.project.map((link) => (
                                <li key={link.id}>
                                    <Link href={link.href} className={styles.linkItem}>
                                        {t.links[link.id as keyof typeof t.links]}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className={styles.columnTitle}>{t.columns.legal}</h4>
                        <ul className={styles.linkList}>
                            {FOOTER_CONFIG.columns.legal.map((link) => (
                                <li key={link.id}>
                                    <Link href={link.href} className={styles.linkItem}>
                                        {t.links[link.id as keyof typeof t.links]}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className={styles.bottomBar}>
                    <p className="text-surface-400 text-xs">
                        {t.copyright}
                    </p>
                    <div className="flex items-center gap-5">
                        {FOOTER_CONFIG.social.map((socialItem, index) => (
                            <a
                                key={index}
                                href={socialItem.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.socialIcon}
                                aria-label={socialItem.name}
                            >
                                <Icon icon={socialItem.icon} width="18" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};