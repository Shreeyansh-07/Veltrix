import { useState, useCallback } from 'react';
import { createDeployment, listDeployments, DeploymentPayload, DeployResponse, DeploymentInfo } from '../services/deployments';

export function useDeployRunner() {
  const [isDeploying, setIsDeploying] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deploymentData, setDeploymentData] = useState<DeployResponse | DeploymentInfo | null>(null);

  const startDeployment = useCallback(async (payload: DeploymentPayload) => {
    setIsDeploying(true);
    setStatus('initializing');
    setError(null);

    try {
      const deployRes = await createDeployment(payload);
      const deploymentId = deployRes.deployment_id;
      setDeploymentData(deployRes);
      setIsDeploying(false);
      return deployRes;
    } catch (err: any) {
      setError(err.message);
      setIsDeploying(false);
      setStatus('failed');
      throw err;
    }
  }, []);

  return { startDeployment, isDeploying, status, error, deploymentData };
}