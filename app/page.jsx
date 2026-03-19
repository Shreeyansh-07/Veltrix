'use client';

import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import {
  ArrowRight,
  BarChart3,
  CircleCheckBig,
  Clock3,
  Cloud,
  Code2,
  Layers,
  Rocket,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react';

const trustStats = [
  { label: 'Monthly deployments', value: '1.8M+' },
  { label: 'Global teams', value: '4,200+' },
  { label: 'Platform uptime', value: '99.99%' },
  { label: 'Median deploy time', value: '4m 12s' },
];

const capabilityCards = [
  {
    title: 'Developer Velocity',
    description: 'Ship quickly from commit to production with consistent workflows and observability.',
    icon: Rocket,
  },
  {
    title: 'Operational Confidence',
    description: 'Health-gated rollouts, rollback paths, and timeline visibility built in by default.',
    icon: ShieldCheck,
  },
  {
    title: 'Platform Flexibility',
    description: 'Deploy web apps, workers, APIs, and data services in one unified environment.',
    icon: Layers,
  },
  {
    title: 'Automation First',
    description: 'API-driven workflows and event hooks for CI/CD and production operations.',
    icon: Code2,
  },
];

const workflows = [
  {
    title: 'Connect your repository',
    detail: 'Link your source, choose a branch, and define deployment behavior in minutes.',
  },
  {
    title: 'Configure environments',
    detail: 'Set environment variables, networking policies, and runtime controls with full visibility.',
  },
  {
    title: 'Deploy safely',
    detail: 'Use health checks and progressive rollout controls to release with confidence.',
  },
  {
    title: 'Scale with certainty',
    detail: 'Apply autoscaling and monitoring insights as traffic and workload complexity grows.',
  },
];

const stackBadges = [
  { label: 'Node', sub: 'JS', top: '6%', left: '12%', tone: 'bg-emerald-100 text-emerald-700' },
  { label: 'Python', sub: 'PY', top: '18%', left: '30%', tone: 'bg-amber-100 text-amber-700' },
  { label: 'AI', sub: 'ML', top: '22%', left: '49%', tone: 'bg-fuchsia-100 text-fuchsia-700' },
  { label: 'PHP', sub: '7+', top: '14%', left: '70%', tone: 'bg-violet-100 text-violet-700' },
  { label: 'Go', sub: 'GO', top: '8%', left: '88%', tone: 'bg-sky-100 text-sky-700' },
  { label: 'Docker', sub: 'CTR', top: '42%', left: '6%', tone: 'bg-cyan-100 text-cyan-700' },
  { label: 'Ruby', sub: 'RB', top: '37%', left: '16%', tone: 'bg-rose-100 text-rose-700' },
  { label: 'Rails', sub: 'R', top: '35%', left: '82%', tone: 'bg-pink-100 text-pink-700' },
  { label: 'Django', sub: 'DJ', top: '63%', left: '86%', tone: 'bg-green-100 text-green-700' },
  { label: 'Angular', sub: 'NG', top: '72%', left: '81%', tone: 'bg-purple-100 text-purple-700' },
  { label: 'Vue', sub: 'V', top: '88%', left: '16%', tone: 'bg-emerald-100 text-emerald-700' },
  { label: 'Bun', sub: 'B', top: '81%', left: '31%', tone: 'bg-violet-100 text-violet-700' },
  { label: 'OpenAI', sub: 'AI', top: '84%', left: '52%', tone: 'bg-orange-100 text-orange-700' },
  { label: 'Postgres', sub: 'DB', top: '90%', left: '68%', tone: 'bg-sky-100 text-sky-700' },
];

const stackStrip = [
  'AI',
  'Ruby',
  'Vite',
  'React',
  'Django',
  'Bun',
  'Docker',
  'Go',
  'Svelte',
  'Angular',
  'Vue',
  'Node',
  'Python',
  'GitHub',
  'Rust',
  'Rails',
];

const productCards = [
  {
    title: 'Preview Environments',
    description: 'Validate pull requests in realistic pre-production contexts.',
    href: '/product/preview',
  },
  {
    title: 'Zero Downtime Deploys',
    description: 'Release continuously without interrupting active users.',
    href: '/product/zero-downtime',
  },
  {
    title: 'Autoscaling',
    description: 'Automatically adapt runtime capacity with policy-driven controls.',
    href: '/product/autoscaling',
  },
  {
    title: 'Private Networking',
    description: 'Secure internal communication across services and environments.',
    href: '/product/networking',
  },
  {
    title: 'Infrastructure API',
    description: 'Orchestrate projects and deploy pipelines programmatically.',
    href: '/product/api',
  },
  {
    title: 'Compliance Workflows',
    description: 'Run regulated workloads with auditable operational controls.',
    href: '/product/hipaa',
  },
];

const testimonials = [
  {
    quote:
      'Veltrix changed how we ship. We moved from uncertain release nights to predictable production rollouts.',
    author: 'A. Raman',
    role: 'VP Engineering, Atlas Commerce Cloud',
  },
  {
    quote:
      'Preview environments and deployment visibility dramatically improved collaboration between product and engineering.',
    author: 'S. Iyer',
    role: 'Head of Product, Helio Health Systems',
  },
  {
    quote:
      'Our team cut operational overhead while improving uptime and release confidence at the same time.',
    author: 'K. Mehta',
    role: 'Platform Lead, Northgrid Analytics',
  },
];

const faqs = [
  {
    question: 'Is Veltrix suitable for both small teams and large organizations?',
    answer:
      'Yes. Teams start with simple workflows and scale into advanced deployment, security, and compliance controls as they grow.',
  },
  {
    question: 'How quickly can we ship our first service?',
    answer:
      'Most teams can connect a repository and complete a first production deployment in under an hour.',
  },
  {
    question: 'Can Veltrix integrate with existing CI/CD pipelines?',
    answer:
      'Yes. API endpoints and webhook events make it easy to plug Veltrix into established automation systems.',
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f6f7fb]">
      <Navbar />

      <section className="relative overflow-hidden bg-white border-b border-gray-200">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage:
              'linear-gradient(#d8dce8 1px, transparent 1px), linear-gradient(90deg, #d8dce8 1px, transparent 1px)',
            backgroundSize: '76px 76px',
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-cyan-700">Veltrix Platform</p>
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mt-4 leading-[1.03]">
              Build, deploy, and scale software with production confidence.
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mt-6 max-w-xl">
              Veltrix gives engineering teams a complete platform for modern service delivery, combining velocity,
              reliability, and governance in one operational surface.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
              >
                Start free
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-md font-semibold text-gray-900 hover:border-gray-500 transition-colors"
              >
                View pricing
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Live platform pulse</p>
            <div className="mt-4 rounded-xl border border-gray-200 p-4 bg-[#fafbff]">
              <div className="grid sm:grid-cols-2 gap-3">
                {trustStats.map((item) => (
                  <div key={item.label} className="rounded-lg border border-gray-200 bg-white p-3">
                    <p className="text-xl font-black text-gray-900">{item.value}</p>
                    <p className="text-xs text-gray-600 mt-1">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-gray-200 p-4">
              <p className="text-sm font-semibold text-gray-900">Release quality score</p>
              <div className="mt-3 h-2 rounded-full bg-gray-200 overflow-hidden">
                <div className="h-full w-[89%] bg-linear-to-r from-cyan-500 via-indigo-500 to-emerald-400"></div>
              </div>
              <p className="text-xs text-gray-600 mt-2">89/100 checks passing across active production environments.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-cyan-700">Why Veltrix</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">The deployment platform for teams that move fast and run reliably.</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilityCards.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-cyan-100 to-indigo-100 flex items-center justify-center">
                    <Icon size={20} className="text-gray-900" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-4">{item.title}</h3>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-y border-gray-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-8">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-cyan-700">Stack Compatibility</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Whatever your stack, it feels native on Veltrix.</h2>
            <p className="text-gray-600 mt-4">
              From modern JavaScript to mature backend frameworks, your services ship through one reliable deployment control plane.
            </p>
          </div>

          <div className="relative min-h-140 rounded-3xl border border-gray-200 bg-[#f8fafc] overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(14,165,233,0.14),transparent_58%)]"></div>

            <div className="hidden lg:block">
              {stackBadges.map((badge, index) => (
                <div
                  key={badge.label + index}
                  className={`absolute w-24 h-24 rounded-2xl border border-white/70 shadow-md flex flex-col items-center justify-center ${badge.tone}`}
                  style={{
                    top: badge.top,
                    left: badge.left,
                    animation: `floatTile ${6 + (index % 4)}s ease-in-out ${index * 0.18}s infinite`,
                  }}
                >
                  <span className="text-xl font-black leading-none">{badge.sub}</span>
                  <span className="text-[11px] font-semibold tracking-wide mt-1">{badge.label}</span>
                </div>
              ))}
            </div>

            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="w-full max-w-4xl rounded-2xl border border-gray-200 bg-white/95 backdrop-blur p-8 lg:p-12 text-center shadow-xl">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold">Unified deployment fabric</p>
                <h3 className="text-4xl lg:text-6xl font-black text-gray-900 mt-4">Start building with Veltrix</h3>
                <p className="text-xl text-gray-600 mt-4">Zero ops, zero surprises.</p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Link
                    href="/signup"
                    className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
                  >
                    Deploy your app for free
                    <ArrowRight size={16} />
                  </Link>
                  <Link
                    href="/product/overview"
                    className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-md font-semibold text-gray-900 hover:border-gray-500 transition-colors"
                  >
                    Explore platform
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#e7ddf7] border-y border-[#d7caef]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-5xl lg:text-7xl font-black text-gray-900 leading-[1.02]">Whatever your stack, it runs on Veltrix.</h2>
            <p className="text-gray-700 text-lg mt-4">
              Launch apps built with your favorite frameworks using a platform designed for speed, reliability, and scale.
            </p>
            <Link
              href="/docs"
              className="mt-7 inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
            >
              View templates
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-12 rounded-3xl border border-violet-300/60 bg-linear-to-b from-[#efe7fb] to-[#ded2f4] p-5 md:p-7 shadow-inner">
            <div className="hidden md:block space-y-3 overflow-hidden">
              <div className="flex gap-3 w-max" style={{ animation: 'marquee 24s linear infinite' }}>
                {[...stackStrip, ...stackStrip].map((chip, index) => (
                  <div
                    key={`${chip}-top-${index}`}
                    className="w-20 h-20 rounded-lg bg-[#6d28d9] text-white border border-violet-400/40 flex items-center justify-center text-sm font-black shadow-sm"
                  >
                    {chip}
                  </div>
                ))}
              </div>

              <div className="flex gap-3 w-max" style={{ animation: 'marqueeReverse 21s linear infinite' }}>
                {[...stackStrip.slice(4), ...stackStrip.slice(0, 4), ...stackStrip].map((chip, index) => (
                  <div
                    key={`${chip}-middle-${index}`}
                    className="w-20 h-20 rounded-lg bg-[#7c3aed] text-white border border-violet-400/40 flex items-center justify-center text-sm font-black shadow-sm"
                  >
                    {chip}
                  </div>
                ))}
              </div>

              <div className="flex gap-3 w-max" style={{ animation: 'marquee 27s linear infinite' }}>
                {[...stackStrip.slice(8), ...stackStrip.slice(0, 8), ...stackStrip].map((chip, index) => (
                  <div
                    key={`${chip}-bottom-${index}`}
                    className="w-20 h-20 rounded-lg bg-[#5b21b6] text-white border border-violet-400/40 flex items-center justify-center text-sm font-black shadow-sm"
                  >
                    {chip}
                  </div>
                ))}
              </div>
            </div>

            <div className="md:hidden grid grid-cols-4 gap-2">
              {stackStrip.slice(0, 12).map((chip) => (
                <div
                  key={chip}
                  className="h-14 rounded-lg bg-[#6d28d9] text-white border border-violet-400/40 flex items-center justify-center text-xs font-black"
                >
                  {chip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-cyan-700">Workflow</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">From git push to stable production in a single repeatable system.</h2>

            <div className="mt-8 space-y-4">
              {workflows.map((item, index) => (
                <div key={item.title} className="rounded-2xl border border-gray-200 bg-[#fafbff] p-5 flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-cyan-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{item.title}</p>
                    <p className="text-gray-600 mt-1">{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-[#0f172a] text-white p-6">
            <p className="text-xs uppercase tracking-wide text-cyan-200 font-semibold">Operational feed</p>
            <div className="mt-5 space-y-3 text-sm">
              <div className="rounded-lg bg-white/10 p-3 flex items-start justify-between gap-3">
                <span>frontend-service rollout completed</span>
                <span className="text-emerald-300 font-semibold">Healthy</span>
              </div>
              <div className="rounded-lg bg-white/10 p-3 flex items-start justify-between gap-3">
                <span>api-service autoscaled 3 to 6 instances</span>
                <span className="text-cyan-300 font-semibold">Scaled</span>
              </div>
              <div className="rounded-lg bg-white/10 p-3 flex items-start justify-between gap-3">
                <span>security policy sync validated</span>
                <span className="text-violet-200 font-semibold">Passing</span>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-white/5 p-4 text-xs text-cyan-100 flex items-center gap-2">
              <CircleCheckBig size={14} />
              Rollback and incident readiness checks are active.
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-cyan-700">Deployment Studio</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">A cleaner way to manage build settings, release controls, and live status.</h2>
          </div>

          <div className="grid lg:grid-cols-[0.85fr_1fr_0.95fr] gap-0 border border-gray-200 bg-white shadow-sm overflow-hidden rounded-3xl">
            <aside className="border-r border-gray-200 bg-[#fafafa] p-5">
              <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mb-3">Service Types</p>
              <div className="space-y-1">
                <div className="px-3 py-2 rounded-md bg-white border border-gray-200 text-gray-900 font-medium">Static Site</div>
                <div className="px-3 py-2 rounded-md bg-violet-100/70 border border-violet-200 text-violet-900 font-semibold">Web Service</div>
                <div className="px-3 py-2 rounded-md bg-white border border-gray-200 text-gray-900 font-medium">Private Service</div>
                <div className="px-3 py-2 rounded-md bg-white border border-gray-200 text-gray-900 font-medium">Worker</div>
                <div className="px-3 py-2 rounded-md bg-white border border-gray-200 text-gray-500">Cron Job</div>
                <div className="px-3 py-2 rounded-md bg-white border border-gray-200 text-gray-500">Postgres</div>
              </div>
            </aside>

            <div className="p-6 border-r border-gray-200">
              <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Build Configuration</p>
              <div className="mt-4 space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Build Command</p>
                  <div className="h-11 rounded-md border border-gray-200 bg-[#f7f7f8] px-3 flex items-center text-sm text-gray-800 font-medium">npm run build</div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Start Command</p>
                  <div className="h-11 rounded-md border border-gray-200 bg-[#f7f7f8] px-3 flex items-center text-sm text-gray-800 font-medium">npm start</div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Auto Deploy</p>
                  <div className="h-11 rounded-md border border-gray-200 bg-[#f7f7f8] px-3 flex items-center justify-between text-sm text-gray-800 font-medium">
                    <span>On Commit</span>
                    <span className="text-gray-400">v</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <button className="h-11 px-4 rounded-md bg-black text-white text-sm font-semibold hover:bg-gray-900 transition-colors">Manual Deploy</button>
                <div className="rounded-md border border-gray-200 bg-[#f7f7f8] px-3 py-2 text-xs text-gray-600">
                  Build in 2.7s
                  <div className="mt-1 text-emerald-600 font-semibold">Your site is live</div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#fcfcfd]">
              <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Deploy Timeline</p>
              <div className="mt-4 rounded-lg border border-gray-200 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200 bg-white">
                  <p className="text-xs text-gray-500">username/repo main</p>
                  <p className="text-sm text-cyan-700 font-semibold mt-1">https://yourwebsite.com</p>
                </div>
                <div className="px-4 py-3 border-b border-gray-200 bg-white">
                  <p className="text-sm font-medium text-gray-900">Automatic Deploy live: final tweaks</p>
                  <p className="text-xs text-gray-500 mt-1">1:20:50 PM</p>
                </div>
                <div className="px-4 py-3 border-b border-gray-200 bg-white">
                  <p className="text-sm font-medium text-gray-900">Automatic Deploy live: fix auth callback</p>
                  <p className="text-xs text-gray-500 mt-1">1:20:42 PM</p>
                </div>
                <div className="px-4 py-3 bg-white">
                  <p className="text-sm font-medium text-gray-900">Manual Deploy live</p>
                  <p className="text-xs text-gray-500 mt-1">9:50:12 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-cyan-700">Explore capabilities</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Everything you need, from preview to production governance.</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productCards.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-lg transition-all"
              >
                <p className="text-lg font-bold text-gray-900">{item.title}</p>
                <p className="text-gray-600 mt-2">{item.description}</p>
                <p className="mt-4 text-sm text-cyan-700 font-semibold inline-flex items-center gap-1">
                  Learn more
                  <ArrowRight size={14} />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-cyan-700">Proof in practice</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">What teams say after switching to Veltrix.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <article key={item.author} className="rounded-2xl border border-gray-200 bg-[#fafbff] p-6">
                <p className="text-gray-700">"{item.quote}"</p>
                <div className="mt-5 pt-4 border-t border-gray-200">
                  <p className="font-bold text-gray-900">{item.author}</p>
                  <p className="text-sm text-gray-600">{item.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-cyan-700">Landing FAQ</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Everything teams ask before choosing a platform.</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((item) => (
              <details key={item.question} className="group rounded-2xl border border-gray-200 bg-white p-6">
                <summary className="list-none cursor-pointer font-bold text-gray-900 flex items-center justify-between gap-4">
                  {item.question}
                  <span className="text-cyan-700 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-gray-600 mt-3">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-linear-to-r from-[#e8fbff] via-[#edf7ff] to-[#e9fff4] rounded-3xl border border-gray-200 p-8 lg:p-12 text-center">
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900">Make your next release your smoothest one yet.</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Give your team a platform that combines speed, reliability, and operational clarity from day one.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
              >
                Start for free
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-md font-semibold text-gray-900 hover:border-gray-500 transition-colors"
              >
                Talk to our team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes floatTile {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes marqueeReverse {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>

      <Footer />
    </main>
  );
}
