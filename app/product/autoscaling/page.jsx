'use client';

import Link from 'next/link';
import { ArrowRight, Gauge, LineChart, Rocket, Timer, Cpu, Activity, CircleCheckBig, AlarmClock } from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const scalingSignals = [
  { label: 'CPU', value: '82%', status: 'Scale up trigger' },
  { label: 'Memory', value: '68%', status: 'Healthy range' },
  { label: 'Request Queue', value: '1.9k', status: 'Burst detected' },
  { label: 'p95 Latency', value: '214ms', status: 'Within target' },
];

const policyRows = [
  { service: 'api-gateway', min: '2', max: '30', signal: 'CPU + p95 latency' },
  { service: 'worker-transcoder', min: '1', max: '50', signal: 'Queue depth + age' },
  { service: 'event-processor', min: '2', max: '40', signal: 'Message throughput' },
  { service: 'web-frontend', min: '2', max: '20', signal: 'Request concurrency' },
];

const milestones = [
  {
    title: 'Predictive warm-up',
    description: 'Prepare capacity before peak windows using recurring traffic patterns.',
    icon: Timer,
  },
  {
    title: 'Real-time reaction',
    description: 'Add or remove instances based on live service telemetry and queue pressure.',
    icon: Gauge,
  },
  {
    title: 'Cost guardrails',
    description: 'Use min/max boundaries and cooldown windows to avoid wasteful flapping.',
    icon: LineChart,
  },
  {
    title: 'Safe rollouts',
    description: 'Scale and deploy together with health-gated release behavior.',
    icon: Rocket,
  },
];

const decisionCards = [
  {
    title: 'Signal ingestion',
    text: 'Collect request rate, queue lag, memory pressure, and p95 latency continuously.',
    icon: Activity,
  },
  {
    title: 'Policy evaluation',
    text: 'Evaluate min/max boundaries, cooldown, and service-specific scaling constraints.',
    icon: Cpu,
  },
  {
    title: 'Capacity action',
    text: 'Scale up or down with health-aware orchestration and predictable traffic behavior.',
    icon: CircleCheckBig,
  },
];

const useCases = [
  {
    name: 'Bursting API traffic',
    summary: 'Scale frontend APIs during launch or campaign spikes while preserving p95 latency.',
    impact: 'Up to 63% lower tail latency during spikes',
  },
  {
    name: 'Queue-backed workers',
    summary: 'Scale workers from queue depth so backlog drains quickly without overprovisioning.',
    impact: '2.7x faster backlog recovery windows',
  },
  {
    name: 'Off-peak cost control',
    summary: 'Reduce idle spend by scaling down safely during low activity periods.',
    impact: '31% average cost reduction off-peak',
  },
];

const faqItems = [
  {
    q: 'Can I set hard limits so autoscaling does not overspend?',
    a: 'Yes. Every service can define min and max instance boundaries with cooldown windows to prevent flapping.',
  },
  {
    q: 'Does autoscaling work for web services and workers?',
    a: 'Yes. Web services can scale using traffic and latency signals, while workers can scale from queue pressure metrics.',
  },
  {
    q: 'How does autoscaling interact with deployments?',
    a: 'Deployments remain health-gated. Autoscaling adjusts healthy capacity and keeps rollout safety intact.',
  },
  {
    q: 'Can I start with conservative defaults?',
    a: 'You can begin with default policies and gradually tune thresholds as your traffic patterns become clearer.',
  },
];

export default function AutoscalingPage() {
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
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Autoscaling</p>
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mt-4 leading-[1.03]">
              Scale with live demand, not guesswork.
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mt-6 max-w-xl">
              Veltrix continuously watches traffic and queue signals to expand capacity when users need it and contract
              when they do not, with clear policy controls.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
              >
                Enable autoscaling
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/product/features"
                className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-md font-semibold text-gray-900 hover:border-gray-500 transition-colors"
              >
                View all capabilities
              </Link>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xl">
              <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Live scaling signals</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                {scalingSignals.map((signal) => (
                  <div key={signal.label} className="rounded-xl border border-gray-200 p-3 bg-gray-50">
                    <p className="text-xs uppercase tracking-wide text-gray-500">{signal.label}</p>
                    <p className="text-2xl font-black text-gray-900 mt-1">{signal.value}</p>
                    <p className="text-xs text-violet-700 font-semibold mt-1">{signal.status}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xl">
              <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Capacity trend</p>
              <div className="mt-4 h-24 rounded-xl bg-linear-to-r from-violet-100 via-fuchsia-100 to-indigo-100 p-3 flex items-end gap-2">
                {[18, 22, 26, 24, 30, 38, 36, 44, 42, 48, 45, 52].map((value, index) => (
                  <div key={`scale_bar_${index}`} className="flex-1 bg-black/80 rounded-t" style={{ height: `${value}%` }}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Operational model</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Designed for stable latency and controlled spend.</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {milestones.map((item) => {
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
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Policy matrix</p>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mt-4">Tune scaling boundaries per service.</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-170 border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Service</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Min instances</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Max instances</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Primary signal</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {policyRows.map((row) => (
                  <tr key={row.service} className="border-t border-gray-200">
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.service}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{row.min}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{row.max}</td>
                    <td className="px-4 py-3 text-sm text-violet-700 font-semibold">{row.signal}</td>
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
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Scaling engine</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">How autoscaling decisions are made.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {decisionCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className="rounded-2xl border border-gray-200 p-6 bg-[#fbfbff] hover:shadow-lg transition-all">
                  <div className="w-11 h-11 rounded-xl bg-black text-white flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-4">{card.title}</h3>
                  <p className="text-gray-600 mt-2">{card.text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-10 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Use-case outcomes</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Built for real production traffic patterns.</h2>
          </div>
          <div className="space-y-5">
            {useCases.map((item) => (
              <article key={item.name} className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-7">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{item.name}</h3>
                    <p className="text-gray-600 mt-2">{item.summary}</p>
                  </div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 text-violet-700 font-semibold text-sm w-fit">
                    <AlarmClock size={16} />
                    {item.impact}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-y border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">FAQ</p>
            <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mt-4">Autoscaling questions teams ask first.</h2>
          </div>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <details key={item.q} className="group rounded-xl border border-gray-200 p-5 open:bg-gray-50">
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex items-center justify-between gap-3">
                  {item.q}
                  <span className="text-gray-500 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-gray-600 mt-3 text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-linear-to-r from-[#f4f2ff] via-[#f8f4ff] to-[#fff2f7] rounded-3xl border border-gray-200 p-8 lg:p-12 text-center">
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900">Autoscaling that behaves in production.</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Keep user experience smooth while controlling cost with explicit scaling policy boundaries.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
              >
                Start now
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
