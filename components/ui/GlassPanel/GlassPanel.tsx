import React from "react";
import styles from "./GlassPanel.module.css";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  variant?: "light" | "dark" | "subtle";
  as?: "div" | "section" | "article";
}

export const GlassPanel = ({
  children,
  className = "",
  variant = "light",
  as: Tag = "div",
}: GlassPanelProps) => {
  return (
    <Tag className={`${styles.panel} ${styles[variant]} ${className}`}>
      {children}
    </Tag>
  );
};
