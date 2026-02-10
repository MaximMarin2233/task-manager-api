import { prisma } from '../utils/prisma';
import { CreateTaskDto } from '../models/task.types';

export class TaskService {
  async createTask(data: CreateTaskDto) {
    return prisma.task.create({
      data: {
        ...data,
        status: 'pending',
      },
    });
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
