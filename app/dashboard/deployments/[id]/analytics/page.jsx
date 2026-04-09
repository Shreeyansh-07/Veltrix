'use client';

import { useEffect, useState, use } from 'react';
import { fetchWithAuth } from '@/lib/api-client';
import { createClient } from '@/utils/supabase/client';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { Loader2, Activity, Server, Clock, AlertTriangle } from 'lucide-react';

const COLORS = ['#22c55e', '#eab308', '#ef4444', '#3b82f6'];

export default function AnalyticsPage(props) {
  const params = use(props.params);
  const id = params?.id;
  const [metrics, setMetrics] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id || id === 'undefined') return;

    let eventSource;
    
    const setupSSE = async () => {
       const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
       const supabase = createClient();
       const { data: { session } } = await supabase.auth.getSession();
       
       if (session?.access_token) {
          eventSource = new EventSource(`${apiUrl}/deployments/${id}/analytics/stream?token=${session.access_token}`);
          
          eventSource.onmessage = (event) => {
             try {
               const data = JSON.parse(event.data);
               // If SSE pushes { metrics: ... } wrap, handle it. If it pushes raw metrics, handle accordingly.
               const currentMetrics = data.metrics || data; 
               if (currentMetrics && currentMetrics.requests) {
                 setMetrics(currentMetrics);
                 setHistory(prev => {
                    const newData = [...prev, {
                      time: new Date().toLocaleTimeString(),
                      ops: currentMetrics.requests?.per_second || 0,
                      p50: currentMetrics.latency?.p50_ms || 0,
                      p90: currentMetrics.latency?.p90_ms || 0,
                      p99: currentMetrics.latency?.p99_ms || 0
                    }];
                    return newData.slice(-20);
                 });
               }
             } catch(err) {}
          };
          
          eventSource.onerror = () => {
             console.error('SSE Error, falling back to polling');
             eventSource.close();
             startPolling();
          };
       } else {
         startPolling(); // If no token accessible directly, rely on fetch hook which attaches auth
       }
    };
    
    const startPolling = () => {
       fetchWithAuth(`/deployments/${id}/analytics`)
         .then(data => {
            setMetrics(data.metrics);
            setHistory(prev => [...prev, {
               time: new Date().toLocaleTimeString(),
               ops: data.metrics.requests?.per_second || 0,
               p50: data.metrics.latency?.p50_ms || 0,
               p90: data.metrics.latency?.p90_ms || 0,
               p99: data.metrics.latency?.p99_ms || 0
            }].slice(-20));
         }).catch(console.error);

       pollInterval = setInterval(async () => {
          try {
             const data = await fetchWithAuth(`/deployments/${id}/analytics`);
             setMetrics(data.metrics);
             setHistory(prev => {
                const newData = [...prev, {
                  time: new Date().toLocaleTimeString(),
                  ops: data.metrics.requests?.per_second || 0,
                  p50: data.metrics.latency?.p50_ms || 0,
                  p90: data.metrics.latency?.p90_ms || 0,
                  p99: data.metrics.latency?.p99_ms || 0
                }];
                return newData.slice(-20);
             });
          } catch (err) {
             console.error("Metrics polling failed", err);
          }
       }, 5000);
    };

    let pollInterval;
    setupSSE();
    
    return () => {
       if (eventSource) eventSource.close();
       if (pollInterval) clearInterval(pollInterval);
    };
  }, [id]);

  if (!metrics) {
    return (
      <div className="flex items-center justify-center py-20">
         <Loader2 className="animate-spin text-gray-500" size={32} />
      </div>
    );
  }

  const statusCodeData = [
    { name: '200 OK', value: metrics.requests.total * 0.98 },
    { name: '404 Not Found', value: metrics.requests.total * 0.015 },
    { name: '500 Error', value: metrics.requests.total * 0.005 },
  ];

  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
         <div className="bg-[#1c1c1e] p-5 border-t-2 border-green-500 rounded flex flex-col items-center shadow-lg">
           <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Total Workers</span>
           <span className="text-5xl font-bold text-green-500">2</span>
         </div>
         <div className="bg-[#1c1c1e] p-5 border-t-2 border-blue-500 rounded flex flex-col items-center shadow-lg">
           <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Idle Workers</span>
           <span className="text-5xl font-bold text-blue-500">1</span>
         </div>
         <div className="bg-[#1c1c1e] p-5 border-t-2 border-amber-500 rounded flex flex-col items-center shadow-lg">
           <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Busy Workers</span>
           <span className="text-5xl font-bold text-amber-500">1</span>
         </div>
         <div className="bg-[#1c1c1e] p-5 border-t-2 border-red-500 rounded flex flex-col items-center shadow-lg">
           <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Offline Workers</span>
           <span className="text-5xl font-bold text-red-500">0</span>
         </div>
         <div className="bg-[#1c1c1e] p-5 border-t-2 border-purple-500 rounded flex flex-col items-center shadow-lg">
           <span className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Total Requests</span>
           <span className="text-5xl font-bold text-purple-500">{(metrics.requests.total / 1000).toFixed(1)}k</span>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="bg-[#1c1c1e] rounded-lg shadow-xl p-6 border border-zinc-800">
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Platform Request Rate</h3>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={history}>
                 <XAxis dataKey="time" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                 <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v} req/s`} />
                 <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }} />
                 <Line type="monotone" dataKey="ops" stroke="#eab308" strokeWidth={2} dot={false} isAnimationActive={false} />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-[#1c1c1e] rounded-lg shadow-xl p-6 border border-zinc-800">
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Latency Percentiles (p50, p90, p99)</h3>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={history}>
                 <XAxis dataKey="time" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                 <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v} ms`} />
                 <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }} />
                 <Line type="monotone" dataKey="p50" stroke="#22c55e" strokeWidth={2} dot={false} isAnimationActive={false} />
                 <Line type="monotone" dataKey="p90" stroke="#eab308" strokeWidth={2} dot={false} isAnimationActive={false} />
                 <Line type="monotone" dataKey="p99" stroke="#3b82f6" strokeWidth={2} dot={false} isAnimationActive={false} />
               </LineChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="bg-[#1c1c1e] rounded-lg shadow-xl p-6 border border-zinc-800">
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Status Code Distribution</h3>
           <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie data={statusCodeData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                   {statusCodeData.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                   ))}
                 </Pie>
                 <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }} />
               </PieChart>
             </ResponsiveContainer>
           </div>
           <div className="flex justify-center gap-6 mt-4 text-xs font-semibold text-gray-400">
              <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-green-500"></div> 200 OK</span>
              <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-yellow-500"></div> 404 Not Found</span>
              <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-red-500"></div> 50x Error</span>
           </div>
        </div>

        <div className="bg-[#1c1c1e] rounded-lg shadow-xl p-6 border border-zinc-800 flex flex-col justify-center items-center">
           <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-10 w-full text-left">Pod Count (Current / Desired)</h3>
           <div className="flex justify-around w-full">
              <div className="flex flex-col items-center">
                 <div className="relative w-32 h-32 flex items-center justify-center">
                   <svg className="absolute w-full h-full transform -rotate-180" viewBox="0 0 100 100">
                     <circle className="text-zinc-800" strokeWidth="12" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" strokeDasharray="251" strokeDashoffset="125.5"/>
                     <circle className="text-red-500" strokeWidth="12" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" strokeDasharray="251" strokeDashoffset="180" />
                   </svg>
                   <span className="text-4xl font-bold text-red-500 mt-4">{metrics.pods.current}</span>
                 </div>
                 <span className="text-sm text-gray-400 mt-2 font-bold tracking-widest uppercase">Current</span>
              </div>
              <div className="flex flex-col items-center">
                 <div className="relative w-32 h-32 flex items-center justify-center">
                   <svg className="absolute w-full h-full transform -rotate-180" viewBox="0 0 100 100">
                     <circle className="text-zinc-800" strokeWidth="12" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" strokeDasharray="251" strokeDashoffset="125.5" />
                     <circle className="text-red-500" strokeWidth="12" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" strokeDasharray="251" strokeDashoffset="180" />
                   </svg>
                   <span className="text-4xl font-bold text-red-500 mt-4">{metrics.pods.desired}</span>
                 </div>
                 <span className="text-sm text-gray-400 mt-2 font-bold tracking-widest uppercase">Desired</span>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
}