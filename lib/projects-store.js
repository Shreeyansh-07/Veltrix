const PROJECTS_STORAGE_KEY = 'veltrix_projects';
const DEPLOYMENTS_STORAGE_KEY = 'veltrix_deployments';

const safeParse = (value, fallback) => {
  if (!value) return fallback;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

const readProjects = () => {
  if (typeof window === 'undefined') return [];
  return safeParse(localStorage.getItem(PROJECTS_STORAGE_KEY), []);
};

const readDeployments = () => {
  if (typeof window === 'undefined') return [];
  return safeParse(localStorage.getItem(DEPLOYMENTS_STORAGE_KEY), []);
};

const writeProjects = (projects) => {
  localStorage.setItem(PROJECTS_STORAGE_KEY, JSON.stringify(projects));
};

const writeDeployments = (deployments) => {
  localStorage.setItem(DEPLOYMENTS_STORAGE_KEY, JSON.stringify(deployments));
};

const normalizeProjectName = (name = '') => name.trim().toLowerCase();

const createPreviewDeployment = (workspaceId, project) => ({
  id: `dep_${crypto.randomUUID().slice(0, 8)}`,
  workspaceId,
  projectId: project.id,
  status: 'deployed',
  environment: project.environment,
  version: `1.0.${Math.floor(Math.random() * 9) + 1}`,
  commitSha: crypto.randomUUID().replace(/-/g, '').slice(0, 12),
  commitMessage: 'Initial deploy from dashboard setup',
  createdAt: new Date().toISOString(),
  runtime: `${(Math.random() * 3 + 1).toFixed(1)}s`,
  url: `https://${project.name}.keshavstack.tech`,
});

export const projectsStore = {
  getProjects(workspaceId) {
    const projects = readProjects();
    return workspaceId ? projects.filter((project) => project.workspaceId === workspaceId) : projects;
  },

  getProject(workspaceId, projectId) {
    const projects = this.getProjects(workspaceId);
    return projects.find((project) => project.id === projectId) || null;
  },

  createProject(workspaceId, project) {
    const projects = readProjects();
    const trimmedName = project.name.trim();
    const duplicated = projects.some(
      (item) => item.workspaceId === workspaceId && normalizeProjectName(item.name) === normalizeProjectName(trimmedName)
    );

    if (duplicated) {
      return { error: 'A project with this name already exists in your workspace.' };
    }

    const now = new Date().toISOString();
    const nextProject = {
      ...project,
      id: `proj_${crypto.randomUUID().slice(0, 8)}`,
      workspaceId,
      name: trimmedName,
      createdAt: now,
      updatedAt: now,
      status: 'active',
      envVars: project.envVars || [],
    };

    projects.push(nextProject);
    writeProjects(projects);

    const deployments = readDeployments();
    deployments.unshift(createPreviewDeployment(workspaceId, nextProject));
    writeDeployments(deployments);

    return { project: nextProject };
  },

  updateProject(workspaceId, projectId, updates) {
    const projects = readProjects();
    const currentProject = projects.find((project) => project.id === projectId && project.workspaceId === workspaceId);
    if (!currentProject) return { error: 'Project not found.' };

    const requestedName = updates.name?.trim();
    if (requestedName && normalizeProjectName(requestedName) !== normalizeProjectName(currentProject.name)) {
      const duplicated = projects.some(
        (project) =>
          project.id !== projectId &&
          project.workspaceId === workspaceId &&
          normalizeProjectName(project.name) === normalizeProjectName(requestedName)
      );
      if (duplicated) {
        return { error: 'A project with this name already exists in your workspace.' };
      }
    }

    const nextProjects = projects.map((project) => {
      if (project.id !== projectId || project.workspaceId !== workspaceId) return project;
      return {
        ...project,
        ...updates,
        name: requestedName || project.name,
        updatedAt: new Date().toISOString(),
      };
    });

    writeProjects(nextProjects);
    const updatedProject = nextProjects.find((project) => project.id === projectId);
    return { project: updatedProject };
  },

  deleteProject(workspaceId, projectId) {
    const projects = readProjects();
    const deployments = readDeployments();
    const nextProjects = projects.filter((project) => !(project.workspaceId === workspaceId && project.id === projectId));
    const nextDeployments = deployments.filter(
      (deployment) => !(deployment.workspaceId === workspaceId && deployment.projectId === projectId)
    );
    writeProjects(nextProjects);
    writeDeployments(nextDeployments);
  },

  getDeployments(workspaceId) {
    const deployments = readDeployments();
    return workspaceId ? deployments.filter((deployment) => deployment.workspaceId === workspaceId) : deployments;
  },

  getProjectDeployments(workspaceId, projectId) {
    return this.getDeployments(workspaceId).filter((deployment) => deployment.projectId === projectId);
  },

  createDeployment(workspaceId, deployment) {
    const deployments = readDeployments();
    const nextDeployment = {
      ...deployment,
      id: `dep_${crypto.randomUUID().slice(0, 8)}`,
      workspaceId,
      createdAt: new Date().toISOString(),
      status: deployment.status || 'deploying',
    };
    deployments.unshift(nextDeployment);
    writeDeployments(deployments);
    return nextDeployment;
  },

  updateDeployment(workspaceId, deploymentId, updates) {
    const deployments = readDeployments();
    let updatedDeployment = null;
    const nextDeployments = deployments.map((deployment) => {
      if (deployment.id !== deploymentId || deployment.workspaceId !== workspaceId) return deployment;
      updatedDeployment = { ...deployment, ...updates };
      return updatedDeployment;
    });
    writeDeployments(nextDeployments);
    return updatedDeployment;
  },
};
