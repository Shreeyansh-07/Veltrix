'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { projectsStore } from '@/lib/projects-store';
import { authStore } from '@/lib/auth-store';
import { CheckCircle, Clock, AlertCircle, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function DeploymentsPage() {
  const [deployments, setDeployments] = useState([]);
  const [projectsMap, setProjectsMap] = useState({});
  const [selectedDeployment, setSelectedDeployment] = useState(null);
  const [editValues, setEditValues] = useState({ status: 'deployed', environment: 'production', url: '' });
  const [filter, setFilter] = useState('all');
  const workspace = authStore.getWorkspace();

  useEffect(() => {
    if (!workspace?.id) return;
    const allProjects = projectsStore.getProjects(workspace.id);
    const map = allProjects.reduce((acc, project) => {
      acc[project.id] = project;
      return acc;
    }, {});
    setProjectsMap(map);
    
    import('@/services/deployments').then(({ listDeployments }) => {
      listDeployments().then(liveDeployments => {
        const shaped = liveDeployments.map(d => ({
          id: d.deployment_id,
          projectId: d.deployment_id,
          project: { name: d.subdomain },
          status: d.status === 'running' ? 'deployed' : (d.status === 'failed' ? 'failed' : 'deploying'),
          environment: 'production',
          url: `https://${d.subdomain}.keshavstack.tech`,
          branch: 'main',
          createdAt: d.started_at || new Date().toISOString(),
          commitSha: 'N/A',
          commitMessage: 'No commit info available',
          runtime: 'Docker',
        }));
        setDeployments(shaped);
      }).catch(err => {
        console.error(err);
        setDeployments(projectsStore.getDeployments(workspace.id));
      });
    });
  }, [workspace?.id]);

  const filteredDeployments = filter === 'all'
    ? deployments
    : deployments.filter(d => d.status === filter);

  const openEdit = (deployment) => {
    setSelectedDeployment(deployment);
    setEditValues({
      status: deployment.status,
      environment: deployment.environment || 'production',
      url: deployment.url,
    });
  };

  const saveDeployment = () => {
    if (!workspace?.id || !selectedDeployment) return;
    const updated = projectsStore.updateDeployment(workspace.id, selectedDeployment.id, editValues);
    if (!updated) {
      toast.error('Failed to update deployment.');
      return;
    }
    setDeployments((prev) => prev.map((deployment) => (deployment.id === updated.id ? updated : deployment)));
    toast.success('Deployment updated.');
    setSelectedDeployment(null);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'deployed':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'deploying':
        return <Clock className="text-blue-600 animate-spin" size={20} />;
      case 'failed':
        return <AlertCircle className="text-red-600" size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 z-40">
        <div className="max-w-7xl">
          <h1 className="text-3xl font-bold text-gray-900">Deployments</h1>
          <p className="text-gray-600 mt-1">View all your project deployments</p>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8 max-w-7xl">
        {/* Filter Tabs */}
        <div className="flex gap-4 mb-8 border-b border-gray-300">
          {['all', 'deployed', 'deploying', 'failed'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-3 font-medium capitalize border-b-2 transition-colors ${
                filter === status
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Deployments Table */}
        {filteredDeployments.length > 0 ? (
          <div className="bg-white border border-gray-200 overflow-hidden rounded-2xl">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Project</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Commit</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Runtime</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">URL</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDeployments.map((deployment) => (
                    <tr key={deployment.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(deployment.status)}
                          <span className="text-sm font-medium text-gray-900 capitalize">
                            {deployment.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Link
                          href={`/dashboard/deployments/${deployment.id}`}
                          className="text-sm font-semibold text-gray-900 hover:underline"
                        >
                          {projectsMap[deployment.projectId]?.name || deployment.project?.name || 'Unknown Project'}
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-mono text-gray-900">{deployment.commitSha ? deployment.commitSha.substring(0, 7) : 'N/A'}</p>
                          <p className="text-xs text-gray-600 mt-1">{deployment.commitMessage || 'No commit info available'}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-900">{deployment.runtime || 'Container'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {new Date(deployment.createdAt).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <a
                          href={deployment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-700 hover:text-blue-800 font-medium"
                        >
                          Visit →
                        </a>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => openEdit(deployment)}
                          className="text-sm font-semibold text-gray-900 hover:underline"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 bg-white border border-gray-200 rounded-2xl">
            <p className="text-gray-600">No deployments to display</p>
          </div>
        )}
      </div>

      {selectedDeployment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-white rounded-2xl border border-gray-200 shadow-2xl">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-900">Edit Deployment</h3>
              <p className="text-sm text-gray-600 mt-1">{projectsMap[selectedDeployment.projectId]?.name || 'Project'}</p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Status</label>
                <select
                  value={editValues.status}
                  onChange={(event) => setEditValues((prev) => ({ ...prev, status: event.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black"
                >
                  <option value="deployed">Deployed</option>
                  <option value="deploying">Deploying</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Environment</label>
                <select
                  value={editValues.environment}
                  onChange={(event) => setEditValues((prev) => ({ ...prev, environment: event.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black"
                >
                  <option value="development">Development</option>
                  <option value="staging">Staging</option>
                  <option value="production">Production</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Deployment URL</label>
                <input
                  type="text"
                  value={editValues.url}
                  onChange={(event) => setEditValues((prev) => ({ ...prev, url: event.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setSelectedDeployment(null)}
                className="flex-1 border border-gray-300 rounded-lg py-2 font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={saveDeployment}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-black text-white rounded-lg py-2 font-semibold hover:bg-gray-900"
              >
                <Save size={16} />
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
