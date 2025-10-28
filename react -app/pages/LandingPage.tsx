import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TaskIcon, CheckCircleIcon, MenuIcon, XIcon } from '../components/Icons';

const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-300 flex flex-col">
      <header className="py-4 px-8 bg-slate-900/70 backdrop-blur-sm border-b border-slate-700/50 sticky top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <TaskIcon className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-white ml-2">DayTask</span>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/login" className="text-slate-300 hover:text-primary px-3 py-2 rounded-md font-medium">Login</Link>
            <Link to="/register" className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-hover">
              Get Started
            </Link>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
              {isMenuOpen ? <XIcon className="w-6 h-6 text-slate-300" /> : <MenuIcon className="w-6 h-6 text-slate-300" />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <Link to="/login" className="block py-2 px-4 text-slate-300 hover:text-primary font-medium">Login</Link>
            <Link to="/register" className="block mt-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-hover text-center">
              Get Started
            </Link>
          </div>
        )}
      </header>
      
      <main className="flex-grow container mx-auto flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
          Organize Your Work,
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-sky-300">Streamline Your Life</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-8">
          DayTask is a modern, scalable task management application designed to help you and your team stay on top of your projects with ease.
        </p>
        <div className="flex space-x-4">
          <Link to="/register" className="bg-primary text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-primary-hover transition-transform transform hover:scale-105">
            Sign Up for Free
          </Link>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          <div className="flex items-start text-left">
            <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-white">Intuitive Dashboard</h3>
              <p className="text-slate-400 text-sm">Get a clear overview of all your tasks and their status at a glance.</p>
            </div>
          </div>
          <div className="flex items-start text-left">
            <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-white">CRUD Operations</h3>
              <p className="text-slate-400 text-sm">Easily create, read, update, and delete tasks with a seamless user experience.</p>
            </div>
          </div>
          <div className="flex items-start text-left">
            <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-white">Secure Authentication</h3>
              <p className="text-slate-400 text-sm">Your data is protected with a secure and robust authentication system.</p>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="py-6 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} DayTask. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;