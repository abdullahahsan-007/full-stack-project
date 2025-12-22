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


  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);


  useEffect(() => {
    if (tasks.length >= 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);


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


  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    if (editingTask?.id === id) {
      setEditingTask(null);
    }
  };


  const updateTask = (id, newText) => {
    if (!newText.trim()) return;
    
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, text: newText } : task
    ));
    setEditingTask(null);
  };


  const toggleComplete = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };


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
