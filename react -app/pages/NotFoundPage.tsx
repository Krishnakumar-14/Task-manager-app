
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-center p-4">
      <h1 className="text-9xl font-extrabold text-primary">404</h1>
      <h2 className="text-3xl font-bold text-white mt-2 mb-4">Page Not Found</h2>
      <p className="text-slate-400 mb-8 max-w-sm">
        Oops! The page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Link
        to="/"
        className="bg-primary hover:bg-primary-hover text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;