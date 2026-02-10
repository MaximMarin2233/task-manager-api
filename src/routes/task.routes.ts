import { Router } from 'express';
import { taskController } from '../controllers/task.controller';

const router = Router();

// CRUD routes
router.post('/', taskController.create.bind(taskController)); // create new task
router.get('/', taskController.getAll.bind(taskController)); // get all tasks
router.get('/:id', taskController.getById.bind(taskController)); // get current task
router.patch('/:id', taskController.update.bind(taskController)); // update current task
router.delete('/:id', taskController.delete.bind(taskController)); // delete current task

export default router;
