'use client';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';
import {
  ArrowRight,
  Boxes,
  CircuitBoard,
  Cloud,
  Code2,
  Database,
  GitBranch,
  Lock,
  Rocket,
  ScanSearch,
  Server,
  Shield,
  Zap,
} from 'lucide-react';

export default function ProductPage() {
  const productRoutes = [
    {
      icon: Code2,
      title: 'Platform Overview',
      description: 'See how the full Veltrix platform fits together from build to production operations.',
      link: '/product/overview',
      badge: 'Start Here',
    },
    {
      icon: Boxes,
      title: 'Feature Index',
      description: 'Explore the complete catalog of platform capabilities and deployment workflows.',
      link: '/product/features',
      badge: 'Core',
    },
    {
      icon: Zap,
      title: 'Auto Scaling',
      description: 'Scale instances based on demand patterns, queue depth, and health signals.',
      link: '/product/autoscaling',
      badge: 'Performance',
    },
    {
      icon: Shield,
      title: 'Private Networking',
      description: 'Isolate internal service traffic with secure network paths and policy controls.',
      link: '/product/networking',
      badge: 'Security',
    },
    {
      icon: Database,
      title: 'Persistent Disks',
      description: 'Attach persistent storage to stateful services with resilient runtime behavior.',
      link: '/product/disks',
      badge: 'Stateful',
    },
    {
      icon: GitBranch,
      title: 'Infrastructure as Code',
      description: 'Define environments declaratively and version infrastructure changes with confidence.',
      link: '/product/iac',
      badge: 'Automation',
    },
    {
      icon: ScanSearch,
      title: 'Preview Environments',
      description: 'Generate realistic preview deploys for pull requests and collaborative QA.',
      link: '/product/preview',
      badge: 'Developer UX',
    },
    {
      icon: Rocket,
      title: 'Zero Downtime Deploys',
      description: 'Release continuously without interrupting active user traffic.',
      link: '/product/zero-downtime',
      badge: 'Reliability',
    },
    {
      icon: CircuitBoard,
      title: 'Infrastructure API',
      description: 'Control projects, deployments, and runtime automation programmatically.',
      link: '/product/api',
      badge: 'API',
    },
    {
      icon: Lock,
      title: 'HIPAA Workflows',
      description: 'Operate regulated workloads with auditable controls and secure defaults.',
      link: '/product/hipaa',
      badge: 'Compliance',
    },
  ];

  const platformSignals = [
    { label: 'Monthly deploys', value: '1.8M+' },
    { label: 'Global teams', value: '4,200+' },
    { label: 'Median deploy time', value: '4m 12s' },
    { label: 'Uptime across managed services', value: '99.99%' },
  ];

  const serviceTypes = [
    {
      title: 'Static Sites',
      summary: 'Ship frontend builds globally with edge-friendly delivery patterns.',
      href: '/product/overview',
      icon: Cloud,
    },
    {
      title: 'Web Services',
      summary: 'Run production APIs and apps with autoscaling and health-aware deploys.',
      href: '/product/autoscaling',
      icon: Server,
    },
    {
      title: 'Private Services',
      summary: 'Deploy internal workloads with controlled network visibility.',
      href: '/product/networking',
      icon: Shield,
    },
    {
      title: 'Background Workers',
      summary: 'Process jobs, queues, and async pipelines with predictable runtime behavior.',
      href: '/product/features',
      icon: Boxes,
    },
  ];

  const rolloutFlow = [
    {
      step: '01',
      title: 'Connect code and runtime settings',
      detail: 'Define build and start commands, environment variables, and service type once.',
    },
    {
      step: '02',
      title: 'Review preview environments',
      detail: 'Validate pull requests with realistic data paths and dependency behavior.',
    },
    {
      step: '03',
      title: 'Promote with health gates',
      detail: 'Roll out safely with checks, progressive traffic movement, and instant rollback paths.',
    },
    {
      step: '04',
      title: 'Scale and govern in production',
      detail: 'Apply autoscaling, policy constraints, and API automation as usage grows.',
    },
  ];

  return (
    <main className="min-h-screen bg-[#f6f7fb]">
      <Navbar />

      <section className="relative overflow-hidden bg-white border-b border-gray-200">
        <div
          className="absolute inset-0 opacity-45"
          style={{
            backgroundImage:
              'linear-gradient(#d8dce8 1px, transparent 1px), linear-gradient(90deg, #d8dce8 1px, transparent 1px)',
            backgroundSize: '82px 82px',
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-cyan-700">Product Platform</p>
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mt-4 leading-[1.03]">
              More than navigation. Your complete map from commit to resilient production.
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mt-6 max-w-2xl">
              Use this page as your product control center: explore capabilities, compare workflows, and jump directly
              into the exact feature page your team needs next.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/product/overview"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
              >
                Explore overview
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/product/features"
                className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-md font-semibold text-gray-900 hover:border-gray-500 transition-colors"
              >
                Browse all features
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Platform signal board</p>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {platformSignals.map((item) => (
                <div key={item.label} className="rounded-xl border border-gray-200 bg-[#fafbff] p-4">
                  <p className="text-2xl font-black text-gray-900">{item.value}</p>
                  <p className="text-sm text-gray-600 mt-1">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-gray-200 bg-[#0f172a] text-cyan-100 p-4 text-sm">
              <p className="font-semibold text-white">Deployment confidence stream</p>
              <p className="mt-2">Preview checks: passing</p>
              <p>Autoscaling policy: active</p>
              <p>Rollback readiness: available</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-cyan-700">Product navigator</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Jump anywhere fast, but understand how everything works together.</h2>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {productRoutes.map((feature) => {
              const Icon = feature.icon;
              return (
                <Link
                  key={feature.title}
                  href={feature.link}
                  className="group p-6 rounded-2xl border border-gray-200 bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-cyan-100 to-indigo-100 flex items-center justify-center group-hover:from-cyan-200 group-hover:to-indigo-200 transition-colors">
                      <Icon className="w-6 h-6 text-cyan-700" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-100">
                      {feature.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-4">{feature.title}</h3>
                  <p className="text-gray-600 text-sm mt-2">{feature.description}</p>
                  <p className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan-700">
                    Open page
                    <ArrowRight size={14} />
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1fr_1fr] gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-cyan-700">Service models</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Run every workload type in one platform surface.</h2>

            <div className="mt-8 space-y-4">
              {serviceTypes.map((service) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.title}
                    href={service.href}
                    className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-[#fafbff] p-5 hover:bg-white hover:shadow-md transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center shrink-0">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{service.title}</p>
                      <p className="text-gray-600 mt-1 text-sm">{service.summary}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-[#0f172a] text-white p-6">
            <p className="text-xs uppercase tracking-wide text-cyan-200 font-semibold">Release blueprint</p>
            <h3 className="text-2xl font-bold mt-3">How high-performing teams use Veltrix</h3>

            <div className="mt-6 space-y-4">
              {rolloutFlow.map((item) => (
                <div key={item.step} className="rounded-xl bg-white/10 p-4">
                  <p className="text-cyan-200 text-xs font-semibold">STEP {item.step}</p>
                  <p className="text-white font-bold mt-1">{item.title}</p>
                  <p className="text-cyan-100/90 text-sm mt-1">{item.detail}</p>
                </div>
              ))}
            </div>

            <Link
              href="/docs"
              className="mt-6 inline-flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-md font-semibold hover:bg-gray-100 transition-colors"
            >
              Read implementation docs
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-linear-to-r from-[#e8fbff] via-[#edf7ff] to-[#e9fff4] rounded-3xl border border-gray-200 p-8 lg:p-12 text-center">
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900">Need help choosing your next product path?</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Start with the overview for platform architecture, then jump directly into autoscaling, networking,
              previews, API automation, or compliance controls.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link
                href="/product/overview"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
              >
                Start with overview
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/product/features"
                className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-md font-semibold text-gray-900 hover:border-gray-500 transition-colors"
              >
                Explore by feature
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
