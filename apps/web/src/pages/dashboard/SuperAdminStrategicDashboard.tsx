import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '@/components/layout/PageHeader';
import { universityService } from '@/services/universityService';
import { feedService } from '@/services/feedService';

const SuperAdminStrategicDashboard = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        universities: 0,
        posts: 0,
        counsellors: 12,
        applications: 248,
        portfolioValue: '4.2M'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAggregatedStats = async () => {
            setLoading(true);
            try {
                const [uniRes, feedRes] = await Promise.all([
                    universityService.getAll(),
                    feedService.getAll()
                ]);
                setStats(prev => ({
                    ...prev,
                    universities: uniRes.universities?.length || 0,
                    posts: feedRes.length || 0
                }));
            } catch (err) {
                console.error('Strategic sync failed', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAggregatedStats();
    }, []);

    const kpis = [
        { label: 'Institutions', value: stats.universities, icon: 'account_balance', color: 'bg-blue-600', path: '/Superadmin/universities', desc: 'Global University Registry' },
        { label: 'Market Content', value: stats.posts, icon: 'feed', color: 'bg-orange-500', path: '/Superadmin/university-portal/posts-feed', desc: 'Active Broadcasts' },
        { label: 'Active Counsellors', value: stats.counsellors, icon: 'support_agent', color: 'bg-emerald-600', path: '/Superadmin/counsellors', desc: 'Managed Partners' },
        { label: 'Platform Inquiries', value: 0, icon: 'contact_support', color: 'bg-indigo-600', path: '/Superadmin/inquiries', desc: 'Landing Page Leads' },
        { label: 'Portfolio Value', value: stats.portfolioValue, icon: 'payments', color: 'bg-purple-600', path: '#', desc: 'Est. Application Revenue' },
    ];

    return (
        <div className="flex-1 bg-[#f8fafc] min-h-screen">
            <PageHeader
                title="Strategic Command Center"
                breadcrumbs={[{ label: 'System Overview' }]}
                actions={
                    <div className="flex items-center gap-3">
                        <button className="bg-white border border-slate-200 text-slate-600 px-4 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">
                            <span className="material-symbols-outlined text-[18px]">cloud_download</span>
                            Quarterly Audit
                        </button>
                    </div>
                }
            />

            <div className="p-8 space-y-8 max-w-7xl mx-auto">
                {/* Hero / Welcome */}
                <div className="bg-slate-900 rounded-[32px] p-10 text-white relative overflow-hidden shadow-2xl shadow-slate-200">
                    <div className="absolute top-0 right-0 size-96 bg-[#2b6cee]/20 blur-[120px] -mr-48 -mt-48 rounded-full" />
                    <div className="absolute bottom-0 left-0 size-64 bg-emerald-500/10 blur-[100px] -ml-32 -mb-32 rounded-full" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-4xl font-black tracking-tight mb-4">Enterprise Management <br /><span className="text-[#2b6cee]">Command Center</span></h2>
                            <p className="text-slate-400 text-lg font-medium leading-relaxed mb-8">
                                Global platform oversight: Monitoring {stats.universities} institutions and {stats.counsellors} certified counsellors in real-time.
                            </p>
                            <div className="flex items-center gap-6">
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black uppercase text-[#2b6cee] tracking-widest mb-1">System Integrity</span>
                                    <div className="flex items-center gap-2">
                                        <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="font-bold text-sm">Operational</span>
                                    </div>
                                </div>
                                <div className="w-px h-10 bg-white/10" />
                                <div className="flex items-col">
                                    <div className="flex flex-col">
                                        <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Last Update</span>
                                        <span className="font-bold text-sm">Just now</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:grid grid-cols-2 gap-4">
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl">
                                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Active Applications</span>
                                <div className="text-3xl font-black mt-2">{stats.applications}</div>
                                <div className="text-[10px] text-emerald-400 font-bold mt-1">↑ 14% this month</div>
                            </div>
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-3xl">
                                <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Global Partners</span>
                                <div className="text-3xl font-black mt-2">{stats.counsellors}</div>
                                <div className="text-[10px] text-blue-400 font-bold mt-1">Full capacity</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Primary Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {kpis.map((kpi) => (
                        <div
                            key={kpi.label}
                            onClick={() => kpi.path !== '#' && navigate(kpi.path)}
                            className="bg-white p-6 rounded-[24px] border border-slate-200 shadow-sm flex flex-col gap-6 group hover:border-[#2b6cee]/30 hover:shadow-xl transition-all cursor-pointer active:scale-95"
                        >
                            <div className="flex justify-between items-start">
                                <div className={`${kpi.color} size-14 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                                    <span className="material-symbols-outlined text-[28px]">{kpi.icon}</span>
                                </div>
                                <span className="material-symbols-outlined text-slate-300 group-hover:text-[#2b6cee] transition-colors">arrow_forward</span>
                            </div>
                            <div>
                                <div className="flex items-end gap-2 mb-1">
                                    <h3 className="text-4xl font-black text-slate-900 tracking-tighter">
                                        {loading ? (
                                            <span className="animate-pulse opacity-50">...</span>
                                        ) : kpi.value}
                                    </h3>
                                    <span className="text-emerald-500 text-xs font-black mb-1.5">+12%</span>
                                </div>
                                <p className="text-slate-500 font-bold text-sm tracking-tight">{kpi.label}</p>
                                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest mt-1">{kpi.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Activity Feed & Management */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Productivity Leaderboard */}
                        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Counsellor Performance</h3>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">Throughput & Engagement</p>
                                </div>
                                <button className="text-[10px] font-black text-[#2b6cee] hover:underline uppercase tracking-widest">View Rankings</button>
                            </div>

                            <div className="space-y-6">
                                {[
                                    { name: 'Sarah Jenkins', unis: 8, content: 24, score: 98, img: 'https://i.pravatar.cc/150?u=sarah' },
                                    { name: 'Michael Chen', unis: 12, content: 18, score: 94, img: 'https://i.pravatar.cc/150?u=mike' },
                                    { name: 'Amara Okafor', unis: 5, content: 32, score: 91, img: 'https://i.pravatar.cc/150?u=amara' },
                                ].map((c, i) => (
                                    <div key={i} className="flex items-center gap-4 group/item p-2 rounded-2xl hover:bg-slate-50 transition-colors">
                                        <img src={c.img} className="size-12 rounded-xl object-cover shadow-sm" alt="" />
                                        <div className="flex-1">
                                            <h4 className="font-bold text-slate-900">{c.name}</h4>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">{c.unis} Universities · {c.content} Broadcasts</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-sm font-black text-slate-900">{c.score}%</div>
                                            <div className="w-24 h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                                                <div className="h-full bg-blue-600 rounded-full" style={{ width: `${c.score}%` }} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Visual Shortcut Map */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div onClick={() => navigate('/Superadmin/scraper')} className="p-8 rounded-[32px] bg-slate-900 text-white hover:bg-black transition-all cursor-pointer group/card overflow-hidden relative">
                                <div className="absolute top-0 right-0 size-32 bg-blue-600/20 blur-3xl -mr-16 -mt-16" />
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="size-12 rounded-2xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
                                        <span className="material-symbols-outlined">data_exploration</span>
                                    </div>
                                    <h4 className="text-lg font-black italic">Market Scraper</h4>
                                </div>
                                <p className="text-sm text-slate-400 leading-relaxed mb-6 font-medium">Synchronize global institution data with real-time NIRF and US-News rankings.</p>
                                <div className="flex items-center text-[10px] font-black text-blue-400 uppercase tracking-widest">
                                    Initialize Crawler <span className="material-symbols-outlined text-[14px] ml-2">play_arrow</span>
                                </div>
                            </div>

                            <div onClick={() => navigate('/Superadmin/users')} className="p-8 rounded-[32px] bg-white border border-slate-200 hover:border-emerald-200 transition-all cursor-pointer group/card">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="size-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                        <span className="material-symbols-outlined">shield_person</span>
                                    </div>
                                    <h4 className="text-lg font-black text-slate-900">Partner Audit</h4>
                                </div>
                                <p className="text-sm text-slate-500 leading-relaxed mb-6 font-medium">Verify counsellor credentials and manage platform access permissions.</p>
                                <div className="flex items-center text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                                    Review access <span className="material-symbols-outlined text-[14px] ml-2">verified_user</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Access Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Platform Health</h3>
                            <div className="space-y-6">
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between text-xs font-black">
                                        <span>Server Load</span>
                                        <span className="text-[#2b6cee]">42%</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-600 w-[42%]" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <div className="flex justify-between text-xs font-black">
                                        <span>DB Stability</span>
                                        <span className="text-emerald-500">99.9%</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 w-[99.9%]" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#2b6cee] rounded-[32px] p-8 text-white relative overflow-hidden group">
                            <div className="absolute top-0 right-0 size-32 bg-white/10 blur-2xl -mr-16 -mt-16 rounded-full group-hover:scale-150 transition-transform duration-700" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 relative z-10 opacity-70">Financial Pulse</h3>
                            <div className="relative z-10">
                                <div className="text-3xl font-black mb-2">$1.2M</div>
                                <p className="text-xs font-medium text-white/70 italic">Projected commission pipeline from active university applications.</p>
                                <button className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                                    Export Ledger
                                </button>
                            </div>
                        </div>

                        {/* Recent Activity Mini List */}
                        <div className="bg-white rounded-[32px] border border-slate-200 shadow-sm p-8">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Live Logs</h3>
                            <div className="space-y-4">
                                {[
                                    { msg: 'Sarah onboarded Harvard', time: '2m ago', type: 'uni' },
                                    { msg: 'New Scholarship Published', time: '14m ago', type: 'post' },
                                    { msg: 'Auth token renewed (Admin)', time: '1h ago', type: 'sys' },
                                ].map((log, i) => (
                                    <div key={i} className="flex flex-col gap-1 border-b border-slate-50 pb-3 last:border-0">
                                        <p className="text-xs font-bold text-slate-700 truncate">{log.msg}</p>
                                        <span className="text-[9px] text-slate-400 font-black uppercase">{log.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminStrategicDashboard;

