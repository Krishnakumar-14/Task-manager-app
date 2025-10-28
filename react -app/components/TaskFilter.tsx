
import React from 'react';
import { Priority, Status } from '../types';

interface TaskFilterProps {
  onSearchChange: (query: string) => void;
  onStatusChange: (status: string) => void;
  onPriorityChange: (priority: string) => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({ onSearchChange, onStatusChange, onPriorityChange }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-6 flex flex-col md:flex-row items-center gap-4">
      <div className="relative flex-grow w-full md:w-auto">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
            <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search tasks by title"
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <div className="flex gap-4 w-full md:w-auto">
        <select
          onChange={(e) => onStatusChange(e.target.value)}
          className="w-full md:w-40 px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">All Statuses</option>
          {Object.values(Status).map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <select
          onChange={(e) => onPriorityChange(e.target.value)}
          className="w-full md:w-40 px-4 py-2 text-gray-700 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">All Priorities</option>
          {Object.values(Priority).map(p => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
    </div>
  );
};

export default TaskFilter;
