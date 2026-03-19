'use client';

import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { ArrowRight, CircleCheckBig, Compass, Globe, HeartHandshake, Rocket, Users } from 'lucide-react';

export default function CareersPage() {
  const jobs = [
    {
      title: 'Senior Backend Engineer',
      location: 'Remote',
      team: 'Platform Engineering',
      type: 'Full-time',
      summary: 'Design resilient service architecture and high-scale deployment control APIs.',
    },
    {
      title: 'Full Stack Developer',
      location: 'San Francisco, CA',
      team: 'Product Experience',
      type: 'Full-time',
      summary: 'Build high-quality product surfaces across dashboard, workflows, and collaboration tools.',
    },
    {
      title: 'DevOps Engineer',
      location: 'Remote',
      team: 'Reliability',
      type: 'Full-time',
      summary: 'Improve rollout safety, observability systems, and incident automation paths.',
    },
    {
      title: 'Security Engineer',
      location: 'Bangalore, IN',
      team: 'Security and Compliance',
      type: 'Full-time',
      summary: 'Advance infrastructure hardening, policy controls, and audit-readiness workflows.',
    },
  ];

  const culturePillars = [
    {
      title: 'Ownership with Context',
      description: 'We optimize for outcomes and shared understanding, not isolated output.',
      icon: Compass,
    },
    {
      title: 'Customer-Backed Priorities',
      description: 'Roadmap decisions are grounded in real platform pain points and customer needs.',
      icon: HeartHandshake,
    },
    {
      title: 'High Standards, Fast Iteration',
      description: 'We ship quickly while maintaining quality, reliability, and long-term maintainability.',
      icon: Rocket,
    },
  ];

  const hiringJourney = [
    'Introductory conversation and role fit alignment',
    'Technical and problem-solving interview loop',
    'Cross-functional collaboration discussion',
    'Final conversation and offer process',
  ];

  const benefits = [
    'Competitive compensation and equity package',
    'Remote-first flexibility with global team collaboration',
    'Learning budget for conferences and certifications',
    'Comprehensive health and wellness support',
    'Generous time-off and recharge policies',
  ];

  const teamStats = [
    { label: 'Countries represented', value: '14' },
    { label: 'Engineering + product team', value: '95+' },
    { label: 'Monthly candidate interviews', value: '120+' },
    { label: 'Avg role close time', value: '28 days' },
  ];

  const faqs = [
    {
      question: 'Do you support remote hiring across regions?',
      answer:
        'Yes. We are distributed by default and actively hire across multiple regions with role-specific timezone overlap expectations.',
    },
    {
      question: 'How should candidates prepare for interviews?',
      answer:
        'Focus on practical problem-solving, collaborative communication, and examples of delivering reliable software in real environments.',
    },
    {
      question: 'Can I apply to multiple roles?',
      answer:
        'Yes. Apply to the role that best matches your strengths, and our team can recommend alternatives during the process.',
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
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-indigo-700">Careers</p>
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mt-4 leading-[1.03]">
              Build the future of platform delivery with us.
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mt-6 max-w-xl">
              Join a team obsessed with shipping reliable infrastructure experiences that help developers move faster
              with confidence.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/company/careers"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
              >
                View open roles
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/company/about"
                className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-md font-semibold text-gray-900 hover:border-gray-500 transition-colors"
              >
                About Veltrix
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Team snapshot</p>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {teamStats.map((item) => (
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
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-indigo-700">Why join</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Work on meaningful infrastructure challenges.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {culturePillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <article key={pillar.title} className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-indigo-100 to-sky-100 flex items-center justify-center">
                    <Icon size={20} className="text-gray-900" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-4">{pillar.title}</h3>
                  <p className="text-gray-600 mt-2">{pillar.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-indigo-700">Open positions</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Roles for builders who love shipping with impact.</h2>

            <div className="mt-8 space-y-4">
              {jobs.map((job) => (
                <article key={job.title} className="rounded-2xl border border-gray-200 bg-[#fafbff] p-6 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-indigo-100 text-indigo-700">{job.type}</span>
                  </div>
                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                    <Globe size={14} />
                    {job.location}
                    <span className="text-gray-400">•</span>
                    <Users size={14} />
                    {job.team}
                  </div>
                  <p className="text-gray-600 mt-3">{job.summary}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-[#0f172a] text-white p-6">
            <p className="text-xs uppercase tracking-wide text-indigo-200 font-semibold">Hiring journey</p>
            <div className="mt-5 space-y-3 text-sm">
              {hiringJourney.map((step) => (
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
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-indigo-700">Benefits</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Support that helps teams do their best work.</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {benefits.map((benefit) => (
              <div key={benefit} className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-700 flex items-start gap-2">
                <CircleCheckBig size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-indigo-700">Careers FAQ</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Questions candidates ask most often.</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((item) => (
              <details key={item.question} className="group rounded-2xl border border-gray-200 bg-[#fafbff] p-6">
                <summary className="list-none cursor-pointer font-bold text-gray-900 flex items-center justify-between gap-4">
                  {item.question}
                  <span className="text-indigo-700 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-gray-600 mt-3">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-linear-to-r from-[#ecf1ff] via-[#eef8ff] to-[#edfff8] rounded-3xl border border-gray-200 p-8 lg:p-12 text-center">
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900">Ready to build the future with us?</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Join a mission-driven team helping developers and organizations ship better software at scale.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
              >
                Apply now
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/company/about"
                className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-md font-semibold text-gray-900 hover:border-gray-500 transition-colors"
              >
                Learn about company
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
