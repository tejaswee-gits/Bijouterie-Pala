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
    const [isSuccess, setIsSuccess] = useState(false);
    const [selectedDate, setSelectedDate] = useState<number | null>(4); // Default to 4th for demo
    const [selectedTime, setSelectedTime] = useState<string | null>("10:30"); // Default demo

    // Demo Calendar Data (October 2023 style from image, but let's make it generic enough)
    const days = ["LU", "MA", "ME", "JE", "VE", "SA", "DI"];
    // Starting partial grid for demo visual accuracy
    const calendarDays = [
        { day: 25, prev: true }, { day: 26, prev: true }, { day: 27, prev: true }, { day: 28, prev: true }, { day: 29, prev: true }, { day: 30, prev: true }, { day: 1, prev: false },
        { day: 2, prev: false }, { day: 3, prev: false }, { day: 4, prev: false }, { day: 5, prev: false }, { day: 6, prev: false }, { day: 7, prev: false }, { day: 8, prev: false },
        { day: 9, prev: false }, { day: 10, prev: false }, { day: 11, prev: false }, { day: 12, prev: false }, { day: 13, prev: false }, { day: 14, prev: false }, { day: 15, prev: false }
    ];

    const timeSlots = [
        "09:30", "10:00", "10:30", "11:00",
        "11:30", "14:00", "14:30", "15:00",
        "15:30", "16:00"
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTimeout(() => setIsSuccess(true), 500);
    };

    const reset = () => {
        setIsSuccess(false);
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
                        className="fixed inset-0 bg-black/95 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-pointer"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-5xl h-auto max-h-[90vh] bg-[#0c0c0c] border border-white/5 shadow-2xl z-50 overflow-hidden rounded-sm flex flex-col md:flex-row"
                    >
                        {/* Success Overlay */}
                        {isSuccess && (
                            <div className="absolute inset-0 bg-[#0c0c0c] z-50 flex flex-col items-center justify-center text-center p-8">
                                <div className="w-20 h-20 rounded-full border border-gold/30 flex items-center justify-center mb-6 text-gold text-3xl">✓</div>
                                <h4 className="text-3xl font-serif text-white mb-4 italic">{t.booking.success_title}</h4>
                                <p className="text-gray-400 mb-8 max-w-md text-sm leading-relaxed">
                                    {t.booking.success_desc} <span className="text-gold">Oct {selectedDate}</span> {t.booking.success_desc2} <span className="text-gold">{selectedTime}</span>.
                                    <br /><br />
                                    {t.booking.success_desc3}
                                </p>
                                <button onClick={reset} className="text-gold text-xs uppercase tracking-widest border-b border-gold/30 pb-1 hover:text-white transition-colors">
                                    {t.booking.close_btn}
                                </button>
                            </div>
                        )}

                        {/* LEFT COLUMN: Context & Calendar */}
                        <div className="w-full md:w-2/5 p-8 md:p-12 bg-[#111] border-b md:border-b-0 md:border-r border-white/5 flex flex-col justify-between relative overflow-y-auto">
                            <div>
                                <h3 className="text-gold text-xs uppercase tracking-[0.2em] mb-4 font-semibold">{t.booking.subtitle}</h3>
                                <h2 className="text-4xl md:text-5xl font-serif text-white italic mb-6 leading-tight">{t.booking.title_main}</h2>
                                <p className="text-gray-400 text-sm leading-relaxed mb-12 max-w-xs block">
                                    {t.booking.desc_main}
                                </p>

                                {/* Calendar Widget */}
                                <div className="mb-8">
                                    <div className="flex justify-between items-center mb-6 text-white font-serif text-lg">
                                        <span>Octobre 2023</span>
                                        <div className="flex gap-4 text-xs">
                                            <button className="text-gray-500 hover:text-white">‹</button>
                                            <button className="text-gray-500 hover:text-white">›</button>
                                        </div>
                                    </div>

                                    {/* Days Header */}
                                    <div className="grid grid-cols-7 mb-4 text-center">
                                        {days.map(d => (
                                            <span key={d} className="text-[10px] text-gray-500 uppercase tracking-widest">{d}</span>
                                        ))}
                                    </div>

                                    {/* Dates Grid */}
                                    <div className="grid grid-cols-7 gap-y-4 text-center">
                                        {calendarDays.map((date, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setSelectedDate(date.day)}
                                                disabled={date.prev}
                                                className={`mx-auto w-8 h-8 flex items-center justify-center text-sm transition-all duration-300 rounded-sm
                                                    ${date.prev ? 'text-gray-700 cursor-default' :
                                                        selectedDate === date.day ? 'bg-gold text-black font-semibold shadow-[0_0_15px_rgba(212,175,55,0.3)]' : 'text-gray-300 hover:text-gold'}
                                                `}
                                            >
                                                {date.day}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Form & Times */}
                        <div className="w-full md:w-3/5 p-8 md:p-12 bg-[#0c0c0c] relative overflow-y-auto custom-scrollbar">
                            {/* Close Button */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 text-gray-500 hover:text-white transition-colors"
                            >
                                ✕
                            </button>

                            <h3 className="text-2xl font-serif text-white mb-10">{t.booking.details_title}</h3>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2 group">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-500 group-focus-within:text-gold transition-colors">{t.booking.label_name}</label>
                                        <input
                                            type="text"
                                            placeholder={t.booking.placeholder_name}
                                            className="w-full bg-transparent border-b border-white/10 py-2 text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors text-sm"
                                        />
                                    </div>
                                    <div className="space-y-2 group">
                                        <label className="text-[10px] uppercase tracking-widest text-gray-500 group-focus-within:text-gold transition-colors">{t.booking.label_email}</label>
                                        <input
                                            type="email"
                                            placeholder={t.booking.placeholder_email}
                                            className="w-full bg-transparent border-b border-white/10 py-2 text-white placeholder-white/20 focus:outline-none focus:border-gold transition-colors text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2 group">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500 group-focus-within:text-gold transition-colors">{t.booking.label_service}</label>
                                    <div className="relative">
                                        <select className="w-full bg-transparent border-b border-white/10 py-2 text-white appearance-none focus:outline-none focus:border-gold transition-colors text-sm cursor-pointer">
                                            <option className="bg-[#111]">{t.booking.service_options.creation}</option>
                                            <option className="bg-[#111]">{t.booking.service_options.repair}</option>
                                            <option className="bg-[#111]">{t.booking.service_options.wedding}</option>
                                        </select>
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] text-gray-500 pointer-events-none">▼</div>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <label className="block text-[10px] uppercase tracking-widest text-gray-500 mb-6">{t.booking.label_time}</label>
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                        {timeSlots.map(time => (
                                            <button
                                                key={time}
                                                type="button"
                                                onClick={() => setSelectedTime(time)}
                                                className={`py-3 text-xs border transition-all duration-300
                                                    ${selectedTime === time
                                                        ? 'border-gold text-gold bg-transparent'
                                                        : 'border-white/10 text-gray-400 hover:border-white/30 hover:text-white'}
                                                `}
                                            >
                                                {time}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row items-center justify-between pt-8 gap-6">
                                    <p className="text-[10px] text-gray-600 italic max-w-xs">{t.booking.disclaimer}</p>
                                    <button
                                        type="submit"
                                        className="w-full md:w-auto px-8 py-4 bg-gold text-[#0c0c0c] uppercase tracking-[0.15em] text-xs font-bold hover:bg-[#c5a028] transition-colors flex items-center justify-center gap-2"
                                    >
                                        {t.booking.btn_confirm} <span>→</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
