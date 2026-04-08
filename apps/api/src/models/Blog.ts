import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    author: string;
    coverImage: string;
    category: string;
    tags: string[];
    views: number;
    likes: number;
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        content: { type: String, required: true },
        excerpt: { type: String, required: true },
        author: { type: String, default: 'EAOverseas Expert' },
        coverImage: { type: String, required: true },
        category: { type: String, default: 'General' },
        tags: [{ type: String }],
        views: { type: Number, default: 0 },
        likes: { type: Number, default: 0 },
        isPublished: { type: Boolean, default: true },
    },
    { timestamps: true }
);

// Pre-save hook to generate slug
BlogSchema.pre('save', function(next) {
    const blog = this as any;
    if (!blog.slug && blog.title) {
        blog.slug = blog.title
            .toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    }
    next();
});

export const Blog = mongoose.model<IBlog>('Blog', BlogSchema);
