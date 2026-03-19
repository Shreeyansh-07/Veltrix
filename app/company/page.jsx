'use client';

import { ArrowRight, CircleCheckBig, Compass, HeartHandshake, Newspaper, ShieldCheck, Users } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';

export default function CompanyPage() {
  const sections = [
    {
      label: 'About Us',
      href: '/company/about',
      description: 'Our mission, values, and platform journey.',
      icon: Compass,
    },
    {
      label: 'Security',
      href: '/company/security',
      description: 'How we protect workloads and run trusted operations.',
      icon: ShieldCheck,
    },
    {
      label: 'Careers',
      href: '/company/careers',
      description: 'Open roles and culture for builders who ship with impact.',
      icon: Users,
    },
    {
      label: 'Press',
      href: '/company/press',
      description: 'Official updates, media resources, and brand materials.',
      icon: Newspaper,
    },
  ];

  const companyStats = [
    { label: 'Global teams', value: '4,200+' },
    { label: 'Countries represented', value: '31' },
    { label: 'Monthly deployments', value: '1.8M+' },
    { label: 'Platform uptime', value: '99.99%' },
  ];

  const principles = [
    {
      title: 'Build for real operators',
      description: 'We solve practical deployment and reliability problems teams face daily.',
      icon: HeartHandshake,
    },
    {
      title: 'Ship with discipline',
      description: 'Velocity matters, but only when reliability and quality remain uncompromised.',
      icon: CircleCheckBig,
    },
    {
      title: 'Earn trust continuously',
      description: 'Transparent operations, clear communication, and security-first execution guide every release.',
      icon: ShieldCheck,
    },
  ];

  const milestones = [
    {
      year: '2024',
      title: 'Veltrix founded',
      detail: 'Started with a mission to simplify production delivery for modern teams.',
    },
    {
      year: '2025',
      title: 'Platform maturity',
      detail: 'Expanded to preview workflows, autoscaling controls, and API-first automation.',
    },
    {
      year: '2026',
      title: 'Global adoption',
      detail: 'Teams across industries now run critical workloads with Veltrix as their delivery foundation.',
    },
  ];

  const culturePoints = [
    'Distributed collaboration with clear ownership and fast feedback loops',
    'Customer conversations directly influence roadmap and release priorities',
    'Engineering, product, and operations partner from planning through production',
    'Learning-driven environment with strong focus on execution quality',
  ];

  const faqs = [
    {
      question: 'What does Veltrix focus on as a company?',
      answer:
        'We focus on helping teams ship faster while improving reliability, security, and operational clarity in production.',
    },
    {
      question: 'Where can I learn more about company culture and hiring?',
      answer:
        'Visit the Careers page for role openings, team expectations, and details about our hiring process.',
    },
    {
      question: 'How can media or partners reach Veltrix?',
      answer:
        'Use the Press and Contact pages to request interviews, assets, or partnership conversations.',
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
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-700">Company</p>
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mt-4 leading-[1.03]">
              The team behind modern, reliable deployment operations.
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mt-6 max-w-xl">
              Veltrix exists to help engineering teams ship with more speed and confidence by turning platform
              complexity into clear, dependable workflows.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/company/about"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
              >
                Learn our story
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/company/careers"
                className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-md font-semibold text-gray-900 hover:border-gray-500 transition-colors"
              >
                Explore careers
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Company snapshot</p>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {companyStats.map((item) => (
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
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-700">Company pillars</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Principles that shape how we build and support the platform.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {principles.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-2xl border border-gray-200 bg-white p-6">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-emerald-100 to-cyan-100 flex items-center justify-center">
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

      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-700">Milestones</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">A focused journey from idea to global platform adoption.</h2>

            <div className="mt-8 space-y-4">
              {milestones.map((item, index) => (
                <article key={item.year} className="rounded-2xl border border-gray-200 bg-[#fafbff] p-5 flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-emerald-700">{item.year}</p>
                    <h3 className="font-bold text-gray-900 mt-1">{item.title}</h3>
                    <p className="text-gray-600 mt-1">{item.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-[#0f172a] text-white p-6">
            <p className="text-xs uppercase tracking-wide text-emerald-200 font-semibold">How we work</p>
            <div className="mt-5 space-y-3 text-sm">
              {culturePoints.map((point) => (
                <div key={point} className="rounded-lg bg-white/10 p-3 flex items-start gap-2">
                  <CircleCheckBig size={15} className="text-emerald-300 mt-0.5 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-700">Explore company</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Discover the teams and programs behind Veltrix.</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Link
                  key={section.label}
                  href={section.href}
                  className="p-6 border border-gray-200 rounded-2xl hover:border-emerald-300 hover:shadow-lg transition-all bg-white"
                >
                  <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-100 to-cyan-100 flex items-center justify-center">
                    <Icon size={18} className="text-gray-900" />
                  </div>
                  <p className="font-bold text-gray-900 mt-4">{section.label}</p>
                  <p className="text-sm text-gray-600 mt-2">{section.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-emerald-700">Company FAQ</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Common questions about Veltrix and our direction.</h2>
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
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900">Partner with a company focused on reliable software delivery.</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Whether you are scaling your engineering organization or strengthening production operations, Veltrix is
              built to support your journey.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
              >
                Talk to us
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/company/press"
                className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-md font-semibold text-gray-900 hover:border-gray-500 transition-colors"
              >
                Press resources
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
