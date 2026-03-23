import mongoose, { Schema, Document } from 'mongoose';

export interface IApiKey extends Document {
    key: string;
    createdAt: Date;
    updatedAt: Date;
}

const ApiKeySchema: Schema = new Schema(
    {
        key: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

export const ApiKey = mongoose.model<IApiKey>('ApiKey', ApiKeySchema);
