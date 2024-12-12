export type Priority = 'high' | 'medium' | 'low';
export type Status = 'incomplete' | 'complete' | 'in-progress' | 'hold';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  dueDate: string;
  priority: Priority;
  status: Status;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}