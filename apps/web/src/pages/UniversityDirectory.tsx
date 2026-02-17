import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

import { universitiesData } from '../data/universities';

const UniversityDirectory = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({
        Country: 'All',
        'Course Type': 'All',
        Budget: 'All',
        Ranking: 'All',
        Intake: 'All'
    });

    const countries = ['All', ...new Set(universitiesData.map(u => u.country))];
    const courseTypes = ['All', ...new Set(universitiesData.map(u => u.courseType))];
    const budgets = ['All', 'Budget', 'Moderate', 'Premium'];
    const intakes = ['All', ...new Set(universitiesData.map(u => u.intakeType))];

    const filteredUniversities = useMemo(() => {
        return universitiesData
            .filter(uni => {
                const matchesSearch = uni.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    uni.course.toLowerCase().includes(searchQuery.toLowerCase());

                const matchesCountry = filters.Country === 'All' || uni.country === filters.Country;
                const matchesCourseType = filters['Course Type'] === 'All' || uni.courseType === filters['Course Type'];
                const matchesBudget = filters.Budget === 'All' || uni.budget === filters.Budget;
                const matchesIntake = filters.Intake === 'All' || uni.intakeType === filters.Intake;

                let matchesRanking = true;
                if (filters.Ranking !== 'All') {
                    if (filters.Ranking === 'Top 10') matchesRanking = uni.globalRanking <= 10;
                    else if (filters.Ranking === 'Top 50') matchesRanking = uni.globalRanking <= 50;
                }

                return matchesSearch && matchesCountry && matchesCourseType && matchesBudget && matchesIntake && matchesRanking;
            })
            .sort((a, b) => a.globalRanking - b.globalRanking);
    }, [searchQuery, filters]);

    const handleFilterChange = (type: string, value: string) => {
        setFilters(prev => ({ ...prev, [type]: value }));
    };

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-[#F8FAFC]">
            <PageHeader title="University Directory" />

            <main className="flex-1 overflow-y-auto p-4 lg:p-8">
                <div className="max-w-[1400px] mx-auto space-y-8">


                    {/* Controls Panel */}
                    <div className="bg-white/70 backdrop-blur-xl z-20 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/20 p-4 md:p-6 mb-8">
                        <div className="flex flex-col xl:flex-row gap-6 items-center">
                            {/* Search */}
                            <div className="w-full xl:flex-1">
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <span className="material-symbols-outlined text-gray-400 group-focus-within:text-blue-600 transition-colors">search</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-gray-900 placeholder:text-gray-400 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 focus:bg-white transition-all text-sm md:text-base outline-none shadow-sm"
                                        placeholder="Search by university, country or course..."
                                    />
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-wrap gap-3 w-full xl:w-auto">
                                {[
                                    { label: 'Country', options: countries },
                                    { label: 'Course Type', options: courseTypes },
                                    { label: 'Budget', options: budgets },
                                    { label: 'Ranking', options: ['All', 'Top 10', 'Top 50'] },
                                    { label: 'Intake', options: intakes }
                                ].map((filter) => (
                                    <div key={filter.label} className="relative group min-w-[120px]">
                                        <select
                                            value={filters[filter.label as keyof typeof filters]}
                                            onChange={(e) => handleFilterChange(filter.label, e.target.value)}
                                            className="appearance-none w-full bg-white border border-gray-100 px-4 py-3 rounded-xl text-xs md:text-sm font-bold text-gray-700 hover:border-blue-300 hover:bg-blue-50/30 cursor-pointer focus:ring-2 focus:ring-blue-100 outline-none transition-all shadow-sm"
                                        >
                                            {filter.options.map(opt => <option key={opt} value={opt}>{opt === 'All' ? `All ${filter.label}` : opt}</option>)}
                                        </select>
                                        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-lg group-hover:text-blue-500 transition-colors">expand_more</span>
                                    </div>
                                ))}
                                {/* Reset */}
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setFilters({ Country: 'All', 'Course Type': 'All', Budget: 'All', Ranking: 'All', Intake: 'All' });
                                    }}
                                    className="px-4 py-3 rounded-xl text-xs font-bold text-blue-600 hover:bg-blue-50 transition-colors border border-transparent hover:border-blue-100"
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="flex items-center justify-between mb-4 px-2">
                        <p className="text-sm font-semibold text-gray-500">
                            Found <span className="text-gray-900">{filteredUniversities.length}</span> results
                        </p>
                    </div>

                    {/* Table / Grid */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-12">
                        <div className="overflow-x-auto min-h-[400px]">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50/50 border-b border-gray-100">
                                        <th className="px-6 py-5 text-gray-400 text-[10px] font-black uppercase tracking-widest min-w-[300px]">University & Course</th>
                                        <th className="px-6 py-5 text-gray-400 text-[10px] font-black uppercase tracking-widest">Details</th>
                                        <th className="px-6 py-5 text-gray-400 text-[10px] font-black uppercase tracking-widest">Costs</th>
                                        <th className="px-6 py-5 text-gray-400 text-[10px] font-black uppercase tracking-widest">Global Rank</th>
                                        <th className="px-6 py-5 text-gray-400 text-[10px] font-black uppercase tracking-widest text-right">Connect</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {filteredUniversities.length > 0 ? (
                                        filteredUniversities.map((uni) => (
                                            <tr key={uni.id} className="hover:bg-blue-50/20 transition-all group">
                                                <td className="px-6 py-6">
                                                    <div className="flex items-start gap-4">
                                                        <div className="size-12 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm shrink-0 group-hover:scale-110 transition-transform">
                                                            <span className="material-symbols-outlined text-2xl">school</span>
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-gray-900 text-base md:text-lg mb-0.5 group-hover:text-blue-600 transition-colors">{uni.name}</p>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-tighter">{uni.course}</span>
                                                                <span className="size-1 bg-gray-300 rounded-full"></span>
                                                                <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded uppercase">{uni.courseType}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6">
                                                    <div className="space-y-1.5">
                                                        <div className="flex items-center gap-2">
                                                            <span className="material-symbols-outlined text-blue-500 text-sm">public</span>
                                                            <span className="text-sm font-bold text-gray-700">{uni.country}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="material-symbols-outlined text-indigo-400 text-sm">calendar_today</span>
                                                            <span className="text-[11px] font-semibold text-gray-500">{uni.intakeType} Intake</span>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6">
                                                    <div className="space-y-1">
                                                        <p className="text-xs font-black text-gray-900">
                                                            Tuition: <span className={uni.tuitionValue === 0 ? 'text-green-600' : ''}>{uni.tuitionValue === 0 ? 'FREE' : `$${uni.tuitionValue.toLocaleString()}`}</span>
                                                        </p>
                                                        <p className="text-[10px] font-bold text-gray-400 uppercase">Living: ${uni.livingCostValue.toLocaleString()}</p>
                                                        <div className={`mt-2 text-[10px] font-black px-2 py-0.5 rounded-full w-fit bg-opacity-10 ${uni.budget === 'Premium' ? 'bg-purple-600 text-purple-600' :
                                                            uni.budget === 'Moderate' ? 'bg-blue-600 text-blue-600' :
                                                                'bg-green-600 text-green-600'
                                                            }`}>
                                                            {uni.budget}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6 text-center">
                                                    <div className="inline-flex flex-col items-center">
                                                        <span className="text-lg font-black text-gray-900 tracking-tighter">#{uni.globalRanking}</span>
                                                        <div className="w-8 h-1 bg-blue-100 rounded-full mt-1 overflow-hidden">
                                                            <div className="h-full bg-blue-500" style={{ width: `${Math.max(10, 100 - (uni.globalRanking / 2))}%` }}></div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-6 text-right">

                                                    <div className="flex flex-col md:flex-row justify-end gap-2">
                                                        <Link to={`/consultant/university-details/${uni.id}`} className="px-4 py-2 rounded-xl border border-gray-200 text-gray-600 text-xs font-bold hover:bg-gray-50 transition-all whitespace-nowrap">View Details</Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-24 text-center">
                                                <div className="flex flex-col items-center gap-4">
                                                    <div className="size-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                                                        <span className="material-symbols-outlined text-4xl">search_off</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-gray-900 text-lg">No matches found</p>
                                                        <p className="text-gray-500 text-sm">Try adjusting your filters or search keywords.</p>
                                                    </div>
                                                    <button onClick={() => { setSearchQuery(''); setFilters({ Country: 'All', 'Course Type': 'All', Budget: 'All', Ranking: 'All', Intake: 'All' }); }} className="text-blue-600 font-bold text-sm hover:underline">Clear all filters</button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main >
        </div >
    );
};

export default UniversityDirectory;
