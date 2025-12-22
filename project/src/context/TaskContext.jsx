'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import { db } from '@/lib/firebase';
import { useAuth } from './AuthContext';
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc,
  query,
  where,
  orderBy,
  Timestamp 
} from 'firebase/firestore';

const TaskContext = createContext();

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  // Load tasks from Firestore on mount or when user changes
  useEffect(() => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    const fetchTasks = async () => {
      try {
        const tasksQuery = query(
          collection(db, 'tasks'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(tasksQuery);
        const tasksData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [user]);

  // Add new task to Firestore
  const addTask = async (taskData) => {
    if (!user || !taskData.title?.trim()) return;
    
    try {
      const newTask = {
        userId: user.uid,
        title: taskData.title,
        description: taskData.description || '',
        status: taskData.status || 'todo',
        priority: taskData.priority || 'medium',
        category: taskData.category || 'general',
        tags: taskData.tags || [],
        dueDate: taskData.dueDate || null,
        recurring: taskData.recurring || null,
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        history: [{
          action: 'created',
          timestamp: new Date().toISOString(),
          user: user.displayName || user.email
        }]
      };
      
      const docRef = await addDoc(collection(db, 'tasks'), newTask);
      setTasks([{ id: docRef.id, ...newTask }, ...tasks]);
      return { success: true, id: docRef.id };
    } catch (error) {
      console.error('Error adding task:', error);
      return { success: false, error: error.message };
    }
  };

  // Delete task from Firestore
  const deleteTask = async (id) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
      setTasks(tasks.filter(task => task.id !== id));
      if (editingTask?.id === id) {
        setEditingTask(null);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Update task in Firestore
  const updateTask = async (id, updates) => {
    if (!user) return;
    
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    
    try {
      const updateData = {
        ...updates,
        updatedAt: new Date().toISOString(),
        history: [
          ...(task.history || []),
          {
            action: 'updated',
            changes: Object.keys(updates),
            timestamp: new Date().toISOString(),
            user: user.displayName || user.email
          }
        ]
      };
      
      await updateDoc(doc(db, 'tasks', id), updateData);
      setTasks(tasks.map(t => 
        t.id === id ? { ...t, ...updateData } : t
      ));
      setEditingTask(null);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Update task status (for drag and drop)
  const updateTaskStatus = async (id, newStatus) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      const updateData = {
        status: newStatus,
        updatedAt: new Date().toISOString(),
        history: [
          ...(task.history || []),
          {
            action: 'status_changed',
            from: task.status,
            to: newStatus,
            timestamp: new Date().toISOString(),
            user: user.displayName || user.email
          }
        ]
      };

      await updateDoc(doc(db, 'tasks', id), updateData);
      setTasks(tasks.map(t =>
        t.id === id ? { ...t, ...updateData } : t
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Toggle task completion in Firestore
  const toggleComplete = async (id) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      await updateDoc(doc(db, 'tasks', id), {
        completed: !task.completed
      });
      setTasks(tasks.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      ));
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  // Delete all tasks from Firestore
  const deleteAllTasks = async () => {
    try {
      const deletePromises = tasks.map(task => deleteDoc(doc(db, 'tasks', task.id)));
      await Promise.all(deletePromises);
      setTasks([]);
      setEditingTask(null);
    } catch (error) {
      console.error('Error deleting all tasks:', error);
    }
  };

  // Filter and search tasks
  const getFilteredTasks = () => {
    return tasks.filter(task => {
      // Search filter
      const matchesSearch = task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           task.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Status filter
      const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
      
      // Priority filter
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
      
      // Category filter
      const matchesCategory = filterCategory === 'all' || task.category === filterCategory;
      
      return matchesSearch && matchesStatus && matchesPriority && matchesCategory;
    });
  };

  // Get tasks by status for Kanban board
  const getTasksByStatus = (status) => {
    return getFilteredTasks().filter(task => task.status === status);
  };

  // Get analytics data
  const getAnalytics = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'done').length;
    const inProgress = tasks.filter(t => t.status === 'inprogress').length;
    const todo = tasks.filter(t => t.status === 'todo').length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    
    const byPriority = {
      high: tasks.filter(t => t.priority === 'high').length,
      medium: tasks.filter(t => t.priority === 'medium').length,
      low: tasks.filter(t => t.priority === 'low').length,
    };

    const byCategory = tasks.reduce((acc, task) => {
      acc[task.category] = (acc[task.category] || 0) + 1;
      return acc;
    }, {});

    return { total, completed, inProgress, todo, pending, byPriority, byCategory };
  };

  const value = {
    tasks,
    editingTask,
    setEditingTask,
    addTask,
    deleteTask,
    updateTask,
    updateTaskStatus,
    toggleComplete,
    deleteAllTasks,
    loading,
    searchQuery,
    setSearchQuery,
    filterStatus,
    setFilterStatus,
    filterPriority,
    setFilterPriority,
    filterCategory,
    setFilterCategory,
    getFilteredTasks,
    getTasksByStatus,
    getAnalytics,
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};
