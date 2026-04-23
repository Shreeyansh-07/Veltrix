export const projectTypes = [
  {
    id: 'static-site',
    label: 'Static Site',
    subtitle: 'HTML, Next export, Vite, Astro',
    defaults: {
      buildCommand: 'npm run build',
      publishDirectory: 'dist',
      startCommand: '',
    },
  },
  {
    id: 'web-service',
    label: 'Web Service',
    subtitle: 'Node, Python, Go, Ruby APIs',
    defaults: {
      buildCommand: 'npm install',
      publishDirectory: '',
      startCommand: 'npm start',
    },
  },
  {
    id: 'background-worker',
    label: 'Background Worker',
    subtitle: 'Queue consumers and async jobs',
    defaults: {
      buildCommand: 'npm install',
      publishDirectory: '',
      startCommand: 'npm run worker',
    },
  },
  {
    id: 'cron-job',
    label: 'Cron Job',
    subtitle: 'Scheduled jobs and periodic tasks',
    defaults: {
      buildCommand: 'npm install',
      publishDirectory: '',
      startCommand: 'npm run cron',
    },
  },
  {
    id: 'n8n',
    label: 'n8n Workflow',
    subtitle: 'Automations and workflow orchestration',
    defaults: {
      buildCommand: 'docker pull n8nio/n8n:latest',
      publishDirectory: '',
      startCommand: 'n8n start',
    },
  },
  {
    id: 'private-service',
    label: 'Private Service',
    subtitle: 'Internal service on private network',
    defaults: {
      buildCommand: 'npm install',
      publishDirectory: '',
      startCommand: 'npm start',
    },
  },
];

export const mockGithubRepos = [
  {
    id: 'repo_1',
    name: 'marketing-site',
    owner: 'team-velocity',
    updatedAt: '2h ago',
    branch: 'main',
  },
  {
    id: 'repo_2',
    name: 'payments-api',
    owner: 'team-velocity',
    updatedAt: '4h ago',
    branch: 'main',
  },
  {
    id: 'repo_3',
    name: 'worker-jobs',
    owner: 'team-velocity',
    updatedAt: '1d ago',
    branch: 'develop',
  },
  {
    id: 'repo_4',
    name: 'sales-dashboard',
    owner: 'team-velocity',
    updatedAt: '3d ago',
    branch: 'main',
  },
];

export const environments = [
  {
    id: 'development',
    title: 'Development',
    description: 'Fast iteration and previews for active feature work.',
  },
  {
    id: 'staging',
    title: 'Staging',
    description: 'Pre-production verification with production-like settings.',
  },
  {
    id: 'production',
    title: 'Production',
    description: 'Public live traffic with strict reliability expectations.',
  },
];

export const deployPackages = [
  {
    id: 'small',
    title: 'Small',
    description: '0.5 CPU Cores, 512 MB Memory — perfect for small apps and test projects.',
  },
  {
    id: 'medium',
    title: 'Medium',
    description: '1.0 CPU Cores, 1 GB Memory — ideal for production web applications.',
  },
  {
    id: 'large',
    title: 'Large',
    description: '2.0 CPU Cores, 2 GB Memory — designed for heavy workloads and intensive tasks.',
  },
];
