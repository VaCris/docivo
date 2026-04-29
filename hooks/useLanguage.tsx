"use client";

import React, { createContext, useContext, useState } from 'react';

type LanguageContextType = {
    currentLang: 'en' | 'es';
    toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [currentLang, setCurrentLang] = useState<'en' | 'es'>('en');

    const toggleLanguage = () => {
        setCurrentLang((prev) => (prev === 'en' ? 'es' : 'en'));
    };

    return (
        <LanguageContext.Provider value={{ currentLang, toggleLanguage }
        }>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};