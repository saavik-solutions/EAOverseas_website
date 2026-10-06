import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { University } from './src/models/University';
import fs from 'fs';
import path from 'path';
import xlsx from 'xlsx';

dotenv.config();

const updateAcceptanceRates = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eduwoy');
        
        const excelFile = path.resolve(__dirname, '../web/Study_Abroad_Universities_Master_Database_2025.xlsx');
        const workbook = xlsx.readFile(excelFile);
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = xlsx.utils.sheet_to_json(sheet);
        
        const validRows = jsonData.slice(2); // Skip header rows

        for (const row of validRows as any[]) {
            const name = row["__EMPTY"];
            if (!name) continue;
            
            const acceptanceRate = row["__EMPTY_3"] ? row["__EMPTY_3"].toString() : '';
            const university_id = `excel-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

            await University.findOneAndUpdate(
                { university_id },
                { acceptanceRate },
                { new: true }
            );
        }

        console.log('Successfully updated acceptance rates for all Excel universities.');
        await mongoose.connection.close();
    } catch (err) {
        console.error('Update Error:', err);
        process.exit(1);
    }
};

updateAcceptanceRates();
