import React, { useState, useEffect, useRef, useCallback } from 'react';

interface HeroCarouselProps {
    slides: React.ReactNode[];
    interval?: number;
}

const HeroCarousel = ({ slides, interval = 5000 }: HeroCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, [slides.length]);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    }, [slides.length]);

    useEffect(() => {
        if (!isPaused) {
            timerRef.current = setInterval(handleNext, interval);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [handleNext, interval, isPaused]);

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <div 
            className="w-full mx-auto p-0 overflow-hidden relative max-w-[2000px] min-h-[600px] md:min-h-[750px] bg-white group"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Base Grid Background (Subtle for Enterprise look) */}
            <div className="absolute inset-0 bg-grid-purple opacity-[0.06] pointer-events-none z-0" />

            {/* Background Ambient Glows */}
            <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-purple-100/20 blur-[140px] rounded-full pointer-events-none" />
            
            {/* Slides Track */}
            <div 
                className="flex w-full h-full transition-transform duration-1000 ease-[cubic-bezier(0.4,0,0.2,1)] will-change-transform relative z-10"
                style={{ 
                    transform: `translateX(-${currentIndex * 100}%)`,
                }}
            >
                {slides.map((slide, index) => {
                    // Only render the slide content if it's the current, next, or previous for smooth transitions
                    const isNear = Math.abs(index - currentIndex) <= 1 || 
                                 (currentIndex === 0 && index === slides.length - 1) ||
                                 (currentIndex === slides.length - 1 && index === 0);
                    
                    return (
                        <div 
                            key={index} 
                            className="min-w-full box-border flex flex-col items-center justify-center relative overflow-hidden"
                            style={{ 
                                contentVisibility: currentIndex === index ? 'auto' : 'hidden', 
                                containIntrinsicSize: '0 800px' 
                            }}
                        >
                            <div className={`w-full h-full transition-all duration-1000 ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                                {isNear ? slide : <div className="min-h-[600px] w-full bg-slate-50/20" />}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Executive Navigation Arrows */}
            <button 
                onClick={handlePrev}
                className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-50 size-14 md:size-16 rounded-full bg-white/90 backdrop-blur-md border border-slate-100 text-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                aria-label="Previous slide"
            >
                <span className="material-symbols-outlined !text-2xl md:text-3xl font-light">west</span>
            </button>
            <button 
                onClick={handleNext}
                className="absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-50 size-14 md:size-16 rounded-full bg-white/90 backdrop-blur-md border border-slate-100 text-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-white hover:scale-110 cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                aria-label="Next slide"
            >
                <span className="material-symbols-outlined !text-2xl md:text-3xl font-light">east</span>
            </button>

            {/* Indicators Section */}
            <div className="absolute bottom-10 md:bottom-14 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
                {/* Dot Indicators */}
                <div className="flex gap-6">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`group relative py-2 border-none bg-transparent cursor-pointer`}
                            aria-label={`Go to slide ${index + 1}`}
                        >
                            <div className={`h-1 rounded-full transition-all duration-500 ${currentIndex === index ? 'w-10 bg-slate-900' : 'w-4 bg-slate-200 group-hover:bg-slate-300'}`} />
                        </button>
                    ))}
                </div>
            </div>
            
            <style>{`
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.2; transform: scale(1); }
                    50% { opacity: 0.3; transform: scale(1.05); }
                }
                .material-symbols-outlined {
                    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
                }
            `}</style>
        </div>
    );
};

export default HeroCarousel;

