import React from 'react';
import { useNavigate } from 'react-router-dom';

const JourneyCTASection = () => {
  const navigate = useNavigate();
  return (
    <section className="py-24 px-6 lg:px-8 w-full font-sans bg-transparent overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        <div className="relative isolate overflow-hidden bg-transparent rounded-[40px] px-8 py-16 md:px-16 lg:px-20 lg:py-20">
          
          {/* Background decorative wavy lines */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <svg className="absolute w-full h-full" viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" fill="none" stroke="#7a29c2" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="8 8">
              <path d="M-100,50 C200,-50 300,350 700,150 C1100,-50 1200,250 1400,100" />
              <path d="M-100,200 C150,400 350,-50 800,250 C1200,550 1250,50 1400,200" />
              <path d="M-100,350 C200,550 400,150 750,350 C1100,550 1200,150 1400,300" />
              <path d="M400,-100 C500,200 600,0 700,400" />
            </svg>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10 w-full">
            
            {/* Left Column Content */}
            <div className="flex flex-col space-y-6 lg:max-w-[480px]">
              <h2 className="text-4xl md:text-5xl lg:text-[50px] font-semibold text-[#1e468a] leading-[1.15] tracking-tight">
                Get Ready To Begin<br />
                <span className="relative inline-block mt-2 font-bold">
                  Your Journey
                  {/* Purple scribble underline */}
                  <svg className="absolute -bottom-4 left-0 w-full h-[18px] text-[#7a29c2] -translate-x-2" viewBox="0 0 300 18" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round">
                    <path d="M10,10 Q100,0 200,12 T290,5 M30,15 Q120,5 230,16" />
                  </svg>
                </span>
              </h2>
              
              <p className="text-gray-600 text-[16px] leading-relaxed pt-2 max-w-[380px]">
                Explore more, stay informed, and start your journey to academic excellence.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-6">
                <button 
                  onClick={() => navigate('/contact')}
                  className="bg-[#581c87] text-white hover:bg-[#431407] hover:shadow-lg transition-all font-bold px-7 py-3.5 rounded-[10px] text-[15px] shadow-sm"
                >
                  Contact Us
                </button>
              </div>
            </div>

            {/* Right Column Images */}
            <div className="relative h-[250px] lg:h-[400px] flex items-center justify-center lg:justify-end">
              {/* Floating Icons Base SVGs */}
              
              {/* Map pin */}
              <div className="absolute top-[10%] left-[10%] lg:left-[20%] text-transparent z-20 animate-[bounce_4s_infinite]">
                 <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#7a29c2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-sm opacity-80">
                   <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                   <circle cx="12" cy="10" r="3"></circle>
                 </svg>
              </div>

               {/* Grad Cap */}
               <div className="absolute -top-10 lg:-top-16 right-[10%] lg:right-[30%] text-transparent z-20 animate-[bounce_5s_infinite_1s]">
                 <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#7a29c2" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-sm text-purple-900 opacity-90 -rotate-12">
                   <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                   <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                 </svg>
              </div>

               {/* Certificate */}
               <div className="absolute bottom-[0%] right-[5%] lg:-right-4 text-transparent z-20 animate-[bounce_4.5s_infinite_0.5s]">
                 <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#7a29c2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-sm text-purple-900 opacity-90 rotate-[15deg]">
                   <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"></path>
                   <path d="M14.5 13.5 16 19l-4-1.5L8 19l1.5-5.5"></path>
                   <path d="m15 5-3-3-3 3"></path>
                   <path d="M5 5h14v14H5z"></path>
                 </svg>
              </div>

              {/* Central Girl Image wrapped in an organic shape mask */}
              <div className="relative z-10 w-[240px] h-[240px] lg:w-[350px] lg:h-[350px] mx-auto overflow-visible">
                 <div className="absolute inset-x-0 bottom-0 top-10 rounded-full bg-blue-400/20 blur-2xl"></div>
                 {/* Used a high quality standard portrait image but clipped to a nice circular frame so it mimics a cutout perfectly with rounded-full */}
                 <div className="w-full h-full rounded-full border-[10px] border-white/10 overflow-hidden shadow-2xl bg-gray-100/10">
                    <img 
                       src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop" 
                       className="w-full h-full object-cover relative z-10 hover:scale-105 transition-transform duration-700"
                       alt="Student Journey"
                    />
                 </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JourneyCTASection;
