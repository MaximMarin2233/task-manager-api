import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import taskRoutes from './routes/task.routes';

import { prisma } from './utils/prisma';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/tasks', taskRoutes);

app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

app.get('/db-test', async (_, res) => {
  const tasks = await prisma.task.findMany();
  res.json(tasks);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
