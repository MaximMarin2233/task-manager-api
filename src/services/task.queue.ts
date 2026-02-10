import { taskProcessor } from './task.processor';
import { taskEvents } from '../events/task.events';

interface QueueTask {
  id: number;
}

export class TaskQueue {
  private queue: QueueTask[] = [];
  private running: number = 0;
  private concurrency: number;

  constructor(concurrency: number = 3) {
    this.concurrency = concurrency;
  }

  add(task: QueueTask) {
    this.queue.push(task);
    this.runNext();
  }

  private runNext() {
    if (this.running >= this.concurrency) return;
    const task = this.queue.shift();
    if (!task) return;

    this.running++;
    taskEvents.emit('task:queued', task.id);

    taskProcessor.processTask(task.id).then(() => {
      this.running--;
      this.runNext();
    }).catch(() => {
      this.running--;
      this.runNext();
    });
  }
}

export const taskQueue = new TaskQueue(5); // 5 tasks (example)
