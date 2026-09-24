import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou: React.FC = () => {
    return (
        <div className="min-h-screen bg-white relative overflow-hidden flex items-center justify-center py-20 px-4">
            {/* Grid Background */}
            <div className="absolute inset-0 z-0 opacity-[0.03]" 
                 style={{ backgroundImage: 'linear-gradient(purple 1px, transparent 1px), linear-gradient(90deg, purple 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
            </div>

            {/* Gradient Blobs */}
            <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-purple-200/50 rounded-full blur-3xl z-0"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-primary-light/50 rounded-full blur-3xl z-0"></div>

            <div className="max-w-2xl w-full bg-white/80 backdrop-blur-xl border border-purple-100 p-8 md:p-12 rounded-[32px] shadow-2xl shadow-purple-200/50 text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-purple-600/30 animate-in zoom-in duration-500 delay-200">
                    <span className="material-symbols-outlined text-5xl text-white">check_circle</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-black text-purple-950 mb-4">
                    Inquiry Received!
                </h1>
                <p className="text-lg text-slate-600 mb-10 max-w-md mx-auto">
                    Your request has been synchronized with the Eduwoy Institutional Vault. Our team will connect you soon...
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10 text-left">
                    <div className="p-6 bg-primary-light/50 rounded-2xl border border-purple-100">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                <span className="material-symbols-outlined text-primary">calendar_today</span>
                            </div>
                            <span className="font-bold text-primary-dark">Next Steps</span>
                        </div>
                        <p className="text-sm text-primary-hover/80 leading-relaxed">
                            Check your email for a confirmation and our 2025 Global Study Guide.
                        </p>
                    </div>
                    <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                <span className="material-symbols-outlined text-slate-600">auto_stories</span>
                            </div>
                            <span className="font-bold text-slate-900">Resource Hub</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            While you wait, explore our latest global insights and scholarship alerts.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link 
                        to="/" 
                        className="flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-primary hover:bg-primary-light/20-dark text-primary font-bold rounded-full font-bold hover:bg-white border-2 border-primary hover:bg-primary-light/20-dark transition-all shadow-lg shadow-purple-900/20 group"
                    >
                        <span className="material-symbols-outlined">home</span>
                        Back to Home
                    </Link>
                    <Link 
                        to="/blogs" 
                        className="flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-dark border-2 border-purple-100 rounded-full font-bold hover:bg-primary-light/50 transition-all group"
                    >
                        Explore Blogs
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ThankYou;
