"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import { useLanguage } from "@/hooks/useLanguage";
import { FOOTER_CONFIG } from "./Footer.config";
import styles from "./Footer.module.css";

export const Footer = () => {
    const { t } = useLanguage();
    const strings = t.footer;

    return (
        <footer className={styles.footer}>
            <div className="mx-auto max-w-6xl">
                <div className={styles.footerCard}>
                    <div className="gap-10 grid grid-cols-2 md:grid-cols-4">
                        <div className="col-span-2 md:col-span-1">
                            <Link href="/" className={styles.brandLogo}>
                                <img
                                    src="/images/Logo.png"
                                    alt="Docivo Logo"
                                    className="w-auto h-11 object-contain"
                                />

                                <span className={styles.brandText}>
                                    {strings.brand}
                                </span>
                            </Link>

                            <p className="max-w-xs text-surface-500 text-sm leading-relaxed">
                                {strings.slogan}
                            </p>
                        </div>

                        <div>
                            <h4 className={styles.columnTitle}>
                                {strings.columns.tools}
                            </h4>

                            <ul className={styles.linkList}>
                                {FOOTER_CONFIG.columns.tools.map((link) => (
                                    <li key={link.id}>
                                        <Link
                                            href={link.href}
                                            className={styles.linkItem}
                                        >
                                            {
                                                strings.links[
                                                link.id as keyof typeof strings.links
                                                ]
                                            }
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className={styles.columnTitle}>
                                {strings.columns.project}
                            </h4>

                            <ul className={styles.linkList}>
                                {FOOTER_CONFIG.columns.project.map((link) => (
                                    <li key={link.id}>
                                        <Link
                                            href={link.href}
                                            className={styles.linkItem}
                                        >
                                            {
                                                strings.links[
                                                link.id as keyof typeof strings.links
                                                ]
                                            }
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className={styles.columnTitle}>
                                {strings.columns.legal}
                            </h4>

                            <ul className={styles.linkList}>
                                {FOOTER_CONFIG.columns.legal.map((link) => (
                                    <li key={link.id}>
                                        <Link
                                            href={link.href}
                                            className={styles.linkItem}
                                        >
                                            {
                                                strings.links[
                                                link.id as keyof typeof strings.links
                                                ]
                                            }
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className={styles.bottomBar}>
                        <p className="text-surface-400 text-xs">
                            {strings.copyright}
                        </p>

                        <div className="flex items-center gap-3">
                            {FOOTER_CONFIG.social.map((socialItem) => (
                                <a
                                    key={socialItem.name}
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
            </div>
        </footer>
    );
};