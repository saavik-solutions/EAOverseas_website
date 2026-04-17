import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.webp';
import { ExternalBlog, fetchExternalBlogs } from '@/services/blogService';
import ImageWithFallback from '@/components/common/ImageWithFallback';

// ─── Deterministic Tag Color Mapping ─────────────────────────────────────────
const TAG_COLORS = [
    'bg-violet-600',
    'bg-blue-600',
    'bg-emerald-600',
    'bg-rose-600',
    'bg-amber-500',
    'bg-sky-600',
    'bg-pink-600',
    'bg-teal-600',
];

const getTagColor = (slug: string) => {
    let hash = 0;
    for (let i = 0; i < slug.length; i++) hash = slug.charCodeAt(i) + ((hash << 5) - hash);
    return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length];
};

const formatDate = (dateString: string) => {
    try {
        const d = new Date(dateString);
        return `${d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • ${d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}`;
    } catch {
        return 'Recent';
    }
};

// ─── Skeleton Card ────────────────────────────────────────────────────────────
const SkeletonCard: React.FC = () => (
    <div className="flex-none w-[300px] sm:w-[320px] rounded-[20px] overflow-hidden bg-white border border-gray-100 shadow-sm animate-pulse">
        <div className="h-[180px] bg-gray-200" />
        <div className="p-5 space-y-3">
            <div className="h-3 w-1/3 bg-gray-200 rounded-full" />
            <div className="h-4 w-full bg-gray-200 rounded-full" />
            <div className="h-4 w-5/6 bg-gray-200 rounded-full" />
            <div className="h-3 w-2/3 bg-gray-200 rounded-full" />
        </div>
    </div>
);

// ─── Blog Card ────────────────────────────────────────────────────────────────
const BlogCard: React.FC<{ blog: ExternalBlog; index: number; isVisible: boolean }> = ({ blog, index, isVisible }) => {
    const navigate = useNavigate();
    const tagColor = getTagColor(blog.slug);
    const tag = blog.tags && blog.tags.length > 0 ? blog.tags[0] : 'Insight';

    return (
        <article
            data-card
            onClick={() => navigate(`/blogs/${blog.slug}`)}
            className={`
                flex-none w-[300px] sm:w-[320px] rounded-[20px] overflow-hidden
                bg-white border border-gray-100
                shadow-sm hover:shadow-xl hover:shadow-purple-100/60 hover:-translate-y-1.5
                transition-all duration-300 cursor-pointer group flex flex-col
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
            style={{ transitionDelay: `${index * 60}ms`, scrollSnapAlign: 'start' }}
        >
            {/* ── Image Panel ── */}
            <div className="relative h-[190px] overflow-hidden bg-gray-50 flex-shrink-0">
                <ImageWithFallback
                    src={blog.coverImage ?? ''}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    fallbackContainerClassName="w-full h-full bg-gradient-to-br from-purple-700 via-violet-600 to-purple-900"
                />

                {/* Tag badge */}
                <span className={`absolute top-3 left-3 ${tagColor} text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-md`}>
                    {tag}
                </span>

                {/* Read time badge */}
                <span className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-1 rounded-lg">
                    {blog.readTime || '5 min'}
                </span>

                {/* Bottom gradient */}
                <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* ── Content ── */}
            <div className="flex flex-col flex-1 p-5 gap-3">
                {/* Date */}
                <div className="flex items-center gap-1.5 text-[11px] text-gray-400 font-medium">
                    <span className="material-symbols-outlined text-[13px] text-purple-400">calendar_today</span>
                    {formatDate(blog.createdAt)}
                </div>

                {/* Title */}
                <h3 className="text-[15px] font-extrabold text-gray-900 leading-snug line-clamp-2 group-hover:text-purple-700 transition-colors duration-200 m-0">
                    {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-3 flex-1 m-0">
                    {blog.excerpt}
                </p>

                {/* Footer row */}
                <div className="flex items-center justify-between pt-3.5 border-t border-gray-50 mt-auto">
                    <span className="flex items-center gap-1.5 text-[12px] font-extrabold text-purple-600 group-hover:gap-2.5 transition-all duration-200">
                        Read Article
                        <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </span>
                    <div className="flex items-center gap-1 text-gray-300 text-[10px] font-bold uppercase tracking-wide">
                        <span className="material-symbols-outlined text-[13px]">auto_stories</span>
                        EAOverseas
                    </div>
                </div>
            </div>
        </article>
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
        const card = el.querySelector<HTMLElement>('[data-card]');
        if (card) {
            const cardW = card.offsetWidth + 20;
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
        const cardW = card.offsetWidth + 20;
        const clamped = Math.max(0, Math.min(idx, blogs.length - 1));
        setActiveIdx(clamped);
        scrollRef.current.scrollTo({ left: clamped * cardW, behavior: 'smooth' });
    };

    return (
        <section ref={sectionRef} className="relative w-full py-20 overflow-hidden bg-transparent">
            {/* Ambient background blobs */}
            <div
                className="absolute -top-48 -left-40 w-[600px] h-[600px] rounded-full blur-[130px] pointer-events-none opacity-60"
                style={{ background: 'radial-gradient(circle, rgba(122,41,194,0.07) 0%, transparent 70%)' }}
            />
            <div
                className="absolute -bottom-40 -right-24 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none opacity-50"
                style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)' }}
            />

            <div className="max-w-[1320px] mx-auto px-6 md:px-10 relative z-10">

                {/* ─── Section Header ─── */}
                <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-purple-600 bg-purple-50 border border-purple-100 px-4 py-1.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
                            Edu Insights
                        </div>
                        <h2 className="text-[34px] md:text-[44px] max-sm:text-[26px] font-extrabold text-gray-900 leading-tight tracking-tight m-0">
                            Latest{' '}
                            <span className="bg-gradient-to-r from-purple-700 to-violet-500 bg-clip-text text-transparent">
                                Study Abroad
                            </span>{' '}
                            News
                        </h2>
                        <p className="text-[15px] text-gray-400 leading-relaxed max-w-lg m-0">
                            Visa updates, scholarships & expert guides — everything you need for your global journey.
                        </p>
                    </div>

                    {/* Desktop CTA */}
                    <button
                        onClick={() => navigate('/blogs')}
                        className="hidden sm:inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-purple-700 to-violet-500 text-white text-sm font-extrabold rounded-full shadow-lg shadow-purple-200/60 hover:scale-105 hover:shadow-xl hover:shadow-purple-200/70 active:scale-95 transition-all duration-200 flex-shrink-0"
                    >
                        <span className="material-symbols-outlined text-[16px]">auto_stories</span>
                        All Articles
                    </button>
                </div>

                {/* ─── Cards Carousel ─── */}
                <div className="relative">
                    {/* Prev Arrow */}
                    {canLeft && (
                        <button
                            onClick={() => scrollTo(activeIdx - 1)}
                            aria-label="Scroll left"
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-20
                                       w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg
                                       flex items-center justify-center text-purple-600
                                       hover:bg-purple-50 hover:border-purple-300 hover:scale-110 transition-all duration-200"
                        >
                            <span className="material-symbols-outlined text-[20px]">chevron_left</span>
                        </button>
                    )}

                    {/* Next Arrow */}
                    {canRight && !loading && blogs.length > 0 && (
                        <button
                            onClick={() => scrollTo(activeIdx + 1)}
                            aria-label="Scroll right"
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-20
                                       w-10 h-10 rounded-full bg-white border border-gray-200 shadow-lg
                                       flex items-center justify-center text-purple-600
                                       hover:bg-purple-50 hover:border-purple-300 hover:scale-110 transition-all duration-200"
                        >
                            <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                        </button>
                    )}

                    {/* Scroll container */}
                    <div
                        ref={scrollRef}
                        className="flex gap-5 overflow-x-auto pb-3"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', scrollSnapType: 'x mandatory' }}
                    >
                        {loading ? (
                            Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
                        ) : blogs.length === 0 ? (
                            <div className="w-full py-16 text-center text-gray-400 italic text-sm">
                                Fresh insights are being curated. Check back soon!
                            </div>
                        ) : (
                            blogs.map((blog, i) => (
                                <BlogCard
                                    key={blog.slug}
                                    blog={blog}
                                    index={i}
                                    isVisible={isVisible}
                                />
                            ))
                        )}
                    </div>
                </div>

                {/* ─── Dots + Mobile CTA ─── */}
                <div className="flex flex-col items-center gap-5 mt-8">
                    {blogs.length > 0 && (
                        <div className="flex items-center gap-2">
                            {blogs.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => scrollTo(i)}
                                    aria-label={`Go to slide ${i + 1}`}
                                    className={`rounded-full transition-all duration-300 ${
                                        i === activeIdx
                                            ? 'w-6 h-2 bg-purple-600'
                                            : 'w-2 h-2 bg-gray-200 hover:bg-purple-200'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                    <button
                        onClick={() => navigate('/blogs')}
                        className="sm:hidden inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-purple-700 to-violet-500 text-white text-sm font-extrabold rounded-full shadow-lg shadow-purple-200/60"
                    >
                        <span className="material-symbols-outlined text-[16px]">auto_stories</span>
                        View All Articles
                    </button>
                </div>

            </div>
        </section>
    );
};

export default BlogSection;
