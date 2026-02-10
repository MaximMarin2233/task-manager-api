import { Request, Response } from 'express';
import { taskService } from '../services/task.service';

export class TaskController {
  async create(req: Request, res: Response) {
    try {
      const task = await taskService.createTask(req.body);
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create task' });
    }
  }

  async getAll(_: Request, res: Response) {
    try {
      const tasks = await taskService.getAllTasks();
      res.json(tasks);
    } catch {
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const task = await taskService.getTaskById(id);

      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      res.json(task);
    } catch {
      res.status(500).json({ error: 'Failed to fetch task' });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const task = await taskService.updateTask(id, req.body);
      res.json(task);
    } catch {
      res.status(500).json({ error: 'Failed to update task' });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await taskService.deleteTask(id);
      res.json({ success: true });
    } catch {
      res.status(500).json({ error: 'Failed to delete task' });
    }
  }
}

export const taskController = new TaskController();
