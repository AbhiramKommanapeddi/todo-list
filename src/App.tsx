import React, { useState } from 'react';
import { Search, SlidersHorizontal, Plus } from 'lucide-react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { BulkTodoForm } from './components/BulkTodoForm';
import { useTodos } from './hooks/useTodos';
import { storage } from './utils/storage';
import { Todo, Status } from './types/todo';

function App() {
  const {
    todos,
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
  } = useTodos();

  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showBulkAdd, setShowBulkAdd] = useState(false);
  const categories = storage.getCategories();

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
  };

  const handleUpdateTodo = (updates: Partial<Todo>) => {
    if (editingTodo) {
      updateTodo(editingTodo.id, updates);
      setEditingTodo(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Task Manager</h1>
          <p className="text-lg text-gray-600">
            Organize your tasks efficiently and stay productive
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="relative flex-1 max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-lg shadow-sm"
                placeholder="Search tasks..."
              />
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => setShowBulkAdd(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Plus className="h-5 w-5 mr-2" />
                Bulk Add
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="p-2 text-gray-400 hover:text-gray-500 bg-white rounded-md shadow-sm"
              >
                <SlidersHorizontal className="h-5 w-5" />
              </button>
            </div>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as Status)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
              >
                <option value="">All Statuses</option>
                <option value="incomplete">Incomplete</option>
                <option value="in-progress">In Progress</option>
                <option value="complete">Complete</option>
                <option value="hold">On Hold</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md shadow-sm"
              >
                <option value="dueDate">Sort by Due Date</option>
                <option value="priority">Sort by Priority</option>
                <option value="status">Sort by Status</option>
              </select>
            </div>
          )}
        </div>

        {editingTodo ? (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
            <TodoForm
              onSubmit={handleUpdateTodo}
              categories={categories}
              initialValues={editingTodo}
            />
          </div>
        ) : (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Add New Task</h2>
            <TodoForm onSubmit={addTodo} categories={categories} />
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold mb-4">Tasks</h2>
          <TodoList
            todos={todos}
            onDelete={deleteTodo}
            onEdit={handleEditTodo}
            onStatusChange={(id, status) => updateTodo(id, { status })}
          />
        </div>

        {showBulkAdd && (
          <BulkTodoForm
            onSubmit={addBulkTodos}
            categories={categories}
            onClose={() => setShowBulkAdd(false)}
          />
        )}
      </div>
    </div>
  );
}

export default App;