import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { universityService } from '@/services/universityService';
import { applicationService } from '@/services/applicationService';
import { feedService } from '@/services/feedService';

interface University {
    _id: string;
    name: string;
    website: string;
    location: string;
    status: string;
    joined: string;
    logo: string;
    about: string;
    type: string;
    accreditation: string;
    contactName: string;
    contactEmail: string;
    contactPhone: string;
    stats: {
        posts: number;
        opportunities: number;
        reach: string;
        score: string;
    }
}

const SuperAdminUniversityProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Profile');
    const [loading, setLoading] = useState(true);
    const [university, setUniversity] = useState<any>(null);
    const [analytics, setAnalytics] = useState<any>(null);
    const [applications, setApplications] = useState<any[]>([]);
    const [posts, setPosts] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState<any>(null);

    useEffect(() => {
        const loadAllData = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const [uniRes, appRes, analyticRes, postRes] = await Promise.all([
                    universityService.getById(id),
                    applicationService.getByUniversity(id),
                    applicationService.getAnalytics(id),
                    feedService.getAll({ universityId: id })
                ]);

                // Format university data
                const baseUni = uniRes.university || uniRes;
                const formattedUni = {
                    ...baseUni,
                    location: `${baseUni.city || ''}, ${baseUni.country || ''}`,
                    joined: baseUni.createdAt ? new Date(baseUni.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Just Now',
                    logo: baseUni.logoUrl || `https://logo.clearbit.com/${baseUni.website?.replace(/^https?:\/\//, '') || 'university.edu'}`,
                    status: baseUni.status || 'Active',
                    about: baseUni.description || 'No overview provided.'
                };

                setUniversity(formattedUni);
                setEditedData(formattedUni);
                setApplications(appRes.applications || []);
                setAnalytics(analyticRes);

                // Filter posts for this university specifically
                const filteredPosts = (postRes.posts || postRes).filter((p: any) =>
                    p.universityId === id || p.universityName === baseUni.name
                );
                setPosts(filteredPosts);

            } catch (err) {
                console.error('Failed to load institutional data', err);
            } finally {
                setLoading(false);
            }
        };

        loadAllData();
    }, [id]);

    const handleSave = async () => {
        try {
            await universityService.update(id!, editedData);
            setUniversity(editedData);
            setIsEditing(false);
        } catch (err) {
            alert('Failed to update university profile');
        }
    };

    if (loading || !university) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="size-12 border-4 border-[#2b6cee]/20 border-t-[#2b6cee] rounded-full animate-spin" />
                    <p className="text-slate-500 font-bold animate-pulse uppercase tracking-widest text-[10px]">Synchronizing Institutional Intelligence...</p>
                </div>
            </div>
        );
    }

    const tabs = ['Profile', 'Programmes', 'Scholarships', 'Analytics', 'Applications', 'Posts'];

    return (
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
            {/* Enterprise Header */}
            <div className="bg-white rounded-[24px] border border-slate-200 overflow-hidden mb-6 shadow-sm">
                <div className="p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                        <div className="flex items-start gap-6">
                            <div className="h-24 w-24 rounded-2xl bg-slate-50 border border-slate-100 p-3 flex items-center justify-center shadow-inner overflow-hidden shrink-0">
                                <img src={university.logo} alt={university.name} className="h-full w-full object-contain" />
                            </div>
                            <div className="flex flex-col gap-2 pt-1">
                                <div className="flex items-center gap-3">
                                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">{university.name}</h1>
                                    <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[14px]">verified</span> Verified
                                    </span>
                                </div>
                                <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-500 text-sm font-bold">
                                    <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px] text-[#2b6cee]">location_on</span> {university.location}</span>
                                    <span className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[18px] text-[#2b6cee]">calendar_today</span> Joined {university.joined}</span>
                                    <a href={university.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[#2b6cee] hover:underline transition-all">
                                        <span className="material-symbols-outlined text-[18px]">link</span> {university.website?.replace(/^https?:\/\//, '')}
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                            <button
                                onClick={() => navigate(`/Superadmin/university-portal/posts-feed/new?universityId=${id}&type=Program`)}
                                className="px-6 py-3 bg-[#2b6cee] text-white hover:bg-blue-700 font-black rounded-xl transition-all text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-100 flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-[18px]">add</span>
                                Add Programme
                            </button>
                            <button
                                onClick={() => setIsEditing(!isEditing)}
                                className="px-6 py-3 bg-slate-900 text-white hover:bg-black font-black rounded-xl transition-all text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-200 flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-[18px]">{isEditing ? 'close' : 'edit_square'}</span>
                                {isEditing ? 'Cancel' : 'Modify Profile'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tab Bar Integration */}
                <div className="px-8 border-t border-slate-50 flex items-center gap-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-4 text-xs font-black uppercase tracking-[0.15em] transition-all relative ${activeTab === tab ? 'text-[#2b6cee]' : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            {tab}
                            {activeTab === tab && (
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2b6cee] rounded-t-full shadow-[0_-4px_12px_rgba(43,108,238,0.3)]" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-6">
                {activeTab === 'Profile' && <ProfileView uni={university} isEditing={isEditing} editedData={editedData} setEditedData={setEditedData} handleSave={handleSave} />}
                {activeTab === 'Programmes' && <ProgrammesView posts={posts.filter(p => p.category === 'Program')} id={id} name={university.name} navigate={navigate} />}
                {activeTab === 'Scholarships' && <ScholarshipsView posts={posts.filter(p => p.category === 'Scholarship')} id={id} name={university.name} navigate={navigate} />}
                {activeTab === 'Analytics' && <AnalyticsView analytics={analytics} name={university.name} />}
                {activeTab === 'Applications' && <ApplicationsView applications={applications} />}
                {activeTab === 'Posts' && <PostsView posts={posts.filter(p => p.category !== 'Program' && p.category !== 'Scholarship')} name={university.name} navigate={navigate} id={id} />}
            </div>
        </main>
    );
};

// ── Profile Tab ─────────────────────────────────────────────────────────────
const ProfileView = ({ uni, isEditing, editedData, setEditedData, handleSave }: any) => (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                    <span className="size-8 rounded-xl bg-blue-50 text-[#2b6cee] flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px]">info</span>
                    </span>
                    Institutional Overview
                </h3>
                {isEditing ? (
                    <textarea
                        value={editedData.about}
                        onChange={(e) => setEditedData({ ...editedData, about: e.target.value })}
                        className="w-full h-48 p-5 text-slate-700 leading-relaxed font-medium bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:border-[#2b6cee] transition-all resize-none"
                    />
                ) : (
                    <p className="text-slate-600 leading-relaxed font-medium text-[16px]">
                        {uni.about}
                    </p>
                )}

                <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block mb-2">University Classification</span>
                        <span className="text-base font-bold text-slate-900">{uni.universityType || 'Global Research'}</span>
                    </div>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest block mb-2">Regional Accreditation</span>
                        <span className="text-base font-bold text-slate-900">{uni.accreditation || 'Quality Verified'}</span>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100">
                    <h4 className="text-[10px] text-slate-400 uppercase font-black tracking-widest mb-4">Official Social Presence</h4>
                    {isEditing ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {['linkedin', 'twitter', 'facebook', 'instagram'].map(platform => (
                                <div key={platform} className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                                    <span className="text-[10px] font-black uppercase text-slate-400 w-20">{platform}</span>
                                    <input
                                        type="text"
                                        placeholder={`https://${platform}.com/uni`}
                                        value={editedData.socialLinks?.[platform] || ''}
                                        onChange={(e) => setEditedData({
                                            ...editedData,
                                            socialLinks: { ... (editedData.socialLinks || {}), [platform]: e.target.value }
                                        })}
                                        className="flex-1 bg-transparent border-none focus:ring-0 text-xs font-bold text-slate-700"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-4">
                            {['linkedin', 'twitter', 'facebook', 'instagram'].map(platform => (
                                uni.socialLinks?.[platform] ? (
                                    <a
                                        key={platform}
                                        href={uni.socialLinks[platform]}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 transition-all group"
                                    >
                                        <img src={`https://cdn-icons-png.flaticon.com/512/${platform === 'linkedin' ? '174/174857' : platform === 'twitter' ? '5968/5968830' : platform === 'facebook' ? '5968/5968764' : '2111/2111463'}.webp`} className="size-4 grayscale group-hover:grayscale-0 transition-all" alt={platform} />
                                        <span className="text-[10px] font-black uppercase text-slate-500">{platform}</span>
                                    </a>
                                ) : null
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] mb-8 flex items-center gap-3">
                    <span className="size-8 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[20px]">school</span>
                    </span>
                    Program Highlights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(uni.courses?.length > 0 ? uni.courses : [
                        { degree: 'Masters', specialization: 'Data Intelligence', duration: '2 Years' },
                        { degree: 'Bachelors', specialization: 'Finance & Tech', duration: '4 Years' }
                    ]).map((course: any, idx: number) => (
                        <div key={idx} className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:border-[#2b6cee]/30 transition-all cursor-default">
                            <h4 className="font-bold text-slate-900">{course.degree} in {course.specialization}</h4>
                            <p className="text-[10px] text-slate-400 font-black uppercase mt-1 tracking-widest">{course.duration}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <div className="space-y-6">
            <div className="bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 size-32 bg-[#2b6cee]/20 blur-2xl -mr-16 -mt-16 rounded-full" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] mb-6 opacity-60">Primary Liaison</h3>
                <div className="space-y-6 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                            <span className="material-symbols-outlined text-white">person</span>
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Authorized Official</p>
                            <p className="font-bold text-sm">Dr. Sarah Mitchell</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="size-12 rounded-full bg-white/10 flex items-center justify-center border border-white/10">
                            <span className="material-symbols-outlined text-white">mail</span>
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Secure Email</p>
                            <p className="font-bold text-sm">admissions@university.edu</p>
                        </div>
                    </div>
                </div>
                {isEditing && (
                    <button
                        onClick={handleSave}
                        className="w-full mt-8 py-4 bg-[#2b6cee] hover:bg-[#2b6cee]/90 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg shadow-blue-900/40"
                    >
                        Save Configuration
                    </button>
                )}
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] mb-6">World Rankings</h3>
                <div className="space-y-4">
                    <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Global Ranking</span>
                        <span className="text-xl font-black text-[#2b6cee]">#{uni.globalRanking || 'Top 100'}</span>
                    </div>
                    <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Student Rating</span>
                        <span className="text-xl font-black text-amber-500">4.9/5.0</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// ── Analytics Tab ──────────────────────────────────────────────────────────
const AnalyticsView = ({ analytics, name }: any) => {
    if (!analytics) return null;

    // Simple Dynamic SVG Line Chart for Visits
    const history = analytics.visitHistory || [];
    const maxVisits = Math.max(...history.map((h: any) => h.count), 1);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { label: 'Total Profile Views', value: analytics.visitCount, icon: 'visibility', color: 'text-blue-600', bg: 'bg-blue-50' },
                    { label: 'Total Applications', value: analytics.applicationsCount, icon: 'description', color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { label: 'Conversion Rate', value: ((analytics.applicationsCount / Math.max(analytics.visitCount, 1)) * 100).toFixed(1) + '%', icon: 'auto_graph', color: 'text-purple-600', bg: 'bg-purple-50' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-4">
                        <div className={`${stat.bg} size-12 rounded-2xl flex items-center justify-center ${stat.color}`}>
                            <span className="material-symbols-outlined text-[24px]">{stat.icon}</span>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <h4 className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</h4>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-[32px] border border-slate-200 p-8 shadow-sm">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Student Engagement Activity</h3>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Institutional Visit Trends (Last 7 Days)</p>
                    </div>
                    <div className="flex gap-2">
                        <span className="size-3 rounded-full bg-[#2b6cee]" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Profile Visits</span>
                    </div>
                </div>

                <div className="h-64 w-full flex items-end justify-between gap-4 px-4 overflow-hidden">
                    {history.map((h: any, i: number) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-4 group h-full justify-end">
                            <div className="flex-1 w-full flex items-end justify-center relative">
                                <div
                                    className="w-full bg-[#2b6cee]/10 rounded-t-xl group-hover:bg-[#2b6cee]/20 transition-all cursor-help relative min-h-[4px]"
                                    style={{ height: `${(h.count / maxVisits) * 100}%` }}
                                >
                                    <div className="absolute top-[-30px] left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                        {h.count} Views
                                    </div>
                                    <div className="absolute top-0 left-0 right-0 h-1 bg-[#2b6cee] rounded-full blur-[2px] opacity-20" />
                                </div>
                            </div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{h.date}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em] mb-8">Application Status Distribution</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {Object.entries(analytics.statusDistribution).map(([label, val]: any) => (
                        <div key={label} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col gap-1.5 item-center">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">{label}</span>
                            <span className="text-3xl font-black text-slate-900 text-center">{val}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// ── Applications Tab ───────────────────────────────────────────────────────
const ApplicationsView = ({ applications }: any) => (
    <div className="bg-white rounded-[32px] border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-slate-50 flex justify-between items-center">
            <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Active Application Pipeline</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Real-time student submissions</p>
            </div>
            <button className="bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-slate-400 hover:text-[#2b6cee] transition-all">
                <span className="material-symbols-outlined">filter_list</span>
            </button>
        </div>
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/50">
                    <tr>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Student Identity</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Target Program</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Submission Date</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Status</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {applications.length > 0 ? applications.map((app: any) => (
                        <tr key={app._id} className="hover:bg-slate-50/30 transition-colors group">
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-[#2b6cee]/10 border border-[#2b6cee]/10 p-2 flex items-center justify-center overflow-hidden">
                                        <img src={app.studentId?.avatarUrl || `https://ui-avatars.com/api/?name=${app.studentId?.name}`} alt="Student" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-sm leading-tight">{app.studentId?.name || 'Unknown Student'}</p>
                                        <p className="text-[10px] text-slate-400 font-bold tracking-tight">{app.studentId?.email}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <p className="font-bold text-slate-700 text-sm">{app.programId?.title || 'Unknown Program'}</p>
                                <span className="text-[9px] text-[#2b6cee] font-black uppercase tracking-widest">{app.programId?.category}</span>
                            </td>
                            <td className="px-8 py-6">
                                <p className="text-sm font-bold text-slate-500">{new Date(app.appliedAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                            </td>
                            <td className="px-8 py-6 text-center">
                                <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${app.status === 'Accepted' ? 'bg-emerald-500 text-white shadow-emerald-200' :
                                    app.status === 'Rejected' ? 'bg-rose-500 text-white shadow-rose-200' :
                                        'bg-white border border-slate-200 text-slate-600'
                                    }`}>
                                    {app.status}
                                </span>
                            </td>
                            <td className="px-8 py-6 text-right">
                                <button className="text-slate-400 hover:text-[#2b6cee] transition-all">
                                    <span className="material-symbols-outlined">more_vert</span>
                                </button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={5} className="px-8 py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-sm">
                                <span className="material-symbols-outlined text-4xl mb-3 block opacity-20">inventory_2</span>
                                No Applications Registered
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);

// ── Programmes Tab ────────────────────────────────────────────────────────
const ProgrammesView = ({ posts, id, name, navigate }: any) => (
    <div className="space-y-6">
        <div className="flex justify-between items-center mb-2">
            <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Academic Programmes</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Course offerings from {name}</p>
            </div>
            <button
                onClick={() => navigate(`/Superadmin/university-portal/posts-feed/new?universityId=${id}&type=Program`)}
                className="px-5 py-2.5 bg-[#2b6cee] text-white hover:bg-[#2b6cee]/90 font-black rounded-xl transition-all text-[10px] uppercase tracking-widest shadow-lg shadow-blue-100 flex items-center gap-2"
            >
                <span className="material-symbols-outlined text-[16px]">add</span>
                Add New Programme
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.length > 0 ? posts.map((prog: any) => (
                <div key={prog._id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group border-b-4 border-b-emerald-500">
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                                {prog.postType || 'Program'}
                            </span>
                            <button className="text-slate-300 hover:text-[#2b6cee]">
                                <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                            </button>
                        </div>
                        <h4 className="text-lg font-black text-slate-900 tracking-tight mb-2 group-hover:text-[#2b6cee] transition-colors">{prog.title}</h4>
                        <p className="text-slate-500 text-xs font-medium line-clamp-2 leading-relaxed mb-6">
                            {prog.content}
                        </p>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <span className="text-[8px] text-slate-400 uppercase font-black tracking-widest block">Annual Tuition</span>
                                <span className="text-xs font-bold text-slate-700">{prog.tuitionFee || 'Contact for Fees'}</span>
                            </div>
                            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                <span className="text-[8px] text-slate-400 uppercase font-black tracking-widest block">Duration</span>
                                <span className="text-xs font-bold text-slate-700">{prog.programDuration || 'Varies'}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[16px] text-orange-500">calendar_month</span>
                                <span className="text-[9px] font-black text-slate-400 uppercase">Intake: {prog.intakes || 'Fall / Spring'}</span>
                            </div>
                            <button className="text-[10px] font-black text-[#2b6cee] uppercase tracking-[0.1em] hover:underline">
                                Course Specs
                            </button>
                        </div>
                    </div>
                </div>
            )) : (
                <div className="col-span-full py-20 bg-white rounded-[32px] border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 font-bold">
                    <span className="material-symbols-outlined text-4xl mb-3 opacity-20">school</span>
                    No academic programmes registered
                </div>
            )}
        </div>
    </div>
);

// ── Scholarships Tab ──────────────────────────────────────────────────────
const ScholarshipsView = ({ posts, id, name, navigate }: any) => (
    <div className="space-y-6">
        <div className="flex justify-between items-center mb-2">
            <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Active Scholarships</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Financial aid from {name}</p>
            </div>
            <button
                onClick={() => navigate(`/Superadmin/university-portal/posts-feed/new?universityId=${id}&type=Scholarship`)}
                className="px-5 py-2.5 bg-amber-500 text-white hover:bg-amber-600 font-black rounded-xl transition-all text-[10px] uppercase tracking-widest shadow-lg shadow-amber-100 flex items-center gap-2"
            >
                <span className="material-symbols-outlined text-[16px]">add</span>
                New Scholarship
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.length > 0 ? posts.map((schol: any) => (
                <div key={schol._id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group border-b-4 border-b-amber-500">
                    <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <span className="bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-amber-100">
                                {schol.postType || 'Scholarship'}
                            </span>
                            <button className="text-slate-300 hover:text-amber-500">
                                <span className="material-symbols-outlined text-[20px]">more_horiz</span>
                            </button>
                        </div>
                        <h4 className="text-lg font-black text-slate-900 tracking-tight mb-2 group-hover:text-amber-500 transition-colors">{schol.title}</h4>
                        <p className="text-slate-500 text-xs font-medium line-clamp-2 leading-relaxed mb-6">
                            {schol.content}
                        </p>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="bg-amber-50/30 p-3 rounded-xl border border-amber-100/50">
                                <span className="text-[8px] text-amber-600 uppercase font-black tracking-widest block">Coverage</span>
                                <span className="text-xs font-bold text-slate-700">{schol.funding || 'Partial Fund'}</span>
                            </div>
                            <div className="bg-rose-50/30 p-3 rounded-xl border border-rose-100/50">
                                <span className="text-[8px] text-rose-600 uppercase font-black tracking-widest block">Deadline</span>
                                <span className="text-xs font-bold text-slate-700">{schol.expiry || 'Open'}</span>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[16px] text-slate-400">group</span>
                                <span className="text-[9px] font-black text-slate-400 uppercase">Level: {schol.academicLevel || 'All Levels'}</span>
                            </div>
                            <button className="text-[10px] font-black text-[#2b6cee] uppercase tracking-[0.1em] hover:underline">
                                Apply Details
                            </button>
                        </div>
                    </div>
                </div>
            )) : (
                <div className="col-span-full py-20 bg-white rounded-[32px] border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 font-bold">
                    <span className="material-symbols-outlined text-4xl mb-3 opacity-20">savings</span>
                    No financial aid programs listed
                </div>
            )}
        </div>
    </div>
);

// ── Posts Tab ─────────────────────────────────────────────────────────────
const PostsView = ({ posts, name, navigate, id }: any) => (
    <div className="space-y-6">
        <div className="flex justify-between items-center mb-2">
            <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Institutional Broadcast Feed</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Direct communications from {name}</p>
            </div>
            <button
                onClick={() => navigate(`/Superadmin/university-portal/posts-feed/new?universityId=${id}&type=Article`)}
                className="px-5 py-2.5 bg-[#2b6cee] text-white hover:bg-[#2b6cee]/90 font-black rounded-xl transition-all text-[10px] uppercase tracking-widest shadow-lg shadow-blue-200 flex items-center gap-2"
            >
                <span className="material-symbols-outlined text-[16px]">add</span>
                New Broadcast
            </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.length > 0 ? posts.map((post: any) => (
                <div key={post._id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col">
                    <div className="h-40 bg-slate-100 relative overflow-hidden">
                        <img
                            src={post.mediaUrls?.[0] || 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=800&h=400&fit=crop'}
                            alt="Banner"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
                        <span className="absolute bottom-4 left-4 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[9px] font-black text-white uppercase tracking-widest">
                            {post.category || 'General'}
                        </span>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                        <h4 className="text-lg font-black text-slate-900 tracking-tight mb-2 line-clamp-1">{post.title}</h4>
                        <p className="text-slate-500 text-xs font-medium line-clamp-2 leading-relaxed mb-6 flex-1">{post.content}</p>
                        <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px] text-[#2b6cee]">thumb_up</span>
                                <span className="text-[10px] font-bold text-slate-400">{post.upvotes?.length || 0}</span>
                            </div>
                            <button className="text-[10px] font-black text-[#2b6cee] uppercase tracking-widest flex items-center gap-1">
                                Read More <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>
            )) : (
                <div className="col-span-full py-20 bg-white rounded-[32px] border border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 font-bold">
                    <span className="material-symbols-outlined text-4xl mb-3 opacity-20">rss_feed</span>
                    No active broadcasts found
                </div>
            )}
        </div>
    </div>
);

export default SuperAdminUniversityProfile;

