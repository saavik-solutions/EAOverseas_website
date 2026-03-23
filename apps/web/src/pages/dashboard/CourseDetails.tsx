import React, { useMemo, useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link, useLocation } from 'react-router-dom';
import { useSavedItems } from '@/shared/contexts/SavedItemsContext';
import { useNotification } from '@/shared/contexts/NotificationContext';
import { useAuthAction } from '@/shared/hooks/useAuthAction';
import LoginModal from '@/features/auth/LoginModal';
import { feedService } from '@/services/feedService';

const CourseDetails = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const courseId = searchParams.get('id');
    const courseTitle = searchParams.get('title');
    const uniName = searchParams.get('university');

    const { executeAction, isLoginModalOpen, closeLoginModal } = useAuthAction();
    const { addNotification } = useNotification();
    const { togglePost, isPostSaved } = useSavedItems();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            setLoading(true);
            try {
                let data;
                if (courseId) {
                    data = await feedService.getById(courseId);
                } else if (courseTitle) {
                    const allParams = { category: 'Program', search: courseTitle };
                    const all = await feedService.getAll(allParams);
                    data = all.find(p => p.title === courseTitle) || all[0];
                }

                if (data) {
                    setCourse({
                        id: data._id,
                        title: data.title,
                        university: data.universityName || uniName || "Partner Institution",
                        location: data.location || "Global Campus",
                        match: 95,
                        duration: data.grid?.find(g => g.label === 'Duration')?.value || "2 Years",
                        tuition: data.grid?.find(g => g.label === 'Tuition')?.value || "$35,000",
                        intake: data.grid?.find(g => g.label === 'Intake')?.value || "Aug 2025",
                        deadline: data.grid?.find(g => g.label === 'Deadline')?.value || "Oct 30, 2024",
                        desc: data.content,
                        career: data.tags || ["Academic Mastery", "Industry Ready"],
                        universityId: data.universityId
                    });
                } else {
                    setError("Program details not found.");
                }
            } catch (err) {
                console.error("Error fetching course:", err);
                setError("Connectivity issue.");
            } finally {
                setLoading(false);
            }
        };
        fetchCourse();
    }, [courseId, courseTitle, uniName]);

    if (loading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center bg-white p-20">
                <div className="size-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-6"></div>
                <h2 className="text-xl font-black text-slate-900 uppercase tracking-widest">Accessing Syllabus...</h2>
            </div>
        );
    }

    if (error || !course) {
        return (
            <main className="flex-1 overflow-y-auto bg-slate-50 p-4 md:p-6 flex justify-center items-center">
                <div className="text-center bg-white p-12 rounded-[40px] border border-slate-200 shadow-xl max-w-md">
                    <span className="material-symbols-outlined text-red-400 !text-[64px] mb-6">school_off</span>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">{error || "Course Missing"}</h2>
                    <p className="text-slate-500 mt-4 leading-relaxed font-medium">This program might have reached capacity or is currently being restructured.</p>
                    <button
                        onClick={() => navigate('/courses')}
                        className="mt-10 w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg"
                    >
                        Explore Programs
                    </button>
                </div>
            </main>
        );
    }

    return (
        <div className="flex flex-col flex-1 h-full bg-[#f8f9fc] overflow-y-auto pb-20">
            <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />

            <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20 px-6 flex items-center justify-between">
                <nav className="flex items-center gap-2 text-[10px] font-black tracking-widest text-slate-400 uppercase">
                    <Link to="/courses" className="hover:text-blue-600">PROGRAMS</Link>
                    <span className="material-symbols-outlined !text-[12px]">chevron_right</span>
                    <span className="text-slate-900">{course.title}</span>
                </nav>
                <div className="flex gap-3">
                    <button
                        onClick={() => executeAction(() => togglePost({ id: course.id, title: course.title }))}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest border transition-all ${isPostSaved({ id: course.id }) ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-white border-slate-200 text-slate-900 hover:bg-slate-50'}`}
                    >
                        <span className="material-symbols-outlined !text-[20px]">{isPostSaved({ id: course.id }) ? 'bookmark' : 'bookmark_add'}</span>
                        {isPostSaved({ id: course.id }) ? 'Reserved' : 'Reserve'}
                    </button>
                    <button
                        onClick={() => navigate(`/application/start?course=${course.id}`)}
                        className="bg-slate-900 text-white px-8 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-black transition-all shadow-lg shadow-slate-200"
                    >
                        Apply Now
                    </button>
                </div>
            </header>

            <div className="max-w-7xl mx-auto w-full p-4 md:p-8 flex flex-col gap-8">

                <section className="bg-white rounded-[40px] border border-slate-200 p-8 md:p-12 relative overflow-hidden group">
                    <div className="absolute bottom-0 right-0 size-64 bg-blue-600/5 blur-3xl -mb-32 -mr-32 rounded-full"></div>
                    <div className="flex flex-col gap-6 relative z-10">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg">Verified Program</span>
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-widest rounded-lg border border-emerald-100">Intake Open</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-none">{course.title}</h1>
                        <p className="text-xl md:text-2xl font-bold text-slate-500 italic opacity-80">{course.university}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2 text-center">Duration</span>
                                <p className="text-xl font-black text-slate-900 text-center">{course.duration}</p>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2 text-center">Base Fees</span>
                                <p className="text-xl font-black text-slate-900 text-center">{course.tuition}</p>
                            </div>
                            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-2 text-center">Deadline</span>
                                <p className="text-xl font-black text-slate-900 text-center text-orange-600">{course.deadline.split(',')[0]}</p>
                            </div>
                            <div className="bg-slate-900 p-6 rounded-3xl shadow-xl shadow-blue-100">
                                <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest block mb-2 text-center">Eligibility</span>
                                <p className="text-xl font-black text-white text-center">{course.match}% Fit</p>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
                    <div className="flex flex-col gap-8">
                        <article className="bg-white rounded-[40px] border border-slate-200 p-8 md:p-10">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 mb-8 flex items-center gap-3">
                                <span className="size-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-900">
                                    <span className="material-symbols-outlined !text-[18px]">menu_book</span>
                                </span>
                                Program Overview
                            </h3>
                            <div
                                className="prose prose-slate prose-lg max-w-none text-slate-600 font-medium leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: course.desc }}
                            />
                        </article>

                        <section className="bg-slate-900 rounded-[40px] p-8 md:p-10 text-white">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/60 mb-8">Career Trajectory</h3>
                            <div className="flex flex-wrap gap-3">
                                {course.career.map((tag, i) => (
                                    <span key={i} className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm font-black uppercase tracking-widest text-blue-400">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>

                    <aside className="flex flex-col gap-8">
                        <div className="bg-white rounded-[40px] border border-slate-200 p-8 shadow-sm">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-900 mb-8">Next Intake</h3>
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="size-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
                                        <span className="material-symbols-outlined">event_available</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Entry Date</p>
                                        <p className="text-lg font-black text-slate-900">{course.intake}</p>
                                    </div>
                                </div>
                                <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100">
                                    <p className="text-[10px] font-black text-orange-700 uppercase tracking-[0.2em] mb-2 text-center">Time Remaining</p>
                                    <p className="text-2xl font-black text-orange-950 text-center tracking-tighter">45 DAYS LEFT</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-[40px] p-8 text-white shadow-2xl shadow-blue-200">
                            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-white/70 mb-8">Expert Support</h3>
                            <p className="text-white/90 font-bold text-lg mb-6 leading-relaxed">"Need help with your statement of purpose for this specific program?"</p>
                            <button className="w-full py-4 bg-white text-blue-600 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-50 transition-all shadow-xl">
                                Talk to Counsellor
                            </button>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;

