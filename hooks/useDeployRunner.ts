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

      // Start polling
      const pollInterval = setInterval(async () => {
        try {
          const all = await listDeployments();
          const current = all.find((d) => d.deployment_id === deploymentId);

          if (current) {
            setStatus(current.status);
            
            if (current.status === 'running' || current.status === 'failed') {
              clearInterval(pollInterval);
              setIsDeploying(false);
              setDeploymentData(current);
            }
          }
        } catch (pollErr: any) {
          clearInterval(pollInterval);
          setError(pollErr.message);
          setIsDeploying(false);
        }
      }, 3000); // poll every 3 seconds
      
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