import React from 'react';
import { useNavigate } from 'react-router-dom';
import img1 from '@/assets/about_us_1.webp';
import img2 from '@/assets/about_us_2.webp';
import img4 from '@/assets/about_us_4.webp';

const AboutUsSection = () => {
    const navigate = useNavigate();

    return (
        <section className="relative py-24 w-full overflow-hidden bg-[#fafafa]" id="about">
            {/* Grid Background pattern mimicking notebook/graph paper */}
            <div className="absolute inset-0 bg-grid-purple opacity-80 pointer-events-none z-0"></div>

            <div className="max-w-[1300px] mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-20">
                    
                    {/* Left Column: Text Content */}
                    <div className="flex-1 flex flex-col items-start space-y-7 lg:max-w-xl">
                        <div className="bg-[#f3e8ff] text-[#7e22ce] px-5 py-1.5 rounded-full font-bold text-sm tracking-wide">
                            About Us
                        </div>
                        
                        <h2 className="text-4xl md:text-5xl font-extrabold text-[#0f172a] leading-[1.15] font-sans tracking-tight">
                            Your Trusted Partner For <br className="hidden md:block"/>
                            International Education
                        </h2>
                        
                        <div className="space-y-6 text-[#475569] text-base md:text-[17px] leading-relaxed font-medium">
                            <p>
                                Since 2010, Eaoverseas has been guiding students on their journey to quality international education. Our team of experienced advisors is committed to helping you find the right program, university, and country for your academic and career goals.
                            </p>
                            <p>
                                With a success rate of over 95% in university placements and visa approvals, we take pride in our personalized approach to each student's unique situation and aspirations.
                            </p>
                        </div>
                        
                        <button 
                            className="mt-6 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-[0_8px_30px_rgba(139,92,246,0.3)] hover:shadow-[0_8px_30px_rgba(139,92,246,0.4)] hover:-translate-y-1"
                            onClick={() => navigate('/about')}
                        >
                            Explore More About US
                        </button>
                    </div>

                    {/* Right Column: 2x2 Image Grid */}
                    <div className="flex-1 w-full lg:w-auto">
                        <div className="grid grid-cols-2 gap-4 md:gap-5 w-full max-w-lg mx-auto lg:mr-0 lg:ml-auto">
                            {/* Top Left */}
                            <div className="overflow-hidden rounded-2xl shadow-md border-[3px] border-white aspect-square transform hover:scale-[1.02] transition-transform duration-300 bg-gray-100">
                                <img src={img1} alt="Campus facilities" className="w-full h-full object-cover" />
                            </div>
                            
                            {/* Top Right */}
                            <div className="overflow-hidden rounded-2xl shadow-md border-[3px] border-white aspect-square transform hover:scale-[1.02] transition-transform duration-300 bg-gray-100">
                                <img src={img2} alt="Student counseling session" className="w-full h-full object-cover" />
                            </div>

                            {/* Bottom Left */}
                            <div className="overflow-hidden rounded-2xl shadow-md border-[3px] border-white aspect-square transform hover:scale-[1.02] transition-transform duration-300 bg-gray-100">
                                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop" alt="Students studying together" className="w-full h-full object-cover" />
                            </div>

                            {/* Bottom Right */}
                            <div className="overflow-hidden rounded-2xl shadow-md border-[3px] border-white aspect-square transform hover:scale-[1.02] transition-transform duration-300 bg-gray-100">
                                <img src={img4} alt="Workshop event" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AboutUsSection;
