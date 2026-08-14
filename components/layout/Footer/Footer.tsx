"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";
import styles from "./Footer.module.css";

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.curve} aria-hidden="true">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path d="M0,120 L0,60 C360,140 1080,140 1440,60 L1440,120 Z" fill="#0F172A" />
                </svg>
            </div>

            <div className={styles.inner}>
                <div className="mx-auto max-w-7xl">
                    <div className={styles.topRow}>
                        <Link href="/" className={styles.logo}>
                            <img src="/images/Logo.png" alt="Docivo" className="h-6 w-auto brightness-0 invert" />
                            <span className={styles.logoText}>Docivo</span>
                        </Link>

                        <div className={styles.links}>
                            <Link href="/privacy" className={styles.link} aria-label="Privacy Policy">Privacy</Link>
                            <Link href="/terms" className={styles.link} aria-label="Terms of Service">Terms</Link>
                            <a href="https://github.com/docivo" target="_blank" rel="noopener noreferrer" className={styles.link} aria-label="GitHub repository">GitHub</a>
                        </div>
                    </div>

                    <div className={styles.bottomRow}>
                        <p className={styles.copyright}>
                            &copy; 2025 Docivo. All rights reserved.
                        </p>
                        <a href="https://github.com/docivo" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="GitHub">
                            <Icon icon="carbon:logo-github" width="14" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};