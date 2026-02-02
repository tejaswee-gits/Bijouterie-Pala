"use client";

import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'fr', label: 'FR', full: 'Français' },
        { code: 'en', label: 'EN', full: 'English' },
        { code: 'es', label: 'ES', full: 'Español' },
        { code: 'de', label: 'DE', full: 'Deutsch' },
    ] as const;

    return (
        <div className="fixed top-8 right-8 z-50">
            <div className="relative">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 bg-obsidian/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-gold hover:text-white transition-colors uppercase text-xs tracking-widest font-sans"
                >
                    {languages.find(l => l.code === language)?.label}
                    <span className={`text-[10px] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>▼</span>
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-full right-0 mt-2 w-32 bg-obsidian/90 backdrop-blur-md border border-white/10 rounded-sm overflow-hidden shadow-2xl"
                        >
                            {languages.map((lang) => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setLanguage(lang.code);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-3 text-xs uppercase tracking-widest transition-colors ${language === lang.code
                                        ? 'bg-gold/20 text-gold'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    {lang.full}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
