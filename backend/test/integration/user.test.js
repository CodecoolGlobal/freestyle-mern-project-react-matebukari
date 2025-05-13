import * as chai from 'chai';
import chaiHttp , {request} from 'chai-http';
import { app } from '../../server.js';
import { setupTestEnvironment, createTestUser } from '../helpers/testSetup.js';

chai.use(chaiHttp);

const { expect } = chai;

describe('User API Tests', () => {
    setupTestEnvironment();

    describe('POST /api/users', () => {
        it('should create a new user', async () => {
            const res = await request.execute(app)
                .post('/api/users')
                .send({
                    name: 'testuser',
                    password: 'testpass'
                });

            expect(res).to.have.status(201);
            expect(res.body).to.have.property('_id');
            expect(res.body.name).to.equal('testuser');
        });
    });

    describe('POST /api/users/login', () => {
        it('should login with valid credentials', async () => {
            await createTestUser();

            const res = await request.execute(app)
                .post('/api/users/login')
                .send({
                    name: 'testuser',
                    password: 'testpass'
                });

            expect(res).to.have.status(200);
            expect(res.body).to.have.property('_id');
        });
    });
});