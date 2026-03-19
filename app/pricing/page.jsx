'use client';

import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import Link from 'next/link';
import { ArrowRight, Check, CircleCheckBig, Gauge, Handshake, ShieldCheck, Sparkles } from 'lucide-react';

export default function PricingPage() {
  const plans = [
    {
      name: 'Starter',
      price: '$7',
      period: '/month',
      description: 'Perfect for early-stage products and solo builders.',
      features: [
        'Up to 3 projects',
        '1GB storage',
        'Community support',
        'Basic monitoring',
      ],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Professional',
      price: '$24',
      period: '/month',
      description: 'For scaling product teams and production workflows.',
      features: [
        'Unlimited projects',
        '100GB storage',
        'Priority email support',
        'Advanced monitoring',
        'Custom domains',
        'API access',
      ],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For regulated and mission-critical organizations.',
      features: [
        'Everything in Pro',
        'Dedicated support',
        'Custom SLA',
        'SSO',
        'Compliance',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  const compareRows = [
    { capability: 'Concurrent deployments', starter: '1', pro: '10', enterprise: 'Unlimited' },
    { capability: 'Environment isolation', starter: 'Basic', pro: 'Advanced', enterprise: 'Advanced + policy controls' },
    { capability: 'Observability depth', starter: 'Core logs', pro: 'Logs + metrics', enterprise: 'Full observability suite' },
    { capability: 'SLA options', starter: '-', pro: 'Standard', enterprise: 'Custom SLA' },
    { capability: 'Compliance support', starter: '-', pro: 'Guidance', enterprise: 'HIPAA/SOC workflows' },
    { capability: 'Support model', starter: 'Community', pro: 'Priority email', enterprise: 'Dedicated technical partner' },
  ];

  const valuePillars = [
    {
      title: 'Predictable Cost Scaling',
      description: 'Move from MVP to multi-service production without pricing surprises.',
      icon: Gauge,
    },
    {
      title: 'Reliability Included',
      description: 'Every plan ships with deployment health checks and platform guardrails.',
      icon: ShieldCheck,
    },
    {
      title: 'Upgrade Without Rework',
      description: 'Scale plans while preserving your existing service architecture and workflows.',
      icon: Sparkles,
    },
  ];

  const faqs = [
    {
      question: 'Can we start on Starter and move to Professional later?',
      answer:
        'Yes. Most teams begin with Starter and upgrade as deployment frequency, storage, and operational requirements increase.',
    },
    {
      question: 'How does Enterprise pricing work?',
      answer:
        'Enterprise plans are tailored around workload profile, support requirements, and governance needs such as compliance and security operations.',
    },
    {
      question: 'Do you offer annual contracts?',
      answer:
        'Yes. Annual and multi-year options are available for teams that want cost predictability and strategic support alignment.',
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
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-cyan-700">Pricing</p>
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mt-4 leading-[1.03]">
              Pricing that scales with product momentum.
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mt-6 max-w-xl">
              Clear plans for every growth stage, from early deployments to enterprise-grade operations with
              reliability and governance built in.
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
                href="/contact"
                className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-md font-semibold text-gray-900 hover:border-gray-500 transition-colors"
              >
                Talk to sales
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Estimated monthly profile</p>
            <div className="mt-4 rounded-xl border border-gray-200 p-4 bg-[#fafbff]">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">3 services + autoscaling</span>
                <span className="font-semibold text-gray-900">Professional fit</span>
              </div>
              <div className="mt-4 h-2 rounded-full bg-gray-200 overflow-hidden">
                <div className="h-full w-[68%] bg-linear-to-r from-cyan-500 via-indigo-500 to-emerald-400"></div>
              </div>
              <p className="text-xs text-gray-600 mt-3">Includes API access, advanced monitoring, and custom domains.</p>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2">
                <span className="text-gray-600">Projected reliability uplift</span>
                <span className="text-emerald-700 font-semibold">+27%</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2">
                <span className="text-gray-600">Operations effort reduction</span>
                <span className="text-cyan-700 font-semibold">-34%</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-cyan-700">Plans</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Choose a plan that matches your delivery stage.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 p-8 flex flex-col bg-white ${
                  plan.highlighted
                    ? 'border-cyan-600 shadow-xl md:scale-105'
                    : 'border-gray-200 hover:border-cyan-400 hover:shadow-lg'
                }`}
              >
                {plan.highlighted && (
                  <div className="mb-4">
                    <span className="bg-cyan-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 text-sm mb-6">{plan.description}</p>

                <div className="mb-6">
                  <span className="text-5xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>

                <button
                  className={`w-full py-3 rounded-lg font-semibold mb-8 transition-all ${
                    plan.highlighted
                      ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                      : 'border border-gray-300 text-gray-900 hover:border-cyan-600'
                  }`}
                >
                  {plan.cta}
                </button>

                <ul className="space-y-3 flex-1">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-3 text-gray-700 text-sm">
                      <Check size={18} className="text-green-600 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-cyan-700">Value pillars</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Why teams pick Veltrix across every growth phase.</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {valuePillars.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="rounded-2xl border border-gray-200 bg-[#fafbff] p-6">
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

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-cyan-700">Plan comparison</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Compare capabilities before you commit.</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-170 border border-gray-200 rounded-xl overflow-hidden bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Capability</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Starter</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Professional</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={row.capability} className="border-t border-gray-200">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.capability}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{row.starter}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{row.pro}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{row.enterprise}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-cyan-700">Enterprise readiness</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Need tailored contracts, support, and security alignment?</h2>
            <p className="text-gray-600 mt-4 max-w-xl">
              Enterprise plans combine dedicated technical guidance, custom SLA terms, and governance workflows for
              regulated or large-scale delivery programs.
            </p>

            <div className="mt-8 space-y-3">
              {[
                'Dedicated onboarding and architecture review',
                'Custom SLA and escalation paths',
                'Security and compliance workflow support',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm text-gray-700">
                  <CircleCheckBig size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Consultation request</p>
            <div className="mt-4 rounded-xl bg-[#0f172a] text-white p-4">
              <p className="font-semibold flex items-center gap-2">
                <Handshake size={16} />
                Enterprise planning call
              </p>
              <p className="text-sm text-cyan-100 mt-2">Get architecture, migration, and cost guidance from solution experts.</p>
            </div>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-2 w-full justify-center bg-cyan-600 text-white py-3 rounded-lg font-semibold hover:bg-cyan-700 transition-colors"
            >
              Book consultation
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-cyan-700">FAQ</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Billing and plan questions teams ask most.</h2>
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
          <div className="bg-linear-to-r from-[#e8fbff] via-[#eff7ff] to-[#e8fff3] rounded-3xl border border-gray-200 p-8 lg:p-12 text-center">
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900">Pick a plan and start shipping this week.</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              From first deployment to enterprise-grade reliability, you can scale with predictable cost and fewer
              operational bottlenecks.
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
                Contact sales
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
