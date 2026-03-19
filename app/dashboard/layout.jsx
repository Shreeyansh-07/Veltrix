'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import DashboardSidebar from '@/components/dashboard/sidebar';
import { authStore } from '@/lib/auth-store';

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authStore.isLoggedIn()) {
      router.push('/login');
      setLoading(false);
    } else {
      setIsLoggedIn(true);
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
