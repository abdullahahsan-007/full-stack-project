'use client';

import { useTaskContext } from '@/context/TaskContext';
import { useState } from 'react';

export default function TaskList() {
  const { tasks, deleteTask, updateTask, toggleComplete, editingTask, setEditingTask } = useTaskContext();
  const [editText, setEditText] = useState('');

  const handleEdit = (task) => {
    setEditingTask(task);
    setEditText(task.text);
  };

  const handleUpdate = (id) => {
    updateTask(id, editText);
    setEditText('');
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
    setEditText('');
  };

  if (tasks.length === 0) {
    return (
      <div className="w-full max-w-3xl mt-8 text-center">
        <p className="text-gray-500 text-lg">No tasks yet. Add your first task above!</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mt-8">
      <h2 className="text-2xl font-bold text-cyan-400 mb-4">Your Tasks ({tasks.length})</h2>
      
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-gray-900 border border-gray-700 rounded-lg p-4 flex items-center justify-between hover:border-cyan-400 transition"
          >
            {editingTask?.id === task.id ? (
              
              
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 border border-gray-600 bg-black text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  autoFocus
                  onKeyPress={(e) => e.key === 'Enter' && handleUpdate(task.id)}
                />
                <button
                  onClick={() => handleUpdate(task.id)}
                  className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-md transition"
                >
                  Save
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-md transition"
                >
                  Cancel
                </button>
              </div>
            ) : (
              
                <>
                <div className="flex items-center gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                    className="w-5 h-5 cursor-pointer accent-cyan-400"
                  />
                  <span
                    className={`text-white text-lg ${
                      task.completed ? 'line-through text-gray-500' : ''
                    }`}
                  >
                    {task.text}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(task)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1 rounded-md transition text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-red-600 hover:bg-red-500 text-white px-4 py-1 rounded-md transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
