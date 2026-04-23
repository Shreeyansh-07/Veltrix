import { fetchWithAuth } from '../lib/api-client';
import { createClient } from '@/utils/supabase/client';

export interface AnalyticsMetrics {
  requests: {
    total: number;
    last_hour: number;
    last_24h: number;
    per_second: number;
  };
  latency: {
    p50_ms: number;
    p90_ms: number;
    p99_ms: number;
  };
  bandwidth: {
    sent_bytes: number;
    received_bytes: number;
  };
  pods: {
    current: number;
    desired: number;
  };
  resources: {
    cpu_usage_percent: number;
    memory_usage_mb: number;
  };
  last_updated: string;
}

export interface AnalyticsSnapshotResponse {
  deployment_id: string;
  deployment: Record<string, any>;
  metrics: AnalyticsMetrics;
}

export async function getAnalyticsSnapshot(deploymentId: string): Promise<AnalyticsSnapshotResponse> {
  return fetchWithAuth(`/deployments/${deploymentId}/analytics`);
}

export async function getPlatformAnalytics(): Promise<any> {
  return fetchWithAuth('/platform/analytics');
}

export async function getUserAnalytics(): Promise<any> {
  return fetchWithAuth('/user/analytics');
}

/**
 * Connects to the SSE stream for analytics.
 * Returns the EventSource instance so you can close it on unmount.
 */
export async function subscribeToAnalyticsStream(
  deploymentId: string,
  onMessage: (data: AnalyticsSnapshotResponse) => void,
  onError: (err: Event) => void
) {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session?.access_token) {
    throw new Error('User is not authenticated');
  }

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
  
  const url = `${API_BASE}/deployments/${deploymentId}/analytics/stream?token=${session.access_token}`;
  
  const eventSource = new EventSource(url);

  eventSource.onmessage = (event) => {
    try {
      const parsedData = JSON.parse(event.data);
      onMessage(parsedData);
    } catch (e) {
      console.error('Failed to parse SSE data', e);
    }
  };

  eventSource.onerror = (err) => {
    console.error('SSE Error:', err);
    onError(err);
    eventSource.close();
  };

  return eventSource;
}