import React, { useState } from 'react';
import leavesImage from '@/assets/support_palm_leaves.webp';
import fabricImage from '@/assets/support_fabric_texture.webp';

const steps = [
    {
        number: '01',
        title: 'Counseling',
        description: 'Expert guidance to help you choose the right career path and university based on your aspirations.'
    },
    {
        number: '02',
        title: 'Test Preparation',
        description: 'Comprehensive training for IELTS, TOEFL, GRE, GMAT, and SAT to help you achieve your target scores.'
    },
    {
        number: '03',
        title: 'University Selection',
        description: 'Personalized recommendations based on your profile, goals, and budget with direct connections to 500+ institutions worldwide.'
    },
    {
        number: '04',
        title: 'Visa Assistance',
        description: 'End-to-end support for visa application, documentation, and mock interviews to ensure a high success rate.'
    },
    {
        number: '05',
        title: 'Pre-departure',
        description: 'Guidance on accommodation, travel, insurance, and settling in a new country to make your transition smooth.'
    }
];

const SupportSection = ({ onScheduleClick }: { onScheduleClick?: () => void }) => {
    const [currentStep, setCurrentStep] = useState(2);

    const nextStep = () => setCurrentStep((prev) => (prev + 1) % steps.length);
    const prevStep = () => setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);

    return (
        <section className="flex flex-col items-center px-8 pb-16 max-w-[1600px] w-full mx-auto font-sans max-sm:px-4">
            <div className="inline-block bg-[#f3e8ff] text-[#7a29c2] py-1.5 px-5 rounded-full text-[13px] font-medium uppercase tracking-wider mb-6">Our Services</div>
            <h2 className="font-bold text-[40px] max-sm:text-[20px] text-center text-black mb-16 max-sm:mb-8 leading-tight">
                Comprehensive Support for Your Study <br className="hidden md:block" /> Abroad Journey
            </h2>

            <div className="flex justify-center max-md:flex-col items-center gap-6 w-full max-w-full">
                <div className="bg-white shadow-[2px_2px_15px_13px_rgba(0,0,0,0.05)] rounded-[10px] max-sm:rounded-2xl p-12 max-sm:p-3 flex flex-col relative overflow-hidden border border-[#BFBFBF] w-[584px] h-[584px] max-sm:w-full max-sm:h-auto max-w-full">
                    
                    {/* Step Indicator Desktop */}
                    <div className="flex flex-col gap-3 absolute left-10 top-1/2 -translate-y-1/2 items-center z-10 max-sm:hidden">
                        {steps.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentStep(index)}
                                className={`p-0 border-none cursor-pointer transition-all duration-300 ${index === currentStep ? 'relative w-2 h-10 bg-[#7a29c2] rounded-[10px] block' : 'w-2 h-2 bg-[#d8b4fe] rounded-full'}`}
                                aria-label={`Go to step ${index + 1}`}
                            />
                        ))}
                    </div>

                    <div className="ml-0 flex-1 overflow-hidden w-full relative text-center">
                        <div
                            className="flex w-full h-full transition-transform duration-[600ms] ease-[cubic-bezier(0.25,1,0.5,1)]"
                            style={{ transform: `translateX(-${currentStep * 100}%)` }}
                        >
                            {steps.map((step, index) => (
                                <div key={index} className="min-w-full flex flex-col items-center justify-center pr-0 opacity-100 transition-opacity duration-400">
                                    <h1 className="font-black text-[100px] max-sm:text-[40px] leading-none m-0 text-[#e3e3e3] text-center w-full mb-5 max-sm:mb-1 [&]:[-webkit-text-stroke:2px_#d8b4fe] max-sm:[&]:[-webkit-text-stroke:1px_#d8b4fe]">{step.number}</h1>
                                    <h3 className="font-bold text-[30px] max-sm:text-[16px] text-black mx-auto mb-4 max-sm:mb-1 text-center w-full leading-tight">{step.title}</h3>
                                    <p className="font-normal italic text-[16px] max-sm:text-[12px] leading-relaxed max-sm:leading-[1.4] text-[#373737] opacity-80 text-center max-w-[400px] mx-auto m-0 max-sm:mb-2">
                                        {step.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-6 max-sm:gap-3 mt-auto w-full pl-0">
                        <div className="flex gap-6 max-sm:gap-3 justify-center w-full max-sm:my-0">
                            <button className="w-11 h-11 max-sm:w-7 max-sm:h-7 rounded-full border border-[#E0E0E0] bg-white flex items-center justify-center cursor-pointer text-[#555] text-lg max-sm:text-xs transition-all duration-200 hover:bg-[#F5F5F5] hover:border-[#bbb] hover:scale-105" onClick={prevStep}>&lt;</button>
                            <button className="w-11 h-11 max-sm:w-7 max-sm:h-7 rounded-full border border-[#E0E0E0] bg-white flex items-center justify-center cursor-pointer text-[#555] text-lg max-sm:text-xs transition-all duration-200 hover:bg-[#F5F5F5] hover:border-[#bbb] hover:scale-105" onClick={nextStep}>&gt;</button>
                        </div>

                        <button onClick={onScheduleClick} className="bg-[#2D83F2] hover:bg-[#7e22ce] rounded-lg border-none text-white py-3.5 px-8 max-sm:py-2 max-sm:px-4 font-semibold text-[18px] max-sm:text-[13px] cursor-pointer w-full transition-colors duration-200 flex justify-center items-center">Schedule a Free Meeting</button>
                    </div>
                </div>

                <div className="flex flex-col gap-6 max-sm:hidden">
                    <div className="rounded-[10px] overflow-hidden shadow-[4px_4px_20px_rgba(0,0,0,0.25)] border border-[#BFBFBF] w-[438px] max-w-full mx-auto h-[359px]">
                        <img src={leavesImage} alt="Palm leaves" className="w-full h-full object-cover" />
                    </div>
                    <div className="rounded-[10px] overflow-hidden shadow-[4px_4px_20px_rgba(0,0,0,0.25)] border border-[#BFBFBF] w-[438px] max-w-full mx-auto h-[205px]">
                        <img src={fabricImage} alt="Fabric texture" className="w-full h-full object-cover" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SupportSection;

