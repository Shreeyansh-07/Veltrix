'use client';

import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { ArrowRight, CircleCheckBig, Clock3, GitBranch, Rocket, ShieldCheck, Sparkles, Wrench } from 'lucide-react';

export default function ChangelogPage() {
  const highlightStats = [
    { label: 'Releases this quarter', value: '37' },
    { label: 'Avg deploy reliability', value: '99.98%' },
    { label: 'Median rollout time', value: '4m 18s' },
    { label: 'Critical bug turnaround', value: '12h' },
  ];

  const releases = [
    {
      version: 'v3.4.0',
      date: 'Mar 18, 2026',
      category: 'Platform',
      notes: [
        'Added advanced deployment rollback checkpoints with runtime signal gating.',
        'Introduced project-level policy templates for faster onboarding.',
        'Improved deployment timeline visibility in dashboard by 30%.',
      ],
    },
    {
      version: 'v3.3.0',
      date: 'Mar 02, 2026',
      category: 'API',
      notes: [
        'Expanded webhooks with signature verification and retry metadata.',
        'Added granular token scopes for deployments, projects, and audit logs.',
        'Improved API response consistency for automation workflows.',
      ],
    },
    {
      version: 'v3.2.0',
      date: 'Feb 14, 2026',
      category: 'Reliability',
      notes: [
        'Enhanced zero-downtime rollout controls for high-traffic releases.',
        'Improved autoscaling behavior under burst traffic conditions.',
        'Reduced control-plane latency for deployment operations.',
      ],
    },
    {
      version: 'v3.1.0',
      date: 'Jan 30, 2026',
      category: 'Security',
      notes: [
        'Added expanded audit event coverage across project and secrets actions.',
        'Improved RBAC enforcement and account-level access controls.',
        'Shipped new compliance-oriented operational runbook templates.',
      ],
    },
  ];

  const releaseTypes = [
    {
      title: 'Feature Releases',
      detail: 'New platform capabilities and workflow improvements delivered on a steady cadence.',
      icon: Sparkles,
    },
    {
      title: 'Reliability Updates',
      detail: 'Performance and stability enhancements validated under production traffic patterns.',
      icon: ShieldCheck,
    },
    {
      title: 'Fix Packs',
      detail: 'Targeted bug fixes and quality refinements informed by customer feedback loops.',
      icon: Wrench,
    },
  ];

  const processSteps = [
    'Ship behind quality checks and health thresholds',
    'Monitor telemetry and deployment outcomes in real time',
    'Publish changelog entries with clear impact context',
    'Collect customer feedback and prioritize next iteration',
  ];

  const faqs = [
    {
      question: 'How frequently is the changelog updated?',
      answer:
        'Updates are published continuously as releases land, with grouped entries for major platform milestones and patch releases.',
    },
    {
      question: 'Do release notes include breaking changes?',
      answer:
        'Yes. Any breaking or migration-relevant changes are documented with impact details and recommended transition paths.',
    },
    {
      question: 'Can teams subscribe to release updates?',
      answer:
        'Yes. Teams typically follow changelog announcements through internal release channels and dashboard notifications.',
    },
  ];

  const releaseIcon = (category) => {
    if (category === 'Platform') return Rocket;
    if (category === 'API') return GitBranch;
    if (category === 'Reliability') return ShieldCheck;
    return CircleCheckBig;
  };

  const releaseColor = (category) => {
    if (category === 'Platform') return 'bg-cyan-100 text-cyan-700';
    if (category === 'API') return 'bg-violet-100 text-violet-700';
    if (category === 'Reliability') return 'bg-emerald-100 text-emerald-700';
    return 'bg-amber-100 text-amber-700';
  };

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
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-cyan-700">Changelog</p>
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mt-4 leading-[1.03]">
              Product progress, transparently shipped.
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mt-6 max-w-xl">
              Follow every meaningful platform update across deployments, reliability, API workflows, and security
              operations with clear release context.
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
                href="/docs"
                className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-md font-semibold text-gray-900 hover:border-gray-500 transition-colors"
              >
                View docs
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Release health snapshot</p>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {highlightStats.map((item) => (
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
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-cyan-700">Release timeline</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">A chronological view of platform evolution.</h2>
          </div>

          <div className="space-y-6">
            {releases.map((release) => {
              const Icon = releaseIcon(release.category);
              return (
                <article key={release.version} className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center">
                        <Icon size={18} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black text-gray-900">{release.version}</h3>
                        <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                          <Clock3 size={14} />
                          {release.date}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${releaseColor(release.category)}`}>
                      {release.category}
                    </span>
                  </div>

                  <ul className="mt-5 space-y-2 text-sm">
                    {release.notes.map((note) => (
                      <li key={note} className="text-gray-700 flex items-start gap-2">
                        <CircleCheckBig size={15} className="text-emerald-600 mt-0.5 shrink-0" />
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-cyan-700">Update categories</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Every release note maps to clear impact types.</h2>

            <div className="mt-8 grid md:grid-cols-3 gap-4">
              {releaseTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <article key={type.title} className="rounded-2xl border border-gray-200 bg-[#fafbff] p-5">
                    <div className="w-11 h-11 rounded-xl bg-linear-to-br from-cyan-100 to-indigo-100 flex items-center justify-center">
                      <Icon size={20} className="text-gray-900" />
                    </div>
                    <h3 className="font-bold text-gray-900 mt-4">{type.title}</h3>
                    <p className="text-sm text-gray-600 mt-2">{type.detail}</p>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-[#0f172a] text-white p-6">
            <p className="text-xs uppercase tracking-wide text-cyan-200 font-semibold">Release workflow</p>
            <div className="mt-5 space-y-3 text-sm">
              {processSteps.map((step) => (
                <div key={step} className="rounded-lg bg-white/10 p-3 flex items-start gap-2">
                  <CircleCheckBig size={15} className="text-emerald-300 mt-0.5 shrink-0" />
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-cyan-700">Changelog FAQ</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Common questions about release communication.</h2>
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
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900">Stay ahead of every platform improvement.</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Track release cadence, evaluate product changes, and align your team strategy with confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
              >
                Start now
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-md font-semibold text-gray-900 hover:border-gray-500 transition-colors"
              >
                Read engineering blog
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
