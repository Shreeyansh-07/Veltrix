'use client';

import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { ArrowRight, Compass, Globe, HeartHandshake, Lightbulb, Rocket, ShieldCheck, Users } from 'lucide-react';

export default function AboutPage() {
  const missionPoints = [
    'Make production infrastructure accessible to every team',
    'Reduce release risk through reliable platform defaults',
    'Help builders move from idea to scale without complexity debt',
  ];

  const timeline = [
    {
      year: '2024',
      title: 'Company Founded',
      detail: 'Started with a mission to simplify deployment operations for modern teams.',
    },
    {
      year: '2025',
      title: 'Platform Expansion',
      detail: 'Added autoscaling, private networking, and API-driven automation workflows.',
    },
    {
      year: '2026',
      title: 'Global Team Adoption',
      detail: 'Scaled to teams across industries running production workloads with confidence.',
    },
  ];

  const values = [
    {
      title: 'Customer-Centered Engineering',
      description: 'We prioritize real operational pain points over feature vanity.',
      icon: HeartHandshake,
    },
    {
      title: 'Reliability by Design',
      description: 'Every workflow is built with safety, observability, and resilience in mind.',
      icon: ShieldCheck,
    },
    {
      title: 'Continuous Learning',
      description: 'We iterate quickly, measure outcomes, and improve transparently.',
      icon: Lightbulb,
    },
  ];

  const cultureCards = [
    {
      title: 'Distributed by default',
      detail: 'Our teams collaborate across locations with strong async culture and clear ownership.',
      icon: Globe,
    },
    {
      title: 'Builders with context',
      detail: 'Engineering, design, and platform operations work closely from planning to production.',
      icon: Users,
    },
    {
      title: 'Ship with purpose',
      detail: 'We optimize for meaningful outcomes, not just release velocity.',
      icon: Rocket,
    },
  ];

  const byTheNumbers = [
    { label: 'Teams served', value: '4,200+' },
    { label: 'Monthly deployments', value: '1.8M+' },
    { label: 'Countries represented', value: '31' },
    { label: 'Platform uptime', value: '99.99%' },
  ];

  const leadershipPrinciples = [
    'Own outcomes, not only output',
    'Communicate clearly and document decisions',
    'Default to high standards with practical execution',
    'Build trust through transparency and follow-through',
  ];

  const faqs = [
    {
      question: 'What makes Veltrix different from other deployment platforms?',
      answer:
        'Veltrix combines developer velocity with production-grade reliability and governance in one cohesive platform workflow.',
    },
    {
      question: 'Who uses Veltrix today?',
      answer:
        'From startup product teams to regulated enterprises, teams use Veltrix for deploy, scale, and operations workflows.',
    },
    {
      question: 'How can teams engage with Veltrix for enterprise programs?',
      answer:
        'Our team supports architecture planning, migration strategies, and reliability/compliance-oriented deployment design.',
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
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-700">About Veltrix</p>
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mt-4 leading-[1.03]">
              Building the platform teams trust to ship at scale.
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mt-6 max-w-xl">
              Veltrix was created to remove infrastructure friction so product and engineering teams can focus on
              delivering meaningful user value with confidence.
            </p>

            <div className="mt-8 space-y-2 text-sm">
              {missionPoints.map((point) => (
                <div key={point} className="flex items-start gap-2 text-gray-700">
                  <Compass size={15} className="text-emerald-700 mt-0.5 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">By the numbers</p>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {byTheNumbers.map((item) => (
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
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-700">Our story</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">A focused journey from platform idea to global adoption.</h2>
          </div>

          <div className="space-y-4">
            {timeline.map((item, index) => (
              <article key={item.year} className="rounded-2xl border border-gray-200 bg-white p-6 grid md:grid-cols-[100px_1fr] gap-4">
                <div className="text-2xl font-black text-emerald-700">{item.year}</div>
                <div>
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                      {index + 1}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 mt-2">{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-700">Core values</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Principles that shape how we design and deliver.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <article key={value.title} className="rounded-2xl border border-gray-200 bg-[#fafbff] p-6">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-100 to-cyan-100 flex items-center justify-center">
                    <Icon size={20} className="text-gray-900" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-4">{value.title}</h3>
                  <p className="text-gray-600 mt-2">{value.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-700">Culture in practice</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">How we work together to build better outcomes.</h2>

            <div className="mt-8 space-y-4">
              {cultureCards.map((card) => {
                const Icon = card.icon;
                return (
                  <article key={card.title} className="rounded-2xl border border-gray-200 bg-white p-5 flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center shrink-0">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{card.title}</p>
                      <p className="text-gray-600 mt-1">{card.detail}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-[#0f172a] text-white p-6">
            <p className="text-xs uppercase tracking-wide text-emerald-200 font-semibold">Leadership principles</p>
            <div className="mt-5 space-y-3 text-sm">
              {leadershipPrinciples.map((item) => (
                <div key={item} className="rounded-lg bg-white/10 p-3 flex items-start gap-2">
                  <ShieldCheck size={15} className="text-emerald-300 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-700">About FAQ</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Answers to common company and platform questions.</h2>
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
          <div className="bg-linear-to-r from-[#e8fff3] via-[#edf7ff] to-[#e8fbff] rounded-3xl border border-gray-200 p-8 lg:p-12 text-center">
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900">Build with a platform partner focused on your outcomes.</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Whether you are launching your first service or scaling a global product, Veltrix helps your team ship
              with reliability and confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
              >
                Get started
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

      <Footer />
    </main>
  );
}
