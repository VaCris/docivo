"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

export type Theme = "light" | "dark" | "system";

const THEME_STORAGE_KEY = "docivo-theme";

const isTheme = (value: string | null): value is Theme => {
    return value === "light" || value === "dark" || value === "system";
};

const getSystemTheme = (): "light" | "dark" => {
    if (typeof window === "undefined") return "light";

    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
};

const applyTheme = (theme: Theme) => {
    const resolvedTheme = theme === "system" ? getSystemTheme() : theme;
    const root = document.documentElement;

    root.classList.toggle("dark", resolvedTheme === "dark");
    root.dataset.theme = theme;
};

export const useTheme = () => {
    const [theme, setThemeState] = useState<Theme>("system");
    const [systemTheme, setSystemTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
        const initialTheme = isTheme(savedTheme) ? savedTheme : "system";
        const initialSystemTheme = getSystemTheme();

        setThemeState(initialTheme);
        setSystemTheme(initialSystemTheme);
        applyTheme(initialTheme);
    }, []);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

        const handleChange = () => {
            const nextSystemTheme = getSystemTheme();
            setSystemTheme(nextSystemTheme);

            if (theme === "system") {
                applyTheme("system");
            }
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, [theme]);

    const setTheme = useCallback((nextTheme: Theme) => {
        setThemeState(nextTheme);
        window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
        applyTheme(nextTheme);
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
