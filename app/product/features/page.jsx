'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Activity,
  CircleCheckBig,
  Database,
  GitBranch,
  Lock,
  Rocket,
  Workflow,
  BellRing,
  WandSparkles,
  ServerCog,
  Shield,
} from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const featureGrid = [
  {
    icon: Rocket,
    title: 'Fast Deployments',
    description: 'Build and ship with deployment visibility from commit to production.',
    tone: 'from-violet-100 to-indigo-100',
  },
  {
    icon: Workflow,
    title: 'Service Workflows',
    description: 'Support static sites, web services, workers, cron, and data services.',
    tone: 'from-cyan-100 to-sky-100',
  },
  {
    icon: GitBranch,
    title: 'GitHub Native',
    description: 'Connect repos, select branches, and deploy from source-of-truth workflows.',
    tone: 'from-fuchsia-100 to-pink-100',
  },
  {
    icon: Lock,
    title: 'Secure by Default',
    description: 'Secrets, private networking, and role-based operational controls.',
    tone: 'from-amber-100 to-orange-100',
  },
  {
    icon: Activity,
    title: 'Observability',
    description: 'Logs, deploy status, runtime health, and operational timelines in one view.',
    tone: 'from-emerald-100 to-teal-100',
  },
  {
    icon: Database,
    title: 'Managed Data Layer',
    description: 'Combine Render Postgres and key-value storage with application services.',
    tone: 'from-indigo-100 to-violet-100',
  },
];

const capabilityRows = [
  { feature: 'Build and deploy from Git', starter: true, growth: true, enterprise: true },
  { feature: 'Autoscaling policies', starter: false, growth: true, enterprise: true },
  { feature: 'Private networking', starter: false, growth: true, enterprise: true },
  { feature: 'Advanced observability', starter: false, growth: true, enterprise: true },
  { feature: 'Compliance workflows', starter: false, growth: false, enterprise: true },
  { feature: 'Priority support', starter: false, growth: false, enterprise: true },
];

const releasePillars = [
  {
    title: 'Release Safety',
    description: 'Controlled rollouts, health checks, and rollback-aware deployments by default.',
    icon: Shield,
    hue: 'from-emerald-100 to-teal-100',
  },
  {
    title: 'Runtime Insight',
    description: 'Real-time logs and performance signals in one operational dashboard.',
    icon: BellRing,
    hue: 'from-cyan-100 to-sky-100',
  },
  {
    title: 'Service Automation',
    description: 'Templates and reusable config blocks reduce repeated setup work.',
    icon: WandSparkles,
    hue: 'from-violet-100 to-fuchsia-100',
  },
  {
    title: 'Scale Controls',
    description: 'Tune capacity behavior without juggling multiple infrastructure tools.',
    icon: ServerCog,
    hue: 'from-amber-100 to-orange-100',
  },
];

const teamUseCases = [
  {
    team: 'Product Teams',
    value: 'Ship experiments rapidly with branch previews and automated release flows.',
    metric: '3x faster iteration loops',
  },
  {
    team: 'Platform Teams',
    value: 'Enforce deployment standards with reusable service templates and policies.',
    metric: '50% less config drift',
  },
  {
    team: 'Security Teams',
    value: 'Audit access, secrets usage, and network boundaries from one control plane.',
    metric: 'Improved compliance readiness',
  },
];

const faqs = [
  {
    question: 'Can our existing CI pipeline still be used?',
    answer:
      'Yes. Many teams keep CI for test quality gates and let the platform handle delivery orchestration, runtime checks, and production rollout controls.',
  },
  {
    question: 'Do these features support multi-environment workflows?',
    answer:
      'Yes. You can standardize staging, preview, and production with environment-specific config while keeping deployment behavior consistent across all services.',
  },
  {
    question: 'Is this suitable for both startup and enterprise scale?',
    answer:
      'Yes. The plan matrix scales from simple release workflows to advanced controls like compliance-oriented operations, networking, and deeper support paths.',
  },
];

const mark = (value) =>
  value ? <span className="font-bold text-emerald-600">Yes</span> : <span className="text-gray-400">-</span>;

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[#f6f7fb]">
      <Navbar />

      <section className="relative bg-white border-b border-gray-200 overflow-hidden">
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
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Features</p>
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mt-4 leading-[1.03]">
              Built for teams that ship every day.
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mt-6 max-w-xl">
              Everything you need to deploy, observe, and scale services with less operational complexity and better
              release confidence.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
              >
                Start deploying
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-md font-semibold text-gray-900 hover:border-gray-500 transition-colors"
              >
                Compare plans
              </Link>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xl">
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Integrated logs and monitoring</p>
            <div className="mt-4 rounded-xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-900">All logs</span>
                <span className="text-xs text-gray-500">Search</span>
              </div>
              <div className="p-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">18:58:02 GET /health</span>
                  <span className="text-emerald-600 font-semibold">200</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">18:58:03 GET /api/projects</span>
                  <span className="text-emerald-600 font-semibold">200</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">18:58:05 POST /deploy</span>
                  <span className="text-emerald-600 font-semibold">201</span>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-gray-200 p-4">
              <p className="text-sm font-semibold text-gray-900">Memory</p>
              <div className="mt-3 flex items-end gap-1 h-16">
                {[32, 42, 36, 49, 30, 54, 39, 45, 52, 41, 57, 44].map((value, index) => (
                  <div
                    key={`bar_${index}`}
                    className="flex-1 bg-linear-to-t from-violet-500 via-fuchsia-500 to-indigo-300 rounded-t"
                    style={{ height: `${value}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Capability Stack</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Platform features that work together.</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureGrid.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all">
                  <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${item.tone} flex items-center justify-center`}>
                    <Icon className="text-gray-900" size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-4">{item.title}</h3>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Release Engine</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
              Feature depth designed for real production complexity.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {releasePillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article key={pillar.title} className="rounded-2xl border border-gray-200 bg-[#fafbff] p-6">
                  <div className={`w-12 h-12 rounded-xl bg-linear-to-br ${pillar.hue} flex items-center justify-center`}>
                    <Icon className="text-gray-900" size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-4">{pillar.title}</h3>
                  <p className="text-gray-600 mt-2">{pillar.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 border-y border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Feature Matrix</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Choose the plan depth you need.</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-170 border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Capability</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Starter</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Growth</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Enterprise</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {capabilityRows.map((row) => (
                  <tr key={row.feature} className="border-t border-gray-200">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.feature}</td>
                    <td className="px-4 py-3 text-sm">{mark(row.starter)}</td>
                    <td className="px-4 py-3 text-sm">{mark(row.growth)}</td>
                    <td className="px-4 py-3 text-sm">{mark(row.enterprise)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Team Outcomes</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
              Different teams, one operational language.
            </h2>
            <p className="text-gray-600 mt-4 max-w-xl">
              Keep product velocity high while preserving reliability, visibility, and compliance practices at scale.
            </p>

            <div className="mt-8 grid gap-4">
              {teamUseCases.map((item) => (
                <article key={item.team} className="rounded-2xl border border-gray-200 bg-white p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-bold text-gray-900">{item.team}</h3>
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-violet-100 text-violet-700">Impact</span>
                  </div>
                  <p className="text-gray-600 mt-2">{item.value}</p>
                  <p className="text-sm font-semibold text-emerald-700 mt-3">{item.metric}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-[#0f172a] text-white p-6">
            <p className="text-xs uppercase tracking-wide text-cyan-200 font-semibold">Feature health board</p>
            <div className="mt-5 space-y-3 text-sm">
              <div className="rounded-lg bg-white/10 p-3 flex items-center justify-between">
                <span>Deploy pipeline</span>
                <span className="text-emerald-300 font-semibold">Stable</span>
              </div>
              <div className="rounded-lg bg-white/10 p-3 flex items-center justify-between">
                <span>Autoscaling policy sync</span>
                <span className="text-cyan-300 font-semibold">Updated</span>
              </div>
              <div className="rounded-lg bg-white/10 p-3 flex items-center justify-between">
                <span>Security guardrail checks</span>
                <span className="text-violet-200 font-semibold">Passing</span>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-white/5 p-4">
              <p className="text-sm font-semibold">Release quality score</p>
              <div className="mt-3 h-2 rounded-full bg-white/20 overflow-hidden">
                <div className="h-full w-[87%] bg-linear-to-r from-cyan-300 via-violet-300 to-emerald-300"></div>
              </div>
              <p className="text-xs text-cyan-100 mt-2 flex items-center gap-2">
                <CircleCheckBig size={14} />
                87/100 checks healthy across environments
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">FAQ</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
              Answers for teams evaluating feature depth.
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((item) => (
              <details key={item.question} className="group rounded-2xl border border-gray-200 bg-[#fafbff] p-6">
                <summary className="list-none cursor-pointer font-bold text-gray-900 flex items-center justify-between gap-4">
                  {item.question}
                  <span className="text-violet-700 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-gray-600 mt-3">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-linear-to-r from-[#f4f2ff] via-[#f8f4ff] to-[#fff2f7] rounded-3xl border border-gray-200 p-8 lg:p-12 text-center">
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900">Build faster, operate smarter.</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Launch services quickly, get deep operational visibility, and scale without adding platform complexity.
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
                Book a demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
