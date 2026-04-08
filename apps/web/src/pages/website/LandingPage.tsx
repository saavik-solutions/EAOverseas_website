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
import LoginModal from '@/features/auth/LoginModal';
import { useAuth } from '@/shared/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SEOHead } from '@/components/common/SEOHead';
import { getWhatsAppLink } from '@/shared/constants/contacts';
import { MainSlide, ScholarshipSlide, DestinationsSlide } from '@/features/landing/components/hero/HeroSlides';

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


    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const { isLoginModalOpen, setLoginModalOpen } = useAuth();

    const scrollToBooking = () => {
        const element = document.getElementById('booking-section');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-white relative font-sans text-[#111418] overflow-x-hidden">
            <SEOHead 
                title="EAOverseas | Best Overseas Education Consultants"
                description="Your trusted strategic partner for global education. Expert university matching, scholarship guidance, and visa success."
                image="/assets/hero_mobile_cartoon.png"
            />
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

                {/* Premium Hero Carousel Section */}
                <div className="w-full relative z-0">
                    <HeroCarousel 
                        slides={[
                            <ScholarshipSlide onBookingClick={scrollToBooking} />,
                            <MainSlide onBookingClick={scrollToBooking} />,
                            <DestinationsSlide onBookingClick={scrollToBooking} />
                        ]} 
                        interval={6000}
                    />
                </div>


                {/* Marquee Trust Strip — just below Hero */}
                <div className="w-full overflow-hidden relative py-5 bg-transparent" aria-hidden="true">
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
                className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[9999] block transition-transform hover:scale-110 active:scale-95"
                aria-label="Chat on WhatsApp"
            >
                <img
                    src={whatsappIcon}
                    alt="Chat on WhatsApp"
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain drop-shadow-lg hover:drop-shadow-xl"
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
            <LoginModal 
                isOpen={isLoginModalOpen} 
                onClose={() => setLoginModalOpen(false)} 
            />
            </div>
        </div >
    );
};

export default LandingPage;

