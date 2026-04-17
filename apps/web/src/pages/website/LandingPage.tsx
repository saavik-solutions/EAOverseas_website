import React, { useState, lazy, Suspense, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/shared/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { SEOHead } from '@/components/common/SEOHead';
import { getWhatsAppLink } from '@/shared/constants/contacts';
import { MainSlide, ScholarshipSlide, DestinationsSlide } from '@/features/landing/components/hero/HeroSlides';

// Assets
import whatsappIcon from '@/assets/icon_whatsapp.webp';

// Lazy load sections
const HighlightsSection = lazy(() => import('@/features/landing/components/HighlightsSection'));
const AIAuditingSection = lazy(() => import('@/features/landing/components/AIAuditingSection'));
const IntelligentSearchSection = lazy(() => import('@/features/landing/components/IntelligentSearchSection'));
const DestinationsSection = lazy(() => import('@/features/landing/components/DestinationsSection'));
const ServicesSection = lazy(() => import('@/features/landing/components/ServicesSection'));
const CoreStrengthSection = lazy(() => import('@/features/landing/components/CoreStrengthSection'));
const AboutUsSection = lazy(() => import('@/features/landing/components/AboutUsSection'));
const CommunityPostsSection = lazy(() => import('@/features/landing/components/CommunityPostsSection'));
const BlogSection = lazy(() => import('@/features/landing/components/BlogSection'));
const GlobalTestimonialsSection = lazy(() => import('@/features/landing/components/GlobalTestimonialsSection'));
const FAQSection = lazy(() => import('@/features/landing/components/FAQSection'));
const TeamSection = lazy(() => import('@/features/landing/components/TeamSection'));
const BookingCTASection = lazy(() => import('@/features/landing/components/BookingCTASection'));
const JourneyCTASection = lazy(() => import('@/features/landing/components/JourneyCTASection'));
const AIChatWidget = lazy(() => import('@/components/common/AIChatWidget'));
const HeroCarousel = lazy(() => import('@/features/landing/components/HeroCarousel'));
const ConsultationBookingModal = lazy(() => import('@/features/consultant/ConsultationBookingModal'));
const LoginModal = lazy(() => import('@/features/auth/LoginModal'));

// Loading Placeholder
const SectionLoader = () => <div className="w-full h-48 bg-slate-50/50 animate-pulse rounded-3xl mb-12" />;

const LandingPage = () => {
    const navigate = useNavigate();

    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
    const [showAllSlides, setShowAllSlides] = useState(false);
    const { isLoginModalOpen, setLoginModalOpen } = useAuth();

    useEffect(() => {
        const timer = setTimeout(() => setShowAllSlides(true), 2500);
        return () => clearTimeout(timer);
    }, []);

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
                image="/assets/hero_mobile_cartoon.webp"
            />
            {/* Unified Grid Background */}
            <div className="absolute inset-0 bg-grid-purple opacity-50 pointer-events-none z-0"></div>

            <div className="relative z-10">
                <Navbar />

                {/* Global Booking Modal */}
                <Suspense fallback={null}>
                    <ConsultationBookingModal
                        isOpen={isBookingModalOpen}
                        onClose={() => setIsBookingModalOpen(false)}
                        onConfirm={(details) => {
                            console.log("Booking Confirmed (No Alert):", details);
                        }}
                    />
                </Suspense>

                <main className="flex flex-col items-center justify-start text-center pb-0 md:pb-0 mx-auto w-full relative -z-0">

                    {/* Premium Hero Carousel Section */}
                    <div className="w-full relative z-0">
                        <Suspense fallback={<div className="min-h-[600px] w-full bg-slate-50/50 animate-pulse" />}>
                            <HeroCarousel 
                                slides={[
                                    <ScholarshipSlide key="scholarship" onBookingClick={scrollToBooking} />,
                                    ...(showAllSlides ? [
                                        <MainSlide key="main" onBookingClick={scrollToBooking} />,
                                        <DestinationsSlide key="destinations" onBookingClick={scrollToBooking} />
                                    ] : [<div key="slot2" />, <div key="slot3" />])
                                ]} 
                                interval={6000}
                            />
                        </Suspense>
                    </div>

                    {/* Marquee Trust Strip — just below Hero */}
                    <div className="w-full overflow-hidden relative py-5 bg-transparent" aria-hidden="true">
                        <div className="absolute top-0 bottom-0 left-0 w-[120px] max-sm:w-[60px] bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                        <div className="absolute top-0 bottom-0 right-0 w-[120px] max-sm:w-[60px] bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                        <div className="flex gap-6 whitespace-nowrap w-max marquee-track" aria-hidden="true">
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
                                return [...items, ...items].map((item, i) => (
                                    <span key={i} className="inline-flex items-center px-5 py-2 bg-white border border-[#7a29c2]/10 rounded-full text-[13px] font-semibold text-gray-700 shadow-sm shrink-0">{item}</span>
                                ));
                            })()}
                        </div>
                    </div>

                    {/* Floating WhatsApp Button */}
                    <a
                        href={getWhatsAppLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[9999] block transition-transform hover:scale-110 active:scale-95"
                        aria-label="Contact us on WhatsApp"
                    >
                        <img
                            src={whatsappIcon}
                            alt="Chat on WhatsApp"
                            width={64}
                            height={64}
                            className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain drop-shadow-lg hover:drop-shadow-xl"
                        />
                    </a>

                    <Suspense fallback={<SectionLoader />}>
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
                        <AIChatWidget />
                    </Suspense>
                </main>

                <Footer />
                
                <Suspense fallback={null}>
                    <LoginModal 
                        isOpen={isLoginModalOpen} 
                        onClose={() => setLoginModalOpen(false)} 
                    />
                </Suspense>
            </div>
        </div>
    );
};

export default LandingPage;
