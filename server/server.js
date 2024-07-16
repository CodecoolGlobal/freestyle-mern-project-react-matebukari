import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import url from 'url';
import User from './model/User.js';

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
    const user = await User.create({
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

app.get('/api/question', async (req, res) => {
  
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
})