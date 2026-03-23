import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/logo.png';

// ─── Data ────────────────────────────────────────────────────────────────────

const LEVELS = ['Undergraduate', 'Postgraduate', 'Diploma', 'PhD / Doctoral', 'Foundation'];

const FIELDS = [
    'Computer Science & IT',
    'Business & Management',
    'Engineering',
    'Medicine & Health',
    'Architecture & Design',
    'Law',
    'Education',
    'Arts & Humanities',
    'Social Sciences',
    'Natural Sciences',
];

const COUNTRIES = [
    'United States', 'United Kingdom', 'Canada', 'Australia',
    'Germany', 'New Zealand', 'Ireland', 'Singapore',
];

const BUDGETS = ['Under ₹10L/yr', '₹10L – ₹20L/yr', '₹20L – ₹35L/yr', 'Above ₹35L/yr'];
const DURATIONS = ['1 Year', '2 Years', '3 Years', '4 Years', '5+ Years'];

// ─── Course Fields (all categories) ─────────────────────────────────────────

const allCourseFields = [
    { title: 'Computer Science & IT', field: 'Computer Science & IT', specs: 18, courses: 12400, icon: 'computer', color: 'text-purple-600' },
    { title: 'Business & Management', field: 'Business & Management', specs: 14, courses: 9820, icon: 'business_center', color: 'text-fuchsia-600' },
    { title: 'Engineering', field: 'Engineering', specs: 22, courses: 11300, icon: 'engineering', color: 'text-indigo-600' },
    { title: 'Medicine & Health', field: 'Medicine & Health', specs: 11, courses: 5711, icon: 'medical_services', color: 'text-pink-600' },
    { title: 'Architecture & Design', field: 'Architecture & Design', specs: 2, courses: 1391, icon: 'architecture', color: 'text-violet-600' },
    { title: 'Law', field: 'Law', specs: 1, courses: 1088, icon: 'gavel', color: 'text-rose-600' },
    { title: 'Education', field: 'Education', specs: 3, courses: 4371, icon: 'school', color: 'text-sky-600' },
    { title: 'Arts & Humanities', field: 'Arts & Humanities', specs: 7, courses: 3200, icon: 'palette', color: 'text-amber-600' },
];

// Career goals → field mapping
const careerGoalCards = [
    { title: 'Software Developer', field: 'Computer Science & IT', specs: 6, courses: 3400, icon: 'code', color: 'text-purple-600' },
    { title: 'Data Scientist', field: 'Computer Science & IT', specs: 4, courses: 1800, icon: 'analytics', color: 'text-fuchsia-600' },
    { title: 'MBA / Entrepreneur', field: 'Business & Management', specs: 5, courses: 2600, icon: 'trending_up', color: 'text-indigo-600' },
    { title: 'Doctor / Surgeon', field: 'Medicine & Health', specs: 3, courses: 890, icon: 'stethoscope', color: 'text-pink-600' },
    { title: 'Civil Engineer', field: 'Engineering', specs: 7, courses: 2100, icon: 'construction', color: 'text-violet-600' },
    { title: 'Lawyer / Advocate', field: 'Law', specs: 2, courses: 740, icon: 'balance', color: 'text-rose-600' },
    { title: 'UX / Product Designer', field: 'Architecture & Design', specs: 3, courses: 980, icon: 'design_services', color: 'text-sky-600' },
    { title: 'Educator / Researcher', field: 'Education', specs: 4, courses: 1200, icon: 'person_book', color: 'text-amber-600' },
];

// Destination cards
const destinationCards = [
    { title: 'United States', country: 'United States', courses: 28000, unis: 320, icon: '🇺🇸', color: 'text-purple-600', badge: '#1 Destination' },
    { title: 'United Kingdom', country: 'United Kingdom', courses: 21000, unis: 160, icon: '🇬🇧', color: 'text-fuchsia-600', badge: 'Oxford & More' },
    { title: 'Canada', country: 'Canada', courses: 12000, unis: 98, icon: '🇨🇦', color: 'text-indigo-600', badge: 'PR Friendly' },
    { title: 'Australia', country: 'Australia', courses: 15000, unis: 112, icon: '🇦🇺', color: 'text-pink-600', badge: 'Post-Study Visa' },
    { title: 'Germany', country: 'Germany', courses: 9200, unis: 74, icon: '🇩🇪', color: 'text-violet-600', badge: 'Low Tuition' },
    { title: 'New Zealand', country: 'New Zealand', courses: 4800, unis: 38, icon: '🇳🇿', color: 'text-sky-600', badge: 'Safe & Beautiful' },
    { title: 'Ireland', country: 'Ireland', courses: 5600, unis: 45, icon: '🇮🇪', color: 'text-emerald-600', badge: 'Tech Hub' },
    { title: 'Singapore', country: 'Singapore', courses: 3900, unis: 30, icon: '🇸🇬', color: 'text-rose-600', badge: 'Asia Gateway' },
];

// ─── Universities ────────────────────────────────────────────────────────────

const allUniversities = [
    { id: 'mit', name: 'MIT', location: 'Cambridge, USA', country: 'United States', rankNum: 1, rank: '#1 Global', tuition: '$57,000/yr', acceptRate: '4%', courses: 2800, scholarships: true, type: 'Research', img: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800' },
    { id: 'stanford', name: 'Stanford University', location: 'Stanford, USA', country: 'United States', rankNum: 3, rank: '#3 Global', tuition: '$56,000/yr', acceptRate: '4%', courses: 3100, scholarships: true, type: 'Research', img: 'https://images.unsplash.com/photo-1510526339031-6e8dd1219b6d?q=80&w=800' },
    { id: 'oxford', name: 'University of Oxford', location: 'Oxford, UK', country: 'United Kingdom', rankNum: 4, rank: '#4 Global', tuition: '£28,000/yr', acceptRate: '17%', courses: 4200, scholarships: true, type: 'Research', img: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?q=80&w=800' },
    { id: 'nus', name: 'NUS Singapore', location: 'Singapore', country: 'Singapore', rankNum: 8, rank: '#8 Global', tuition: 'S$35,000/yr', acceptRate: '10%', courses: 2200, scholarships: true, type: 'Research', img: 'https://images.unsplash.com/photo-1563290243-7f7229e377f0?q=80&w=800' },
    { id: 'toronto', name: 'University of Toronto', location: 'Toronto, Canada', country: 'Canada', rankNum: 21, rank: '#21 Global', tuition: 'CA$45,000/yr', acceptRate: '43%', courses: 3800, scholarships: true, type: 'Public', img: 'https://images.unsplash.com/photo-1549700478-2cef2a1abe34?q=80&w=800' },
    { id: 'melbourne', name: 'University of Melbourne', location: 'Melbourne, Australia', country: 'Australia', rankNum: 32, rank: '#32 Global', tuition: 'A$40,000/yr', acceptRate: '52%', courses: 3300, scholarships: true, type: 'Public', img: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=800' },
    { id: 'tum', name: 'TU Munich', location: 'Munich, Germany', country: 'Germany', rankNum: 37, rank: '#37 Global', tuition: '€0 / Low fees', acceptRate: '38%', courses: 1900, scholarships: false, type: 'Technical', img: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800' },
    { id: 'ubc', name: 'UBC Vancouver', location: 'Vancouver, Canada', country: 'Canada', rankNum: 40, rank: '#40 Global', tuition: 'CA$38,000/yr', acceptRate: '52%', courses: 2900, scholarships: true, type: 'Public', img: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&q=80&w=800' },
    { id: 'sydney', name: 'University of Sydney', location: 'Sydney, Australia', country: 'Australia', rankNum: 42, rank: '#42 Global', tuition: 'A$42,000/yr', acceptRate: '60%', courses: 3100, scholarships: true, type: 'Public', img: 'https://images.unsplash.com/photo-1494587351196-bbf5f29cff42?auto=format&fit=crop&q=80&w=800' },
    { id: 'ucl', name: 'University College London', location: 'London, UK', country: 'United Kingdom', rankNum: 9, rank: '#9 Global', tuition: '£30,000/yr', acceptRate: '63%', courses: 3600, scholarships: true, type: 'Research', img: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=800' },
    { id: 'trinity', name: 'Trinity College Dublin', location: 'Dublin, Ireland', country: 'Ireland', rankNum: 81, rank: '#81 Global', tuition: '€18,000/yr', acceptRate: '40%', courses: 1600, scholarships: false, type: 'Public', img: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=800' },
    { id: 'auckland', name: 'University of Auckland', location: 'Auckland, New Zealand', country: 'New Zealand', rankNum: 65, rank: '#65 Global', tuition: 'NZ$32,000/yr', acceptRate: '55%', courses: 2100, scholarships: true, type: 'Public', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800' },
];

// ─── Component ───────────────────────────────────────────────────────────────

const IntelligentSearchSection = () => {
    const navigate = useNavigate();

    // Global filter state
    const [selectedLevel, setSelectedLevel] = useState('');
    const [selectedField, setSelectedField] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');

    // Course tab
    const [activeCourseTab, setActiveCourseTab] = useState<'field' | 'career' | 'destination'>('field');
    // University tab
    const [activeUniTab, setActiveUniTab] = useState<'ranking' | 'location'>('ranking');
    // University search
    const [uniSearch, setUniSearch] = useState('');
    // Compare mode
    const [compareList, setCompareList] = useState<string[]>([]);
    const [compareMode, setCompareMode] = useState(false);

    const toggleCompare = (id: string) => {
        setCompareList(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : prev.length < 2 ? [...prev, id] : prev
        );
    };

    const handleCompareNavigate = () => {
        const unis = compareList.join(',');
        navigate(`/courses?compare=${unis}`);
    };

    // Build query string helper
    const buildQuery = (extra: Record<string, string> = {}) => {
        const params = new URLSearchParams();
        if (selectedLevel) params.set('level', selectedLevel);
        if (selectedField) params.set('field', selectedField);
        if (selectedCountry) params.set('country', selectedCountry);
        Object.entries(extra).forEach(([k, v]) => { if (v) params.set(k, v); });
        const qs = params.toString();
        return `/courses${qs ? `?${qs}` : ''}`;
    };

    const handleFindCourses = () => navigate('/contact');
    const handleCardClick = (extra: Record<string, string>) => navigate('/contact');

    // Course cards depend on active tab
    const courseCards =
        activeCourseTab === 'field' ? allCourseFields :
        activeCourseTab === 'career' ? careerGoalCards :
        destinationCards;

    // Universities: filter by country + search, then sort
    const filteredUniversities = allUniversities
        .filter(u => selectedCountry ? u.country === selectedCountry : true)
        .filter(u => uniSearch ? u.name.toLowerCase().includes(uniSearch.toLowerCase()) || u.location.toLowerCase().includes(uniSearch.toLowerCase()) : true)
        .sort((a, b) => activeUniTab === 'ranking' ? a.rankNum - b.rankNum : a.country.localeCompare(b.country));

    // Group by country for location tab
    const groupedByCountry = filteredUniversities.reduce((acc, u) => {
        if (!acc[u.country]) acc[u.country] = [];
        acc[u.country].push(u);
        return acc;
    }, {} as Record<string, typeof allUniversities>);

    return (
        <section className="w-full py-20 px-4 relative overflow-hidden" style={{ backgroundColor: 'transparent' }}>
            <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col items-center">

                {/* ── Hero Heading ── */}
                <div className="text-center w-full max-w-4xl mx-auto mb-14 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none"></div>
                    <div className="inline-block px-6 py-2 bg-gradient-to-r from-purple-50 to-fuchsia-50 text-purple-700 font-black text-[10px] uppercase tracking-[0.2em] rounded-full mb-8 border border-purple-200/50 shadow-sm">
                        GLOBAL OPPORTUNITIES
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-800 leading-[1.1] mb-10 tracking-tight">
                        Transform Your Future with{' '}
                        <br className="hidden lg:block" />
                        <span className="relative inline-block">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600">EAOverseas</span>
                            <div className="absolute -bottom-2 left-0 w-full h-1.5 bg-gradient-to-r from-purple-600/20 to-fuchsia-600/20 rounded-full blur-[2px]"></div>
                        </span>
                        <span className="block mt-4 text-xl md:text-2xl font-semibold text-slate-500 max-w-2xl mx-auto leading-relaxed">
                            Expert guidance perfectly aligned with your unique{' '}
                            <span className="text-purple-600">Academic Aspirations</span>
                        </span>
                    </h2>

                    {/* ── Filter Bar ── */}
                    <div className="bg-white/80 backdrop-blur-md border border-purple-100 rounded-2xl p-4 md:p-6 shadow-lg shadow-purple-50">
                        <div className="flex flex-col sm:flex-row flex-wrap gap-3 items-stretch sm:items-center justify-center">

                            {/* Level */}
                            <div className="relative flex-1 min-w-[160px]">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 text-[20px]">school</span>
                                <select
                                    value={selectedLevel}
                                    onChange={e => setSelectedLevel(e.target.value)}
                                    className="w-full appearance-none pl-10 pr-8 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all cursor-pointer hover:border-purple-300"
                                >
                                    <option value="">Select level of study</option>
                                    {LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                                </select>
                                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[18px]">expand_more</span>
                            </div>

                            {/* Field */}
                            <div className="relative flex-1 min-w-[160px]">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 text-[20px]">menu_book</span>
                                <select
                                    value={selectedField}
                                    onChange={e => setSelectedField(e.target.value)}
                                    className="w-full appearance-none pl-10 pr-8 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all cursor-pointer hover:border-purple-300"
                                >
                                    <option value="">Select field of study</option>
                                    {FIELDS.map(f => <option key={f} value={f}>{f}</option>)}
                                </select>
                                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[18px]">expand_more</span>
                            </div>

                            {/* Country */}
                            <div className="relative flex-1 min-w-[160px]">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 text-[20px]">public</span>
                                <select
                                    value={selectedCountry}
                                    onChange={e => setSelectedCountry(e.target.value)}
                                    className="w-full appearance-none pl-10 pr-8 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all cursor-pointer hover:border-purple-300"
                                >
                                    <option value="">Select Country</option>
                                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[18px]">expand_more</span>
                            </div>

                            {/* Find Button */}
                            <button
                                onClick={() => navigate('/contact')}
                                className="flex-shrink-0 px-8 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-200 hover:shadow-purple-300 hover:-translate-y-0.5"
                            >
                                Find Courses
                                <span className="material-symbols-outlined font-bold text-[20px]">search</span>
                            </button>
                        </div>

                        {/* Quick Filter Pills */}
                        <div className="mt-4 flex flex-wrap gap-2 justify-center">
                            {[
                                { label: 'Study in USA', extra: { country: 'United States' } },
                                { label: 'Study in UK', extra: { country: 'United Kingdom' } },
                                { label: 'MBA Programs', extra: { field: 'Business & Management', level: 'Postgraduate' } },
                                { label: 'Computer Science', extra: { field: 'Computer Science & IT' } },
                                { label: 'Scholarships', extra: { scholarship: 'true' } },
                                { label: 'PhD / Research', extra: { level: 'PhD / Doctoral' } },
                            ].map((pill, i) => (
                                <button
                                    key={i}
                                    onClick={() => navigate('/contact')}
                                    className="px-3.5 py-1.5 text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 rounded-full hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all duration-200"
                                >
                                    {pill.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Courses Discovery ── */}
                <div className="w-full mb-20">
                    {/* Header + Tabs */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3 flex-shrink-0">
                            Discover courses by
                            <svg width="36" height="22" viewBox="0 0 54 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-500 mt-1">
                                <path d="M2.5 12.5C14.5 -1.5 35.5 -3.5 50.5 18M50.5 18L38 18M50.5 18C48 10 49 28.5 44.5 33.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </h3>

                        <div className="flex flex-wrap gap-3">
                            {([
                                { key: 'field', icon: 'menu_book', label: 'Field of Study' },
                                { key: 'career', icon: 'work', label: 'Career Goal' },
                                { key: 'destination', icon: 'flight_takeoff', label: 'Destination' },
                            ] as const).map(tab => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveCourseTab(tab.key)}
                                    className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2.5 text-sm transition-all border ${
                                        activeCourseTab === tab.key
                                            ? 'bg-[#f3e8ff] text-[#7a29c2] border-[#d8b4fe] shadow-sm'
                                            : 'bg-white text-slate-500 border-slate-200 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200'
                                    }`}
                                >
                                    <span className={`material-symbols-outlined text-[18px] ${activeCourseTab === tab.key ? 'text-[#7a29c2]' : 'text-slate-400'}`}>{tab.icon}</span>
                                    <div className="text-left leading-tight">
                                        <span className="block text-[10px] font-normal opacity-70">Search by</span>
                                        {tab.label}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Course / Destination Cards Grid */}
                    {activeCourseTab === 'destination' ? (
                        /* Destination grid – emoji-based */
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {(destinationCards as typeof destinationCards).map((card, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => handleCardClick({ country: card.country })}
                                    className="cursor-pointer bg-white rounded-2xl border border-purple-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-purple-100 transition-all group flex flex-col hover:-translate-y-1"
                                >
                                    <div className="p-6 bg-gradient-to-br from-purple-50/60 to-fuchsia-50/60 flex flex-col items-center justify-center text-center flex-1 transition-colors group-hover:from-purple-50 group-hover:to-fuchsia-50">
                                        <span className="text-5xl mb-3">{card.icon}</span>
                                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${card.color} bg-white/80 border border-purple-100 mb-2`}>{card.badge}</span>
                                        <h4 className="font-bold text-slate-800 text-base">{card.title}</h4>
                                    </div>
                                    <div className="p-4 border-t border-slate-100 bg-white">
                                        <div className="flex gap-2 mb-3">
                                            <div className="flex-1 bg-slate-50 rounded-lg p-2 text-center">
                                                <div className="font-bold text-slate-800 text-sm">{card.unis}</div>
                                                <div className="text-[10px] text-slate-500 uppercase tracking-wider">Universities</div>
                                            </div>
                                            <div className="flex-1 bg-slate-50 rounded-lg p-2 text-center">
                                                <div className="font-bold text-slate-800 text-sm">{(card.courses / 1000).toFixed(0)}K+</div>
                                                <div className="text-[10px] text-slate-500 uppercase tracking-wider">Courses</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="font-bold text-xs text-slate-600 group-hover:text-purple-700 uppercase tracking-wide transition-colors">Explore</span>
                                            <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-600 transition-all group-hover:scale-110">
                                                <span className="material-symbols-outlined text-[14px] text-purple-600 group-hover:text-white font-bold">arrow_forward</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Field / Career grid */
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                            {(courseCards as typeof allCourseFields).map((card, idx) => (
                                <div
                                    key={idx}
                                    onClick={() => handleCardClick({ field: card.field })}
                                    className="cursor-pointer bg-white rounded-2xl border border-purple-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-purple-100 transition-all group flex flex-col hover:-translate-y-1"
                                >
                                    <div className="p-6 bg-gradient-to-br from-purple-50/60 to-fuchsia-50/60 flex-1 flex flex-col items-center justify-center text-center transition-colors group-hover:from-purple-50 group-hover:to-fuchsia-50">
                                        <span className={`material-symbols-outlined text-5xl mb-4 ${card.color}`}>{card.icon}</span>
                                        <h4 className="font-bold text-slate-800 text-sm leading-snug">{card.title}</h4>
                                    </div>
                                    <div className="p-4 bg-white border-t border-slate-100">
                                        <div className="flex gap-2 mb-3">
                                            <div className="flex-1 bg-slate-50 rounded-lg p-2 flex items-center gap-1.5">
                                                <span className="material-symbols-outlined text-slate-400 text-[14px]">menu_book</span>
                                                <div>
                                                    <div className="font-bold text-slate-800 text-xs">{card.specs}</div>
                                                    <div className="text-[9px] text-slate-500 uppercase tracking-wider">Specs</div>
                                                </div>
                                            </div>
                                            <div className="flex-1 bg-slate-50 rounded-lg p-2 flex items-center gap-1.5">
                                                <span className="material-symbols-outlined text-slate-400 text-[14px]">library_books</span>
                                                <div>
                                                    <div className="font-bold text-slate-800 text-xs">{card.courses.toLocaleString()}</div>
                                                    <div className="text-[9px] text-slate-500 uppercase tracking-wider">Courses</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between group-hover:text-purple-600 transition-colors">
                                            <span className="font-bold text-xs text-slate-600 group-hover:text-purple-700 uppercase tracking-wide transition-colors">Explore more</span>
                                            <div className="w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-600 transition-all group-hover:scale-110">
                                                <span className="material-symbols-outlined text-[14px] text-purple-600 group-hover:text-white font-bold">arrow_forward</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* View All Link */}
                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={handleFindCourses}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#7a29c2] text-[#7a29c2] font-bold text-sm hover:bg-[#7a29c2] hover:text-white transition-all duration-200"
                        >
                            View All Courses
                            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                        </button>
                    </div>
                </div>

                {/* ── University Discovery ── */}
                <div className="w-full">

                    {/* Header Row */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-6">
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3 flex-shrink-0">
                            Discover universities by
                            <svg width="36" height="22" viewBox="0 0 54 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600 mt-1 transform scale-x-[-1]">
                                <path d="M2.5 12.5C14.5 -1.5 35.5 -3.5 50.5 18M50.5 18L38 18M50.5 18C48 10 49 28.5 44.5 33.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </h3>

                        <div className="flex flex-wrap gap-3 items-center">
                            {/* Sort tabs */}
                            {([
                                { key: 'ranking', icon: 'military_tech', label: 'Global Ranking' },
                                { key: 'location', icon: 'location_on', label: 'By Location' },
                            ] as const).map(tab => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveUniTab(tab.key)}
                                    className={`px-4 py-2.5 rounded-xl font-bold flex items-center gap-2.5 text-sm transition-all border ${
                                        activeUniTab === tab.key
                                            ? 'bg-[#f3e8ff] text-[#7a29c2] border-[#d8b4fe] shadow-sm'
                                            : 'bg-white text-slate-500 border-slate-200 hover:bg-purple-50 hover:text-purple-700 hover:border-purple-200'
                                    }`}
                                >
                                    <span className={`material-symbols-outlined text-[18px] ${activeUniTab === tab.key ? 'text-[#7a29c2]' : 'text-slate-400'}`}>{tab.icon}</span>
                                    <div className="text-left leading-tight">
                                        <span className="block text-[10px] font-normal opacity-70">Sort by</span>
                                        {tab.label}
                                    </div>
                                </button>
                            ))}

                            {/* Country filter */}
                            <div className="relative">
                                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 text-[17px]">filter_list</span>
                                <select
                                    value={selectedCountry}
                                    onChange={e => { setSelectedCountry(e.target.value); setUniSearch(''); }}
                                    className="pl-9 pr-8 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-600 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer hover:border-purple-300 appearance-none"
                                >
                                    <option value="">All Countries</option>
                                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                                <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-[16px]">expand_more</span>
                            </div>

                            {/* Compare toggle */}
                            <button
                                onClick={() => { setCompareMode(m => !m); setCompareList([]); }}
                                className={`px-4 py-2.5 rounded-xl font-bold text-sm border transition-all flex items-center gap-2 ${
                                    compareMode
                                        ? 'bg-[#7a29c2] text-white border-[#7a29c2] shadow-md'
                                        : 'bg-white text-slate-500 border-slate-200 hover:bg-purple-50 hover:text-purple-700'
                                }`}
                            >
                                <span className="material-symbols-outlined text-[18px]">compare</span>
                                Compare
                            </button>
                        </div>
                    </div>

                    {/* University Search */}
                    <div className="relative mb-6">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 text-[20px]">search</span>
                        <input
                            type="text"
                            placeholder="Search universities by name or location..."
                            value={uniSearch}
                            onChange={e => setUniSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-3.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                        />
                        {uniSearch && (
                            <button onClick={() => setUniSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                <span className="material-symbols-outlined text-[20px]">close</span>
                            </button>
                        )}
                    </div>

                    {/* Compare Banner */}
                    {compareMode && (
                        <div className="mb-5 p-4 bg-[#f3e8ff] border border-[#d8b4fe] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-[#7a29c2] text-[22px]">info</span>
                                <p className="text-sm text-[#7a29c2] font-semibold">
                                    {compareList.length === 0 && 'Select 2 universities to compare them side by side.'}
                                    {compareList.length === 1 && 'Great! Select 1 more university.'}
                                    {compareList.length === 2 && 'Ready to compare!'}
                                </p>
                            </div>
                            {compareList.length === 2 && (
                                <button
                                    onClick={() => navigate('/contact')}
                                    className="flex-shrink-0 px-5 py-2 bg-[#7a29c2] text-white font-bold rounded-xl text-sm flex items-center gap-2 hover:bg-[#6a24aa] transition-colors"
                                >
                                    <span className="material-symbols-outlined text-[18px]">compare_arrows</span>
                                    Compare Now
                                </button>
                            )}
                        </div>
                    )}

                    {/* Results count */}
                    <p className="text-xs text-slate-400 font-semibold mb-4">
                        Showing {filteredUniversities.length} universities
                        {selectedCountry && <span> in <span className="text-[#7a29c2]">{selectedCountry}</span></span>}
                        {uniSearch && <span> matching "<span className="text-[#7a29c2]">{uniSearch}</span>"</span>}
                        <span className="ml-2 text-slate-300">• Sorted by {activeUniTab === 'ranking' ? 'Global Ranking ↑' : 'Location A–Z'}</span>
                    </p>

                    {/* University Cards – Flat (ranking) or Grouped (location) */}
                    {activeUniTab === 'ranking' ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {filteredUniversities.map((uni) => (
                                <div
                                    key={uni.id}
                                    onClick={() => compareMode ? toggleCompare(uni.id) : handleCardClick({ country: uni.country })}
                                    className={`cursor-pointer bg-white rounded-2xl border overflow-hidden shadow-sm transition-all group flex flex-col hover:-translate-y-1 ${
                                        compareMode && compareList.includes(uni.id)
                                            ? 'border-[#7a29c2] ring-2 ring-[#7a29c2]/30 shadow-purple-200'
                                            : 'border-purple-100 hover:shadow-xl hover:shadow-purple-100'
                                    }`}
                                >
                                    <div className="h-28 relative overflow-hidden">
                                        <img 
                                            src={uni.img} 
                                            alt={uni.name} 
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = logo;
                                            }}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 to-purple-900/10"></div>
                                        {/* Compare checkbox overlay */}
                                        {compareMode && (
                                            <div className={`absolute top-2 right-2 w-6 h-6 rounded-md flex items-center justify-center border-2 transition-all ${
                                                compareList.includes(uni.id)
                                                    ? 'bg-[#7a29c2] border-[#7a29c2]'
                                                    : 'bg-white/80 border-white'
                                            }`}>
                                                {compareList.includes(uni.id) && <span className="material-symbols-outlined text-white text-[14px]">check</span>}
                                            </div>
                                        )}
                                        <div className="absolute bottom-2 left-3 flex items-center gap-2">
                                            <span className="px-2 py-0.5 bg-[#7a29c2]/90 text-white text-[10px] font-bold rounded flex items-center gap-1 backdrop-blur-sm">
                                                <span className="material-symbols-outlined text-[10px]">military_tech</span>
                                                {uni.rank}
                                            </span>
                                            {uni.scholarships && (
                                                <span className="px-2 py-0.5 bg-emerald-600/90 text-white text-[10px] font-bold rounded backdrop-blur-sm">🎓 Scholarships</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-4 flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex items-start justify-between gap-1 mb-1">
                                                <h4 className="font-bold text-slate-800 text-sm leading-tight group-hover:text-[#7a29c2] transition-colors flex-1">{uni.name}</h4>
                                                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-purple-50 text-purple-600 rounded flex-shrink-0">{uni.type}</span>
                                            </div>
                                            <p className="text-slate-500 flex items-center gap-1 text-xs mb-3">
                                                <span className="material-symbols-outlined text-[12px] text-[#7a29c2]">location_on</span>
                                                {uni.location}
                                            </p>
                                            <div className="grid grid-cols-3 gap-1.5 mb-3">
                                                <div className="bg-slate-50 rounded-lg p-1.5 text-center">
                                                    <div className="font-bold text-slate-800 text-[11px]">{uni.tuition}</div>
                                                    <div className="text-[9px] text-slate-400 uppercase">Tuition</div>
                                                </div>
                                                <div className="bg-slate-50 rounded-lg p-1.5 text-center">
                                                    <div className="font-bold text-slate-800 text-[11px]">{uni.acceptRate}</div>
                                                    <div className="text-[9px] text-slate-400 uppercase">Accept</div>
                                                </div>
                                                <div className="bg-slate-50 rounded-lg p-1.5 text-center">
                                                    <div className="font-bold text-slate-800 text-[11px]">{uni.courses.toLocaleString()}</div>
                                                    <div className="text-[9px] text-slate-400 uppercase">Courses</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between border-t border-purple-50 pt-3">
                                            <span className="font-bold text-xs text-[#7a29c2] uppercase tracking-wide">{compareMode ? (compareList.includes(uni.id) ? '✓ Selected' : 'Select') : 'View University'}</span>
                                            <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all group-hover:scale-110 ${
                                                compareMode && compareList.includes(uni.id)
                                                    ? 'bg-[#7a29c2]'
                                                    : 'bg-purple-50 group-hover:bg-[#7a29c2]'
                                            }`}>
                                                <span className={`material-symbols-outlined text-[13px] font-bold transition-colors ${
                                                    compareMode && compareList.includes(uni.id) ? 'text-white' : 'text-[#7a29c2] group-hover:text-white'
                                                }`}>{compareMode ? 'check' : 'arrow_forward'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* Grouped by location */
                        <div className="space-y-8">
                            {Object.entries(groupedByCountry).map(([country, unis]) => (
                                <div key={country}>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#f3e8ff] border border-[#d8b4fe] rounded-full">
                                            <span className="material-symbols-outlined text-[#7a29c2] text-[16px]">location_on</span>
                                            <span className="text-sm font-bold text-[#7a29c2]">{country}</span>
                                        </div>
                                        <span className="text-xs text-slate-400 font-medium">{unis.length} universities</span>
                                        <div className="flex-1 h-px bg-purple-100"></div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {unis.map(uni => (
                                            <div
                                                key={uni.id}
                                                onClick={() => handleCardClick({ country: uni.country })}
                                                className="cursor-pointer bg-white rounded-2xl border border-purple-100 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-purple-100 transition-all group flex flex-col hover:-translate-y-1"
                                            >
                                                <div className="h-24 relative overflow-hidden">
                                                    <img 
                                                        src={uni.img} 
                                                        alt={uni.name} 
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = logo;
                                                        }}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-purple-950/70 to-transparent"></div>
                                                    <div className="absolute bottom-2 left-2 flex gap-1.5">
                                                        <span className="px-1.5 py-0.5 bg-[#7a29c2]/90 text-white text-[9px] font-bold rounded backdrop-blur-sm">{uni.rank}</span>
                                                        {uni.scholarships && <span className="px-1.5 py-0.5 bg-emerald-600/90 text-white text-[9px] font-bold rounded backdrop-blur-sm">🎓</span>}
                                                    </div>
                                                </div>
                                                <div className="p-3 flex-1 flex flex-col justify-between">
                                                    <div>
                                                        <h4 className="font-bold text-slate-800 text-sm leading-tight mb-0.5 group-hover:text-[#7a29c2] transition-colors">{uni.name}</h4>
                                                        <p className="text-slate-400 text-[11px] mb-2">{uni.tuition} · {uni.acceptRate} accept rate</p>
                                                    </div>
                                                    <div className="flex items-center justify-between pt-2 border-t border-purple-50">
                                                        <span className="text-[10px] font-bold text-[#7a29c2] uppercase tracking-wide">Explore</span>
                                                        <span className="material-symbols-outlined text-[#7a29c2] text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            {Object.keys(groupedByCountry).length === 0 && (
                                <div className="text-center py-16 text-slate-400">
                                    <span className="material-symbols-outlined text-5xl mb-3 block">search_off</span>
                                    <p className="font-semibold">No universities found. Try a different search.</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* View All + clear filters */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center items-center">
                        <button
                            onClick={() => navigate('/contact')}
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-[#7a29c2] text-[#7a29c2] font-bold text-sm hover:bg-[#7a29c2] hover:text-white transition-all duration-200"
                        >
                            View All Universities
                            <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                        </button>
                        {(selectedCountry || uniSearch) && (
                            <button
                                onClick={() => { setSelectedCountry(''); setUniSearch(''); }}
                                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 text-slate-500 font-semibold text-sm hover:bg-slate-50 transition-all"
                            >
                                <span className="material-symbols-outlined text-[16px]">filter_alt_off</span>
                                Clear Filters
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default IntelligentSearchSection;
