'use client';

import { useState } from 'react';
import { useTaskContext } from '@/context/TaskContext';
import TaskDetailModal from './TaskDetailModal';
import { ListTodo, Zap, Clock, CheckCircle2, Calendar, Trash2, MoveRight } from 'lucide-react';

export default function TaskCard({ task }) {
  const { deleteTask, updateTaskStatus } = useTaskContext();
  const [showDetail, setShowDetail] = useState(false);
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const priorityColors = {
    high: 'bg-red-500',
    medium: 'bg-yellow-500',
    low: 'bg-green-500',
  };

  const categoryColors = {
    work: 'bg-blue-500',
    personal: 'bg-purple-500',
    urgent: 'bg-red-500',
    shopping: 'bg-pink-500',
    general: 'bg-gray-500',
  };

  const statuses = [
    { id: 'todo', label: 'To Do', icon: ListTodo },
    { id: 'inprogress', label: 'In Progress', icon: Zap },
    { id: 'pending', label: 'Pending', icon: Clock },
    { id: 'done', label: 'Done', icon: CheckCircle2 },
  ];

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this task?')) {
      await deleteTask(task.id);
    }
  };

  const handleStatusChange = async (newStatus) => {
    await updateTaskStatus(task.id, newStatus);
    setShowStatusMenu(false);
  };

  return (
    <>
      <div
        onClick={() => setShowDetail(true)}
        className="bg-white dark:bg-gray-800 rounded-lg p-3 sm:p-4 shadow-md hover:shadow-lg transition cursor-pointer border border-gray-200 dark:border-gray-700 relative">
        <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${priorityColors[task.priority]}`} title={`${task.priority} priority`}></div>

        <h4 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-2 pr-4">
          {task.title}
        </h4>

        {task.description && (
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {task.description}
          </p>
        )}

        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {task.tags.map((tag, index) => (
              <span key={index} className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className={`text-xs text-white px-2 py-1 rounded ${categoryColors[task.category]}`}>
            {task.category}
          </span>
          {task.dueDate && (
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(task.dueDate).toLocaleDateString()}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowStatusMenu(!showStatusMenu);
              }}
              className="text-xs text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition flex items-center gap-1"
            >
              <MoveRight className="w-3 h-3" />
              Move
            </button>

            {showStatusMenu && (
              <div className="absolute bottom-full left-0 mb-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10 min-w-[150px]">
                {statuses.filter(s => s.id !== task.status).map((status) => (
                  <button
                    key={status.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusChange(status.id);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center gap-2"
                  >
                    <status.icon className="w-4 h-4" />
                    <span>{status.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={handleDelete}
            className="text-xs text-red-600 hover:text-red-500 transition flex items-center gap-1"
          >
            <Trash2 className="w-3 h-3" />
            Delete
          </button>
        </div>
      </div>

      {showDetail && (
        <TaskDetailModal
          task={task}
          isOpen={showDetail}
          onClose={() => setShowDetail(false)}
        />
      )}
    </>
  );
}
