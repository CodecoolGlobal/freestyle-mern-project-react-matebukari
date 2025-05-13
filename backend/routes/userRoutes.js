import express from 'express';
import {
    getUsers,
    createUser,
    loginUser,
    updateUser,
} from '../controllers/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.post('/login', loginUser);
router.patch('/:id', updateUser);

export default router;