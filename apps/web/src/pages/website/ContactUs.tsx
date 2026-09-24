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
        <div className="relative min-h-[700px] w-full overflow-hidden bg-white">
            <SEOHead 
                title="Contact Us | Eduwoy"
                description="Get in touch with our global education strategists to start architecting your global future."
                image="/assets/visa_success_hero.webp"
            />
            {/* Premium Background Layers */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#E7F0FF_0%,transparent_50%)] opacity-70"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,#eef2ff_0%,transparent_50%)] opacity-70"></div>
            <div className="absolute inset-0 bg-grid-primary opacity-[0.15] pointer-events-none"></div>

            <div className="max-w-[1180px] mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    
                    {/* ── Left Column: Institutional Info ── */}
                    <div className="space-y-6 animate-fade-in-up">
                        <div className="space-y-3">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-light/50 border border-purple-100 text-primary font-bold text-[10px] tracking-wider uppercase">
                                <span className="relative flex h-1.5 w-1.5">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                                </span>
                                Global Command Center
                            </div>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight tracking-tight font-bricolage">
                                Let's Architect Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-600">Global Future.</span>
                            </h1>
                            <p className="text-xs sm:text-sm text-gray-500 leading-relaxed font-normal max-w-lg">
                                Our global strategists provide the elite-level clarity and institutional expertise you need to navigate international education.
                            </p>
                        </div>

                        <div className="grid gap-3.5">
                            {[
                                { icon: 'mail', label: 'Institutional Email', value: CONTACTS.support.email, color: 'bg-primary-light/50 text-primary' },
                                { icon: 'call', label: 'Strategic Hotline', value: CONTACTS.support.phone, color: 'bg-indigo-50 text-indigo-600' },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center gap-3.5 group p-2.5 rounded-xl bg-gray-50/60 border border-gray-100/80">
                                    <div className={`w-9 h-9 ${item.color} rounded-lg flex items-center justify-center group-hover:scale-105 transition-all shadow-sm shrink-0`}>
                                        <span className="material-symbols-outlined text-base">{item.icon}</span>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">{item.label}</p>
                                        <p className="text-xs sm:text-sm font-bold text-gray-900 tracking-tight truncate">{item.value}</p>
                                    </div>
                                </div>
                            ))}

                            <div className="flex items-start gap-3.5 group p-2.5 rounded-xl bg-gray-50/60 border border-gray-100/80">
                                <div className="w-9 h-9 bg-slate-100 rounded-lg flex items-center justify-center text-slate-700 group-hover:scale-105 transition-all shadow-sm shrink-0">
                                    <span className="material-symbols-outlined text-base">location_on</span>
                                </div>
                                <div>
                                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-wider">Headquarters</p>
                                    <a 
                                        href="https://maps.app.goo.gl/NWABAsU8CfrcG1aB7?g_st=ic" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="block text-xs sm:text-sm font-bold text-gray-900 leading-snug hover:text-primary transition-colors tracking-tight"
                                    >
                                        Office no: 605 6th Floor, 110, Saifabad, Khairtabad, Hyderabad, Telangana 500004
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Professional Support Badge */}
                        <div className="p-4 sm:p-5 bg-[#0f172a] rounded-2xl relative overflow-hidden group shadow-lg">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[50px] group-hover:bg-primary/20 transition-all"></div>
                            <div className="relative z-10 flex items-center gap-3.5">
                                <div className="w-10 h-10 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 flex items-center justify-center text-white shrink-0">
                                    <span className="material-symbols-outlined text-xl text-purple-400">shield_with_heart</span>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-sm tracking-tight">Enterprise-Grade Support</h4>
                                    <p className="text-slate-400 text-xs font-normal leading-relaxed">Dedicated success managers for our global education partners.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ── Right Column: Premium Glass Form ── */}
                    <div className="relative animate-fade-in-right">
                        <div className="absolute -top-10 -right-10 w-48 h-48 bg-purple-200/40 rounded-full blur-[80px] -z-10"></div>
                        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-primary-light/40 rounded-full blur-[80px] -z-10"></div>
                        
                        <div className="bg-white/85 backdrop-blur-2xl border border-gray-100 p-6 sm:p-8 md:p-8 rounded-2xl shadow-xl space-y-6">
                            <div className="space-y-1.5">
                                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight font-bricolage">Strategic Briefing Request</h3>
                                <p className="text-gray-500 font-medium text-xs sm:text-sm">Targeted response within 2 institutional hours.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-0.5">Candidate Identity</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            placeholder="Full Name" 
                                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 sm:py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-xs sm:text-sm shadow-sm"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-0.5">Digital Correspondence</label>
                                        <input 
                                            type="email" 
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                            placeholder="Email Address" 
                                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 sm:py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-xs sm:text-sm shadow-sm"
                                        />
                                    </div>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-0.5">Direct Connection</label>
                                        <input 
                                            type="tel" 
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                            placeholder="Mobile Number" 
                                            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 sm:py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-xs sm:text-sm shadow-sm"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-0.5">Engagement Area</label>
                                        <div className="relative">
                                            <select 
                                                value={formData.subject}
                                                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                                                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 sm:py-3 text-gray-900 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-xs sm:text-sm appearance-none cursor-pointer shadow-sm"
                                            >
                                                <option value="">Select Domain</option>
                                                <option value="Undergraduate">Undergraduate Strategy</option>
                                                <option value="Postgraduate">Advanced Graduate Programs</option>
                                                <option value="Visa Guidance">Global Visa Compliance</option>
                                                <option value="Scholarships">Funding & Scholarships</option>
                                                <option value="Other">General Strategic Inquiry</option>
                                            </select>
                                            <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                                <span className="material-symbols-outlined text-base">expand_more</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400 ml-0.5">Brief Description</label>
                                    <textarea 
                                        rows={4}
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                        placeholder="Outline your requirements..."
                                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 sm:py-3 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all font-medium text-xs sm:text-sm resize-none shadow-sm"
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`group relative w-full bg-white border-2 border-primary hover:bg-primary-light/20 hover:bg-white border-2 border-primary hover:bg-primary-light/20-hover text-primary font-bold font-bold text-sm sm:text-base py-3.5 sm:py-4 rounded-xl transition-all shadow-md shadow-purple-500/25 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 overflow-hidden ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                                    {isSubmitting ? (
                                        <>
                                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                            <span>Transmitting...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Initiate Global Briefing</span>
                                            <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                        </>
                                    )}
                                </button>

                                <div className="flex items-center justify-center gap-3 py-1 opacity-50">
                                    <div className="h-px bg-gray-200 w-8"></div>
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Secure Protocol</span>
                                    <div className="h-px bg-gray-200 w-8"></div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Map Bridge */}
                <div className="mt-12 md:mt-16 animate-fade-in-up">
                    <div className="relative rounded-2xl overflow-hidden h-[300px] md:h-[350px] shadow-lg border border-gray-200 group">
                        <iframe 
                            title="Eduwoy Headquarters - Taramandal Complex"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3643.5158124898358!2d78.4680458!3d17.406880600000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9793e5a79ae1%3A0x67680cc2e61223e2!2sTaramandal%20Complex!5e1!3m2!1sen!2sin!4v1788937263418!5m2!1sen!2sin" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen 
                            loading="lazy"
                            referrerPolicy="strict-origin-when-cross-origin"
                            className="transition-all duration-700"
                        ></iframe>
                        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-gray-100 shadow-md pointer-events-none transition-transform group-hover:scale-105 duration-500">
                            <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 bg-white border-2 border-primary hover:bg-primary-light/20 rounded-lg flex items-center justify-center text-primary font-bold shrink-0">
                                    <span className="material-symbols-outlined text-sm">hub</span>
                                </div>
                                <div>
                                    <h5 className="font-bold text-xs text-gray-900">Hyderabad Hub</h5>
                                    <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider">HQ Location</p>
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

