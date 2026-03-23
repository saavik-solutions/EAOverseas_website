import React, { useState, useMemo, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/layout/PageHeader';
import { useSavedItems } from '@/shared/contexts/SavedItemsContext';
import { useAuthAction } from '@/shared/hooks/useAuthAction';
import { useAuth } from '@/shared/contexts/AuthContext';
import LoginModal from '@/features/auth/LoginModal';
import { universityService } from '@/services/universityService';

const CollegeFinder = () => {
    // State
    const navigate = useNavigate();
    const [universities, setUniversities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentView, setCurrentView] = useState('explore'); // Default to explore for live data
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOption, setSortOption] = useState('match_high');
    const [filters, setFilters] = useState({
        countries: ['USA', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'Singapore'],
        budgets: ['low', 'medium', 'high', 'premium']
    });

    // Fetch live data
    useEffect(() => {
        const fetchUniversities = async () => {
            setLoading(true);
            try {
                const data = await universityService.getAll();
                // Map backend data to local structure
                const mapped = (data.universities || []).map(uni => ({
                    id: uni._id,
                    name: uni.name,
                    location: `${uni.city}, ${uni.country}`,
                    country: uni.country,
                    match: Math.floor(Math.random() * 20) + 80, // Dynamic mock match score
                    ranking: parseInt(uni.ranking) || 999,
                    tuitionVal: uni.universityType === 'Public' ? 25000 : 45000,
                    image: uni.logoUrl,
                    tags: [
                        { icon: "trophy", text: `#${uni.ranking || 'N/A'} Global Ranking`, color: "text-blue-600" },
                        { icon: "school", text: uni.universityType || 'Research', color: "text-purple-600" },
                        { icon: "check_circle", text: "Verified Partner", color: "text-emerald-600" }
                    ],
                    stats: {
                        acceptance: uni.establishedYear ? `Since ${uni.establishedYear}` : "Contact for details",
                        salary: uni.totalStudents ? `${(uni.totalStudents / 1000).toFixed(1)}k+ Students` : "Global Reach"
                    },
                    budgetCategory: uni.universityType === 'Public' ? 'medium' : 'high'
                }));
                setUniversities(mapped);
            } catch (err) {
                console.error('Failed to load universities:', err);
                setError('Could not establish connection with institutional records.');
            } finally {
                setLoading(false);
            }
        };
        fetchUniversities();
    }, []);

    const toggleFilter = (category, value) => {
        executeAction(() => {
            setFilters(prev => {
                const current = prev[category];
                const updated = current.includes(value)
                    ? current.filter(item => item !== value)
                    : [...current, value];
                return { ...prev, [category]: updated };
            });
        });
    };

    const resetFilters = () => {
        executeAction(() => {
            setFilters({
                countries: ['USA', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'Singapore'],
                budgets: ['low', 'medium', 'high', 'premium']
            });
            setSearchQuery('');
        });
    };

    const filteredUniversities = useMemo(() => {
        let result = universities.filter(uni => {
            const matchesCountry = filters.countries.length === 0 || filters.countries.includes(uni.country);
            const matchesBudget = filters.budgets.length === 0 || filters.budgets.includes(uni.budgetCategory);
            const matchesSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                uni.location.toLowerCase().includes(searchQuery.toLowerCase());

            let matchesView = true;
            if (currentView === 'shortlisted') {
                matchesView = uni.match >= 90;
            }

            return matchesCountry && matchesBudget && matchesSearch && matchesView;
        });

        // Sorting
        return result.sort((a, b) => {
            if (sortOption === 'ranking') return a.ranking - b.ranking;
            if (sortOption === 'tuition_low') return a.tuitionVal - b.tuitionVal;
            if (sortOption === 'match_high') return b.match - a.match;
            return 0;
        });
    }, [universities, filters, searchQuery, sortOption, currentView]);

    const { toggleCollege, isCollegeSaved } = useSavedItems();
    const { executeAction, isLoginModalOpen, closeLoginModal } = useAuthAction();
    const { user } = useAuth();

    const handleToggleSave = (uni) => {
        executeAction(() => {
            toggleCollege(uni);
        });
    };

    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const SidebarContent = () => (
        <div className="bg-white rounded-xl border border-gray-200 p-5 lg:p-6 shadow-sm sticky top-6 flex flex-col h-full md:h-auto overflow-hidden">
            <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-xl lg:text-2xl text-gray-900">Filters</h3>
                    <button onClick={resetFilters} className="text-sm lg:text-base text-blue-600 font-semibold hover:underline">Reset All</button>
                </div>

                {/* View Mode Toggle */}
                <div className="space-y-4 border-b border-gray-100 pb-6 mb-6 lg:hidden">
                    <h4 className="font-bold text-gray-900 text-base lg:text-lg">Recommendation Mode</h4>
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <button
                            onClick={() => executeAction(() => setCurrentView('shortlisted'))}
                            className={`flex-1 py-2 rounded-md text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${currentView === 'shortlisted' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            <span className={`material-symbols-outlined !text-[16px] ${currentView === 'shortlisted' ? 'fill-current' : ''}`}>auto_awesome</span>
                            AI Shortlisted
                        </button>
                        <button
                            onClick={() => executeAction(() => setCurrentView('explore'))}
                            className={`flex-1 py-2 rounded-md text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${currentView === 'explore' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                        >
                            <span className="material-symbols-outlined !text-[16px]">explore</span>
                            Explore All
                        </button>
                    </div>
                </div>

                {/* Mobile Sort Option */}
                <div className="lg:hidden space-y-4 border-b border-gray-100 pb-6 mb-6">
                    <h4 className="font-bold text-gray-900 text-base lg:text-lg">Sort by</h4>
                    <select
                        value={sortOption}
                        onChange={(e) => executeAction(() => setSortOption(e.target.value))}
                        className="w-full text-sm lg:text-base border border-gray-300 rounded-lg text-gray-700 focus:ring-blue-600 focus:border-blue-600 p-2.5 bg-white shadow-sm cursor-pointer">
                        <option value="match_high">Match Score (High to Low)</option>
                        <option value="ranking">Ranking</option>
                        <option value="tuition_low">Tuition (Low to High)</option>
                    </select>
                </div>

                {/* Country Filter */}
                <div className="space-y-4 border-b border-gray-100 pb-6 mb-6">
                    <h4 className="font-bold text-gray-900 text-base lg:text-lg">Country</h4>
                    <div className="space-y-3">
                        {['USA', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'Singapore'].map(country => (
                            <label key={country} className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-2 -mx-2 rounded-lg transition-colors">
                                <div className={`size-5 lg:size-6 rounded border flex items-center justify-center transition-colors ${filters.countries.includes(country) ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white'}`}>
                                    {filters.countries.includes(country) && <span className="material-symbols-outlined text-white text-[16px] lg:text-[18px]">check</span>}
                                </div>
                                <input
                                    type="checkbox"
                                    checked={filters.countries.includes(country)}
                                    onChange={() => toggleFilter('countries', country)}
                                    className="sr-only"
                                />
                                <span className="text-sm lg:text-base text-gray-700 font-medium group-hover:text-gray-900">{country}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Budget Filter */}
                <div className="space-y-4">
                    <h4 className="font-bold text-gray-900 text-base lg:text-lg">Budget (Annual)</h4>
                    <div className="space-y-3">
                        {[
                            { label: 'Under $20k', value: 'low' },
                            { label: '$20k - $40k', value: 'medium' },
                            { label: '$40k - $60k', value: 'high' },
                            { label: 'Above $60k', value: 'premium' }
                        ].map(budget => (
                            <label key={budget.value} className="flex items-center gap-3 cursor-pointer group hover:bg-gray-50 p-2 -mx-2 rounded-lg transition-colors">
                                <div className={`size-5 lg:size-6 rounded border flex items-center justify-center transition-colors ${filters.budgets.includes(budget.value) ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white'}`}>
                                    {filters.budgets.includes(budget.value) && <span className="material-symbols-outlined text-white text-[16px] lg:text-[18px]">check</span>}
                                </div>
                                <input
                                    type="checkbox"
                                    checked={filters.budgets.includes(budget.value)}
                                    onChange={() => toggleFilter('budgets', budget.value)}
                                    className="sr-only"
                                />
                                <span className="text-sm lg:text-base text-gray-700 font-medium group-hover:text-gray-900">{budget.label}</span>
                            </label>
                        ))}
                    </div>
                </div>
            </div>

            {/* Sticky Action Button for Mobile Drawer */}
            <div className="pt-4 mt-auto border-t border-gray-100 lg:hidden block">
                <button
                    onClick={() => executeAction(() => setIsFilterOpen(false))}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold text-sm shadow-lg shadow-blue-500/30 transition-all"
                >
                    Show Results
                </button>
            </div>
        </div>
    );

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-[#f8f9fc]">
            <PageHeader
                title="Institutional Discovery"
                actions={
                    !user ? (
                        <button
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
                            onClick={() => navigate('/landing')}
                        >
                            Enter Website
                        </button>
                    ) : null
                }
            />
            <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />

            <main className="flex-1 overflow-y-auto bg-[#f8f9fc] p-6 lg:p-8">
                <div className="max-w-7xl mx-auto flex flex-col gap-6">
                    {/* Search & Mode Bar */}
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="relative w-full max-w-md">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 !text-[20px]">search</span>
                            <input
                                value={searchQuery}
                                onChange={(e) => executeAction(() => setSearchQuery(e.target.value))}
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 placeholder-slate-400 transition-all"
                                placeholder="Search institutions..." type="text" />
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="hidden lg:flex bg-slate-100 p-1 rounded-xl">
                                <button
                                    onClick={() => executeAction(() => setCurrentView('shortlisted'))}
                                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${currentView === 'shortlisted' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                                >
                                    <span className="material-symbols-outlined !text-[16px]">auto_awesome</span>
                                    AI Selection
                                </button>
                                <button
                                    onClick={() => executeAction(() => setCurrentView('explore'))}
                                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${currentView === 'explore' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                                >
                                    <span className="material-symbols-outlined !text-[16px]">explore</span>
                                    Browse All
                                </button>
                            </div>
                            <button
                                onClick={() => executeAction(() => setIsFilterOpen(true))}
                                className="lg:hidden px-4 bg-white border border-slate-200 py-2 rounded-xl flex items-center justify-center gap-2 font-bold text-slate-900 shadow-sm text-sm"
                            >
                                <span className="material-symbols-outlined text-blue-600 !text-[20px]">filter_list</span>
                                Filter
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full pb-10">
                        {/* Sidebar - Desktop */}
                        <aside className="hidden lg:block lg:col-span-3 h-full">
                            <SidebarContent />
                        </aside>

                        {/* Mobile Sidebar Content (Drawer) */}
                        {isFilterOpen && (
                            <div className="fixed inset-0 z-[100] lg:hidden">
                                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)}></div>
                                <div className="absolute inset-y-0 left-0 w-[85%] max-w-[320px] bg-white shadow-2xl p-4 animate-in slide-in-from-left duration-300 z-50">
                                    <SidebarContent />
                                </div>
                            </div>
                        )}

                        {/* Results List */}
                        <div className="lg:col-span-9 flex flex-col gap-6">
                            <div className="flex justify-between items-center px-1">
                                <span className="text-sm font-bold text-slate-500">
                                    {loading ? (
                                        <span className="flex items-center gap-2">
                                            <span className="size-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></span>
                                            Syncing with global registry...
                                        </span>
                                    ) : (
                                        <>Showing <strong className="text-slate-900">{filteredUniversities.length}</strong> institutions</>
                                    )}
                                </span>
                                <div className="hidden lg:flex items-center gap-3">
                                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Sort by</span>
                                    <select
                                        value={sortOption}
                                        onChange={(e) => executeAction(() => setSortOption(e.target.value))}
                                        className="text-xs font-bold border-slate-200 rounded-xl text-slate-700 focus:ring-blue-600 focus:border-blue-600 px-3 py-2 bg-white shadow-sm cursor-pointer outline-none">
                                        <option value="match_high">Match Score</option>
                                        <option value="ranking">Global Ranking</option>
                                        <option value="tuition_low">Tuition Value</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                {loading ? (
                                    [1, 2, 3].map(i => (
                                        <div key={i} className="bg-white rounded-3xl border border-slate-100 p-6 flex gap-6 animate-pulse">
                                            <div className="size-24 rounded-2xl bg-slate-100" />
                                            <div className="flex-1 space-y-4 pt-2">
                                                <div className="h-6 w-1/3 bg-slate-100 rounded-full" />
                                                <div className="h-4 w-1/2 bg-slate-50 rounded-full" />
                                                <div className="flex gap-2">
                                                    <div className="h-8 w-24 bg-slate-50 rounded-lg" />
                                                    <div className="h-8 w-24 bg-slate-50 rounded-lg" />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : error ? (
                                    <div className="text-center py-20 bg-red-50 border border-red-100 rounded-[32px]">
                                        <span className="material-symbols-outlined text-red-400 !text-[48px] mb-4">cloud_off</span>
                                        <h3 className="text-lg font-black text-red-900">{error}</h3>
                                        <p className="text-red-600 mt-2">The system encountered an issue while connecting to the university server.</p>
                                        <button onClick={() => window.location.reload()} className="mt-6 px-6 py-2 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all">Retry Sync</button>
                                    </div>
                                ) : filteredUniversities.length === 0 ? (
                                    <div className="text-center py-20 bg-white rounded-[32px] border border-slate-200 border-dashed">
                                        <span className="material-symbols-outlined text-slate-300 !text-[48px] mb-4">search_off</span>
                                        <h3 className="text-lg font-black text-slate-400 italic">No institutions match your refined criteria.</h3>
                                        <button onClick={resetFilters} className="mt-4 text-blue-600 font-bold hover:underline">Clear all filters</button>
                                    </div>
                                ) : (
                                    filteredUniversities.map((uni, index) => (
                                        <div
                                            key={index}
                                            onClick={() => executeAction(() => navigate(`/college-details?id=${uni.id}&name=${encodeURIComponent(uni.name)}`))}
                                            className="bg-white rounded-[32px] border border-slate-200 p-4 lg:p-6 shadow-sm hover:border-blue-600/30 hover:shadow-xl hover:-translate-y-1 transition-all group flex flex-col sm:flex-row gap-4 lg:gap-8 cursor-pointer relative overflow-hidden"
                                        >
                                            <div className="shrink-0 flex items-start">
                                                <div className="size-20 lg:size-32 rounded-2xl border border-slate-100 bg-white p-2 flex items-center justify-center overflow-hidden shadow-inner group-hover:scale-105 transition-transform">
                                                    {uni.image ? (
                                                        <img src={uni.image} className="size-full object-contain" alt={uni.name} />
                                                    ) : (
                                                        <span className="material-symbols-outlined !text-[40px] text-slate-300">account_balance</span>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="flex-1 flex flex-col min-w-0">
                                                <div className="flex justify-between items-start gap-2 mb-2">
                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex flex-wrap items-center gap-2 mb-1">
                                                            <h3 className="text-lg lg:text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight truncate">{uni.name}</h3>
                                                            <span className="px-2 py-1 rounded-lg text-[10px] font-black bg-blue-600 text-white uppercase tracking-wider">{uni.match}% FIT</span>
                                                        </div>
                                                        <p className="text-xs lg:text-sm text-slate-500 font-bold flex items-center gap-1 uppercase tracking-tight">
                                                            <span className="material-symbols-outlined !text-[16px] text-blue-600">location_on</span> {uni.location}
                                                        </p>
                                                    </div>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleToggleSave(uni);
                                                        }}
                                                        className={`shrink-0 transition-all p-2.5 rounded-2xl hover:bg-slate-50 ${isCollegeSaved(uni) ? 'text-blue-600 scale-110' : 'text-slate-300 hover:text-blue-600'}`}
                                                    >
                                                        <span className={`material-symbols-outlined !text-[24px] ${isCollegeSaved(uni) ? 'filled' : ''}`}>
                                                            {isCollegeSaved(uni) ? 'bookmark' : 'bookmark_add'}
                                                        </span>
                                                    </button>
                                                </div>

                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    {uni.tags.map((tag, i) => (
                                                        <div key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-white transition-colors">
                                                            <span className={`material-symbols-outlined !text-[16px] ${tag.color}`}>{tag.icon}</span>
                                                            <span className="text-[10px] font-black text-slate-600 uppercase tracking-wider">{tag.text}</span>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="pt-5 border-t border-slate-50 flex flex-wrap items-center justify-between gap-4 mt-auto">
                                                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                                                        <div className="flex flex-col">
                                                            <span className="text-[9px] text-slate-300 mb-0.5">Founding</span>
                                                            <span className="text-slate-700">{uni.stats.acceptance.split(' ')[1]}</span>
                                                        </div>
                                                        <div className="w-px h-6 bg-slate-100" />
                                                        <div className="flex flex-col">
                                                            <span className="text-[9px] text-slate-300 mb-0.5">Network</span>
                                                            <span className="text-slate-700">{uni.stats.salary}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1 font-black text-[#2b6cee] group-hover:gap-2 transition-all">
                                                        VIEW PROFILE <span className="material-symbols-outlined !text-[18px]">arrow_right_alt</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CollegeFinder;

