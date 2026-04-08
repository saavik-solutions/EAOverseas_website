import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { fetchAllAdminBlogs, deleteBlog } from '@/services/blogService';
import AIBlogGeneratorModal from '../dashboard/AIBlogGeneratorModal';
import BlogEditorModal from '../dashboard/BlogEditorModal';

const BlogManagement = () => {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isAIGeneratorOpen, setIsAIGeneratorOpen] = useState(false);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState<any>(null);

    const fetchBlogs = async () => {
        setIsLoading(true);
        try {
            const data = await fetchAllAdminBlogs();
            setBlogs(data);
        } catch (error) {
            toast.error('Failed to load blogs');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this blog?')) return;
        try {
            const success = await deleteBlog(id);
            if (success) {
                toast.success('Blog deleted');
                await fetchBlogs();
            } else {
                throw new Error('Delete failed');
            }
        } catch (error) {
            toast.error('Delete failed');
        }
    };

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-2">
                    <h1 className="text-2xl md:text-3xl font-black text-gray-900 uppercase tracking-tighter">Blog Management</h1>
                    <p className="text-gray-500 font-medium text-sm md:text-base">Create and refine EAOverseas global insights with AI assistance.</p>
                </div>
                <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4">
                    <button 
                        onClick={() => setIsAIGeneratorOpen(true)}
                        className="w-full sm:w-auto bg-slate-900 text-white font-black px-6 py-4 rounded-2xl shadow-xl shadow-slate-200 hover:bg-black transition-all flex items-center justify-center gap-2 group"
                    >
                        <span className="material-symbols-outlined text-indigo-400 group-hover:rotate-12 transition-transform">auto_awesome</span>
                        AI Generator
                    </button>
                    <button 
                        onClick={() => { setEditingBlog({ title: '', content: '', excerpt: '', category: 'Article', coverImage: 'https://images.unsplash.com/photo-1523050335391-4df6515a4632', isPublished: false }); setIsEditorOpen(true); }}
                        className="w-full sm:w-auto bg-white border-2 border-slate-200 text-slate-900 font-black px-6 py-4 rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined">add</span>
                        Manual Entry
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : blogs.length === 0 ? (
                <div className="bg-white rounded-[3rem] border-2 border-dashed border-slate-200 p-20 text-center">
                    <div className="size-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <span className="material-symbols-outlined text-slate-300 text-4xl">article</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">No Institutional Insights Yet</h3>
                    <p className="text-slate-500 max-w-sm mx-auto">Use the AI Generator above to create your first global strategy post in seconds.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {blogs.map((blog) => (
                        <div key={blog._id} className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500">
                            <div className="aspect-video relative overflow-hidden">
                                <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                <div className="absolute top-6 left-6 flex gap-2">
                                    <div className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl text-[10px] font-black tracking-widest text-gray-900 border border-white/50 shadow-sm">
                                        {blog.category}
                                    </div>
                                    <div className={`px-4 py-2 backdrop-blur-md rounded-xl text-[10px] font-black tracking-widest border shadow-sm ${blog.isPublished ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' : 'bg-orange-500/10 text-orange-600 border-orange-500/20'}`}>
                                        {blog.isPublished ? 'PUBLISHED' : 'DRAFT'}
                                    </div>
                                </div>
                            </div>
                            <div className="p-8 space-y-6">
                                <h3 className="text-2xl font-black text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">{blog.title}</h3>
                                <p className="text-gray-500 font-medium line-clamp-2 leading-relaxed">{blog.excerpt}</p>
                                <div className="flex justify-between items-center pt-6 border-t border-gray-50">
                                    <div className="flex gap-4">
                                        <div className="flex items-center gap-2 text-gray-400 font-bold text-xs">
                                            <span className="material-symbols-outlined text-sm text-blue-500">visibility</span>
                                            {blog.views || 0}
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-400 font-bold text-xs">
                                            <span className="material-symbols-outlined text-sm text-red-500">favorite</span>
                                            {blog.likes || 0}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => { setEditingBlog(blog); setIsEditorOpen(true); }}
                                            className="p-3 bg-slate-50 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                                            title="Edit Post"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">edit</span>
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(blog._id)}
                                            className="p-3 bg-red-50 text-red-500 hover:bg-red-100 rounded-xl transition-colors"
                                            title="Delete Post"
                                        >
                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <AIBlogGeneratorModal 
                isOpen={isAIGeneratorOpen}
                onClose={() => setIsAIGeneratorOpen(false)}
                onSuccess={async () => { await fetchBlogs(); toast.success('Institutional Insight Generated Successfully'); }}
            />

            <BlogEditorModal 
                isOpen={isEditorOpen}
                onClose={() => setIsEditorOpen(false)}
                blog={editingBlog}
                onSuccess={async () => { await fetchBlogs(); toast.success('Strategy Central Updated'); }}
            />
        </div>
    );
};
export default BlogManagement;
