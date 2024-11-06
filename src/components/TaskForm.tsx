import { PlusCircle, Clock, Tag } from 'lucide-react';
import { useState } from 'react';
import { Priority, TaskCategory } from '../types';

interface TaskFormProps {
  onSubmit: (task: {
    title: string;
    description: string;
    priority: Priority;
    category: TaskCategory;
    reminder?: Date;
  }) => void;
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState<TaskCategory>('personal');
  const [reminder, setReminder] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      priority,
      category,
      reminder: reminder ? new Date(reminder) : undefined,
    });
    setTitle('');
    setDescription('');
    setPriority('medium');
    setCategory('personal');
    setReminder('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          rows={3}
        />

        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <label className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <Tag className="h-4 w-4" /> Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as Priority)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <Tag className="h-4 w-4" /> Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as TaskCategory)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="home">Home</option>
              <option value="shopping">Shopping</option>
              <option value="health">Health</option>
            </select>
          </div>

          <div className="flex-1 min-w-[200px]">
            <label className="flex items-center gap-2 text-sm text-gray-600 mb-1">
              <Clock className="h-4 w-4" /> Reminder
            </label>
            <input
              type="datetime-local"
              value={reminder}
              onChange={(e) => setReminder(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 flex items-center justify-center gap-2"
        >
          <PlusCircle className="h-5 w-5" />
          Add Task
        </button>
      </div>
    </form>
  );
}