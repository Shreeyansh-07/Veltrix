'use client';

import { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { projectsStore } from '@/lib/projects-store';
import { authStore } from '@/lib/auth-store';
import ProjectCard from '@/components/dashboard/project-card';
import CreateProjectModal from '@/components/dashboard/create-project-modal';
import { toast } from 'sonner';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [workspace, setWorkspace] = useState(null);

  useEffect(() => {
    const currentWorkspace = authStore.getWorkspace();
    setWorkspace(currentWorkspace);
    if (!currentWorkspace?.id) return;
    const allProjects = projectsStore.getProjects(currentWorkspace.id);
    setProjects(allProjects);
  }, []);

  const filteredProjects = projects.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleProjectCreated = (newProject) => {
    setProjects((prev) => [newProject, ...prev]);
    setShowCreateModal(false);
  };

  const handleDeleteProject = (projectId) => {
    if (!workspace?.id) return;
    projectsStore.deleteProject(workspace.id, projectId);
    setProjects((prev) => prev.filter((project) => project.id !== projectId));
    toast.success('Project deleted.');
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 z-40">
        <div className="max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
              <p className="text-gray-600 mt-1">Manage all services in {workspace?.name || 'your workspace'}</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors w-full sm:w-auto justify-center sm:justify-start"
            >
              <Plus size={20} />
              New Project
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8 max-w-7xl">
        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
            />
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} onDelete={handleDeleteProject} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-bold text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-600 mb-6">Create your first service to start deploying from GitHub.</p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors"
            >
              <Plus size={20} />
              Create Project
            </button>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">No projects match your search</p>
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <CreateProjectModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleProjectCreated}
        />
      )}
    </div>
  );
}
