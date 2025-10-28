import React from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import { Status } from '../types';
import TaskCard from '../components/TaskCard';
import StatCard from '../components/StatCard';
import { PlusCircleIcon, CheckCircleIcon, ClockIcon, SpinnerIcon } from '../components/Icons';

const DashboardPage: React.FC = () => {
  const { tasks, loading } = useTasks();

  const completedTasks = tasks.filter(t => t.status === Status.Completed).length;
  const pendingTasks = tasks.filter(t => t.status === Status.Pending).length;
  const inProgressTasks = tasks.filter(t => t.status === Status.InProgress).length;
  const totalTasks = tasks.length;

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <h2 className="text-2xl font-semibold text-white">Dashboard</h2>
        <Link 
            to="/task/new" 
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-hover shadow-sm"
        >
          <PlusCircleIcon className="w-5 h-5" />
          <span>Add New Task</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Tasks" value={totalTasks} icon={<PlusCircleIcon className="w-6 h-6 text-primary" />} color="bg-primary/10" />
        <StatCard title="Completed" value={completedTasks} icon={<CheckCircleIcon className="w-6 h-6 text-green-500" />} color="bg-green-500/10" />
        <StatCard title="In Progress" value={inProgressTasks} icon={<SpinnerIcon className="w-6 h-6 text-purple-500" />} color="bg-purple-500/10" />
        <StatCard title="Pending" value={pendingTasks} icon={<ClockIcon className="w-6 h-6 text-amber-500" />} color="bg-amber-500/10" />
      </div>
      
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Recent Tasks</h3>
        {loading ? (
           <div className="flex justify-center items-center h-64">
             <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-primary"></div>
           </div>
        ) : tasks.length > 0 ? (
          <div className="space-y-4">
            {tasks.slice(0, 5).map(task => <TaskCard key={task.id} task={task} />)}
          </div>
        ) : (
          <div className="text-center py-16 px-6 bg-slate-800 rounded-lg border border-slate-700/50">
              <h3 className="text-xl font-medium text-slate-300">No tasks yet!</h3>
              <p className="text-slate-500 mt-2">Click "Add New Task" to get started.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default DashboardPage;