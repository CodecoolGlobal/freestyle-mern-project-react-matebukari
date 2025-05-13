import Question from '../models/Question.js';
import mongoose from 'mongoose';
import User from "../models/User.js";

const validAnswers = ['A', 'B', 'C', 'D'];

const shuffleQuestions = (questions) => {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    return questions;
};

export const getAllQuestions = async (req, res, next) => {
    try {
        const questions = await Question.find().populate('user', 'name score');
        res.status(200).json(questions);
    } catch (error) {
        next(error);
    }
};

export const getQuestionsByUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID' });
        }

        const questions = await Question.find({ user: id }).populate('user', 'name');
        res.status(200).json(questions);
    } catch (error) {
        next(error);
    }
};

export const getGameQuestions = async (req, res, next) => {
    try {
        const questionsPerDifficulty = 3;
        const allQuestions = await Question.find().populate('user', 'name');

        const difficultyGroups = {
            1: shuffleQuestions(allQuestions.filter(q => q.difficulty === 1)),
            2: shuffleQuestions(allQuestions.filter(q => q.difficulty === 2)),
            3: shuffleQuestions(allQuestions.filter(q => q.difficulty === 3))
        };

        const gameQuestions = [
            ...difficultyGroups[1].slice(0, questionsPerDifficulty),
            ...difficultyGroups[2].slice(0, questionsPerDifficulty),
            ...difficultyGroups[3].slice(0, questionsPerDifficulty)
        ];

        if (gameQuestions.length < questionsPerDifficulty * 3) {
            return res.status(404).json({
                message: 'Not enough questions available'
            });
        }

        res.status(200).json(gameQuestions);
    } catch (error) {
        next(error);
    }
};

export const createQuestion = async (req, res, next) => {
    try {
        const { question, answers, correctAnswer, difficulty, user } = req.body;

        if (!mongoose.Types.ObjectId.isValid(user)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        const existingUser = await User.findById(user);
        if (!existingUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!answers || !answers.answerA || !answers.answerB ||
            !answers.answerC || !answers.answerD) {
            return res.status(400).json({
                message: 'All four answers (A, B, C, D) are required'
            });
        }

        if (!validAnswers.includes(correctAnswer)) {
            return res.status(400).json({
                message: 'Correct answer must be A, B, C, or D'
            });
        }

        const newQuestion = await Question.create({
            question,
            answers,
            correctAnswer,
            difficulty: Number(difficulty),
            user: existingUser._id,
            createdAt: Date.now(),
            updatedAt: Date.now()
        });

        const populatedQuestion = await Question.findById(newQuestion._id)
            .populate('user', 'name');

        res.status(201).json(populatedQuestion);
    } catch (error) {
        next(error);
    }
};

export const updateQuestion = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (updates.answers) {
            if (!updates.answers.answerA || !updates.answers.answerB ||
                !updates.answers.answerC || !updates.answers.answerD) {
                return res.status(400).json({
                    message: 'All four answers (A, B, C, D) are required'
                });
            }
        }

        if (updates.correctAnswer && !validAnswers.includes(updates.correctAnswer)) {
            return res.status(400).json({
                message: 'Correct answer must be A, B, C, or D'
            });
        }

        const updatedQuestion = await Question.findByIdAndUpdate(
            id,
            { ...updates, updatedAt: Date.now() },
            { new: true, runValidators: true }
        ).populate('user', 'name');

        if (!updatedQuestion) {
            return res.status(404).json({ message: 'Question not found' });
        }

        res.status(200).json(updatedQuestion);
    } catch (error) {
        next(error);
    }
};

export const deleteQuestion = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedQuestion = await Question.findByIdAndDelete(id);

        if (!deletedQuestion) {
            return res.status(404).json({ message: 'Question not found' });
        }

        res.status(200).json({
            message: 'Question deleted successfully',
            deletedId: deletedQuestion._id
        });
    } catch (error) {
        next(error);
    }
};