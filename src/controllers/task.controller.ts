import { Request, Response } from 'express';
import { taskService } from '../services/task.service';

// controller class for handling API requests
export class TaskController {

  // create new task
  async create(req: Request, res: Response) {
    try {
      // delegate
      const task = await taskService.createTask(req.body);
      res.json(task);
    } catch (error) {
      // fails
      res.status(500).json({ error: 'Failed to create task' });
    }
  }

  // get all tasks
  async getAll(_: Request, res: Response) {
    try {
      // via service
      const tasks = await taskService.getAllTasks();
      res.json(tasks);
    } catch {
      // fails
      res.status(500).json({ error: 'Failed to fetch tasks' });
    }
  }

  // get current task by id
  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      // via service
      const task = await taskService.getTaskById(id);

      // empty
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }

      res.json(task);
    } catch {
      // fails
      res.status(500).json({ error: 'Failed to fetch task' });
    }
  }

  // update current task by id
  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      // delegate
      const task = await taskService.updateTask(id, req.body);
      res.json(task);
    } catch {
      // fails
      res.status(500).json({ error: 'Failed to update task' });
    }
  }

  // delete current task by id
  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      // delegate
      await taskService.deleteTask(id);
      res.json({ success: true });
    } catch {
      // fails
      res.status(500).json({ error: 'Failed to delete task' });
    }
  }
}

// to use in routes
export const taskController = new TaskController();
