import express from 'express';
import path from 'path';
import url from 'url';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV !== 'test') {
  connectDB();
}

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));

app.use('/api/users', userRoutes);
app.use('/api/questions', questionRoutes);

app.use(notFound);
app.use(errorHandler);

export { app };

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, '0.0.0.0',() => {
    console.log(`Server running on port ${PORT}`);
  });
}