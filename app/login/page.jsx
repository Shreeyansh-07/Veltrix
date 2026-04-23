'use client';

import Navbar from '@/components/navbar';
import AuthForm from '@/components/auth-form';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
        <AuthForm />
      </div>
    </main>
  );
}
