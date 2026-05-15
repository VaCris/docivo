"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme, type Theme } from "@/hooks/useTheme";

export const SettingsView = () => {
    const { currentLang, toggleLanguage, t } = useLanguage();
    const { theme, setTheme } = useTheme();
    const strings = t.settings;

    return (
        <div className="pb-10 max-w-4xl">
            <div className="mb-8">
                <h1 className="font-extrabold text-surface-900 text-2xl md:text-3xl tracking-tight">
                    {strings.header.title}
                </h1>
                <p className="mt-2 text-surface-500 text-sm md:text-base">
                    {strings.header.subtitle}
                </p>
            </div>

            <div className="space-y-8">
                <section className="bg-white shadow-sm p-6 md:p-8 border border-surface-200 rounded-2xl">
                    <h2 className="flex items-center gap-2 mb-6 font-bold text-surface-800 text-lg">
                        <Icon
                            icon="solar:settings-bold-duotone"
                            width="24"
                            className="text-surface-400"
                        />
                        {strings.sections.preferences.title}
                    </h2>

                    <div className="gap-6 grid grid-cols-1 md:grid-cols-2">
                        <div>
                            <label className="block mb-2 font-bold text-surface-500 text-xs uppercase tracking-wider">
                                {strings.sections.preferences.languageLabel}
                            </label>
                            <div className="relative">
                                <select
                                    value={currentLang}
                                    onChange={toggleLanguage}
                                    className="bg-surface-50 px-4 py-3 pr-10 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 w-full font-medium text-surface-800 text-sm transition-colors appearance-none"
                                >
                                    <option value="en">English</option>
                                    <option value="es">Español</option>
                                </select>
                                <Icon
                                    icon="solar:alt-arrow-down-linear"
                                    width="16"
                                    className="top-1/2 right-4 absolute text-surface-400 -translate-y-1/2 pointer-events-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block mb-2 font-bold text-surface-500 text-xs uppercase tracking-wider">
                                {strings.sections.preferences.themeLabel}
                            </label>
                            <div className="relative">
                                <select
                                    value={theme}
                                    onChange={(event) =>
                                        setTheme(event.target.value as Theme)
                                    }
                                    className="bg-surface-50 px-4 py-3 pr-10 border border-surface-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 w-full font-medium text-surface-800 text-sm transition-colors appearance-none"
                                >
                                    <option value="light">
                                        {strings.sections.preferences.themes.light}
                                    </option>
                                    <option value="dark">
                                        {strings.sections.preferences.themes.dark}
                                    </option>
                                    <option value="system">
                                        {strings.sections.preferences.themes.system}
                                    </option>
                                </select>
                                <Icon
                                    icon="solar:alt-arrow-down-linear"
                                    width="16"
                                    className="top-1/2 right-4 absolute text-surface-400 -translate-y-1/2 pointer-events-none"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                <div className="flex justify-end gap-4 pt-6 border-surface-200 border-t">
                    <button className="hover:bg-surface-100 px-6 py-3 rounded-xl font-bold text-surface-600 text-sm transition-colors">
                        {strings.actions.cancel}
                    </button>
                    <button className="bg-brand-600 hover:bg-brand-700 shadow-brand-500/20 shadow-lg px-6 py-3 rounded-xl font-bold text-white text-sm transition-all">
                        {strings.actions.saveChanges}
                    </button>
                </div>
            </div>
        </div>
    );
};
