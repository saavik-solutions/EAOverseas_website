import React from 'react';

const AIAuditingSection = () => {
    return (
        <section className="relative w-full bg-transparent py-20 md:py-32 overflow-hidden text-slate-900 border-t border-purple-100/50">
            {/* Background Glow Effects (Purple Themed) */}
            <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-fuchsia-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="max-w-[1200px] mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-16">
                
                {/* Left Column: Content */}
                <div className="flex-1 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-full shadow-sm">
                        <span className="material-symbols-outlined text-purple-600 text-sm">auto_awesome</span>
                        <span className="text-purple-700 font-bold text-sm tracking-wide uppercase">AI-Powered Intelligence</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                        Predict Your Success with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600">Data-Driven Precision.</span>
                    </h2>
                    
                    <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                        We don't rely on guesswork. Our proprietary AI engine analyzes millions of successful admission data points to instantly match your unique profile.
                    </p>

                    <div className="grid grid-cols-1 gap-4 pt-4">
                        {[
                            { icon: 'query_stats', title: 'Smart Profile Auditing', text: 'Deep alignment checks against historical university criteria.' },
                            { icon: 'target', title: 'Predictive Admission', text: 'Know your realistic chances before you pay any fees.' },
                            { icon: 'bolt', title: 'Instant Shortlists', text: "AI-generated recommendations in seconds." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4 group cursor-pointer hover:translate-x-1 transition-transform">
                                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center border border-purple-200 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                                    <span className="material-symbols-outlined text-purple-600 group-hover:text-white transition-colors">{item.icon}</span>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-lg font-bold text-slate-800 group-hover:text-purple-700 transition-colors m-0">{item.title}</h4>
                                    <p className="text-slate-600 text-sm mt-0.5 m-0">{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

                {/* Right Column: Dynamic Mock UI Dashboard */}
                <div className="flex-1 relative w-full h-[500px] hidden md:flex items-center justify-center" aria-hidden="true">
                    
                     {/* Simplified Data Streams */}
                    <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none" viewBox="0 0 500 500" fill="none">
                        <path d="M 120 250 C 180 250 250 120 380 120" stroke="url(#paint0_linear)" strokeWidth="1" strokeDasharray="4 4" className="animate-[dash_15s_linear_infinite] will-change-transform" />
                        <path d="M 120 250 C 180 250 250 380 380 380" stroke="url(#paint2_linear)" strokeWidth="1" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite] will-change-transform" />
                        <defs>
                            <linearGradient id="paint0_linear" x1="120" y1="250" x2="380" y2="120" gradientUnits="userSpaceOnUse"><stop stopColor="#9333ea" /><stop offset="1" stopColor="#d946ef" /></linearGradient>
                            <linearGradient id="paint2_linear" x1="120" y1="250" x2="380" y2="380" gradientUnits="userSpaceOnUse"><stop stopColor="#9333ea" /><stop offset="1" stopColor="#6b21a8" /></linearGradient>
                        </defs>
                    </svg>

                    {/* Candidate Source Card */}
                    <div className="absolute left-[5%] top-1/3 w-56 p-4 bg-white border border-purple-100/50 rounded-2xl shadow-xl animate-[float_6s_ease-in-out_infinite] z-20">
                        <div className="flex items-center gap-3 border-b border-purple-50 pb-2 mb-2">
                            <div className="size-8 rounded-full bg-purple-100 flex items-center justify-center">
                                <span className="material-symbols-outlined text-purple-600 text-[18px]">person</span>
                            </div>
                            <div className="text-[10px] text-slate-900 font-bold">Scanning Data...</div>
                        </div>
                        <div className="h-1.5 w-full bg-purple-100 rounded-full overflow-hidden">
                            <div className="h-full bg-purple-600 w-3/4 animate-pulse"></div>
                        </div>
                    </div>

                    {/* University Target Cards */}
                    <div className="absolute right-[5%] inset-y-12 flex flex-col justify-between items-end w-60 z-20">
                        {[
                            { name: 'University of Toronto', chance: '89%' },
                            { name: 'Stanford University', chance: '42%' }
                        ].map((u, i) => (
                            <div key={i} className="p-3 bg-white border border-purple-100/60 rounded-xl shadow-lg w-full animate-[float_5s_ease-in-out_infinite] [animation-delay:0.5s]">
                                <div className="flex justify-between items-center">
                                    <h5 className="text-[11px] font-black text-slate-800">{u.name}</h5>
                                    <span className="text-sm font-black text-purple-600">{u.chance}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Central Processing Core */}
                    <div className="relative w-32 h-32 flex items-center justify-center bg-white border border-purple-100 rounded-full shadow-2xl z-10">
                        <div className="absolute inset-0 border border-purple-200 rounded-full animate-[spin_8s_linear_infinite]">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 size-2 bg-purple-600 rounded-full"></div>
                        </div>
                        <span className="material-symbols-outlined text-purple-600 animate-spin-slow text-2xl">progress_activity</span>
                    </div>
                    
                </div>
            </div>
            
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes dash { to { stroke-dashoffset: -100; } }
                @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
                .animate-spin-slow { animation: spin 3s linear infinite; }
            `}} />
        </section>

    );
};

export default AIAuditingSection;
