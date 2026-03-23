import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import DestinationsSection from '@/features/landing/components/DestinationsSection';
import AboutUsSection from '@/features/landing/components/AboutUsSection';
import TeamSection from '@/features/landing/components/TeamSection';
import JourneyCTASection from '@/features/landing/components/JourneyCTASection';
import Footer from '@/components/layout/Footer';
import HeroCarousel from '@/features/landing/components/HeroCarousel';
import HighlightsSection from '@/features/landing/components/HighlightsSection';
import AIAuditingSection from '@/features/landing/components/AIAuditingSection';
import IntelligentSearchSection from '@/features/landing/components/IntelligentSearchSection';
import ServicesSection from '@/features/landing/components/ServicesSection';
import CoreStrengthSection from '@/features/landing/components/CoreStrengthSection';
import CommunityPostsSection from '@/features/landing/components/CommunityPostsSection';
import BlogSection from '@/features/landing/components/BlogSection';
import GlobalTestimonialsSection from '@/features/landing/components/GlobalTestimonialsSection';
import FAQSection from '@/features/landing/components/FAQSection';
import BookingCTASection from '@/features/landing/components/BookingCTASection';
import AIChatWidget from '@/components/common/AIChatWidget';
import ConsultationBookingModal from '@/features/consultant/ConsultationBookingModal';
import { useNavigate } from 'react-router-dom';
import FigmaHeroSection from '@/features/landing/components/hero/FigmaHeroSection';
import { SEOHead } from '@/components/common/SEOHead';
import { getWhatsAppLink } from '@/shared/constants/contacts';

// Import assets
import destinationsHero from '@/assets/destinations_hero.png';
import studentStoryHero from '@/assets/student_story_hero.png';
import loanHeroImage from '@/assets/loan_hero.png';
import mainHeroImage from '@/assets/hero_mobile_cartoon.png';
import mobileHeroImage from '@/assets/hero_mobile_cartoon.png';
import whatsappIcon from '@/assets/icon_whatsapp.png';
import story1 from '@/assets/g1.png';
import story2 from '@/assets/b_1.png';
import story3 from '@/assets/g_2.png';
import topBar from '@/assets/sq_1.png';
import bottomBar from '@/assets/sq_2.png';

const LandingPage = () => {
    const navigate = useNavigate();

    // Slide 1: Premium Welcome
    const slide1 = (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-white">
            {/* Background Decorative Gradient */}
            <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-50 rounded-full blur-[120px] opacity-60 z-0"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-100/20 rounded-full blur-[100px] opacity-40 z-0"></div>

            <div className="max-w-[1400px] w-full px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 z-10 text-left">
                <div className="flex-1 space-y-8">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-[#090914] leading-[1.1] tracking-tight">
                        Your Global Future <br />
                        <span className="text-[#7a29c2] relative">
                            Starts Here.
                            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 358 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 9C118.5 3 238.5 3 355 9" stroke="#7a29c2" strokeWidth="6" strokeLinecap="round" />
                            </svg>
                        </span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-xl leading-relaxed">
                        Empowering ambitious students with world-class guidance, financial planning, and end-to-end visa support for a seamless transition abroad.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <button
                            onClick={() => navigate('/about')}
                            className="bg-[#7a29c2] hover:bg-purple-600 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-xl shadow-purple-200 hover:scale-105"
                        >
                            Plan My Journey
                        </button>
                        <button
                            onClick={() => setIsBookingModalOpen(true)}
                            className="bg-white border-2 border-gray-100 hover:border-[#7a29c2] text-gray-900 font-bold py-4 px-10 rounded-xl transition-all flex items-center justify-center gap-2 hover:bg-gray-50"
                        >
                            <span className="material-symbols-outlined">event</span>
                            Expert Consultation
                        </button>
                    </div>
                </div>
                <div className="flex-1 relative hidden lg:block">
                    <div className="relative z-10">
                        <img 
                            src={mainHeroImage} 
                            alt="Student success" 
                            className="w-[90%] mx-auto h-auto drop-shadow-2xl"
                        />
                    </div>
                    {/* Floating Stats Card */}
                    <div className="absolute -bottom-6 -left-6 bg-white/80 backdrop-blur-xl p-6 rounded-2xl shadow-2xl border border-white/50 z-20 animate-bounce-subtle">
                        <div className="flex items-center gap-4">
                            <div className="size-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-xl">✓</div>
                            <div>
                                <div className="text-2xl font-black text-gray-900">98%</div>
                                <div className="text-xs font-bold text-gray-500 uppercase">Visa Approval Rate</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Slide 2: Smart Loans (Purple/Indigo Theme)
    const slide2 = (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-white">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-purple-50/30 to-transparent pointer-events-none"></div>
            <div className="max-w-[1400px] w-full px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 z-10 text-left">
                <div className="flex-1 space-y-6">
                    <div className="text-purple-600 font-black tracking-widest text-sm uppercase">Financial Solutions</div>
                    <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
                        Funding Your <br />
                        Academic <span className="text-purple-600">Ambitions</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-lg">
                        Unlock global opportunities with smart financial planning. Explore eligibility and find the best education loan options tailored for your profile.
                    </p>
                    <div className="grid grid-cols-2 gap-4 py-4">
                        <div className="p-4 bg-white rounded-xl shadow-sm border border-purple-100">
                            <div className="text-purple-600 font-bold text-xl mb-1">0%</div>
                            <div className="text-xs text-gray-500 font-bold uppercase">Processing Fee</div>
                        </div>
                        <div className="p-4 bg-white rounded-xl shadow-sm border border-purple-100">
                            <div className="text-purple-600 font-bold text-xl mb-1">Fast</div>
                            <div className="text-xs text-gray-500 font-bold uppercase">Approval TAT</div>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/loan-calculator')}
                        className="bg-[#7a29c2] hover:bg-purple-700 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-xl shadow-purple-200/50"
                    >
                        Check Loan Eligibility
                    </button>
                </div>
                <div className="flex-1 lg:flex justify-end hidden">
                    <div className="relative p-8 bg-white rounded-[2rem] shadow-2xl border border-purple-100 overflow-hidden group">
                        <img 
                            src={loanHeroImage} 
                            alt="Education Loan" 
                            className="w-full max-w-md h-auto transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none"></div>
                    </div>
                </div>
            </div>
        </div>
    );

    // Slide 3: Global Destinations (Fuchsia Theme)
    const slide3 = (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-white">
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-50/30 to-transparent pointer-events-none"></div>
            <div className="max-w-[1400px] w-full px-6 lg:px-12 flex flex-col lg:flex-row-reverse items-center gap-12 z-10 text-left">
                <div className="flex-1 space-y-6">
                    <div className="text-fuchsia-600 font-black tracking-widest text-sm uppercase">Global Presence</div>
                    <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
                        Where the World <br />
                        Is Your <span className="text-fuchsia-600">Campus</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-lg">
                        From the historic halls of the UK to the innovation hubs of the USA, we guide you to 500+ top universities across 15+ premier destinations.
                    </p>
                    <div className="flex flex-wrap gap-2 py-4">
                        {['Canada', 'USA', 'UK', 'Australia', 'Germany', 'Ireland'].map(c => (
                            <span key={c} className="px-4 py-2 bg-white border border-fuchsia-100 rounded-full text-xs font-bold text-gray-600 shadow-sm">{c}</span>
                        ))}
                    </div>
                    <button
                        onClick={() => navigate('/countries')}
                        className="bg-[#d946ef] hover:bg-fuchsia-600 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-xl shadow-fuchsia-200"
                    >
                        Explore Destinations
                    </button>
                </div>
                <div className="flex-1 hidden lg:block relative z-10 text-center">
                    <img 
                        src={destinationsHero} 
                        alt="Global Destinations" 
                        className="w-[90%] mx-auto h-auto drop-shadow-2xl"
                    />
                </div>
            </div>
        </div>
    );

    // Slide 4: Student Success (Deep Purple Theme)
    const slide4 = (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-white">
            <div className="absolute inset-0 bg-gradient-to-t from-purple-50/20 to-transparent pointer-events-none"></div>
            <div className="max-w-[1400px] w-full px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-12 z-10 text-left">
                <div className="flex-1 space-y-6">
                    <div className="text-[#9333ea] font-black tracking-widest text-sm uppercase">Student Success</div>
                    <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
                        Real Stories, <br />
                        Global <span className="text-[#9333ea]">Triumphs</span>
                    </h2>
                    <blockquote className="border-l-4 border-purple-500 pl-6 space-y-2">
                        <p className="text-xl italic text-gray-700">
                            "From Kolkata to Canada in 6 months. EAOverseas made my dream a reality with their expert visa handling."
                        </p>
                        <footer className="text-sm font-bold text-gray-400 uppercase">— Tanisha Mukherjee, Berlin University</footer>
                    </blockquote>
                    <button
                        onClick={() => document.getElementById('student-stories')?.scrollIntoView({ behavior: 'smooth' })}
                        className="bg-[#9333ea] hover:bg-purple-700 text-white font-bold py-4 px-10 rounded-xl transition-all shadow-xl shadow-purple-200"
                    >
                        Read Success Stories
                    </button>
                </div>
                <div className="flex-1 hidden lg:flex justify-center items-center relative py-12">
                    <div className="relative flex items-end justify-center gap-6">
                        <div className="w-40 h-[450px] rounded-full overflow-hidden shadow-2xl shadow-purple-900/10 border-4 border-white transform -rotate-6 hover:rotate-0 transition-transform duration-500">
                            <img src={story1} alt="Successful student story 1" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-40 h-[450px] rounded-full overflow-hidden shadow-2xl shadow-purple-900/10 border-4 border-white translate-y-12 hover:translate-y-0 transition-transform duration-500">
                            <img src={story2} alt="Successful student story 2" className="w-full h-full object-cover" />
                        </div>
                        <div className="w-40 h-[450px] rounded-full overflow-hidden shadow-2xl shadow-purple-900/10 border-4 border-white rotate-6 hover:rotate-0 transition-transform duration-500">
                            <img src={story3} alt="Successful student story 3" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white relative font-sans text-[#111418] overflow-x-hidden">
            {/* Unified Grid Background */}
            <div className="absolute inset-0 bg-grid-purple opacity-50 pointer-events-none z-0"></div>

            <div className="relative z-10">
                <Navbar />

                {/* Global Booking Modal */}
                <ConsultationBookingModal
                    isOpen={isBookingModalOpen}
                    onClose={() => setIsBookingModalOpen(false)}
                    onConfirm={(details) => {
                        // ALERT REMOVED: Confirmed pure console log only
                        console.log("Booking Confirmed (No Alert):", details);
                    }}
                />

                <main className="flex flex-col items-center justify-start text-center pb-0 md:pb-0 mx-auto w-full relative -z-0">

                {/* Figma Hero Section */}
                <div className="w-full relative z-0">
                    <FigmaHeroSection />
                </div>


                {/* Marquee Trust Strip — just below Hero */}
                <div className="w-[100vw] ml-[calc(-50vw+50%)] overflow-hidden relative py-5 bg-transparent border-y border-[#7a29c2]/10" aria-hidden="true">
                    {/* Fade edges */}
                    <div className="absolute top-0 bottom-0 left-0 w-[120px] max-sm:w-[60px] bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute top-0 bottom-0 right-0 w-[120px] max-sm:w-[60px] bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                    <div className="flex gap-6 whitespace-nowrap w-max marquee-track">
                        {(() => {
                            const items = [
                                '🚀 Newly Launched',
                                '🎓 100+ Students Guided',
                                '🌍 8+ Study Destinations',
                                '🏛️ 50+ University Partners',
                                '✅ 98% Visa Approval Rate',
                                '💡 AI-Powered Matching',
                                '🎯 Personalised Counselling',
                                '📋 End-to-End Documentation',
                                '💰 Scholarship Navigation',
                                '🤝 Trusted by Early Students',
                            ];
                            // Render full list twice for seamless infinite scroll (no adjacent duplicates)
                            return [...items, ...items].map((item, i) => (
                                <span key={i} className="inline-flex items-center px-5 py-2 bg-white border border-[#7a29c2]/10 rounded-full text-[13px] font-semibold text-gray-700 shadow-sm shrink-0">{item}</span>
                            ));
                        })()}
                    </div>
                </div>



            </main>

            {/* Floating WhatsApp Button — outside main so z-index is never clipped */}
            <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-4 md:bottom-8 md:right-8 z-[9999] block transition-transform hover:scale-110 active:scale-95"
                aria-label="Chat on WhatsApp"
            >
                <img
                    src={whatsappIcon}
                    alt="Chat on WhatsApp"
                    className="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-lg hover:drop-shadow-xl"
                />
            </a>

            <HighlightsSection />
            <AIAuditingSection />
            <IntelligentSearchSection />
            <DestinationsSection />
            <ServicesSection />
            <CoreStrengthSection />
            <AboutUsSection />
            <CommunityPostsSection />
            <BlogSection />
            <GlobalTestimonialsSection />
            <FAQSection />
            <TeamSection />
            <BookingCTASection />
            <JourneyCTASection />
            <Footer />
            <AIChatWidget />
            </div>
        </div >
    );
};

export default LandingPage;

