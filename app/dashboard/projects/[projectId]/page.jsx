'use client';

import { useEffect, useMemo, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Save } from 'lucide-react';
import { authStore } from '@/lib/auth-store';
import { projectsStore } from '@/lib/projects-store';
import { toast } from 'sonner';

const defaultForm = {
  name: '',
  branch: 'main',
  rootDirectory: '/',
  buildCommand: '',
  publishDirectory: '',
  startCommand: '',
  environment: 'production',
  envVars: [{ key: '', value: '' }],
};

export default function ProjectDetailsPage(props) {
  const params = use(props.params);
  const router = useRouter();
  const projectId = params?.projectId;
  const workspace = authStore.getWorkspace();
  const [project, setProject] = useState(null);
  const [deployments, setDeployments] = useState([]);
  const [formData, setFormData] = useState(defaultForm);

  useEffect(() => {
    if (!workspace?.id || !projectId) return;
    const fetched = projectsStore.getProject(workspace.id, projectId);
    if (!fetched) {
      toast.error('Project not found.');
      router.push('/dashboard/projects');
      return;
    }

    setProject(fetched);
    setFormData({
      name: fetched.name,
      branch: fetched.branch,
      rootDirectory: fetched.rootDirectory,
      buildCommand: fetched.buildCommand,
      publishDirectory: fetched.publishDirectory,
      startCommand: fetched.startCommand,
      environment: fetched.environment,
      envVars: fetched.envVars?.length ? fetched.envVars : [{ key: '', value: '' }],
    });

    const projectDeployments = projectsStore.getProjectDeployments(workspace.id, fetched.id);
    setDeployments(projectDeployments);
  }, [workspace?.id, projectId, router]);

  const projectUrl = useMemo(() => (formData.name ? `https://${formData.name}.keshavstack.tech` : ''), [formData.name]);

  const updateEnvVar = (index, key, value) => {
    const next = [...formData.envVars];
    next[index] = { key, value };
    setFormData((prev) => ({ ...prev, envVars: next }));
  };

  const addEnvVar = () => {
    setFormData((prev) => ({ ...prev, envVars: [...prev.envVars, { key: '', value: '' }] }));
  };

  const removeEnvVar = (index) => {
    const next = formData.envVars.filter((_, idx) => idx !== index);
    setFormData((prev) => ({ ...prev, envVars: next.length ? next : [{ key: '', value: '' }] }));
  };

  const handleSave = () => {
    if (!workspace?.id || !project) return;
    const result = projectsStore.updateProject(workspace.id, project.id, {
      ...formData,
      name: formData.name.trim(),
      branch: formData.branch.trim() || 'main',
      rootDirectory: formData.rootDirectory.trim() || '/',
      buildCommand: formData.buildCommand.trim(),
      publishDirectory: formData.publishDirectory.trim(),
      startCommand: formData.startCommand.trim(),
      envVars: formData.envVars.filter((item) => item.key.trim()),
    });

    if (result.error) {
      toast.error(result.error);
      return;
    }

    setProject(result.project);
    toast.success('Project configuration updated.');
  };

  const triggerDeployment = () => {
    if (!workspace?.id || !project) return;
    const deployment = projectsStore.createDeployment(workspace.id, {
      projectId: project.id,
      status: 'deploying',
      environment: formData.environment,
      version: `1.0.${Math.floor(Math.random() * 20) + 1}`,
      commitSha: crypto.randomUUID().replace(/-/g, '').slice(0, 12),
      commitMessage: 'Manual deployment from dashboard',
      runtime: `${(Math.random() * 3 + 2).toFixed(1)}s`,
      url: projectUrl,
    });
    setDeployments((prev) => [deployment, ...prev]);
    toast.success('Deployment started.');
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-[#f5f5f7] flex items-center justify-center text-gray-600">
        Loading project...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-500">Project</p>
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/deployments"
              className="px-4 py-2 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-100"
            >
              View deployments
            </Link>
            <button
              onClick={triggerDeployment}
              className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-900"
            >
              <Plus size={16} />
              New deploy
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-8 grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 space-y-5">
          <h2 className="text-xl font-bold text-gray-900">Service Configuration</h2>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Project Name</label>
            <input
              value={formData.name}
              onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Branch</label>
              <input
                value={formData.branch}
                onChange={(event) => setFormData((prev) => ({ ...prev, branch: event.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Environment</label>
              <select
                value={formData.environment}
                onChange={(event) => setFormData((prev) => ({ ...prev, environment: event.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black"
              >
                <option value="development">Development</option>
                <option value="staging">Staging</option>
                <option value="production">Production</option>
              </select>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Root Directory</label>
              <input
                value={formData.rootDirectory}
                onChange={(event) => setFormData((prev) => ({ ...prev, rootDirectory: event.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Publish Directory</label>
              <input
                value={formData.publishDirectory}
                onChange={(event) => setFormData((prev) => ({ ...prev, publishDirectory: event.target.value }))}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Build Command</label>
            <input
              value={formData.buildCommand}
              onChange={(event) => setFormData((prev) => ({ ...prev, buildCommand: event.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Start Command</label>
            <input
              value={formData.startCommand}
              onChange={(event) => setFormData((prev) => ({ ...prev, startCommand: event.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-black"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-900">Environment Variables</label>
              <button
                onClick={addEnvVar}
                className="text-xs font-semibold px-3 py-1.5 border border-gray-300 rounded-md hover:bg-gray-100"
              >
                Add Variable
              </button>
            </div>
            {formData.envVars.map((item, index) => (
              <div key={`${index}_${item.key}`} className="grid grid-cols-12 gap-2">
                <input
                  value={item.key}
                  onChange={(event) => updateEnvVar(index, event.target.value, item.value)}
                  placeholder="KEY"
                  className="col-span-5 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-black"
                />
                <input
                  value={item.value}
                  onChange={(event) => updateEnvVar(index, item.key, event.target.value)}
                  placeholder="value"
                  className="col-span-6 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-black"
                />
                <button
                  onClick={() => removeEnvVar(index)}
                  className="col-span-1 border border-gray-300 rounded-md px-2 hover:bg-gray-100"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={handleSave}
            className="inline-flex items-center gap-2 px-5 py-2 bg-black text-white rounded-lg font-semibold hover:bg-gray-900"
          >
            <Save size={16} />
            Save configuration
          </button>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Deployments</h2>
          {deployments.length ? (
            <div className="space-y-3">
              {deployments.map((deployment) => (
                <div key={deployment.id} className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-900">{deployment.status}</p>
                    <p className="text-xs text-gray-500">{new Date(deployment.createdAt).toLocaleString()}</p>
                  </div>
                  <p className="text-xs text-gray-600 mt-2 font-mono">{deployment.commitSha.slice(0, 7)} • {deployment.environment}</p>
                  <a
                    href={deployment.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-blue-700 hover:underline mt-2 inline-block"
                  >
                    {deployment.url}
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-600">No deployments yet.</p>
          )}
        </section>
      </div>
    </div>
  );
}
