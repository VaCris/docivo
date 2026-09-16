"use client";

import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useSyncExternalStore,
} from "react";
import { en } from "@/locales/en";
import { es } from "@/locales/es";
import type { Dictionary, Language } from "@/types/i18n";

const dictionaries: Record<Language, Dictionary> = {
    en,
    es,
};

type LanguageContextType = {
    currentLang: Language;
    toggleLanguage: () => void;
    t: Dictionary;
};

const LANGUAGE_STORAGE_KEY = "docivo-language";
const LANGUAGE_CHANGE_EVENT = "docivo-language-change";

const isValidLanguage = (value: string | null): value is Language => {
    return value === "en" || value === "es";
};

const getLanguageSnapshot = (): Language => {
    if (typeof window === "undefined") {
        return "en";
    }

    const savedLang = window.localStorage.getItem(
        LANGUAGE_STORAGE_KEY
    );

    return isValidLanguage(savedLang) ? savedLang : "en";
};

const getLanguageServerSnapshot = (): Language => {
    return "en";
};

const subscribeToLanguage = (
    callback: () => void
): (() => void) => {
    if (typeof window === "undefined") {
        return () => { };
    }

    const handleStorage = (event: StorageEvent) => {
        if (event.key === LANGUAGE_STORAGE_KEY) {
            callback();
        }
    };

    window.addEventListener("storage", handleStorage);
    window.addEventListener(
        LANGUAGE_CHANGE_EVENT,
        callback
    );

    return () => {
        window.removeEventListener(
            "storage",
            handleStorage
        );

        window.removeEventListener(
            LANGUAGE_CHANGE_EVENT,
            callback
        );
    };
};

const LanguageContext =
    createContext<LanguageContextType | undefined>(
        undefined
    );

export const LanguageProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const currentLang = useSyncExternalStore(
        subscribeToLanguage,
        getLanguageSnapshot,
        getLanguageServerSnapshot
    );

    useEffect(() => {
        document.documentElement.lang = currentLang;
    }, [currentLang]);

    const toggleLanguage = () => {
        const nextLanguage: Language =
            currentLang === "en" ? "es" : "en";

        window.localStorage.setItem(
            LANGUAGE_STORAGE_KEY,
            nextLanguage
        );

        window.dispatchEvent(
            new Event(LANGUAGE_CHANGE_EVENT)
        );
    };

    const t = useMemo(
        () => dictionaries[currentLang],
        [currentLang]
    );

    return (
        <LanguageContext.Provider
            value={{
                currentLang,
                toggleLanguage,
                t,
            }}
        >
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error(
            "useLanguage must be used within a LanguageProvider"
        );
    }

    return context;
};