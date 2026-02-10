import { taskProcessor } from './task.processor';
import { taskEvents } from '../events/task.events';

interface QueueTask {
  id: number;
}

export class TaskQueue {
  private queue: QueueTask[] = []; // in memory queue of pending tasks
  private running: number = 0; // number of tasks currently being processed
  private concurrency: number; // maximum number of tasks to run in parallel

  constructor(concurrency: number = 3) {
    this.concurrency = concurrency; // default concurrency limit = 3
  }

  // add a new task to the queue
  add(task: QueueTask) {
    this.queue.push(task); // push the task to the in memory queue
    this.runNext(); // try to process the next task immediately
  }

  // process next task in the queue if concurrency limit allows
  private runNext() {
    // stop if max concurrency reached
    if (this.running >= this.concurrency) return;
    // take the next task from the queue
    const task = this.queue.shift();
    if (!task) return;

    this.running++; // increment running counter
    taskEvents.emit('task:queued', task.id); // emit event: task queued

    // process the task for async
    taskProcessor.processTask(task.id).then(() => {
      // success
      this.running--;
      this.runNext();
    }).catch(() => {
      // fails
      this.running--;
      this.runNext();
    });
  }
}

export const taskQueue = new TaskQueue(5); // 5 tasks (example)
