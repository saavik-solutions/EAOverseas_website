import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }

        const scrollToTop = () => {
            // Standard window/document resets
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            document.documentElement.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            document.body.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            
            // Common container resets
            const commonContainers = ['root', 'app-root', 'main-content'];
            commonContainers.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            });

            // Target all <main> tags as they often hold the scroll in this project
            const mains = document.getElementsByTagName('main');
            for (let i = 0; i < mains.length; i++) {
                mains[i].scrollTo({ top: 0, left: 0, behavior: 'instant' });
            }

            // Target general scrollable wrappers
            const scrollables = document.querySelectorAll('.overflow-y-auto, .overflow-y-scroll');
            scrollables.forEach(el => {
                el.scrollTo({ top: 0, left: 0, behavior: 'instant' });
            });
        };

        scrollToTop();
        const timer = setTimeout(scrollToTop, 150);
        
        return () => clearTimeout(timer);
    }, [pathname]);

    return null;
};

export { ScrollToTop };
