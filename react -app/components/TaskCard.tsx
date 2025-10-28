
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Task, Priority } from '../types';
import { useTasks } from '../hooks/useTasks';
import { EditIcon, DeleteIcon, ClockIcon, MoreVerticalIcon } from './Icons';

interface TaskCardProps {
  task: Task;
}

const priorityClasses = {
  [Priority.High]: 'bg-red-500/10 text-red-400',
  [Priority.Medium]: 'bg-amber-500/10 text-amber-400',
  [Priority.Low]: 'bg-sky-500/10 text-sky-400',
};

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const { deleteTask } = useTasks();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDelete = async () => {
    setMenuOpen(false);
    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      await deleteTask(task.id);
    }
  };

  return (
    <div className="bg-slate-800 p-4 rounded-lg border border-slate-700/50 flex items-center justify-between transition-colors hover:bg-slate-700/50">
        <div className="flex items-center gap-4 overflow-hidden">
            <div>
                <Link to={`/task/${task.id}`} className="font-semibold text-slate-100 hover:text-primary truncate block">{task.title}</Link>
                <div className="flex items-center text-xs text-slate-500 mt-1">
                    <ClockIcon className="w-3 h-3 mr-1.5 flex-shrink-0" />
                    <span>{task.createdAt}</span>
                </div>
            </div>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0 ml-4">
            <span className={`px-3 py-1 text-xs font-bold rounded-full hidden sm:inline-block ${priorityClasses[task.priority]}`}>
                {task.priority}
            </span>

            <div className="relative" ref={menuRef}>
                <button onClick={() => setMenuOpen(!menuOpen)} className="text-slate-500 hover:text-slate-300 p-1 rounded-full" aria-label="Task options">
                    <MoreVerticalIcon className="w-5 h-5" />
                </button>
                {menuOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-slate-700 rounded-md shadow-lg z-10 border border-slate-600">
                        <div className="py-1">
                            <Link to={`/task/edit/${task.id}`} onClick={() => setMenuOpen(false)} className="flex items-center px-4 py-2 text-sm text-slate-200 hover:bg-slate-600">
                                <EditIcon className="w-4 h-4 mr-2" />
                                Edit
                            </Link>
                            <button onClick={handleDelete} className="flex items-center w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-600">
                                <DeleteIcon className="w-4 h-4 mr-2" />
                                Delete
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};

export default TaskCard;
