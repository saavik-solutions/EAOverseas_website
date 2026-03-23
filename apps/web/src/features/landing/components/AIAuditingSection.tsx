import React from 'react';

const AIAuditingSection = () => {
    return (
        <section className="relative w-full bg-transparent py-20 md:py-32 overflow-hidden text-slate-900 border-t border-purple-100/50">
            {/* Background Glow Effects (Purple Themed) */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-[1200px] mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-16">
                
                {/* Left Column: Content */}
                <div className="flex-1 space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-200 rounded-full shadow-sm">
                        <span className="material-symbols-outlined text-purple-600 text-sm">auto_awesome</span>
                        <span className="text-purple-700 font-bold text-sm tracking-wide uppercase">AI-Powered Intelligence</span>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
                        Predict Your Success with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-600">Data-Driven Precision.</span>
                    </h2>
                    
                    <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                        We don't rely on guesswork. Our proprietary AI engine analyzes millions of successful admission data points to instantly match your unique profile with universities where you are statistically most likely to succeed.
                    </p>

                    <div className="space-y-6 pt-4">
                        <div className="flex gap-4 group cursor-pointer hover:-translate-y-1 transition-transform">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center border border-purple-200 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                                <span className="material-symbols-outlined text-purple-600 group-hover:text-white transition-colors">query_stats</span>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-slate-800 group-hover:text-purple-700 transition-colors">Smart Profile Auditing</h4>
                                <p className="text-slate-600 mt-1">Deep alignment checks of your scores, essays, and background against historical university criteria.</p>
                            </div>
                        </div>

                        <div className="flex gap-4 group cursor-pointer hover:-translate-y-1 transition-transform">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center border border-purple-200 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                                <span className="material-symbols-outlined text-purple-600 group-hover:text-white transition-colors">target</span>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-slate-800 group-hover:text-purple-700 transition-colors">Predictive Admission Scoring</h4>
                                <p className="text-slate-600 mt-1">Know your realistic chances of acceptance before you even pay an application fee.</p>
                            </div>
                        </div>

                        <div className="flex gap-4 group cursor-pointer hover:-translate-y-1 transition-transform">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center border border-purple-200 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                                <span className="material-symbols-outlined text-purple-600 group-hover:text-white transition-colors">bolt</span>
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-slate-800 group-hover:text-purple-700 transition-colors">Instant University Shortlists</h4>
                                <p className="text-slate-600 mt-1">Get personalized, AI-generated 'Safe', 'Target', and 'Reach' recommendations in seconds.</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Right Column: Dynamic Mock UI Dashboard */}
                <div className="flex-1 relative w-full h-[650px] hidden md:flex items-center justify-center">
                    
                    {/* Ambient Data Particles in Background */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-[10%] left-[20%] w-2 h-2 bg-purple-400/30 rounded-full animate-pulse"></div>
                        <div className="absolute bottom-[15%] left-[30%] w-3 h-3 bg-fuchsia-400/20 rounded-full animate-pulse [animation-delay:1s]"></div>
                        <div className="absolute top-[20%] right-[15%] w-2 h-2 bg-purple-500/20 rounded-full animate-pulse [animation-delay:2s]"></div>
                        <div className="absolute bottom-[25%] right-[25%] w-3 h-3 bg-purple-600/10 rounded-full animate-pulse [animation-delay:1.5s]"></div>
                    </div>

                    {/* Abstract Data Streams / Connecting Lines */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-40">
                        <svg className="w-full h-full pb-20" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path id="path0" d="M 120 250 C 180 250 250 120 380 120" stroke="url(#paint0_linear)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dash_20s_linear_infinite]" />
                            <path id="path1" d="M 120 250 C 180 250 250 250 380 250" stroke="url(#paint1_linear)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dash_15s_linear_infinite]" />
                            <path id="path2" d="M 120 250 C 180 250 250 420 380 420" stroke="url(#paint2_linear)" strokeWidth="1.5" strokeDasharray="4 4" className="animate-[dash_25s_linear_infinite]" />
                            
                            {/* Data Particles moving along paths */}
                            <circle r="3" fill="#9333ea" className="animate-[moveParticle0_4s_linear_infinite] filter blur-[1px]">
                                <animateMotion dur="4s" repeatCount="indefinite" path="M 120 250 C 180 250 250 120 380 120" />
                            </circle>
                            <circle r="3" fill="#d946ef" className="animate-[moveParticle1_3s_linear_infinite] filter blur-[1px]">
                                <animateMotion dur="3s" repeatCount="indefinite" path="M 120 250 C 180 250 250 250 380 250" />
                            </circle>
                            <circle r="3" fill="#6b21a8" className="animate-[moveParticle2_5s_linear_infinite] filter blur-[1px]">
                                <animateMotion dur="5s" repeatCount="indefinite" path="M 120 250 C 180 250 250 420 380 420" />
                            </circle>

                            <defs>
                                <linearGradient id="paint0_linear" x1="120" y1="250" x2="380" y2="120" gradientUnits="userSpaceOnUse"><stop stopColor="#9333ea" /><stop offset="1" stopColor="#d946ef" /></linearGradient>
                                <linearGradient id="paint1_linear" x1="120" y1="250" x2="380" y2="250" gradientUnits="userSpaceOnUse"><stop stopColor="#9333ea" /><stop offset="1" stopColor="#a855f7" /></linearGradient>
                                <linearGradient id="paint2_linear" x1="120" y1="250" x2="380" y2="420" gradientUnits="userSpaceOnUse"><stop stopColor="#9333ea" /><stop offset="1" stopColor="#6b21a8" /></linearGradient>
                            </defs>
                        </svg>
                    </div>

                    {/* Candidate Source Card (Floating Left) */}
                    <div className="absolute left-[2%] top-[35%] w-64 p-5 bg-white/90 backdrop-blur-xl border border-purple-200/50 rounded-2xl shadow-2xl shadow-purple-900/10 animate-[float_6s_ease-in-out_infinite,flicker_10s_infinite] overflow-hidden group z-20">
                        {/* Scanning Line Effect */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-40 animate-[scanline_3s_linear_infinite] pointer-events-none"></div>
                        
                        <div className="flex items-center gap-4 border-b border-purple-100 pb-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-fuchsia-500 p-[2px]">
                                <div className="w-full h-full bg-white rounded-full flex items-center justify-center relative overflow-hidden">
                                    <span className="material-symbols-outlined text-purple-600 relative z-10">person</span>
                                    <div className="absolute inset-0 bg-purple-100/50 animate-pulse"></div>
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-purple-500 font-black tracking-[0.1em] uppercase">Profiles Scan</div>
                                <div className="text-slate-900 font-bold flex items-center gap-2">
                                    Analyzing...
                                    <span className="flex gap-1">
                                        <span className="w-1 h-1 bg-purple-600 rounded-full animate-bounce"></span>
                                        <span className="w-1 h-1 bg-purple-600 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                        <span className="w-1 h-1 bg-purple-600 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-3 relative">
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase text-slate-500 tracking-wider">
                                <span>Academic Index</span>
                                <span className="text-purple-600 font-mono">94.2</span>
                            </div>
                            <div className="w-full bg-purple-50 rounded-full h-1.5 overflow-hidden relative">
                                <div className="bg-gradient-to-r from-purple-500 to-fuchsia-500 h-1.5 rounded-full w-[85%] shadow-sm relative z-10"></div>
                                <div className="absolute inset-0 bg-white/30 skew-x-12 translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
                            </div>
                            <div className="flex justify-between items-center text-[11px] font-bold uppercase text-slate-500 tracking-wider pt-2">
                                <span>Extracurriculars</span>
                                <span className="text-purple-600 font-mono">Strong</span>
                            </div>
                            <div className="w-full bg-purple-50 rounded-full h-1.5 overflow-hidden relative">
                                <div className="bg-gradient-to-r from-purple-500 to-fuchsia-500 h-1.5 rounded-full w-[92%] shadow-sm relative z-10"></div>
                                <div className="absolute inset-0 bg-white/30 skew-x-12 translate-x-[-100%] animate-[shimmer_2s_infinite]"></div>
                            </div>
                        </div>
                    </div>

                    {/* University Target Cards (Floating Right) */}
                    <div className="absolute right-[2%] inset-y-0 py-12 flex flex-col justify-between items-end w-72 z-20 pointer-events-none">
                        <div className="pointer-events-auto">
                            {/* Target 1: Match */}
                            <div className="p-4 bg-white/95 backdrop-blur-xl border border-purple-200/60 rounded-2xl shadow-2xl shadow-purple-900/10 animate-[float_5s_ease-in-out_infinite_1s,flicker_12s_infinite] overflow-hidden group w-64">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-300 to-transparent opacity-20 animate-[scanline_4s_linear_infinite_0.5s]"></div>
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center border border-purple-100 relative overflow-hidden">
                                            <span className="material-symbols-outlined text-purple-600 text-lg relative z-10">school</span>
                                            <div className="absolute inset-x-0 bottom-0 h-1 bg-purple-400 animate-pulse"></div>
                                        </div>
                                        <div className="font-extrabold text-slate-900 leading-tight">University of <br/>Toronto</div>
                                    </div>
                                    <div className="px-2 py-0.5 bg-green-50 border border-green-200 rounded text-green-700 text-[9px] font-black uppercase tracking-wider">SECURE</div>
                                </div>
                                <div className="flex items-end justify-between mt-4 border-t border-purple-50 pt-3">
                                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Probable Success</div>
                                    <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-fuchsia-600 animate-pulse">89%</div>
                                </div>
                            </div>
                        </div>

                        <div className="pointer-events-auto">
                            {/* Target 2: Reach */}
                            <div className="p-4 bg-white/95 backdrop-blur-xl border border-purple-200/60 rounded-2xl shadow-2xl shadow-purple-900/10 animate-[float_7s_ease-in-out_infinite_0.5s,flicker_15s_infinite] overflow-hidden group w-64">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-fuchsia-300 to-transparent opacity-20 animate-[scanline_5s_linear_infinite_1s]"></div>
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-fuchsia-50 flex items-center justify-center border border-fuchsia-100 relative overflow-hidden">
                                            <span className="material-symbols-outlined text-fuchsia-600 text-lg relative z-10">school</span>
                                            <div className="absolute inset-x-0 bottom-0 h-1 bg-fuchsia-400 animate-pulse"></div>
                                        </div>
                                        <div className="font-extrabold text-slate-900 leading-tight text-right">Stanford <br/>University</div>
                                    </div>
                                    <div className="px-2 py-0.5 bg-fuchsia-50 border border-fuchsia-200 rounded text-fuchsia-700 text-[9px] font-black uppercase tracking-wider">AMBITIOUS</div>
                                </div>
                                <div className="flex items-end justify-between mt-4 border-t border-purple-50 pt-3">
                                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">Probable Success</div>
                                    <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-fuchsia-600 to-pink-500 animate-pulse">42%</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Central Processing Core / Match Node (Scaled Up) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] z-10">
                        <div className="relative w-52 h-52 flex items-center justify-center">
                            {/* Orbital Rings */}
                            <div className="absolute inset-0 border-[1.5px] border-purple-400/20 rounded-full animate-[spin_10s_linear_infinite]">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-purple-500 rounded-full shadow-[0_0_15px_#a855f7]"></div>
                            </div>
                            <div className="absolute inset-6 border border-fuchsia-400/10 rounded-full animate-[spin_15s_linear_infinite_reverse]">
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-fuchsia-400 rounded-full shadow-[0_0_10px_#d946ef]"></div>
                            </div>
                            <div className="absolute inset-12 border border-purple-400/5 rounded-full animate-[spin_8s_linear_infinite]"></div>
                            
                            {/* Radar Sweep Effect */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/0 via-purple-500/0 to-purple-500/10 rounded-full animate-[spin_4s_linear_infinite]"></div>
                            
                            <div className="absolute inset-2 bg-purple-400 rounded-full opacity-10 animate-ping"></div>
                            <div className="absolute inset-8 bg-fuchsia-400 rounded-full opacity-20 blur-[40px] animate-pulse"></div>
                            
                            <div className="relative w-28 h-28 bg-white border-2 border-purple-100 rounded-full flex flex-col items-center justify-center shadow-[0_0_50px_rgba(147,51,234,0.2)] z-10 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-purple-50 to-white opacity-40"></div>
                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-slate-900 text-white text-[10px] font-black rounded-full shadow-xl uppercase tracking-[0.2em] whitespace-nowrap animate-pulse border border-slate-700">
                                    AI Engine Sync
                                </div>
                                <span className="material-symbols-outlined text-purple-600 animate-spin-slow text-4xl font-light">progress_activity</span>
                                <div className="text-xs font-black text-purple-800 tracking-widest mt-2">OPTIMIZING</div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Floating CTA Button (Mock UI Version) */}
                    <div className="absolute left-[2%] bottom-[8%] z-30 group">
                        <button className="flex items-center gap-3 px-6 py-4 bg-white/90 backdrop-blur-xl border border-purple-200/50 rounded-2xl shadow-2xl shadow-purple-900/10 hover:shadow-purple-500/20 hover:scale-105 active:scale-95 transition-all duration-300 hover:border-purple-400/50 cursor-pointer animate-[float_8s_ease-in-out_infinite_0.5s]">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-fuchsia-600 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform duration-500">
                                <span className="material-symbols-outlined text-white text-xl animate-pulse">auto_awesome</span>
                            </div>
                            <div className="text-left">
                                <div className="text-[10px] text-purple-600 font-black uppercase tracking-widest leading-none mb-1">Interactive Audit</div>
                                <div className="text-slate-900 font-extrabold text-sm tracking-tight flex items-center gap-2">
                                    Audit My Profile
                                    <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </div>
                            </div>
                        </button>
                        {/* Magnetic Aura Glow */}
                        <div className="absolute inset-0 bg-purple-400/20 blur-[30px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                    </div>

                </div>
            </div>
            
            {/* Inline styles for custom animations specifically for this component */}
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes dash {
                    to { stroke-dashoffset: -100; }
                }
                @keyframes scanline {
                    0% { transform: translateY(0); opacity: 0; }
                    10% { opacity: 0.8; }
                    90% { opacity: 0.8; }
                    100% { transform: translateY(200px); opacity: 0; }
                }
                @keyframes shimmer {
                    100% { transform: translateX(100%); }
                }
                @keyframes flicker {
                    0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100% { opacity: 1; filter: none; }
                    20%, 21.999%, 63%, 63.999%, 65%, 69.999% { opacity: 0.8; filter: blur(0.5px); }
                }
                .animate-spin-slow {
                    animation: spin 3s linear infinite;
                }
            `}} />
        </section>
    );
};

export default AIAuditingSection;
