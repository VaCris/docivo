"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./FAQ.module.css";

const FAQ_ITEMS = [
    {
        q: "What is Docivo?",
        a: "Docivo is a suite of PDF tools that run in your browser. Merge, split, convert, and OCR documents without installing anything. Local tools process files entirely on your device — nothing is uploaded.",
    },
    {
        q: "Are my files uploaded to a server?",
        a: "For local tools (Merge, Split, Image to PDF): absolutely not. Everything happens in your browser using pdf-lib. For cloud tools (OCR, PDF to Word): files are uploaded temporarily, processed, and deleted immediately after delivery.",
    },
    {
        q: "What formats does Docivo support?",
        a: "PDF input for all tools. Image input (JPG, PNG, WebP) for Image to PDF. Output formats: PDF, .docx (PDF to Word). OCR adds a searchable text layer to existing PDFs.",
    },
    {
        q: "Is there a file size limit?",
        a: "Local tools have no strict limit — they process whatever your browser can handle. Cloud tools support files up to 50MB per upload. We're working on increasing this limit.",
    },
    {
        q: "Do I need to create an account?",
        a: "No. All local tools work instantly with no account. Cloud tools require a one-time Pro purchase for credits, but no account creation is needed — just enter your email for delivery.",
    },
    {
        q: "What about privacy?",
        a: "Local tools are 100% private — files never leave your device. Cloud tools use encrypted connections, process your file, and delete it immediately. We never store, read, or share your documents.",
    },
    {
        q: "Can I use Docivo on mobile?",
        a: "Docivo works on any modern browser, including mobile Safari and Chrome. The interface is fully responsive. Some advanced features work best on desktop.",
    },
    {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards through Stripe. One-time payment only — no subscriptions, no recurring charges. You get lifetime access to your purchase.",
    },
];

const REVEAL_DELAYS = ["reveal-delay-0", "reveal-delay-1", "reveal-delay-2", "reveal-delay-3"];

interface FAQItemProps {
    item: typeof FAQ_ITEMS[number];
    isOpen: boolean;
    onToggle: () => void;
    delayClass: string;
}

const FAQItem = ({ item, isOpen, onToggle, delayClass }: FAQItemProps) => {
    const [itemRef, itemRevealed] = useScrollReveal<HTMLDivElement>();

    return (
        <div
            ref={itemRef}
            className={`${styles.item} ${isOpen ? styles.itemOpen : ""} scroll-reveal ${itemRevealed ? "revealed" : ""} ${delayClass}`}
        >
            <button
                id={`faq-question-${item.q}`}
                className={styles.question}
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.q}`}
            >
                <span>{item.q}</span>
                <Icon
                    icon="solar:alt-arrow-down-linear"
                    width="20"
                    className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}
                />
            </button>

            <div
                id={`faq-answer-${item.q}`}
                className={`${styles.answer} ${isOpen ? styles.answerOpen : ""}`}
                role="region"
                aria-labelledby={`faq-question-${item.q}`}
            >
                <p>{item.a}</p>
            </div>
        </div>
    );
};

export const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [titleRef, titleRevealed] = useScrollReveal<HTMLDivElement>();

    return (
        <section className={styles.section}>
            <div className="mx-auto max-w-3xl">
                <div
                    ref={titleRef}
                    className={`mb-12 flex flex-col items-center text-center scroll-reveal ${titleRevealed ? "revealed" : ""}`}
                >
                    <h2 className={styles.title}>
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className={styles.list}>
                    {FAQ_ITEMS.map((item, index) => {
                        const delayClass = REVEAL_DELAYS[index] ?? REVEAL_DELAYS[0];
                        return (
                            <FAQItem
                                key={index}
                                item={item}
                                isOpen={openIndex === index}
                                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
                                delayClass={delayClass}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
