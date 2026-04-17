import React, { useRef, useState } from 'react';

const testimonials = [
  {
    id: 1,
    text: "I got admission into the University of Minnesota in the US, with a $40,000 scholarship, which made me feel very excited and happy. My experience with SIEC was wonderful. They helped me at every step of the application process, to pursue my studies in the United States, as well as with my visa application.",
    name: "Raunak Sharma",
    course: "Study Abroad",
    image: "https://randomuser.me/api/portraits/men/32.webp"
  },
  {
    id: 2,
    text: "I got my student visa to go to Berlin, Germany to pursue a language course, followed by a Bachelors in Computer Science. I found out about SIEC through a Google search, and I visited the Janakpuri office. All the counsellors I encountered were very helpful and guided me throughout.",
    name: "Ankit",
    course: "Study Abroad",
    image: "https://randomuser.me/api/portraits/men/45.webp"
  },
  {
    id: 3,
    text: "I have applied to study a Bachelor of Commerce at Curtin University, Singapore. With the help of SIEC counselling and coaching, I have successfully received my student visa. They helped me with everything.",
    name: "Priya",
    course: "Study Abroad",
    image: "https://randomuser.me/api/portraits/women/44.webp"
  },
  {
    id: 4,
    text: "My journey to the UK was seamless thanks to the expert guidance. The counsellors were very attentive and made sure all my documents were pristine. I highly recommend their services to anyone looking to study abroad.",
    name: "Rahul",
    course: "Study Abroad",
    image: "https://randomuser.me/api/portraits/men/22.webp"
  }
];

// Shorts/Reels style videos data
const reels = [
  {
    id: 1,
    thumbnail: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop",
    title: "Udaan | Harkirat's Success Story",
    subtitle: "Australian Visa & 50% Scholarship",
    duration: "2:34",
    views: "128K",
    youtubeUrl: "https://www.youtube.com/shorts/",
  },
  {
    id: 2,
    thumbnail: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=600&auto=format&fit=crop",
    title: "From India to Canada",
    subtitle: "Priya's Study Visa Journey",
    duration: "1:58",
    views: "94K",
    youtubeUrl: "https://www.youtube.com/shorts/",
  },
  {
    id: 3,
    thumbnail: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=600&auto=format&fit=crop",
    title: "UK Student Life",
    subtitle: "Rahul's First Term at Durham",
    duration: "3:12",
    views: "67K",
    youtubeUrl: "https://www.youtube.com/shorts/",
  },
  {
    id: 4,
    thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop",
    title: "Germany Admission Tips",
    subtitle: "How Ankit Cracked Berlin",
    duration: "2:05",
    views: "81K",
    youtubeUrl: "https://www.youtube.com/shorts/",
  },
  {
    id: 5,
    thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600&auto=format&fit=crop",
    title: "IELTS in 30 Days",
    subtitle: "Expert Strategy Revealed",
    duration: "1:47",
    views: "210K",
    youtubeUrl: "https://www.youtube.com/shorts/",
  },
];

const StarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#eab308" className="w-4 h-4">
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
  </svg>
);

const ChevronUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
  </svg>
);

// YouTube Play Icon SVG
const PlayIcon = () => (
  <svg viewBox="0 0 68 48" xmlns="http://www.w3.org/2000/svg" className="w-10 h-7">
    <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z" fill="#f00"/>
    <path d="M45 24 27 14v20" fill="#fff"/>
  </svg>
);

const GlobalTestimonialsSection = () => {
  const testimonialScrollRef = useRef<HTMLDivElement>(null);
  const reelsScrollRef = useRef<HTMLDivElement>(null);
  const [selectedReel, setSelectedReel] = useState<typeof reels[0] | null>(null);

  const scrollUp = () => {
    if (testimonialScrollRef.current) {
      testimonialScrollRef.current.scrollBy({ top: -200, behavior: 'smooth' });
    }
  };

  const scrollDown = () => {
    if (testimonialScrollRef.current) {
      testimonialScrollRef.current.scrollBy({ top: 200, behavior: 'smooth' });
    }
  };

  const scrollReelsLeft = () => {
    if (reelsScrollRef.current) {
      reelsScrollRef.current.scrollBy({ left: -220, behavior: 'smooth' });
    }
  };

  const scrollReelsRight = () => {
    if (reelsScrollRef.current) {
      reelsScrollRef.current.scrollBy({ left: 220, behavior: 'smooth' });
    }
  };

  return (
    <section id="reviews" className="py-20 bg-transparent w-full overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* ── Header ── */}
        <div className="flex flex-col items-center justify-center text-center space-y-4 mb-14 mt-4">
          <div className="bg-[#f3e8ff] text-[#7a29c2] px-6 py-1.5 rounded-full font-bold text-sm">
            EAOverseas Alumni
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-[#0e121b]">
            Student testimonials from all{' '}
            <span className="text-[#7a29c2]">Around The Globe</span>
          </h2>
          <p className="text-[#4d6599] max-w-2xl text-lg mt-2">
            Read testimonials from our very own alumni to know how they turned
            their academic dreams into reality
          </p>
        </div>

        {/* ── Main Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── Left Column: Testimonials List ── */}
          <div className="relative flex items-center py-6">
            {/* Background pattern */}
            <div className="absolute right-0 top-0 bottom-0 w-[80%] bg-[#faf5ff] rounded-[40px] -z-10 flex flex-col items-end justify-center pr-12 space-y-6">
              <div className="w-16 h-4 bg-[#e9d5ff] rounded-full" />
              <div className="w-20 h-4 bg-[#e9d5ff] rounded-full" />
              <div className="w-24 h-4 bg-[#e9d5ff] rounded-full" />
              <div className="w-28 h-4 bg-[#e9d5ff] rounded-full" />
              <div className="w-24 h-4 bg-[#e9d5ff] rounded-full" />
              <div className="w-20 h-4 bg-[#e9d5ff] rounded-full" />
            </div>

            {/* Scrollable testimonials */}
            <div
              ref={testimonialScrollRef}
              className="flex-1 max-h-[520px] overflow-y-auto no-scrollbar space-y-6 pr-4 relative z-10"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-[24px] p-6 shadow-[0_4px_20px_rgba(122,41,194,0.07)] flex flex-col space-y-5 relative ml-0 lg:mr-12 border border-[#f3e8ff]"
                >
                  <p className="text-gray-600 text-sm leading-relaxed pr-6">
                    {testimonial.text}
                  </p>
                  {/* Scroll indicator decoration */}
                  <div className="absolute top-8 right-3 w-1.5 h-16 bg-[#d8b4fe] rounded-full" />
                  <div className="absolute bottom-8 right-3 w-0 h-0 border-l-[4px] border-l-transparent border-t-[5px] border-t-[#a855f7] border-r-[4px] border-r-transparent" />
                  <div className="absolute top-6 right-3 w-0 h-0 border-l-[4px] border-l-transparent border-b-[5px] border-b-[#a855f7] border-r-[4px] border-r-transparent" />

                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-4">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-11 h-11 rounded-full object-cover border-2 border-[#f3e8ff] shadow-sm"
                      />
                      <div>
                        <h4 className="font-bold text-[#0e121b] text-[15px]">{testimonial.name}</h4>
                        <p className="text-[#7a29c2] text-xs font-semibold">{testimonial.course}</p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => <StarIcon key={i} />)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll buttons */}
            <div className="flex flex-col space-y-4 absolute right-0 translate-x-1/2 z-20">
              <button
                onClick={scrollUp}
                className="w-12 h-12 rounded-full bg-white shadow-[0_4px_15px_rgba(122,41,194,0.15)] border border-[#f3e8ff] flex items-center justify-center text-[#7a29c2] hover:bg-[#7a29c2] hover:text-white transition-colors"
                aria-label="Scroll up"
              >
                <ChevronUpIcon />
              </button>
              <button
                onClick={scrollDown}
                className="w-12 h-12 rounded-full bg-white shadow-[0_4px_15px_rgba(122,41,194,0.15)] border border-[#f3e8ff] flex items-center justify-center text-[#7a29c2] hover:bg-[#7a29c2] hover:text-white transition-colors"
                aria-label="Scroll down"
              >
                <ChevronDownIcon />
              </button>
            </div>
          </div>

          {/* ── Right Column: Reels / Shorts Horizontal Scroll ── */}
          <div className="flex flex-col gap-4">

            {/* Section label */}
            <div className="flex items-center justify-between">
              <div>
                <span className="inline-flex items-center gap-2 bg-[#f3e8ff] text-[#7a29c2] px-4 py-1.5 rounded-full font-bold text-sm">
                  <span className="material-symbols-outlined text-base">play_circle</span>
                  Alumni Reels
                </span>
              </div>
              {/* Arrow nav buttons */}
              <div className="flex gap-2">
                <button
                  onClick={scrollReelsLeft}
                  className="w-9 h-9 rounded-full bg-white border border-[#f3e8ff] shadow-sm flex items-center justify-center text-[#7a29c2] hover:bg-[#7a29c2] hover:text-white transition-all duration-200"
                  aria-label="Scroll left"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>
                <button
                  onClick={scrollReelsRight}
                  className="w-9 h-9 rounded-full bg-white border border-[#f3e8ff] shadow-sm flex items-center justify-center text-[#7a29c2] hover:bg-[#7a29c2] hover:text-white transition-all duration-200"
                  aria-label="Scroll right"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Horizontal Scrollable Reels Row */}
            <div
              ref={reelsScrollRef}
              className="flex gap-4 overflow-x-auto no-scrollbar pb-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {reels.map((reel) => (
                <div
                  key={reel.id}
                  onClick={() => setSelectedReel(reel)}
                  className="group flex-shrink-0 relative rounded-[20px] overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl hover:shadow-purple-200 transition-all duration-300 hover:-translate-y-1"
                  style={{ width: '200px', height: '520px' }}
                >
                  {/* Thumbnail */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url('${reel.thumbnail}')` }}
                  />

                  {/* Gradient overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                  {/* Purple glow on hover */}
                  <div className="absolute inset-0 bg-[#7a29c2]/0 group-hover:bg-[#7a29c2]/20 transition-colors duration-300 rounded-[20px]" />

                  {/* Top: Duration badge */}
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {reel.duration}
                  </div>

                  {/* Center: Play button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7 ml-1">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom: Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-bold text-sm leading-tight line-clamp-2 mb-1">
                      {reel.title}
                    </p>
                    <p className="text-white/70 text-xs line-clamp-1 mb-2">
                      {reel.subtitle}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/60 text-[11px] font-medium">{reel.views} views</span>
                      <div className="w-7 h-5 flex items-center justify-center">
                        <PlayIcon />
                      </div>
                    </div>
                  </div>

                  {/* Purple border glow on hover */}
                  <div className="absolute inset-0 rounded-[20px] ring-0 group-hover:ring-2 group-hover:ring-[#7a29c2]/60 transition-all duration-300 pointer-events-none" />
                </div>
              ))}
            </div>

            {/* Scroll hint */}
            <p className="text-center text-[#4d6599] text-xs font-medium flex items-center justify-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 3M21 7.5H7.5" />
              </svg>
              Swipe to explore more alumni stories
            </p>
          </div>

        </div>
      </div>

      {/* Hide scrollbar globally inside this section */}
      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />

      {/* ── Inline Video Modal ── */}
      {selectedReel && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-sm"
          onClick={() => setSelectedReel(null)}
        >
          <div
            className="relative bg-black rounded-[24px] overflow-hidden shadow-2xl"
            style={{ width: 'min(360px, 90vw)', aspectRatio: '9/16' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedReel(null)}
              className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video info header */}
            <div className="absolute top-0 left-0 right-0 p-4 z-10 bg-gradient-to-b from-black/70 to-transparent">
              <p className="text-white font-bold text-sm leading-tight line-clamp-1">{selectedReel.title}</p>
              <p className="text-white/70 text-xs mt-0.5">{selectedReel.subtitle}</p>
            </div>

            {/* Thumbnail as placeholder — swap youtubeUrl for a real embed ID in prod */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${selectedReel.thumbnail}')` }}
            />
            <div className="absolute inset-0 bg-black/40" />

            {/* Big centred play icon (no real embed since URLs are placeholder) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="white" className="w-9 h-9 ml-1.5">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-white/80 text-xs font-semibold">{selectedReel.duration} · {selectedReel.views} views</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default GlobalTestimonialsSection;
