'use client';

import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { ArrowRight, CircleCheckBig, Eye, KeyRound, Lock, Shield, ShieldCheck, Timer, Zap } from 'lucide-react';

export default function SecurityPage() {
  const features = [
    {
      icon: Lock,
      title: 'Encryption Standards',
      description: 'Data in transit and at rest is protected with modern encryption controls.',
    },
    {
      icon: Shield,
      title: 'Compliance Foundations',
      description: 'Security practices aligned for SOC 2, HIPAA-oriented workflows, and governance reviews.',
    },
    {
      icon: Eye,
      title: 'Continuous Monitoring',
      description: 'Operational and security telemetry is monitored with proactive signal tracking.',
    },
    {
      icon: Zap,
      title: 'Rapid Response',
      description: 'Defined incident response procedures support fast triage and remediation paths.',
    },
  ];

  const trustStats = [
    { label: 'Security events reviewed daily', value: '2.4K+' },
    { label: 'Median incident triage', value: '11 min' },
    { label: 'Critical patch SLA', value: '< 24h' },
    { label: 'Annual security audits', value: '4+' },
  ];

  const securityLayers = [
    {
      title: 'Identity and Access',
      detail: 'Role-based access, scoped permissions, and strict authentication boundaries.',
      icon: KeyRound,
    },
    {
      title: 'Network Controls',
      detail: 'Private networking options, ingress restrictions, and service isolation patterns.',
      icon: ShieldCheck,
    },
    {
      title: 'Runtime Protections',
      detail: 'Monitoring, anomaly detection, and deployment health checks for production workloads.',
      icon: Eye,
    },
  ];

  const responseStages = [
    'Automated detection and alert routing',
    'Rapid triage with severity classification',
    'Containment and mitigation execution',
    'Post-incident review and control hardening',
  ];

  const controls = [
    {
      area: 'Access Governance',
      implementation: 'RBAC with least-privilege patterns and scheduled access reviews',
      status: 'Active',
    },
    {
      area: 'Data Protection',
      implementation: 'Encrypted transport and encrypted storage with key lifecycle practices',
      status: 'Active',
    },
    {
      area: 'Audit Visibility',
      implementation: 'Event logs for account actions, deployments, and policy changes',
      status: 'Active',
    },
    {
      area: 'Incident Readiness',
      implementation: '24/7 monitoring workflows and documented escalation runbooks',
      status: 'Validated',
    },
  ];

  const faqs = [
    {
      question: 'How does Veltrix approach platform security?',
      answer:
        'Security is built across identity, network, runtime, and operations layers with continuous control improvement and transparent processes.',
    },
    {
      question: 'Can enterprise teams align Veltrix with internal compliance programs?',
      answer:
        'Yes. Teams can map platform controls to internal governance requirements and extend workflows with organization-specific policies.',
    },
    {
      question: 'How are incidents communicated to customers?',
      answer:
        'We use structured incident communication processes including status updates, impact context, and post-incident summaries.',
    },
  ];

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
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-700">Security</p>
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mt-4 leading-[1.03]">
              Security architecture built for modern platform operations.
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mt-6 max-w-xl">
              Veltrix applies layered controls across identity, infrastructure, and operations to protect customer
              workloads and maintain trusted production delivery.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
              >
                Contact security team
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/product/hipaa"
                className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-md font-semibold text-gray-900 hover:border-gray-500 transition-colors"
              >
                Compliance details
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Trust and readiness metrics</p>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {trustStats.map((item) => (
                <div key={item.label} className="rounded-xl border border-gray-200 bg-[#fafbff] p-4">
                  <p className="text-2xl font-black text-gray-900">{item.value}</p>
                  <p className="text-sm text-gray-600 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-700">Core controls</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Protective controls embedded across the platform lifecycle.</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <article key={feature.title} className="p-6 border border-gray-200 rounded-2xl bg-white hover:shadow-lg transition-all">
                  <Icon className="w-8 h-8 text-emerald-700 mb-4" />
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-700">Security layers</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Defense-in-depth for identity, network, and runtime operations.</h2>

            <div className="mt-8 space-y-4">
              {securityLayers.map((layer) => {
                const Icon = layer.icon;
                return (
                  <article key={layer.title} className="rounded-2xl border border-gray-200 bg-[#fafbff] p-5 flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center shrink-0">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{layer.title}</p>
                      <p className="text-gray-600 mt-1">{layer.detail}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-[#0f172a] text-white p-6">
            <p className="text-xs uppercase tracking-wide text-emerald-200 font-semibold">Incident response lifecycle</p>
            <div className="mt-5 space-y-3 text-sm">
              {responseStages.map((step) => (
                <div key={step} className="rounded-lg bg-white/10 p-3 flex items-start gap-2">
                  <Timer size={15} className="text-emerald-300 mt-0.5 shrink-0" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-700">Control matrix</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Security implementation coverage by domain.</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-170 border border-gray-200 rounded-xl overflow-hidden bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Control area</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Implementation</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {controls.map((row) => (
                  <tr key={row.area} className="border-t border-gray-200">
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">{row.area}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{row.implementation}</td>
                    <td className="px-4 py-3 text-sm">
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">{row.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-700">Security FAQ</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Frequently asked trust and security questions.</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((item) => (
              <details key={item.question} className="group rounded-2xl border border-gray-200 bg-[#fafbff] p-6">
                <summary className="list-none cursor-pointer font-bold text-gray-900 flex items-center justify-between gap-4">
                  {item.question}
                  <span className="text-emerald-700 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-gray-600 mt-3">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-linear-to-r from-[#e8fff2] via-[#edf7ff] to-[#e8fbff] rounded-3xl border border-gray-200 p-8 lg:p-12 text-center">
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900">Need a deeper security review for your team?</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Our team can walk through architecture controls, compliance workflows, and implementation guidance.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
              >
                Contact security
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/product/hipaa"
                className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-md font-semibold text-gray-900 hover:border-gray-500 transition-colors"
              >
                View compliance page
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
