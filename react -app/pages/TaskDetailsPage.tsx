
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import { Task, Priority, Status } from '../types';
import { ClockIcon, EditIcon, DeleteIcon } from '../components/Icons';

const priorityClasses = {
  [Priority.High]: 'text-red-400 bg-red-500/10',
  [Priority.Medium]: 'text-amber-400 bg-amber-500/10',
  [Priority.Low]: 'text-sky-400 bg-sky-500/10',
};

const statusClasses = {
  [Status.Completed]: 'text-green-400 bg-green-500/10',
  [Status.InProgress]: 'text-purple-400 bg-purple-500/10',
  [Status.Pending]: 'text-slate-400 bg-slate-500/10',
};


const TaskDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTaskById, deleteTask, loading } = useTasks();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    if (id && !loading) {
      const foundTask = getTaskById(id);
      if (foundTask) {
        setTask(foundTask);
      } else {
        navigate('/404');
      }
    }
  }, [id, getTaskById, navigate, loading]);

  const handleDelete = async () => {
    if (task && window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      await deleteTask(task.id);
      navigate('/dashboard');
    }
  };

  if (!task || loading) {
    return (
        <div className="flex items-center justify-center h-64">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
        </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-slate-800 p-8 rounded-lg border border-slate-700/50">
      <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-4">
        <h1 className="text-3xl font-bold text-white break-words flex-1">{task.title}</h1>
        <div className="flex items-center gap-2 self-start sm:self-auto whitespace-nowrap">
          <Link to={`/task/edit/${task.id}`} className="flex items-center justify-center gap-2 bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
              <EditIcon className="w-5 h-5"/>
              <span>Edit</span>
          </Link>
          <button onClick={handleDelete} className="flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">
              <DeleteIcon className="w-5 h-5"/>
              <span>Delete</span>
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 text-sm text-slate-400">
        <div className="flex items-center gap-1.5">
          <ClockIcon className="w-4 h-4" />
          <span>Created on {task.createdAt}</span>
        </div>
        <div className="flex items-center gap-4">
            <span className={`px-3 py-1 font-semibold rounded-full ${priorityClasses[task.priority]}`}>{task.priority} Priority</span>
            <span className={`px-3 py-1 font-semibold rounded-full ${statusClasses[task.status]}`}>{task.status}</span>
        </div>
      </div>
      
      <div className="prose prose-invert max-w-none prose-p:text-slate-300">
        <h2 className="text-lg font-semibold text-slate-200 mb-2 border-b border-slate-700 pb-2">Description</h2>
        <p className="whitespace-pre-wrap">{task.description}</p>
      </div>

       <div className="mt-8 text-right">
        <Link to="/dashboard" className="text-primary hover:underline font-medium">
          &larr; Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
