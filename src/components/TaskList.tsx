import { CheckCircle2, Clock, Tag, Trash2 } from 'lucide-react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export default function TaskList({ tasks, onToggleComplete, onDelete }: TaskListProps) {
  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getCategoryColor = (category: Task['category']) => {
    switch (category) {
      case 'work': return 'bg-blue-100 text-blue-800';
      case 'personal': return 'bg-purple-100 text-purple-800';
      case 'home': return 'bg-green-100 text-green-800';
      case 'shopping': return 'bg-yellow-100 text-yellow-800';
      case 'health': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`bg-white rounded-lg shadow-md p-4 transition-all ${
            task.completed ? 'opacity-75' : ''
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onToggleComplete(task.id)}
                  className={`text-2xl ${
                    task.completed ? 'text-green-500' : 'text-gray-300'
                  }`}
                >
                  <CheckCircle2 className="h-6 w-6" />
                </button>
                <div>
                  <h3 className={`text-lg font-medium ${
                    task.completed ? 'line-through text-gray-500' : ''
                  }`}>
                    {task.title}
                  </h3>
                  <p className="text-gray-600 mt-1">{task.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className={`flex items-center gap-1 text-sm ${getPriorityColor(task.priority)}`}>
                  <Tag className="h-4 w-4" />
                  {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                </span>

                <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(task.category)}`}>
                  {task.category.charAt(0).toUpperCase() + task.category.slice(1)}
                </span>

                {task.reminder && (
                  <span className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    {new Date(task.reminder).toLocaleString()}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => onDelete(task.id)}
              className="text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}

      {tasks.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg">No tasks yet. Add one to get started!</p>
        </div>
      )}
    </div>
  );
}