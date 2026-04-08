import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Stats {
    totalLeads: number;
    totalBlogs: number;
    newLeads: number;
}

interface RecentLead {
    _id: string;
    name: string;
    email: string;
    source: string;
    createdAt: string;
    status: string;
}

const AdminDashboard = () => {
    const navigate = useNavigate();
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

    const [stats, setStats] = useState<Stats | null>(null);
    const [recentLeads, setRecentLeads] = useState<RecentLead[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch(`${apiUrl}/api/v1/admin/stats`);
                const data = await res.json();
                if (data.success) {
                    setStats(data.stats);
                    setRecentLeads(data.recentLeads || []);
                }
            } catch (err) {
                console.error('Failed to fetch admin stats', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        {
            label: 'Total Leads',
            value: loading ? '—' : stats?.totalLeads?.toLocaleString() ?? '0',
            icon: 'group',
            color: 'purple',
            bgColor: 'bg-purple-50',
            textColor: 'text-purple-600',
            sub: loading ? '...' : `${stats?.newLeads ?? 0} new`,
        },
        {
            label: 'Total Blogs',
            value: loading ? '—' : stats?.totalBlogs?.toLocaleString() ?? '0',
            icon: 'auto_stories',
            color: 'blue',
            bgColor: 'bg-blue-50',
            textColor: 'text-blue-600',
            sub: 'Published',
        },
        {
            label: 'New Inquiries',
            value: loading ? '—' : stats?.newLeads?.toLocaleString() ?? '0',
            icon: 'mark_email_unread',
            color: 'emerald',
            bgColor: 'bg-emerald-50',
            textColor: 'text-emerald-600',
            sub: 'Awaiting response',
        },
        {
            label: 'System Status',
            value: 'Online',
            icon: 'check_circle',
            color: 'green',
            bgColor: 'bg-green-50',
            textColor: 'text-green-600',
            sub: 'All systems nominal',
        },
    ];

    return (
        <div className="space-y-10">
            <div className="space-y-1">
                <h1 className="text-2xl md:text-3xl font-black text-gray-900">Enterprise Dashboard</h1>
                <p className="text-gray-500 font-medium text-sm md:text-base">Live overview of EAOverseas platform metrics.</p>
            </div>

            {/* ── Stats Grid ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, i) => (
                    <div key={i} className="bg-white p-7 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all group">
                        <div className={`w-12 h-12 rounded-2xl ${stat.bgColor} ${stat.textColor} flex items-center justify-center mb-5`}>
                            <span className="material-symbols-outlined text-2xl">{stat.icon}</span>
                        </div>
                        <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                        <h2 className={`text-4xl font-black text-gray-900 ${loading ? 'animate-pulse text-gray-200' : ''}`}>
                            {stat.value}
                        </h2>
                        <p className="text-xs text-gray-400 font-semibold mt-2">{stat.sub}</p>
                    </div>
                ))}
            </div>

            {/* ── Recent Leads + System Panel ── */}
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-4 md:p-8 space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-lg md:text-xl font-black text-gray-900">Recent Lead Traffic</h3>
                        <button
                            onClick={() => navigate('/admin/leads')}
                            className="text-purple-600 font-bold text-sm hover:underline"
                        >
                            View All →
                        </button>
                    </div>

                    <div className="space-y-2">
                        {loading ? (
                            Array.from({ length: 4 }).map((_, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl animate-pulse">
                                    <div className="w-10 h-10 rounded-xl bg-gray-100" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-3 w-1/3 bg-gray-100 rounded-full" />
                                        <div className="h-2.5 w-1/2 bg-gray-100 rounded-full" />
                                    </div>
                                </div>
                            ))
                        ) : recentLeads.length === 0 ? (
                            <div className="py-10 text-center text-gray-400 italic text-sm">
                                No leads yet. Submit a form to see live data here.
                            </div>
                        ) : (
                            recentLeads.map((lead, i) => (
                                <div
                                    key={lead._id}
                                    className="flex items-center justify-between p-4 hover:bg-purple-50/40 rounded-2xl transition-all border border-transparent hover:border-purple-100 cursor-pointer"
                                    onClick={() => navigate('/admin/leads')}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-purple-100 text-purple-700 rounded-xl flex items-center justify-center font-black text-sm">
                                            {lead.name?.charAt(0)?.toUpperCase() || '?'}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm">{lead.name}</p>
                                            <p className="text-xs text-gray-400 font-medium">{lead.source}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] text-gray-400 font-medium hidden sm:block">
                                            {new Date(lead.createdAt).toLocaleDateString()}
                                        </span>
                                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                                            lead.status === 'New'
                                                ? 'bg-emerald-50 text-emerald-600'
                                                : 'bg-gray-100 text-gray-400'
                                        }`}>
                                            {lead.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* System Status Panel */}
                <div className="bg-gray-900 rounded-[2.5rem] p-6 md:p-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 space-y-8">
                        <h3 className="text-2xl font-black text-white leading-tight">System<br />Ready</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-emerald-400">
                                <span className="material-symbols-outlined text-sm">check_circle</span>
                                <span className="text-sm font-bold">Database Sync OK</span>
                            </div>
                            <div className="flex items-center gap-3 text-emerald-400">
                                <span className="material-symbols-outlined text-sm">check_circle</span>
                                <span className="text-sm font-bold">API Gateway Online</span>
                            </div>
                            <div className="flex items-center gap-3 text-emerald-400">
                                <span className="material-symbols-outlined text-sm">check_circle</span>
                                <span className="text-sm font-bold">Lead Vault Active</span>
                            </div>
                            <div className="flex items-center gap-3 text-emerald-400">
                                <span className="material-symbols-outlined text-sm">check_circle</span>
                                <span className="text-sm font-bold">Blog Engine Online</span>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/admin/leads')}
                            className="w-full bg-white text-gray-900 font-black py-4 rounded-2xl shadow-xl shadow-black/20 hover:scale-[1.02] transition-all"
                        >
                            View Lead Vault
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
