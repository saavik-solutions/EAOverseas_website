import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { CONTACTS } from '@/shared/constants/contacts';
import { SEOHead } from '@/components/common/SEOHead';


const ContactUs = () => {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
            const response = await fetch(`${apiUrl}/api/v1/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    source: 'Contact Page',
                    data: formData
                })
            });

            const result = await response.json();
            if (result.success) {
                toast.success('Inquiry Synchronized with Institutional Vault');
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                navigate('/thank-you');
            } else {
                throw new Error(result.message);
            }
        } catch (error: any) {
            toast.error(error.message || 'Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative min-h-[900px] w-full overflow-hidden bg-white">
            <SEOHead 
                title="Contact Us | EAOverseas"
                description="Get in touch with our global education strategists to start architecting your global future."
                image="/assets/visa_success_hero.webp"
            />
            {/* Premium Background Layers */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#f3e8ff_0%,transparent_50%)] opacity-70"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,#eef2ff_0%,transparent_50%)] opacity-70"></div>
            <div className="absolute inset-0 bg-grid-purple opacity-[0.15] pointer-events-none"></div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    
                    {/* ── Left Column: Institutional Info ── */}
                    <div className="space-y-12 animate-fade-in-up">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-[#7a29c2] font-bold text-[11px] tracking-[0.2em] uppercase">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
                                </span>
                                Global Command Center
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.05] tracking-tight font-bricolage">
                                Let's Architect Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7a29c2] to-violet-600">Global Future.</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-medium max-w-xl">
                                Our global strategists provide the elite-level clarity and institutional expertise you need to navigate international education.
                            </p>
                        </div>

                        <div className="grid gap-10">
                            {[
                                { icon: 'mail', label: 'Institutional Email', value: CONTACTS.support.email, color: 'bg-purple-50 text-[#7a29c2]' },
                                { icon: 'call', label: 'Strategic Hotline', value: CONTACTS.support.phone, color: 'bg-indigo-50 text-indigo-600' },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-start gap-6 group">
                                    <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-sm`}>
                                        <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em]">{item.label}</p>
                                        <p className="text-xl font-black text-gray-900 tracking-tight">{item.value}</p>
                                    </div>
                                </div>
                            ))}

                            <div className="flex items-start gap-6 group">
                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600 group-hover:scale-110 transition-all duration-500 shadow-sm text-transparent bg-clip-text bg-gradient-to-br from-slate-400 to-slate-600">
                                    <span className="material-symbols-outlined text-2xl">location_on</span>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em]">Global Headquarters</p>
                                    <a 
                                        href="https://maps.app.goo.gl/wpGfQLZSgCT2c2X49" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="block text-xl font-black text-gray-900 leading-snug hover:text-[#7a29c2] transition-colors tracking-tight"
                                    >
                                        6250 West Park Dr Ste 319,<br />Houston, TX 77057 United States
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Professional Support Badge */}
                        <div className="p-10 bg-[#0f172a] rounded-[2.5rem] relative overflow-hidden group shadow-2xl shadow-purple-900/20">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-[80px] group-hover:bg-purple-500/20 transition-all duration-700"></div>
                            <div className="relative z-10 flex items-center gap-8">
                                <div className="w-20 h-20 bg-white/5 backdrop-blur-2xl rounded-[1.5rem] border border-white/10 flex items-center justify-center text-white">
                                    <span className="material-symbols-outlined text-4xl text-purple-400">shield_with_heart</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-black text-2xl tracking-tight">Enterprise-Grade Support</h4>
                                    <p className="text-slate-400 font-medium leading-relaxed max-w-xs">Dedicated success managers for our global education partners.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Right Column: Premium Glass Form ── */}
                    <div className="relative animate-fade-in-right">
                        <div className="absolute -top-20 -right-20 w-80 h-80 bg-purple-200/40 rounded-full blur-[120px] -z-10 animate-pulse"></div>
                        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-violet-200/40 rounded-full blur-[120px] -z-10 animate-pulse delay-1000"></div>
                        
                        <div className="bg-white/40 backdrop-blur-3xl border border-white/60 p-10 md:p-14 rounded-[3.5rem] shadow-[0_32px_80px_-20px_rgba(0,0,0,0.15)] space-y-10">
                            <div className="space-y-3">
                                <h3 className="text-3xl font-black text-gray-900 tracking-tight font-bricolage">Strategic Briefing Request</h3>
                                <p className="text-gray-500 font-semibold text-sm">Targeted response within 2 institutional hours.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2.5">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-1">Candidate Identity</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            placeholder="Full Name" 
                                            className="w-full bg-white/80 border border-gray-100 rounded-[1.25rem] px-6 py-4.5 text-gray-900 placeholder-gray-300 focus:ring-2 focus:ring-[#7a29c2]/20 focus:border-[#7a29c2]/50 outline-none transition-all font-bold text-sm shadow-sm"
                                        />
                                    </div>
                                    <div className="space-y-2.5">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-1">Digital Correspondence</label>
                                        <input 
                                            type="email" 
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            placeholder="Email Address" 
                                            className="w-full bg-white/80 border border-gray-100 rounded-[1.25rem] px-6 py-4.5 text-gray-900 placeholder-gray-300 focus:ring-2 focus:ring-[#7a29c2]/20 focus:border-[#7a29c2]/50 outline-none transition-all font-bold text-sm shadow-sm"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="space-y-2.5">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-1">Direct Connection</label>
                                        <input 
                                            type="tel" 
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                            placeholder="Mobile Number" 
                                            className="w-full bg-white/80 border border-gray-100 rounded-[1.25rem] px-6 py-4.5 text-gray-900 placeholder-gray-300 focus:ring-2 focus:ring-[#7a29c2]/20 focus:border-[#7a29c2]/50 outline-none transition-all font-bold text-sm shadow-sm"
                                        />
                                    </div>
                                    <div className="space-y-2.5">
                                        <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-1">Engagement Area</label>
                                        <div className="relative">
                                            <select 
                                                value={formData.subject}
                                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                                className="w-full bg-white/80 border border-gray-100 rounded-[1.25rem] px-6 py-4.5 text-gray-900 focus:ring-2 focus:ring-[#7a29c2]/20 focus:border-[#7a29c2]/50 outline-none transition-all font-bold text-sm appearance-none cursor-pointer shadow-sm"
                                            >
                                                <option value="">Select Domain</option>
                                                <option value="Undergraduate">Undergraduate Strategy</option>
                                                <option value="Postgraduate">Advanced Graduate Programs</option>
                                                <option value="Visa Guidance">Global Visa Compliance</option>
                                                <option value="Scholarships">Funding & Scholarships</option>
                                                <option value="Other">General Strategic Inquiry</option>
                                            </select>
                                            <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                                <span className="material-symbols-outlined">expand_more</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2.5">
                                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 ml-1">Brief Description</label>
                                    <textarea 
                                        rows={4}
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                        placeholder="Outline your requirements..."
                                        className="w-full bg-white/80 border border-gray-100 rounded-[1.5rem] px-6 py-4.5 text-gray-900 placeholder-gray-300 focus:ring-2 focus:ring-[#7a29c2]/20 focus:border-[#7a29c2]/50 outline-none transition-all font-bold text-sm resize-none shadow-sm"
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`group relative w-full bg-[#7a29c2] hover:bg-purple-700 text-white font-black text-xl py-6 rounded-[1.5rem] transition-all shadow-[0_20px_50px_rgba(122,41,194,0.25)] hover:shadow-[0_25px_60px_rgba(122,41,194,0.35)] hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 overflow-hidden ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    {isSubmitting ? (
                                        <>
                                            <span className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
                                            Transmitting...
                                        </>
                                    ) : (
                                        <>
                                            Initiate Global Briefing
                                            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                        </>
                                    )}
                                </button>

                                <div className="flex items-center justify-center gap-4 py-2 opacity-40">
                                    <div className="h-px bg-gray-300 w-12"></div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Secure Protocol</span>
                                    <div className="h-px bg-gray-300 w-12"></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Map Bridge */}
                <div className="mt-24 md:mt-32 animate-fade-in-up">
                    <div className="relative rounded-[4rem] overflow-hidden h-[450px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] border-8 border-white/50 backdrop-blur-3xl group">
                        <iframe 
                            title="EAOverseas Headquarters"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3464.851321609353!2d-95.49440849999999!3d29.724065699999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640c3cb76c7e067%3A0x7d366f36e70be664!2s6250%20Westpark%20Dr%20%23319%2C%20Houston%2C%20TX%2077057%2C%20USA!5e0!3m2!1sen!2sin!4v1774251384681!5m2!1sen!2sin" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0, filter: 'grayscale(0.1) contrast(1.1) brightness(1.05)' }} 
                            allowFullScreen 
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="group-hover:grayscale-0 transition-all duration-1000"
                        ></iframe>
                        <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-xl px-6 py-4 rounded-3xl border border-white shadow-xl pointer-events-none transition-transform group-hover:scale-105 duration-700">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-600 rounded-2xl flex items-center justify-center text-white">
                                    <span className="material-symbols-outlined text-xl">hub</span>
                                </div>
                                <div>
                                    <h5 className="font-black text-gray-900">Texas Hub</h5>
                                    <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">HQ Location</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;

