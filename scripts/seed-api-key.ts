import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import crypto from 'crypto';

// Load env from apps/api
dotenv.config({ path: path.join(__dirname, '../apps/api/.env') });

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
    console.error('Error: MONGODB_URI is not defined in apps/api/.env');
    process.exit(1);
}

const seedApiKey = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');

        // Generate a new key starting with ea_live_
        const newKey = `ea_live_${crypto.randomBytes(24).toString('hex')}`;

        // Mongoose schema and model directly to avoid compilation issues
        const ApiKeySchema = new mongoose.Schema(
            { key: { type: String, required: true, unique: true } },
            { timestamps: true }
        );
        const ApiKeyModel = mongoose.models.ApiKey || mongoose.model('ApiKey', ApiKeySchema);

        const newApiKey = new ApiKeyModel({ key: newKey });
        await newApiKey.save();

        console.log('\n==================================================');
        console.log('SUCCESS! Enterprise Key Generated and Vaulted.');
        console.log(`YOUR ENTERPRISE KEY: ${newKey}`);
        console.log('==================================================\n');

        mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error('Failed to seed API key:', error);
        mongoose.connection.close();
        process.exit(1);
    }
};

seedApiKey();
