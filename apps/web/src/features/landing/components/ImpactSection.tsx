import React from 'react';
import loanHero from '../../../assets/loan_hero.webp';

const ImpactSection = () => {
    return (
        <section className="relative py-[100px] px-10 max-w-[1500px] w-[95%] mx-auto my-10 rounded-[40px] text-white overflow-visible bg-gradient-to-br from-[#f47895] to-[#cf44c3] font-sans">
            {/* Background Map Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-linen.webp')] opacity-10 pointer-events-none rounded-[40px]" />

            <div className="relative z-10 max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-[60px] lg:gap-[80px] lg:pb-0">
                <div className="flex flex-col lg:justify-start gap-6 w-full max-w-[450px]">
                    {/* Stat 1: Universities */}
                    <div className="flex-1 min-w-0 lg:min-w-[300px] lg:max-w-[380px]">
                        <div className="mb-2">
                            <span className="material-symbols-outlined text-4xl">school</span>
                        </div>
                        <div>
                            <h3 className="text-[28px] lg:text-[32px] font-bold m-0 leading-tight">850+</h3>
                            <p className="text-base m-0 opacity-90">Recommend Universites</p>
                        </div>
                    </div>

                    {/* Stat 2: Courses */}
                    <div className="flex-1 min-w-0 lg:min-w-[300px] lg:max-w-[380px]">
                        <div className="mb-2">
                            <span className="material-symbols-outlined text-4xl">auto_stories</span>
                        </div>
                        <div>
                            <h3 className="text-[28px] lg:text-[32px] font-bold m-0 leading-tight">150K+</h3>
                            <p className="text-base m-0 opacity-90">Courses</p>
                        </div>
                    </div>

                    {/* Stat 3: Scholarships */}
                    <div className="flex-1 min-w-0 lg:min-w-[300px] lg:max-w-[380px]">
                        <div className="mb-2">
                            <span className="material-symbols-outlined text-4xl">savings</span>
                        </div>
                        <div>
                            <h3 className="text-[28px] lg:text-[32px] font-bold m-0 leading-tight">$40M+</h3>
                            <p className="text-base m-0 opacity-90">Scholarships Facilitated</p>
                        </div>
                    </div>
                </div>

                <div className="relative w-full max-w-[700px] lg:max-w-[750px] flex items-center justify-center">
                    <img src={loanHero} alt="Loan Statistics" className="w-full h-auto object-contain rounded-[20px] scale-110 origin-center" />
                </div>
            </div>
        </section>
    );
};

export default ImpactSection;

