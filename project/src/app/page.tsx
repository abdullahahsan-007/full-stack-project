'use client';

import Navbar from '../components/page.jsx';
import TaskList from '../components/TaskList.jsx';
import { useTaskContext } from '@/context/TaskContext';
import { useState } from 'react';

export default function Page() {
  const { addTask, deleteAllTasks, tasks } = useTaskContext();
  const [taskInput, setTaskInput] = useState('');

  const handleAdd = () => {
    if (taskInput.trim()) {
      addTask(taskInput);
      setTaskInput('');
    }
  };

  const handleDeleteAll = () => {
    if (tasks.length > 0 && confirm('Are you sure you want to delete all tasks?')) {
      deleteAllTasks();
    }
  };

  return (
    <>
      <Navbar />

      <section className="w-screen min-h-screen bg-black flex flex-col items-center justify-start p-10">
        <h1 className="text-4xl font-bold text-cyan-400 mb-10">Add Task</h1>

        <div className="flex flex-col md:flex-row gap-8 bg-black border border-gray-700 rounded-lg p-8 w-full max-w-3xl">
          
          <div className="flex flex-col gap-4 md:w-1/2">
            <label htmlFor="task" className="text-white font-medium">
              Task
            </label>
            <input
              type="text"
              id="task"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
              placeholder="Enter task"
              className="border border-gray-600 bg-black text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-400 placeholder-gray-500 transition"
            />
          </div>

          <div className="flex md:w-1/2 gap-4 items-center justify-center">
            <button 
              onClick={handleAdd}
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2 rounded-2xl transition"
            >
              Add
            </button>
            <button 
              onClick={handleDeleteAll}
              disabled={tasks.length === 0}
              className="bg-red-600 hover:bg-red-400 text-white px-6 py-2 rounded-2xl transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete All
            </button>
          </div>
        </div>

        
        <TaskList />
      </section>
    </>
  );
}
