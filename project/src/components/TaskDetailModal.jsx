'use client';

import { useState } from 'react';
import { useTaskContext } from '@/context/TaskContext';
import { X, Edit, Save, Trash2 } from 'lucide-react';

export default function TaskDetailModal({ task, isOpen, onClose }) {
  const { updateTask, deleteTask } = useTaskContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description || '',
    priority: task.priority,
    category: task.category,
    tags: task.tags?.join(', ') || '',
    dueDate: task.dueDate || '',
    recurring: task.recurring || '',
  });

  const handleSave = async () => {
    const updates = {
      title: formData.title,
      description: formData.description,
      priority: formData.priority,
      category: formData.category,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()) : [],
      dueDate: formData.dueDate || null,
      recurring: formData.recurring || null,
    };

    await updateTask(task.id, updates);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this task?')) {
      await deleteTask(task.id);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        
        <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            {isEditing ? (
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="flex-1 text-xl sm:text-2xl font-bold bg-transparent border-b-2 border-black dark:border-white text-gray-900 dark:text-white focus:outline-none"
              />
            ) : (
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{task.title}</h2>
            )}
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 ml-4">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
          
          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            {isEditing ? (
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows="4"
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 sm:px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 text-sm sm:text-base"
              />
            ) : (
              <p className="text-gray-600 dark:text-gray-400">{task.description || 'No description'}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Priority
              </label>
              {isEditing ? (
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              ) : (
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                  task.priority === 'high' ? 'bg-red-500 text-white' :
                  task.priority === 'medium' ? 'bg-yellow-500 text-white' :
                  'bg-green-500 text-white'
                }`}>
                  {task.priority}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              {isEditing ? (
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base"
                >
                  <option value="general">General</option>
                  <option value="work">Work</option>
                  <option value="personal">Personal</option>
                  <option value="urgent">Urgent</option>
                  <option value="shopping">Shopping</option>
                </select>
              ) : (
                <span className="text-gray-600 dark:text-gray-400 capitalize">{task.category}</span>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Due Date
              </label>
              {isEditing ? (
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base"
                />
              ) : (
                <span className="text-gray-600 dark:text-gray-400">
                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'Not set'}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Recurring
              </label>
              {isEditing ? (
                <select
                  value={formData.recurring}
                  onChange={(e) => setFormData({ ...formData, recurring: e.target.value })}
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base"
                >
                  <option value="">None</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              ) : (
                <span className="text-gray-600 dark:text-gray-400 capitalize">
                  {task.recurring || 'None'}
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            {isEditing ? (
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base"
                placeholder="comma-separated tags"
              />
            ) : (
              <div className="flex flex-wrap gap-2">
                {task.tags && task.tags.length > 0 ? (
                  task.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-500">No tags</span>
                )}
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-3">Task History</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {task.history && task.history.length > 0 ? (
                task.history.map((entry, index) => (
                  <div key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-start gap-2">
                    <span className="text-black dark:text-white">•</span>
                    <div>
                      <span className="font-medium">{entry.action}</span>
                      {entry.changes && <span> ({entry.changes.join(', ')})</span>}
                      {entry.from && entry.to && <span> from {entry.from} to {entry.to}</span>}
                      <div className="text-xs text-gray-500">
                        {new Date(entry.timestamp).toLocaleString()} - {entry.user}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No history available</p>
              )}
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-500 text-white px-4 sm:px-6 py-2 rounded-lg transition text-sm sm:text-base flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Delete Task
          </button>

          <div className="flex flex-col sm:flex-row gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 sm:px-6 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 px-4 sm:px-6 py-2 rounded-lg transition text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 px-4 sm:px-6 py-2 rounded-lg transition text-sm sm:text-base flex items-center justify-center gap-2"
              >
                Edit Task
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
