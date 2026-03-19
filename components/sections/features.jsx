'use client';

import { Code2, Zap, Shield, GitBranch, Database, Gauge } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Code2,
      title: 'Multiple Service Types',
      description: 'Deploy static sites, web services, background workers, cron jobs, and more.',
    },
    {
      icon: Zap,
      title: 'Auto Scaling',
      description: 'Automatically scale your applications based on demand with zero configuration.',
    },
    {
      icon: Shield,
      title: 'Private Networking',
      description: 'Secure, private connections between your services with built-in encryption.',
    },
    {
      icon: GitBranch,
      title: 'GitHub Integration',
      description: 'Connect your repositories and deploy with every git push.',
    },
    {
      icon: Database,
      title: 'Managed Databases',
      description: 'Built-in PostgreSQL and key-value stores with automatic backups.',
    },
    {
      icon: Gauge,
      title: 'Real-time Monitoring',
      description: 'Monitor logs, metrics, and performance with integrated observability.',
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            Whatever your stack, it runs on Veltrix.
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Build with your favorite languages and frameworks. We handle the infrastructure.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 border border-gray-200 hover:border-purple-400 hover:shadow-xl transition-all duration-300 group hover:scale-105"
              >
                <div className="w-14 h-14 bg-linear-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center mb-6 group-hover:shadow-lg group-hover:shadow-purple-500/30 transition-all">
                  <Icon className="w-7 h-7 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Tech Stack Grid */}
        <div className="mt-24">
          <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Build with any language or framework
          </h3>
          <div className="bg-linear-to-r from-purple-600 via-pink-600 to-orange-500 rounded-3xl p-1">
            <div className="bg-white rounded-2xl p-12">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {[
                  { name: 'Node.js', color: 'bg-green-100', text: 'text-green-700' },
                  { name: 'Python', color: 'bg-blue-100', text: 'text-blue-700' },
                  { name: 'Go', color: 'bg-cyan-100', text: 'text-cyan-700' },
                  { name: 'Ruby', color: 'bg-red-100', text: 'text-red-700' },
                  { name: 'Java', color: 'bg-orange-100', text: 'text-orange-700' },
                  { name: 'PHP', color: 'bg-purple-100', text: 'text-purple-700' },
                  { name: 'Rust', color: 'bg-orange-100', text: 'text-orange-700' },
                  { name: 'Kotlin', color: 'bg-purple-100', text: 'text-purple-700' },
                  { name: 'Django', color: 'bg-green-100', text: 'text-green-700' },
                  { name: 'FastAPI', color: 'bg-blue-100', text: 'text-blue-700' },
                ].map((tech, idx) => (
                  <div
                    key={idx}
                    className={`${tech.color} rounded-xl p-4 text-center font-semibold ${tech.text} hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-110`}
                  >
                    {tech.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
