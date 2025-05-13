import express from 'express';
import {
    getAllQuestions,
    getQuestionsByUser,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getGameQuestions,
} from '../controllers/questionController.js';

const router = express.Router();

router.get('/', getAllQuestions);
router.get('/by-user/:id', getQuestionsByUser);
router.get('/ingame', getGameQuestions);
router.post('/', createQuestion);
router.patch('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);

export default router;