'use client';

import { useState } from 'react';
import { useTaskContext } from '@/context/TaskContext';
import TaskCard from './TaskCard';
import AddTaskModal from './AddTaskModal';
import { ListTodo, Zap, Clock, CheckCircle2, Plus } from 'lucide-react';

export default function KanbanBoard() {
  const { getTasksByStatus } = useTaskContext();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('todo');

  const columns = [
    { id: 'todo', title: 'To Do', color: 'bg-gray-600', icon: ListTodo },
    { id: 'inprogress', title: 'In Progress', color: 'bg-gray-700', icon: Zap },
    { id: 'pending', title: 'Pending', color: 'bg-gray-500', icon: Clock },
    { id: 'done', title: 'Done', color: 'bg-black dark:bg-white dark:text-black', icon: CheckCircle2 },
  ];

  const handleAddTask = (status) => {
    setSelectedStatus(status);
    setShowAddModal(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {columns.map((column) => {
          const tasks = getTasksByStatus(column.id);
          
          return (
            <div key={column.id} className="flex flex-col">
              <div className="mb-4">
                <div className={`${column.color} text-white px-3 sm:px-4 py-2 sm:py-3 rounded-t-lg flex items-center justify-between`}>
                  <div className="flex items-center gap-2">
                    <column.icon className="w-5 h-5" />
                    <h3 className="font-bold text-base sm:text-lg">{column.title}</h3>
                  </div>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-sm font-semibold">
                    {tasks.length}
                  </span>
                </div>
              </div>

              <div className="flex-1 bg-gray-50 dark:bg-gray-900 rounded-lg p-3 sm:p-4 min-h-[400px] sm:min-h-[500px] space-y-3 border border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => handleAddTask(column.id)}
                  className="w-full border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white py-3 rounded-lg transition flex items-center justify-center gap-2 font-medium"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Task</span>
                </button>

                {tasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}

                {tasks.length === 0 && (
                  <div className="text-center text-gray-400 dark:text-gray-500 py-6 sm:py-8 text-sm sm:text-base">
                    <p>No tasks yet</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {showAddModal && (
        <AddTaskModal 
          isOpen={showAddModal} 
          onClose={() => setShowAddModal(false)}
          defaultStatus={selectedStatus}
        />
      )}
    </>
  );
}

