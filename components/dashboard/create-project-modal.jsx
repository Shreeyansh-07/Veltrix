'use client';

import { useState, useEffect } from 'react';
import { X, ArrowRight, Github, ExternalLink, FileUp, Plus, Trash2 } from 'lucide-react';
import { projectsStore } from '@/lib/projects-store';
import { authStore } from '@/lib/auth-store';
import { deployPackages, mockGithubRepos, projectTypes } from '@/lib/deploy-config';
import { toast } from 'sonner';
import { useDeployRunner } from '@/hooks/useDeployRunner';

const CreateProjectModal = ({ onClose, onCreate }) => {
  const { startDeployment, isDeploying } = useDeployRunner();
  const [step, setStep] = useState(1);
  const workspace = authStore.getWorkspace();
  const [projectType, setProjectType] = useState('web-service');
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [customRepoUrl, setCustomRepoUrl] = useState('');
  const [hoveredRepoId, setHoveredRepoId] = useState(null);
  const [githubRepos, setGithubRepos] = useState([]);
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [providerToken, setProviderToken] = useState(null);

  // Attempt to fetch live repos when on step 2
  useEffect(() => {
    if (step === 2) {
      const fetchRepos = async () => {
        try {
          setLoadingRepos(true);
          const { createClient } = await import('@/utils/supabase/client');
          const supabase = createClient();
          const { data: { session } } = await supabase.auth.getSession();

          
          if (session?.provider_token) {
            setProviderToken(session.provider_token);
            const response = await fetch('https://api.github.com/user/repos?sort=updated&per_page=100', {
              headers: {
                'Authorization': `Bearer ${session.provider_token}`,
                'Accept': 'application/vnd.github.v3+json'
              }
            });
            if (response.ok) {
              console.log("GITHUB_REPO", response);
              const data = await response.json();
              setGithubRepos(data.map(r => ({
                id: r.id.toString(),
                name: r.name,
                owner: r.owner.login,
                updatedAt: new Date(r.updated_at).toLocaleDateString(),
                branch: r.default_branch || 'main',
                isPrivate: r.private
              })));
            }
          }
        } catch (err) {
          console.error('Failed to grab live repos', err);
        } finally {
          setLoadingRepos(false);
        }
      };
      fetchRepos();
    }
  }, [step]);
  
  const defaultType = projectTypes.find(t => t.id === 'web-service') || projectTypes[0];
  const [formData, setFormData] = useState({
    name: '',
    port: 3000,
    branch: 'main',
    rootDirectory: '/',
    buildCommand: defaultType.defaults?.buildCommand || '',
    publishDirectory: defaultType.defaults?.publishDirectory || '',
    startCommand: defaultType.defaults?.startCommand || '',
    package: 'small',
    envVars: [{ key: '', value: '' }],
  });

  const updateFormData = (updates) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

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
    if (step === 2 && !selectedRepo && !customRepoUrl.trim()) {
      toast.error('Please select a repository or enter a valid URL');
      return;
    }
    if (step === 2 && customRepoUrl.trim()) {
      const pattern = /^https:\/\/github\.com\/[\w-]+\/[\w.-]+$/;
      if (!pattern.test(customRepoUrl.trim())) {
        toast.error('Please enter a valid GitHub repository URL');
        return;
      }
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
      const isCustomRepo = !!customRepoUrl.trim();
      const finalRepo = isCustomRepo 
        ? customRepoUrl.trim() 
        : `https://github.com/${selectedRepo.owner}/${selectedRepo.name}`;

      const deployPayload = {
        subdomain: formData.name.trim().toLowerCase().replace(/[^a-z0-9]/g, '-'),
        repo: finalRepo,
        port: Number(formData.port) || 3000,
        package: formData.package, // Dynamic from Step 4
        env: formData.envVars.reduce((acc, curr) => {
          if (curr.key.trim()) acc[curr.key.trim()] = curr.value;
          return acc;
        }, {}),
      };

      toast.info('Starting backend deployment...');
      const backendDeploy = await startDeployment(deployPayload);

      // Save a local mock version so it appears instantly before polling picks it up properly if we want
      const localPayload = {
        id: backendDeploy?.deployment_id || Date.now().toString(),
        name: deployPayload.subdomain,
        type: projectType,
        repository: deployPayload.repo,
        branch: formData.branch,
        rootDirectory: formData.rootDirectory.trim() || '/',
        buildCommand: formData.buildCommand.trim(),
        publishDirectory: formData.publishDirectory.trim(),
        startCommand: formData.startCommand.trim(),
        package: formData.package,
        envVars: formData.envVars.filter((item) => item.key.trim()),
      };

      const result = projectsStore.createProject(workspace.id, localPayload);

      toast.success(`Project "${localPayload.name}" deployed successfully.`);
      onCreate(result.project || localPayload);
    } catch (err) {
      toast.error(err.message || 'Deployment failed');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-auto shadow-2xl border border-gray-200">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-gray-200 bg-white z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Create New Project</h2>
            <p className="text-sm text-gray-600 mt-1">Step {step} of 4</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
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
                  i <= step ? 'bg-black' : 'bg-gray-200'
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {step === 1 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Select Project Type</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projectTypes.map((type) => {
                  const isSupported = type.id === 'web-service';
                  return (
                    <button
                      key={type.id}
                      disabled={!isSupported}
                      onClick={() => applyTypeDefaults(type.id)}
                      className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                        !isSupported 
                          ? 'opacity-60 cursor-not-allowed border-gray-200 bg-gray-50' 
                          : projectType === type.id
                            ? 'border-violet-600 bg-violet-50 ring-2 ring-violet-300 shadow-[0_0_0_3px_rgba(139,92,246,0.2)] dark:border-violet-400 dark:bg-violet-950/30 dark:ring-violet-500/60 dark:shadow-[0_0_0_3px_rgba(139,92,246,0.35)]'
                            : 'border-gray-200 hover:border-gray-400 dark:border-slate-700 dark:hover:border-slate-500'
                      }`}
                    >
                      <p className="font-bold text-gray-900">{type.label}</p>
                      <p className="text-xs text-gray-600 mt-1">{type.subtitle}</p>
                      {!isSupported && (
                        <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-gray-200 text-gray-600 px-2 py-1 rounded">
                          Coming Soon
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Connect Repository</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Paste Repository URL
                </label>
                <input
                  type="text"
                  value={customRepoUrl}
                  onChange={(e) => {
                    setCustomRepoUrl(e.target.value);
                    if (e.target.value) setSelectedRepo(null); // Clear selection if typing
                  }}
                  placeholder="https://github.com/username/repo"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-all text-sm mb-2"
                />
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-slate-700/80"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500 dark:bg-[#0f1b2d] dark:text-gray-400">or connect an account</span>
                </div>
              </div>

              <button
                type="button"
                onClick={async (e) => {
                  e.preventDefault();
                  try {
                    const { createClient } = await import('@/utils/supabase/client');
                    const supabase = createClient();
                    const { error } = await supabase.auth.signInWithOAuth({
                      provider: 'github',
                      options: {
                        scopes: 'repo user user:email',
                        redirectTo: `${window.location.origin}/auth/callback`
                      }
                    });
                    if (error) throw error;
                  } catch (err) {
                    toast.error(err.message || 'Failed to connect GitHub');
                  }
                }}
                className="w-full flex items-center justify-center gap-2 border-2 border-gray-300 rounded-lg p-4 mb-6 hover:border-purple-600 transition-colors font-semibold text-gray-700 dark:text-gray-200 dark:border-slate-700 dark:hover:border-purple-500"
              >
                <Github size={20} />
                {providerToken ? 'Re-connect GitHub' : 'Connect GitHub'}
              </button>
              
              <p className="text-sm text-gray-600 mb-4">
                {githubRepos.length > 0 ? "Or choose from your repositories:" : "Or choose a mock repository for testing:"}
              </p>
              
              {loadingRepos && (
                <div className="flex justify-center p-4">
                  <div className="w-5 h-5 border-2 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              
              <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                {(githubRepos.length > 0 ? githubRepos : mockGithubRepos).map((repo) => (
                  <div
                    key={repo.id}
                    onMouseEnter={() => setHoveredRepoId(repo.id)}
                    onMouseLeave={() => setHoveredRepoId(null)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left cursor-pointer ${
                      selectedRepo?.id === repo.id
                        ? 'border-violet-600 bg-violet-50 ring-2 ring-violet-300 shadow-[0_0_0_3px_rgba(139,92,246,0.2)] dark:border-violet-400 dark:bg-violet-950/30 dark:ring-violet-500/60 dark:shadow-[0_0_0_3px_rgba(139,92,246,0.35)]'
                        : 'border-gray-200 hover:border-gray-400 dark:border-slate-700 dark:hover:border-slate-500'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div
                        onClick={() => {
                          setSelectedRepo(repo);
                          setCustomRepoUrl(''); // Clear custom URL if selecting mock
                          updateFormData({ branch: repo.branch });
                        }}
                        className="text-left flex-1"
                      >
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900">{repo.owner}/{repo.name}</p>
                          {repo.isPrivate && (
                            <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200">Private</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 mt-1">Updated {repo.updatedAt} • Branch: {repo.branch}</p>
                      </div>
                      {hoveredRepoId === repo.id && (
                        <a
                          href={`https://github.com/${repo.owner}/${repo.name}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-sm text-gray-900 hover:text-black font-semibold"
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
              <h3 className="text-lg font-bold text-gray-900 mb-4">Configure Project</h3>
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Project Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateFormData({ name: e.target.value })}
                      placeholder="my-project"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                    />
                    <p className="text-xs text-gray-500 mt-1">Must be unique</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Port *
                    </label>
                    <input
                      type="number"
                      value={formData.port}
                      onChange={(e) => updateFormData({ port: e.target.value })}
                      placeholder="3000"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">
                      Branch <span className="text-[10px] font-bold uppercase ml-2 px-1.5 py-0.5 bg-gray-100 rounded text-gray-400">Coming soon</span>
                    </label>
                    <input
                      type="text"
                      disabled
                      value={formData.branch}
                      onChange={(e) => updateFormData({ branch: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 bg-gray-50 text-gray-400 rounded-lg cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2">
                      Root Directory <span className="text-[10px] font-bold uppercase ml-2 px-1.5 py-0.5 bg-gray-100 rounded text-gray-400">Coming soon</span>
                    </label>
                    <input
                      type="text"
                      disabled
                      value={formData.rootDirectory}
                      onChange={(e) => updateFormData({ rootDirectory: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 bg-gray-50 text-gray-400 rounded-lg cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2 truncate" title="Build Command">
                      Build Command <span className="text-[10px] font-bold uppercase ml-1 px-1.5 py-0.5 bg-gray-100 rounded text-gray-400">Soon</span>
                    </label>
                    <input
                      type="text"
                      disabled
                      value={formData.buildCommand}
                      onChange={(e) => updateFormData({ buildCommand: e.target.value })}
                      placeholder="default"
                      className="w-full px-4 py-2 border border-gray-200 bg-gray-50 text-gray-400 rounded-lg cursor-not-allowed text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2 truncate" title="Publish Directory">
                      Publish Dir <span className="text-[10px] font-bold uppercase ml-1 px-1.5 py-0.5 bg-gray-100 rounded text-gray-400">Soon</span>
                    </label>
                    <input
                      type="text"
                      disabled
                      value={formData.publishDirectory}
                      onChange={(e) => updateFormData({ publishDirectory: e.target.value })}
                      placeholder="default"
                      className="w-full px-4 py-2 border border-gray-200 bg-gray-50 text-gray-400 rounded-lg cursor-not-allowed text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-2 truncate" title="Start Command">
                      Start Command <span className="text-[10px] font-bold uppercase ml-1 px-1.5 py-0.5 bg-gray-100 rounded text-gray-400">Soon</span>
                    </label>
                    <input
                      type="text"
                      disabled
                      value={formData.startCommand}
                      onChange={(e) => updateFormData({ startCommand: e.target.value })}
                      placeholder="default"
                      className="w-full px-4 py-2 border border-gray-200 bg-gray-50 text-gray-400 rounded-lg cursor-not-allowed text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-900">Environment Variables</label>
                    <div className="flex items-center gap-2">
                      <label className="inline-flex items-center gap-2 text-xs font-semibold border border-gray-300 px-3 py-1.5 rounded-md cursor-pointer hover:bg-gray-100">
                        <FileUp size={14} />
                        Upload .env
                        <input type="file" accept=".env,.txt" onChange={handleEnvFileUpload} className="hidden" />
                      </label>
                      <button
                        type="button"
                        onClick={addEnvVar}
                        className="inline-flex items-center gap-1 text-xs font-semibold border border-gray-300 px-3 py-1.5 rounded-md hover:bg-gray-100"
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
                          className="col-span-5 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-black"
                        />
                        <input
                          type="text"
                          value={envVar.value}
                          onChange={(event) => updateEnvVar(index, envVar.key, event.target.value)}
                          placeholder="value"
                          className="col-span-6 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-black"
                        />
                        <button
                          type="button"
                          onClick={() => removeEnvVar(index)}
                          className="col-span-1 inline-flex items-center justify-center p-2 border border-gray-300 rounded-md hover:bg-gray-100"
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
              <h3 className="text-lg font-bold text-gray-900 mb-4">Select Instance Package</h3>
              <div className="space-y-3">
                {deployPackages.map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => updateFormData({ package: pkg.id })}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      formData.package === pkg.id
                        ? 'border-violet-600 bg-violet-50 ring-2 ring-violet-300 shadow-[0_0_0_3px_rgba(139,92,246,0.2)] dark:border-violet-400 dark:bg-violet-950/30 dark:ring-violet-500/60 dark:shadow-[0_0_0_3px_rgba(139,92,246,0.35)]'
                        : 'border-gray-200 hover:border-gray-400 dark:border-slate-700 dark:hover:border-slate-500'
                    }`}
                  >
                    <p className="font-semibold text-gray-900">{pkg.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{pkg.description}</p>
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-700 space-y-1">
                <p><span className="font-semibold text-gray-900">Project:</span> {formData.name || 'Untitled project'}</p>
                <p><span className="font-semibold text-gray-900">Repository:</span> {selectedRepo ? `${selectedRepo.owner}/${selectedRepo.name}` : 'None selected'}</p>
                <p><span className="font-semibold text-gray-900">Type:</span> {projectTypes.find((type) => type.id === projectType)?.label}</p>
                <p><span className="font-semibold text-gray-900">Package:</span> {deployPackages.find((pkg) => pkg.id === formData.package)?.title}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 p-6 border-t border-gray-200 bg-white flex items-center gap-3">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          )}
          {step < 4 ? (
            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-2 bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
            >
              Next
              <ArrowRight size={18} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isDeploying}
              className="flex-1 bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-900 transition-colors disabled:opacity-50"
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
