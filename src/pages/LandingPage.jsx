import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import SupportSection from '../features/landing/components/SupportSection';
import DestinationsSection from '../features/landing/components/DestinationsSection';
import StudentStoriesSection from '../features/landing/components/StudentStoriesSection';
import AboutUsSection from '../features/landing/components/AboutUsSection';
import TeamSection from '../features/landing/components/TeamSection';
import ConsultantCTA from '../features/landing/components/ConsultantCTA';
import Footer from '../components/Footer';
import HeroCarousel from '../features/landing/components/HeroCarousel'; // Imported new component
import ConsultationBookingModal from '../components/ConsultationBookingModal';
import { useNavigate } from 'react-router-dom';

// Import assets
import destinationsHero from '../assets/destinations_hero.png';
import studentStoryHero from '../assets/student_story_hero.png';
// import loanHeroImage from '../assets/loan_hero.png'; // Using placeholder div for now or I can import if I copied it? I copied 'loan_hero.png' in previous step? Wait, I did NOT copy loan_hero.png in previous step I think? I copied `destinations` and `student`. 
// Ah, step 2228 was `copy ... loan_hero.png`. Yes I did.
import loanHeroImage from '../assets/loan_hero.png';
import mainHeroImage from '../assets/student_standing.png';
import mobileHeroImage from '../assets/hero_mobile_cartoon.png';
import whatsappIcon from '../assets/icon_whatsapp.png';
import story1 from '../assets/story_card_manisha.jpg';
import story2 from '../assets/story_card_manish.jpg';
import story3 from '../assets/story_card_sanjukta.jpg';

const LandingPage = () => {
    const navigate = useNavigate();

    // Slide 1: Original Hero + Flag Strip
    const slide1 = (
        <div className="flex flex-col items-center justify-between w-full max-w-6xl px-4 gap-6 md:gap-12">
            <div className="flex-1 text-center w-full">
                <h1 className="text-3xl sm:text-4xl md:text-7xl font-extrabold tracking-tight mb-4 md:mb-8 leading-tight text-[#090914]">
                    Discover the Future <br />
                    with EAOverseas
                </h1>

                <p className="text-sm sm:text-base md:text-xl text-[#52525B] max-w-3xl mx-auto mb-8 md:mb-12 leading-relaxed">
                    We empower students to study abroad with affordable guidance and end-to-end support.
                    Whether it's your dream university, visa processing, or career counseling — we've got you covered.
                    <span className="block md:hidden mt-2 text-sm sm:text-base">
                        Start your journey today with our comprehensive services tailored to your unique needs and aspirations.
                    </span>
                </p>

                <button
                    onClick={() => navigate('/about')}
                    className="hidden md:inline-block bg-[#2D83F2] hover:bg-blue-600 text-white text-sm md:text-lg font-bold py-2.5 px-6 md:py-4 md:px-10 rounded-lg transition-all shadow-md mb-12 md:mb-8 relative z-40"
                >
                    Explore More About Us
                </button>
            </div>
            <div className="flex-1 flex justify-center mt-2 md:-mt-12 w-full">
                {/* Desktop Image - Hidden */}
                {/* <img src={mainHeroImage} alt="Discover the Future" className="hidden md:block w-full max-w-md object-contain hover:scale-105 transition-transform duration-500" /> */}

                {/* Mobile Cartoon Image */}
                <img src={mobileHeroImage} alt="Discover the Future" className="block md:hidden w-[85%] sm:w-4/5 max-w-[340px] object-contain hover:scale-105 transition-transform duration-500" />
            </div>

            {/* Mobile Button - Below Image */}
            <button
                onClick={() => navigate('/about')}
                className="md:hidden bg-[#2D83F2] hover:bg-blue-600 text-white text-sm font-bold py-3 px-8 rounded-lg transition-all shadow-md mb-8 w-full max-w-sm"
            >
                Explore More About Us
            </button>
        </div>
    );

    // Slide 2: Loan Options
    const slide2 = (
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between w-full max-w-6xl px-4 gap-6 md:gap-12">
            <div className="flex-1 text-center md:text-left w-full md:w-auto">
                <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-3 md:mb-6 leading-tight text-[#090914]">
                    Discover Your <br />
                    Loan Options
                </h1>
                <p className="text-sm sm:text-base text-[#52525B] mb-5 md:mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
                    We help students unlock study abroad opportunities with smart financial planning.
                    Use our Loan Check Calculator to explore your eligibility, compare options, and find
                    the best education loan — all in just a few clicks.
                    <span className="block md:hidden mt-2">
                        From government schemes to private banks, we simplify the documentation and approval process so you can focus on your studies.
                    </span>
                </p>
                <button
                    onClick={() => navigate('/loan-calculator')}
                    className="hidden md:inline-block bg-[#2D83F2] hover:bg-blue-600 text-white text-xs sm:text-base font-bold py-2.5 px-6 md:px-8 rounded-lg transition-all shadow-md mb-12 md:mb-8"
                >
                    Explore the Loan Calculator
                </button>
            </div>
            <div className="flex-1 flex justify-center mt-0 md:-mt-12 w-full">
                <img src={loanHeroImage} alt="Loan Options" className="w-[90%] sm:w-4/5 md:w-full max-w-[380px] md:max-w-md object-contain hover:scale-105 transition-transform duration-500" />
            </div>

            {/* Mobile Button - Below Image */}
            <button
                onClick={() => navigate('/loan-calculator')}
                className="md:hidden bg-[#2D83F2] hover:bg-blue-600 text-white text-sm font-bold py-3 px-8 rounded-lg transition-all shadow-md mb-8 w-full max-w-sm"
            >
                Explore the Loan Calculator
            </button>
        </div >
    );

    // Slide 3: Destinations
    const slide3 = (
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between w-full max-w-6xl px-4 gap-6 md:gap-12">
            <div className="flex-1 text-center md:text-left w-full md:w-auto">
                <h1 className="text-2xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-3 md:mb-6 leading-tight text-[#090914]">
                    Canada, UK, Germany... <br />
                    Where Will You Go?
                </h1>
                <p className="text-sm sm:text-base text-[#52525B] mb-5 md:mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
                    We guide students to top universities in 10+ countries.
                    Find your perfect destination today.
                    <span className="block md:hidden mt-2">
                        Whether you prefer the academic tradition of the UK, the innovation of the USA, or the lifestyle of Australia, we have a path for you. Our experts provide personalized counseling to help you choose the right country and university that aligns with your academic goals.
                    </span>
                </p>
                <button
                    onClick={() => navigate('/countries')}
                    className="hidden md:inline-block bg-[#2D83F2] hover:bg-blue-600 text-white text-xs sm:text-base font-bold py-2.5 px-6 md:px-8 rounded-lg transition-all shadow-md mb-12 md:mb-8"
                >
                    Explore Countries
                </button>
            </div>
            <div className="flex-1 flex justify-center mt-0 md:-mt-12 w-full">
                <img src={destinationsHero} alt="Destinations Collage" className="w-[90%] sm:w-4/5 md:w-full max-w-[380px] md:max-w-md object-contain hover:scale-105 transition-transform duration-500" />
            </div>

            {/* Mobile Button - Below Image */}
            <button
                onClick={() => navigate('/countries')}
                className="md:hidden bg-[#2D83F2] hover:bg-blue-600 text-white text-sm font-bold py-3 px-8 rounded-lg transition-all shadow-md mb-8 w-full max-w-sm"
            >
                Explore Countries
            </button>
        </div >
    );



    // Slide 4: Student Stories
    const slide4 = (
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between w-full max-w-6xl px-4 gap-8 md:gap-12">
            <div className="flex-1 text-center md:text-left w-full md:w-auto z-10">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight mb-4 md:mb-6 leading-tight text-[#090914]">
                    From Kolkata to <br />
                    Canada in 6 Months
                </h1>
                <p className="text-sm sm:text-base text-[#52525B] mb-6 md:mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
                    Read how Tanisha got her German visa on the first try and achieved her study abroad dreams.
                    <span className="block md:hidden mt-2">
                        Discover inspiring journeys of students who transformed their lives with our expert guidance. From university selection to visa approval, we are with you every step of the way. Your success story could be next. We are dedicated to making your study abroad dreams a reality with our personalized support and network.
                    </span>
                </p>
                <button
                    onClick={() => {
                        const element = document.getElementById('student-stories');
                        if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                    className="hidden md:inline-block bg-[#2D83F2] hover:bg-blue-600 text-white text-sm md:text-base font-bold py-3 px-8 rounded-lg transition-all shadow-md mb-8"
                >
                    View Student Stories
                </button>
            </div>

            {/* Right Side - 3 Pill Layout (Exact Match) */}
            <div className="flex-1 flex justify-center items-center w-full relative mt-12 md:mt-0 pt-16 md:pt-12">
                <div className="relative flex items-start justify-center gap-4 md:gap-6">

                    {/* Decorative Top Horizontal Pill - Galaxy Texture */}
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-40 h-9 rounded-full shadow-2xl z-0 overflow-hidden bg-[#020617] border border-blue-900/30">
                        {/* Deep Space Background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#1e1b4b] to-[#312e81] opacity-100"></div>

                        {/* Nebula Clouds */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-transparent mix-blend-overlay"></div>

                        {/* Stars Texture */}
                        <div className="absolute inset-0 opacity-70" style={{
                            backgroundImage: 'radial-gradient(white 1px, transparent 1px), radial-gradient(white 0.5px, transparent 0.5px)',
                            backgroundSize: '16px 16px, 8px 8px',
                            backgroundPosition: '0 0, 4px 4px'
                        }}></div>

                        {/* Glow */}
                        <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-blue-500/30 blur-xl rounded-full"></div>
                    </div>

                    {/* Left Pill (Manisha) - High */}
                    <div className="relative group z-10">
                        <div className="w-24 sm:w-32 md:w-40 h-64 sm:h-80 md:h-96 rounded-[100px] overflow-hidden shadow-xl border-4 border-white transition-transform duration-500 hover:-translate-y-2 bg-blue-200">
                            <img src={story1} alt="Student Story 1" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    {/* Center Pill (Manish) - Low (Shifted Down) & Lighting Effect */}
                    <div className="relative mt-12 md:mt-16 z-10 group">
                        <div className="w-24 sm:w-32 md:w-40 h-64 sm:h-80 md:h-96 rounded-[100px] overflow-hidden shadow-xl border-4 border-white transition-transform duration-500 hover:-translate-y-2 bg-gray-900 relative">
                            <img src={story2} alt="Student Story 2" className="w-full h-full object-cover grayscale-[10%] contrast-110" />
                            {/* Enhanced Blue/Red Split Lighting Effect Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-red-600/50 mix-blend-overlay pointer-events-none"></div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-80"></div>
                        </div>
                    </div>

                    {/* Right Pill (Sanjukta) - High */}
                    <div className="relative group z-10">
                        <div className="w-24 sm:w-32 md:w-40 h-64 sm:h-80 md:h-96 rounded-[100px] overflow-hidden shadow-xl border-4 border-white transition-transform duration-500 hover:-translate-y-2 bg-green-100">
                            <img src={story3} alt="Student Story 3" className="w-full h-full object-cover" />
                        </div>
                        {/* Decorative Bottom Horizontal Pill */}
                        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 w-40 h-9 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full opacity-90 shadow-lg z-20">
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 rounded-full"></div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Mobile Button - Below Image */}
            <button
                onClick={() => {
                    const element = document.getElementById('student-stories');
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }}
                className="md:hidden bg-[#2D83F2] hover:bg-blue-600 text-white text-sm font-bold py-3 px-8 rounded-lg transition-all shadow-md mt-6 w-full max-w-sm"
            >
                View Student Stories
            </button>
        </div>
    );

    const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white font-sans text-[#111418] overflow-x-hidden">
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

            <main className="flex flex-col items-center justify-start text-center px-4 pt-4 pb-0 md:pt-10 md:pb-0 max-w-[1600px] mx-auto w-full">

                {/* Hero Carousel Wrapper for Sticky Flags */}
                <div className="relative w-full max-w-[1600px] mx-auto">
                    <HeroCarousel slides={[slide1, slide2, slide3, slide4]} interval={3000} />

                    {/* Sticky Floating Flags */}
                    <div className="absolute bottom-0 left-0 w-full overflow-hidden py-3 md:py-4 z-20">
                        <div className="w-full overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 20%, black 80%, transparent)' }}>
                            <div className="flex w-max animate-scroll-right gap-8 md:gap-16 items-center">
                                {/* First Set of Flags */}
                                {[
                                    { code: 'in', name: 'India' },
                                    { code: 'us', name: 'USA' },
                                    { code: 'gb', name: 'UK' },
                                    { code: 'ca', name: 'Canada' },
                                    { code: 'au', name: 'Australia' },
                                    { code: 'de', name: 'Germany' },
                                    { code: 'ie', name: 'Ireland' },
                                    { code: 'nz', name: 'New Zealand' },
                                    { code: 'fr', name: 'France' },
                                    { code: 'sg', name: 'Singapore' },
                                    /* Duplicate for seamless loop */
                                    { code: 'in', name: 'India' },
                                    { code: 'us', name: 'USA' },
                                    { code: 'gb', name: 'UK' },
                                    { code: 'ca', name: 'Canada' },
                                    { code: 'au', name: 'Australia' },
                                    { code: 'de', name: 'Germany' },
                                    { code: 'ie', name: 'Ireland' },
                                    { code: 'nz', name: 'New Zealand' },
                                    { code: 'fr', name: 'France' },
                                    { code: 'sg', name: 'Singapore' }
                                ].map((country, index) => (
                                    <img
                                        key={index}
                                        src={`https://flagcdn.com/w160/${country.code}.png`}
                                        alt={country.name}
                                        className="h-8 md:h-10 w-auto object-cover rounded shadow-sm hover:scale-110 transition-transform duration-300 opacity-90 hover:opacity-100"
                                        title={country.name}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Floating Icons (Bottom-Right Corner) */}
                <div className="fixed bottom-6 right-4 z-50 flex flex-col gap-3 md:bottom-8 md:right-8 md:gap-4">

                    <a
                        href="https://wa.me/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block transition-transform hover:scale-110 active:scale-95"
                    >
                        <img
                            src={whatsappIcon}
                            alt="Chat on WhatsApp"
                            className="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-lg hover:drop-shadow-xl"
                        />
                    </a>
                </div>

                {/* Support Section */}
                <div className="w-full mt-8">
                    <SupportSection onScheduleClick={() => setIsBookingModalOpen(true)} />
                </div>
            </main>

            {/* Full Width Sections */}
            <DestinationsSection />
            <StudentStoriesSection />
            <AboutUsSection />
            <TeamSection />
            <ConsultantCTA />
            <Footer />
        </div>
    );
};

export default LandingPage;
