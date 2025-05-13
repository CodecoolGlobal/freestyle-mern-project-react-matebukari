import mongoose from 'mongoose';
import env from './env.js';

const connectDB = async () => {
    try {
        if (process.env.NODE_ENV !== 'test') {
            await mongoose.connect(env.MONGO_URI);
            console.log('MongoDB connected');
        }
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;