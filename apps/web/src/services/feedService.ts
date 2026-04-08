const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface PostResponse {
    _id: string;
    title: string;
    content: string;
    authorId: {
        _id: string;
        fullName: string;
        profilePicture?: string;
    };
    mediaUrls: string[];
    upvotes: string[];
    downvotes: string[];
    score: number;
    viewCount: number;
    commentCount: number;
    tags: string[];
    createdAt: string;
    updatedAt: string;
    // New fields for institutional/broadcast data
    category?: string;
    location?: string;
    universityName?: string;
    universityLogo?: string;
    universityId?: string;
}

export const feedService = {
    getAll: async (params?: { category?: string; search?: string; universityId?: string }) => {
        const query = new URLSearchParams();
        if (params?.category) query.append('category', params.category);
        if (params?.search) query.append('query', params.search);
        if (params?.universityId) query.append('universityId', params.universityId);

        const res = await fetch(`${API_BASE}/api/feed?${query.toString()}`);
        if (!res.ok) throw new Error('Failed to fetch feed');
        const data = await res.json();
        return data.posts || [];
    },

    getById: async (id: string) => {
        const res = await fetch(`${API_BASE}/api/feed/${id}`);
        if (!res.ok) throw new Error('Failed to fetch post details');
        return res.json();
    },

    create: async (data: any) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE}/api/feed`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.error || 'Failed to create post');
        }
        return res.json();
    },

    toggleLike: async (id: string) => {
        const token = localStorage.getItem('token');
        const res = await fetch(`${API_BASE}/api/feed/${id}/upvote`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) throw new Error('Failed to toggle like');
        return res.json();
    }
};
