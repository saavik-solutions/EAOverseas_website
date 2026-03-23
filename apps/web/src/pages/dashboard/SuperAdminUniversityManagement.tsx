import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import UniversityFormModal from '@/features/universities/components/UniversityFormModal';
import { universityService, UniversityData } from '@/services/universityService';
import PageHeader from '@/components/layout/PageHeader';
import { usePosts } from '@/shared/contexts/PostsContext';
import { useApplications } from '@/shared/contexts/ApplicationsContext';

const SuperAdminUniversityManagement = () => {
    const { clearAllPosts } = usePosts();
    const { applications } = useApplications();
    const navigate = useNavigate();
    const [universities, setUniversities] = useState<UniversityData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Filter & Search State
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('All');

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUniversity, setEditingUniversity] = useState<UniversityData | null>(null);

    const fetchUniversities = useCallback(async () => {
        setLoading(true);
        try {
            const data = await universityService.getAll(searchQuery, selectedCountry);
            setUniversities(data.universities || []);
        } catch (err: any) {
            setError(err.message || 'Failed to synchronize university data');
        } finally {
            setLoading(false);
        }
    }, [searchQuery, selectedCountry]);

    useEffect(() => {
        fetchUniversities();
    }, [fetchUniversities]);

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to remove this university record? This action cannot be undone.')) return;
        try {
            await universityService.delete(id);
            fetchUniversities();
        } catch (err: any) {
            alert(err.message);
        }
    };

    const stats = [
        { label: 'Total Universities', value: universities.length, icon: 'school', color: 'bg-blue-600', trend: 'Global Database', trending: false },
        { label: 'Featured Partners', value: universities.filter(u => u.globalRanking || u.ranking?.startsWith('#')).length, icon: 'stars', color: 'bg-indigo-600', trend: 'Tier-1 Partners', trending: true },
        { label: 'Active Inbounds', value: applications.length.toLocaleString(), icon: 'query_stats', color: 'bg-emerald-600', trend: 'Live Applicants', trending: true },
    ];

    const countries = ['All Countries', ...new Set(universities.map(u => u.country))];

    return (
        <div className="flex-1 bg-[#f8fafc] min-h-screen">
            <PageHeader
                title="University Management"
                breadcrumbs={[{ label: 'Dashboard' }, { label: 'University Management' }]}
                actions={
                    <button
                        onClick={() => { setEditingUniversity(null); setIsModalOpen(true); }}
                        className="bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-black transition-all shadow-md active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[20px]">add</span>
                        Onboard University
                    </button>
                }
            />

            <div className="p-8 space-y-8 max-w-7xl mx-auto">

                {/* Performance Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4 group hover:border-[#2b6cee]/20 transition-all">
                            <div className="flex justify-between items-start">
                                <div className={`${stat.color} size-12 rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                                    <span className="material-symbols-outlined text-[24px]">{stat.icon}</span>
                                </div>
                                {stat.trending && (
                                    <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                                        <span className="material-symbols-outlined text-[14px]">trending_up</span>
                                        Active
                                    </div>
                                )}
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{stat.value}</h3>
                                <p className="text-slate-500 text-xs font-medium mt-1">{stat.label}</p>
                            </div>
                            <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{stat.trend}</span>
                                <span className="material-symbols-outlined text-slate-300 text-[18px]">arrow_forward</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Dashboard Controls */}
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <div className="relative flex-1 md:w-96">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
                            <input
                                type="text"
                                placeholder="Search by university name, ID, or city..."
                                className="w-full bg-white border border-slate-200 rounded-xl pl-12 pr-4 py-3 text-sm font-medium focus:ring-4 focus:ring-[#2b6cee]/5 focus:border-[#2b6cee] transition-all outline-none"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="relative min-w-[200px]">
                            <select
                                value={selectedCountry}
                                onChange={(e) => setSelectedCountry(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3 text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-[#2b6cee]/5 focus:border-[#2b6cee] transition-all appearance-none cursor-pointer pr-10"
                            >
                                {countries.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">unfold_more</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="size-11 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all hover:bg-slate-50">
                            <span className="material-symbols-outlined text-[20px]">filter_list</span>
                        </button>
                        <button className="size-11 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition-all hover:bg-slate-50">
                            <span className="material-symbols-outlined text-[20px]">download</span>
                        </button>
                    </div>
                </div>

                {/* University Directory Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    {loading && universities.length === 0 ? (
                        <div className="p-20 text-center space-y-4">
                            <div className="size-10 border-4 border-slate-100 border-t-[#2b6cee] rounded-full animate-spin mx-auto"></div>
                            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Loading Institution Registry...</p>
                        </div>
                    ) : universities.length === 0 ? (
                        <div className="p-20 text-center space-y-4">
                            <span className="material-symbols-outlined text-slate-200 text-6xl">school</span>
                            <p className="text-slate-400 font-bold">No universities match your search criteria.</p>
                            <button onClick={() => { setSearchQuery(''); setSelectedCountry('All'); }} className="text-[#2b6cee] font-bold text-xs uppercase tracking-widest hover:underline">Reset Filters</button>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50/50 border-b border-slate-100">
                                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Institution</th>
                                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Type & Size</th>
                                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Global Ranking</th>
                                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-center">Status</th>
                                        <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {universities.map((uni) => (
                                        <tr key={uni._id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    <div className="size-12 rounded-xl bg-white border border-slate-100 p-2 shadow-sm flex items-center justify-center overflow-hidden shrink-0">
                                                        {uni.logoUrl ? (
                                                            <img src={uni.logoUrl} alt={uni.name} className="h-full w-full object-contain" />
                                                        ) : (
                                                            <span className="material-symbols-outlined text-slate-200 text-2xl">account_balance</span>
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-bold text-slate-900 leading-tight">{uni.name}</span>
                                                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter flex items-center gap-1 mt-0.5">
                                                            <span className="material-symbols-outlined text-[12px]">location_on</span>
                                                            {uni.city}, {uni.country}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-8 py-5">
                                                <div className="flex flex-col gap-1">
                                                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full w-fit ${uni.universityType === 'Public' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                                                        {uni.universityType || 'University'}
                                                    </span>
                                                    <span className="text-[10px] text-slate-400 font-bold flex items-center gap-1">
                                                        <span className="material-symbols-outlined text-[14px]">groups</span>
                                                        {uni.totalStudents?.toLocaleString() || 'N/A'} Students
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-8 py-5">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-1.5 text-xs text-slate-900 font-black italic">
                                                        <span className="material-symbols-outlined text-[16px] text-amber-500 filled">military_tech</span>
                                                        {uni.globalRanking || uni.ranking || 'Unranked'}
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase">
                                                        Est. {uni.establishedYear || 'N/A'}
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-8 py-5 text-center">
                                                <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-[10px] font-black uppercase border border-emerald-100/50">
                                                    Active
                                                </span>
                                            </td>

                                            <td className="px-8 py-5 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => navigate(`/Superadmin/university/${uni._id}`, { state: { university: uni } })}
                                                        className="px-4 py-2 bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-wider rounded-lg hover:bg-[#2b6cee] hover:text-white transition-all active:scale-95"
                                                    >
                                                        Profile
                                                    </button>
                                                    <button
                                                        onClick={() => { setEditingUniversity(uni); setIsModalOpen(true); }}
                                                        className="size-9 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center hover:bg-black hover:text-white transition-all shadow-sm"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]">edit</span>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(uni._id!)}
                                                        className="size-9 bg-rose-50 text-rose-600 rounded-lg flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                                                    >
                                                        <span className="material-symbols-outlined text-[18px]">delete</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            <UniversityFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchUniversities}
                initialData={editingUniversity}
            />
        </div>
    );
};

export default SuperAdminUniversityManagement;

