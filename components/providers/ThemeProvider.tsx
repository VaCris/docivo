"use client";

import React, { useEffect } from "react";
import { getStoredTheme, resolveTheme, syncThemeClass } from "@/hooks/useTheme";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    useEffect(() => {
        const applyStoredTheme = () => {
            const theme = getStoredTheme();
            syncThemeClass(theme);
        };

        applyStoredTheme();

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleSystemThemeChange = () => {
            if (getStoredTheme() === "system") {
                syncThemeClass("system");
            }
        };

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === "docivo-theme") {
                applyStoredTheme();
            }
        };

        mediaQuery.addEventListener("change", handleSystemThemeChange);
        window.addEventListener("storage", handleStorageChange);

        document.documentElement.dataset.resolvedTheme = resolveTheme(
            getStoredTheme()
        );

        return () => {
            mediaQuery.removeEventListener("change", handleSystemThemeChange);
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return children;
};
