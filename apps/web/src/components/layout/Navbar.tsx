import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logo from '@/assets/logo.png';
import { useAuth } from '@/shared/contexts/AuthContext';
import { destinations } from '@/data/countries';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout, setLoginModalOpen } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const lastScrollY = useRef(0);
    const [isCountriesOpen, setIsCountriesOpen] = useState(false);
    const [isMobileCountriesOpen, setIsMobileCountriesOpen] = useState(false);

    const isActive = (path: string) => location.pathname === path || (path === '/landing' && location.pathname === '/');

    // True only when sitting on the landing/home page AND above the fold
    // → white/transparent navbar over the hero; purple everywhere else
    const isLandingPage = location.pathname === '/' || location.pathname === '/landing';
    const isHero = isLandingPage && !scrolled;

    // Smooth-scroll to a section by id; navigates to home first if not already there
    const scrollToSection = (sectionId: string) => {
        setIsMobileMenuOpen(false);
        const doScroll = () => {
            const el = document.getElementById(sectionId);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        };
        if (location.pathname !== '/landing' && location.pathname !== '/') {
            navigate('/landing');
            // Wait for navigation + render before scrolling
            setTimeout(doScroll, 500);
        } else {
            doScroll();
        }
    };

    // Detect scroll for elevated shadow effect and hide on scroll down
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setScrolled(currentScrollY > 10);
            
            if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
                setIsHidden(true);
            } else {
                setIsHidden(false);
            }
            lastScrollY.current = currentScrollY;
        };
        
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Nav links: path = page route, sectionId = scroll anchor (home page only)
    const navLinks = [
        { name: 'Home', path: '/landing' },
        { name: 'About', path: '/about' },
        { name: 'Countries', path: '/countries', hasDropdown: true },
        { name: 'Blogs', path: '/blogs' },
    ];

    return (
        <header className={`fixed left-0 right-0 z-[100] px-4 w-full flex justify-center pointer-events-none transition-all duration-500 ease-in-out ${isHidden ? '-top-24 opacity-0' : 'top-6 opacity-100'}`}>
            <nav
                aria-label="Primary Navigation"
                className={`
                    pointer-events-auto w-full max-w-[1400px] rounded-[19px] border shadow-xl
                    backdrop-blur-md backdrop-brightness-100 transition-all duration-300
                    ${isHero
                        ? 'bg-white/80 border-purple-100 shadow-[0px_10px_30px_rgba(122,41,194,0.08)]'
                        : 'bg-white/95 border-purple-100 shadow-2xl ' + (scrolled ? 'scale-[0.98]' : '')}
                `}
                style={{
                    boxShadow: isHero ? '0px 4px 20px rgba(122,41,194,0.1)' : '0px 10px 30px rgba(122,41,194,0.12)',
                    backdropFilter: 'blur(20px) saturate(180%)'
                }}
            >

            {/* ──────────────────── Main Row ──────────────────── */}
            <div className="max-w-[1600px] mx-auto px-4 lg:px-10 h-[68px] flex items-center gap-6 lg:gap-8">

                <Link
                    to="/landing"
                    className="flex-shrink-0 cursor-pointer select-none pointer-events-auto"
                    aria-label="Eduwoy Home"
                >
                    <img 
                        src={logo} 
                        alt="Eduwoy Logo" 
                        className="h-10 lg:h-12 w-auto object-contain transition-all duration-300 ease-in-out hover:opacity-90" 
                    />
                </Link>

                {/* Desktop Navigation – centered via flex-1 */}
                <div className="hidden lg:flex flex-1 items-center justify-center gap-1">
                    {navLinks.map((link) => (
                        <div 
                            key={link.name}
                            className="relative group"
                            onMouseEnter={() => link.hasDropdown && setIsCountriesOpen(true)}
                            onMouseLeave={() => link.hasDropdown && setIsCountriesOpen(false)}
                        >
                             <button
                                aria-haspopup={link.hasDropdown ? "true" : undefined}
                                aria-expanded={link.hasDropdown ? isCountriesOpen : undefined}
                                onClick={() =>
                                    (link as any).external
                                        ? window.open((link as any).path, '_blank', 'noopener,noreferrer')
                                        : link.sectionId
                                            ? scrollToSection(link.sectionId)
                                            : navigate(link.path!)
                                }
                                className={`
                                    relative inline-flex items-center gap-1 px-4 py-2 rounded-full
                                    text-[15px] transition-all duration-200
                                    ${'path' in link && isActive(link.path!)
                                        ? 'text-primary bg-primary/10 font-semibold'
                                        : 'text-slate-700 hover:text-primary font-medium'}
                                `}
                            >
                                {link.name}
                                {link.hasDropdown && (
                                    <span className={`material-symbols-outlined text-[15px] transition-transform duration-200 ${isCountriesOpen ? 'rotate-180' : ''}`} aria-hidden="true">
                                        expand_more
                                    </span>
                                )}
                            </button>

                            {/* Countries Dropdown */}
                            {link.hasDropdown && isCountriesOpen && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[480px] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 grid grid-cols-2 gap-2">
                                        <div className="col-span-2 pb-2 mb-2 border-b border-gray-50">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-primary opacity-70">Popular Destinations</p>
                                        </div>
                                        {destinations.map((dest) => (
                                            <div 
                                                key={dest.code}
                                                onClick={() => {
                                                    navigate(`/country/${dest.code}`);
                                                    setIsCountriesOpen(false);
                                                }}
                                                className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-primary-light/50 transition-colors cursor-pointer group/item"
                                            >
                                                <div className="w-10 h-8 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                                                    <img src={`https://flagcdn.com/w160/${dest.code.toLowerCase()}.webp`} alt="" aria-hidden="true" className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[13px] font-bold text-gray-900 group-hover/item:text-primary transition-colors">{dest.name}</span>
                                                    <span className="text-[10px] text-gray-500 font-medium line-clamp-1">{dest.tag}</span>
                                                </div>
                                            </div>
                                        ))}
                                        <div className="col-span-2 pt-2 mt-2 border-t border-gray-50 text-center">
                                            <button 
                                                onClick={() => navigate('/countries')}
                                                className="text-[11px] font-extrabold text-primary hover:underline"
                                            >
                                                View all 30+ destinations
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* 3. Right Action Group */}
                <div className="ml-auto flex items-center gap-2 lg:gap-3">

                    <button
                        onClick={() => navigate('/contact')}
                        className="group relative hidden lg:flex items-center justify-center px-6 py-2.5 min-w-[130px] rounded-full bg-primary hover:bg-primary-hover transition-all hover:scale-105 active:scale-95 shadow-[0_8px_20px_-6px_rgba(11,52,146,0.4)]"
                    >
                        <span className="relative z-10 font-sans font-medium text-white text-[15px] tracking-wide flex items-center justify-center">
                            Contact Us
                        </span>
                    </button>

                    {/* Mobile Menu Toggle */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 transition-colors rounded-lg text-gray-700 hover:text-primary hover:bg-primary-light/50"
                            aria-label="Toggle menu"
                        >
                            <span className="material-symbols-outlined text-[26px]" aria-hidden="true">
                                {isMobileMenuOpen ? 'close' : 'menu'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* ──────────────────── Mobile Menu ──────────────────── */}
            <div
                className={`
                    lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white
                    ${isMobileMenuOpen ? 'max-h-[600px] opacity-100 border-t border-gray-100 shadow-xl' : 'max-h-0 opacity-0'}
                `}
            >
                <div className="flex flex-col px-5 py-4 gap-0.5 bg-gray-50/40">
                    {navLinks.map((link) => (
                        <div key={link.name}>
                            <button
                                onClick={() => {
                                    if (link.hasDropdown) {
                                        setIsMobileCountriesOpen(!isMobileCountriesOpen);
                                    } else {
                                        link.sectionId
                                            ? scrollToSection(link.sectionId)
                                            : (navigate(link.path!), setIsMobileMenuOpen(false));
                                    }
                                }}
                                className={`
                                    w-full text-left px-4 py-2.5 rounded-xl text-[15px] font-semibold transition-all flex items-center justify-between
                                    ${'path' in link && isActive(link.path!)
                                        ? 'text-primary bg-primary-light/20'
                                        : 'text-gray-700 hover:text-primary hover:bg-primary-light/10'}
                                `}
                            >
                                {link.name}
                                {link.hasDropdown && (
                                    <span className={`material-symbols-outlined text-[20px] transition-transform duration-300 ${isMobileCountriesOpen ? 'rotate-180' : ''}`}>
                                        expand_more
                                    </span>
                                )}
                            </button>

                            {/* Mobile Countries List */}
                            {link.hasDropdown && (
                                <div className={`
                                    overflow-hidden transition-all duration-300 ease-in-out
                                    ${isMobileCountriesOpen ? 'max-h-[800px] opacity-100 my-2' : 'max-h-0 opacity-0'}
                                `}>
                                    <div className="grid grid-cols-2 gap-2 px-2">
                                        {destinations.map((dest) => (
                                            <button
                                                key={dest.code}
                                                onClick={() => {
                                                    navigate(`/country/${dest.code}`);
                                                    setIsMobileMenuOpen(false);
                                                    setIsMobileCountriesOpen(false);
                                                }}
                                                className="flex items-center gap-2.5 p-2 rounded-xl bg-white border border-gray-100 shadow-sm text-left"
                                            >
                                                <div className="w-8 h-6 rounded-md overflow-hidden border border-gray-100 flex-shrink-0">
                                                    <img src={`https://flagcdn.com/w160/${dest.code.toLowerCase()}.webp`} alt={dest.name} className="w-full h-full object-cover" />
                                                </div>
                                                <span className="text-[12px] font-bold text-gray-900 truncate">{dest.name}</span>
                                            </button>
                                        ))}
                                    </div>
                                    <button 
                                        onClick={() => { navigate('/countries'); setIsMobileMenuOpen(false); }}
                                        className="w-full py-3 text-[12px] font-bold text-primary hover:bg-primary-light/50 transition-colors mt-2"
                                    >
                                        View all destinations →
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="pt-4 mt-2 border-t border-gray-100 flex flex-col gap-3">
                        <button
                            onClick={() => { navigate('/contact'); setIsMobileMenuOpen(false); }}
                            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-primary/20 border-2 border-transparent"
                        >
                            <span className="material-symbols-outlined text-[18px]">support_agent</span>
                            Contact Us
                        </button>

                        {user && (
                            <button
                                onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                                className="w-full text-red-500 font-bold py-3 flex items-center justify-center gap-2 rounded-xl hover:bg-red-50 transition-colors"
                            >
                                <span className="material-symbols-outlined">logout</span>
                                Logout
                            </button>
                        )}

                        {/* Mobile Phone */}
                        <a
                            href="tel:+919701563362"
                            className="flex items-center justify-center gap-2 text-primary font-semibold text-sm py-2"
                        >
                            <span className="material-symbols-outlined text-[17px]">call</span>
                            +91 97015 63362
                        </a>
                    </div>
                </div>
            </div>
            </nav>
        </header>
    );
};

export default Navbar;
