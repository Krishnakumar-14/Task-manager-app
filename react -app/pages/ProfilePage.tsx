
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { UserCircleIcon } from '../components/Icons';

const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [isEditing, setIsEditing] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true);
    await updateUser({ name, phone });
    setUpdating(false);
    setStatusMessage('Profile updated successfully!');
    setIsEditing(false);
    setTimeout(() => setStatusMessage(''), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto bg-slate-800 p-8 rounded-lg border border-slate-700/50">
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Your Profile</h2>
        <UserCircleIcon className="w-32 h-32 text-slate-600" />
        <a 
          href="#" 
          onClick={(e) => {e.preventDefault(); alert("Feature not implemented yet.")}} 
          className="mt-2 text-sm text-primary hover:underline"
        >
          Change Photo
        </a>
      </div>
      
      {statusMessage && <div className="mb-4 text-center p-3 rounded-md bg-green-500/10 text-green-400">{statusMessage}</div>}
      <form onSubmit={handleUpdate}>
        <div className="mb-4">
          <label className="block text-slate-300 text-sm font-bold mb-2" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEditing}
            className="appearance-none border border-slate-600 bg-slate-700 rounded-lg w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-slate-600 disabled:cursor-not-allowed"
          />
        </div>
        <div className="mb-4">
          <label className="block text-slate-300 text-sm font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            disabled={true} // Usually email is not editable
            className="appearance-none border border-slate-600 rounded-lg w-full py-2 px-3 text-slate-400 leading-tight focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-slate-600 disabled:cursor-not-allowed"
          />
        </div>
        <div className="mb-6">
          <label className="block text-slate-300 text-sm font-bold mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            disabled={!isEditing}
            className="appearance-none border border-slate-600 bg-slate-700 rounded-lg w-full py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-slate-600 disabled:cursor-not-allowed"
          />
        </div>
        <div className="flex items-center justify-end gap-4">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updating}
                className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-36 flex justify-center items-center disabled:opacity-50"
              >
                {updating ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : 'Save Changes'}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Edit Profile
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
