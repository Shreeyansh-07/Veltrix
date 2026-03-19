'use client';

import { useState } from 'react';
import { X, ArrowRight, Github, ExternalLink, FileUp, Plus, Trash2 } from 'lucide-react';
import { projectsStore } from '@/lib/projects-store';
import { authStore } from '@/lib/auth-store';
import { environments, mockGithubRepos, projectTypes } from '@/lib/deploy-config';
import { toast } from 'sonner';

const CreateProjectModal = ({ onClose, onCreate }) => {
  const [step, setStep] = useState(1);
  const workspace = authStore.getWorkspace();
  const [projectType, setProjectType] = useState(projectTypes[0].id);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [hoveredRepoId, setHoveredRepoId] = useState(null);
  const defaultType = projectTypes[0];
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

  const handleSubmit = () => {
    if (!workspace?.id) {
      toast.error('Workspace not found. Please log in again.');
      return;
    }

    if (!formData.name.trim()) {
      toast.error('Project name is required');
      return;
    }

    const payload = {
      name: formData.name.trim(),
      type: projectType,
      repository: selectedRepo ? `https://github.com/${selectedRepo.owner}/${selectedRepo.name}` : '',
      branch: formData.branch.trim() || 'main',
      rootDirectory: formData.rootDirectory.trim() || '/',
      buildCommand: formData.buildCommand.trim(),
      publishDirectory: formData.publishDirectory.trim(),
      startCommand: formData.startCommand.trim(),
      environment: formData.environment,
      envVars: formData.envVars.filter((item) => item.key.trim()),
    };

    const result = projectsStore.createProject(workspace.id, payload);

    if (result.error) {
      toast.error(result.error);
      return;
    }

    toast.success(`Project "${payload.name}" created successfully.`);
    onCreate(result.project);
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
                {projectTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => applyTypeDefaults(type.id)}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      projectType === type.id
                        ? 'border-black bg-gray-100'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <p className="font-bold text-gray-900">{type.label}</p>
                    <p className="text-xs text-gray-600 mt-1">{type.subtitle}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">Connect Repository</h3>
              <button className="w-full flex items-center justify-center gap-2 border-2 border-gray-300 rounded-lg p-4 mb-6 hover:border-purple-600 transition-colors font-semibold text-gray-700">
                <Github size={20} />
                Connect GitHub
              </button>
              <p className="text-sm text-gray-600 mb-4">Choose a repository to deploy:</p>
              <div className="space-y-2">
                {mockGithubRepos.map((repo) => (
                  <div
                    key={repo.id}
                    onMouseEnter={() => setHoveredRepoId(repo.id)}
                    onMouseLeave={() => setHoveredRepoId(null)}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      selectedRepo?.id === repo.id
                        ? 'border-black bg-gray-100'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <button
                        onClick={() => {
                          setSelectedRepo(repo);
                          updateFormData({ branch: repo.branch });
                        }}
                        className="text-left flex-1"
                      >
                        <p className="font-semibold text-gray-900">{repo.owner}/{repo.name}</p>
                        <p className="text-xs text-gray-600 mt-1">Updated {repo.updatedAt} • Branch: {repo.branch}</p>
                      </button>
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Branch
                    </label>
                    <input
                      type="text"
                      value={formData.branch}
                      onChange={(e) => updateFormData({ branch: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Root Directory
                    </label>
                    <input
                      type="text"
                      value={formData.rootDirectory}
                      onChange={(e) => updateFormData({ rootDirectory: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Build Command
                  </label>
                  <input
                    type="text"
                    value={formData.buildCommand}
                    onChange={(e) => updateFormData({ buildCommand: e.target.value })}
                    placeholder="npm run build"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Publish Directory
                  </label>
                  <input
                    type="text"
                    value={formData.publishDirectory}
                    onChange={(e) => updateFormData({ publishDirectory: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Start Command
                  </label>
                  <input
                    type="text"
                    value={formData.startCommand}
                    onChange={(e) => updateFormData({ startCommand: e.target.value })}
                    placeholder="npm start"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  />
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
              <h3 className="text-lg font-bold text-gray-900 mb-4">Select Environment</h3>
              <div className="space-y-3">
                {environments.map((env) => (
                  <button
                    key={env.id}
                    onClick={() => updateFormData({ environment: env.id })}
                    className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                      formData.environment === env.id
                        ? 'border-black bg-gray-100'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <p className="font-semibold text-gray-900">{env.title}</p>
                    <p className="text-xs text-gray-600 mt-1">{env.description}</p>
                  </button>
                ))}
              </div>

              <div className="mt-6 p-4 bg-gray-100 border border-gray-300 rounded-lg text-sm text-gray-700 space-y-1">
                <p><span className="font-semibold text-gray-900">Project:</span> {formData.name || 'Untitled project'}</p>
                <p><span className="font-semibold text-gray-900">Repository:</span> {selectedRepo ? `${selectedRepo.owner}/${selectedRepo.name}` : 'None selected'}</p>
                <p><span className="font-semibold text-gray-900">Type:</span> {projectTypes.find((type) => type.id === projectType)?.label}</p>
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
              className="flex-1 bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
            >
              Create Project
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateProjectModal;
