import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { BlogsGridSkeleton } from '@/components/shared/BlogSkeleton';
import logo from '@/assets/logo.webp';

// Featured blog hero image with logo fallback
const FeaturedImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
    const [imgError, setImgError] = useState(!src);
    return imgError ? (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-700 via-violet-600 to-purple-900 relative">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '36px 36px' }} />
            <img src={logo} alt="EAOverseas" className="relative z-10 h-56 w-auto object-contain drop-shadow-2xl" style={{ filter: 'brightness(0) invert(1)' }} />
        </div>
    ) : (
        <img src={src} alt={alt} onError={() => setImgError(true)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
    );
};

// Blog grid card image with logo fallback
const BlogCardImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
    const [imgError, setImgError] = useState(!src);
    return imgError ? (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-700 via-violet-600 to-purple-900 relative">
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
            <img src={logo} alt="EAOverseas" className="relative z-10 h-16 w-auto object-contain drop-shadow-xl" style={{ filter: 'brightness(0) invert(1)' }} />
        </div>
    ) : (
        <img src={src} alt={alt} onError={() => setImgError(true)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
    );
};

const Blogs = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(6);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';

    const fetchBlogs = async () => {
        try {
            const response = await fetch(`${apiUrl}/api/v1/blogs`);
            const data = await response.json();
            if (data.success) {
                setBlogs(data.blogs);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            // toast.error('Could not load dynamic insights');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchBlogs();
    }, []);

    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 3);
    };

    const featuredBlog = blogs[0];
    const remainingBlogs = blogs.slice(1);

    return (
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 py-8 md:py-12">
            
            {/* ── Featured Perspective ── */}
            {isLoading ? (
                <div className="mb-10 md:mb-16 rounded-[2rem] md:rounded-[3rem] h-[400px] md:h-[650px] bg-gray-100 animate-pulse" />
            ) : featuredBlog && (
                <section 
                    onClick={() => navigate(`/blogs/${featuredBlog.slug}`)}
                    className="mb-12 md:mb-16 relative rounded-[2rem] md:rounded-[3rem] overflow-hidden h-[450px] md:h-[650px] group cursor-pointer shadow-2xl"
                >
                    <FeaturedImage src={featuredBlog.coverImage} alt={featuredBlog.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-20">
                        <span className="bg-[#7a29c2] text-white px-4 py-2 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest w-fit mb-4 md:mb-6 shadow-xl shadow-purple-500/20">
                            Featured Strategy
                        </span>
                        <h1 className="text-3xl md:text-6xl font-black text-white mb-4 md:mb-6 max-w-4xl leading-[1.2] md:leading-[1.1]">
                            {featuredBlog.title}
                        </h1>
                        <p className="text-gray-300 text-base md:text-xl font-medium max-w-2xl mb-6 md:mb-8 line-clamp-2">
                            {featuredBlog.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 md:gap-6">
                            <div className="flex items-center gap-2 md:gap-3">
                                <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 rounded-full flex items-center justify-center text-[#7a29c2] font-black text-[10px] md:text-xs">
                                    EA
                                </div>
                                <span className="text-white text-sm md:text-base font-bold">{featuredBlog.author || 'EAOverseas Expert'}</span>
                            </div>
                            <span className="hidden md:inline text-white/40 font-bold">•</span>
                            <span className="text-white/60 text-xs md:text-base font-bold">
                                {new Date(featuredBlog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                        </div>
                    </div>
                </section>
            )}


            {/* ── All Insights ── */}
            <section className="mb-20">
                <div className="flex items-end justify-between mb-12">
                    <div className="space-y-2">
                        <h2 className="text-[#7a29c2] font-black uppercase tracking-[0.2em] text-xs">Knowledge Base</h2>
                        <h3 className="text-4xl font-black text-gray-900">Latest Global Insights</h3>
                    </div>
                </div>
 
                {isLoading ? (
                    <BlogsGridSkeleton />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                        {remainingBlogs.slice(0, visibleCount).map((blog) => (
                        <div
                            key={blog._id}
                            onClick={() => navigate(`/blogs/${blog.slug}`)}
                            className="group cursor-pointer bg-white rounded-[2rem] md:rounded-[2.5rem] p-3 md:p-4 border border-gray-50 hover:border-purple-100 hover:shadow-2xl transition-all duration-500 flex flex-col h-full"
                        >
                            <div className="aspect-[16/10] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden mb-6 md:mb-8 relative">
                                <BlogCardImage src={blog.coverImage} alt={blog.title} />
                                <div className="absolute top-3 left-3 md:top-4 md:left-4 px-3 py-1.5 md:px-4 md:py-2 bg-white/90 backdrop-blur-md rounded-xl text-[9px] md:text-[10px] font-black tracking-widest text-gray-900 border border-white/50">
                                    {blog.category}
                                </div>
                            </div>
                            <div className="px-3 md:px-4 space-y-3 md:space-y-4 flex-1">
                                <h3 className="text-xl md:text-2xl font-black text-gray-900 leading-tight group-hover:text-[#7a29c2] transition-colors">
                                    {blog.title}
                                </h3>
                                <p className="text-gray-500 text-sm md:text-base font-medium line-clamp-2 leading-relaxed">
                                    {blog.excerpt}
                                </p>
                            </div>
                            <div className="px-3 md:px-4 pt-6 md:pt-8 pb-3 md:pb-4 flex items-center justify-between mt-auto">
                                <div className="flex items-center gap-3 md:gap-4 text-[10px] md:text-xs font-bold text-gray-400">
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-sm text-[#7a29c2]">visibility</span>
                                        {blog.views}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-sm text-red-500">favorite</span>
                                        {blog.likes}
                                    </div>
                                </div>
                                <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest text-right">
                                    {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}<br/>
                                    <span className="text-[9px] text-gray-400">{new Date(blog.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</span>
                                </span>
                            </div>
                        </div>
                        ))}
                    </div>
                )}
 
                {visibleCount < remainingBlogs.length && (
                    <div className="mt-16 flex justify-center">
                        <button
                            onClick={handleLoadMore}
                            className="bg-gray-900 text-white font-black px-12 py-5 rounded-2xl hover:scale-105 transition-all shadow-xl shadow-black/10 flex items-center gap-3"
                        >
                            Load More Intelligence
                            <span className="material-symbols-outlined">expand_more</span>
                        </button>
                    </div>
                )}
            </section>

        </div>
    );
};

export default Blogs;


