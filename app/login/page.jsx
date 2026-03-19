'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Github, ArrowRight } from 'lucide-react';
import { authStore } from '@/lib/auth-store';
import { toast } from 'sonner';
import Navbar from '@/components/navbar';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!email || !password) {
        toast.error('Please fill in all fields');
        return;
      }

      if (!email.includes('@')) {
        toast.error('Please enter a valid email');
        return;
      }

      const { user } = authStore.login(email, password);
      toast.success(`Welcome back, ${user.name}!`);

      // Redirect to dashboard after short delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 500);
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGitHubLogin = () => {
    toast.info('GitHub OAuth would connect here');
    const { user } = authStore.loginWithGithub('user@github.com');
    toast.success(`Welcome, ${user.name}!`);
    setTimeout(() => {
      router.push('/dashboard');
    }, 500);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back
            </h1>
            <p className="text-gray-600">
              Sign in to your Veltrix account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4 mb-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-all"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin(e)}
                placeholder="••••••••"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or continue with</span>
            </div>
          </div>

          {/* GitHub Login */}
          <button
            onClick={handleGitHubLogin}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
          >
            <Github size={20} />
            Continue with GitHub
          </button>

          {/* Footer */}
          <p className="text-center text-gray-600 mt-6 text-sm">
            Don't have an account?{' '}
            <Link href="/signup" className="text-gray-900 font-semibold hover:text-black">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
