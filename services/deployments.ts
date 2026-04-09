import { fetchWithAuth } from '../lib/api-client';

export interface DeploymentPayload {
  repo: string;
  port?: number;
  subdomain?: string;
  package?: 'small' | 'medium' | 'large';
  cpu_cores?: number;
  memory_mb?: number;
  scaling_mode?: string;
  min_replicas?: number;
  max_replicas?: number;
  cpu_target_utilization?: number;
  cpu_request_milli?: number;
  cpu_limit_milli?: number;
  node_selector?: Record<string, string>;
  env?: Record<string, string>;
  build_args?: Record<string, string>;
}

export interface DeployResponse {
  deployment_id: string;
  message: string;
  status: string;
  url: string;
  subdomain: string;
  repo: string;
  port: number;
  package: string;
  scaling_mode: string;
  min_replicas: number;
  max_replicas: number;
  cpu_cores: number;
  memory_mb: number;
  cpu_target_utilization: number;
  autoscaling_enabled: boolean;
}

export interface DeploymentInfo {
  deployment_id: string;
  package: string;
  port: number;
  repo: string;
  scaling_mode: string;
  status: string;
  subdomain: string;
}

export async function createDeployment(payload: DeploymentPayload): Promise<DeployResponse> {
  return fetchWithAuth('/deploy', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function listDeployments(): Promise<DeploymentInfo[]> {
  const data = await fetchWithAuth('/deployments');
  return data.deployments || [];
}

export async function getBuildLogs(deploymentId: string) {
  return fetchWithAuth(`/deployments/${deploymentId}/build-logs`);
}

export async function getAppLogs(deploymentId: string, tail: number = 200) {
  return fetchWithAuth(`/deployments/${deploymentId}/app-logs?tail=${tail}`);
}

export async function getDeploymentDetails(deploymentId: string) {
  return fetchWithAuth(`/deployments/${deploymentId}`);
}