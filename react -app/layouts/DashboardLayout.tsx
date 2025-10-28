import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { TaskProvider } from '../context/TaskContext';

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <TaskProvider>
      <div className="flex h-screen bg-slate-900">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <div className="flex flex-col flex-1 overflow-y-auto lg:pl-72">
          <Header onMenuClick={() => setIsSidebarOpen(true)} />
          <main className="p-6 md:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </TaskProvider>
  );
};

export default DashboardLayout;