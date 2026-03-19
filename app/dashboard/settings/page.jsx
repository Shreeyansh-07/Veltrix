'use client';

import { useState } from 'react';
import { authStore } from '@/lib/auth-store';
import { toast } from 'sonner';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  const user = authStore.getCurrentUser();
  const [workspace, setWorkspace] = useState(authStore.getWorkspace());
  const [workspaceName, setWorkspaceName] = useState(workspace?.name || '');

  const handleSave = () => {
    const name = workspaceName.trim();
    if (!name) {
      toast.error('Workspace name cannot be empty.');
      return;
    }
    const updated = authStore.updateWorkspace({ name });
    if (updated) {
      setWorkspace(updated);
    }
    toast.success('Settings saved successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 z-40">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your account and workspace settings</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-8 py-8">
        {/* Account Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={user?.name || ''}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
              />
            </div>
          </div>
        </div>

        {/* Workspace Settings */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Workspace Settings</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Workspace Name
              </label>
              <input
                type="text"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Workspace ID
              </label>
              <input
                type="text"
                value={workspace?.id || ''}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-600 font-mono text-sm"
              />
            </div>

            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-white rounded-lg border border-red-300 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Danger Zone</h2>
          <button className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors">
            Delete Account
          </button>
          <p className="text-sm text-gray-600 mt-4">
            This action cannot be undone. All your projects and data will be permanently deleted.
          </p>
        </div>
      </div>
    </div>
  );
}
