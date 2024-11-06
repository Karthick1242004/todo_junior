export type Priority = 'high' | 'medium' | 'low';
export type TaskCategory = 'work' | 'personal' | 'home' | 'shopping' | 'health';

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  category: TaskCategory;
  completed: boolean;
  reminder?: Date;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
}