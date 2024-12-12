import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Priority, Status } from '../types/todo';

interface BulkTodoFormProps {
  onSubmit: (todos: Array<{
    title: string;
    description: string;
    dueDate: string;
    priority: Priority;
    status: Status;
    category: string;
  }>) => void;
  categories: { id: string; name: string }[];
  onClose: () => void;
}

export const BulkTodoForm: React.FC<BulkTodoFormProps> = ({ onSubmit, categories, onClose }) => {
  const [tasks, setTasks] = useState([{
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium' as Priority,
    status: 'incomplete' as Status,
    category: categories[0]?.id
  }]);

  const addTask = () => {
    setTasks([...tasks, {
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      status: 'incomplete',
      category: categories[0]?.id
    }]);
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const updateTask = (index: number, field: string, value: string) => {
    setTasks(tasks.map((task, i) => 
      i === index ? { ...task, [field]: value } : task
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(tasks);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Bulk Add Tasks</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {tasks.map((task, index) => (
              <div key={index} className="p-4 border rounded-lg relative">
                <button
                  type="button"
                  onClick={() => removeTask(index)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      required
                      value={task.title}
                      onChange={(e) => updateTask(index, 'title', e.target.value)}
                      className="w-full border-gray-300 rounded-md"
                      placeholder="Task title"
                    />
                  </div>

                  <div>
                    <input
                      type="date"
                      required
                      value={task.dueDate}
                      onChange={(e) => updateTask(index, 'dueDate', e.target.value)}
                      className="w-full border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <select
                      value={task.priority}
                      onChange={(e) => updateTask(index, 'priority', e.target.value)}
                      className="w-full border-gray-300 rounded-md"
                    >
                      <option value="high">High Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="low">Low Priority</option>
                    </select>
                  </div>

                  <div>
                    <select
                      value={task.category}
                      onChange={(e) => updateTask(index, 'category', e.target.value)}
                      className="w-full border-gray-300 rounded-md"
                    >
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={addTask}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Another Task
              </button>

              <button
                type="submit"
                className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create All Tasks
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};