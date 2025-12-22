'use client';

import { createContext, useState, useEffect, useContext } from 'react';

const TaskContext = createContext();

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length >= 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Add new task
  const addTask = (taskText) => {
    if (!taskText.trim()) return;
    
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    
    setTasks([...tasks, newTask]);
  };

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    if (editingTask?.id === id) {
      setEditingTask(null);
    }
  };

  // Update task
  const updateTask = (id, newText) => {
    if (!newText.trim()) return;
    
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text: newText } : task
    ));
    setEditingTask(null);
  };

  // Toggle task completion
  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Delete all tasks
  const deleteAllTasks = () => {
    setTasks([]);
    setEditingTask(null);
  };

  const value = {
    tasks,
    editingTask,
    setEditingTask,
    addTask,
    deleteTask,
    updateTask,
    toggleComplete,
    deleteAllTasks,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};
