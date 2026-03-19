'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black leading-tight">
              Deploy at the speed of{' '}
              <span className="bg-linear-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
                thought
              </span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-xl">
              Intuitive infrastructure to scale any app or agent from your first user to your billionth.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-2 bg-black text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-900 transition-all duration-300 transform hover:scale-105 active:scale-95"
            >
              Start for free
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-white text-black border-2 border-gray-300 px-8 py-4 rounded-lg font-semibold hover:border-black transition-all duration-300"
            >
              Get in touch
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8">
            <div>
              <p className="text-3xl font-bold text-black">99.99%</p>
              <p className="text-sm text-gray-600">Uptime SLA</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-black">0ms</p>
              <p className="text-sm text-gray-600">Cold Start</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-black">∞</p>
              <p className="text-sm text-gray-600">Auto Scale</p>
            </div>
          </div>
        </div>

        {/* Right Dashboard Mockup */}
        <div className="relative h-96 lg:h-full min-h-96">
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 left-20 w-48 h-48 bg-pink-200 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

          {/* Dashboard Cards */}
          <div className="absolute top-0 right-0 bg-gray-900 text-white px-6 py-3 rounded-lg font-mono text-sm border border-gray-700 shadow-2xl hover:shadow-purple-500/20 transition-all">
            <span className="text-green-400">$</span> git push
          </div>

          <div className="absolute top-32 right-32 bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all">
            <div className="text-xs font-semibold text-gray-600 mb-3">PRODUCTION</div>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900">app-backend</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">Deploying</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-1 h-1 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
              <div className="h-12 bg-linear-to-r from-purple-100 to-pink-100 rounded">
                <svg className="w-full h-full" viewBox="0 0 100 30" preserveAspectRatio="none">
                  <polyline points="0,20 10,15 20,18 30,12 40,16 50,10 60,14 70,8 80,12 90,6 100,10" fill="none" stroke="#ec4899" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                  <polyline points="0,25 10,22 20,23 30,20 40,21 50,18 60,19 70,16 80,17 90,14 100,15" fill="none" stroke="#a78bfa" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                </svg>
              </div>
            </div>
          </div>

          <div className="absolute top-72 left-0 bg-white border border-gray-200 rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all w-80">
            <div className="text-xs font-semibold text-gray-600 mb-3">RESOURCES</div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Memory</span>
                <div className="w-24 h-1 bg-gray-200 rounded overflow-hidden">
                  <div className="h-full w-3/4 bg-linear-to-r from-purple-500 to-pink-500"></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">CPU</span>
                <div className="w-24 h-1 bg-gray-200 rounded overflow-hidden">
                  <div className="h-full w-1/2 bg-linear-to-r from-purple-500 to-pink-500"></div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-600">Disk</span>
                <div className="w-24 h-1 bg-gray-200 rounded overflow-hidden">
                  <div className="h-full w-5/6 bg-linear-to-r from-purple-500 to-pink-500"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 right-0 bg-white border border-gray-200 rounded-xl p-3 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs font-medium text-gray-700">app-database: Live</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
