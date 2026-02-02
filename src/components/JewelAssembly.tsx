"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { useScroll, useTransform, useSpring, motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { useLanguage } from "@/context/LanguageContext";

interface JewelAssemblyProps {
    onOpenBooking?: () => void;
}

export default function JewelAssembly({ onOpenBooking }: JewelAssemblyProps) {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const totalFrames = 240;
    const [isLoading, setIsLoading] = useState(true);
    const [step, setStep] = useState(1);

    // Scroll logic
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Spring physics for smooth "physical flywheel" effect
    const smoothScroll = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Transform scroll progress to frame index
    const frameIndex = useTransform(smoothScroll, [0, 1], [0, totalFrames - 1]);

    // Preload images
    useEffect(() => {
        // Simple mobile detection based on width
        const isMobile = window.innerWidth < 768;
        const currentStep = isMobile ? 2 : 1; // Skip every other frame on mobile
        setStep(currentStep);

        const loadedImages: HTMLImageElement[] = [];
        let imagesCount = 0;
        const totalFramesToLoad = Math.ceil(totalFrames / currentStep);

        for (let i = 1; i <= totalFrames; i += currentStep) {
            const img = new Image();
            img.decoding = 'async'; // Non-blocking decoding
            // Filename format: ezgif-frame-001.jpg
            const frameNumber = i.toString().padStart(3, "0");
            img.src = `/sequence/ezgif-frame-${frameNumber}.jpg`;
            img.onload = () => {
                imagesCount++;
                setImagesLoaded(imagesCount);
                if (imagesCount >= totalFramesToLoad) {
                    setIsLoading(false);
                }
            };
            loadedImages.push(img);
        }
        setImages(loadedImages);
    }, []);

    // Canvas drawing loop
    useEffect(() => {
        if (images.length === 0 || !canvasRef.current) return;

        const context = canvasRef.current.getContext("2d");
        if (!context) return;

        const render = () => {
            const rawIndex = Math.floor(frameIndex.get());
            // Calculate index in the reduced array
            // e.g. if step is 2, frame 0->idx0, frame 1->idx0, frame 2->idx1...
            const arrayIndex = Math.min(
                Math.floor(rawIndex / step),
                images.length - 1
            );

            const img = images[arrayIndex];

            if (img && img.complete) {
                // Clear canvas
                context.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);

                // Calculate aspect ratio to fit image in canvas
                const canvas = canvasRef.current!;
                const hRatio = canvas.width / img.width;
                const vRatio = canvas.height / img.height;
                const ratio = Math.min(hRatio, vRatio);
                const centerShift_x = (canvas.width - img.width * ratio) / 2;
                const centerShift_y = (canvas.height - img.height * ratio) / 2;

                context.drawImage(
                    img,
                    0, 0, img.width, img.height,
                    centerShift_x, centerShift_y, img.width * ratio, img.height * ratio
                );
            }
        };

        const unsubscribe = frameIndex.on("change", render);

        // Initial render
        render();

        // Resize handler
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth * window.devicePixelRatio;
                canvasRef.current.height = window.innerHeight * window.devicePixelRatio;
                render();
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
            unsubscribe();
            window.removeEventListener("resize", handleResize);
        };
    }, [images, frameIndex, step]);

    // Narrative Text Overlays
    const introOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
    const introScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);

    const text1Opacity = useTransform(scrollYProgress, [0.25, 0.35, 0.45], [0, 1, 0]);
    const text1X = useTransform(scrollYProgress, [0.25, 0.35], [-50, 0]);

    const text2Opacity = useTransform(scrollYProgress, [0.55, 0.65, 0.75], [0, 1, 0]);
    const text2X = useTransform(scrollYProgress, [0.55, 0.65], [50, 0]);

    const finaleOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);
    const finaleY = useTransform(scrollYProgress, [0.85, 0.95], [50, 0]);

    return (
        <div ref={containerRef} className="relative h-[400vh] bg-obsidian">
            {/* Loading Screen */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-obsidian"
                    >
                        <div className="relative w-32 h-32 mb-8">
                            {/* Minimalist golden line drawing of a gemstone */}
                            <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-gold-light stroke-[0.5]">
                                <path d="M50 5 L90 35 L75 95 L25 95 L10 35 Z" />
                                <path d="M50 5 L50 95" />
                                <path d="M10 35 L90 35" />
                                <path d="M10 35 L50 95 L90 35" />
                                <path d="M25 95 L50 5 L75 95" />
                                <motion.path
                                    d="M50 5 L90 35 L75 95 L25 95 L10 35 Z"
                                    strokeWidth="2"
                                    stroke="#D4AF37"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: imagesLoaded / totalFrames }}
                                />
                            </svg>
                        </div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-gold-light font-serif tracking-[0.2em] text-xs uppercase"
                        >
                            {t.intro.loading} {Math.round((imagesLoaded / totalFrames) * 100)}%
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-contain pointer-events-none"
                />

                {/* Watermark Mask - Bottom Right Corner - Extended */}
                <div className="absolute bottom-0 right-0 w-80 h-32 bg-gradient-to-tl from-obsidian via-obsidian/95 to-transparent pointer-events-none z-10" />
                <div className="absolute bottom-0 right-0 w-56 h-20 bg-obsidian pointer-events-none z-10" />

                {/* Narrative Overlays */}

                {/* Intro */}
                <motion.div
                    style={{ opacity: introOpacity, scale: introScale }}
                    className="absolute inset-x-0 top-[12%] flex flex-col items-center justify-center text-center px-4 z-20"
                >
                    <p className="text-gold-light tracking-[0.4em] uppercase text-sm md:text-base mb-4 font-medium backdrop-blur-md bg-obsidian/60 py-2 px-6 rounded-full border border-white/10 drop-shadow-lg">
                        {t.intro.badge}
                    </p>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white tracking-tighter drop-shadow-2xl">
                        {t.intro.title}
                    </h1>
                </motion.div>

                {/* 33% - Le Geste Juste */}
                <motion.div
                    style={{ opacity: text1Opacity, x: text1X }}
                    className="absolute left-[5%] md:left-[10%] top-1/2 -translate-y-1/2 max-w-md z-20"
                >
                    <div className="backdrop-blur-md bg-obsidian/60 p-8 rounded-sm border border-white/5 shadow-2xl">
                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-4 drop-shadow-md">
                            {t.intro.step1_title}
                        </h2>
                        <p className="text-gray-200 font-sans leading-relaxed drop-shadow-sm">
                            {t.intro.step1_desc}
                        </p>
                    </div>
                </motion.div>

                {/* 66% - Trois Générations */}
                <motion.div
                    style={{ opacity: text2Opacity, x: text2X }}
                    className="absolute right-[5%] md:right-[10%] top-1/2 -translate-y-1/2 text-right max-w-md z-20"
                >
                    <div className="backdrop-blur-md bg-obsidian/60 p-8 rounded-sm border border-white/5 shadow-2xl">
                        <h2 className="text-4xl md:text-5xl font-serif text-white mb-4 drop-shadow-md">
                            {t.intro.step2_title}
                        </h2>
                        <p className="text-gray-200 font-sans leading-relaxed drop-shadow-sm">
                            {t.intro.step2_desc}
                        </p>
                    </div>
                </motion.div>

                {/* 90% - Finale */}
                <motion.div
                    style={{ opacity: finaleOpacity, y: finaleY }}
                    className="absolute bottom-[10%] left-0 right-0 flex flex-col items-center justify-center text-center px-4 z-20"
                >
                    <div className="backdrop-blur-md bg-obsidian/40 p-8 rounded-sm border border-white/5 shadow-2xl max-w-2xl">
                        <h2 className="text-5xl md:text-7xl font-serif text-white mb-8 drop-shadow-lg">
                            {t.intro.finale_title}
                        </h2>
                        <motion.button
                            whileHover={{ backgroundColor: "rgba(212, 175, 55, 1)", color: "#000", scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onOpenBooking}
                            className="px-10 py-4 bg-obsidian/80 border border-gold-light text-gold-light tracking-[0.2em] uppercase text-xs transition-all duration-300 font-semibold"
                        >
                            {t.nav.book}
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Decorative progress bar */}
            <motion.div
                style={{ scaleX: scrollYProgress }}
                className="fixed bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent origin-left z-40"
            />
        </div>
    );
}
