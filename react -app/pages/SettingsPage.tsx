import React, { useState } from 'react';

const ToggleSwitch: React.FC<{ enabled: boolean; setEnabled: (enabled: boolean) => void; disabled?: boolean }> = ({ enabled, setEnabled, disabled = false }) => {
    return (
      <button
        type="button"
        onClick={() => !disabled && setEnabled(!enabled)}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
          enabled ? 'bg-primary' : 'bg-slate-600'
        } ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
        disabled={disabled}
      >
        <span
          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    );
  };
  

const SettingsPage: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-semibold text-white mb-8">Settings</h2>
        
        <div className="space-y-10">
            {/* Appearance Section */}
            <section>
                <h3 className="text-lg font-medium text-slate-200 border-b border-slate-700 pb-2 mb-4">Appearance</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <div className="md:col-span-1">
                        <label htmlFor="theme" className="font-medium text-slate-300">Theme</label>
                        <p className="text-sm text-slate-500">Choose how DayTask looks to you.</p>
                    </div>
                    <div className="md:col-span-2">
                        <select
                            id="theme"
                            className="appearance-none border border-slate-600 bg-slate-700 rounded-lg w-full md:w-1/2 py-2 px-3 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                            <option>Dark</option>
                            <option disabled>Light (Coming Soon)</option>
                            <option disabled>System (Coming Soon)</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Notifications Section */}
            <section>
                <h3 className="text-lg font-medium text-slate-200 border-b border-slate-700 pb-2 mb-4">Notifications</h3>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div className="md:col-span-2">
                            <label className="font-medium text-slate-300">Email Notifications</label>
                            <p className="text-sm text-slate-500">Receive emails about task deadlines and updates.</p>
                        </div>
                        <div className="md:col-span-1 flex justify-start md:justify-end">
                            <ToggleSwitch enabled={emailNotifications} setEnabled={setEmailNotifications} />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                        <div className="md:col-span-2">
                            <label className="font-medium text-slate-300">Push Notifications</label>
                            <p className="text-sm text-slate-500">Get push notifications on your device. (Coming Soon)</p>
                        </div>
                        <div className="md:col-span-1 flex justify-start md:justify-end">
                           <ToggleSwitch enabled={pushNotifications} setEnabled={setPushNotifications} disabled={true} />
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Danger Zone */}
            <section>
                <h3 className="text-lg font-medium text-red-400 border-b border-red-500/30 pb-2 mb-4">Danger Zone</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center bg-slate-800 p-4 rounded-lg border border-red-500/30">
                     <div className="md:col-span-2">
                        <label className="font-medium text-slate-200">Delete Account</label>
                        <p className="text-sm text-slate-500">Permanently delete your account and all your data. This action cannot be undone.</p>
                    </div>
                    <div className="md:col-span-1 flex justify-start md:justify-end">
                       <button
                         onClick={() => alert('Feature not implemented yet. This would permanently delete your account.')}
                         className="bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline w-full md:w-auto"
                       >
                         Delete My Account
                       </button>
                    </div>
                </div>
            </section>

        </div>
    </div>
  );
};

export default SettingsPage;