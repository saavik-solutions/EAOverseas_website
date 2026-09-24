import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SEOHead } from '@/components/common/SEOHead';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <SEOHead 
                title="Page Not Found" 
                description="The page you are looking for does not exist or has been moved."
            />
            <Navbar />
            
            <main className="flex-grow flex items-center justify-center px-6 pt-32 pb-20">
                <div className="max-w-xl w-full text-center space-y-8">
                    <div className="relative inline-block">
                        <h1 className="text-[120px] md:text-[180px] font-black text-slate-100 leading-none select-none">
                            404
                        </h1>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-4xl md:text-5xl font-black text-primary font-bricolage tracking-tight">
                                Lost in Space
                            </span>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <p className="text-lg md:text-xl text-slate-500 font-medium">
                            The page you're searching for seems to have drifted away. 
                            Let's get your academic journey back on track.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                        <button
                            onClick={() => navigate('/')}
                            className="px-8 py-4 bg-white border-2 border-primary hover:bg-primary-light/20 text-primary font-bold font-bold rounded-2xl hover:bg-white border-2 border-primary hover:bg-primary-light/20-hover transition-all hover:translate-y-[-2px] active:translate-y-[0px] shadow-xl shadow-purple-900/20"
                        >
                            Back to Safety
                        </button>
                        <button
                            onClick={() => navigate('/contact')}
                            className="px-8 py-4 bg-white border border-slate-200 text-slate-900 font-bold rounded-2xl hover:bg-slate-50 transition-all hover:translate-y-[-2px] shadow-sm"
                        >
                            Talk to Support
                        </button>
                    </div>

                    <div className="pt-12 grid grid-cols-2 md:grid-cols-3 gap-4 text-left">
                        {[
                            { name: 'Destinations', path: '/countries' },
                            { name: 'Scholarships', path: '/contact' },
                            { name: 'About Us', path: '/about' }
                        ].map(item => (
                            <button
                                key={item.name}
                                onClick={() => navigate(item.path)}
                                className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-purple-200 hover:shadow-md transition-all group"
                            >
                                <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-primary">Quick Link</div>
                                <div className="font-bold text-slate-900">{item.name}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default NotFound;
