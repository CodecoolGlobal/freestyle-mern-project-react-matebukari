import { expect } from 'chai';
import sinon from 'sinon';
import bcrypt from 'bcryptjs';
import * as UserModule from '../../../models/User.js';
import * as userController from '../../../controllers/userController.js';

describe('User Controller', () => {
    let sandbox;
    let req, res, next;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
        req = { body: {}, params: {} };
        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.spy(),
            send: sinon.spy()
        };
        next = sinon.spy();
    });

    afterEach(() => sandbox.restore());

    describe('getUsers', () => {
        it('should retrieve all users without passwords', async () => {
            const mockUsers = [{ name: 'user1' }, { name: 'user2' }];
            sandbox.stub(UserModule.default, 'find')
                .returns({ select: sinon.stub().resolves(mockUsers) });

            await userController.getUsers(req, res, next);
            expect(res.json.calledWith(mockUsers)).to.be.true;
        });

        it('should handle database errors', async () => {
            sandbox.stub(UserModule.default, 'find').rejects(new Error('DB Error'));
            await userController.getUsers(req, res, next);
            expect(next.calledOnce).to.be.true;
        });
    });

    describe('createUser', () => {
        it('should return 400 for missing fields', async () => {
            req.body = { name: 'test' };
            await userController.createUser(req, res, next);
            expect(res.status.calledWith(400)).to.be.true;
        });

        it('should return 409 for duplicate username', async () => {
            req.body = { name: 'existing', password: 'pass' };
            sandbox.stub(UserModule.default, 'findOne').resolves({});
            await userController.createUser(req, res, next);
            expect(res.status.calledWith(409)).to.be.true;
        });

        it('should handle password hashing errors', async () => {
            req.body = { name: 'test', password: 'pass' };
            sandbox.stub(UserModule.default, 'findOne').resolves(null);
            sandbox.stub(bcrypt, 'hash').rejects(new Error('Hashing failed'));
            await userController.createUser(req, res, next);
            expect(next.calledOnce).to.be.true;
        });

        it('should create user successfully', async () => {
            req.body = { name: 'newuser', password: 'pass' };
            const mockUser = { _id: '123', name: 'newuser', toObject: () => ({ name: 'newuser' }) };
            sandbox.stub(UserModule.default, 'findOne').resolves(null);
            sandbox.stub(bcrypt, 'hash').resolves('hashed');
            sandbox.stub(UserModule.default, 'create').resolves(mockUser);
            await userController.createUser(req, res, next);
            expect(res.status.calledWith(201)).to.be.true;
        });
    });

    describe('loginUser', () => {
        it('should return 401 for invalid credentials', async () => {
            req.body = { name: 'wrong', password: 'wrong' };
            sandbox.stub(UserModule.default, 'findOne').resolves(null);
            await userController.loginUser(req, res, next);
            expect(res.status.calledWith(401)).to.be.true;
        });

        it('should return 401 for invalid password', async () => {
            req.body = { name: 'user', password: 'wrong' };
            sandbox.stub(UserModule.default, 'findOne').resolves({ password: 'hash' });
            sandbox.stub(bcrypt, 'compare').resolves(false);
            await userController.loginUser(req, res, next);
            expect(res.status.calledWith(401)).to.be.true;
        });

        it('should login successfully', async () => {
            req.body = { name: 'user', password: 'correct' };
            const mockUser = { name: 'user', password: 'hash', toObject: () => ({ name: 'user' }) };
            sandbox.stub(UserModule.default, 'findOne').resolves(mockUser);
            sandbox.stub(bcrypt, 'compare').resolves(true);
            await userController.loginUser(req, res, next);
            expect(res.status.calledWith(200)).to.be.true;
        });
    });

    describe('updateUser', () => {
        beforeEach(() => {
            req.params.id = '123';
        });

        it('should return 404 for non-existent user', async () => {
            sandbox.stub(UserModule.default, 'findByIdAndUpdate').returns({
                select: sinon.stub().resolves(null)
            });

            await userController.updateUser(req, res, next);
            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWithMatch({
                message: 'User not found'
            })).to.be.true;
        });


        it('should hash new password', async () => {
            req.body = { password: 'newpass' };
            const mockUser = { _id: '123', name: 'user' };
            sandbox.stub(bcrypt, 'hash').resolves('newhash');
            sandbox.stub(UserModule.default, 'findByIdAndUpdate').resolves(mockUser);
            await userController.updateUser(req, res, next);
            expect(bcrypt.hash.calledWith('newpass', 12)).to.be.true;
        });

        it('should update without password', async () => {
            const mockUser = {
                _id: req.params.id,
                name: 'newname',
                toObject: () => ({ name: 'newname' })
            };

            sandbox.stub(UserModule.default, 'findByIdAndUpdate').returns({
                select: sinon.stub().resolves(mockUser)
            });

            req.body = { name: 'newname' };
            await userController.updateUser(req, res, next);

            expect(res.json.calledWithMatch({ name: 'newname' })).to.be.true;
            expect(res.json.args[0][0]).to.not.have.property('password');
        });

        it('should handle update errors', async () => {
            sandbox.stub(UserModule.default, 'findByIdAndUpdate').rejects(new Error('DB Error'));
            await userController.updateUser(req, res, next);
            expect(next.calledOnce).to.be.true;
        });
    });
});