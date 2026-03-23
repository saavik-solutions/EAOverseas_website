import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
    source: string;
    name: string;
    email: string;
    phone?: string;
    interest?: string;
    message?: string;
    status: 'New' | 'Contacted' | 'Qualified' | 'Lost';
    createdAt: Date;
    updatedAt: Date;
}

const LeadSchema: Schema = new Schema(
    {
        source: { type: String, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String },
        interest: { type: String },
        message: { type: String },
        status: { type: String, enum: ['New', 'Contacted', 'Qualified', 'Lost'], default: 'New' },
    },
    { timestamps: true }
);

export const Lead = mongoose.model<ILead>('Lead', LeadSchema);
