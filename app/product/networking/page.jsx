'use client';

import Link from 'next/link';
import { ArrowRight, Lock, Network, ShieldCheck, Waypoints, Server, Globe, Layers, CircleCheckBig } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const controlCards = [
  {
    title: 'Private Service Mesh',
    description: 'Route internal service-to-service traffic without exposing public endpoints.',
    icon: Network,
  },
  {
    title: 'Ingress Policies',
    description: 'Define which services can be reached externally and by whom.',
    icon: ShieldCheck,
  },
  {
    title: 'Encryption Defaults',
    description: 'Keep traffic encrypted in transit for public and private paths.',
    icon: Lock,
  },
  {
    title: 'Topology Visibility',
    description: 'Understand service dependencies and route boundaries at a glance.',
    icon: Waypoints,
  },
];

const policyRows = [
  { source: 'web-frontend', destination: 'api-gateway', access: 'Allowed', reason: 'Public ingress route' },
  { source: 'api-gateway', destination: 'payments-private', access: 'Allowed', reason: 'Internal service call' },
  { source: 'worker-jobs', destination: 'analytics-private', access: 'Allowed', reason: 'Batch processing' },
  { source: 'public internet', destination: 'payments-private', access: 'Blocked', reason: 'Private-only service' },
];

const architecturePatterns = [
  {
    title: 'Public edge + private core',
    description:
      'Expose only frontend and gateway services publicly, while payments, analytics, and internal APIs stay private.',
    bullets: ['Smaller attack surface', 'Clear ingress boundaries', 'Controlled east-west communication'],
  },
  {
    title: 'Worker and data isolation',
    description:
      'Separate workers and data services into private zones so scheduled and async workloads never require public exposure.',
    bullets: ['Private queue consumers', 'Secure DB connectivity', 'Least-privilege service topology'],
  },
];

const guardrails = [
  {
    title: 'Policy-driven access',
    text: 'Explicit allow/deny routes for every critical service boundary.',
    icon: Layers,
  },
  {
    title: 'Encrypted service links',
    text: 'Default secure transport between services and data layers.',
    icon: Lock,
  },
  {
    title: 'Runtime visibility',
    text: 'Understand route paths, failures, and topology drift quickly.',
    icon: Waypoints,
  },
  {
    title: 'Governed ingress',
    text: 'Public endpoints are intentional, reviewable, and controlled.',
    icon: Globe,
  },
];

const faqItems = [
  {
    q: 'Can private services communicate with public services securely?',
    a: 'Yes. You can define explicit routes so private services only accept traffic from approved internal sources.',
  },
  {
    q: 'Do I need to manage low-level VPC networking manually?',
    a: 'No. Veltrix gives higher-level route and policy controls while still keeping boundary clarity.',
  },
  {
    q: 'How do I prevent accidental public exposure?',
    a: 'Services default to clear exposure types, and private services remain non-public unless intentionally reconfigured.',
  },
  {
    q: 'Can I audit route policy changes?',
    a: 'Yes. Policy and deployment changes can be tracked as part of your operational timeline.',
  },
];

export default function NetworkingPage() {
  return (
    <main className="min-h-screen bg-[#f7f8fc]">
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
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Private Networking</p>
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mt-4 leading-[1.03]">
              Secure service paths without networking chaos.
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mt-6 max-w-xl">
              Connect internal services with explicit route boundaries, encrypted traffic, and predictable access
              policies.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
              >
                Configure private network
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/company/security"
                className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-md font-semibold text-gray-900 hover:border-gray-500 transition-colors"
              >
                Security details
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xl dark:bg-[#0f1b2d] dark:border-slate-700/70">
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Network topology map</p>
            <div className="mt-4 rounded-2xl border border-gray-200 p-4 bg-gray-50 space-y-3 dark:bg-[#13243a] dark:border-slate-700/70">
              <div className="rounded-xl border border-violet-200 bg-violet-50 p-3 dark:bg-violet-900/25 dark:border-violet-700/60">
                <p className="text-xs uppercase tracking-wide text-violet-700 font-semibold">Public Zone</p>
                <p className="text-sm text-gray-700 mt-1">web-frontend, api-gateway</p>
              </div>
              <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-3 dark:bg-indigo-900/25 dark:border-indigo-700/60">
                <p className="text-xs uppercase tracking-wide text-indigo-700 font-semibold">Private Zone</p>
                <p className="text-sm text-gray-700 mt-1">payments-private, analytics-private, worker-jobs</p>
              </div>
              <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 dark:bg-emerald-900/25 dark:border-emerald-700/60">
                <p className="text-xs uppercase tracking-wide text-emerald-700 font-semibold">Data Zone</p>
                <p className="text-sm text-gray-700 mt-1">render-postgres, render-key-value</p>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-gray-200 p-4">
              <p className="text-sm font-semibold text-gray-900">Policy status</p>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-gray-600">Allowed routes</span>
                <span className="font-semibold text-emerald-600">37</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-sm">
                <span className="text-gray-600">Blocked routes</span>
                <span className="font-semibold text-rose-600">12</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Network controls</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Operate with clear trust boundaries.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {controlCards.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-lg transition-all">
                  <div className="w-11 h-11 rounded-xl bg-gray-900 text-white flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-4">{item.title}</h3>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 border-y border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Access matrix</p>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mt-4">Route-level policy examples.</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-170 border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Source</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Destination</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Access</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Reason</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {policyRows.map((row, index) => (
                  <tr key={`policy_${index}`} className="border-t border-gray-200">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.source}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.destination}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className={row.access === 'Allowed' ? 'font-semibold text-emerald-600' : 'font-semibold text-rose-600'}>
                        {row.access}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">{row.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Security guardrails</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Controls that scale with architecture complexity.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {guardrails.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-2xl border border-gray-200 p-6 bg-[#fbfbff] hover:shadow-lg transition-all">
                  <div className="w-11 h-11 rounded-xl bg-black text-white flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-4">{item.title}</h3>
                  <p className="text-gray-600 mt-2">{item.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Reference architectures</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Battle-tested network patterns.</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            {architecturePatterns.map((pattern) => (
              <article key={pattern.title} className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="flex items-center gap-2 text-sm font-semibold text-violet-700">
                  <Server size={16} />
                  Architecture pattern
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mt-3">{pattern.title}</h3>
                <p className="text-gray-600 mt-3">{pattern.description}</p>
                <ul className="mt-4 space-y-2">
                  {pattern.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2 text-sm text-gray-700">
                      <CircleCheckBig size={16} className="text-emerald-600" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-y border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mt-4">Private networking essentials.</h2>
          </div>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <details key={item.q} className="group rounded-xl border border-gray-200 p-5 bg-[#fafbff] open:bg-white dark:bg-[#122032] dark:border-slate-700/70 dark:open:bg-[#1a2a40]">
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between gap-3 dark:text-slate-100">
                  {item.q}
                  <span className="text-gray-500 group-open:rotate-45 transition-transform dark:text-slate-300">+</span>
                </summary>
                <p className="text-gray-600 mt-3 text-sm leading-relaxed dark:text-slate-300">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-linear-to-r from-[#eef6ff] via-[#f4f2ff] to-[#fff5f8] rounded-3xl border border-gray-200 p-8 lg:p-12 text-center">
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900">Network with confidence from day zero.</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Keep public edges clean and internal communication protected as your architecture grows.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
              >
                Start building
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
