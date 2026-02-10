import { Router } from 'express';
import { taskController } from '../controllers/task.controller';

const router = Router();

router.post('/', taskController.create.bind(taskController));
router.get('/', taskController.getAll.bind(taskController));
router.get('/:id', taskController.getById.bind(taskController));
router.patch('/:id', taskController.update.bind(taskController));
router.delete('/:id', taskController.delete.bind(taskController));

export default router;
