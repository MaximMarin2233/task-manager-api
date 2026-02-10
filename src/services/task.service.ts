import { prisma } from '../utils/prisma';
import { CreateTaskDto } from '../models/task.types';
import { taskProcessor } from './task.processor';

export class TaskService {
  async createTask(data: CreateTaskDto) {
    const task = await prisma.task.create({
      data: {
        ...data,
        status: 'pending',
      },
    });

    // async proc
    taskProcessor.processTask(task.id);

    return task;
  }

  async getAllTasks() {
    return prisma.task.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getTaskById(id: number) {
    return prisma.task.findUnique({
      where: { id },
    });
  }

  async updateTask(id: number, data: Partial<CreateTaskDto>) {
    return prisma.task.update({
      where: { id },
      data,
    });
  }

  async deleteTask(id: number) {
    return prisma.task.delete({
      where: { id },
    });
  }
}

export const taskService = new TaskService();
