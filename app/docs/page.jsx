'use client';

import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { ArrowRight, BookOpen, CircleCheckBig, Code2, Compass, FileCode2, LifeBuoy, Search, ShieldCheck } from 'lucide-react';

export default function DocsPage() {
  const quickStart = [
    { title: 'Installation', duration: '5 min', outcome: 'Local setup and account bootstrap' },
    { title: 'Project Configuration', duration: '8 min', outcome: 'Build/start commands and environment setup' },
    { title: 'First Production Deploy', duration: '12 min', outcome: 'Health checks and rollout verification' },
  ];

  const docTracks = [
    {
      title: 'Platform Fundamentals',
      icon: Compass,
      description: 'Architecture concepts, environments, deployment lifecycle, and service taxonomy.',
      links: ['Core concepts', 'Environment model', 'Deployment flow', 'Project organization'],
    },
    {
      title: 'Guides and Tutorials',
      icon: BookOpen,
      description: 'Hands-on guides for shipping web apps, background workers, APIs, and data services.',
      links: ['Deploy web services', 'Preview workflows', 'Autoscaling setup', 'Observability runbook'],
    },
    {
      title: 'API and Automation',
      icon: Code2,
      description: 'Programmatic workflows for provisioning, deployment, and event-driven operations.',
      links: ['Authentication', 'Projects API', 'Deployments API', 'Webhook events'],
    },
  ];

  const referenceModules = [
    {
      name: 'Authentication',
      summary: 'Token generation, scope strategy, and secure credential rotation workflows.',
      level: 'Foundational',
    },
    {
      name: 'Service Endpoints',
      summary: 'Create, update, and manage projects, deploys, environments, and runtime settings.',
      level: 'Core',
    },
    {
      name: 'Webhooks',
      summary: 'Subscribe to deploy, health, and governance events for external automation.',
      level: 'Advanced',
    },
    {
      name: 'Audit and Logs',
      summary: 'Query operational history and event traces for diagnostics and compliance workflows.',
      level: 'Advanced',
    },
  ];

  const docsWorkflow = [
    'Start with architecture and environment fundamentals',
    'Follow guided deploy examples for your service type',
    'Adopt API workflows for repeatable operations',
    'Apply security and compliance runbooks before scaling',
  ];

  const faqs = [
    {
      question: 'Where should new teams start in the docs?',
      answer:
        'Begin with the quick start path, then move into service-specific deployment guides and environment management references.',
    },
    {
      question: 'Are docs suitable for both beginners and platform engineers?',
      answer:
        'Yes. The structure is layered: introductory concepts for onboarding and deeper API/governance references for advanced teams.',
    },
    {
      question: 'How often are docs updated?',
      answer:
        'Documentation is updated continuously alongside platform features and release workflows to keep guidance current.',
    },
  ];

  const supportChannels = [
    { title: 'Community Discussion', detail: 'Best practices and quick troubleshooting from other teams.' },
    { title: 'Technical Support', detail: 'Priority support for account-level, deployment, and runtime concerns.' },
    { title: 'Architecture Reviews', detail: 'Guided planning for scaling, compliance, and migration programs.' },
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
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-sky-700">Documentation</p>
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mt-4 leading-[1.03]">
              A complete knowledge hub for shipping and scaling on Veltrix.
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mt-6 max-w-xl">
              Learn platform fundamentals, deployment workflows, API integration, and operational best practices with
              guides structured for both new teams and experienced platform engineers.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
              >
                Start building
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/product"
                className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-md font-semibold text-gray-900 hover:border-gray-500 transition-colors"
              >
                Explore product
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Docs search preview</p>
            <div className="mt-4 rounded-xl border border-gray-200 px-4 py-3 flex items-center gap-3 bg-[#fafbff]">
              <Search size={16} className="text-gray-500" />
              <span className="text-sm text-gray-500">Search for deploy hooks, API scopes, rollback patterns...</span>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              {[
                'How to configure preview environments',
                'Secure token rotation policy',
                'Zero downtime rollout checklist',
              ].map((item) => (
                <div key={item} className="rounded-lg border border-gray-200 px-3 py-2 text-gray-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-sky-700">Quick start path</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Get to first production deploy in under 30 minutes.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {quickStart.map((item, index) => (
              <article key={item.title} className="rounded-2xl border border-gray-200 bg-white p-6">
                <div className="w-8 h-8 rounded-full bg-sky-600 text-white text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mt-4">{item.title}</h3>
                <p className="text-sm font-semibold text-sky-700 mt-2">{item.duration}</p>
                <p className="text-gray-600 mt-2">{item.outcome}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-sky-700">Documentation tracks</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Navigate by role, workflow, and technical depth.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {docTracks.map((track) => {
              const Icon = track.icon;
              return (
                <article key={track.title} className="rounded-2xl border border-gray-200 bg-[#fafbff] p-6 dark:bg-[#122032] dark:border-slate-700/70">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-sky-100 to-cyan-100 flex items-center justify-center dark:from-sky-900/40 dark:to-cyan-900/40">
                    <Icon size={20} className="text-gray-900 dark:text-slate-100" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-4 dark:text-slate-100">{track.title}</h3>
                  <p className="text-gray-600 mt-2 dark:text-slate-300">{track.description}</p>
                  <ul className="mt-4 space-y-2 text-sm">
                    {track.links.map((item) => (
                      <li key={item} className="text-sky-700 dark:text-sky-300">{item}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-sky-700">Reference depth</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Detailed references for automation and governance teams.</h2>

            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {referenceModules.map((module) => (
                <article key={module.name} className="rounded-2xl border border-gray-200 bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">{module.level}</p>
                  <h3 className="font-bold text-gray-900 mt-2">{module.name}</h3>
                  <p className="text-sm text-gray-600 mt-2">{module.summary}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-[#0f172a] text-white p-6">
            <p className="text-xs uppercase tracking-wide text-sky-200 font-semibold">Learning progression</p>
            <div className="mt-5 space-y-3 text-sm">
              {docsWorkflow.map((item) => (
                <div key={item} className="rounded-lg bg-white/10 p-3 flex items-start gap-2">
                  <CircleCheckBig size={15} className="text-emerald-300 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-white/5 p-4">
              <p className="text-xs text-sky-100 flex items-center gap-2">
                <FileCode2 size={14} />
                Updated references for API and deployment workflows.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-sky-700">Support channels</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Get help at every stage of your deployment journey.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {supportChannels.map((channel, index) => {
              const icons = [BookOpen, LifeBuoy, ShieldCheck];
              const Icon = icons[index];
              return (
                <article key={channel.title} className="rounded-2xl border border-gray-200 bg-[#fafbff] p-6 dark:bg-[#122032] dark:border-slate-700/70">
                  <div className="w-11 h-11 rounded-xl bg-gray-900 text-white flex items-center justify-center dark:bg-slate-100 dark:text-slate-900">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-4 dark:text-slate-100">{channel.title}</h3>
                  <p className="text-gray-600 mt-2 dark:text-slate-300">{channel.detail}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-sky-700">Docs FAQ</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Frequently asked questions from new teams.</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((item) => (
              <details key={item.question} className="group rounded-2xl border border-gray-200 bg-white p-6">
                <summary className="list-none cursor-pointer font-bold text-gray-900 flex items-center justify-between gap-4">
                  {item.question}
                  <span className="text-sky-700 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-gray-600 mt-3">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-linear-to-r from-[#e7f6ff] via-[#edf7ff] to-[#e8fff9] rounded-3xl border border-gray-200 p-8 lg:p-12 text-center">
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900">Ready to turn docs into production outcomes?</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Start with guided workflows, then scale confidently with automation and governance references.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
              >
                Create account
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-md font-semibold text-gray-900 hover:border-gray-500 transition-colors"
              >
                Talk to support
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
