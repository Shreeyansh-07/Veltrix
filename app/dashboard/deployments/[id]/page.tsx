'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { subscribeToAnalyticsStream, getAnalyticsSnapshot, AnalyticsMetrics } from '../../../../services/analytics';
import { getAppLogs, getDeploymentDetails } from '../../../../services/deployments';
import { Activity, Server, Cpu, Database, ChevronLeft, ExternalLink, ScrollText } from 'lucide-react';
import { toast } from 'sonner';

export default function DeploymentDashboard({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const deploymentId = resolvedParams.id;
  const [deployment, setDeployment] = useState<any>(null);
  const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null);
  const [pods, setPods] = useState<any[]>([]);
  const [resources, setResources] = useState<any>(null);
  const [scaling, setScaling] = useState<any>(null);
  const [logs, setLogs] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // 1. Initial Data Load
    getDeploymentDetails(deploymentId)
      .then((data) => {
        setDeployment(data.deployment);
        setPods(data.pods || []);
        setResources(data.resources || null);
        setScaling(data.scaling || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        toast.error('Failed to load deployment details');
        setLoading(false);
      });

    // We can still get realtime stream snapshot and stream 
    getAnalyticsSnapshot(deploymentId)
      .then((data) => setMetrics(data.metrics))
      .catch(console.error);

    getAppLogs(deploymentId, 100)
      .then((data) => setLogs(data.application_logs || data.logs || ''))
      .catch(console.error);

    // 2. Setup real-time updates via SSE
    let eventSource: EventSource | null = null;
    
    subscribeToAnalyticsStream(
      deploymentId,
      (data) => {
        if(data.metrics) setMetrics(data.metrics);
        // Sometimes full payload comes via stream, or just metrics. We update what we can.
        setIsConnected(true);
      },
      (error) => {
        console.error('Stream dropped');
        setIsConnected(false);
      }
    ).then(es => { eventSource = es; setIsConnected(true); });

    // Cleanup: close stream on component unmount
    return () => {
      if (eventSource) eventSource.close();
    };
  }, [deploymentId]);

  if (loading) return (
    <div className="flex bg-[#f5f5f7] min-h-screen items-center justify-center p-8">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
        <div className="text-gray-600 font-medium text-lg">Loading deployment...</div>
      </div>
    </div>
  );

  if (!deployment) return (
    <div className="flex bg-[#f5f5f7] min-h-screen items-center justify-center p-8">
      <div className="text-gray-900 text-lg">Deployment not found.</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f5f7] pb-12">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/deployments" className="text-gray-500 hover:text-gray-800 transition-colors">
              <ChevronLeft size={24} />
            </Link>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">{deployment.subdomain}</h1>
                <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${deployment.status === 'running' ? 'bg-green-50 border-green-200 text-green-700' : deployment.status === 'failed' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-blue-50 border-blue-200 text-blue-700'}`}>
                  {deployment.status}
                </span>
                <span className="px-2.5 py-1 bg-purple-50 text-purple-700 border border-purple-200 rounded-full text-xs font-medium uppercase">
                  {deployment.package}
                </span>
              </div>
              <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
                <a href={deployment.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-purple-600 transition-colors" title="Open App">
                  <ExternalLink size={14} />
                  {deployment.url}
                </a>
                <span className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                  {isConnected ? 'Live metrics' : 'Metrics disconnected'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 mt-8 max-w-7xl mx-auto space-y-6">

        {/* Top Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
              <Activity size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Requests (24h)</p>
              <h3 className="text-2xl font-bold text-gray-900">{metrics?.requests?.last_24h || 0}</h3>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
              <Server size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Pods</p>
              <h3 className="text-2xl font-bold text-gray-900">{metrics?.pods?.current || pods?.length || 0} / {metrics?.pods?.desired || scaling?.desired_pods || 0}</h3>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
              <Cpu size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">CPU Usage</p>
              <h3 className="text-2xl font-bold text-gray-900">{metrics?.resources?.cpu_usage_percent?.toFixed(1) || 0}%</h3>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Database size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Memory Usage</p>
              <h3 className="text-2xl font-bold text-gray-900">{metrics?.resources?.memory_usage_mb?.toFixed(0) || 0} MB</h3>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pods Table */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-lg font-bold text-gray-900">Pod Status</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 text-sm text-gray-500 bg-white">
                      <th className="p-4 font-medium">Pod Name</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">Restarts</th>
                      <th className="p-4 font-medium">Age</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {pods && pods.length > 0 ? pods.map((pod, i) => (
                      <tr key={i} className="border-b border-gray-100 text-sm hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-mono text-gray-700">{pod.pod_name}</td >
                        <td className="p-4">
                           <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${pod.status === 'Running' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                             <div className={`w-1.5 h-1.5 rounded-full ${pod.status === 'Running' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                             {pod.status}
                           </span>
                        </td>
                        <td className="p-4 text-gray-600">{pod.restarts}</td>
                        <td className="p-4 text-gray-600">{pod.age}</td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-gray-500 border-none">No pods found or loading...</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Application Logs */}
            <div className="bg-[#0f0f11] rounded-xl shadow-sm border border-gray-800 overflow-hidden flex flex-col h-[400px]">
              <div className="px-5 py-3 border-b border-gray-800 flex items-center justify-between bg-black/50">
                <div className="flex items-center gap-2 text-gray-300">
                  <ScrollText size={16} />
                  <h2 className="text-sm font-semibold tracking-wide">Application Logs</h2>
                </div>
              </div>
              <div className="p-4 overflow-y-auto flex-1 font-mono text-sm leading-relaxed text-gray-300">
                {logs ? (
                  logs.split('\\n').map((line, i) => (
                    <div key={i} className="py-0.5 break-words hover:bg-white/5 px-2 rounded -mx-1">
                      {line}
                    </div>
                  ))
                ) : (
                  <div className="text-gray-500 italic">Waiting for logs...</div>
                )}
              </div>
            </div>
          </div>

          {/* Right column: Resources */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Resource Allocation</h2>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-medium text-gray-700">CPU Usage</span>
                    <span className="text-xs text-gray-500 font-mono">{resources?.cpu_usage_milli || 0}m / {resources?.cpu_limit_milli || 0}m</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${Math.min(resources?.cpu_usage_percent || 0, 100)}%` }}></div>
                  </div>
                  <p className="mt-2 text-xs text-right text-gray-500">{resources?.cpu_usage_percent?.toFixed(1) || 0}% used</p>
                </div>

                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-medium text-gray-700">Memory Usage</span>
                    <span className="text-xs text-gray-500 font-mono">{resources?.memory_usage_mb || 0} MB / {resources?.memory_limit_mb || 0} MB</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div className="bg-emerald-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${Math.min(resources?.memory_usage_percent || 0, 100)}%` }}></div>
                  </div>
                  <p className="mt-2 text-xs text-right text-gray-500">{resources?.memory_usage_percent?.toFixed(1) || 0}% used</p>
                </div>
              </div>
            </div>

            {scaling && (
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Scaling Config</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between pb-3 border-b border-gray-100">
                    <span className="text-gray-500">Mode</span>
                    <span className="font-medium text-gray-900 capitalize">{scaling.mode || 'Horizontal'}</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-gray-100">
                    <span className="text-gray-500">Replicas Range</span>
                    <span className="font-medium text-gray-900">{scaling.min_replicas || 1} - {scaling.max_replicas || 1}</span>
                  </div>
                  <div className="flex justify-between pb-3 border-b border-gray-100">
                    <span className="text-gray-500">Target CPU</span>
                    <span className="font-medium text-gray-900">{scaling.cpu_target_utilization || 50}%</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-gray-500">HPA Enabled</span>
                    <span className={`font-medium ${scaling.hpa_enabled ? 'text-green-600' : 'text-gray-900'}`}>
                      {scaling.hpa_enabled ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}