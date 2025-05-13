import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../../models/User.js';
import Question from '../../models/Question.js';
import bcrypt from "bcryptjs";

let mongoServer;

export const setupTestEnvironment = () => {
    before(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();

        await mongoose.disconnect();
        await mongoose.connect(mongoUri);
    });

    beforeEach(async () => {
        await User.deleteMany({});
        await Question.deleteMany({});
    });

    after(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });
};

export const createTestUser = async (userData = {}) => {
    return await User.create({
        name: 'testuser',
        password: await bcrypt.hash('testpass', 12),
        score: 0,
        ...userData
    });
};

export const createTestQuestion = async (questionData = {}) => {
    return await Question.create({
        question: 'Test Question?',
        answers: {
            answerA: 'A',
            answerB: 'B',
            answerC: 'C',
            answerD: 'D'
        },
        correctAnswer: 'A',
        difficulty: 1,
        user: new mongoose.Types.ObjectId(),
        ...questionData
    });
};