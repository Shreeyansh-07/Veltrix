'use client';

import { use, useEffect, useState } from 'react';
import { fetchWithAuth } from '@/lib/api-client';
import { Loader2, Globe, Github, Server, Calendar } from 'lucide-react';

export default function DeploymentOverviewPage(props) {
  const params = use(props.params);
  const id = params?.id;
  const [deployment, setDeployment] = useState(null);

  useEffect(() => {
    if (!id || id === 'undefined') return;
    fetchWithAuth(`/deployments/${id}`).then(res => setDeployment(res.deployment)).catch(console.error);
  }, [id]);

  if (!deployment) {
     return (
       <div className="flex justify-center items-center h-32">
         <Loader2 className="animate-spin text-gray-400" size={32} />
       </div>
     );
  }

  return (
    <div className="space-y-6">
       <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col sm:flex-row gap-8 items-center justify-between">
          <div className="aspect-video w-full max-w-sm rounded border border-gray-100 bg-gray-50 flex items-center justify-center overflow-hidden relative shadow-inner">
             {deployment.status === 'running' ? (
                <iframe src={`https://${deployment.subdomain}.keshavstack.tech`} className="absolute top-0 left-0 border-0 origin-top-left pointer-events-none" style={{ width: '1280px', height: '720px', transform: 'scale(0.3)' }} />
             ) : (
                <div className="text-gray-400 font-medium tracking-wide p-4">Deployment Preview</div>
             )}
          </div>
          <div className="flex-1 space-y-4 w-full">
            <div>
               <p className="text-sm text-gray-500 font-semibold mb-1">Domains</p>
               <a href={`https://${deployment.subdomain}.keshavstack.tech`} target="_blank" rel="noreferrer" className="text-black font-semibold hover:underline flex items-center gap-2">
                 <Globe size={16} /> {deployment.subdomain}.keshavstack.tech
               </a>
            </div>
            <div>
               <p className="text-sm text-gray-500 font-semibold mb-1">State</p>
               <div className="font-bold flex items-center gap-2 capitalize">
                 <span className={`w-2 h-2 rounded-full ${deployment.status === 'running' ? 'bg-green-500' : 'bg-blue-500 animate-pulse'}`}></span> {deployment.status}
               </div>
            </div>
            {deployment.repo && (
              <div>
                 <p className="text-sm text-gray-500 font-semibold mb-1">Repository</p>
                 <span className="text-black font-semibold flex items-center gap-2">
                   <Github size={16} /> {deployment.repo}
                 </span>
              </div>
            )}
            <div className="flex items-center gap-4 text-sm text-gray-500 border-t border-gray-100 pt-4 mt-4">
               <span className="flex items-center gap-1"><Server size={14}/> Runtime: Container</span>
               <span className="flex items-center gap-1"><Calendar size={14}/> Updated: {new Date(deployment.updated_at || Date.now()).toLocaleDateString()}</span>
            </div>
          </div>
       </div>
    </div>
  );
}