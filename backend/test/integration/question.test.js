import * as chai from 'chai';
import chaiHttp , {request} from 'chai-http';
import { app } from '../../server.js';
import { setupTestEnvironment, createTestUser, createTestQuestion } from '../helpers/testSetup.js';

chai.use(chaiHttp);

const { expect } = chai;

describe('Question API Tests', () => {
    setupTestEnvironment();

    describe('POST /api/questions', () => {
        it('should create a new question', async () => {
            const user = await createTestUser();

            const res = await request.execute(app)
                .post('/api/questions')
                .send({
                    question: 'Test Question?',
                    answers: {
                        answerA: 'A',
                        answerB: 'B',
                        answerC: 'C',
                        answerD: 'D'
                    },
                    correctAnswer: 'A',
                    difficulty: 1,
                    user: user._id
                });

            expect(res).to.have.status(201);
            expect(res.body.question).to.equal('Test Question?');
        });
    });

    describe('GET /api/questions/ingame', () => {
        it('should return game questions', async () => {
            await Promise.all([
                createTestQuestion({ difficulty: 1 }),
                createTestQuestion({ difficulty: 1 }),
                createTestQuestion({ difficulty: 1 }),
                createTestQuestion({ difficulty: 2 }),
                createTestQuestion({ difficulty: 2 }),
                createTestQuestion({ difficulty: 2 }),
                createTestQuestion({ difficulty: 3 }),
                createTestQuestion({ difficulty: 3 }),
                createTestQuestion({ difficulty: 3 }),
            ]);

            const res = await request.execute(app)
                .get('/api/questions/ingame');

            expect(res).to.have.status(200);
            expect(res.body).to.be.an('array').with.lengthOf(9);
        });
    });
});