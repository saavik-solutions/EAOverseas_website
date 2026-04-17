import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.webp';
import ImageWithFallback from '@/components/common/ImageWithFallback';
import { experts } from '../../../data/experts';

// ─── Types ────────────────────────────────────────────────────────────────────

interface Expert {
    id: string;
    name: string;
    role: string;
    bio: string;
    category: string;
    color: string;
    tagBg: string;
    tags: string[];
    image: string;
    stats: { studentsGuided: string; visaSuccess: string; yearsExperience: string };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getInitials = (name: string) =>
    name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

const CATEGORY_ICON: Record<string, string> = {
    Leadership: 'star',
    Counsellors: 'support_agent',
    'Visa Experts': 'airplane_ticket',
    'Tech & Design': 'code',
};

// ─── Avatar with Initials Fallback ───────────────────────────────────────────

// MemberAvatar is replaced by ImageWithFallback below

// ─── Main Component ───────────────────────────────────────────────────────────

const TeamSection: React.FC = () => {
    const navigate = useNavigate();
    const scrollRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [activeIdx, setActiveIdx] = useState(0);

    const team = (experts as Expert[]).filter((e) => e.category !== 'Tech & Design').slice(0, 6);

    useEffect(() => {
        const io = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); io.disconnect(); } },
            { threshold: 0.1 }
        );
        if (sectionRef.current) io.observe(sectionRef.current);
        return () => io.disconnect();
    }, []);

    const scrollTo = (idx: number) => {
        if (!scrollRef.current) return;
        const card = scrollRef.current.querySelector<HTMLElement>('[data-member-card]');
        if (!card) return;
        setActiveIdx(idx);
        scrollRef.current.scrollTo({ left: idx * (card.offsetWidth + 24), behavior: 'smooth' });
    };

    const scroll = (dir: 'left' | 'right') =>
        scrollTo(dir === 'right' ? Math.min(activeIdx + 1, team.length - 1) : Math.max(activeIdx - 1, 0));

    return (
        <section ref={sectionRef} id="our-experts" className="relative w-full py-24 overflow-hidden bg-transparent">

            {/* Ambient blobs */}
            <div className="absolute -top-40 -right-28 w-[500px] h-[500px] rounded-full blur-[120px] pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(122,41,194,0.09) 0%, transparent 70%)' }} />
            <div className="absolute -bottom-32 -left-20 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)' }} />

            <div className="max-w-[1280px] mx-auto px-6 md:px-10 relative z-10">

                {/* ─── Header ─── */}
                <div className={`flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <div className="flex flex-col gap-4 max-w-[560px]">
                        <div className="inline-flex items-center gap-2 bg-[#7a29c2]/[0.08] border border-[#7a29c2]/20 text-[#7a29c2] text-xs font-bold tracking-[0.1em] uppercase py-1.5 px-4 rounded-full w-fit">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#7a29c2] animate-pulse" />
                            Our Team
                        </div>
                        <h2 className="text-[36px] md:text-[44px] max-sm:text-[26px] font-extrabold text-[#0d0d0d] leading-[1.12] tracking-tight m-0">
                            Meet the{' '}
                            <span className="bg-gradient-to-r from-[#7a29c2] to-[#9333ea] bg-clip-text text-transparent">
                                Experts
                            </span>{' '}
                            Behind Your Success
                        </h2>
                        <p className="text-[15px] text-gray-400 leading-relaxed m-0">
                            Seasoned counsellors, visa specialists, and education consultants dedicated to making your overseas education journey seamless.
                        </p>
                    </div>

                    <button
                        onClick={() => navigate('/team')}
                        className="hidden sm:inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-[#7a29c2] to-[#9333ea] text-white text-sm font-bold rounded-full shadow-lg shadow-purple-200 hover:scale-105 active:scale-95 transition-all duration-200 flex-shrink-0"
                    >
                        <span className="material-symbols-outlined text-[17px]">groups</span>
                        Meet Our Team
                    </button>
                </div>

                {/* ─── Carousel ─── */}
                <div className="relative">

                    {/* Left arrow */}
                    <button
                        onClick={() => scroll('left')}
                        disabled={activeIdx === 0}
                        aria-label="Previous team member"
                        className="hidden md:flex absolute -left-5 top-[110px] z-20 w-11 h-11 rounded-full bg-white border border-gray-100 shadow-lg items-center justify-center text-gray-500 hover:border-[#7a29c2] hover:text-[#7a29c2] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <span className="material-symbols-outlined text-[20px]" aria-hidden="true">chevron_left</span>
                    </button>

                    <div
                        ref={scrollRef}
                        className="flex gap-6 overflow-x-auto pb-6 pt-4 -mt-4"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {team.map((member, i) => (
                            <article
                                key={member.id}
                                data-member-card
                                onClick={() => navigate(`/expert-profile/${member.id}`)}
                                className={`flex-none w-[82vw] sm:w-[300px] rounded-[22px] border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-purple-100/50 hover:-translate-y-2 transition-all duration-300 cursor-pointer group flex flex-col ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${i * 80}ms` }}
                            >
                                {/* ── Photo Panel ── */}
                                <div className="relative h-[220px] overflow-hidden flex-shrink-0">
                                    {/* Photo (with initials fallback) */}
                                    <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-500 ease-out">
                                        <ImageWithFallback 
                                            src={member.image} 
                                            alt={member.name} 
                                            className="w-full h-full object-cover object-top"
                                            fallbackContainerClassName="w-full h-full"
                                        />
                                    </div>

                                    {/* Bottom gradient overlay */}
                                    <div
                                        className="absolute inset-x-0 bottom-0 h-28 pointer-events-none"
                                        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.60) 0%, transparent 100%)' }}
                                    />

                                    {/* Category chip on top of gradient */}
                                    <div
                                        className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 text-[9.5px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full z-10 shadow-sm"
                                        style={{ backgroundColor: member.tagBg, color: member.color }}
                                    >
                                        <span className="material-symbols-outlined text-[11px]" aria-hidden="true">
                                            {CATEGORY_ICON[member.category] ?? 'person'}
                                        </span>
                                        {member.category}
                                    </div>

                                    {/* Online indicator */}
                                    <span className="absolute top-3 right-3 flex items-center gap-1 bg-black/30 backdrop-blur-sm text-white text-[9px] font-semibold px-2 py-0.5 rounded-full z-10">
                                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" aria-hidden="true" />
                                        Available
                                    </span>
                                </div>

                                {/* ── Info ── */}
                                <div className="flex flex-col gap-3 p-5 flex-1">
                                    <div>
                                        <h3 className="text-[17px] font-extrabold text-gray-900 m-0 leading-tight group-hover:text-[#7a29c2] transition-colors duration-200">
                                            {member.name}
                                        </h3>
                                        <p className="text-[12.5px] font-semibold text-gray-400 m-0 mt-0.5">{member.role}</p>
                                    </div>

                                    <p className="text-[13px] text-gray-400 leading-relaxed m-0 line-clamp-2 flex-1">
                                        {member.bio}
                                    </p>

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-50">
                                        {[
                                            { label: 'Students', value: member.stats.studentsGuided },
                                            { label: 'Visa Rate', value: member.stats.visaSuccess },
                                            { label: 'Exp.', value: member.stats.yearsExperience },
                                        ].filter((s) => s.value !== 'N/A').map((s) => (
                                            <div key={s.label} className="flex flex-col items-center gap-0.5">
                                                <span className="text-[13px] font-black" style={{ color: member.color }}>{s.value}</span>
                                                <span className="text-[9px] font-semibold text-gray-400 uppercase tracking-wide">{s.label}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Tags + CTA */}
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-50 mt-auto">
                                        <div className="flex flex-wrap gap-1">
                                            {member.tags.slice(0, 2).map((tag) => (
                                                <span key={tag} className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <span className="flex items-center gap-1 text-[12px] font-bold group-hover:gap-2 transition-all duration-200" style={{ color: member.color }}>
                                            Profile
                                            <span className="material-symbols-outlined text-[14px] group-hover:translate-x-1 transition-transform duration-200" aria-hidden="true">arrow_forward</span>
                                        </span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Right arrow */}
                    <button
                        onClick={() => scroll('right')}
                        disabled={activeIdx === team.length - 1}
                        aria-label="Next team member"
                        className="hidden md:flex absolute -right-5 top-[110px] z-20 w-11 h-11 rounded-full bg-white border border-gray-100 shadow-lg items-center justify-center text-gray-500 hover:border-[#7a29c2] hover:text-[#7a29c2] transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <span className="material-symbols-outlined text-[20px]" aria-hidden="true">chevron_right</span>
                    </button>
                </div>

                {/* ─── Dots + Mobile CTA ─── */}
                <div className="flex flex-col items-center gap-5 mt-7">
                    <div className="flex gap-2">
                        {team.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => scrollTo(i)}
                                className={`rounded-full transition-all duration-300 ${i === activeIdx ? 'w-6 h-2 bg-[#7a29c2]' : 'w-2 h-2 bg-gray-200 hover:bg-purple-200'}`}
                                aria-label={`Go to ${team[i].name}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={() => navigate('/team')}
                        className="sm:hidden inline-flex items-center gap-2 px-7 py-3 bg-gradient-to-r from-[#7a29c2] to-[#9333ea] text-white text-sm font-bold rounded-full shadow-lg shadow-purple-200"
                    >
                        <span className="material-symbols-outlined text-[17px]">groups</span>
                        Meet Our Team
                    </button>
                </div>

            </div>
        </section>
    );
};

export default TeamSection;
