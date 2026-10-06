import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse {
    degree: string;
    specialization: string;
    duration: string;
}

export interface IFees {
    tuition: string;
    hostel: string;
}

export interface IUniversity extends Document {
    university_id: string; // hash(domain + name)
    name: string;
    website: string;
    country: string;
    city: string;
    description?: string;
    universityType?: 'Public' | 'Private' | 'Research' | 'Technical';
    establishedYear?: number;
    totalStudents?: number;
    campusSize?: string;
    globalRanking?: string;
    courses: ICourse[];
    fees: IFees;
    scholarships: string[];
    ranking?: string;
    facilities?: string[];
    language?: string;
    acceptanceRate?: string;
    admissionRequirements?: string;
    placementStatistics?: string;
    logoUrl?: string;
    scraped_at: Date;
    visitCount: number;
    visitHistory: { date: string; count: number }[];
    socialLinks?: {
        linkedin?: string;
        twitter?: string;
        facebook?: string;
        instagram?: string;
    };
    createdAt: Date;
    updatedAt: Date;
}

const UniversitySchema: Schema = new Schema(
    {
        university_id: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        website: { type: String, required: true },
        country: { type: String, required: true },
        city: { type: String },
        description: { type: String },
        universityType: { type: String, enum: ['Public', 'Private', 'Research', 'Technical'] },
        establishedYear: { type: Number },
        totalStudents: { type: Number },
        campusSize: { type: String },
        globalRanking: { type: String },
        courses: [
            {
                degree: { type: String },
                specialization: { type: String },
                duration: { type: String }
            }
        ],
        fees: {
            tuition: { type: String },
            hostel: { type: String }
        },
        scholarships: [{ type: String }],
        ranking: { type: String },
        facilities: [{ type: String }],
        language: { type: String },
        acceptanceRate: { type: String },
        admissionRequirements: { type: String },
        placementStatistics: { type: String },
        logoUrl: { type: String },
        visitCount: { type: Number, default: 0 },
        visitHistory: [
            {
                date: { type: String },
                count: { type: Number }
            }
        ],
        socialLinks: {
            linkedin: { type: String },
            twitter: { type: String },
            facebook: { type: String },
            instagram: { type: String }
        },
        scraped_at: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

// Index for better query performance
UniversitySchema.index({ country: 1 });
UniversitySchema.index({ name: 'text' });

export const University = mongoose.model<IUniversity>('University', UniversitySchema);
