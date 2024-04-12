// src/database/index.ts

import mongoose from 'mongoose';
import {config} from "dotenv"

config()
const connectDB = async (): Promise<void> => {
    console.log("connecting to db ...")
    try {
        const uri = process.env.DB_URL?.toString()



       //@ts-ignore
        await mongoose.connect(uri, {
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        
    }
};
export default connectDB;
