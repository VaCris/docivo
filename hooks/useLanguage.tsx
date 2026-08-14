"use client";

import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
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

const isValidLanguage = (value: string | null): value is Language => {
    return value === "en" || value === "es";
};

const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined
);

export const LanguageProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [currentLang, setCurrentLang] = useState<Language>(() => {
        if (typeof window === "undefined") return "en";

        const savedLang = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);

        return isValidLanguage(savedLang) ? savedLang : "en";
    });

    useEffect(() => {
        window.localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLang);
        document.documentElement.lang = currentLang;
    }, [currentLang]);

    const toggleLanguage = () => {
        setCurrentLang((prev: Language) => (prev === "en" ? "es" : "en"));
    };

    const t = useMemo(() => dictionaries[currentLang], [currentLang]);

    return (
        <LanguageContext.Provider value={{ currentLang, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);

    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }

    return context;
};