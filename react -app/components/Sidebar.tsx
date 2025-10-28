import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { HomeIcon, TaskIcon, SettingsIcon, LogoutIcon, ProfileIcon, XIcon } from './Icons';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { logout } = useAuth();

  const commonLinkClasses = "flex items-center px-4 py-3 text-slate-300 transition-colors duration-200 transform rounded-lg";
  const activeLinkClasses = "bg-primary text-white";
  const inactiveLinkClasses = "hover:bg-slate-700 hover:text-white";

  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden ${isOpen ? 'block' : 'hidden'}`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-72 px-6 py-8 overflow-y-auto bg-slate-800 border-r border-slate-700/50 transform transition-transform duration-300 lg:translate-x-0 flex flex-col justify-between ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center">
                    <TaskIcon className="w-8 h-8 text-primary" />
                    <h2 className="text-2xl font-bold text-white ml-2">DayTask</h2>
                </div>
                <button className="lg:hidden" onClick={onClose} aria-label="Close menu">
                    <XIcon className="w-6 h-6 text-slate-400" />
                </button>
            </div>
            
            <nav className="space-y-2">
                <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Main Menu</p>
                <NavLink 
                  to="/dashboard"
                  className={({ isActive }) => `${commonLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
                  onClick={onClose}
                >
                  <HomeIcon className="w-5 h-5" />
                  <span className="mx-4 font-medium">Dashboard</span>
                </NavLink>
            </nav>
        </div>

        <div>
            <nav className="space-y-2">
                 <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Others</p>
                <NavLink
                  to="/profile"
                  className={({ isActive }) => `${commonLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
                  onClick={onClose}
                >
                  <ProfileIcon className="w-5 h-5" />
                  <span className="mx-4 font-medium">Profile</span>
                </NavLink>
                <NavLink
                  to="/settings"
                  className={({ isActive }) => `${commonLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
                  onClick={onClose}
                >
                    <SettingsIcon className="w-5 h-5" />
                    <span className="mx-4 font-medium">Settings</span>
                </NavLink>
            </nav>
             <div className="mt-8 pt-4 border-t border-slate-700">
                <button
                    onClick={() => { logout(); onClose(); }}
                    className={`${commonLinkClasses} ${inactiveLinkClasses} w-full`}
                >
                    <LogoutIcon className="w-5 h-5" />
                    <span className="mx-4 font-medium">Logout</span>
                </button>
            </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;