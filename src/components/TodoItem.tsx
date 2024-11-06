import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle, onDelete }: TodoItemProps) => {
  return (
    <div className="group flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg mb-2 hover:shadow-md transition-all duration-200">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onToggle(todo.id)}
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${
            todo.completed ? 'bg-black border-black' : 'border-gray-400 hover:border-black'
          }`}
        >
          {todo.completed && <Check size={14} className="text-white" />}
        </button>
        <span className={`${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
          {todo.title}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-500 transition-opacity duration-200"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
};