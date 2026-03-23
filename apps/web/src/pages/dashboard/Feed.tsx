import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/layout/PageHeader';
import { useAuthAction } from '@/shared/hooks/useAuthAction';
import { useAuth } from '@/shared/contexts/AuthContext';
import { useSavedItems } from '@/shared/contexts/SavedItemsContext';
import { usePosts, Post } from '@/shared/contexts/PostsContext';
import LoginModal from '@/features/auth/LoginModal';
import ShareModal from '@/features/shared-modals/ShareModal';

const Feed = () => {
    const { posts, loading, error, refreshPosts } = usePosts();
    const navigate = useNavigate();
    const { user, requireAuth } = useAuth();
    const { togglePost, isPostSaved } = useSavedItems();
    const { executeAction, isLoginModalOpen, closeLoginModal } = useAuthAction();

    // State for Filter Bar
    const [activeCountry, setActiveCountry] = useState('All Countries');
    const [activeTopic, setActiveTopic] = useState('All Topics');
    const [sortBy, setSortBy] = useState('Newest');
    const [searchQuery, setSearchQuery] = useState('');

    // Share Modal State
    const [isShareModalOpen, setIsShareModalOpen] = useState(false);
    const [shareData, setShareData] = useState<Post | null>(null);

    const countries = ['All Countries', 'USA', 'United Kingdom', 'Canada', 'Germany', 'Australia', 'Singapore', 'Global'];
    const topics = ['All Topics', 'Admission', 'Scholarship', 'Program', 'Policy Update', 'Event', 'Guide'];

    const filteredPosts = useMemo(() => {
        let result = posts.filter(post => {
            // 1. Search Query
            const matchesSearch = !searchQuery ||
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.institution.toLowerCase().includes(searchQuery.toLowerCase());

            // 2. Filter by Country
            const matchesCountry = activeCountry === 'All Countries' ||
                (post.location && post.location.toLowerCase().includes(activeCountry.toLowerCase()));

            // 3. Filter by Topic
            const matchesTopic = activeTopic === 'All Topics' || post.label === activeTopic;

            return matchesSearch && matchesCountry && matchesTopic;
        });

        // 4. Sorting
        if (sortBy === 'Newest') {
            return [...result].sort((a, b) => b.id.localeCompare(a.id));
        }
        return result;
    }, [posts, searchQuery, activeCountry, activeTopic, sortBy]);


    const openShareModal = (postId: string) => {
        requireAuth(() => {
            const post = posts.find(p => p.id === postId);
            setShareData(post || null);
            setIsShareModalOpen(true);
        });
    };

    const handleSave = (post: Post) => {
        requireAuth(() => {
            togglePost(post);
        });
    };

    const resetFilters = () => {
        setActiveCountry('All Countries');
        setActiveTopic('All Topics');
        setSortBy('Newest');
        setSearchQuery('');
    };

    return (
        <div className="flex flex-col flex-1 h-full bg-[#f8f9fc] overflow-hidden">
            <PageHeader
                title="Global Intake Feed"
                actions={
                    !user ? (
                        <button
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
                            onClick={() => navigate('/landing')}
                        >
                            Enter Website
                        </button>
                    ) : (
                        <button onClick={() => refreshPosts()} className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                            <span className={`material-symbols-outlined ${loading ? 'animate-spin' : ''}`}>sync</span>
                        </button>
                    )
                }
            />
            <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />

            <main className="flex-1 overflow-y-auto bg-[#f8f9fc]">
                <div className="p-4 md:p-6 lg:p-8 flex flex-col gap-8 max-w-4xl mx-auto w-full transition-all duration-500">
                    {/* Search & Topic Bar */}
                    <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm space-y-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 !text-[20px]">search</span>
                                <input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                                    placeholder="Search broadcasts, institutions, or insights..." type="text" />
                            </div>
                            <div className="flex items-center gap-2">
                                <select
                                    value={activeCountry}
                                    onChange={(e) => setActiveCountry(e.target.value)}
                                    className="appearance-none pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold text-slate-700 cursor-pointer focus:ring-2 focus:ring-blue-100 outline-none"
                                >
                                    {countries.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                                <button onClick={resetFilters} className="text-[10px] font-black text-blue-600 hover:underline px-3 uppercase tracking-widest">Reset</button>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-2 shrink-0">Topic</span>
                            {topics.map((topic) => (
                                <button
                                    key={topic}
                                    onClick={() => setActiveTopic(topic)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${activeTopic === topic
                                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-200'
                                        : 'bg-white text-slate-500 border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                                        }`}
                                >
                                    {topic}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Feed Posts */}
                    <div className="flex flex-col gap-6">
                        {loading && posts.length === 0 ? (
                            [1, 2].map(i => (
                                <div key={i} className="bg-white rounded-[32px] border border-slate-200 p-6 space-y-6 animate-pulse">
                                    <div className="flex justify-between">
                                        <div className="flex gap-3">
                                            <div className="size-12 rounded-full bg-slate-100" />
                                            <div className="space-y-2 py-1">
                                                <div className="h-3 w-20 bg-slate-100 rounded" />
                                                <div className="h-4 w-32 bg-slate-100 rounded" />
                                            </div>
                                        </div>
                                        <div className="h-6 w-16 bg-slate-100 rounded-full" />
                                    </div>
                                    <div className="h-64 bg-slate-100 rounded-[24px]" />
                                    <div className="space-y-3">
                                        <div className="h-6 w-3/4 bg-slate-100 rounded" />
                                        <div className="h-4 w-full bg-slate-50 rounded" />
                                    </div>
                                </div>
                            ))
                        ) : error ? (
                            <div className="text-center py-20 bg-white rounded-[32px] border border-red-100">
                                <span className="material-symbols-outlined text-red-300 !text-[48px] mb-4">wifi_off</span>
                                <h3 className="text-lg font-black text-slate-900">Sync Interrupted</h3>
                                <p className="text-slate-400 italic mb-6">We couldn't connect to the global feed.</p>
                                <button onClick={() => refreshPosts()} className="px-6 py-2 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200">Retry Connection</button>
                            </div>
                        ) : filteredPosts.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-[32px] border border-slate-200 border-dashed">
                                <div className="size-20 rounded-full bg-slate-50 flex items-center justify-center mx-auto mb-6">
                                    <span className="material-symbols-outlined text-slate-300 !text-[32px]">feed</span>
                                </div>
                                <h3 className="text-lg font-black text-slate-900 tracking-tight">No broadcasts found</h3>
                                <p className="text-slate-500 font-medium mt-2 mb-8">Try adjusting your filters to see more updates.</p>
                                <button onClick={resetFilters} className="px-8 py-3 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-black transition-all">
                                    Clear History
                                </button>
                            </div>
                        ) : (
                            filteredPosts.map((post) => (
                                <article
                                    key={post.id}
                                    onClick={() => requireAuth(() => navigate(`/feed-details/${post.id}`))}
                                    className="flex flex-col bg-white border border-slate-200 rounded-[32px] p-4 md:p-6 hover:border-blue-300 hover:shadow-xl hover:-translate-y-0.5 transition-all group cursor-pointer overflow-hidden relative"
                                >
                                    <div className="flex items-center justify-between mb-6 relative z-10">
                                        <div className="flex items-center gap-3">
                                            <div onClick={(e) => {
                                                e.stopPropagation();
                                                if (post.universityId) navigate(`/institution/${encodeURIComponent(post.institution)}`);
                                            }} className="group/inst flex items-center gap-3">
                                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl overflow-hidden bg-slate-50 flex items-center justify-center border border-slate-100 relative shrink-0 shadow-inner group-hover/inst:scale-105 transition-transform">
                                                    <img className="w-full h-full object-contain p-1.5" alt="" src={post.logo} />
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="text-[9px] md:text-[10px] font-black text-blue-600 uppercase tracking-[0.1em]">{post.location}</span>
                                                    <span className="text-xs md:text-sm font-black text-slate-900 group-hover/inst:text-blue-600 transition-colors truncate">{post.institution}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-wider border ${post.labelColor || 'bg-blue-50 text-blue-700 border-blue-100'}`}>
                                            {post.label}
                                        </span>
                                    </div>

                                    <div className="mb-6 relative">
                                        <div className="w-full h-48 md:h-72 bg-slate-100 rounded-[28px] overflow-hidden mb-5 border border-slate-100 relative">
                                            <img src={post.banner} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                                                <h3 className="text-lg md:text-2xl font-black text-white leading-[1.1] group-hover:text-blue-100 transition-colors">{post.title}</h3>
                                            </div>
                                        </div>

                                        {/* Details Grid */}
                                        {post.grid && post.grid.length > 0 && (
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                                                {post.grid.map((item, idx) => (
                                                    <div key={idx} className="bg-slate-50 border border-slate-100/50 p-3 rounded-2xl flex flex-col gap-0.5">
                                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.label}</span>
                                                        <span className={`text-xs font-black ${item.alert ? 'text-orange-600' : 'text-slate-700'}`}>{item.value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="text-xs md:text-sm text-slate-500 font-medium leading-relaxed line-clamp-2 italic" dangerouslySetInnerHTML={{ __html: post.about }}></div>
                                    </div>

                                    <div className="flex items-center gap-2 mb-6 overflow-x-auto scrollbar-none">
                                        {post.tags && post.tags.map((tag, idx) => (
                                            <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-50 text-slate-500 text-[9px] md:text-[10px] font-black uppercase tracking-wider border border-slate-100">{tag}</span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between pt-5 border-t border-slate-50 mt-auto">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleSave(post); }}
                                                className={`p-2.5 rounded-2xl transition-all ${isPostSaved(post) ? 'text-blue-600 bg-blue-50 scale-105' : 'text-slate-300 hover:text-blue-600 hover:bg-slate-50'}`}
                                            >
                                                <span className={`material-symbols-outlined text-[24px] ${isPostSaved(post) ? 'filled' : ''}`}>
                                                    {isPostSaved(post) ? 'bookmark' : 'bookmark_add'}
                                                </span>
                                            </button>
                                            <button onClick={(e) => { e.stopPropagation(); openShareModal(post.id); }} className="p-2.5 text-slate-300 hover:text-blue-600 hover:bg-slate-50 rounded-2xl transition-all">
                                                <span className="material-symbols-outlined text-[24px]">share</span>
                                            </button>
                                        </div>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); requireAuth(() => navigate(`/feed-details/${post.id}`)); }}
                                            className="px-6 py-2.5 bg-[#2b6cee] text-white text-xs font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-blue-100 hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                                        >
                                            Explore Full Update
                                        </button>
                                    </div>
                                </article>
                            ))
                        )}
                    </div>
                </div>
            </main>

            {shareData && (
                <ShareModal
                    isOpen={isShareModalOpen}
                    onClose={() => setIsShareModalOpen(false)}
                    title="Distribute Opportunity"
                    shareUrl={`https://eaoverseas.com/feed/${shareData.id}`}
                    preview={{
                        title: shareData.title,
                        subtitle: shareData.institution,
                        image: shareData.banner
                    }}
                />
            )}
        </div >
    );
};

export default Feed;

