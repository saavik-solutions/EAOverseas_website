export interface BlogComment {
  user: string;
  content: string;
  createdAt: string;
}

export interface ExternalBlog {
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  readTime: string;
  tags: string[];
  createdAt: string;
  content?: string;
  authorName?: string;
  views?: number;
  likes?: number;
  comments?: BlogComment[];
}

export interface ExternalBlogsResponse {
  success: boolean;
  count: number;
  blogs: ExternalBlog[];
}

// Temporary cache to avoid repeated fetches across components
let cachedBlogs: ExternalBlog[] | null = null;
let fetchPromise: Promise<ExternalBlog[]> | null = null;

const BASE_URL = 'https://ea-overseas-backend.render.com/api/v1/blogs';

export const fetchExternalBlogs = async (category?: string): Promise<ExternalBlog[]> => {
  if (!category && cachedBlogs) return cachedBlogs;
  if (!category && fetchPromise) return fetchPromise;

  try {
    const url = category ? `${BASE_URL}?category=${encodeURIComponent(category)}` : BASE_URL;
    const request = fetch(url).then(async res => {
      if (!res.ok) throw new Error(`Failed to fetch blogs: ${res.statusText}`);
      const data: ExternalBlogsResponse = await res.json();
      return data.success ? data.blogs || [] : [];
    });

    if (!category) {
      fetchPromise = request;
      const result = await fetchPromise;
      cachedBlogs = result;
      fetchPromise = null;
      return result;
    }
    return await request;
  } catch (err) {
    console.error('Error fetching external blogs:', err);
    if (!category) fetchPromise = null;
    return [];
  }
};

export const fetchExternalBlogBySlug = async (slug: string): Promise<ExternalBlog | null> => {
  try {
    const res = await fetch(`${BASE_URL}/${encodeURIComponent(slug)}`);
    if (!res.ok) throw new Error(`Failed to fetch blog details: ${res.statusText}`);
    const data = await res.json();
    return data.success ? data.blog : null;
  } catch (err) {
    console.error('Error fetching external blog detail:', err);
    return null;
  }
};

export const recordBlogView = async (slug: string) => {
  try {
    await fetch(`${BASE_URL}/${encodeURIComponent(slug)}/view`, { method: 'PATCH' });
  } catch (err) {
    console.error('Error recording view:', err);
  }
};

export const likeBlog = async (slug: string): Promise<number | null> => {
  try {
    const res = await fetch(`${BASE_URL}/${encodeURIComponent(slug)}/like`, { method: 'POST' });
    const data = await res.json();
    return data.likes;
  } catch (err) {
    console.error('Error liking blog:', err);
    return null;
  }
};

export const postComment = async (slug: string, username: string, content: string): Promise<BlogComment[] | null> => {
  try {
    const res = await fetch(`${BASE_URL}/${encodeURIComponent(slug)}/comment`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: username, content })
    });
    const data = await res.json();
    return data.comments;
  } catch (err) {
    console.error('Error posting comment:', err);
    return null;
  }
};
