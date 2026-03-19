'use client';

import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { ArrowRight, ChartNoAxesCombined, CircleCheckBig, Globe, Rocket, ShieldCheck, Users } from 'lucide-react';

export default function CustomersPage() {
  const customerStories = [
    {
      name: 'Helio Health Systems',
      industry: 'Healthcare SaaS',
      result: '41% faster production release cycle',
      summary: 'Unified preview, compliance controls, and zero-downtime deployments across regulated services.',
    },
    {
      name: 'Atlas Commerce Cloud',
      industry: 'E-commerce Infrastructure',
      result: '99.99% seasonal availability',
      summary: 'Scaled traffic-heavy storefront APIs with autoscaling and proactive deployment health gates.',
    },
    {
      name: 'Northgrid Analytics',
      industry: 'Data Platform',
      result: '35% lower operational overhead',
      summary: 'Moved from fragmented scripts to API-driven automation for projects, deploys, and observability.',
    },
  ];

  const trustMetrics = [
    { label: 'Active teams', value: '4,200+' },
    { label: 'Monthly deployments', value: '1.8M+' },
    { label: 'Median deploy time', value: '4m 12s' },
    { label: 'Global regions served', value: '24' },
  ];

  const trustWallLogos = [
    { name: 'Helio Health', top: '18%', left: '30%' },
    { name: 'Atlas Commerce', top: '14%', left: '74%' },
    { name: 'Northgrid', top: '54%', left: '60%' },
    { name: 'Tripoint Travel', top: '70%', left: '43%' },
  ];

  const wallAccents = [
    { top: '6%', left: '70%', color: 'bg-violet-700' },
    { top: '55%', left: '15%', color: 'bg-rose-700' },
    { top: '44%', left: '58%', color: 'bg-blue-700' },
  ];

  const industryCards = [
    {
      title: 'Healthcare and MedTech',
      description: 'Secure service delivery with policy controls and compliance-aware operational workflows.',
      icon: ShieldCheck,
    },
    {
      title: 'SaaS and Product Teams',
      description: 'Faster release velocity with preview environments and reliable production rollouts.',
      icon: Rocket,
    },
    {
      title: 'Global Consumer Platforms',
      description: 'Resilient architecture for high-volume workloads and unpredictable traffic spikes.',
      icon: Globe,
    },
  ];

  const outcomes = [
    'Reduced incident frequency through health-gated releases',
    'Improved developer throughput with reusable deployment workflows',
    'Faster stakeholder approvals through preview sharing',
    'Lower cloud waste through autoscaling and smarter capacity control',
  ];

  const testimonials = [
    {
      quote:
        'Veltrix gave us a cleaner path from pull request to production. Our release confidence has changed completely.',
      author: 'A. Raman',
      role: 'VP Engineering, Atlas Commerce Cloud',
    },
    {
      quote:
        'We replaced manual deployment scripts with consistent platform workflows and reduced on-call load for our team.',
      author: 'K. Mehta',
      role: 'Platform Lead, Northgrid Analytics',
    },
  ];

  return (
    <main className="min-h-screen bg-[#f6f7fb]">
      <Navbar />

      <section className="relative overflow-hidden bg-white border-b border-gray-200">
        <div className="grid lg:grid-cols-[1.05fr_1.35fr] min-h-155">
          <div className="bg-[#d9d0f3] border-r border-gray-200 px-6 lg:px-10 py-14 lg:py-16 flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-700">Customers</p>
              <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mt-4 leading-[1.03]">
                The cloud platform powering businesses of every scale.
              </h1>
            </div>

            <div className="mt-10">
              <p className="text-2xl lg:text-[2.1rem] leading-tight text-gray-900 max-w-xl">
                Veltrix is trusted by innovative teams shipping faster with stronger reliability and operational
                clarity.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
                >
                  Get started for free
                  <ArrowRight size={16} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border border-gray-700 bg-[#e6ddf8] px-6 py-3 rounded-md font-semibold text-gray-900 hover:bg-[#ddd2f4] transition-colors"
                >
                  Contact sales
                  <ArrowRight size={16} />
                </Link>
              </div>

              <div className="mt-8 grid sm:grid-cols-2 gap-3 max-w-xl">
                {trustMetrics.map((metric) => (
                  <div key={metric.label} className="rounded-xl border border-gray-300 bg-white/70 px-4 py-3">
                    <p className="text-2xl font-black text-gray-900">{metric.value}</p>
                    <p className="text-sm text-gray-700 mt-1">{metric.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative bg-[#ebe6f6] overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(#d8cfee 1px, transparent 1px), linear-gradient(90deg, #d8cfee 1px, transparent 1px)',
                backgroundSize: '102px 102px',
              }}
            ></div>

            {wallAccents.map((accent, index) => (
              <div
                key={index}
                className={`absolute w-24 h-16 ${accent.color}`}
                style={{ top: accent.top, left: accent.left }}
              >
                <div className="absolute bottom-3 left-0 right-0 h-2 bg-white/75"></div>
              </div>
            ))}

            {trustWallLogos.map((logo) => (
              <div
                key={logo.name}
                className="absolute w-55 h-32.5 bg-white border border-gray-200 shadow-sm flex items-center justify-center"
                style={{ top: logo.top, left: logo.left }}
              >
                <p className="text-4xl font-bold text-gray-900 tracking-tight">{logo.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-700">Customer stories</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
              Real platform outcomes from teams shipping at scale.
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {customerStories.map((customer) => (
              <article key={customer.name} className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-lg transition-all">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-bold text-gray-900">{customer.name}</p>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">{customer.industry}</span>
                </div>
                <p className="text-sm font-semibold text-cyan-700 mt-4">{customer.result}</p>
                <p className="text-gray-600 mt-2">{customer.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.15fr_1fr] gap-8 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-700">Industry fit</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
              Built for teams operating in diverse runtime environments.
            </h2>

            <div className="mt-8 space-y-4">
              {industryCards.map((item) => {
                const Icon = item.icon;
                return (
                  <article key={item.title} className="rounded-2xl border border-gray-200 bg-[#fafbff] p-5 flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-900 text-white flex items-center justify-center shrink-0">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{item.title}</p>
                      <p className="text-gray-600 mt-1">{item.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-[#0f172a] text-white p-6">
            <p className="text-xs uppercase tracking-wide text-emerald-200 font-semibold">Outcome board</p>
            <div className="mt-5 space-y-3 text-sm">
              {outcomes.map((item) => (
                <div key={item} className="rounded-lg bg-white/10 p-3 flex items-start gap-2">
                  <CircleCheckBig size={15} className="text-emerald-300 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-700">What teams say</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
              Voice of customer from platform and product leaders.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {testimonials.map((item) => (
              <article key={item.author} className="rounded-2xl border border-gray-200 bg-white p-6">
                <p className="text-lg text-gray-700">"{item.quote}"</p>
                <div className="mt-5 pt-4 border-t border-gray-200">
                  <p className="font-bold text-gray-900">{item.author}</p>
                  <p className="text-sm text-gray-600">{item.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          <article className="rounded-2xl border border-gray-200 p-6 bg-[#fafbff]">
            <ChartNoAxesCombined className="text-emerald-700" />
            <h3 className="text-xl font-bold text-gray-900 mt-4">Performance Transparency</h3>
            <p className="text-gray-600 mt-2">Customers track deployment quality with clear timelines, status, and incident context.</p>
          </article>
          <article className="rounded-2xl border border-gray-200 p-6 bg-[#fafbff]">
            <Users className="text-emerald-700" />
            <h3 className="text-xl font-bold text-gray-900 mt-4">Cross-Team Collaboration</h3>
            <p className="text-gray-600 mt-2">Engineering, product, and operations teams align on one deployment surface.</p>
          </article>
          <article className="rounded-2xl border border-gray-200 p-6 bg-[#fafbff]">
            <Rocket className="text-emerald-700" />
            <h3 className="text-xl font-bold text-gray-900 mt-4">Faster Time to Value</h3>
            <p className="text-gray-600 mt-2">Teams launch production workloads sooner by reducing platform fragmentation.</p>
          </article>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-linear-to-r from-[#e8fff1] via-[#eff7ff] to-[#e8fbff] rounded-3xl border border-gray-200 p-8 lg:p-12 text-center">
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900">Join teams shipping confidently on Veltrix.</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Build reliable release workflows, improve uptime, and scale operations with one developer-first platform.
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
                href="/pricing"
                className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-md font-semibold text-gray-900 hover:border-gray-500 transition-colors"
              >
                View pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
