import { useState, useEffect } from 'react';

export function CookieConsentBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('eaoverseas_cookie_consent');
        if (!consent) {
            // Slight delay so it doesn't jarringly block initial LCP render
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';
        localStorage.setItem('eaoverseas_cookie_consent', 'accepted');
        setIsVisible(false);

        // Dynamically load GA4
        if (typeof window !== 'undefined') {
            // 1. Load the script
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
            document.head.appendChild(script);

            // 2. Initialize dataLayer and gtag
            (window as any).dataLayer = (window as any).dataLayer || [];
            const gtag = function(...args: any[]) {
                (window as any).dataLayer.push(args);
            };
            (window as any).gtag = gtag;
            
            (window as any).gtag('js', new Date());
            (window as any).gtag('config', measurementId, {
                'analytics_storage': 'granted'
            });
        }
    };

    const handleDecline = () => {
        localStorage.setItem('eaoverseas_cookie_consent', 'declined');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:max-w-md bg-white border border-slate-200 rounded-xl shadow-2xl z-[9999] p-5 font-sans animate-in slide-in-from-bottom-5 duration-500">
            <button 
                onClick={handleDecline} 
                className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 transition-colors"
                aria-label="Close"
            >
                <span className="material-symbols-outlined !text-[16px]">close</span>
            </button>
            <div className="mb-4 pr-6">
                <h3 className="text-[#111218] font-bold text-sm mb-1">We value your privacy</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                    EAOverseas uses strictly necessary cookies to run this site and analytics cookies to improve your experience. 
                    By clicking "Accept", you agree to our <a href="/privacy-policy" className="text-purple-600 hover:underline">Privacy Policy</a>.
                </p>
            </div>
            <div className="flex gap-3">
                <button 
                    onClick={handleAccept}
                    className="flex-1 bg-[#7a29c2] hover:bg-[#6824a6] text-white text-xs font-bold py-2.5 px-4 rounded-lg transition-colors"
                >
                    Accept
                </button>
                <button 
                    onClick={handleDecline}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold py-2.5 px-4 rounded-lg transition-colors"
                >
                    Decline
                </button>
            </div>
        </div>
    );
}
