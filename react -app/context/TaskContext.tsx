
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import { Task } from '../types';
import { DUMMY_TASKS } from '../constants';
import { AuthContext } from './AuthContext';

interface TaskContextType {
  tasks: Task[];
  getTaskById: (id: string) => Task | undefined;
  addTask: (task: Omit<Task, 'id' | 'createdAt'>) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  loading: boolean;
}

export const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Dummy "database" for tasks, will reset on page reload to simulate fetching.
let tasksDB: Task[] = [...DUMMY_TASKS];

// Dummy API functions
const api = {
  getTasks: async (token: string) => {
    // TODO: Replace with: `fetch('/api/tasks', { headers: { ... } })`
    console.log('API Call: getTasks', { token });
    await new Promise(res => setTimeout(res, 800));
    return [...tasksDB]; // Return a copy
  },
  addTask: async (token: string, taskData: Omit<Task, 'id' | 'createdAt'>) => {
    // TODO: Replace with: `fetch('/api/tasks', { method: 'POST', ..., body: ... })`
    console.log('API Call: addTask', { token, taskData });
    await new Promise(res => setTimeout(res, 500));
    const newTask: Task = {
      ...taskData,
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    tasksDB = [newTask, ...tasksDB];
    return newTask;
  },
  updateTask: async (token: string, updatedTask: Task) => {
    // TODO: Replace with: `fetch('/api/tasks/:id', { method: 'PUT', ..., body: ... })`
    console.log('API Call: updateTask', { token, updatedTask });
    await new Promise(res => setTimeout(res, 500));
    tasksDB = tasksDB.map(task => (task.id === updatedTask.id ? updatedTask : task));
    return updatedTask;
  },
  deleteTask: async (token: string, id: string) => {
    // TODO: Replace with: `fetch('/api/tasks/:id', { method: 'DELETE', ... })`
    console.log('API Call: deleteTask', { token, id });
    await new Promise(res => setTimeout(res, 500));
    tasksDB = tasksDB.filter(task => task.id !== id);
    return { success: true };
  },
};

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchTasks = async () => {
      const token = localStorage.getItem('authToken');
      if (authContext?.isAuthenticated && token) {
        setLoading(true);
        try {
          const fetchedTasks = await api.getTasks(token);
          setTasks(fetchedTasks);
        } catch (error) {
          console.error('Failed to fetch tasks', error);
        } finally {
          setLoading(false);
        }
      } else if (!authContext?.loading) {
          setLoading(false);
      }
    };

    if (authContext) fetchTasks();
  }, [authContext]);

  const getTaskById = (id: string) => {
    return tasks.find(task => task.id === id);
  };

  const addTask = async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    try {
      const newTask = await api.addTask(token, taskData);
      setTasks(prevTasks => [newTask, ...prevTasks]);
    } catch(error) {
        console.error("Failed to add task", error);
    }
  };

  const updateTask = async (updatedTaskData: Task) => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    try {
        const updatedTask = await api.updateTask(token, updatedTaskData);
        setTasks(prevTasks => prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    } catch(error) {
        console.error("Failed to update task", error);
    }
  };

  const deleteTask = async (id: string) => {
    const token = localStorage.getItem('authToken');
    if (!token) return;
    try {
        await api.deleteTask(token, id);
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    } catch(error) {
        console.error("Failed to delete task", error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, getTaskById, addTask, updateTask, deleteTask, loading }}>
      {children}
    </TaskContext.Provider>
  );
};
