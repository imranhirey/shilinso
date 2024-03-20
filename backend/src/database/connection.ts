// src/database/index.ts

import mongoose from 'mongoose';
import {config} from "dotenv"

config()
const connectDB = async (): Promise<void> => {
    console.log("connecting to db ...")
    try {
        //mongodb+srv://<username>:<password>@shilinso.qvlufad.mongodb.net/?retryWrites=true&w=majority&appName=shilinso
        const uri = process.env.DB_URL?.toString()



       //@ts-ignore
        await mongoose.connect(uri, {
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Exit the application if unable to connect to the database
    }
};

// Export the connectDB function to be used elsewhere in the application
export default connectDB;
