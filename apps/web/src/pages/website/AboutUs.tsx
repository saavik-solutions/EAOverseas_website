import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/shared/contexts/AuthContext';
import blogDestinations from '@/features/landing/assets/blog_destinations.webp';
import blogIelts from '@/features/landing/assets/blog_ielts.webp';
import blogVisa from '@/features/landing/assets/blog_visa.webp';
import { SEOHead } from '@/components/common/SEOHead';

const Counter = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            // Ease out quart
            const easeOutQuart = 1 - Math.pow(1 - percentage, 4);

            setCount(Math.floor(easeOutQuart * end));

            if (progress < duration) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [isVisible, end, duration]);

    return <span ref={countRef}>{count.toLocaleString()}</span>;
};

const AboutUs = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleExplore = () => {
        window.location.href = 'https://student.eaoverseas.com';
    };

    const handleBrowseCourses = () => {
        window.location.href = 'https://student.eaoverseas.com';
    };

    useEffect(() => {
        // Tailwind config is already in the project, so we don't need the script tag
        // Material symbols are likely already imported in index.html, if not we might need to add them or use existing icons
    }, []);

    return (
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
            <SEOHead 
                title="About Us | EAOverseas"
                description="Learn about our mission to empower global scholars through data-driven insights and ethical guidance."
                image="/assets/student_story_hero.webp"
            />
            {/* Hero Section */}
                <section className="relative py-12 md:py-32 overflow-hidden">
                    {/* Hero Background Glow */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-purple-50/50 rounded-full blur-[120px] pointer-events-none -z-10"></div>
                    
                    <div className="grid lg:grid-cols-2 gap-12 md:gap-20 items-center">
                        <div className="flex flex-col gap-6 md:gap-8">
                            <div className="space-y-6 md:space-y-8">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100/50 text-[#7a29c2] text-xs font-bold tracking-widest uppercase">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7a29c2]"></span>
                                    </span>
                                    Empowering Global Scholars
                                </div>
                                <h1 className="text-4xl md:text-7xl font-[900] leading-[1.05] tracking-tight text-[#111418]">
                                    Shaping Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7a29c2] to-violet-600">Education</span> Decisions
                                </h1>
                                <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-[540px]">
                                    We are building a platform where students make informed study-abroad decisions backed by <span className="text-gray-900 font-semibold">real-world data</span> and <span className="text-gray-900 font-semibold">ethical guidance</span>.
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-4 mt-2">
                                <button onClick={handleExplore} className="bg-[#7a29c2] hover:bg-purple-700 text-white font-bold py-4 px-10 rounded-2xl shadow-xl shadow-purple-500/20 transition-all hover:-translate-y-1">
                                    Get Started
                                </button>
                                <button onClick={handleBrowseCourses} className="bg-white hover:bg-gray-50 text-gray-900 font-bold py-4 px-10 rounded-2xl border border-gray-200 transition-all">
                                    Browse Courses
                                </button>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="aspect-[4/5] md:aspect-[4/3] bg-gray-100 rounded-[3rem] overflow-hidden relative shadow-2xl">
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2940&auto=format&fit=crop')" }}></div>
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#7a29c2]/20 to-transparent"></div>
                            </div>
                            {/* Floating Stats Card */}
                            <div className="absolute -bottom-8 -left-6 md:-bottom-12 md:-left-12 bg-white/90 backdrop-blur-2xl p-6 md:p-10 rounded-[2rem] shadow-2xl border border-white/50 max-w-[220px] md:max-w-[300px] animate-float">
                                <p className="text-[#7a29c2] text-[10px] md:text-xs font-black tracking-[0.2em] uppercase mb-2 md:mb-3">Our Core Promise</p>
                                <p className="text-lg md:text-2xl font-black text-[#111418] leading-tight">
                                    Quality education for every student.
                                </p>
                                <div className="mt-4 flex -space-x-2">
                                    {[1,2,3,4].map(i => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                                            <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                                        </div>
                                    ))}
                                    <div className="w-8 h-8 rounded-full border-2 border-white bg-[#7a29c2] flex items-center justify-center text-[10px] text-white font-bold">+10k</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Who We Are - Modernized Redesign */}
                <section className="py-20 md:py-32 relative overflow-hidden">
                    {/* Decorative Background Elements */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[1200px] pointer-events-none opacity-30">
                        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-400 rounded-full blur-[150px] animate-pulse"></div>
                        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-400 rounded-full blur-[180px] animate-pulse" style={{ animationDelay: '1s' }}></div>
                    </div>
 
                    <div className="relative z-10 space-y-16 md:space-y-24">
                        <div className="text-center max-w-4xl mx-auto space-y-8">
                            <h2 className="text-[#7a29c2] font-[800] tracking-[0.3em] uppercase text-xs md:text-sm">The Foundation</h2>
                            <h3 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.05]">
                                We Bridge the Gap Between <span className="text-[#7a29c2]">Ambition</span> and <span className="text-violet-600">Reality</span>
                            </h3>
                            <p className="text-xl md:text-3xl text-gray-700 font-medium leading-relaxed italic border-l-4 border-[#7a29c2] pl-8 py-2 inline-block text-left">
                                "EAOverseas is more than a platform; it's a commitment to clarity in global education."
                            </p>
                        </div>
 
                        {/* Core Pillars Grid */}
                        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                            {[
                                {
                                    icon: 'analytics',
                                    title: 'Data-Driven Insights',
                                    desc: 'Verified global education data guiding every step of your international journey.',
                                    gradient: 'from-blue-500 to-cyan-400'
                                },
                                {
                                    icon: 'verified_user',
                                    title: 'Ethical Guidance',
                                    desc: 'A curriculum built around integrity, putting your long-term success above all else.',
                                    gradient: 'from-indigo-500 to-purple-400'
                                },
                                {
                                    icon: 'auto_awesome',
                                    title: 'Modern Technology',
                                    desc: 'Advanced tools designed for absolute transparency and simplified applications.',
                                    gradient: 'from-blue-600 to-indigo-500'
                                }
                            ].map((pillar, idx) => (
                                <div key={idx} className="group relative bg-white/60 backdrop-blur-3xl border border-white/50 p-12 rounded-[2.5rem] shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all duration-700">
                                    <div className={`w-16 h-16 bg-gradient-to-br ${pillar.gradient} text-white rounded-[1.5rem] flex items-center justify-center mb-8 shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-all duration-500`}>
                                        <span className="material-symbols-outlined text-3xl">{pillar.icon}</span>
                                    </div>
                                    <h4 className="text-2xl font-black text-gray-900 mb-4">{pillar.title}</h4>
                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        {pillar.desc}
                                    </p>
                                    <div className="mt-8 h-1 w-0 group-hover:w-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-700 rounded-full"></div>
                                </div>
                            ))}
                        </div>
 
                        <div className="max-w-4xl mx-auto text-center bg-white/40 backdrop-blur-xl p-8 rounded-3xl border border-white/50">
                            <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
                                We believe in a world where international education is accessible, transparent, and built on a foundation of <strong>absolute trust</strong>.
                            </p>
                        </div>
                    </div>
                </section>
 
                {/* Our Process - Step-by-Step Modernized */}
                <section className="py-24 md:py-40 bg-gray-900 rounded-[3rem] md:rounded-[4rem] px-8 md:px-16 my-12 md:my-20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[150px]"></div>
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-500 rounded-full blur-[180px]"></div>
                    </div>
 
                    <div className="relative z-10 space-y-20 md:space-y-32">
                        <div className="text-center space-y-6">
                            <h2 className="text-purple-400 font-black tracking-widest uppercase text-xs md:text-sm">The Roadmap</h2>
                            <h3 className="text-3xl md:text-6xl font-black text-white">Your 5-Step Path to <span className="text-purple-400 underline decoration-violet-500 decoration-4 underline-offset-8">Global Success</span></h3>
                        </div>
 
                        <div className="grid md:grid-cols-5 gap-0 relative">
                            {/* Desktop Connecting Line */}
                            <div className="hidden md:block absolute top-[60px] left-0 w-full h-[2px] bg-gradient-to-r from-blue-600/10 via-blue-500 to-indigo-600/10 -z-10"></div>
 
                            {[
                                { step: 1, title: 'Identity', desc: 'Understanding your unique potential and goals.', icon: 'person_search' },
                                { step: 2, title: 'Mastery', desc: 'Expert training for global entrance exams.', icon: 'auto_stories' },
                                { step: 3, title: 'Strategic Fit', desc: 'Shortlisting the perfect global universities.', icon: 'account_balance' },
                                { step: 4, title: 'Seamless Sync', desc: 'Flawless documentation and visa processing.', icon: 'assignment_turned_in' },
                                { step: 5, title: 'Inauguration', desc: 'Pre-departure briefing and global arrival.', icon: 'flight_takeoff' }
                            ].map((item, index) => (
                                <div key={index} className="group relative flex flex-col items-center text-center px-4 mb-20 md:mb-0 transition-all duration-500 hover:scale-105">
                                    <div className="w-24 h-24 rounded-[2rem] bg-gray-800 border-2 border-blue-500/50 flex flex-col items-center justify-center text-white relative shadow-2xl group-hover:bg-blue-600 group-hover:border-blue-400 transition-all duration-500">
                                        <span className="material-symbols-outlined text-4xl mb-1">{item.icon}</span>
                                        <span className="text-xs font-black text-blue-400 group-hover:text-white">STEP 0{item.step}</span>
                                        {/* Mobile Connecting Line */}
                                        <div className="md:hidden absolute -bottom-10 left-1/2 -translate-x-1/2 w-[2px] h-8 bg-blue-500/20"></div>
                                    </div>
                                    <div className="mt-8 space-y-4">
                                        <h4 className="font-black text-white text-xl md:text-2xl">{item.title}</h4>
                                        <p className="text-gray-400 text-sm md:text-base leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Our Impact - Sophisticated Counter Strip */}
                <section className="py-12 md:py-20 relative px-4 md:px-0">
                    <div className="absolute inset-0 bg-[#7a29c2] rounded-[2.5rem] md:rounded-[4rem] -rotate-1 scale-[1.02] opacity-5"></div>
                    <div className="relative bg-white text-[#111418] rounded-[2.5rem] md:rounded-[4rem] shadow-2xl border border-gray-100 overflow-hidden px-8 md:px-16 py-12 md:py-20">
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-50/50 to-transparent"></div>
                        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 items-center">
                            {[
                                { count: 10000, suffix: '+', label: 'Global Scholars', color: 'text-[#7a29c2]' },
                                { count: 500, suffix: '+', label: 'Partner Institutions', color: 'text-violet-600' },
                                { count: 25, suffix: '+', label: 'Study Destinations', color: 'text-purple-500' },
                                { count: 98, suffix: '%', label: 'Success Rate', color: 'text-violet-500' }
                            ].map((item, index) => (
                                <div key={index} className="flex flex-col items-center group">
                                    <div className={`text-4xl md:text-6xl font-[950] ${item.color} mb-3 flex items-center group-hover:scale-110 transition-transform duration-500`}>
                                        <Counter end={item.count} duration={2500} />
                                        <span className="text-2xl md:text-4xl ml-1">{item.suffix}</span>
                                    </div>
                                    <div className="text-gray-400 font-[800] text-xs md:text-sm tracking-[0.2em] uppercase text-center">{item.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Students Choose Us - High-End Redesign */}
                <section className="py-24 md:py-40 relative px-4 md:px-0">
                    <div className="grid lg:grid-cols-12 gap-16 md:gap-24 items-center">
                        <div className="lg:col-span-7 space-y-16">
                            <div className="space-y-6">
                                <h2 className="text-[#7a29c2] font-[800] tracking-[0.3em] uppercase text-xs md:text-sm">The Philosophy</h2>
                                <h3 className="text-4xl md:text-7xl font-black text-gray-900 leading-[1.05]">
                                    Why Scholars Trust <span className="text-[#7a29c2]">EAOverseas</span>
                                </h3>
                                <p className="text-xl text-gray-600 max-w-2xl leading-relaxed font-medium">
                                    Our methodology is defined by <span className="text-gray-900">academic rigor</span> and <span className="text-gray-900">modern transparency</span>. We don't just process files; we architect global careers.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-8">
                                {[
                                    {
                                        icon: 'lightbulb',
                                        title: 'Clarity Over Complexity',
                                        desc: 'We translate the daunting global education landscape into a clear, actionable roadmap.',
                                        color: 'bg-blue-50 text-blue-600'
                                    },
                                    {
                                        icon: 'psychology',
                                        title: 'Profile-First Strategy',
                                        desc: 'Your unique potential dictates our strategy. We build paths around humans, not numbers.',
                                        color: 'bg-indigo-50 text-indigo-600'
                                    },
                                    {
                                        icon: 'public',
                                        title: 'Limitless Network',
                                        desc: 'Direct access to 500+ elite universities across 25+ global study destinations.',
                                        color: 'bg-cyan-50 text-cyan-600'
                                    },
                                    {
                                        icon: 'gavel',
                                        title: 'Unbiased Integrity',
                                        desc: 'Transparent counseling that fiercely prioritizes your long-term academic interests.',
                                        color: 'bg-blue-50 text-blue-600'
                                    }
                                ].map((item, index) => (
                                    <div key={index} className="group relative p-10 bg-white border border-gray-100 rounded-[2rem] hover:shadow-2xl hover:border-blue-100 transition-all duration-500">
                                        <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300`}>
                                            <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                                        </div>
                                        <h4 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h4>
                                        <p className="text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side: Creative Visuals */}
                        <div className="lg:col-span-5 relative">
                            {/* Decorative base shape */}
                            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-50 rounded-full blur-[80px] -z-10"></div>

                            <div className="relative z-10">
                                {/* Main Image Card */}
                                <div className="aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl transition-transform duration-700">
                                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-110 rounded-[4rem]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2940&auto=format&fit=crop')" }}></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-[4rem]"></div>
                                </div>

                                {/* Floating Glass Card */}
                                <div className="absolute -bottom-6 -left-8 bg-white/80 backdrop-blur-xl p-5 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl border border-white/50 max-w-[200px] md:max-w-[240px] hidden md:block animate-float">
                                    <div className="flex gap-0.5 mb-2">
                                        {[1, 2, 3, 4, 5].map(i => (
                                            <span key={i} className="material-symbols-outlined text-yellow-400 text-xs md:text-sm fill-current">star</span>
                                        ))}
                                    </div>
                                    <p className="text-gray-900 font-bold text-base mb-1">"Life Changing Experience"</p>
                                    <p className="text-gray-500 text-[10px] md:text-xs leading-relaxed">Trusted by over 10,000 students worldwide to fulfill their academic dreams.</p>
                                </div>

                                {/* Floating Badge */}
                                <div className="absolute top-4 -right-6 w-16 h-16 md:w-20 md:h-20 bg-blue-600 rounded-full flex flex-col items-center justify-center text-white shadow-xl hover:scale-110 transition-transform duration-300 cursor-default">
                                    <span className="text-base md:text-xl font-black leading-none">95%</span>
                                    <span className="text-[8px] md:text-[10px] font-bold uppercase tracking-tighter">Success</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission & Vision - High Impact */}
                <section className="py-20 md:py-32 grid md:grid-cols-2 gap-10 md:gap-16 px-4 md:px-0">
                    <div className="group relative bg-[#0f172a] p-12 md:p-20 rounded-[3rem] overflow-hidden shadow-2xl hover:-translate-y-4 transition-all duration-700">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/20 rounded-full blur-[100px]"></div>
                        <div className="relative z-10 space-y-8">
                            <div className="w-16 h-16 bg-[#7a29c2] text-white rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                                <span className="material-symbols-outlined text-4xl">rocket_launch</span>
                            </div>
                            <h3 className="text-3xl md:text-5xl font-black text-white">Our Mission</h3>
                            <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-medium">
                                To democratize access to global education by providing transparent, expert-led, and highly personalized guidance that empowers every student to reach their maximum global potential.
                            </p>
                        </div>
                    </div>
                    <div className="group relative bg-white p-12 md:p-20 rounded-[3rem] border border-gray-100 shadow-xl hover:-translate-y-4 transition-all duration-700">
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-violet-50 rounded-full blur-[100px]"></div>
                        <div className="relative z-10 space-y-8">
                            <div className="w-16 h-16 bg-purple-50 text-[#7a29c2] rounded-2xl flex items-center justify-center group-hover:-rotate-12 transition-transform">
                                <span className="material-symbols-outlined text-4xl">visibility</span>
                            </div>
                            <h3 className="text-3xl md:text-5xl font-black text-gray-900">Our Vision</h3>
                            <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-medium">
                                To become the world's most trusted partner for international student mobility, where innovation and human empathy combine to bridge local talent with global legacies.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Our Initiatives - Blogs */}
                <section className="py-24 md:py-40 px-4 md:px-0">
                    <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20 md:mb-24">
                        <div className="space-y-6 max-w-2xl">
                            <h2 className="text-[#7a29c2] font-[800] tracking-[0.3em] uppercase text-xs md:text-sm">Knowledge Hub</h2>
                            <h3 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">Insights from our <span className="text-[#7a29c2] underline underline-offset-8">Global Experts</span></h3>
                            <p className="text-xl text-gray-600 leading-relaxed font-medium">
                                Stay ahead of the curve with the latest global education trends, ethical insights, and comprehensive guides curated by the EAOverseas team.
                            </p>
                        </div>
                        <button onClick={() => navigate('/blogs')} className="group flex items-center gap-3 text-[#7a29c2] font-black text-lg hover:gap-5 transition-all">
                            View All Insights
                            <span className="material-symbols-outlined font-black">arrow_forward</span>
                        </button>
                    </div>
 
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
                        {[
                            {
                                id: 1,
                                img: blogDestinations,
                                title: 'Top 10 Global Destinantions 2026',
                                category: 'TRENDS',
                                desc: 'An analytical deep-dive into the most vibrant and emerging student cities for the upcoming cycle.'
                            },
                            {
                                id: 2,
                                img: blogIelts,
                                title: 'The Ethics of Language Proficiency',
                                category: 'GUIDANCE',
                                desc: 'Beyond scores: How to master IELTS with a focus on long-term academic communication excellence.'
                            },
                            {
                                id: 3,
                                img: blogVisa,
                                title: 'Decoding Multi-National Visa Policies',
                                category: 'REGULATIONS',
                                desc: 'A strategic guide to navigating the complex landscape of international student visa regulations.'
                            }
                        ].map((item, index) => (
                            <div
                                key={index}
                                onClick={() => navigate(`/blogs/${item.id}`)}
                                className="group cursor-pointer space-y-8"
                            >
                                <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-xl">
                                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                    <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-black tracking-widest text-[#0f172a] shadow-lg">
                                        {item.category}
                                    </div>
                                </div>
                                <div className="space-y-4 px-2">
                                    <h3 className="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors duration-300 leading-tight">{item.title}</h3>
                                    <p className="text-gray-500 leading-relaxed text-lg font-medium">{item.desc}</p>
                                    <div className="pt-2">
                                        <span className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm border-b-2 border-transparent group-hover:border-blue-600 transition-all py-1">
                                            Read Full Insight
                                            <span className="material-symbols-outlined text-sm">north_east</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

        </div>
    );
};

export default AboutUs;


