'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { fetchWithAuth } from '@/lib/api-client';

export default function DeploymentLayout(props) {
  const params = use(props.params);
  const id = params?.id;
  const pathname = usePathname();
  const [deployment, setDeployment] = useState(null);

  useEffect(() => {
     if(!id) return;
     fetchWithAuth(`/deployments/${id}`).then(res => setDeployment(res.deployment)).catch(console.error);
  }, [id]);

  const tabs = [
    { name: 'Overview', href: `/dashboard/deployments/${id}` },
    { name: 'App Logs', href: `/dashboard/deployments/${id}/app-logs` },
    { name: 'Build Logs', href: `/dashboard/deployments/${id}/build-logs` },
    { name: 'Analytics', href: `/dashboard/deployments/${id}/analytics` },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-8 pt-6 z-40 shadow-sm">
        <div className="max-w-7xl">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{deployment?.subdomain || id}</h1>
              <p className="text-gray-500 mt-1">Manage this deployment</p>
            </div>
            <div className="flex items-center gap-2">
               {deployment?.status === 'running' ? (
                  <span className="px-3 py-1 bg-green-100 text-green-700 border border-green-200 rounded-full text-sm font-semibold tracking-wide flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-green-500 block"></span> Active
                  </span>
               ) : deployment?.status ? (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 border border-blue-200 rounded-full text-sm font-semibold tracking-wide uppercase">
                     {deployment.status}
                  </span>
               ) : null}
            </div>
          </div>
          {/* Tabs */}
          <div className="flex gap-6 border-b border-transparent">
            {tabs.map(tab => {
              const active = pathname === tab.href;
              return (
                <Link key={tab.href} href={tab.href} className={`pb-3 text-sm font-medium border-b-2 transition-colors ${active ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300'}`}>
                   {tab.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="p-8 max-w-7xl">
        {props.children}
      </div>
    </div>
  );
}