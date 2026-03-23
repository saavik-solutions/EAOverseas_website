import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/layout/PageHeader';
import NotificationBanner from '@/features/notifications/NotificationBanner';
import { universityService } from '@/services/universityService';
import { feedService } from '@/services/feedService';

const ConsultantDashboard = ({ isEmbedded = false }: { isEmbedded?: boolean }) => {
    const navigate = useNavigate();
    const [sessions, setSessions] = useState([]);
    const [stats, setStats] = useState({
        myUniversities: 8,
        myCourses: 124,
        myBroadcasts: 18,
        activeStudents: 24,
        dailyLeads: 12
    });
    const [loading, setLoading] = useState(true);

    // Initialize data
    const loadData = async () => {
        // Load sessions from localStorage as per original logic
        const savedSessions = localStorage.getItem('scheduled_sessions');
        if (savedSessions) {
            const parsedSessions = JSON.parse(savedSessions);
            setSessions(parsedSessions.filter(s => s.status === 'scheduled'));
        } else {
            const demoSessions = [
                { id: 'demo-1', studentName: 'Priya Sharma', topic: 'Course Selection', mode: 'video', dateLabel: 'Today' },
                { id: 'demo-2', studentName: 'Rahul Patel', topic: 'Visa Prep', mode: 'voice', dateLabel: 'Tomorrow' }
            ];
            setSessions(demoSessions);
        }

        // Try to get real counts for university/feed if allowed by role (even though this is "My" portfolio, we mock the scope for now)
        try {
            const [uniRes, feedRes] = await Promise.all([
                universityService.getAll(),
                feedService.getAll()
            ]);
            // For enterprise feel, we show total system count if "my" isn't filtered, or just use mocks to show design
            setStats(prev => ({
                ...prev,
                myUniversities: uniRes.universities?.length || 8,
                myBroadcasts: feedRes.length || 18
            }));
        } catch (err) {
            console.error('Operational sync failed', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadData();
        const interval = setInterval(loadData, 10000);
        return () => clearInterval(interval);
    }, []);

    const handleStartSession = (session) => {
        alert(`Initializing secure meeting for ${session.studentName}...`);
    };

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-[#f8fafc]">
            <NotificationBanner sessions={sessions} />

            <PageHeader
                title="Operational Portfolio Hub"
                breadcrumbs={[{ label: 'Institutional Management' }]}
            />

            <main className="flex-1 overflow-y-auto p-6 lg:p-8 scroll-smooth">
                <div className="max-w-[1200px] mx-auto flex flex-col gap-8 pb-20">

                    {/* Identity Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-6 bg-white p-6 rounded-[28px] border border-slate-200 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="size-16 rounded-full bg-slate-100 flex items-center justify-center border-4 border-white ring-1 ring-slate-200 shadow-inner overflow-hidden">
                                <img src="https://i.pravatar.cc/150?u=counsellor" className="size-full object-cover" alt="" />
                            </div>
                            <div>
                                <h2 className="text-xl font-black text-slate-900 leading-tight">Institutional Portfolio</h2>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Manager ID: #EA-CORP-042</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <button onClick={() => navigate('/Superadmin/universities')} className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-lg shadow-slate-900/20 hover:bg-black transition-all flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">add_business</span>
                                Onboard University
                            </button>
                            <button onClick={() => navigate('/Superadmin/university-portal/posts-feed/new')} className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px]">bolt</span>
                                Start Broadcast
                            </button>
                        </div>
                    </div>

                    {/* Operational KPIs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { label: 'My Universities', val: stats.myUniversities, icon: 'account_balance', color: 'text-blue-600', bg: 'bg-blue-50', link: '/Superadmin/universities' },
                            { label: 'Active Programs', val: stats.myCourses, icon: 'library_books', color: 'text-purple-600', bg: 'bg-purple-50', link: '#' },
                            { label: 'Live Broadcasts', val: stats.myBroadcasts, icon: 'campaign', color: 'text-orange-600', bg: 'bg-orange-50', link: '/Superadmin/university-portal/posts-feed' },
                            { label: 'Student Leads', val: stats.dailyLeads, icon: 'person_add', color: 'text-emerald-600', bg: 'bg-emerald-50', link: '/Superadmin/counsellor-portal/students' },
                        ].map((kpi, i) => (
                            <Link to={kpi.link} key={i} className="bg-white p-5 rounded-[24px] border border-slate-200 shadow-sm hover:border-slate-300 transition-all group active:scale-95">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-2.5 ${kpi.bg} ${kpi.color} rounded-2xl`}>
                                        <span className="material-symbols-outlined !text-[24px]">{kpi.icon}</span>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-300 text-sm group-hover:text-slate-900 transition-colors">open_in_new</span>
                                </div>
                                <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.1em] mb-1">{kpi.label}</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-black text-slate-900">{kpi.val}</span>
                                    <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded-md leading-none">↑ 8%</span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Content & Schedule Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                        {/* Session Queue */}
                        <div className="lg:col-span-7 space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Upcoming Consultations</h3>
                                <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">{sessions.length} Scheduled</span>
                            </div>

                            <div className="flex flex-col gap-3">
                                {sessions.length === 0 ? (
                                    <div className="p-12 text-center bg-white border border-slate-200 rounded-[32px]">
                                        <p className="text-slate-400 font-bold italic">No active meetings in queue.</p>
                                    </div>
                                ) : (
                                    sessions.map((session, i) => (
                                        <div key={i} className="bg-white p-5 rounded-[24px] border border-slate-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow group">
                                            <div className="size-16 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center shrink-0">
                                                <span className="text-[10px] font-black text-slate-400 uppercase leading-none mb-1">JAN</span>
                                                <span className="text-xl font-black text-slate-900 leading-none">16</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-bold text-slate-900 truncate">{session.studentName}</h4>
                                                    <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full border ${session.mode === 'video' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                                                        {session.mode}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium italic">
                                                    <span className="material-symbols-outlined !text-[12px]">topic</span>
                                                    <span className="truncate">{session.topic}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleStartSession(session)}
                                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all group-hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/20"
                                            >
                                                Connect
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            <button onClick={() => navigate('/Superadmin/counsellor-portal/schedule')} className="w-full py-4 border-2 border-dashed border-slate-200 rounded-[24px] text-slate-400 font-black text-xs uppercase tracking-widest hover:border-slate-400 hover:text-slate-600 transition-all">
                                View Full Calendar
                            </button>
                        </div>

                        {/* Recent Institutional Updates */}
                        <div className="lg:col-span-5 space-y-6">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest">Portfolio Activity</h3>

                            <div className="bg-slate-900 rounded-[32px] p-8 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 size-40 bg-white/10 blur-3xl -mr-20 -mt-20" />
                                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6 relative z-10">Broadcast Reach</h4>
                                <div className="space-y-6 relative z-10">
                                    <div className="flex items-end justify-between">
                                        <div>
                                            <div className="text-3xl font-black">4,284</div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">Total Impressions</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-emerald-400 text-xs font-black">↑ 24%</div>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">v. Last Week</p>
                                        </div>
                                    </div>
                                    <div className="h-24 flex items-end gap-1.5">
                                        {[40, 70, 45, 90, 65, 80, 55, 75, 60, 85].map((h, i) => (
                                            <div key={i} className="flex-1 bg-white/10 rounded-t-sm hover:bg-blue-400 transition-colors cursor-help" style={{ height: `${h}%` }} title={`${h}% Reach`} />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white border border-slate-200 rounded-[32px] p-8">
                                <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-6 px-1">Institutional Leads</h4>
                                <div className="space-y-4">
                                    {[
                                        { name: 'Stanford App Pack', time: '12m ago', type: 'High Priority' },
                                        { name: 'MIT scholarship inquiry', time: '1h ago', type: 'Normal' },
                                        { name: 'UBC document validation', time: '4h ago', type: 'Urgent' },
                                    ].map((lead, i) => (
                                        <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer">
                                            <div>
                                                <p className="text-xs font-black text-slate-900 italic">{lead.name}</p>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase mt-0.5">{lead.time}</p>
                                            </div>
                                            <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-md ${lead.type === 'Urgent' ? 'bg-red-50 text-red-600' : lead.type === 'High Priority' ? 'bg-orange-50 text-orange-600' : 'bg-slate-100 text-slate-500'}`}>
                                                {lead.type}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ConsultantDashboard;

