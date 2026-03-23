import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── Types ────────────────────────────────────────────────────────────────────

interface PostItem {
    id: string;
    user: {
        name: string;
        avatar: string;
        role: string;
        university?: string;
    };
    content: string;
    timestamp: string;
    stats: {
        likes: number;
        comments: number;
    };
    category: string;
}

// ─── Data: 20 Mock Posts ──────────────────────────────────────────────────────

const MOCK_POSTS: PostItem[] = [
    {
        id: 'p1',
        user: { name: 'Aryan Sharma', avatar: 'https://i.pravatar.cc/150?u=aryan', role: 'Student', university: 'University of Toronto' },
        content: 'Just received my Study Permit for Canada! 🇨🇦 The visa process took exactly 22 days. Tips: keep your financial docs organized and write a strong SOP.',
        timestamp: '2 hours ago',
        stats: { likes: 124, comments: 18 },
        category: 'Visa Success'
    },
    {
        id: 'p2',
        user: { name: 'Priya Patel', avatar: 'https://i.pravatar.cc/150?u=priya', role: 'Student', university: 'UCL' },
        content: 'Anyone heading to London for the Jan intake? Looking for flatmates near Bloomsbury. Budget is around £800/month.',
        timestamp: '5 hours ago',
        stats: { likes: 42, comments: 12 },
        category: 'Accommodation'
    },
    {
        id: 'p3',
        user: { name: 'Dr. Michael Chen', avatar: 'https://i.pravatar.cc/150?u=michael', role: 'Mentor', university: 'Stanford Alumni' },
        content: 'Pro-tip for MS applicants: Focus on your research experience in your SOP rather than just listing your grades. Admissions committees want to see your potential for innovation.',
        timestamp: 'Yesterday',
        stats: { likes: 310, comments: 45 },
        category: 'Admissions'
    },
    {
        id: 'p4',
        user: { name: 'Sneha Rao', avatar: 'https://i.pravatar.cc/150?u=sneha', role: 'Student', university: 'NYU' },
        content: 'Is an 8.5 CGPA enough for NYU Data Science? I have 2 years of work experience but my GRE is average (315). Would love some advice!',
        timestamp: '1 day ago',
        stats: { likes: 56, comments: 29 },
        category: 'Profile Evaluation'
    },
    {
        id: 'p5',
        user: { name: 'Kevin Brown', avatar: 'https://i.pravatar.cc/150?u=kevin', role: 'Student', university: 'Melbourne Uni' },
        content: 'Melbourne is beautiful but the winter is chillier than I expected! Pack some good layers if you are coming for the July intake.',
        timestamp: '2 days ago',
        stats: { likes: 89, comments: 8 },
        category: 'Student Life'
    },
    {
        id: 'p6',
        user: { name: 'Ananya Gupta', avatar: 'https://i.pravatar.cc/150?u=ananya', role: 'Student', university: 'Oxford' },
        content: 'Received a partial scholarship at Oxford! Hard work pays off. Don’t ignore the smaller departmental scholarships, they add up.',
        timestamp: '3 days ago',
        stats: { likes: 452, comments: 31 },
        category: 'Scholarships'
    },
    {
        id: 'p7',
        user: { name: 'Rahul Verma', avatar: 'https://i.pravatar.cc/150?u=rahul', role: 'Student', university: 'TU Munich' },
        content: 'Struggling with the Blocked Account process in Germany. Any suggestions on which provider is faster?',
        timestamp: '3 days ago',
        stats: { likes: 15, comments: 22 },
        category: 'Finance'
    },
    {
        id: 'p8',
        user: { name: 'Jessica Lee', avatar: 'https://i.pravatar.cc/150?u=jessica', role: 'Student', university: 'NUS' },
        content: 'The campus at NUS is sprawling! Highly recommend getting the shuttle map early. Singapore is incredibly efficient.',
        timestamp: '4 days ago',
        stats: { likes: 78, comments: 5 },
        category: 'Student Life'
    },
    {
        id: 'p9',
        user: { name: 'Vikram Singh', avatar: 'https://i.pravatar.cc/150?u=vikram', role: 'Mentor', university: 'Ex-Visa Officer' },
        content: 'Common Visa Rejection Reason #1: Vague ties to your home country. Ensure you can explain your post-study plans clearly.',
        timestamp: '5 days ago',
        stats: { likes: 215, comments: 14 },
        category: 'Visa Support'
    },
    {
        id: 'p10',
        user: { name: 'Meera Das', avatar: 'https://i.pravatar.cc/150?u=meera', role: 'Student', university: 'Columbia' },
        content: 'Just finished my first semester at Columbia! NYC is expensive but the networking opportunities are unmatched.',
        timestamp: '1 week ago',
        stats: { likes: 112, comments: 9 },
        category: 'Experience'
    },
    {
        id: 'p11',
        user: { name: 'Zoe Martinez', avatar: 'https://i.pravatar.cc/150?u=zoe', role: 'Student', university: 'UPenn' },
        content: 'Does anyone have a good template for a LoR from a workplace supervisor?',
        timestamp: '1 week ago',
        stats: { likes: 34, comments: 12 },
        category: 'Guidelines'
    },
    {
        id: 'p12',
        user: { name: 'Ishaan Reddy', avatar: 'https://i.pravatar.cc/150?u=ishaan', role: 'Student', university: 'Waterloo' },
        content: 'Co-op at Waterloo is amazing! Just landed an internship at a major tech firm. Hard but worth it.',
        timestamp: '1 week ago',
        stats: { likes: 198, comments: 24 },
        category: 'Career'
    },
    {
        id: 'p13',
        user: { name: 'Sophia Wang', avatar: 'https://i.pravatar.cc/150?u=sophia', role: 'Mentor', university: 'Harvard Grad' },
        content: 'Beyond the Ivy League: Why you should consider Public Ivy universities in the US.',
        timestamp: '1 week ago',
        stats: { likes: 167, comments: 11 },
        category: 'Resources'
    },
    {
        id: 'p14',
        user: { name: 'Arjun Nair', avatar: 'https://i.pravatar.cc/150?u=arjun', role: 'Student', university: 'Leeds' },
        content: 'Applied for UK Student Visa today. Wishing for the best! 🤞',
        timestamp: '2 weeks ago',
        stats: { likes: 88, comments: 17 },
        category: 'Visa Support'
    },
    {
        id: 'p15',
        user: { name: 'Emma Wilson', avatar: 'https://i.pravatar.cc/150?u=emma', role: 'Student', university: 'Edinburgh' },
        content: 'Edinburgh is like living in a fairytale. If you love history and cold weather, this is the place.',
        timestamp: '2 weeks ago',
        stats: { likes: 143, comments: 6 },
        category: 'Student Life'
    },
    {
        id: 'p16',
        user: { name: 'Rohan Deshmukh', avatar: 'https://i.pravatar.cc/150?u=rohan', role: 'Student', university: 'UBC' },
        content: 'How the Vancouver housing crisis affects international students. A small guide.',
        timestamp: '2 weeks ago',
        stats: { likes: 72, comments: 38 },
        category: 'Advice'
    },
    {
        id: 'p17',
        user: { name: 'Linda Müller', avatar: 'https://i.pravatar.cc/150?u=linda', role: 'Student', university: 'Humboldt Berlin' },
        content: 'Studying in Germany for free is great, but don’t underestimate the time needed to learn the language!',
        timestamp: '3 weeks ago',
        stats: { likes: 121, comments: 14 },
        category: 'Language'
    },
    {
        id: 'p18',
        user: { name: 'Chris Evans', avatar: 'https://i.pravatar.cc/150?u=chris', role: 'Student', university: 'Dublin City Uni' },
        content: 'Ireland is booming for tech. If you are into CS, Dublin has massive opportunities.',
        timestamp: '3 weeks ago',
        stats: { likes: 95, comments: 9 },
        category: 'Tech'
    },
    {
        id: 'p19',
        user: { name: 'Kavita Seth', avatar: 'https://i.pravatar.cc/150?u=kavita', role: 'Mentor', university: 'Counselor' },
        content: 'IELTS vs PTE: Which one is easier for Australian visa applications? My detailed breakdown.',
        timestamp: '1 month ago',
        stats: { likes: 201, comments: 42 },
        category: 'Testing'
    },
    {
        id: 'p20',
        user: { name: 'David Jones', avatar: 'https://i.pravatar.cc/150?u=david', role: 'Student', university: 'Auckland' },
        content: 'New Zealand is open and welcoming! The post-study work visa rules are very clear.',
        timestamp: '1 month ago',
        stats: { likes: 67, comments: 4 },
        category: 'Visa'
    }
];

// ─── Main Component ───────────────────────────────────────────────────────────

const CommunityPostsSection: React.FC = () => {
    const navigate = useNavigate();
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section className="relative py-24 px-4 overflow-hidden bg-transparent border-t border-[#7a29c2]/5" ref={sectionRef}>
            {/* Decorative Theme Blobs */}
            <div className={`absolute rounded-full blur-[100px] z-0 opacity-40 transition-all duration-1000 ease-in-out w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(122,41,194,0.1)_0%,rgba(255,255,255,0)_70%)] top-[-100px] left-[-100px] ${isVisible ? 'animate-[floatingBlobs_15s_infinite_alternate]' : ''}`} />
            <div className={`absolute rounded-full blur-[100px] z-0 opacity-30 transition-all duration-1000 ease-in-out w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(249,115,22,0.1)_0%,rgba(255,255,255,0)_70%)] bottom-0 right-[-100px] ${isVisible ? 'animate-[floatingBlobs_12s_infinite_alternate-reverse]' : ''}`} />

            <div className="max-w-[1400px] mx-auto relative z-10 w-full px-4">
                {/* Header */}
                <div className={`text-center mb-16 flex flex-col items-center ${isVisible ? 'animate-[fadeInUp_0.8s_ease-out_forwards]' : 'opacity-0'}`}>
                    <div className="inline-flex items-center gap-2 py-2 px-5 bg-[#f3e8ff] text-[#7a29c2] border border-[#e9d5ff] rounded-full text-[11px] font-black uppercase tracking-[0.2em] mb-6">
                        <span className="w-2 h-2 bg-[#9333ea] rounded-full animate-pulse shadow-[0_0_8px_#9333ea]" />
                        Community Activity
                    </div>
                    <h2 className="text-[2.5rem] md:text-[4rem] font-black text-[#090914] mb-6 leading-[1.1] font-bricolage">
                        Voices of the <span className="text-[#7a29c2] relative">EA Community</span>
                    </h2>
                    <p className="text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                        Stay connected with real-time updates, expert advice, and success stories shared by our global student network.
                    </p>
                </div>

                {/* Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                    {MOCK_POSTS.map((post, index) => (
                        <div 
                            key={post.id} 
                            className={`bg-white rounded-2xl p-6 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)] border border-slate-100 hover:border-purple-200 transition-all duration-300 flex flex-col h-full hover:shadow-[0_15px_30px_-5px_rgba(122,41,194,0.1)] group pointer-events-auto ${isVisible ? 'animate-[fadeInUp_0.8s_ease-out_forwards]' : 'opacity-0'}`}
                            style={{ animationDelay: `${0.05 * (index + 1)}s` }}
                        >
                            {/* User Header */}
                            <div className="flex items-center gap-3 mb-4">
                                <img src={post.user.avatar} alt={post.user.name} className="w-10 h-10 rounded-full border border-slate-100 group-hover:scale-105 transition-transform" />
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold text-slate-900 truncate">{post.user.name}</h4>
                                    <p className="text-[10px] text-purple-600 font-bold uppercase truncate">{post.user.role} {post.user.university && `• ${post.user.university}`}</p>
                                </div>
                            </div>

                            {/* Post Content */}
                            <div className="flex-1">
                                <span className="inline-block px-2 py-0.5 rounded-md bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">{post.category}</span>
                                <p className="text-[13px] text-slate-600 leading-relaxed mb-4 line-clamp-4 group-hover:line-clamp-none transition-all duration-500">
                                    {post.content}
                                </p>
                            </div>

                            {/* Stats/Actions */}
                            <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-auto">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1 text-slate-400 group-hover:text-pink-500 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">favorite</span>
                                        <span className="text-[11px] font-bold">{post.stats.likes}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-slate-400 group-hover:text-purple-500 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                                        <span className="text-[11px] font-bold">{post.stats.comments}</span>
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-slate-300">{post.timestamp}</span>
                            </div>
                        </div>
                    ))}
                </div>
                
                {/* View All CTA */}
                <div className={`mt-16 flex justify-center ${isVisible ? 'animate-[fadeInUp_0.8s_ease-out_forwards]' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
                    <button 
                        onClick={() => navigate('/ointake-feed')}
                        className="group flex items-center gap-3 bg-white text-[#7a29c2] py-4 px-10 rounded-2xl text-base font-black border-2 border-purple-100 cursor-pointer shadow-sm transition-all duration-300 hover:border-[#7a29c2] hover:bg-[#7a29c2] hover:text-white hover:shadow-[0_15px_30px_-5px_rgba(122,41,194,0.3)] hover:-translate-y-1 active:translate-y-0"
                    >
                        Explore Community Feed
                        <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">forum</span>
                    </button>
                </div>
            </div>

            <style>{`
                @keyframes floatingBlobs {
                    0% { transform: translate(0, 0) scale(1); opacity: 0.3; }
                    100% { transform: translate(40px, -40px) scale(1.1); opacity: 0.5; }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #f8fafc;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #9333ea;
                }
            `}</style>
        </section>
    );
};

export default CommunityPostsSection;
