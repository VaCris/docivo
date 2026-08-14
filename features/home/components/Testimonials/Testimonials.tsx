"use client";

import { Icon } from "@iconify/react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./Testimonials.module.css";

const TESTIMONIALS = [
  {
    quote:
      "Finally a PDF tool that doesn't feel like it was built in 2010. Clean, fast, and the local processing means I don't have to worry about sensitive documents.",
    name: "Sarah Chen",
    role: "Product Designer",
    avatar: "SC",
  },
  {
    quote:
      "I use Merge and Split daily for client reports. The drag-to-reorder feature is a game changer. Takes seconds instead of minutes.",
    name: "Marcus Rivera",
    role: "Freelance Consultant",
    avatar: "MR",
  },
  {
    quote:
      "The OCR actually works on messy scans. I've tried five other tools and they all butchered the text layout. Docivo nailed it.",
    name: "Aisha Patel",
    role: "Legal Assistant",
    avatar: "AP",
  },
];

export const Testimonials = () => {
  const [titleRef, titleRevealed] = useScrollReveal<HTMLDivElement>();

  return (
    <section className={styles.section}>
      <div className="mx-auto max-w-7xl">
        <div
          ref={titleRef}
          className={`mb-16 flex flex-col items-center text-center scroll-reveal ${titleRevealed ? "revealed" : ""}`}
        >
          <h2 className={styles.title}>
            Loved by people who work with PDFs
          </h2>
          <p className={styles.subtitle}>
            Real feedback from people who use Docivo every day.
          </p>
        </div>

        <div className={styles.bubbles}>
          {TESTIMONIALS.map((testimonial, index) => (
            <Bubble
              key={testimonial.name}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const Bubble = ({
  testimonial,
  index,
}: {
  testimonial: (typeof TESTIMONIALS)[number];
  index: number;
}) => {
  const [ref, revealed] = useScrollReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`${styles.bubble} scroll-reveal ${revealed ? "revealed" : ""}`}
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <div className={styles.card}>
        <span className={styles.quoteIcon} aria-hidden="true">
          &ldquo;
        </span>

        <div className={styles.stars}>
          {[...Array(5)].map((_, i) => (
            <Icon
              key={i}
              icon="solar:star-bold"
              width="16"
              className="text-[#0000EE]"
            />
          ))}
        </div>

        <p className={styles.quote}>&ldquo;{testimonial.quote}&rdquo;</p>

        <div className={styles.author}>
          <div className={styles.avatar}>{testimonial.avatar}</div>
          <div>
            <div className={styles.authorName}>{testimonial.name}</div>
            <div className={styles.authorRole}>{testimonial.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
