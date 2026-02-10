import { fork } from 'child_process';
import path from 'path';
import { prisma } from '../utils/prisma';
import { taskEvents } from '../events/task.events';

export class TaskProcessor {
  async processTask(taskId: number) {
    const task = await prisma.task.findUnique({ where: { id: taskId } });

    if (!task) return;

    // status change
    await prisma.task.update({
      where: { id: taskId },
      data: { status: 'processing' },
    });

    taskEvents.emit('task:processing', taskId);

    const workerPath = path.join(__dirname, '../workers/task.worker.ts');

    const worker = fork(workerPath, [], {
      execArgv: ['-r', 'ts-node/register'],
    });

    worker.send(task);

    worker.on('message', async (message: any) => {
      if (message.success) {
        await prisma.task.update({
          where: { id: taskId },
          data: {
            status: 'completed',
            processedAt: new Date(),
            result: message.result,
          },
        });

        taskEvents.emit('task:completed', taskId);
      } else {
        await prisma.task.update({
          where: { id: taskId },
          data: { status: 'failed' },
        });

        taskEvents.emit('task:failed', taskId);
      }

      worker.kill();
    });
  }
}

export const taskProcessor = new TaskProcessor();
