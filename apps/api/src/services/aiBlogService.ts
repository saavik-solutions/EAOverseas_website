import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export interface GeneratedBlog {
    title: string;
    excerpt: string;
    content: string;
    coverImage: string;
    tags: string[];
    category: string;
}

const CATEGORY_PROMPTS: Record<string, string> = {
  'Admission': 'Focus on the strategic application process, deadlines, and successful entry requirements for global universities.',
  'Universities': 'Provide in-depth insights into campus life, academic excellence, and the unique value proposition of top-tier global institutions.',
  'Facts': 'Share surprising, data-driven, and little-known facts about international education and global career opportunities.',
  'FOMO': 'Create high-engagement content highlighting the urgency of global exposure, securing a future in a competitive market, and why students shouldn\'t delay their international journey.'
};

export const generateBlogContent = async (category: string, mode: 'experiment' | 'custom', keywords?: string): Promise<GeneratedBlog | null> => {
    try {
        if (!process.env.OPENAI_API_KEY) {
            throw new Error('OPENAI_API_KEY is missing');
        }

        const categoryContext = CATEGORY_PROMPTS[category] || 'General international education and study abroad guidance.';
        
        const systemPrompt = `You are an expert content strategist for EAOverseas, a premium study abroad consultancy with 30 years of excellence. 
        Your goal is to generate high-performance, SEO-optimized blog posts for students and parents.
        
        Category: ${category}
        Context: ${categoryContext}
        
        Mode: ${mode === 'experiment' ? 'Be creative, experimental, and look for "Blue Ocean" topics that are trending but not saturated.' : 'Focus strictly on the provided keywords and ideas.'}
        ${keywords ? `Keywords/Ideas: ${keywords}` : ''}
        
        Rules:
        1. Return ONLY a JSON object.
        2. Include: "title", "excerpt" (one captivating sentence), "content" (Rich Markdown format with headings), "coverImage" (A highly relevant Unsplash source URL like https://images.unsplash.com/photo-xxx?w=1200), and "tags" (3-5 relevant hashtags).
        3. Tone: Professional, authoritative, yet encouraging and premium.
        4. "coverImage" MUST be a real Unsplash URL pattern representing the topic.
        `;

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: "Generate the blog post JSON now." }
            ],
            response_format: { type: "json_object" },
        });

        const rawJson = response.choices[0].message.content;
        if (!rawJson) return null;

        const parsed = JSON.parse(rawJson) as GeneratedBlog;
        return {
            ...parsed,
            category: category
        };
    } catch (error: any) {
        console.error("AI Blog Generation Error:", error.message || error);
        return null;
    }
};
