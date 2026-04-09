'use client';

import { use, useEffect, useState, useRef } from 'react';
import { getBuildLogs } from '@/services/deployments';
import { createClient } from '@/utils/supabase/client';
import { Loader2 } from 'lucide-react';

export default function BuildLogsPage(props) {
  const params = use(props.params);
  const id = params?.id;
  const [logs, setLogs] = useState('');
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!id || id === 'undefined') return;
    let eventSource;
    let fallbackInterval;

    const setupSSE = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.access_token) {
        eventSource = new EventSource(`${apiUrl}/deployments/${id}/build-logs/stream?token=${session.access_token}`);
        
        eventSource.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.chunk) {
               setLogs(prev => prev + data.chunk);
               setLoading(false);
            }
          } catch(err) {}
        };
        
        eventSource.addEventListener('complete', () => {
           eventSource.close();
           setLoading(false);
        });

        eventSource.onerror = () => {
           console.error('SSE Error, falling back to polling');
           eventSource.close();
           startPollingFallback();
        };
      } else {
        startPollingFallback();
      }
    };

    const startPollingFallback = () => {
      const fetchLogs = async () => {
        try {
           const res = await getBuildLogs(id);
           setLogs(res.build_logs || 'No build logs available.');
        } catch (e) {
           setLogs('Error fetching build logs from server.');
        }
        setLoading(false);
      };
      
      fetchLogs();
      fallbackInterval = setInterval(fetchLogs, 3000);
    };

    setupSSE();
    
    return () => {
       if (eventSource) eventSource.close();
       if (fallbackInterval) clearInterval(fallbackInterval);
    };
  }, [id]);

  useEffect(() => {
    if (scrollRef.current) {
       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-[#1c1c1e] rounded-lg shadow-xl p-4 border border-zinc-800 h-[600px] flex flex-col">
       <div className="flex items-center gap-2 mb-4 pb-2 border-b border-zinc-800 text-sm font-semibold text-gray-400 uppercase tracking-widest">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div> Build Logs
       </div>
       <div ref={scrollRef} className="flex-1 overflow-auto font-mono text-sm text-zinc-300 whitespace-pre-wrap p-2">
         {loading && !logs ? (
           <div className="h-full w-full flex justify-center items-center">
             <Loader2 className="animate-spin text-gray-500" />
           </div>
         ) : (
           <div className="flex flex-col">
             {logs.replace(/\\n/g, '\n').split('\n').map((line, i) => {
               const isHeader = line.includes('===');
               return (
                 <div key={i} className={`flex gap-4 hover:bg-zinc-800/50 px-2 py-0.5 rounded transition-colors group ${isHeader ? 'text-blue-400 font-bold mt-2' : 'text-zinc-300'}`}>
                   <span className="text-zinc-600 select-none text-right min-w-[24px] font-normal">{i + 1}</span>
                   <span className="break-all flex-1">{line}</span>
                 </div>
               );
             })}
           </div>
         )}
       </div>
    </div>
  );
}