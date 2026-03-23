import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';
import { ExternalBlog, fetchExternalBlogs } from '@/services/blogService';

// ─── Deterministic Aesthetic Mapping ─────────────────────────────────────────
const PANEL_STYLES = [
    { categoryColor: 'bg-blue-600', panelBg: '#1e3a6e' },
    { categoryColor: 'bg-purple-600', panelBg: '#3b0764' },
    { categoryColor: 'bg-emerald-600', panelBg: '#064e3b' },
    { categoryColor: 'bg-red-600', panelBg: '#7f1d1d' },
    { categoryColor: 'bg-sky-600', panelBg: '#0c4a6e' },
    { categoryColor: 'bg-amber-600', panelBg: '#78350f' },
    { categoryColor: 'bg-pink-600', panelBg: '#831843' },
    { categoryColor: 'bg-teal-600', panelBg: '#134e4a' },
];

const getAesthetic = (slug: string) => {
    let hash = 0;
    for (let i = 0; i < slug.length; i++) hash = slug.charCodeAt(i) + ((hash << 5) - hash);
    const index = Math.abs(hash) % PANEL_STYLES.length;
    return PANEL_STYLES[index];
};

const formatDateDayMonth = (dateString: string) => {
    try {
        const d = new Date(dateString);
        return {
            dateDay: d.getDate().toString(),
            dateMonth: d.toLocaleString('en-US', { month: 'short' })
        };
    } catch {
        return { dateDay: '01', dateMonth: 'Jan' };
    }
};

// ─── Blog Card Panel with image + logo fallback ────────────────────────────────

const BlogHomePanel: React.FC<{ blog: ExternalBlog }> = ({ blog }) => {
    const [imgError, setImgError] = useState(false);
    const aesthetic = getAesthetic(blog.slug);
    const { dateDay, dateMonth } = formatDateDayMonth(blog.createdAt);
    const categoryName = blog.tags && blog.tags.length > 0 ? blog.tags[0] : 'Insight';

    return (
        <div
            className="relative h-[160px] flex items-center justify-center overflow-hidden flex-shrink-0"
            style={{ background: aesthetic.panelBg }}
        >
            {/* Dot grid */}
            <div className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)',
                    backgroundSize: '18px 18px',
                }}
            />

            {/* Real image — swaps to fallback on error */}
            {blog.coverImage && !imgError ? (
                <img
                    src={blog.coverImage}
                    alt={blog.title}
                    onError={() => setImgError(true)}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            ) : (
                <img
                    src={logo}
                    alt="EAOverseas"
                    className="relative z-10 h-12 w-auto object-contain opacity-80"
                    style={{ filter: 'brightness(0) invert(1)' }}
                />
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10 pointer-events-none" />

            {/* Category badge */}
            <span className={`absolute top-3 right-3 ${aesthetic.categoryColor} text-white text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg shadow z-10`}>
                {categoryName}
            </span>

            {/* Date chip */}
            <div className="absolute bottom-0 left-0 right-0 h-12 flex items-end px-4 pb-3 z-10"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}>
                <div className="flex items-center gap-1.5 text-white text-[11px] font-semibold">
                    <span className="material-symbols-outlined text-[13px] opacity-75">calendar_today</span>
                    {dateDay} {dateMonth} · {blog.readTime || '5 min read'}
                </div>
            </div>
        </div>
    );
};

// ─── Component ────────────────────────────────────────────────────────────────

const BlogSection: React.FC = () => {
    const navigate = useNavigate();
    const sectionRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [activeIdx, setActiveIdx] = useState(0);
    const [canLeft, setCanLeft] = useState(false);
    const [canRight, setCanRight] = useState(true);

    const [blogs, setBlogs] = useState<ExternalBlog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchExternalBlogs().then(data => {
            setBlogs(data);
            setLoading(false);
        });
    }, []);

    const updateArrows = () => {
        const el = scrollRef.current;
        if (!el) return;
        setCanLeft(el.scrollLeft > 4);
        setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
        // sync active dot
        const card = el.querySelector<HTMLElement>('[data-card]');
        if (card) {
            const cardW = card.offsetWidth + 24;
            setActiveIdx(Math.round(el.scrollLeft / cardW));
        }
    };

    useEffect(() => {
        const io = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setIsVisible(true); io.disconnect(); } },
            { threshold: 0.1 }
        );
        if (sectionRef.current) io.observe(sectionRef.current);

        const el = scrollRef.current;
        if (el) el.addEventListener('scroll', updateArrows, { passive: true });

        return () => {
            io.disconnect();
            if (el) el.removeEventListener('scroll', updateArrows);
        };
    }, [blogs.length]);

    const scrollTo = (idx: number) => {
        if (!scrollRef.current) return;
        const card = scrollRef.current.querySelector<HTMLElement>('[data-card]');
        if (!card) return;
        const cardW = card.offsetWidth + 24;
        const clamped = Math.max(0, Math.min(idx, blogs.length - 1));
        setActiveIdx(clamped);
        scrollRef.current.scrollTo({ left: clamped * cardW, behavior: 'smooth' });
    };

    const scrollPrev = () => scrollTo(activeIdx - 1);
    const scrollNext = () => scrollTo(activeIdx + 1);

    return (
        <section ref={sectionRef} className="relative w-full py-24 overflow-hidden bg-transparent">

            {/* Ambient blobs */}
            <div className="absolute -top-40 -left-32 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(122,41,194,0.09) 0%, transparent 70%)' }} />
            <div className="absolute -bottom-32 -right-20 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)' }} />

            <div className="max-w-[1280px] mx-auto px-6 md:px-10 relative z-10">

                {/* ─── Header ─── */}
                <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="flex flex-col gap-4 max-w-[560px]">
                        <div className="inline-flex items-center gap-2 bg-[#7a29c2]/[0.08] border border-[#7a29c2]/20 text-[#7a29c2] text-xs font-bold tracking-[0.1em] uppercase py-1.5 px-4 rounded-full w-fit">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7a29c2] animate-pulse" />
                            Edu Insights
                        </div>
                        <h2 className="text-[36px] md:text-[44px] max-sm:text-[26px] font-extrabold text-[#0d0d0d] leading-[1.12] tracking-tight m-0">
                            Latest{' '}
                            <span className="bg-gradient-to-r from-[#7a29c2] to-[#9333ea] bg-clip-text text-transparent">
                                Study Abroad
                            </span>{' '}
                            News
                        </h2>
                        <p className="text-[15px] text-gray-400 leading-relaxed m-0">
                            Visa updates, scholarships, and expert guides — everything you need for your global education journey.
                        </p>
                    </div>

                    {/* Desktop CTA */}
                    <button
                        onClick={() => navigate('/blogs')}
                        className="hidden sm:inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-[#7a29c2] to-[#9333ea] text-white text-sm font-bold rounded-full shadow-lg shadow-purple-200 hover:scale-105 active:scale-95 transition-all duration-200 flex-shrink-0"
                    >
                        <span className="material-symbols-outlined text-[17px]">auto_stories</span>
                        All Articles
                    </button>
                </div>

                {/* ─── Cards ─── */}
                <div className="relative">

                    {blogs.length > 0 && (
                        <>
                            {/* ← Prev arrow */}
                            <button
                                onClick={scrollPrev}
                                disabled={!canLeft}
                                aria-label="Scroll left"
                                className={`
                                    absolute left-0 top-1/2 -translate-y-1/2 z-20 -translate-x-1/2
                                    w-10 h-10 rounded-full border border-gray-200 bg-white shadow-lg
                                    flex items-center justify-center transition-all duration-200
                                    ${canLeft ? 'text-[#7a29c2] hover:bg-purple-50 hover:border-purple-300 hover:scale-110' : 'text-gray-200 cursor-not-allowed opacity-50'}
                                `}
                            >
                                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                            </button>

                            {/* → Next arrow */}
                            <button
                                onClick={scrollNext}
                                disabled={!canRight}
                                aria-label="Scroll right"
                                className={`
                                    absolute right-0 top-1/2 -translate-y-1/2 z-20 translate-x-1/2
                                    w-10 h-10 rounded-full border border-gray-200 bg-white shadow-lg
                                    flex items-center justify-center transition-all duration-200
                                    ${canRight ? 'text-[#7a29c2] hover:bg-purple-50 hover:border-purple-300 hover:scale-110' : 'text-gray-200 cursor-not-allowed opacity-50'}
                                `}
                            >
                                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                            </button>
                        </>
                    )}

                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto pb-2"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollSnapType: 'x mandatory' }}
                    >
                        {loading && blogs.length === 0 ? (
                           <div className="col-span-full py-12 text-center text-gray-500 w-full animate-pulse font-medium flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined animate-spin text-xl text-[#7a29c2]">sync</span>
                                Syncing Latest Insights...
                           </div>
                        ) : blogs.length === 0 ? (
                           <div className="col-span-full py-12 text-center text-gray-400 w-full italic">Stay tuned! Exciting new insights and study abroad guides are being curated for you.</div>
                        ) : (
                            blogs.map((blog, i) => (
                                <article
                                    key={blog.slug}
                                    data-card
                                    onClick={() => navigate(`/blog/${blog.slug}`)}
                                    className={`
                                        flex-none w-[82vw] sm:w-[340px] lg:w-[300px] xl:w-[calc(20%-20px)]
                                        rounded-[22px] border border-gray-100 bg-white
                                        shadow-sm hover:shadow-2xl hover:shadow-purple-100/50 hover:-translate-y-2
                                        transition-all duration-300 cursor-pointer overflow-hidden group
                                        flex flex-col
                                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
                                    `}
                                    style={{ transitionDelay: `${i * 80}ms`, scrollSnapAlign: 'start' }}
                                >
                                    {/* ── Top Panel ── */}
                                    <BlogHomePanel blog={blog} />
    
                                    {/* ── Content ── */}
                                    <div className="flex flex-col gap-3 p-5 flex-1">
                                        <h3 className="text-[14.5px] font-extrabold text-gray-900 leading-snug m-0 line-clamp-2 group-hover:text-[#7a29c2] transition-colors duration-200">
                                            {blog.title}
                                        </h3>
    
                                        <p className="text-[13px] text-gray-400 leading-relaxed m-0 line-clamp-3 flex-1">
                                            {blog.excerpt}
                                        </p>
    
                                        {/* Footer */}
                                        <div className="pt-3 border-t border-gray-50 flex items-center justify-between mt-auto">
                                            <span className="flex items-center gap-1 text-[12px] font-bold text-[#7a29c2] group-hover:gap-2 transition-all duration-200">
                                                Read Article
                                                <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                            </span>
                                            <div className="flex items-center gap-1 text-gray-300">
                                                <span className="material-symbols-outlined text-[15px]">person</span>
                                                <span className="text-[10px] font-semibold uppercase tracking-wide">EAOverseas</span>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))
                        )}
                    </div>
                </div>

                {/* ─── Dots + Mobile CTA ─── */}
                <div className="flex flex-col items-center gap-5 mt-7">
                    {/* Dot indicators */}
                    {blogs.length > 0 && (
                        <div className="flex gap-2 flex-wrap justify-center">
                            {blogs.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => scrollTo(i)}
                                    className={`rounded-full transition-all duration-300 ${i === activeIdx ? 'w-6 h-2 bg-[#7a29c2]' : 'w-2 h-2 bg-gray-200 hover:bg-purple-200'}`}
                                    aria-label={`Go to slide ${i + 1}`}
                                />
                            ))}
                        </div>
                    )}

                    {/* Mobile CTA */}
                    <button
                        onClick={() => navigate('/blogs')}
                        className="sm:hidden inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-[#7a29c2] to-[#9333ea] text-white text-sm font-bold rounded-full shadow-lg shadow-purple-200"
                    >
                        <span className="material-symbols-outlined text-[17px]">auto_stories</span>
                        View All Articles
                    </button>
                </div>

            </div>
        </section>
    );
};

export default BlogSection;
