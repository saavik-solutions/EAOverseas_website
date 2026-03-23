import React, { useState } from 'react';
import { CONTACTS } from '@/shared/constants/contacts';
import { submitLead } from '@/services/leadVault';
import { useNavigate } from 'react-router-dom';

const ContactSection = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch(`${API_BASE}/api/inquiries`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            // Capture in Institutional Lead Vault
            await submitLead({
                source: 'EAOverseas_Main_Website',
                data: {
                    ...formData,
                    formName: 'Contact Section'
                }
            });
            if (data.success) {
                navigate('/thank-you');
                setSubmitStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                setSubmitStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="relative py-12 px-6 md:px-12" id="contact">
            <main className="container mx-auto max-w-6xl">
                {/* Main Contact Card Container */}
                <div className="bg-white rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row min-h-[750px] shadow-[0_30px_70px_-15px_rgba(122,41,194,0.15)] border border-purple-50">
                    {/* Left Info Column */}
                    <aside className="lg:w-[38%] p-10 md:p-14 flex flex-col justify-between text-white relative overflow-hidden bg-[#7a29c2]">
                        {/* Decorative background circle */}
                        <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[40%] bg-white/10 blur-[80px] rounded-full"></div>
                        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[30%] bg-purple-400/20 blur-[60px] rounded-full"></div>

                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight">Contact Information</h2>
                            <p className="text-purple-100 text-lg leading-relaxed mb-12 font-medium">
                                Ready to start your journey? Our experts are here to guide you through every step of your international education.
                            </p>
                            
                            <ul className="space-y-8">
                                <li className="flex items-start gap-5 group">
                                    <div className="bg-white/15 p-3.5 rounded-2xl group-hover:bg-white/25 transition-all duration-300 backdrop-blur-md">
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path></svg>
                                    </div>
                                    <div>
                                        <span className="block text-sm font-bold text-purple-200 uppercase tracking-widest mb-1">Toll Free</span>
                                        <a className="text-xl font-bold hover:text-white transition-colors tracking-tight" href={`tel:${CONTACTS.support.tollFree}`}>{CONTACTS.support.tollFree}</a>
                                    </div>
                                </li>

                                <li className="flex items-start gap-5 group">
                                    <div className="bg-white/15 p-3.5 rounded-2xl group-hover:bg-white/25 transition-all duration-300 backdrop-blur-md">
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path></svg>
                                    </div>
                                    <div>
                                        <span className="block text-sm font-bold text-purple-200 uppercase tracking-widest mb-1">Email support</span>
                                        <a className="text-xl font-bold hover:text-white transition-colors tracking-tight" href={`mailto:${CONTACTS.support.email}`}>{CONTACTS.support.email}</a>
                                    </div>
                                </li>

                                <li className="flex items-start gap-5 group">
                                    <div className="bg-white/15 p-3.5 rounded-2xl group-hover:bg-white/25 transition-all duration-300 backdrop-blur-md">
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"></path></svg>
                                    </div>
                                    <div>
                                        <span className="block text-sm font-bold text-purple-200 uppercase tracking-widest mb-1">Our Headquarters</span>
                                        <address className="text-lg font-bold not-italic leading-snug max-w-[200px] tracking-tight">{CONTACTS.support.address}</address>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="pt-12 relative z-10">
                            <div className="flex gap-4">
                                {Object.entries(CONTACTS.socials).map(([name, url]) => (
                                    <a key={name} href={url} target="_blank" rel="noopener noreferrer" 
                                        className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/25 transition-all border border-white/10 backdrop-blur-sm">
                                        <span className="sr-only">{name}</span>
                                        <div className="w-[18px] h-[18px] bg-white" style={{ maskImage: `url(https://unpkg.com/simple-icons@v9/icons/${name}.svg)`, WebkitMaskImage: `url(https://unpkg.com/simple-icons@v9/icons/${name}.svg)`, maskSize: 'contain', maskRepeat: 'no-repeat', maskPosition: 'center' }}></div>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* Right Form Column */}
                    <div className="lg:w-[62%] p-10 md:p-14 bg-white relative">
                        <div className="mb-10 text-center lg:text-left">
                            <h3 className="text-2xl font-black text-gray-900 mb-2">Send us a message</h3>
                                <p className="text-gray-500 font-medium">We'll get back to you within 24 hours.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[13px] font-extrabold text-gray-400 uppercase tracking-wider ml-1" htmlFor="name">Full Name</label>
                                    <input
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-gray-100 border-2 focus:border-[#7a29c2] focus:bg-white focus:ring-4 focus:ring-purple-500/5 transition-all placeholder:text-gray-300 font-bold outline-none"
                                        id="name" name="name" placeholder="Prasenjeet Kashyap" required type="text"
                                        value={formData.name} onChange={handleChange}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[13px] font-extrabold text-gray-400 uppercase tracking-wider ml-1" htmlFor="email">Email Address</label>
                                    <input
                                        className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-gray-100 border-2 focus:border-[#7a29c2] focus:bg-white focus:ring-4 focus:ring-purple-500/5 transition-all placeholder:text-gray-300 font-bold outline-none"
                                        id="email" name="email" placeholder="kashyap@example.com" required type="email"
                                        value={formData.email} onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[13px] font-extrabold text-gray-400 uppercase tracking-wider ml-1" htmlFor="subject">What's this about?</label>
                                <input
                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-gray-100 border-2 focus:border-[#7a29c2] focus:bg-white focus:ring-4 focus:ring-purple-500/5 transition-all placeholder:text-gray-300 font-bold outline-none"
                                    id="subject" name="subject" placeholder="Inquiry about UK Universities" required type="text"
                                    value={formData.subject} onChange={handleChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[13px] font-extrabold text-gray-400 uppercase tracking-wider ml-1" htmlFor="message">Your Message</label>
                                <textarea
                                    className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-gray-100 border-2 focus:border-[#7a29c2] focus:bg-white focus:ring-4 focus:ring-purple-500/5 transition-all placeholder:text-gray-300 font-bold min-h-[160px] resize-none outline-none"
                                    id="message" name="message" placeholder="Tell us more about your academic goals..." required
                                    value={formData.message} onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className="pt-4">
                                <button
                                    className={`w-full py-4.5 font-black text-lg rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 active:scale-[0.97] disabled:opacity-70 ${submitStatus === 'success' ? 'bg-green-500 text-white shadow-green-500/20' :
                                        submitStatus === 'error' ? 'bg-red-500 text-white shadow-red-500/20' :
                                            'bg-[#7a29c2] text-white hover:bg-[#6d28d9] hover:-translate-y-1 shadow-purple-500/30'
                                        }`}
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    <span>{isSubmitting ? 'Sending inquiry...' : submitStatus === 'success' ? 'Inquiry Sent!' : submitStatus === 'error' ? 'Something went wrong' : 'Request Consultation'}</span>
                                    {submitStatus === 'idle' && !isSubmitting && (
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </section>
    );
};

export default ContactSection;
