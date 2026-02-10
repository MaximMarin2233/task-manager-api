export type TaskStatus =
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed';

export interface CreateTaskDto {
  type: string;
  payload: object;
  priority: number;
}
