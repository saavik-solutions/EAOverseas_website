import React from 'react';
import destHero from '@/assets/figma_hero_bg.webp'; // Using the user's uploaded image

const FigmaHeroSection: React.FC = () => {
  return (
    <div className="relative w-full min-h-[100vh] flex flex-col items-center justify-center overflow-hidden bg-black font-bricolage">
      
      {/* Background Image (Brighter) */}
      <img
        src={destHero}
        alt="Global Landmarks Composite"
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />

      {/* Abstract Animated Glows from User's Design */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-[#ff5700] blur-[150px] opacity-20 rounded-full animate-pulse pointer-events-none" style={{ animationDuration: '4s' }} />
      <div className="absolute top-[30%] right-[-10%] w-[50%] h-[50%] bg-[#9500e5] blur-[150px] opacity-20 rounded-full animate-pulse pointer-events-none" style={{ animationDuration: '6s' }} />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-start md:justify-center text-center gap-6 md:gap-10 px-4 pt-32 md:pt-40 max-w-[1200px] mx-auto w-full min-h-screen md:min-h-fit">
        
        {/* Huge Heading */}
        <h1 className="flex flex-col font-medium leading-[1.05] tracking-tight drop-shadow-2xl">
          <span className="text-white text-[38px] md:text-[90px] lg:text-[110px]" style={{ textShadow: '0px 0px 20px rgba(0,0,0,0.5)' }}>
            Where the World Is
          </span>
          <span className="text-[#ffe5da] text-[38px] md:text-[90px] lg:text-[110px]" style={{ textShadow: '0px 0px 20px rgba(0,0,0,0.5)' }}>
            Your Campus
          </span>
        </h1>

        {/* Animated Subtitle (Premium Motion Feel) */}
        <div className="w-full max-w-[1000px] overflow-hidden mt-8 md:mt-32 relative" style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}>
          <div 
            className="flex whitespace-nowrap" 
            style={{ animation: 'scroll-left 25s linear infinite' }}
          >
            <style>
              {`
                @keyframes scroll-left {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
              `}
            </style>
            
            {/* We duplicate the text multiple times to create a seamless infinite scrolling loop */}
            <p className="text-white text-[20px] md:text-[24px] lg:text-[28px] font-medium leading-relaxed drop-shadow-lg px-2">
              EAOverseas helps you stand out to top universities and maximize your chances of admission.......
            </p>
            <p className="text-white text-[20px] md:text-[24px] lg:text-[28px] font-medium leading-relaxed drop-shadow-lg px-2" aria-hidden="true">
              EAOverseas helps you stand out to top universities and maximize your chances of admission.......
            </p>
            <p className="text-white text-[20px] md:text-[24px] lg:text-[28px] font-medium leading-relaxed drop-shadow-lg px-2" aria-hidden="true">
              EAOverseas helps you stand out to top universities and maximize your chances of admission.......
            </p>
            <p className="text-white text-[20px] md:text-[24px] lg:text-[28px] font-medium leading-relaxed drop-shadow-lg px-2" aria-hidden="true">
              EAOverseas helps you stand out to top universities and maximize your chances of admission.......
            </p>
          </div>
        </div>
        


      </div>
    </div>
  );
};

export default FigmaHeroSection;
