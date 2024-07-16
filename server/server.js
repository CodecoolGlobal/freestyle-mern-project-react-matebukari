import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import url from 'url';



dotenv.config();

mongoose.connect(process.env.MONGO_URL);

const app = express();
const PORT = 4000;

const filename = url.fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

app.use(express.json());
app.use(express.static(path.join(dirname, "../client")));

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
})