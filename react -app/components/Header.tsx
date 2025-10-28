import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { MenuIcon, UserCircleIcon } from './Icons';

interface HeaderProps {
  onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-10 w-full py-4 px-6 md:px-8 bg-slate-900/75 backdrop-blur-sm border-b border-slate-700/50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button onClick={onMenuClick} className="lg:hidden mr-4 text-slate-400 focus:outline-none" aria-label="Open menu">
            <MenuIcon className="w-6 h-6" />
          </button>
          {/* Can add a global search bar here in the future */}
        </div>
        <div className="flex items-center">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-slate-200 hidden sm:block">{user?.name}</span>
              <UserCircleIcon className="w-8 h-8 text-slate-500" />
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;