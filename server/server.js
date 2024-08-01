import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import url from 'url';
import User from './model/User.js';
import Question from './model/Question.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URL);

const app = express();
const PORT = 4000;

const filename = url.fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

app.use(express.json());
app.use(express.static(path.join(dirname, "../client")));

async function createUser ({ userName, userPassword }) {
  try {
    await User.create({
      name: userName,
      password: userPassword,
      score: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    })
  } catch (error) {
    console.log(error);
  }
}

function shuffleQuestions(questions) {
  for (let i = questions.length - 1; i > 0; i--){
    let j = Math.floor(Math.random() * (i + 1));
    let temp = questions[i];
    questions[i] = questions[j];
    questions[j] = temp;
  }
}

function getRandomQuestions(difficulty, questions, numberOfQuestions){
  const choosenQuestions = []
  const filteredQuestions = questions.filter((question) => question.difficulty === difficulty);
  shuffleQuestions(filteredQuestions);
  for (let i = 0; i < numberOfQuestions; i++){
    choosenQuestions.push(filteredQuestions[i]);
  }
  return choosenQuestions;
}

async function getGameQuestions (numberOfQuestions){
  const allQuestions = await Question.find();
  const gameQuestions = [
    ...getRandomQuestions(1 , allQuestions, numberOfQuestions),
    ...getRandomQuestions(2, allQuestions, numberOfQuestions),
    ...getRandomQuestions(3, allQuestions, numberOfQuestions)
  ];

  return gameQuestions;
}

async function removeQuestion(id) {
  await Question.findByIdAndDelete(id);
}

app.delete('/api/question/:id', async (req, res, next) => {
  try {
    await removeQuestion(req.params.id);
    res.json({success: true});
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

app.post('/api/user', async (req, res) => {
  const user = req.body;
  const existingUser = await User.findOne({ name: user.userName });
  
  if (existingUser) {
    return res.status(400).json({ success: false, message: 'User already exists' });
  }
  
  try {
    await createUser(user);
    res.json({user: await User.find(), success: true});
  } catch (error) {
    res.status(400).json({ success: false });
  }
});

app.post('/api/user/login', async (req, res) => {
  const user = req.body;
  const existingUser = await User.findOne({
    name: user.userName,
    password: user.userPassword 
  });
  
  if (existingUser) {
    return res.status(200).json({ success: true, message: 'Should login', user: existingUser });
  }
  
  res.status(400).json({ success: false });
  
});

async function createQuestion (questionData) {
  try {
    await Question.create({
      question: questionData.question,
      answers: questionData.answers,
      correctAnswer: questionData.correctAnswer,
      difficulty: Number(questionData.difficulty),
      user: questionData.user,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      })
  } catch (error) {
    console.log(error);
  }
}

app.get('/api/users', async (req, res) => {
  res.status(200).json(await User.find());
});

app.patch('/api/user/:id', async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(user);
  } catch (err) {
    return next(err);
  }
})

app.get('/api/questions-all', async (req, res) => {
  res.json(await Question.find().populate('user'));
});

app.get('/api/questions-by-user/:id', async (req, res) => {
  res.json(await Question.find({user: new mongoose.Types.ObjectId(req.params.id)}).populate('user')); 
});




app.post('/api/question', async (req, res) => {
  const question = req.body;
  try {
    await createQuestion(question);
    return res.status(200).json({ success: true, message: 'Question created'});
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: 'Creation failed', error: error});
  }
})

app.get('/api/questions-ingame', async (req, res) => {
  const questionsPerDifficulty = 3;
  const questions = await getGameQuestions(questionsPerDifficulty);
  try {
    return res.status(200).json({ success: true, message: 'Questions sent!', questions: questions});
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: 'Failed to get questions!', error: error});
  }
})

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
})