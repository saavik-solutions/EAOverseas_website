import React, { useState, useEffect, useRef, useCallback } from 'react';

interface HeroCarouselProps {
    slides: React.ReactNode[];
    interval?: number;
}

const HeroCarousel = ({ slides, interval = 5000 }: HeroCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [progress, setProgress] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
        setProgress(0);
    }, [slides.length]);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
        setProgress(0);
    }, [slides.length]);

    useEffect(() => {
        if (!isPaused) {
            timerRef.current = setInterval(handleNext, interval);
            
            const step = 100 / (interval / 100);
            progressIntervalRef.current = setInterval(() => {
                setProgress((prev) => Math.min(prev + step, 100));
            }, 100);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        };
    }, [handleNext, interval, isPaused]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
        setProgress(0);
    };

    return (
        <div 
            className="w-full mx-auto p-0 overflow-hidden relative max-w-[1600px] bg-white group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Slides Track */}
            <div 
                className="flex w-full transition-transform duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform"
                style={{ 
                    transform: `translateX(-${currentIndex * 100}%)`,
                }}
            >
                {slides.map((slide, index) => (
                    <div key={index} className="min-w-full box-border flex flex-col items-center justify-center pt-6 pb-16 px-8 max-md:py-8 max-md:px-4 min-h-[600px] max-md:min-h-[500px] relative">
                        <div className="w-full flex justify-center items-center animate-[slideInUp_0.8s_cubic-bezier(0.4,0,0.2,1)_forwards]">
                            {slide}
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Arrows */}
            <button 
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-40 size-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 hover:scale-110 cursor-pointer"
                aria-label="Previous slide"
            >
                <span className="material-symbols-outlined">arrow_back_ios_new</span>
            </button>
            <button 
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-40 size-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white/20 hover:scale-110 cursor-pointer"
                aria-label="Next slide"
            >
                <span className="material-symbols-outlined">arrow_forward_ios</span>
            </button>

            {/* Progress Bar & Indicators */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-4">
                <div className="flex gap-3">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 rounded-full bg-black/10 border-none cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.4,0,0.2,1)] ${currentIndex === index ? 'bg-[#7a29c2] !w-8' : ''}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
                {/* Visual Progress Bar */}
                <div className="w-48 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-[#ffda6b] transition-[width] duration-100 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
            
            <style>{`
                @keyframes slideInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};

export default HeroCarousel;

