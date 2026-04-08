import React, { useState, useEffect } from 'react';
import { updateBlog, createBlog } from '@/services/blogService';

interface BlogEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  blog: any;
}

const BlogEditorModal: React.FC<BlogEditorModalProps> = ({ isOpen, onClose, onSuccess, blog }) => {
  const [formData, setFormData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || '',
        excerpt: blog.excerpt || '',
        content: blog.content || '',
        tags: blog.tags?.join(', ') || '',
        coverImage: blog.coverImage || '',
        isPublished: blog.isPublished ?? false,
        category: blog.category || 'Article'
      });
    }
  }, [blog]);

  const handleSave = async (publish?: boolean) => {
    if (!formData) return;
    setIsSaving(true);
    try {
      const generateSlug = (text: string) => {
        return text
          .toLowerCase()
          .replace(/[^\w ]+/g, '')
          .replace(/ +/g, '-');
      };

      const updatedData = {
        ...formData,
        slug: blog?.slug || generateSlug(formData.title),
        category: formData.category || 'Article',
        tags: typeof formData.tags === 'string' 
          ? formData.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
          : formData.tags,
        isPublished: publish !== undefined ? publish : formData.isPublished
      };
      
      let success = false;
      if (blog?._id) {
        success = await updateBlog(blog._id, updatedData);
      } else {
        success = await createBlog(updatedData);
      }

      if (success) {
        onSuccess();
        onClose();
      } else {
        alert('Failed to save blog.');
      }
    } catch (error) {
      console.error('Save failed', error);
      alert('An error occurred while saving.');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen || !formData) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col border border-white/20">
        
        {/* Header */}
        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <span className="material-symbols-outlined text-[28px]">edit_document</span>
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 leading-none">Edit Blog Post</h2>
              <p className="text-slate-500 text-sm font-medium mt-1">Refine your AI-generated masterpiece</p>
            </div>
          </div>
          <button onClick={onClose} className="size-10 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
          {/* Title Area */}
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Post Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-3xl text-xl font-black text-slate-900 focus:outline-none focus:border-blue-600 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Excerpt / Summary</label>
              <textarea
                value={formData.excerpt}
                onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full h-32 p-5 bg-slate-50 border-2 border-slate-100 rounded-3xl text-sm font-medium text-slate-600 focus:outline-none focus:border-blue-600 transition-all resize-none leading-relaxed"
              />
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Tags (Comma separated)</label>
              <textarea
                value={formData.tags}
                onChange={e => setFormData({ ...formData, tags: e.target.value })}
                className="w-full h-32 p-5 bg-slate-50 border-2 border-slate-100 rounded-3xl text-sm font-medium text-slate-600 focus:outline-none focus:border-blue-600 transition-all resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* Image Preview / URL */}
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Cover Image URL</label>
            <div className="flex gap-4 items-center">
              <input
                type="text"
                value={formData.coverImage}
                onChange={e => setFormData({ ...formData, coverImage: e.target.value })}
                className="flex-1 p-5 bg-slate-50 border-2 border-slate-100 rounded-3xl text-sm font-medium focus:outline-none focus:border-blue-600 transition-all"
              />
              <div className="h-16 w-24 rounded-2xl overflow-hidden border border-slate-200">
                <img src={formData.coverImage} alt="Preview" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Full Content */}
          <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Full Blog Content</label>
            <textarea
              value={formData.content}
              onChange={e => setFormData({ ...formData, content: e.target.value })}
              className="w-full h-96 p-8 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] text-sm font-medium text-slate-700 focus:outline-none focus:border-blue-600 transition-all resize-none leading-[1.8]"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => handleSave()}
            disabled={isSaving}
            className="flex-1 py-4 bg-white border-2 border-slate-200 text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:border-slate-300 transition-all flex items-center justify-center gap-2"
          >
            {isSaving ? 'Processing...' : <><span className="material-symbols-outlined text-[20px]">save</span> Update Draft</>}
          </button>
          {!formData.isPublished ? (
            <button
              onClick={() => handleSave(true)}
              disabled={isSaving}
              className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-2"
            >
               <span className="material-symbols-outlined text-[20px]">publish</span> Publish Now
            </button>
          ) : (
            <button
              onClick={() => handleSave(false)}
              disabled={isSaving}
              className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2"
            >
               <span className="material-symbols-outlined text-[20px]">unpublished</span> Revert to Draft
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogEditorModal;
