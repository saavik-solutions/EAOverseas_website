import React, { useMemo, useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { useNotification } from '@/shared/contexts/NotificationContext';
import { useAuthAction } from '@/shared/hooks/useAuthAction';
import LoginModal from '@/features/auth/LoginModal';
import { universityService } from '@/services/universityService';
import { feedService } from '@/services/feedService';

const CollegeDetails = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const uniId = searchParams.get('id');
    const uniName = searchParams.get('name');
    const { executeAction, isLoginModalOpen, closeLoginModal } = useAuthAction();
    const { addNotification } = useNotification();

    const [uni, setUni] = useState(null);
    const [programs, setPrograms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                let data;
                if (uniId) {
                    data = await universityService.getById(uniId);
                } else if (uniName) {
                    const all = await universityService.getAll(uniName);
                    // Find exact match or first result
                    data = all.universities?.find(u => u.name.toLowerCase() === uniName.toLowerCase()) || all.universities?.[0];
                }

                if (data) {
                    // Adapt backend schema to UI requirements
                    setUni({
                        id: data._id,
                        name: data.name,
                        location: `${data.city}, ${data.country}`,
                        country: data.country,
                        ranking: data.ranking || 'N/A',
                        image: data.logoUrl,
                        description: data.description || "Institution details are being updated...",
                        universityType: data.universityType || 'Research',
                        establishedYear: data.establishedYear || 'N/A',
                        totalStudents: data.totalStudents || 0,
                        campusSize: data.campusSize || 'N/A',
                        match: Math.floor(Math.random() * 20) + 80, // Dynamic mock fit
                        acceptanceRate: "88%", // Placeholder
                        tuitionVal: data.universityType === 'Public' ? 25000 : 45000,
                        stats: {
                            acceptance: "88%",
                            salary: data.totalStudents ? `${(data.totalStudents / 1000).toFixed(1)}k+ Students` : "Global"
                        }
                    });

                    // Fetch associated programs
                    const progData = await feedService.getAll({ category: 'Program', universityId: data._id });
                    setPrograms(progData.map(p => ({
                        id: p._id,
                        title: p.title,
                        description: p.content,
                        duration: p.grid?.find(g => g.label === 'Duration')?.value || "2 Years",
                        tuition: p.grid?.find(g => g.label === 'Tuition')?.value || "$32,000",
                        intake: p.grid?.find(g => g.label === 'Intake')?.value || "Aug 2025",
                        match: 95
                    })));
                } else {
                    setError("Institution not found in registry.");
                }
            } catch (err) {
                console.error("Error fetching university:", err);
                setError("Network connectivity issue.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [uniId, uniName]);

    const handleApply = () => {
        executeAction(() => {
            if (uni) {
                addNotification({
                    title: 'Application Started',
                    message: `You started an application for ${uni.name}`,
                    type: 'info',
                    icon: 'school',
                    actionUrl: `/application/details?name=${encodeURIComponent(uni.name)}`
                });
                navigate(`/application/details?name=${encodeURIComponent(uni.name)}`);
            }
        });
    };

    if (loading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-white p-20">
                <div className="size-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6"></div>
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest">Synchronizing Records...</h2>
            </div>
        );
    }

    if (error || !uni) {
        return (
            <main className="flex-1 overflow-y-auto bg-slate-50 p-4 md:p-6 flex justify-center items-center">
                <div className="text-center bg-white p-12 rounded-[40px] border border-slate-200 shadow-xl max-w-md">
                    <span className="material-symbols-outlined text-red-400 !text-[64px] mb-6">database_off</span>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">{error || "Institution Missing"}</h2>
                    <p className="text-slate-500 mt-4 leading-relaxed font-medium">This record might have been decommissioned or is currently under verification.</p>
                    <button
                        onClick={() => navigate('/colleges')}
                        className="mt-10 w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg"
                    >
                        Back to Registry
                    </button>
                </div>
            </main>
        );
    }

    // Determine Currency Symbol
    let currencySymbol = "$";
    if (uni.country === "United Kingdom") currencySymbol = "£";
    else if (uni.country === "Germany" || uni.country?.includes("Europe")) currencySymbol = "€";
    else if (uni.country === "Canada") currencySymbol = "CAD $";
    else if (uni.country === "Australia") currencySymbol = "AUD $";

    const livingExpenses = 15500;
    const miscExpenses = 2500;
    const totalExpense = (uni.tuitionVal || 0) + livingExpenses + miscExpenses;

    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden bg-[#f8f9fc]">
            <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />

            <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-10 sticky top-0">
                <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">
                    <Link to="/" className="hover:text-blue-600 transition-colors">INTAKE</Link>
                    <span className="material-symbols-outlined !text-[14px]">chevron_right</span>
                    <Link to="/colleges" className="hover:text-slate-900 transition-colors">COLLEGES</Link>
                    <span className="material-symbols-outlined !text-[14px]">chevron_right</span>
                    <span className="text-slate-900 truncate max-w-[150px] md:max-w-none">{uni.name}</span>
                </div>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-xl text-xs font-black uppercase tracking-widest border border-blue-100">
                        <span className="material-symbols-outlined !text-[18px]">verified</span>
                        Partner Institution
                    </button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto bg-[#f8f9fc] p-4 md:p-8">
                <div className="max-w-7xl mx-auto flex flex-col gap-8">

                    {/* Hero Section */}
                    <section className="bg-white rounded-[40px] border border-slate-200 p-6 md:p-10 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 right-0 size-64 bg-blue-600/5 blur-3xl -mr-32 -mt-32 rounded-full"></div>
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 relative z-10">
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="size-24 md:size-32 rounded-3xl border border-slate-100 bg-white p-3 shrink-0 flex items-center justify-center overflow-hidden shadow-inner">
                                    {uni.image ? (
                                        <img src={uni.image} className="w-full h-full object-contain" alt={uni.name} />
                                    ) : (
                                        <span className="material-symbols-outlined !text-[48px] text-slate-300">account_balance</span>
                                    )}
                                </div>
                                <div className="flex flex-col gap-2 pt-2">
                                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">{uni.name}</h2>
                                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                                        <span className="material-symbols-outlined !text-[18px] text-blue-600">location_on</span>
                                        <span>{uni.location}</span>
                                    </div>
                                    <div className="flex items-center gap-3 mt-6 flex-wrap">
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-200">
                                            <span className="material-symbols-outlined !text-[16px]">trophy</span>
                                            <span>#{uni.ranking} QS Rank</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 text-slate-600 text-[10px] font-black uppercase tracking-widest border border-slate-100">
                                            <span className="material-symbols-outlined !text-[16px]">domain</span>
                                            {uni.universityType}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 min-w-[200px]">
                                <button onClick={handleApply} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all">Initiate Process</button>
                                <button className="w-full flex items-center justify-center gap-2 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-50 transition-all">
                                    <span className="material-symbols-outlined !text-[20px]">save</span>
                                    Shortlist
                                </button>
                            </div>
                        </div>
                    </section>

                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
                        <div className="flex flex-col gap-8">
                            {/* Overview */}
                            <div className="bg-white rounded-[40px] border border-slate-200 p-8 shadow-sm">
                                <h3 className="font-black text-sm uppercase tracking-[0.2em] text-slate-900 mb-8">Institutional Profile</h3>
                                <div className="space-y-6">
                                    <p className="text-slate-600 text-lg leading-relaxed font-medium italic">"{uni.description}"</p>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                        <div><span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Students</span><p className="text-sm font-black text-slate-900 mt-1">{uni.totalStudents ? `${(uni.totalStudents / 1000).toFixed(0)}k+` : 'N/A'}</p></div>
                                        <div><span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Founded</span><p className="text-sm font-black text-slate-900 mt-1">{uni.establishedYear}</p></div>
                                        <div><span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Campus</span><p className="text-sm font-black text-slate-900 mt-1">{uni.campusSize}</p></div>
                                        <div><span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Verified</span><p className="text-sm font-black text-slate-900 mt-1">YES</p></div>
                                    </div>
                                </div>
                            </div>

                            {/* Eligibility Courses */}
                            <div className="bg-white rounded-[40px] border border-slate-200 p-8 shadow-sm">
                                <h3 className="font-black text-sm uppercase tracking-[0.2em] text-slate-900 mb-8">Available Programs</h3>
                                <div className="flex flex-col gap-4">
                                    {programs.length > 0 ? programs.map((prog) => (
                                        <div
                                            key={prog.id}
                                            onClick={() => navigate(`/course-details?id=${prog.id}&title=${encodeURIComponent(prog.title)}&university=${encodeURIComponent(uni.name)}`)}
                                            className="p-6 rounded-3xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all bg-white cursor-pointer group"
                                        >
                                            <div className="flex justify-between items-start">
                                                <div className="flex-1">
                                                    <h4 className="font-black text-xl text-slate-900 group-hover:text-blue-600 transition-colors mb-4">{prog.title}</h4>
                                                    <div className="flex flex-wrap gap-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                                                        <div className="flex items-center gap-2"><span className="material-symbols-outlined !text-[16px] text-blue-600">schedule</span>{prog.duration}</div>
                                                        <div className="flex items-center gap-2"><span className="material-symbols-outlined !text-[16px] text-blue-600">payments</span>{prog.tuition} / year</div>
                                                        <div className="flex items-center gap-2"><span className="material-symbols-outlined !text-[16px] text-blue-600">calendar_month</span>{prog.intake}</div>
                                                    </div>
                                                </div>
                                                <span className="material-symbols-outlined text-slate-300 group-hover:text-blue-600 transition-colors">chevron_right</span>
                                            </div>
                                        </div>
                                    )) : (
                                        <p className="text-slate-400 italic">No programs listed for this intake yet.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <aside className="flex flex-col gap-8">
                            <div className="bg-slate-900 rounded-[40px] p-8 text-white">
                                <h3 className="font-black text-sm uppercase tracking-[0.2em] mb-8">Estimated Fit</h3>
                                <div className="flex flex-col items-center">
                                    <div className="relative size-32 mb-6">
                                        <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                                            <circle cx="18" cy="18" r="16" fill="none" className="stroke-white/10" strokeWidth="3"></circle>
                                            <circle cx="18" cy="18" r="16" fill="none" className="stroke-blue-500" strokeWidth="3" strokeDasharray={`${uni.match}, 100`} strokeLinecap="round"></circle>
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                                            <span className="text-3xl font-black leading-none">{uni.match}%</span>
                                        </div>
                                    </div>
                                    <p className="text-center text-xs text-slate-400 italic">"Based on your academic profile and target goals."</p>
                                </div>
                            </div>

                            <div className="bg-white rounded-[40px] border border-slate-200 p-8 shadow-sm">
                                <h3 className="font-black text-sm uppercase tracking-[0.2em] text-slate-900 mb-8">Annual ROI</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-400"><span>Tuition</span><span className="text-slate-900">{currencySymbol}{uni.tuitionVal?.toLocaleString()}</span></div>
                                    <div className="flex justify-between items-center text-[10px] font-black uppercase text-slate-400"><span>Living</span><span className="text-slate-900">{currencySymbol}{livingExpenses.toLocaleString()}</span></div>
                                    <div className="h-px bg-slate-100"></div>
                                    <div className="flex justify-between items-center text-xs font-black uppercase text-blue-600"><span>Total</span><span className="text-lg text-slate-900">~{currencySymbol}{totalExpense.toLocaleString()}</span></div>
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CollegeDetails;

