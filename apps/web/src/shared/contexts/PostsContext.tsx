import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';
import { feedService } from '@/services/feedService';

export interface Post {
    id: string;
    label: string;
    labelColor?: string;
    banner: string;
    logo: string;
    title: string;
    institution: string;
    location: string;
    verified?: boolean;
    tags: string[];
    applyLink?: string;
    grid: { label: string; value: string; alert?: boolean; color?: string }[];
    about: string;
    category?: string;
    status?: 'Published' | 'Draft' | 'Archived';
    isPinned?: boolean;
    universityId?: string;
}

interface PostsContextType {
    posts: Post[];
    loading: boolean;
    error: string | null;
    refreshPosts: () => Promise<void>;
    addPost: (post: any) => Promise<void>;
    deletePost: (id: string) => Promise<void>;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export const PostsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const mapBackendToPost = (p: any): Post => ({
        id: p._id,
        label: p.category || 'Article',
        labelColor: p.category === 'Scholarship' ? 'bg-orange-50 text-orange-700 border-orange-100' :
            p.category === 'Program' ? 'bg-primary-light/50 text-primary-hover border-purple-100' : 'bg-blue-50 text-blue-700 border-blue-100',
        banner: p.banner || (p.mediaUrls && p.mediaUrls[0]) || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop',
        logo: p.universityLogo || 'https://via.placeholder.com/100',
        title: p.title,
        institution: p.universityName || 'Global Update',
        location: p.location || 'Global',
        tags: p.tags || [],
        about: p.content,
        category: p.category,
        status: 'Published',
        universityId: p.universityId,
        grid: [
            ...(p.category === 'Program' ? [
                { label: 'Tuition', value: p.tuitionFee || 'Contact Uni' },
                { label: 'Duration', value: p.programDuration || 'N/A' },
                { label: 'Intakes', value: p.intakes || 'Fall/Spring' }
            ] : []),
            ...(p.category === 'Scholarship' ? [
                { label: 'Funding', value: p.funding || 'Partial' },
                { label: 'Deadline', value: p.expiry || 'Open', alert: true }
            ] : []),
            ...(p.category !== 'Program' && p.category !== 'Scholarship' ? [
                { label: 'Type', value: p.category || 'Information' },
                { label: 'Updated', value: new Date(p.updatedAt).toLocaleDateString() }
            ] : [])
        ]
    });

    const refreshPosts = async () => {
        setLoading(true);
        try {
            const data = await feedService.getAll();
            const mapped = data.map(mapBackendToPost);
            setPosts(mapped);
            setError(null);
        } catch (err) {
            console.error('Failed to sync feed:', err);
            setError('Global feed is currently unavailable.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        refreshPosts();
    }, []);

    const addPost = async (postData: any) => {
        await feedService.create(postData);
        await refreshPosts();
    };

    const deletePost = async (id: string) => {
        // Implementation for delete would go here if service supported it
        // For now we just refresh to show the source of truth
        await refreshPosts();
    };

    return (
        <PostsContext.Provider value={{ posts, loading, error, refreshPosts, addPost, deletePost }}>
            {children}
        </PostsContext.Provider>
    );
};

export const usePosts = () => {
    const context = useContext(PostsContext);
    if (context === undefined) {
        throw new Error('usePosts must be used within a PostsProvider');
    }
    return context;
};
