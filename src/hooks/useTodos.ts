import { useState, useEffect } from 'react';
import { Todo, Priority, Status } from '../types/todo';
import { storage } from '../utils/storage';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(storage.getTodos());
  const [filter, setFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status | ''>('');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'status'>('dueDate');

  useEffect(() => {
    storage.setTodos(todos);
  }, [todos]);

  const addTodo = (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTodo: Todo = {
      ...todo,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTodos([...todos, newTodo]);
  };

  const addBulkTodos = (newTodos: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>[]) => {
    const createdTodos = newTodos.map(todo => ({
      ...todo,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));
    setTodos([...todos, ...createdTodos]);
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos(todos.map(todo => 
      todo.id === id 
        ? { ...todo, ...updates, updatedAt: new Date().toISOString() }
        : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredAndSortedTodos = todos
    .filter(todo => {
      const matchesSearch = todo.title.toLowerCase().includes(filter.toLowerCase());
      const matchesCategory = !categoryFilter || todo.category === categoryFilter;
      const matchesStatus = !statusFilter || todo.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'dueDate') {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      if (sortBy === 'priority') {
        const priorityOrder: Record<Priority, number> = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      const statusOrder: Record<Status, number> = { 
        'in-progress': 0, 
        incomplete: 1, 
        hold: 2, 
        complete: 3 
      };
      return statusOrder[a.status] - statusOrder[b.status];
    });

  return {
    todos: filteredAndSortedTodos,
    addTodo,
    addBulkTodos,
    updateTodo,
    deleteTodo,
    filter,
    setFilter,
    categoryFilter,
    setCategoryFilter,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
  };
};