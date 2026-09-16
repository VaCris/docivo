"use client";

import {
    useCallback,
    useSyncExternalStore,
} from "react";

export type Theme = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "docivo-theme";

const THEME_CHANGE_EVENT = "docivo-theme-change";

const SYSTEM_THEME_QUERY =
    "(prefers-color-scheme: dark)";

export const isTheme = (
    value: string | null
): value is Theme => {
    return (
        value === "light" ||
        value === "dark" ||
        value === "system"
    );
};

export const getStoredTheme = (): Theme => {
    if (typeof window === "undefined") {
        return "system";
    }

    const storedTheme =
        window.localStorage.getItem(
            THEME_STORAGE_KEY
        );

    return isTheme(storedTheme)
        ? storedTheme
        : "system";
};

export const getSystemTheme = ():
    | "light"
    | "dark" => {
    if (typeof window === "undefined") {
        return "light";
    }

    return window.matchMedia(
        SYSTEM_THEME_QUERY
    ).matches
        ? "dark"
        : "light";
};

export const resolveTheme = (
    theme: Theme
): "light" | "dark" => {
    return theme === "system"
        ? getSystemTheme()
        : theme;
};

export const syncThemeClass = (
    theme: Theme
) => {
    if (typeof document === "undefined") {
        return;
    }

    const resolvedTheme =
        resolveTheme(theme);

    const root =
        document.documentElement;

    root.classList.toggle(
        "dark",
        resolvedTheme === "dark"
    );

    root.dataset.theme = theme;

    root.dataset.resolvedTheme =
        resolvedTheme;
};

const getThemeServerSnapshot = (): Theme => {
    return "system";
};

const getSystemThemeServerSnapshot = ():
    | "light"
    | "dark" => {
    return "light";
};

const subscribeToTheme = (
    callback: () => void
): (() => void) => {
    if (typeof window === "undefined") {
        return () => { };
    }

    const handleStorage = (
        event: StorageEvent
    ) => {
        if (
            event.key === THEME_STORAGE_KEY
        ) {
            callback();
        }
    };

    window.addEventListener(
        "storage",
        handleStorage
    );

    window.addEventListener(
        THEME_CHANGE_EVENT,
        callback
    );

    return () => {
        window.removeEventListener(
            "storage",
            handleStorage
        );

        window.removeEventListener(
            THEME_CHANGE_EVENT,
            callback
        );
    };
};

const subscribeToSystemTheme = (
    callback: () => void
): (() => void) => {
    if (typeof window === "undefined") {
        return () => { };
    }

    const mediaQuery =
        window.matchMedia(
            SYSTEM_THEME_QUERY
        );

    mediaQuery.addEventListener(
        "change",
        callback
    );

    return () => {
        mediaQuery.removeEventListener(
            "change",
            callback
        );
    };
};

export const useTheme = () => {
    const theme = useSyncExternalStore(
        subscribeToTheme,
        getStoredTheme,
        getThemeServerSnapshot
    );

    const systemTheme =
        useSyncExternalStore(
            subscribeToSystemTheme,
            getSystemTheme,
            getSystemThemeServerSnapshot
        );

    const resolvedTheme:
        | "light"
        | "dark" =
        theme === "system"
            ? systemTheme
            : theme;

    const setTheme = useCallback(
        (nextTheme: Theme) => {
            const applyTheme = () => {
                window.localStorage.setItem(
                    THEME_STORAGE_KEY,
                    nextTheme
                );

                syncThemeClass(nextTheme);

                window.dispatchEvent(
                    new Event(
                        THEME_CHANGE_EVENT
                    )
                );
            };

            if (
                typeof document !==
                "undefined" &&
                "startViewTransition" in
                document
            ) {
                (
                    document as Document & {
                        startViewTransition: (
                            callback: () => void
                        ) => void;
                    }
                ).startViewTransition(
                    applyTheme
                );
            } else {
                applyTheme();
            }
        },
        []
    );

    return {
        theme,
        resolvedTheme,
        setTheme,
    };
};