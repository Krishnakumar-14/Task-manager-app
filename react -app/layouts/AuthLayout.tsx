import React from 'react';
import { Outlet } from 'react-router-dom';
import { TaskIcon } from '../components/Icons';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 p-4">
       <div className="flex items-center mb-6">
        <TaskIcon className="w-10 h-10 text-primary" />
        <h1 className="text-3xl font-bold text-white ml-3">DayTask</h1>
      </div>
      <div className="w-full max-w-md bg-slate-800 rounded-lg shadow-2xl p-8 border border-slate-700/50">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;