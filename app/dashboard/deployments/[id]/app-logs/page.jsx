'use client';

import { use, useEffect, useState, useRef } from 'react';
import { getAppLogs } from '@/services/deployments';
import { Loader2 } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function AppLogsPage(props) {
  const params = use(props.params);
  const id = params?.id;
  const [logs, setLogs] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!id || id === 'undefined') return;

    let isMounted = true;
    let pollTimer = null;
    let currentCursor = undefined;
    let fetching = false;

    const pollLogs = async () => {
      if (!isMounted || fetching) return;
      fetching = true;
      try {
        const res = await getAppLogs(id, currentCursor, 200);
        if (!isMounted) return;
        
        if (res.application_logs) {
          setLogs(prev => prev ? prev + res.application_logs : res.application_logs);
        } else if (currentCursor === undefined && !res.application_logs) {
          setLogs('No application logs yet.\nYour application might still be starting.');
        }

        // Always update cursor to the next cursor
        if (res.next_cursor !== undefined) {
          currentCursor = res.next_cursor;
        }
        setError(false);
      } catch (e) {
        if (!isMounted) return;
        console.error("Failed to poll logs", e);
        setError(true);
      } finally {
        fetching = false;
        if (isMounted) setLoading(false);
        // Only schedule next poll if mounted, sequentially
        if (isMounted) {
          pollTimer = setTimeout(pollLogs, 3000);
        }
      }
    };

    pollLogs();

    return () => {
      isMounted = false;
      if (pollTimer) {
        clearTimeout(pollTimer);
      }
    };
  }, [id]);

  useEffect(() => {
    if (scrollRef.current) {
       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-[#1c1c1e] rounded-lg shadow-xl p-4 border border-zinc-800 h-[600px] flex flex-col">
       <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-800">
         <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-widest">
            <div className={`w-2 h-2 rounded-full ${error ? 'bg-amber-500' : 'bg-green-500'} ${loading ? 'animate-pulse' : ''}`}></div> 
            Live Application Logs
         </div>
       </div>
       <div className="flex-1 overflow-auto bg-black rounded-lg p-5 border border-zinc-900 shadow-inner" ref={scrollRef}>
          {loading && !logs ? (
            <div className="flex items-center justify-center h-full gap-3 text-cyan-400/80 font-mono text-sm">
               <Loader2 className="animate-spin" size={16} /> Fetching logs...
            </div>
          ) : (
            <pre className="text-zinc-300 whitespace-pre-wrap font-mono text-[13px] leading-relaxed m-0 break-all">
               {logs || 'Waiting for container application output...'}
            </pre>
          )}
       </div>
    </div>
  );
}
