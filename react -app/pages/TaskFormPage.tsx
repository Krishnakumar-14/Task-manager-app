
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import { Task, Priority, Status } from '../types';

const TaskFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getTaskById, addTask, updateTask } = useTasks();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>(Priority.Medium);
  const [status, setStatus] = useState<Status>(Status.Pending);
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      const task = getTaskById(id);
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
        setPriority(task.priority);
        setStatus(task.status);
        setIsEditing(true);
      } else {
        // This might happen if the user navigates directly to an edit URL before tasks are loaded.
        // A better approach would be to fetch the task here. For now, we redirect.
        console.warn(`Task with id ${id} not found.`);
        // navigate('/404');
      }
    }
  }, [id, getTaskById, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const taskData = { title, description, priority, status };

    if (isEditing && id) {
      const existingTask = getTaskById(id);
      if (existingTask) {
        await updateTask({ ...taskData, id, createdAt: existingTask.createdAt });
      }
    } else {
      await addTask(taskData);
    }
    // No need to setSubmitting(false) as we are navigating away.
    navigate('/dashboard');
  };

  return (
    <div className="max-w-2xl mx-auto bg-slate-800 p-8 rounded-lg border border-slate-700/50">
      <h2 className="text-2xl font-bold text-white mb-6">{isEditing ? 'Edit Task' : 'Create New Task'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-slate-300 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="appearance-none border border-slate-600 bg-slate-700 rounded-lg w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        <div className="mb-4">
          <label className="block text-slate-300 text-sm font-bold mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
            className="appearance-none border border-slate-600 bg-slate-700 rounded-lg w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
                <label className="block text-slate-300 text-sm font-bold mb-2" htmlFor="priority">Priority</label>
                <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value as Priority)} className="appearance-none border border-slate-600 bg-slate-700 rounded-lg w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
                    {Object.values(Priority).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
            </div>
            <div>
                <label className="block text-slate-300 text-sm font-bold mb-2" htmlFor="status">Status</label>
                <select id="status" value={status} onChange={(e) => setStatus(e.target.value as Status)} className="appearance-none border border-slate-600 bg-slate-700 rounded-lg w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
                    {Object.values(Status).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
            </div>
        </div>
        
        <div className="flex items-center justify-end gap-4">
            <button type="button" onClick={() => navigate('/dashboard')} className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline">Cancel</button>
            <button type="submit" disabled={submitting} className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-36 flex justify-center items-center disabled:opacity-50">
              {submitting ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : (isEditing ? 'Save Changes' : 'Create Task')}
            </button>
        </div>
      </form>
    </div>
  );
};

export default TaskFormPage;
