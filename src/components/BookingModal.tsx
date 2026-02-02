"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
    const { t } = useLanguage();
    const [step, setStep] = useState(1); // 1: Date/Time, 2: Details, 3: Success
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    // Mock simplified calendar data for the next few days
    const today = new Date();
    const dates = Array.from({ length: 5 }, (_, i) => {
        const d = new Date();
        d.setDate(today.getDate() + i + 1); // Start from tomorrow
        return d;
    });

    const timeSlots = [
        "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would submit to a backend
        setTimeout(() => setStep(3), 500);
    };

    const reset = () => {
        setStep(1);
        setSelectedDate(null);
        setSelectedTime(null);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-obsidian/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-lg bg-[#0a0a0a] border border-white/10 shadow-2xl z-50 overflow-hidden rounded-sm"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b border-white/5 bg-[#050505]">
                            <h3 className="text-gold font-serif text-xl italic">
                                {step === 1 && t.booking.title_step1}
                                {step === 2 && t.booking.title_step2}
                                {step === 3 && t.booking.title_step3}
                            </h3>
                            <button
                                onClick={onClose}
                                className="text-gray-500 hover:text-white transition-colors"
                                aria-label="Close"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 md:p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                            {step === 1 && (
                                <div className="space-y-8">
                                    {/* Date Selection */}
                                    <div>
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-4">{t.booking.date_label}</label>
                                        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                                            {dates.map((date) => {
                                                const isSelected = selectedDate === date.toDateString();
                                                return (
                                                    <button
                                                        key={date.toString()}
                                                        onClick={() => setSelectedDate(date.toDateString())}
                                                        className={`flex flex-col items-center justify-center p-2 rounded-sm border transition-all duration-300 ${isSelected
                                                            ? "border-gold bg-gold/10 text-white"
                                                            : "border-white/5 text-gray-400 hover:border-white/20 hover:bg-white/5"
                                                            }`}
                                                    >
                                                        <span className="text-xs uppercase opacity-70 mb-1">
                                                            {date.toLocaleDateString('fr-FR', { weekday: 'short' })}
                                                        </span>
                                                        <span className="text-lg font-serif">
                                                            {date.getDate()}
                                                        </span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Time Selection */}
                                    <div className={`transition-opacity duration-500 ${selectedDate ? "opacity-100" : "opacity-30 pointer-events-none"}`}>
                                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-4">{t.booking.time_label}</label>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                            {timeSlots.map((time) => {
                                                const isSelected = selectedTime === time;
                                                return (
                                                    <button
                                                        key={time}
                                                        onClick={() => setSelectedTime(time)}
                                                        className={`py-2 px-4 rounded-sm border text-sm font-sans transition-all duration-300 ${isSelected
                                                            ? "border-gold bg-gold/10 text-white"
                                                            : "border-white/5 text-gray-400 hover:border-white/20 hover:bg-white/5"
                                                            }`}
                                                    >
                                                        {time}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Next Button */}
                                    <div className="pt-4 flex justify-end">
                                        <button
                                            disabled={!selectedDate || !selectedTime}
                                            onClick={() => setStep(2)}
                                            className="px-8 py-3 bg-gold text-obsidian uppercase tracking-widest text-xs font-semibold hover:bg-gold-light disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                        >
                                            {t.booking.next_btn}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <label className="text-xs uppercase tracking-widest text-gray-500">{t.booking.form.name}</label>
                                                <input type="text" required className="w-full bg-white/5 border border-white/10 p-3 text-white focus:outline-none focus:border-gold/50 transition-colors rounded-sm" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-xs uppercase tracking-widest text-gray-500">{t.booking.form.surname}</label>
                                                <input type="text" required className="w-full bg-white/5 border border-white/10 p-3 text-white focus:outline-none focus:border-gold/50 transition-colors rounded-sm" />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs uppercase tracking-widest text-gray-500">{t.booking.form.email}</label>
                                            <input type="email" required className="w-full bg-white/5 border border-white/10 p-3 text-white focus:outline-none focus:border-gold/50 transition-colors rounded-sm" />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs uppercase tracking-widest text-gray-500">{t.booking.form.phone}</label>
                                            <input type="tel" required className="w-full bg-white/5 border border-white/10 p-3 text-white focus:outline-none focus:border-gold/50 transition-colors rounded-sm" />
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-xs uppercase tracking-widest text-gray-500">{t.booking.form.message}</label>
                                            <textarea rows={3} className="w-full bg-white/5 border border-white/10 p-3 text-white focus:outline-none focus:border-gold/50 transition-colors rounded-sm resize-none" />
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center pt-4">
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="text-gray-500 text-xs uppercase tracking-widest hover:text-white transition-colors"
                                        >
                                            ← {t.booking.back_btn}
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-8 py-3 bg-gold text-obsidian uppercase tracking-widest text-xs font-semibold hover:bg-gold-light transition-all"
                                        >
                                            {t.booking.confirm_btn}
                                        </button>
                                    </div>
                                </form>
                            )}

                            {step === 3 && (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center mx-auto mb-6 text-gold text-2xl">
                                        ✓
                                    </div>
                                    <h4 className="text-2xl font-serif text-white mb-4">{t.booking.success_title}</h4>
                                    <p className="text-gray-400 mb-8 max-w-xs mx-auto text-sm leading-relaxed">
                                        {t.booking.success_desc} <span className="text-gold">{selectedDate}</span> {t.booking.success_desc2} <span className="text-gold">{selectedTime}</span>.
                                        <br /><br />
                                        {t.booking.success_desc3}
                                    </p>
                                    <button
                                        onClick={reset}
                                        className="text-gold text-xs uppercase tracking-widest hover:text-white transition-colors border-b border-gold/30 pb-1"
                                    >
                                        {t.booking.close_btn}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Progress Bar */}
                        <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full">
                            <motion.div
                                className="h-full bg-gold"
                                initial={{ width: "33%" }}
                                animate={{ width: `${step * 33.33}%` }}
                            />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
