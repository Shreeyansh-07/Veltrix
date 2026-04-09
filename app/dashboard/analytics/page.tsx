'use client';

import { useEffect, useState, useRef } from 'react';
import { Layers, Activity, Server, ArrowUpRight, Globe, Router, Clock, RefreshCw, Settings, MoreVertical, AlertTriangle, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { getUserAnalytics } from '@/services/analytics';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, LineChart, Line, ComposedChart
} from 'recharts';

export default function UserAnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [trafficSeries, setTrafficSeries] = useState<any[]>([]);
  const [latencySeries, setLatencySeries] = useState<any[]>([]);
  
  const historyRef = useRef<{ traffic: any[], latency: any[] }>({ traffic: [], latency: [] });

  const fetchAnalytics = () => {
    setRefreshing(true);
    getUserAnalytics()
      .then((data) => {
        setAnalytics(data);
        
        const deps = data.deployments || [];
        let totalP50 = 0, totalP90 = 0, totalP99 = 0, activeLatencies = 0;
        
        deps.forEach((d: any) => {
          if (d.metrics && d.metrics.latency_p50_ms) {
            totalP50 += d.metrics.latency_p50_ms;
            totalP90 += (d.metrics.latency_p90_ms || d.metrics.latency_p50_ms);
            totalP99 += (d.metrics.latency_p99_ms || d.metrics.latency_p50_ms);
            activeLatencies++;
          }
        });

        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        
        const avgP50 = activeLatencies > 0 ? (totalP50 / activeLatencies) : 0;
        const avgP90 = activeLatencies > 0 ? (totalP90 / activeLatencies) : 0;
        const avgP99 = activeLatencies > 0 ? (totalP99 / activeLatencies) : 0;
        
        const reqLastHour = data.summary?.requests_last_hour || 0;
        const currentRPS = reqLastHour / 3600;

        const newTrafficPoint = { time, value: currentRPS };
        const newLatencyPoint = { time, p50: avgP50, p90: avgP90, p99: avgP99 };

        let newTraffic = [...historyRef.current.traffic, newTrafficPoint];
        let newLatency = [...historyRef.current.latency, newLatencyPoint];

        if (newTraffic.length > 24) newTraffic.shift();
        if (newLatency.length > 24) newLatency.shift();

        if (newTraffic.length === 1) {
          const paddedTraffic = Array(23).fill({ time: '', value: 0 });
          const paddedLatency = Array(23).fill({ time: '', p50: 0, p90: 0, p99: 0 });
          newTraffic = [...paddedTraffic, newTrafficPoint];
          newLatency = [...paddedLatency, newLatencyPoint];
        }

        historyRef.current.traffic = newTraffic;
        historyRef.current.latency = newLatency;

        setTrafficSeries(newTraffic);
        setLatencySeries(newLatency);
      })
      .catch((err) => {
        console.error('Failed to load user analytics', err);
        toast.error('Failed to fetch analytics data');
        setAnalytics(null);
      })
      .finally(() => {
        setLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchAnalytics();
    
    // Poll every 30s
    const interval = setInterval(() => {
      fetchAnalytics();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading && !analytics) {
    return (
      <div className="flex bg-[#f5f5f7] min-h-[calc(100vh-2rem)] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-gray-500 font-medium text-sm">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  const summary = analytics?.summary || {};

  const formatBytes = (bytes: number) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatNumber = (num: number) => {
    if (!num) return '0';
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="min-h-full bg-[#f5f5f7] text-gray-800 font-sans pb-10">
      {/* Top Navigation Bar perfectly matched to UI theme */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-10 w-full transition-colors">
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center justify-center w-8 h-8 bg-blue-50 dark:bg-blue-900/40 rounded-lg shadow-sm border border-blue-100 dark:border-blue-800 shrink-0">
            <Activity size={16} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900 leading-tight">User Analytics</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <div className="flex items-center gap-1 text-[11px] text-gray-500">
                <Layers size={12} className="opacity-80"/> MeshVPN Control Plane
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 text-sm font-medium">
          <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden transition-colors">
            <button className="px-3 py-2 hover:bg-gray-50 text-gray-700 border-r border-gray-200 flex items-center gap-1.5 transition-colors">
              <Clock size={14} className="text-gray-500"/> <span className="hidden sm:inline">Last 24 hours</span>
            </button>
            <button className="px-3 py-2 hover:bg-gray-50 text-gray-700 flex items-center gap-1.5 transition-colors"
                onClick={fetchAnalytics} disabled={refreshing}>
              <RefreshCw size={14} className={`text-gray-500 ${refreshing ? 'animate-spin' : ''}`}/>
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button className="px-3 py-2 hover:bg-gray-50 text-gray-500 border-l border-gray-200 transition-colors">
              <span className="flex items-center gap-1">30s <ChevronDown size={12}/></span>
            </button>
          </div>
        </div>
      </div>

      <div className="p-6 max-w-[1800px] mx-auto space-y-6">
        {/* Key Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <GrafanaStatPanel 
            title="Total Requests (1h)" 
            value={formatNumber(summary.requests_last_hour)}
            color="#2563eb" 
          />
          <GrafanaStatPanel 
            title="Active Deployments" 
            value={`${summary.deployments_running || 0} / ${summary.deployments_total || 0}`}
            subText={summary.deployments_failed > 0 ? `${summary.deployments_failed} Failed` : undefined}
            color={summary.deployments_failed > 0 ? "#ef4444" : "#16a34a"} 
          />
          <GrafanaStatPanel 
            title="Bandwidth Sent (24h)" 
            value={formatBytes(summary.bandwidth_sent_bytes)}
            color="#f59e0b" 
          />
          <GrafanaStatPanel 
            title="Bandwidth Received" 
            value={formatBytes(summary.bandwidth_recv_bytes)}
            color="#d946ef" 
          />
          <GrafanaStatPanel 
            title="Provisioned Pods" 
            value={`${summary.pods_current || 0}`}
            subText={`Desired: ${summary.pods_desired || 0}`}
            color="#16a34a" 
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1">
          <GrafanaChartPanel title="Edge Traffic Rate (Requests per second)" icon={<Globe size={14}/>}>
            <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficSeries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" vertical={false} />
                  <XAxis dataKey="time" className="stroke-gray-400" tick={{fontSize: 11}} tickLine={false} axisLine={false} minTickGap={30} />
                  <YAxis className="stroke-gray-400" tick={{fontSize: 11}} tickLine={false} axisLine={false} tickFormatter={(val) => Math.abs(val) > 999 ? (val/1000).toFixed(1) + 'k' : val} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card, #ffffff)', borderColor: 'var(--border, #e5e7eb)', borderRadius: '6px', fontSize: '12px', color: 'var(--foreground, #111)' }}
                  />
                  <Area type="stepAfter" dataKey="value" name="Req/Sec" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorTraffic)" activeDot={{r: 4, strokeWidth: 0, fill: '#1d4ed8'}} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GrafanaChartPanel>

          <GrafanaChartPanel title="Latency Distribution (P50/P90/P99)" icon={<Activity size={14}/>}>
            <div className="h-[250px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={latencySeries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-800" vertical={false} />
                  <XAxis dataKey="time" className="stroke-gray-400" tick={{fontSize: 11}} tickLine={false} axisLine={false} minTickGap={30} />
                  <YAxis className="stroke-gray-400" tick={{fontSize: 11}} tickLine={false} axisLine={false} unit="ms" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--card, #ffffff)', borderColor: 'var(--border, #e5e7eb)', borderRadius: '6px', fontSize: '12px', color: 'var(--foreground, #111)' }}
                  />
                  <Area type="stepAfter" dataKey="p50" name="P50" stroke="#16a34a" strokeWidth={2} fill="#16a34a" fillOpacity={0.05} />
                  <Line type="stepAfter" dataKey="p90" name="P90" stroke="#eab308" strokeWidth={2} dot={false} activeDot={{r: 4}} />
                  <Line type="stepAfter" dataKey="p99" name="P99" stroke="#ef4444" strokeWidth={2} dot={false} activeDot={{r: 4}} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </GrafanaChartPanel>
        </div>

        {/* Deployment Details Table (Panel) */}
        <GrafanaChartPanel title="Deployments Resource Allocation" icon={<Server size={14}/>} noPadding>
          <div className="overflow-x-auto min-h-[250px] rounded-b-lg">
            <table className="w-full text-sm text-left">
              <thead className="text-[11px] text-gray-500 bg-gray-50 uppercase border-b border-gray-200">
                <tr>
                  <th className="px-5 py-4 font-semibold">Deployment / Subdomain</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 text-right font-semibold">Requests (1h)</th>
                  <th className="px-5 py-4 text-right font-semibold">Bandwidth</th>
                  <th className="px-5 py-4 text-right font-semibold">Latency (P50)</th>
                  <th className="px-5 py-4 text-right font-semibold">CPU / RAM</th>
                  <th className="px-5 py-4 text-right font-semibold">Pods</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {(analytics?.deployments || []).map((dep: any) => (
                  <tr key={dep.deployment_id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer">
                    <td className="px-5 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900">{dep.subdomain}</span>
                        <a href={dep.url} target="_blank" rel="noreferrer" className="text-[11px] text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1 mt-0.5">
                          {dep.url || 'No URL available'} <ArrowUpRight size={10} />
                        </a>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-semibold border uppercase tracking-wider ${
                        dep.status === 'running' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20' : 
                        dep.status === 'failed' ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20' : 
                        'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20'
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dep.status === 'running' ? 'bg-green-500' : dep.status === 'failed' ? 'bg-red-500' : 'bg-amber-500'}`}></div>
                        {dep.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right font-mono text-gray-600 text-[13px]">
                      {dep.metrics ? formatNumber(dep.metrics.requests_last_hour) : '-'}
                    </td>
                    <td className="px-5 py-4 text-right font-mono text-gray-600 text-[13px]">
                      {dep.metrics ? formatBytes((dep.metrics.bandwidth_sent_bytes || 0) + (dep.metrics.bandwidth_recv_bytes || 0)) : '-'}
                    </td>
                    <td className="px-5 py-4 text-right font-mono text-gray-600 text-[13px]">
                      {dep.metrics?.latency_p50_ms !== undefined ? `${dep.metrics.latency_p50_ms.toFixed(1)}ms` : '-'}
                    </td>
                    <td className="px-5 py-4 text-right font-mono text-gray-600 text-[13px]">
                      {dep.metrics?.cpu_usage_percent !== undefined ? `${(dep.metrics.cpu_usage_percent * 100).toFixed(0)}% / ${dep.metrics.memory_usage_mb}MB` : '-'}
                    </td>
                    <td className="px-5 py-4 text-right font-mono text-gray-600 text-[13px]">
                      {dep.metrics?.current_pods !== undefined ? `${dep.metrics.current_pods} / ${dep.metrics.desired_pods}` : '-'}
                    </td>
                  </tr>
                ))}
                {(!analytics?.deployments || analytics.deployments.length === 0) && (
                  <tr>
                    <td colSpan={7} className="px-5 py-10 text-center text-gray-500 text-sm">
                      No deployments recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </GrafanaChartPanel>
      </div>
    </div>
  );
}

function GrafanaStatPanel({ title, value, subText, color }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm relative group hover:border-gray-300 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{title}</h3>
      </div>
      <div className="mt-1 flex flex-col">
        <div className="text-3xl font-extrabold tracking-tight text-gray-900" style={{ color: color === '#ef4444' ? color : undefined }}>
          {value || '0'}
        </div>
        <div className="flex items-center gap-2 mt-2 min-h-[16px]">
          {subText && (
            <span className="text-[12px] font-medium text-gray-500">{subText}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function GrafanaChartPanel({ title, icon, children, noPadding = false }: any) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col group hover:border-gray-300 hover:shadow-md transition-all h-full">
      <div className="px-5 py-4 border-b border-gray-100 flex justify-between items-center bg-white rounded-t-xl transition-colors">
        <div className="flex items-center gap-2">
           <span className="text-gray-400">{icon}</span>
           <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1.5 text-gray-400 hover:text-gray-700 rounded-md hover:bg-gray-100 transition-colors"><RefreshCw size={14}/></button>
          <button className="p-1.5 text-gray-400 hover:text-gray-700 rounded-md hover:bg-gray-100 transition-colors"><Settings size={14}/></button>
        </div>
      </div>
      <div className={`flex-1 flex flex-col ${noPadding ? '' : 'p-5'}`}>
        {children}
      </div>
    </div>
  );
}
