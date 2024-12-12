import React from 'react';
import { Check, Clock, Edit2, Flag, Trash2, AlertCircle } from 'lucide-react';
import { Todo, Priority, Status } from '../types/todo';
import { colors } from '../utils/colors';

interface TodoListProps {
  todos: Todo[];
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onStatusChange: (id: string, status: Status) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onDelete,
  onEdit,
  onStatusChange,
}) => {
  return (
    <div className="space-y-4">
      {todos.map((todo) => {
        const priorityColors = colors.priority[todo.priority];
        const statusColors = colors.status[todo.status];
        const dueDateColors = colors.getDueDateColor(todo.dueDate);

        return (
          <div
            key={todo.id}
            className="rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
            style={{ borderLeft: `4px solid ${priorityColors.border}` }}
          >
            <div className="bg-white p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => {
                      const nextStatus: Record<Status, Status> = {
                        incomplete: 'in-progress',
                        'in-progress': 'complete',
                        complete: 'hold',
                        hold: 'incomplete',
                      };
                      onStatusChange(todo.id, nextStatus[todo.status]);
                    }}
                    className="p-2 rounded-full hover:bg-gray-100"
                    style={{ backgroundColor: statusColors.bg }}
                  >
                    {getStatusIcon(todo.status)}
                  </button>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{todo.title}</h3>
                    {todo.description && (
                      <p className="text-sm text-gray-500">{todo.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{
                      backgroundColor: priorityColors.bg,
                      color: priorityColors.text
                    }}
                  >
                    {todo.priority}
                  </span>
                  <button
                    onClick={() => onEdit(todo)}
                    className="p-2 text-gray-400 hover:text-gray-500"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDelete(todo.id)}
                    className="p-2 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span
                  className="px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: dueDateColors.bg,
                    color: dueDateColors.text
                  }}
                >
                  Due: {new Date(todo.dueDate).toLocaleDateString()}
                </span>
                <span
                  className="px-2 py-1 rounded-full"
                  style={{
                    backgroundColor: statusColors.bg,
                    color: statusColors.text
                  }}
                >
                  {todo.status}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const getStatusIcon = (status: Status) => {
  switch (status) {
    case 'complete':
      return <Check className="h-5 w-5 text-green-600" />;
    case 'in-progress':
      return <Clock className="h-5 w-5 text-blue-600" />;
    case 'hold':
      return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    default:
      return <Clock className="h-5 w-5 text-gray-400" />;
  }
};