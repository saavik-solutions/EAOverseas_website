import React from 'react';
import { useNavigate } from 'react-router-dom';

import icon3dCareer from '@/assets/services/service_icon_career_1774048481739.webp';
import icon3dTest from '@/assets/services/service_icon_test_1774048515441.webp';
import icon3dApplication from '@/assets/services/service_icon_application_1774048527946.webp';
import icon3dVisa from '@/assets/services/service_icon_visa_1774049158836.webp';
import icon3dUniversity from '@/assets/services/service_icon_university.webp';
import icon3dSpecial from '@/assets/services/service_icon_special.webp';


// ─── Data ─────────────────────────────────────────────────────────────────────
const services = [
    {
        id: 'career',
        title: 'Career Guidance',
        subtitle: 'Personalised roadmap to your dream career',
        badge: 'Most Popular',
        badgeColor: 'bg-purple-100 text-purple-700',
        icon3d: icon3dCareer,
        gradient: 'from-purple-100 to-fuchsia-100',
        accentColor: 'text-purple-700',
        borderColor: 'border-purple-300',
        hoverGlow: 'hover:shadow-purple-200/60',
        stats: '5,000+ Guided',
        matSymbol: 'explore',
    },
    {
        id: 'test',
        title: 'Test Prep',
        subtitle: 'IELTS, TOEFL, GRE & SAT coaching',
        badge: 'High Success',
        badgeColor: 'bg-fuchsia-100 text-fuchsia-700',
        icon3d: icon3dTest,
        gradient: 'from-fuchsia-50 to-pink-50',
        accentColor: 'text-fuchsia-700',
        borderColor: 'border-fuchsia-200',
        hoverGlow: 'hover:shadow-fuchsia-200/60',
        stats: '98% Pass Rate',
        matSymbol: 'menu_book',
    },
    {
        id: 'application',
        title: 'Application & Admission Support',
        subtitle: 'End-to-end application management',
        badge: 'Expert Team',
        badgeColor: 'bg-violet-100 text-violet-700',
        icon3d: icon3dApplication,
        gradient: 'from-violet-50 to-purple-50',
        accentColor: 'text-violet-700',
        borderColor: 'border-violet-200',
        hoverGlow: 'hover:shadow-violet-200/60',
        stats: '10K+ Accepted',
        matSymbol: 'assignment_turned_in',
    },
    {
        id: 'university',
        title: 'University & Course Selection',
        subtitle: 'Match with 500+ top universities',
        badge: '500+ Partners',
        badgeColor: 'bg-indigo-100 text-indigo-700',
        icon3d: icon3dUniversity,
        gradient: 'from-indigo-50 to-violet-50',
        accentColor: 'text-indigo-700',
        borderColor: 'border-indigo-200',
        hoverGlow: 'hover:shadow-indigo-200/60',
        stats: '15+ Countries',
        matSymbol: 'school',
    },
    {
        id: 'visa',
        title: 'Scholarships & Visas',
        subtitle: '$40M+ in scholarships facilitated',
        badge: '98% Visa Rate',
        badgeColor: 'bg-emerald-100 text-emerald-700',
        icon3d: icon3dVisa,
        gradient: 'from-emerald-50 to-teal-50',
        accentColor: 'text-emerald-700',
        borderColor: 'border-emerald-200',
        hoverGlow: 'hover:shadow-emerald-200/60',
        stats: '$40M+ Secured',
        matSymbol: 'airplane_ticket',
    },
    {
        id: 'special',
        title: 'Special Services',
        subtitle: 'Housing, forex, insurance & more',
        badge: 'All-Inclusive',
        badgeColor: 'bg-amber-100 text-amber-700',
        icon3d: icon3dSpecial,
        gradient: 'from-amber-50 to-orange-50',
        accentColor: 'text-amber-700',
        borderColor: 'border-amber-200',
        hoverGlow: 'hover:shadow-amber-200/60',
        stats: '30+ Services',
        matSymbol: 'diamond',
    },
];

// ─── Component ─────────────────────────────────────────────────────────────────
const ServicesSection = () => {
    const navigate = useNavigate();
    return (
        <section className="w-full py-24 px-4 relative overflow-hidden bg-transparent">
            <div className="max-w-[1400px] mx-auto">

                {/* ── Section Header ── */}
                <div className="mb-16">
                    {/* Top: Badge + Heading */}
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-100/80 text-purple-700 font-bold text-sm rounded-full mb-5 border border-purple-200">
                                <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                                Services Provided
                            </div>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600">
                                    Overseas Education
                                </span>{' '}
                                Made<br className="hidden lg:block" /> Simple and Accessible
                            </h2>
                        </div>

                        {/* Right: Subtitle + Trust Badges */}
                        <div className="flex flex-col gap-5 max-w-md">
                            {/* Accent line + Subtitle */}
                            <div className="relative pl-5 border-l-4 border-[#7a29c2] rounded-sm">
                                <p className="text-base md:text-lg text-[#4d6599] leading-relaxed">
                                    From{' '}
                                    <span className="font-semibold text-[#7a29c2]">test prep</span> to{' '}
                                    <span className="font-semibold text-[#7a29c2]">education loans</span>,
                                    we simplify every step — so your journey abroad feels{' '}
                                    <span className="font-bold text-[#0e121b]">effortless.</span>
                                </p>
                            </div>

                            {/* Trust Stat Pills */}
                            <div className="flex flex-wrap gap-3">
                                {[
                                    { icon: 'group', label: '10,000+ Students Guided' },
                                    { icon: 'school', label: '500+ Universities' },
                                    { icon: 'verified', label: '98% Visa Success' },
                                ].map((stat, i) => (
                                    <div
                                        key={i}
                                        className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white border border-[#f3e8ff] rounded-full shadow-sm text-xs font-semibold text-[#0e121b] hover:border-[#7a29c2] hover:shadow-purple-100 transition-all duration-200"
                                    >
                                        <span className="material-symbols-outlined text-[#7a29c2] text-[14px]">{stat.icon}</span>
                                        {stat.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Gradient Divider */}
                    <div className="mt-10 h-px w-full bg-gradient-to-r from-[#7a29c2]/30 via-[#d8b4fe]/60 to-transparent rounded-full" />
                </div>

                {/* ── Service Cards Grid ── */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const ServiceCard = ({ service }) => {
    return (
        <div
            onClick={() => window.location.href = '/contact'}
            className={`
                group relative flex overflow-hidden rounded-[24px] border ${service.borderColor} border-opacity-40
                bg-gradient-to-br ${service.gradient}
                shadow-xl hover:shadow-2xl shadow-slate-200/50
                transition-all duration-500 cursor-pointer
                hover:-translate-y-1 p-6 sm:p-7 min-h-[220px] lg:min-h-[240px]
            `}
        >
            {/* ── Left Content Container (z-10 to stay above the icon) ── */}
            <div className="relative z-10 w-[60%] sm:w-[65%] flex flex-col h-full justify-between">
                
                {/* Top Row: Badge + Stats */}
                <div className="flex flex-col items-start gap-2 mb-4">
                    <span className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-sm ${service.badgeColor} ring-1 ring-white/50 backdrop-blur-sm whitespace-nowrap`}>
                        {service.badge}
                    </span>
                    <span className={`text-[12px] font-extrabold ${service.accentColor} opacity-90`}>
                        {service.stats}
                    </span>
                </div>

                {/* Text Content */}
                <div className="mb-6 flex-1 pr-2">
                    <h3 className="text-[17px] sm:text-[20px] font-extrabold text-slate-800 mb-2 leading-[1.2]">
                        {service.title}
                    </h3>
                    <p className="text-[12px] sm:text-[13px] text-slate-600 leading-relaxed font-medium line-clamp-2">
                        {service.subtitle}
                    </p>
                </div>

                {/* Call to action (Learn More + Arrow) */}
                <div className="flex items-center gap-2 mt-auto">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-white shadow-sm ${service.accentColor} group-hover:translate-x-1 transition-all duration-300`}>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </div>
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${service.accentColor} opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300`}>Learn More</span>
                </div>
            </div>

            {/* ── Right Asset Container (Icon) ── */}
            <div className="absolute top-1/2 right-[-10px] sm:right-0 -translate-y-1/2 w-32 h-32 sm:w-40 sm:h-40 z-0 flex items-center justify-center pointer-events-none transition-transform duration-500 group-hover:-translate-x-2">
                {service.icon3d ? (
                    <>
                        <div className={`absolute inset-0 rounded-full blur-[30px] opacity-20 mix-blend-multiply bg-current scale-50 group-hover:scale-100 transition-all duration-700 text-${service.accentColor.replace('text-', '')}`} />
                        <img
                            src={service.icon3d}
                            alt={service.title}
                            className="relative w-full h-full object-contain drop-shadow-2xl group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 z-10"
                        />
                    </>
                ) : (
                    <div className={`
                        w-24 h-24 rounded-full flex flex-col items-center justify-center
                        bg-white/40 backdrop-blur-md shadow-2xl border border-white/50
                        group-hover:scale-110 group-hover:rotate-12 transition-all duration-500
                    `}>
                        <span className={`material-symbols-outlined text-[48px] ${service.accentColor} drop-shadow-md`}>
                            {service.matSymbol}
                        </span>
                    </div>
                )}
            </div>

            {/* Hover glow orb */}
            <div className={`absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/40 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />
        </div>
    );
};

export default ServicesSection;
