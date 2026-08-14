"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useLanguage } from "@/hooks/useLanguage";
import styles from "./FAQ.module.css";

const REVEAL_DELAYS = ["reveal-delay-0", "reveal-delay-1", "reveal-delay-2", "reveal-delay-3"];

interface FAQItemProps {
    item: { q: string; a: string };
    isOpen: boolean;
    onToggle: () => void;
    delayClass: string;
}

const FAQItem = ({ item, isOpen, onToggle, delayClass }: FAQItemProps) => {
    const [itemRef, itemRevealed] = useScrollReveal<HTMLDivElement>();

    return (
        <div
            ref={itemRef}
            className={`${styles.item} ${isOpen ? styles.itemOpen : ""} scroll-reveal ${itemRevealed ? "revealed" : ""} ${delayClass} dark:bg-surface-800 dark:border-surface-300`}
        >
            <button
                id={`faq-question-${item.q}`}
                className={`${styles.question} dark:text-surface-100 dark:hover:text-brand-400`}
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
                <p className="dark:text-surface-400">{item.a}</p>
            </div>
        </div>
    );
};

export const FAQ = () => {
    const { t } = useLanguage();
    const strings = t.faq;
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [titleRef, titleRevealed] = useScrollReveal<HTMLDivElement>();

    return (
        <section className={`${styles.section} dark:bg-surface-100 dark:border-surface-300`}>
            <div className="mx-auto max-w-3xl">
        <div
            ref={titleRef}
            className={`mb-12 flex flex-col items-center text-center scroll-reveal ${titleRevealed ? "revealed" : ""}`}
        >
            <h2 className={`${styles.title} dark:text-surface-100`}>
                <span className={styles.titleGradient}>{strings.title}</span>
            </h2>
        </div>

        <div className={`${styles.list} dark:text-surface-300`}>
            {strings.items.map((item, index) => {
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
