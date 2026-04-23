'use client';

import { useState, useEffect } from 'react';
import { X, ArrowRight, Github, ExternalLink, FileUp, Plus, Trash2, Loader2, Search } from 'lucide-react';
import { projectsStore } from '@/lib/projects-store';
import { authStore } from '@/lib/auth-store';
import { environments, projectTypes, deployPackages } from '@/lib/deploy-config';
import { toast } from 'sonner';
import { useDeployRunner } from '@/hooks/useDeployRunner';
import { fetchGitHubRepos } from '@/services/github';

const CreateProjectModal = ({ onClose, onCreate }) => {
  const { startDeployment, isDeploying } = useDeployRunner();
  const [step, setStep] = useState(1);
  const workspace = authStore.getWorkspace();
  const [projectType, setProjectType] = useState('web-service');
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [hoveredRepoId, setHoveredRepoId] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [repoSearch, setRepoSearch] = useState('');
  
  const defaultType = projectTypes.find(t => t.id === 'web-service') || projectTypes[0];
  const [formData, setFormData] = useState({
    name: '',
    branch: 'main',
    rootDirectory: '/',
    buildCommand: defaultType.defaults.buildCommand,
    publishDirectory: defaultType.defaults.publishDirectory,
    startCommand: defaultType.defaults.startCommand,
    environment: 'production',
    envVars: [{ key: '', value: '' }],
  });

  const updateFormData = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  useEffect(() => {
    if (step === 2 && repos.length === 0 && !loadingRepos) {
      setLoadingRepos(true);
      fetchGitHubRepos()
        .then((fetchedRepos) => setRepos(fetchedRepos))
        .catch((err) => toast.error('Failed to load GitHub repositories. Did you sign in with GitHub?'))
        .finally(() => setLoadingRepos(false));
    }
  }, [step, repos.length, loadingRepos]);

  const applyTypeDefaults = (typeId) => {
    const selectedType = projectTypes.find((type) => type.id === typeId);
    setProjectType(typeId);
    if (!selectedType) return;
    updateFormData({
      buildCommand: selectedType.defaults.buildCommand,
      publishDirectory: selectedType.defaults.publishDirectory,
      startCommand: selectedType.defaults.startCommand,
    });
  };

  const parseEnvFile = (rawText) => {
    const rows = rawText.split(/\r?\n/);
    const parsed = rows
      .map((row) => row.trim())
      .filter((row) => row && !row.startsWith('#') && row.includes('='))
      .map((row) => {
        const separator = row.indexOf('=');
        return {
          key: row.slice(0, separator).trim(),
          value: row.slice(separator + 1).trim(),
        };
      })
      .filter((item) => item.key);
    if (!parsed.length) return;
    updateFormData({ envVars: parsed });
    toast.success(`Imported ${parsed.length} environment variable(s).`);
  };

  const handleEnvFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const contents = await file.text();
    parseEnvFile(contents);
  };

  const updateEnvVar = (index, key, value) => {
    const nextEnvVars = [...formData.envVars];
    nextEnvVars[index] = { key, value };
    updateFormData({ envVars: nextEnvVars });
  };

  const addEnvVar = () => {
    updateFormData({ envVars: [...formData.envVars, { key: '', value: '' }] });
  };

  const removeEnvVar = (index) => {
    const nextEnvVars = formData.envVars.filter((_, itemIndex) => itemIndex !== index);
    updateFormData({ envVars: nextEnvVars.length ? nextEnvVars : [{ key: '', value: '' }] });
  };

  const handleNext = () => {
    if (step === 2 && !selectedRepo) {
      toast.error('Please select a repository');
      return;
    }
    if (step === 3 && !formData.name.trim()) {
      toast.error('Please enter a project name');
      return;
    }
    setStep(step + 1);
  };

  const handleSubmit = async () => {
    if (!workspace?.id) {
      toast.error('Workspace not found. Please log in again.');
      return;
    }

    if (!formData.name.trim()) {
      toast.error('Project name is required');
      return;
    }

    try {
      const deployPayload = {
        repo: selectedRepo ? selectedRepo.html_url : '',
        port: Number(formData.port || 3000),
        subdomain: formData.name.trim().toLowerCase().replace(/[^a-z0-9]/g, '-'),
        package: formData.packageSize || 'small',
        env: formData.envVars.reduce((acc, curr) => {
          if (curr.key.trim()) acc[curr.key.trim()] = curr.value;
          return acc;
        }, {}),
        build_args: formData.buildArgs || {},
        min_replicas: Number(formData.minReplicas || 1),
        max_replicas: Number(formData.maxReplicas || 3),
        cpu_target_utilization: Number(formData.cpuTarget || 70),
      };

      toast.info('Starting backend deployment...');
      const response = await startDeployment(deployPayload);

      const localPayload = {
        name: formData.name.trim(),
        type: projectType,
        repository: deployPayload.repo,
        branch: deployPayload.branch,
        rootDirectory: formData.rootDirectory.trim() || '/',
        buildCommand: formData.buildCommand.trim(),
        publishDirectory: formData.publishDirectory.trim(),
        startCommand: formData.startCommand.trim(),
        environment: formData.environment,
        envVars: formData.envVars.filter((item) => item.key.trim()),
      };

      const result = projectsStore.createProject(workspace.id, localPayload);

      toast.success(`Project "${localPayload.name}" deployed successfully.`);
      if (response && response.deployment_id) {
         window.location.href = `/dashboard/deployments/${response.deployment_id}`;
      } else {
         onCreate(result.project);
      }
    } catch (err) {
      toast.error(`Deployment failed: ${err.message}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-zinc-950 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-auto shadow-2xl border border-gray-200 dark:border-zinc-800 transition-colors">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 z-10 transition-colors">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Project</h2>
            <p className="text-sm text-gray-600 dark:text-zinc-400 mt-1">Step {step} of 4</p>
          </div>
          <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="px-6 pt-6">
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`flex-1 h-2 rounded-full transition-all ${
                  i <= step ? 'bg-black dark:bg-white' : 'bg-gray-200 dark:bg-zinc-800'
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {step === 1 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Select Project Type</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projectTypes.map((type) => {
                  const isAvailable = type.id === 'web-service';
                  return (
                  <button
                    key={type.id}
                    disabled={!isAvailable}
                    onClick={() => isAvailable && applyTypeDefaults(type.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left relative ${
                      !isAvailable 
                        ? 'opacity-60 cursor-not-allowed border-gray-200 bg-gray-50 dark:border-zinc-800 dark:bg-zinc-900/50' 
                        : projectType === type.id
                          ? 'border-violet-600 bg-violet-50 ring-2 ring-violet-300 shadow-[0_0_0_3px_rgba(139,92,246,0.2)] dark:bg-violet-900/20 dark:border-violet-500 dark:ring-violet-500/30'
                          : 'border-gray-200 hover:border-gray-400 dark:border-zinc-700 dark:hover:border-zinc-500 dark:bg-zinc-900'
                    }`}
                  >
                    {!isAvailable && (
                      <span className="absolute top-2 right-2 text-[10px] font-bold bg-gray-200 dark:bg-zinc-800 text-gray-600 dark:text-zinc-400 px-2 py-0.5 rounded-full">
                        Coming soon
                      </span>
                    )}
                    <p className="font-bold text-gray-900 dark:text-white">{type.label}</p>
                    <p className="text-xs text-gray-600 dark:text-zinc-400 mt-1">{type.subtitle}</p>
                  </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Connect Repository</h3>
              
              <div className="relative mb-6">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-500" />
                <input
                  type="text"
                  placeholder="Search your repositories..."
                  value={repoSearch}
                  onChange={(e) => setRepoSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-black dark:focus:border-zinc-500 font-medium transition-colors"
                />
              </div>

              <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
                {loadingRepos && (
                   <div className="flex items-center justify-center p-8 text-gray-500 dark:text-zinc-400">
                     <Loader2 className="animate-spin" size={24} />
                   </div>
                )}
                {!loadingRepos && repos.length === 0 && (
                   <div className="text-center p-8 border-2 border-dashed border-gray-200 dark:border-zinc-800 rounded-lg text-gray-500 dark:text-zinc-400">
                     No repos found. Ensure you authorized GitHub.
                   </div>
                )}
                {repos
                  .filter(r => r.full_name.toLowerCase().includes(repoSearch.toLowerCase()))
                  .map((repo) => (
                  <div
                    key={repo.id}
                    onMouseEnter={() => setHoveredRepoId(repo.id)}
                    onMouseLeave={() => setHoveredRepoId(null)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedRepo?.id === repo.id
                        ? 'border-violet-600 bg-violet-50 ring-2 ring-violet-300 shadow-[0_0_0_3px_rgba(139,92,246,0.2)] dark:border-violet-400 dark:bg-violet-950/30 dark:ring-violet-500/60 dark:shadow-[0_0_0_3px_rgba(139,92,246,0.35)]'
                        : 'border-gray-200 hover:border-gray-400 dark:border-zinc-800 dark:hover:border-zinc-600 dark:bg-zinc-900/50'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <button
                        onClick={() => {
                          setSelectedRepo(repo);
                          updateFormData({ branch: repo.default_branch || 'main' });
                        }}
                        className="text-left flex-1"
                      >
                        <p className="font-semibold text-gray-900 dark:text-white">{repo.full_name}</p>
                        <p className="text-xs text-gray-600 dark:text-zinc-400 mt-1 flex items-center gap-2">
                           <span className={repo.private ? 'text-amber-600 dark:text-amber-500 font-medium' : 'text-green-600 dark:text-green-500 font-medium'}>
                             {repo.private ? 'Private' : 'Public'}
                           </span>
                           &bull; Branch: {repo.default_branch}
                        </p>
                      </button>
                      {hoveredRepoId === repo.id && (
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-gray-900 dark:text-zinc-300 hover:text-black dark:hover:text-white font-semibold transition-colors"
                        >
                          View repo
                          <ExternalLink size={15} />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Configure Project</h3>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-900 dark:text-zinc-200 mb-2">
                    Project Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateFormData({ name: e.target.value })}
                    placeholder="my-project"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-black dark:focus:border-zinc-500 transition-colors"
                  />
                  <p className="text-xs text-gray-500 dark:text-zinc-400 mt-1">Must be unique</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-zinc-200 mb-2">
                      Branch
                    </label>
                    <input
                      type="text"
                      value={formData.branch}
                      onChange={(e) => updateFormData({ branch: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-black dark:focus:border-zinc-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-zinc-200 mb-2">
                      Root Directory
                    </label>
                    <input
                      type="text"
                      value={formData.rootDirectory}
                      onChange={(e) => updateFormData({ rootDirectory: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-black dark:focus:border-zinc-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 dark:text-zinc-200 mb-2">Build Command</label>
                    <input type="text" value={formData.buildCommand} onChange={(e) => updateFormData({ buildCommand: e.target.value })} placeholder="npm run build" className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-black dark:focus:border-zinc-500 transition-colors" />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-900 dark:text-zinc-200 mb-2">Start Command</label>
                      <input type="text" value={formData.startCommand} onChange={(e) => updateFormData({ startCommand: e.target.value })} placeholder="npm start" className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-black dark:focus:border-zinc-500 transition-colors" />
                    </div>
                    <div className="col-span-1">
                      <label className="block text-sm font-medium text-gray-900 dark:text-zinc-200 mb-2">Port</label>
                      <input type="number" value={formData.port || 3000} onChange={(e) => updateFormData({ port: parseInt(e.target.value) || 3000 })} placeholder="3000" className="w-full px-4 py-2 border border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:border-black dark:focus:border-zinc-500 transition-colors" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-gray-200 dark:border-zinc-800 pt-4 mt-2">
                  <div>
                     <label className="block text-xs font-bold text-gray-700 dark:text-zinc-400 uppercase tracking-widest mb-1.5">CPU Target %</label>
                     <input type="number" min="10" max="100" value={formData.cpuTarget || 70} onChange={(e) => updateFormData({ cpuTarget: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white rounded focus:border-black dark:focus:border-zinc-500 outline-none transition-colors" />
                  </div>
                  <div>
                     <label className="block text-xs font-bold text-gray-700 dark:text-zinc-400 uppercase tracking-widest mb-1.5">Min Replicas</label>
                     <input type="number" min="1" max="10" value={formData.minReplicas || 1} onChange={(e) => updateFormData({ minReplicas: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white rounded focus:border-black dark:focus:border-zinc-500 outline-none transition-colors" />
                  </div>
                  <div>
                     <label className="block text-xs font-bold text-gray-700 dark:text-zinc-400 uppercase tracking-widest mb-1.5">Max Replicas</label>
                     <input type="number" min="1" max="20" value={formData.maxReplicas || 3} onChange={(e) => updateFormData({ maxReplicas: e.target.value })} className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white rounded focus:border-black dark:focus:border-zinc-500 outline-none transition-colors" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-900 dark:text-zinc-200">Environment Variables</label>
                    <div className="flex items-center gap-2">
                      <label className="inline-flex items-center gap-2 text-xs font-semibold border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 px-3 py-1.5 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
                        <FileUp size={14} />
                        Upload .env
                        <input type="file" accept=".env,.txt" onChange={handleEnvFileUpload} className="hidden" />
                      </label>
                      <button
                        type="button"
                        onClick={addEnvVar}
                        className="inline-flex items-center gap-1 text-xs font-semibold border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 px-3 py-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <Plus size={14} /> Add
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {formData.envVars.map((envVar, index) => (
                      <div key={`${index}_${envVar.key}`} className="grid grid-cols-12 gap-2 items-center">
                        <input
                          type="text"
                          value={envVar.key}
                          onChange={(event) => updateEnvVar(index, event.target.value, envVar.value)}
                          placeholder="KEY"
                          className="col-span-5 px-3 py-2 border border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white rounded-md text-sm focus:outline-none focus:border-black dark:focus:border-zinc-500 transition-colors"
                        />
                        <input
                          type="text"
                          value={envVar.value}
                          onChange={(event) => updateEnvVar(index, envVar.key, event.target.value)}
                          placeholder="value"
                          className="col-span-6 px-3 py-2 border border-gray-300 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-gray-900 dark:text-white rounded-md text-sm focus:outline-none focus:border-black dark:focus:border-zinc-500 transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => removeEnvVar(index)}
                          className="col-span-1 inline-flex items-center justify-center p-2 border border-gray-300 dark:border-zinc-700 text-gray-500 dark:text-zinc-400 rounded-md hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-900 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Select Instance Size</h3>
              <div className="space-y-3">
                {deployPackages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => updateFormData({ packageSize: pkg.id })}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      (formData.packageSize || 'small') === pkg.id
                        ? 'border-violet-600 bg-violet-50 ring-2 ring-violet-300 shadow-[0_0_0_3px_rgba(139,92,246,0.2)] dark:border-violet-400 dark:bg-violet-950/30 dark:ring-violet-500/50'
                        : 'border-gray-200 hover:border-gray-400 dark:border-zinc-800 dark:hover:border-zinc-600 dark:bg-zinc-900'
                    }`}
                  >
                    <p className="font-semibold text-gray-900 dark:text-white">{pkg.title}</p>
                    <p className="text-xs text-gray-600 dark:text-zinc-400 mt-1">{pkg.description}</p>
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gray-100 dark:bg-zinc-900/50 border border-gray-300 dark:border-zinc-800 rounded-lg text-sm text-gray-700 dark:text-zinc-300 space-y-1 transition-colors">
                <p><span className="font-semibold text-gray-900 dark:text-white">Project:</span> {formData.name || 'Untitled project'}</p>
                <p><span className="font-semibold text-gray-900 dark:text-white">Repository:</span> {selectedRepo ? selectedRepo.full_name : 'None selected'}</p>
                <p><span className="font-semibold text-gray-900 dark:text-white">Size:</span> {(formData.packageSize || 'small').toUpperCase()}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 p-6 border-t border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center gap-3 transition-colors">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 px-6 py-2 border border-gray-300 dark:border-zinc-700 text-gray-700 dark:text-zinc-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors"
            >
              Back
            </button>
          )}
          {step < 4 ? (
            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-900 dark:hover:bg-zinc-200 transition-colors"
            >
              Next
              <ArrowRight size={18} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isDeploying}
              className="flex-1 bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-lg font-semibold hover:bg-gray-900 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50"
            >
              {isDeploying ? 'Deploying...' : 'Create Project'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;