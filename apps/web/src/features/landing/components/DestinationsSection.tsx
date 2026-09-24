import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import orbitGraphic from '@/features/landing/assets/destinations_orbit_graphic.webp';
import logo from '@/assets/logo.png';
import ImageWithFallback from '@/components/common/ImageWithFallback';

type CountryKey = 'Netherlands' | 'UK' | 'USA' | 'Canada' | 'Ireland';

interface CountryMeta {
    flag: string;
    label: string;
    accent: string;
}

const countryMeta: Record<CountryKey, CountryMeta> = {
    Netherlands: { flag: '🇳🇱', label: 'Netherlands', accent: '#E87722' },
    UK:          { flag: '🇬🇧', label: 'UK', accent: '#012169' },
    USA:         { flag: '🇺🇸', label: 'USA', accent: '#B22234' },
    Canada:      { flag: '🇨🇦', label: 'Canada', accent: '#FF0000' },
    Ireland:     { flag: '🇮🇪', label: 'Ireland', accent: '#169B62' },
};

const universitiesData: Record<CountryKey, { name: string; ielts: string; ranking: string; image: string }[]> = {
    Netherlands: [
        { name: 'University of Amsterdam', ielts: '6.5', ranking: '61', image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=800' },
        { name: 'Delft University', ielts: '6.5', ranking: '57', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800' },
        { name: 'Utrecht University', ielts: '6.5', ranking: '110', image: 'https://images.unsplash.com/photo-1549700478-2cef2a1abe34?q=80&w=800' },
        { name: 'Leiden University', ielts: '6.5', ranking: '128', image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800' },
    ],
    UK: [
        { name: 'Imperial College London', ielts: '7.0', ranking: '6', image: 'https://images.unsplash.com/photo-1523050353050-0b0d3077716a?q=80&w=800' },
        { name: 'University of Oxford', ielts: '7.5', ranking: '2', image: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?q=80&w=800' },
        { name: 'University of Cambridge', ielts: '7.5', ranking: '3', image: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?q=80&w=800' },
        { name: 'UCL', ielts: '7.0', ranking: '8', image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=800' },
    ],
    USA: [
        { name: 'Harvard University', ielts: '7.5', ranking: '5', image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=800' },
        { name: 'MIT', ielts: '7.5', ranking: '1', image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800' },
        { name: 'Stanford University', ielts: '7.0', ranking: '3', image: 'https://images.unsplash.com/photo-1510526339031-6e8dd1219b6d?q=80&w=800' },
        { name: 'Yale University', ielts: '7.5', ranking: '14', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800' },
    ],
    Canada: [
        { name: 'University of Toronto', ielts: '6.5', ranking: '26', image: 'https://images.unsplash.com/photo-1549700478-2cef2a1abe34?q=80&w=800' },
        { name: 'McGill University', ielts: '6.5', ranking: '27', image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=800' },
        { name: 'UBC', ielts: '6.5', ranking: '47', image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?q=80&w=800' },
        { name: 'University of Alberta', ielts: '6.5', ranking: '110', image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=800' },
    ],
    Ireland: [
        { name: 'Trinity College Dublin', ielts: '6.5', ranking: '101', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800' },
        { name: 'University College Dublin', ielts: '6.5', ranking: '173', image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=800' },
        { name: 'University of Galway', ielts: '6.5', ranking: '270', image: 'https://images.unsplash.com/photo-1551009175-8a68da93d5f9?q=80&w=800' },
        { name: 'University College Cork', ielts: '6.5', ranking: '298', image: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?q=80&w=800' },
    ],
};

const DestinationsSection: React.FC = () => {
    const navigate = useNavigate();
    const [selectedCountry, setSelectedCountry] = useState<CountryKey>('UK');
    const countries = Object.keys(countryMeta) as CountryKey[];

    return (
        <section className="relative w-full py-20 pb-16 min-h-[900px] max-md:min-h-auto overflow-hidden bg-transparent z-0">
            <div className="max-w-[1200px] mx-auto px-8 max-sm:px-4 flex flex-col items-center relative z-10">
                {/* Section Badge */}
                <div className="inline-flex items-center gap-2 bg-primary/[0.08] border border-primary/20 text-primary text-[13px] font-semibold tracking-wide uppercase py-1.5 px-4 rounded-full mb-5">
                    <span className="w-[7px] h-[7px] rounded-full bg-primary animate-pulse" />
                    Study Abroad
                </div>

                <h2 className="font-extrabold text-[42px] max-md:text-[30px] max-sm:text-[26px] text-center text-[#0d0d0d] mb-4 tracking-tight leading-[1.15]">Popular Study Destinations</h2>
                <p className="font-normal text-[17px] max-md:text-[15px] text-center text-gray-600 max-w-[560px] mb-11 leading-relaxed">
                    Explore top education destinations across the globe with our&nbsp;
                    comprehensive guides and expert support.
                </p>

                {/* Filter row with Explore More CTA */}
                <div className="flex justify-between items-center max-md:flex-col max-md:items-start max-md:gap-3 w-full mb-9">
                    <div className="flex items-center gap-2.5 max-sm:gap-1.5 flex-wrap">
                        {countries.map(country => {
                            const isActive = selectedCountry === country;
                            return (
                                <button
                                    key={country}
                                    onClick={() => setSelectedCountry(country)}
                                    className={`inline-flex items-center gap-2 text-[14px] max-sm:text-[13px] font-medium cursor-pointer py-2 px-4 max-sm:px-3.5 rounded-full border-[1.5px] transition-all duration-300 select-none ${
                                        isActive 
                                        ? 'bg-primary border-primary text-white shadow-md shadow-primary/30 -translate-y-[2px]' 
                                        : 'bg-white border-slate-200 text-slate-600 hover:border-primary/40 hover:text-primary hover:bg-primary/5 hover:-translate-y-[1px] hover:shadow-sm'
                                    }`}
                                >
                                    <span className="text-[18px] max-sm:text-[16px] leading-none drop-shadow-sm">{countryMeta[country].flag}</span>
                                    <span className="whitespace-nowrap">{countryMeta[country].label}</span>
                                </button>
                            );
                        })}
                    </div>

                    <button
                        className="group inline-flex items-center gap-2 text-[14px] font-semibold text-slate-700 bg-white border-[1.5px] border-slate-200 rounded-full py-2 px-5 cursor-pointer transition-all duration-300 whitespace-nowrap outline-none hover:border-primary hover:text-primary hover:bg-primary/5 hover:shadow-md hover:shadow-primary/10 hover:-translate-y-[2px]"
                        onClick={() => navigate('/contact')}
                    >
                        <span>Explore More</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-0.5">
                            <path d="M3 8H13M13 8L8.5 3.5M13 8L8.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                {/* Cards grid */}
                <div className="w-full">
                    <div className="grid grid-cols-4 max-lg:grid-cols-2 max-sm:flex max-sm:overflow-x-auto gap-6 max-sm:gap-3.5 max-sm:pb-4 max-sm:w-[calc(100%+2rem)] max-sm:-ml-4 max-sm:px-4 max-sm:snap-x max-sm:snap-mandatory max-sm:[scrollbar-width:none]" key={selectedCountry}>
                        {universitiesData[selectedCountry]?.map((uni, index) => (
                            <div 
                                key={index} 
                                onClick={() => navigate('/contact')}
                                className="relative rounded-[22px] overflow-hidden min-h-[400px] max-sm:min-h-0 bg-gradient-to-b from-purple-100 via-purple-200 to-primary flex flex-col shadow-md hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(122,41,194,0.2)] transition-all duration-300 animate-[fadeInUp_0.45s_ease-out_forwards] max-sm:min-w-[220px] max-sm:w-[220px] max-sm:snap-center max-sm:rounded-[18px] cursor-pointer group"
                                style={{ animationDelay: `${index * 0.05}s` }}
                            >
                                <div className="relative shrink-0 p-2 pt-2">
                                    <ImageWithFallback 
                                        src={uni.image || logo} 
                                        alt={uni.name} 
                                        width={400}
                                        height={200}
                                        loading="lazy"
                                        className={`w-full h-[200px] max-sm:h-[160px] rounded-[16px] block group-hover:scale-[1.02] transition-transform duration-500 ${!uni.image ? 'object-contain p-8 bg-white/30' : 'object-cover'}`} 
                                        fallbackContainerClassName="w-full h-[200px] max-sm:h-[160px] rounded-[16px]"
                                    />
                                    <div className="absolute top-[18px] left-[18px] inline-flex items-center gap-1 bg-black/60 backdrop-blur-sm text-[#FFD700] text-[11px] font-bold py-1 px-2 rounded-full tracking-wide">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z" fill="#FFD700" />
                                        </svg>
                                        #{uni.ranking} World
                                    </div>
                                    <div className="absolute top-[18px] right-[18px] inline-flex items-center gap-1 bg-white border-2 border-primary hover:bg-primary-light/20/80 backdrop-blur-sm text-primary font-bold text-[11px] font-bold py-1 px-2 rounded-full tracking-wide">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <circle cx="6" cy="6" r="5" stroke="white" strokeWidth="1.2" />
                                            <path d="M4 6h4M6 4v4" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
                                        </svg>
                                        IELTS {uni.ielts}+
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col items-start p-4 text-white text-left">
                                    <h3 className="font-bold text-[15px] max-sm:text-[13px] leading-snug mb-3 uppercase tracking-wide w-full">{uni.name}</h3>
                                    <div className="flex gap-2 flex-wrap mb-auto pb-4">
                                        <div className="inline-flex items-center gap-1 bg-white/15 border border-white/25 text-white text-[11px] font-semibold py-1 px-2.5 rounded-full backdrop-blur-[4px]">
                                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                                                <path d="M2 11V5.5L6.5 2L11 5.5V11H8V8H5V11H2Z" fill="white" fillOpacity="0.85" />
                                            </svg>
                                            {uni.ielts} IELTS
                                        </div>
                                        <div className="inline-flex items-center gap-1 bg-white/15 border border-white/25 text-white text-[11px] font-semibold py-1 px-2.5 rounded-full backdrop-blur-[4px]">
                                            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                                                <path d="M6.5 1.5L8.045 4.635L11.5 5.14L9 7.575L9.59 11.01L6.5 9.385L3.41 11.01L4 7.575L1.5 5.14L4.955 4.635L6.5 1.5Z" fill="white" fillOpacity="0.85" />
                                            </svg>
                                            Rank #{uni.ranking}
                                        </div>
                                    </div>
                                    <button
                                        className="group inline-flex items-center justify-center gap-1.5 bg-white text-slate-800 border-none py-2.5 px-4 max-sm:py-2.5 max-sm:px-3 rounded-full font-bold text-[13px] max-sm:text-[11px] cursor-pointer w-full text-center shadow-md transition-all duration-300 hover:bg-primary hover:text-white hover:shadow-lg hover:-translate-y-0.5"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            window.location.href = '/contact';
                                        }}
                                    >
                                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="transition-transform duration-300 group-hover:scale-110">
                                            <path d="M2 2h11v9H8.5L5 13.5V11H2V2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                                        </svg>
                                        Talk to a Consultant
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer CTA */}
                <div className="mt-12 mb-4 max-sm:mt-8">
                    <button 
                        className="group inline-flex items-center gap-2 bg-primary text-white font-bold py-3.5 px-9 max-sm:py-3 max-sm:px-7 rounded-full text-[16px] max-sm:text-[15px] cursor-pointer shadow-lg shadow-primary/30 transition-all duration-300 hover:-translate-y-[2px] hover:shadow-xl hover:shadow-primary/40 hover:bg-primary/95 tracking-wide" 
                        onClick={() => navigate('/contact')}
                    >
                        View All Destinations
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                            <path d="M3.75 9H14.25M14.25 9L9.75 4.5M14.25 9L9.75 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>

            
            <style>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(18px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
};

export default DestinationsSection;
