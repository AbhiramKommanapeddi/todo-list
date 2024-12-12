import { Todo, Category } from '../types/todo';

const TODOS_KEY = 'todos';
const CATEGORIES_KEY = 'categories';

export const storage = {
  getTodos: (): Todo[] => {
    const todos = localStorage.getItem(TODOS_KEY);
    return todos ? JSON.parse(todos) : [];
  },

  setTodos: (todos: Todo[]) => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
  },

  getCategories: (): Category[] => {
    const categories = localStorage.getItem(CATEGORIES_KEY);
    return categories ? JSON.parse(categories) : [
      { id: '1', name: 'Personal', color: '#3B82F6' },
      { id: '2', name: 'Work', color: '#EF4444' },
      { id: '3', name: 'Shopping', color: '#10B981' }
    ];
  },

  setCategories: (categories: Category[]) => {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  }
};