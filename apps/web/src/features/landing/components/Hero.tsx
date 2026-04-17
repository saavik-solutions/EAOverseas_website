import React from 'react';
import { useNavigate } from 'react-router-dom';
import chatIcon from '@/assets/icon_chat.webp';
import whatsappIcon from '@/assets/icon_whatsapp.webp';
import { getWhatsAppLink } from '@/shared/constants/contacts';

const Hero = () => {
    const navigate = useNavigate();
    return (
        <section className="relative flex flex-col items-center py-16 px-8 max-md:py-12 max-sm:px-4 max-w-[1440px] mx-auto text-center font-sans">
            <div className="max-w-[900px] flex flex-col items-center gap-8 mb-16">
                <h1 className="font-bold text-[80px] max-md:text-[48px] max-sm:text-[38px] leading-[1.1] text-slate-900 m-0 tracking-tight">
                    Discover the Future <br /> with EAOverseas
                </h1>
                <p className="font-normal text-[20px] max-sm:text-[16px] leading-relaxed text-slate-800 max-w-[760px] m-0">
                    We empower students to study abroad with affordable guidance and end-to-
                    end support. Whether it's your dream university, visa processing, or career
                    counseling — we've got you covered.
                </p>
                <button
                    className="bg-[#7a29c2] hover:bg-[#6823a4] text-white border-none py-4 px-8 rounded-lg text-[18px] font-semibold cursor-pointer w-fit transition-all duration-200 outline-none shadow-md hover:shadow-lg hover:-translate-y-1"
                    onClick={() => navigate('/about')}
                >
                    Explore More About Us
                </button>
            </div>

            <div className="flex gap-16 max-md:gap-8 mt-8 flex-wrap justify-center items-center">
                <div className="font-bold text-[24px] text-slate-300 transition-colors duration-300 hover:text-slate-400 cursor-default">logoipsum</div>
                <div className="font-bold text-[24px] text-slate-400 transition-colors duration-300 hover:text-slate-500 cursor-default">logoipsum</div>
                <div className="font-bold text-[24px] text-slate-500 transition-colors duration-300 hover:text-slate-600 cursor-default">logoipsum</div>
                <div className="font-bold text-[24px] text-slate-400 transition-colors duration-300 hover:text-slate-500 cursor-default">logoipsum</div>
                <div className="font-bold text-[24px] text-slate-300 transition-colors duration-300 hover:text-slate-400 cursor-default">logoipsum</div>
            </div>

            <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-[100] max-sm:bottom-4 max-sm:right-4">
                <a href="#chat" className="w-[60px] h-[60px] flex items-center justify-center cursor-pointer transition-transform duration-300 hover:-translate-y-1 no-underline" aria-label="Chat with us">
                    <img src={chatIcon} alt="Chat" className="w-full h-full object-contain drop-shadow-md" />
                </a>
                <a href={getWhatsAppLink()} className="w-[60px] h-[60px] flex items-center justify-center cursor-pointer transition-transform duration-300 hover:-translate-y-1 no-underline" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer">
                    <img src={whatsappIcon} alt="WhatsApp" className="w-full h-full object-contain drop-shadow-md" />
                </a>
            </div>
        </section>
    );
};

export default Hero;

