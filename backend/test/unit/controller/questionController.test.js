import { expect } from 'chai';
import sinon from 'sinon';
import mongoose from 'mongoose';
import * as QuestionModule from '../../../models/Question.js';
import * as UserModule from '../../../models/User.js';
import * as questionController from '../../../controllers/questionController.js';

describe('Question Controller', () => {
    let sandbox;
    let req, res, next;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = { body: {}, params: {}, query: {} };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy(),
            send: sinon.spy()
        };
        next = sinon.spy();
    });

    afterEach(() => sandbox.restore());

    describe('getAllQuestions', () => {
        it('should retrieve all questions with user data', async () => {
            const mockQuestions = [{ question: 'Q1' }];
            sandbox.stub(QuestionModule.default, 'find').returns({
                populate: sinon.stub().resolves(mockQuestions)
            });
            await questionController.getAllQuestions(req, res, next);
            expect(res.status.calledWith(200)).to.be.true;
        });
    });

    describe('getQuestionsByUser', () => {
        it('should return 400 for invalid user ID', async () => {
            req.params.id = 'invalid';
            await questionController.getQuestionsByUser(req, res, next);
            expect(res.status.calledWith(400)).to.be.true;
        });

        it('should return questions for valid user', async () => {
            req.params.id = new mongoose.Types.ObjectId().toString();
            sandbox.stub(QuestionModule.default, 'find').returns({
                populate: sinon.stub().resolves([{ question: 'Q1' }])
            });
            await questionController.getQuestionsByUser(req, res, next);
            expect(res.status.calledWith(200)).to.be.true;
        });
    });

    describe('getGameQuestions', () => {
        it('should return 404 if not enough questions', async () => {
            const mockQuestions = [
                ...Array(2).fill({ difficulty: 1 }),
                ...Array(2).fill({ difficulty: 2 }),
                ...Array(2).fill({ difficulty: 3 })
            ];

            sandbox.stub(QuestionModule.default, 'find')
                .returns({ populate: sinon.stub().resolves(mockQuestions) });

            await questionController.getGameQuestions(req, res, next);

            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWithMatch({
                message: 'Not enough questions available'
            })).to.be.true;
        });

        it('should return 9 questions when available', async () => {
            const mockQuestions = [
                ...Array(5).fill({ difficulty: 1 }),
                ...Array(5).fill({ difficulty: 2 }),
                ...Array(5).fill({ difficulty: 3 })
            ];

            sandbox.stub(QuestionModule.default, 'find')
                .returns({ populate: sinon.stub().resolves(mockQuestions) });
            await questionController.getGameQuestions(req, res, next);

            expect(res.json.calledOnce).to.be.true;
            expect(res.json.args[0][0].length).to.equal(9);
        });
    });

    describe('createQuestion', () => {
        beforeEach(() => {
            req.body = {
                question: 'Test?',
                answers: { answerA: 'A', answerB: 'B', answerC: 'C', answerD: 'D' },
                correctAnswer: 'A',
                user: new mongoose.Types.ObjectId().toString()
            };
        });

        it('should return 400 for invalid user ID', async () => {
            req.body.user = 'invalid';
            await questionController.createQuestion(req, res, next);
            expect(res.status.calledWith(400)).to.be.true;
        });

        it('should return 404 for non-existent user', async () => {
            sandbox.stub(UserModule.default, 'findById').resolves(null);
            await questionController.createQuestion(req, res, next);
            expect(res.status.calledWith(404)).to.be.true;
        });

        it('should return 400 for missing answers', async () => {
            req.body.answers = { answerA: 'A' };
            sandbox.stub(UserModule.default, 'findById').resolves({});

            await questionController.createQuestion(req, res, next);
            expect(res.status.calledWith(400)).to.be.true;
        });

        it('should return 400 for invalid correct answer', async () => {
            req.body.correctAnswer = 'X';
            sandbox.stub(UserModule.default, 'findById').resolves({});

            await questionController.createQuestion(req, res, next);
            expect(res.status.calledWith(400)).to.be.true;
        });

        it('should create question successfully', async () => {
            const mockUser = { _id: req.body.user };
            const mockQuestion = {
                _id: new mongoose.Types.ObjectId(),
                populate: sinon.stub().resolves({ question: 'Test?' })
            };
            sandbox.stub(UserModule.default, 'findById').resolves(mockUser);
            sandbox.stub(QuestionModule.default, 'create').resolves(mockQuestion);
            sandbox.stub(QuestionModule.default, 'findById').returns({
                populate: sinon.stub().resolves(mockQuestion)
            });
            await questionController.createQuestion(req, res, next);
            expect(res.status.calledWith(201)).to.be.true;
        });
    });

    describe('updateQuestion', () => {
        beforeEach(() => {
            req.params.id = new mongoose.Types.ObjectId().toString();
        });

        it('should return 400 for invalid answers update', async () => {
            req.body.answers = { answerA: 'Only A' };
            await questionController.updateQuestion(req, res, next);
            expect(res.status.calledWith(400)).to.be.true;
        });

        it('should return 400 for invalid correct answer', async () => {
            req.body.correctAnswer = 'X';
            await questionController.updateQuestion(req, res, next);
            expect(res.status.calledWith(400)).to.be.true;
        });

        it('should return 404 for non-existent question', async () => {
            sandbox.stub(QuestionModule.default, 'findByIdAndUpdate').returns({
                populate: sinon.stub().resolves(null)
            });

            await questionController.updateQuestion(req, res, next);
            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWithMatch({
                message: 'Question not found'
            })).to.be.true;
        });

        it('should update question successfully', async () => {
            const mockQuestion = {
                _id: req.params.id,
                question: 'Updated',
                populate: sinon.stub().resolvesThis()
            };

            sandbox.stub(QuestionModule.default, 'findByIdAndUpdate').returns({
                populate: sinon.stub().resolves(mockQuestion)
            });

            await questionController.updateQuestion(req, res, next);
            expect(res.json.calledOnce).to.be.true;
            expect(res.json.args[0][0].question).to.equal('Updated');
        });
    });

    describe('deleteQuestion', () => {
        it('should return 404 for non-existent question', async () => {
            sandbox.stub(QuestionModule.default, 'findByIdAndDelete').resolves(null);
            await questionController.deleteQuestion(req, res, next);
            expect(res.status.calledWith(404)).to.be.true;
        });

        it('should delete question successfully', async () => {
            const mockQuestion = { _id: '123' };
            sandbox.stub(QuestionModule.default, 'findByIdAndDelete').resolves(mockQuestion);
            await questionController.deleteQuestion(req, res, next);
            expect(res.json.calledWithMatch({ deletedId: '123' })).to.be.true;
        });
    });
});