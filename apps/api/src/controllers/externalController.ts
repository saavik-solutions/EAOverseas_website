import { Request, Response } from 'express';
import { ApiKey } from '../models/ApiKey';
import { Lead } from '../models/Lead';

export const collectLead = async (req: Request, res: Response): Promise<void> => {
    try {
        const apiKeyHeader = req.headers['x-api-key'];

        if (!apiKeyHeader || typeof apiKeyHeader !== 'string') {
            res.status(401).json({ success: false, message: 'Missing or invalid API key' });
            return;
        }

        const validKey = await ApiKey.findOne({ key: apiKeyHeader });

        if (!validKey) {
            res.status(403).json({ success: false, message: 'Forbidden: Invalid API key' });
            return;
        }

        const { source, name, email, phone, interest, message } = req.body;

        if (!source || !name || !email) {
            res.status(400).json({ success: false, message: 'Missing required fields: source, name, email' });
            return;
        }

        const newLead = new Lead({
            source,
            name,
            email,
            phone,
            interest,
            message,
            status: 'New'
        });

        await newLead.save();

        res.status(201).json({ success: true, leadId: newLead._id, message: 'Lead collected successfully' });
    } catch (error) {
        console.error('Error in collectLead:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};
