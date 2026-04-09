'use client';

import { useEffect, useState } from 'react';
import { getPlatformAnalytics } from '@/services/analytics';
import { Server, Activity, Users, Database, Layers, Cpu } from 'lucide-react';
import { toast } from 'sonner';

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlatformAnalytics()
      .then((data) => {
        setAnalytics(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load platform analytics', err);
        toast.error('Failed to load platform analytics');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex bg-[#f5f5f7] min-h-screen items-center justify-center p-8">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-gray-600 font-medium text-lg">Loading platform analytics...</div>
        </div>
      </div>
    );
  }

  // Use default zero values if API doesn't return data
  const stats = analytics || {
    workers: { total: 0, online: 0, offline: 0, busy: 0, idle: 0 },
    deployments: { total: 0, running: 0, building: 0, failed: 0, stopped: 0 },
    resources: { total_cpu_cores: 0, used_cpu_cores: 0, cpu_utilization_percent: 0, total_memory_gb: 0, used_memory_gb: 0, memory_utilization_percent: 0 },
    pods: { total: 0, running: 0, pending: 0, failed: 0 },
    last_updated: new Date().toISOString()
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7] pb-12">
      <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 z-40">
        <div className="max-w-7xl">
          <h1 className="text-3xl font-bold text-gray-900">Platform Analytics</h1>     
          <p className="text-gray-600 mt-1">System-wide metrics and cluster utilization</p>
        </div>
      </div>

      <div className="px-8 mt-8 max-w-7xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Cluster Overview</h2>
          <span className="text-sm text-gray-500">
            Last updated: {new Date(stats.last_updated).toLocaleString()}
          </span>
        </div>

        {/* Resources Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 font-medium text-sm">Total Deployments</h3>
              <Layers className="text-purple-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.deployments?.total || 0}</p>
            <div className="mt-2 text-sm text-gray-600 flex items-center gap-4">
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500"></div>{stats.deployments?.running || 0} Running</span>
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-yellow-500"></div>{stats.deployments?.building || 0} Building</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 font-medium text-sm">Active Pods</h3>
              <Activity className="text-blue-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.pods?.total || 0}</p>
            <div className="mt-2 text-sm text-gray-600 flex items-center gap-4">
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500"></div>{stats.pods?.running || 0} Running</span>
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500"></div>{stats.pods?.failed || 0} Failed</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
             <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 font-medium text-sm">Worker Nodes</h3>
              <Server className="text-amber-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{stats.workers?.total || 0}</p>
            <div className="mt-2 text-sm text-gray-600 flex items-center gap-4">
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-green-500"></div>{stats.workers?.online || 0} Online</span>
              <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-500"></div>{stats.workers?.busy || 0} Busy</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-500 font-medium text-sm">Failed Deployments</h3>
              <Activity className="text-red-500" size={24} />
            </div>
            <p className="text-3xl font-bold text-red-600">{stats.deployments?.failed || 0}</p>
            <div className="mt-2 text-sm text-gray-600">
              Needs attention: {stats.deployments?.failed || 0}
            </div>
          </div>
        </div>

        {/* Resource Allocation View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <Cpu className="text-indigo-600" size={24} />
              <h2 className="text-lg font-bold text-gray-900">CPU Allocation</h2>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between items-end mb-2">
                <span className="text-4xl font-bold text-gray-900">{stats.resources?.cpu_utilization_percent?.toFixed(1) || 0}%</span>
                <span className="text-sm font-medium text-gray-500">
                  {stats.resources?.used_cpu_cores?.toFixed(1) || 0} / {stats.resources?.total_cpu_cores?.toFixed(1) || 0} Cores
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden mb-4">
                <div className="bg-indigo-600 h-4 rounded-full" style={{ width: `${Math.min(stats.resources?.cpu_utilization_percent || 0, 100)}%` }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Overall CPU consumption across all active worker nodes.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <Database className="text-emerald-600" size={24} />
              <h2 className="text-lg font-bold text-gray-900">Memory Allocation</h2>
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between items-end mb-2">
                <span className="text-4xl font-bold text-gray-900">{stats.resources?.memory_utilization_percent?.toFixed(1) || 0}%</span>
                <span className="text-sm font-medium text-gray-500">
                  {stats.resources?.used_memory_gb?.toFixed(1) || 0} / {stats.resources?.total_memory_gb?.toFixed(1) || 0} GB
                </span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden mb-4">
                <div className="bg-emerald-600 h-4 rounded-full" style={{ width: `${Math.min(stats.resources?.memory_utilization_percent || 0, 100)}%` }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Overall RAM usage across the MeshVPN host pool.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}