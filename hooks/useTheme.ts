"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export type Theme = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "docivo-theme";

export const isTheme = (value: string | null): value is Theme => {
    return value === "light" || value === "dark" || value === "system";
};

export const getStoredTheme = (): Theme => {
    if (typeof window === "undefined") return "system";

    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

    return isTheme(storedTheme) ? storedTheme : "system";
};

export const getSystemTheme = (): "light" | "dark" => {
    if (typeof window === "undefined") return "light";

    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
};

export const resolveTheme = (theme: Theme): "light" | "dark" => {
    return theme === "system" ? getSystemTheme() : theme;
};

export const syncThemeClass = (theme: Theme) => {
    if (typeof document === "undefined") return;

    const resolvedTheme = resolveTheme(theme);
    const root = document.documentElement;

    root.classList.toggle("dark", resolvedTheme === "dark");
    root.dataset.theme = theme;
    root.dataset.resolvedTheme = resolvedTheme;
};

export const useTheme = () => {
    const [theme, setThemeState] = useState<Theme>(() => {
        if (typeof window === "undefined") return "system";

        const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

        return isTheme(storedTheme) ? storedTheme : "system";
    });

    const [systemTheme, setSystemTheme] = useState<"light" | "dark">(() => {
        if (typeof window === "undefined") return "light";

        return window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light";
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleChange = () => {
            const nextSystemTheme = getSystemTheme();
            setSystemTheme(nextSystemTheme);

            if (theme === "system") {
                syncThemeClass("system");
            }
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, [theme]);

    const setTheme = useCallback((nextTheme: Theme) => {
        const apply = () => {
            setThemeState(nextTheme);
            window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
            syncThemeClass(nextTheme);
        };

        if (typeof document !== "undefined" && "startViewTransition" in document) {
            (document as Document).startViewTransition(apply);
        } else {
            apply();
        }
    }, []);

    const resolvedTheme = useMemo(
        () => (theme === "system" ? systemTheme : theme),
        [theme, systemTheme]
    );

    return {
        theme,
        resolvedTheme,
        setTheme,
    };
};
