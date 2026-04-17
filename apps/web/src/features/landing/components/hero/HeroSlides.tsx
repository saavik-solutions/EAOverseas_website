import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import assets from @/assets for correct bundling
import heroSuccess from '@/assets/hero_mobile_cartoon.webp';
import heroScholarship from '@/assets/loan_hero.webp';
import heroDestinations from '@/assets/destinations_hero.webp';
import visaSuccessHero from '@/assets/visa_success_hero.webp';
import universityMatchHero from '@/assets/university_match_hero.webp';
import ieltsPrepHero from '@/assets/ielts_prep_hero.webp';
import preDepartureHero from '@/assets/pre_departure_hero.webp';
import accommodationHero from '@/assets/accommodation_hero.webp';

interface SlideProps {
  onBookingClick: () => void;
}

export const MainSlide: React.FC<SlideProps> = ({ onBookingClick }) => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full min-h-[500px] md:min-h-[550px] md:h-full flex items-center justify-center overflow-hidden pt-28 pb-10 md:pt-40 md:pb-20">
      <div className="max-w-[1400px] w-full px-6 lg:px-16 grid lg:grid-cols-2 gap-10 md:gap-24 items-center z-10 text-left">
        <div className="space-y-6 md:space-y-8 animate-fade-in-up order-1 lg:order-1">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-500 font-bold text-[10px] md:text-[11px] tracking-[0.2em] uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
            </span>
            Executive Education Advisory
          </div>
          <h2 className="text-[28px] sm:text-[32px] md:text-[54px] lg:text-[72px] font-black text-[#0f172a] leading-[1.1] md:leading-[1.05] tracking-tight font-bricolage transition-all">
            Secure Your <br />
            <span className="text-[#7a29c2]">Global Future</span> <br />
            With Expert Guidance.
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-slate-500 max-w-xl leading-relaxed font-medium">
            Strategic university matching, sophisticated financial planning, and end-to-end visa compliance for the ambitious student.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 pt-4">
            <button
              onClick={() => window.open('https://student.eaoverseas.com/auth/signup', '_blank', 'noopener,noreferrer')}
              className="group relative px-8 md:px-10 py-4 md:py-5 bg-[#0f172a] text-white font-bold rounded-2xl overflow-hidden transition-all hover:bg-[#1e293b] hover:translate-y-[-2px] active:translate-y-[0px] shadow-xl shadow-slate-900/10"
            >
              Sign Up
            </button>
            <button
              onClick={onBookingClick}
              className="px-8 md:px-10 py-4 md:py-5 bg-white border border-slate-200 text-slate-900 font-bold rounded-2xl transition-all hover:bg-slate-50 hover:border-slate-300 flex items-center justify-center gap-3 hover:translate-y-[-2px] active:translate-y-[0px] shadow-sm"
            >
              <span className="material-symbols-outlined text-purple-600">calendar_today</span>
              Free Consultation
            </button>
          </div>
        </div>
        <div className="relative order-2 lg:order-2 mt-8 lg:mt-0 animate-fade-in-right">
            <div className="relative z-10 group bg-slate-50 p-3 rounded-[3.5rem] border border-slate-100 shadow-inner">
                <img 
                    src="/assets/lcp/hero_mobile_cartoon.webp" 
                    alt="Strategic Student Success" 
                    width={800}
                    height={500}
                    loading="lazy"
                    className="relative w-full h-[280px] sm:h-[400px] lg:h-[500px] object-cover rounded-[3rem] grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
                />
            </div>
            {/* Enterprise Stats Card */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-[2rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-20 transition-transform hover:translate-y-[-4px]">
                <div className="flex items-center gap-4">
                    <div className="size-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                        <span className="material-symbols-outlined font-bold">verified</span>
                    </div>
                    <div>
                        <div className="text-3xl font-black text-slate-900 font-bricolage tracking-tighter">98.4%</div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Visa Success Rate</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export const ScholarshipSlide: React.FC<SlideProps> = ({ onBookingClick }) => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full min-h-[500px] md:min-h-[550px] md:h-full flex items-center justify-center overflow-hidden pt-28 pb-10 md:pt-40 md:pb-20">
      <div className="max-w-[1400px] w-full px-6 lg:px-16 grid lg:grid-cols-2 gap-10 md:gap-24 items-center z-10 text-left">
        <div className="space-y-6 md:space-y-8 animate-fade-in-up order-1 lg:order-1">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-[#7a29c2] font-bold text-[10px] md:text-[11px] tracking-[0.2em] uppercase">
            Financial Strategy & Awards
          </div>
          <h1 className="text-[28px] sm:text-[32px] md:text-[54px] lg:text-[72px] font-black text-[#0f172a] leading-[1.1] md:leading-[1.05] tracking-tight font-bricolage">
            Strategic <br />
            <span className="text-[#7a29c2]">Scholarship</span> <br />
            Advisory.
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-slate-500 max-w-xl leading-relaxed font-medium">
            Optimize your academic profile to access elite funding opportunities and specialized education loans at lower interest rates.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 pt-4">
            <button
              onClick={() => window.open('https://student.eaoverseas.com/auth/login', '_blank', 'noopener,noreferrer')}
              className="px-8 md:px-10 py-4 md:py-5 bg-[#7a29c2] text-white font-bold rounded-2xl hover:bg-[#6a24aa] transition-all hover:translate-y-[-2px] active:translate-y-[0px] shadow-xl shadow-purple-900/10"
            >
              Sign In
            </button>
            <div className="flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100">
                <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                        <div key={i} className="size-8 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                            <img 
                                src={`https://i.pravatar.cc/100?img=${i+10}`} 
                                alt="Expert" 
                                width={32}
                                height={32}
                                loading="lazy"
                                className="w-full h-full object-cover" 
                            />
                        </div>
                    ))}
                </div>
                <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest">500+ Qualified Profiles</span>
            </div>
          </div>
        </div>
        <div className="relative order-2 lg:order-2 mt-8 lg:mt-0 animate-fade-in-right">
            <div className="relative p-3 bg-slate-50 rounded-[3.5rem] border border-slate-100 shadow-inner group">
                <img 
                    src="/assets/lcp/loan_hero.webp" 
                    alt="Strategic Scholarship Advisory and Funding" 
                    width={800}
                    height={500}
                    loading="eager"
                    fetchPriority="high"
                    className="relative w-full h-[280px] sm:h-[400px] lg:h-[500px] object-cover rounded-[3rem] grayscale-[0.1] group-hover:grayscale-0 transition-all duration-700"
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export const DestinationsSlide: React.FC<SlideProps> = ({ onBookingClick }) => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full min-h-[500px] md:min-h-[550px] md:h-full flex items-center justify-center overflow-hidden pt-28 pb-10 md:pt-40 md:pb-20">
      <div className="max-w-[1400px] w-full px-6 lg:px-16 grid lg:grid-cols-2 gap-10 md:gap-24 items-center z-10 text-left">
        <div className="space-y-6 md:space-y-8 animate-fade-in-up order-1 lg:order-1">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-[#7a29c2] font-bold text-[10px] md:text-[11px] tracking-[0.2em] uppercase">
            Global Network Centers
          </div>
          <h2 className="text-[28px] sm:text-[32px] md:text-[54px] lg:text-[72px] font-black text-[#0f172a] leading-[1.1] md:leading-[1.05] tracking-tight font-bricolage">
            Global <span className="text-purple-600">Hubs</span> <br />
            At Your <br />
            Command.
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-slate-500 max-w-xl leading-relaxed font-medium">
            Seamless access to 500+ top-tier universities across 15+ high-growth destinations including the USA, UK, and Canada.
          </p>
          <div className="flex flex-wrap gap-2 md:gap-3 py-2">
            {['USA', 'United Kingdom', 'Canada', 'Australia', 'Germany'].map(c => (
              <span key={c} className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-[11px] font-black text-slate-600 transition-all hover:border-purple-300 hover:text-purple-700 cursor-default shadow-sm uppercase tracking-widest">{c}</span>
            ))}
          </div>
          <button
            onClick={() => navigate('/countries')}
            className="px-8 md:px-10 py-4 md:py-5 bg-[#7a29c2] text-white font-bold rounded-2xl transition-all hover:bg-[#6a24aa] hover:translate-y-[-2px] active:translate-y-[0px] shadow-xl shadow-purple-900/10"
          >
            Explore Network
          </button>
        </div>
        <div className="relative flex justify-center lg:justify-end mt-8 lg:mt-0 order-2 lg:order-2">
          <div className="relative overflow-hidden group">
            <img 
              src={heroDestinations} 
              alt="International Network" 
              width={600}
              height={500}
              className="w-[300px] sm:w-[450px] lg:w-[600px] h-auto object-contain grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export const VisaSlide: React.FC<SlideProps> = ({ onBookingClick }) => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full min-h-[500px] md:min-h-[550px] md:h-full flex items-center justify-center overflow-hidden pt-28 pb-10 md:pt-40 md:pb-20">
      <div className="max-w-[1400px] w-full px-6 lg:px-16 grid lg:grid-cols-2 gap-10 md:gap-24 items-center z-10 text-left">
        <div className="space-y-6 md:space-y-8 animate-fade-in-up order-1 lg:order-1">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 font-bold text-[10px] md:text-[11px] tracking-[0.2em] uppercase">
            Visa Compliance Excellence
          </div>
          <h2 className="text-[28px] sm:text-[32px] md:text-[54px] lg:text-[72px] font-black text-[#0f172a] leading-[1.1] md:leading-[1.05] tracking-tight font-bricolage">
            Seamless <br />
            <span className="text-emerald-600">Visa</span> <br />
            Approvals.
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-slate-500 max-w-xl leading-relaxed font-medium">
            Over 98% success rate with expert documentation auditing, mock interviews, and direct embassy compliance support.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 pt-4">
            <button
              onClick={() => navigate('/contact')}
              className="px-8 md:px-10 py-4 md:py-5 bg-emerald-600 text-white font-bold rounded-2xl hover:bg-emerald-700 transition-all hover:translate-y-[-2px] shadow-xl shadow-emerald-900/10"
            >
              Start Application
            </button>
            <button
              onClick={onBookingClick}
              className="px-8 md:px-10 py-4 md:py-5 bg-white border border-slate-200 text-slate-900 font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-sm"
            >
              Book Mock Interview
            </button>
          </div>
        </div>
        <div className="relative order-2 lg:order-2 mt-8 lg:mt-0 animate-fade-in-right">
            <div className="relative p-3 bg-slate-50 rounded-[3.5rem] border border-slate-100 shadow-inner group">
                <img 
                    src={visaSuccessHero} 
                    alt="Visa Success" 
                    width={800}
                    height={500}
                    className="w-full h-[280px] sm:h-[400px] lg:h-[500px] object-cover rounded-[3rem] grayscale-[0.1] group-hover:grayscale-0 transition-all duration-700" 
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export const UniversityMatchSlide: React.FC<SlideProps> = ({ onBookingClick }) => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full min-h-[500px] md:min-h-[550px] md:h-full flex items-center justify-center overflow-hidden pt-28 pb-10 md:pt-40 md:pb-20">
      <div className="max-w-[1400px] w-full px-6 lg:px-16 grid lg:grid-cols-2 gap-10 md:gap-24 items-center z-10 text-left">
        <div className="space-y-6 md:space-y-8 animate-fade-in-up order-1 lg:order-1">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-bold text-[10px] md:text-[11px] tracking-[0.2em] uppercase">
            AI-Powered Matchmaking
          </div>
          <h2 className="text-[28px] sm:text-[32px] md:text-[54px] lg:text-[72px] font-black text-[#0f172a] leading-[1.1] md:leading-[1.05] tracking-tight font-bricolage">
            Perfect <br />
            <span className="text-blue-600">University</span> <br />
            Matching.
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-slate-500 max-w-xl leading-relaxed font-medium">
            Our proprietary AI platform matches you with the best-fit universities based on your profile, career goals, and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 pt-4">
            <button
              onClick={() => navigate('/about')}
              className="px-8 md:px-10 py-4 md:py-5 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all hover:translate-y-[-2px] shadow-xl shadow-blue-900/10"
            >
              Analyze My Profile
            </button>
          </div>
        </div>
        <div className="relative order-2 lg:order-2 mt-8 lg:mt-0 animate-fade-in-right">
            <div className="relative p-3 bg-slate-50 rounded-[3.5rem] border border-slate-100 shadow-inner group">
                <img 
                    src={universityMatchHero} 
                    alt="University Match" 
                    width={800}
                    height={500}
                    className="w-full h-[280px] sm:h-[400px] lg:h-[500px] object-cover rounded-[3rem] grayscale-[0.1] group-hover:grayscale-0 transition-all duration-700" 
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export const IELTSSlide: React.FC<SlideProps> = ({ onBookingClick }) => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full min-h-[500px] md:min-h-[550px] md:h-full flex items-center justify-center overflow-hidden pt-28 pb-10 md:pt-40 md:pb-20">
      <div className="max-w-[1400px] w-full px-6 lg:px-16 grid lg:grid-cols-2 gap-10 md:gap-24 items-center z-10 text-left">
        <div className="space-y-6 md:space-y-8 animate-fade-in-up order-1 lg:order-1">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-rose-700 font-bold text-[10px] md:text-[11px] tracking-[0.2em] uppercase">
            Language Proficiency Hub
          </div>
          <h2 className="text-[28px] sm:text-[32px] md:text-[54px] lg:text-[72px] font-black text-[#0f172a] leading-[1.1] md:leading-[1.05] tracking-tight font-bricolage">
            Master <br />
            <span className="text-rose-600">IELTS / PTE</span> <br />
            with Ease.
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-slate-500 max-w-xl leading-relaxed font-medium">
            Custom coaching plans and professional trainers focused on helping you achieve a band score of 7.5+ in your first attempt.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 pt-4">
            <button
              onClick={() => navigate('/contact')}
              className="px-8 md:px-10 py-4 md:py-5 bg-rose-600 text-white font-bold rounded-2xl hover:bg-rose-700 transition-all hover:translate-y-[-2px] shadow-xl shadow-rose-900/10"
            >
              Join Classes
            </button>
            <button
              onClick={onBookingClick}
              className="px-8 md:px-10 py-4 md:py-5 bg-white border border-slate-200 text-slate-900 font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-sm"
            >
              Get Free Demo
            </button>
          </div>
        </div>
        <div className="relative order-2 lg:order-2 mt-8 lg:mt-0 animate-fade-in-right">
            <div className="relative p-3 bg-slate-50 rounded-[3.5rem] border border-slate-100 shadow-inner group">
                <img 
                    src={ieltsPrepHero} 
                    alt="IELTS Prep" 
                    width={800}
                    height={500}
                    className="w-full h-[280px] sm:h-[400px] lg:h-[500px] object-cover rounded-[3rem] grayscale-[0.1] group-hover:grayscale-0 transition-all duration-700" 
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export const PreDepartureSlide: React.FC<SlideProps> = ({ onBookingClick }) => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full min-h-[500px] md:min-h-[550px] md:h-full flex items-center justify-center overflow-hidden pt-28 pb-10 md:pt-40 md:pb-20">
      <div className="max-w-[1400px] w-full px-6 lg:px-16 grid lg:grid-cols-2 gap-10 md:gap-24 items-center z-10 text-left">
        <div className="space-y-6 md:space-y-8 animate-fade-in-up order-1 lg:order-1">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-amber-700 font-bold text-[10px] md:text-[11px] tracking-[0.2em] uppercase">
            Orientation & Beyond
          </div>
          <h2 className="text-[28px] sm:text-[32px] md:text-[54px] lg:text-[72px] font-black text-[#0f172a] leading-[1.1] md:leading-[1.05] tracking-tight font-bricolage">
            Smooth <br />
            <span className="text-amber-600">Transition</span> <br />
            Abroad.
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-slate-500 max-w-xl leading-relaxed font-medium">
            Pre-departure briefings, airport pickups, and initial settlement support to ensure you feel at home the moment you land.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 pt-4">
            <button
              onClick={() => navigate('/about')}
              className="px-8 md:px-10 py-4 md:py-5 bg-amber-600 text-white font-bold rounded-2xl hover:bg-amber-700 transition-all hover:translate-y-[-2px] shadow-xl shadow-amber-900/10"
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="relative order-2 lg:order-2 mt-8 lg:mt-0 animate-fade-in-right">
            <div className="relative p-3 bg-slate-50 rounded-[3.5rem] border border-slate-100 shadow-inner group">
                <img 
                    src={preDepartureHero} 
                    alt="Pre-Departure" 
                    width={800}
                    height={500}
                    className="w-full h-[280px] sm:h-[400px] lg:h-[500px] object-cover rounded-[3rem] grayscale-[0.1] group-hover:grayscale-0 transition-all duration-700" 
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export const AccommodationSlide: React.FC<SlideProps> = ({ onBookingClick }) => {
  const navigate = useNavigate();
  return (
    <div className="relative w-full min-h-[500px] md:min-h-[550px] md:h-full flex items-center justify-center overflow-hidden pt-28 pb-10 md:pt-40 md:pb-20">
      <div className="max-w-[1400px] w-full px-6 lg:px-16 grid lg:grid-cols-2 gap-10 md:gap-24 items-center z-10 text-left">
        <div className="space-y-6 md:space-y-8 animate-fade-in-up order-1 lg:order-1">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-violet-50 border border-violet-100 text-violet-700 font-bold text-[10px] md:text-[11px] tracking-[0.2em] uppercase">
            Premium Living Solutions
          </div>
          <h2 className="text-[28px] sm:text-[32px] md:text-[54px] lg:text-[72px] font-black text-[#0f172a] leading-[1.1] md:leading-[1.05] tracking-tight font-bricolage">
            Curated <br />
            <span className="text-violet-600">Living</span> <br />
            Spaces.
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-slate-500 max-w-xl leading-relaxed font-medium">
            Affordable and secure student accommodation options near your university campus, personally vetted by our local team.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 pt-4">
            <button
              onClick={() => navigate('/contact')}
              className="px-8 md:px-10 py-4 md:py-5 bg-violet-600 text-white font-bold rounded-2xl hover:bg-violet-700 transition-all hover:translate-y-[-2px] shadow-xl shadow-violet-900/10"
            >
              Browse Options
            </button>
          </div>
        </div>
        <div className="relative order-2 lg:order-2 mt-8 lg:mt-0 animate-fade-in-right">
            <div className="relative p-3 bg-slate-50 rounded-[3.5rem] border border-slate-100 shadow-inner group">
                <img 
                    src={accommodationHero} 
                    alt="Accommodation" 
                    width={800}
                    height={500}
                    className="w-full h-[280px] sm:h-[400px] lg:h-[500px] object-cover rounded-[3rem] grayscale-[0.1] group-hover:grayscale-0 transition-all duration-700" 
                />
            </div>
        </div>
      </div>
    </div>
  );
};
