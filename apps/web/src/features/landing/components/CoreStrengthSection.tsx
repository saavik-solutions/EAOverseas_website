import React, { useEffect, useRef, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatItem {
    icon: string;
    value: number;
    suffix: string;
    label: string;
    sublabel: string;
    color: string;
    glowColor: string;
}

interface PillarItem {
    icon: string;
    title: string;
    description: string;
    tag: string;
    tagColor: string;
    iconColor: string;
    iconBg: string;
    borderAccent: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS: StatItem[] = [
    {
        icon: 'rocket_launch',
        value: 3,
        suffix: '+',
        label: 'Years Active',
        sublabel: 'Since our launch',
        color: '#f59e0b',
        glowColor: 'rgba(245,158,11,0.25)',
    },
    {
        icon: 'school',
        value: 100,
        suffix: '+',
        label: 'Students Guided',
        sublabel: 'And growing daily',
        color: '#a855f7',
        glowColor: 'rgba(168,85,247,0.25)',
    },
    {
        icon: 'account_balance',
        value: 50,
        suffix: '+',
        label: 'University Partners',
        sublabel: 'Across 8+ countries',
        color: '#818cf8',
        glowColor: 'rgba(129,140,248,0.25)',
    },
    {
        icon: 'verified',
        value: 98,
        suffix: '%',
        label: 'Visa Approval Rate',
        sublabel: 'First-attempt success',
        color: '#34d399',
        glowColor: 'rgba(52,211,153,0.25)',
    },
];

const PILLARS: PillarItem[] = [
    {
        icon: 'support_agent',
        title: 'Expert Counsellors',
        description: 'Dedicated advisors guide every step — from shortlisting universities to final enrolment — with personalised one-on-one sessions.',
        tag: 'Guidance',
        tagColor: 'bg-purple-100 text-purple-700',
        iconColor: 'text-purple-600',
        iconBg: 'bg-purple-100',
        borderAccent: 'border-t-purple-400',
    },
    {
        icon: 'airplane_ticket',
        title: 'End-to-End Visa Support',
        description: 'Complete documentation, interview prep, and a 98% first-attempt visa approval rate across all major study destinations.',
        tag: 'Visa',
        tagColor: 'bg-indigo-100 text-indigo-700',
        iconColor: 'text-indigo-600',
        iconBg: 'bg-indigo-100',
        borderAccent: 'border-t-indigo-400',
    },
    {
        icon: 'workspace_premium',
        title: 'Scholarship Assistance',
        description: 'We identify, apply for, and negotiate merit-based scholarships — helping students unlock funding worth up to 100% of tuition.',
        tag: 'Funding',
        tagColor: 'bg-fuchsia-100 text-fuchsia-700',
        iconColor: 'text-fuchsia-600',
        iconBg: 'bg-fuchsia-100',
        borderAccent: 'border-t-fuchsia-400',
    },
    {
        icon: 'trending_up',
        title: 'Growing Track Record',
        description: 'A newly launched platform already delivering results — with early students achieving overseas education dreams across 8+ countries.',
        tag: 'Impact',
        tagColor: 'bg-amber-100 text-amber-700',
        iconColor: 'text-amber-600',
        iconBg: 'bg-amber-100',
        borderAccent: 'border-t-amber-400',
    },
    {
        icon: 'public',
        title: 'Growing University Network',
        description: '50+ partner universities across 8+ countries — expanding every month so every student finds their ideal academic destination.',
        tag: 'Network',
        tagColor: 'bg-teal-100 text-teal-700',
        iconColor: 'text-teal-600',
        iconBg: 'bg-teal-100',
        borderAccent: 'border-t-teal-400',
    },
    {
        icon: 'auto_awesome',
        title: 'AI-Powered Matching',
        description: 'Our intelligent platform analyses your profile, budget, and goals to instantly shortlist the best-fit universities for you.',
        tag: 'Technology',
        tagColor: 'bg-blue-100 text-blue-700',
        iconColor: 'text-blue-600',
        iconBg: 'bg-blue-100',
        borderAccent: 'border-t-blue-400',
    },
];

// ─── Animated Counter ─────────────────────────────────────────────────────────

const AnimatedCounter: React.FC<{ target: number; suffix: string; started: boolean }> = ({ target, suffix, started }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!started) return;
        let start = 0;
        const duration = 2000;
        const stepTime = 16;
        const steps = Math.floor(duration / stepTime);
        const increment = target / steps;
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(Math.floor(start));
        }, stepTime);
        return () => clearInterval(timer);
    }, [started, target]);

    const formatted = count >= 1000 ? `${(count / 1000).toFixed(0)}K` : `${count}`;
    return <span>{formatted}{suffix}</span>;
};

// ─── Main Component ───────────────────────────────────────────────────────────

const CoreStrengthSection: React.FC = () => {
    const statsRef = useRef<HTMLDivElement>(null);
    const [countersStarted, setCountersStarted] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setCountersStarted(true); observer.disconnect(); } },
            { threshold: 0.2 }
        );
        if (statsRef.current) observer.observe(statsRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="relative w-full py-24 overflow-hidden bg-transparent">
            {/* Ambient blobs */}
            <div className="absolute -top-48 -right-32 w-[640px] h-[640px] rounded-full blur-[120px] pointer-events-none z-0" style={{ background: 'radial-gradient(circle, rgba(122,41,194,0.08) 0%, transparent 70%)' }} />
            <div className="absolute -bottom-32 -left-20 w-[500px] h-[500px] rounded-full blur-[100px] pointer-events-none z-0" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)' }} />

            <div className="max-w-[1200px] mx-auto px-6 md:px-10 relative z-10 flex flex-col items-center gap-20">

                {/* ── Header ── */}
                <div className="text-center max-w-[700px] flex flex-col items-center gap-5">
                    <div className="inline-flex items-center gap-2 bg-[#7a29c2]/[0.08] border-[1.5px] border-[#7a29c2]/[0.18] text-[#7a29c2] text-xs font-bold tracking-[0.1em] uppercase py-1.5 px-4 rounded-full">
                        <span className="w-[7px] h-[7px] rounded-full bg-[#7a29c2] shrink-0 animate-pulse" />
                        Our Core Strength
                    </div>
                    <h2 className="text-[42px] md:text-[48px] max-sm:text-[28px] font-extrabold text-[#0d0d0d] leading-[1.12] tracking-tight m-0">
                        Why{' '}
                        <span className="bg-gradient-to-br from-[#9333ea] to-[#7a29c2] text-transparent bg-clip-text">
                            100+ Students
                        </span>{' '}
                        <br className="hidden sm:block" />
                        Choose EAOverseas
                    </h2>
                    <p className="text-[16px] text-gray-400 leading-relaxed max-w-[520px] m-0">
                        Fresh, focused, and results-driven — we combine AI-powered technology
                        with personalised expert guidance to make your overseas education dream a reality.
                    </p>
                </div>

                {/* ── Stats Band (Dark Card) ── */}
                <div
                    ref={statsRef}
                    className="w-full rounded-[2rem] overflow-hidden relative"
                    style={{
                        background: 'linear-gradient(135deg, #12082a 0%, #1a0a36 50%, #0f0820 100%)',
                        boxShadow: '0 32px 80px rgba(122,41,194,0.22), inset 0 1px 0 rgba(255,255,255,0.06)',
                    }}
                >
                    {/* Grid pattern overlay */}
                    <div
                        className="absolute inset-0 pointer-events-none z-0 opacity-[0.035]"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                        }}
                    />

                    <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/[0.07]">
                        {STATS.map((stat, i) => (
                            <div key={i} className="flex flex-col items-center gap-3 px-8 py-10 text-center group relative overflow-hidden">
                                {/* Glow blob on hover */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none blur-[60px]"
                                    style={{ background: stat.glowColor }}
                                />

                                {/* Icon ring */}
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center relative z-10 mb-1"
                                    style={{ background: `${stat.glowColor}`, border: `1.5px solid ${stat.color}30` }}
                                >
                                    <span
                                        className="material-symbols-outlined text-[28px]"
                                        style={{ color: stat.color }}
                                    >
                                        {stat.icon}
                                    </span>
                                </div>

                                {/* Number */}
                                <div
                                    className="text-[44px] max-sm:text-[34px] font-black leading-none tracking-tight relative z-10"
                                    style={{ color: stat.color, textShadow: `0 0 40px ${stat.glowColor}` }}
                                >
                                    <AnimatedCounter target={stat.value} suffix={stat.suffix} started={countersStarted} />
                                </div>

                                {/* Label */}
                                <div className="relative z-10">
                                    <div className="text-white text-[14px] font-bold leading-tight">{stat.label}</div>
                                    <div className="text-white/40 text-[11px] font-medium mt-0.5">{stat.sublabel}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Pillars Bento Grid ── */}
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {PILLARS.map((pillar, i) => (
                        <div
                            key={i}
                            className={`relative bg-white border border-gray-100 border-t-[3px] ${pillar.borderAccent} rounded-[20px] p-7 flex flex-col gap-4 shadow-sm hover:shadow-2xl hover:shadow-purple-100/60 hover:-translate-y-2 transition-all duration-300 group overflow-hidden cursor-default`}
                        >
                            {/* Corner radial glow */}
                            <div className="absolute -top-8 -right-8 w-[130px] h-[130px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(122,41,194,0.10), transparent 70%)' }} />

                            {/* Top row: icon + tag */}
                            <div className="flex items-start justify-between">
                                <div className={`w-[48px] h-[48px] rounded-xl flex items-center justify-center shrink-0 ${pillar.iconBg}`}>
                                    <span className={`material-symbols-outlined text-[24px] ${pillar.iconColor}`}>
                                        {pillar.icon}
                                    </span>
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${pillar.tagColor}`}>
                                    {pillar.tag}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-[16px] font-extrabold text-gray-900 m-0 leading-snug group-hover:text-[#7a29c2] transition-colors duration-200">
                                {pillar.title}
                            </h3>

                            {/* Description */}
                            <p className="text-[13.5px] text-gray-400 leading-relaxed m-0 flex-1">
                                {pillar.description}
                            </p>

                            {/* CTA arrow */}
                            <div className="flex items-center gap-1.5 text-[#7a29c2] text-[13px] font-bold opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 mt-1">
                                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                                Learn more
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default CoreStrengthSection;
