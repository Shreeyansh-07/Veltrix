'use client';

import Link from 'next/link';
import {
	ArrowRight,
	Activity,
	CircleCheckBig,
	HeartPulse,
	RotateCcw,
	ShieldCheck,
	Timer,
	TrafficCone,
} from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const deploymentPrinciples = [
	{
		title: 'Progressive Traffic Shift',
		description: 'Gradually route traffic to new versions while preserving user session stability.',
		icon: TrafficCone,
	},
	{
		title: 'Continuous Health Gates',
		description: 'Runtime checks validate service quality before and during rollout windows.',
		icon: HeartPulse,
	},
	{
		title: 'Instant Rollback Paths',
		description: 'Fallback safely to last known good versions when critical checks fail.',
		icon: RotateCcw,
	},
];

const rolloutTimeline = [
	{
		phase: 'Build and stage',
		detail: 'Create a verified release artifact and warm up target instances.',
		target: 'Readiness >= 100%',
	},
	{
		phase: 'Pre-flight checks',
		detail: 'Run smoke tests, dependency checks, and environment-level guardrails.',
		target: 'Checks passing',
	},
	{
		phase: 'Traffic transition',
		detail: 'Shift user traffic in controlled batches while monitoring error and latency.',
		target: 'Error rate steady',
	},
	{
		phase: 'Post-release watch',
		detail: 'Observe runtime metrics and rollback instantly if quality regresses.',
		target: 'SLO stable',
	},
];

const runtimeSignals = [
	{ label: 'p95 Latency', value: '184ms', status: 'Stable' },
	{ label: 'Error Rate', value: '0.08%', status: 'Healthy' },
	{ label: 'Availability', value: '99.99%', status: 'Passing' },
	{ label: 'Rollback Time', value: '< 45s', status: 'Ready' },
];

const scenarios = [
	{
		title: 'High-Traffic Product Launches',
		summary: 'Deploy during active peak windows with progressive safety controls.',
	},
	{
		title: 'Backend API Version Upgrades',
		summary: 'Transition between service versions while preserving consumer reliability.',
	},
	{
		title: 'Compliance-Critical Releases',
		summary: 'Track every rollout checkpoint with audit-friendly deployment timelines.',
	},
];

const faqs = [
	{
		question: 'How is downtime avoided during production deployments?',
		answer:
			'New instances are validated before traffic is shifted, and rollout gates halt promotion if health signals degrade.',
	},
	{
		question: 'Can we configure automatic rollback thresholds?',
		answer:
			'Yes. Teams can define error and latency thresholds that trigger rollback actions when deployment quality regresses.',
	},
	{
		question: 'Does this support multi-service releases?',
		answer:
			'Yes. Coordinated deployment workflows let teams sequence rollouts across dependent services with visibility at every stage.',
	},
];

export default function ZDPage() {
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
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Zero Downtime Deploys</p>
						<h1 className="text-5xl lg:text-7xl font-black text-gray-900 mt-4 leading-[1.03]">
							Deploy continuously without disrupting active users.
						</h1>
						<p className="text-lg lg:text-xl text-gray-600 mt-6 max-w-xl">
							Deliver production updates with progressive traffic management, strict health gates, and immediate
							rollback safety to preserve availability.
						</p>

						<div className="mt-8 flex flex-wrap gap-3">
							<Link
								href="/signup"
								className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
							>
								Start deploying safely
								<ArrowRight size={16} />
							</Link>
							<Link
								href="/product/autoscaling"
								className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-md font-semibold text-gray-900 hover:border-gray-500 transition-colors"
							>
								Explore autoscaling
							</Link>
						</div>
					</div>

					<div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
						<p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Release control center</p>
						<div className="mt-4 rounded-xl border border-gray-200 p-4">
							<div className="flex items-center justify-between text-sm">
								<span className="font-semibold text-gray-900">rollout v2.8.0</span>
								<span className="px-2 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">In progress</span>
							</div>
							<div className="mt-4 h-2 rounded-full bg-gray-200 overflow-hidden">
								<div className="h-full w-[65%] bg-linear-to-r from-cyan-400 via-violet-500 to-fuchsia-500"></div>
							</div>
							<div className="mt-3 text-xs text-gray-600">65% traffic shifted with no regression signals</div>
						</div>

						<div className="mt-4 rounded-xl border border-gray-200 p-4 bg-[#fafbff]">
							<p className="text-sm font-semibold text-gray-900">Live checkpoints</p>
							<div className="mt-3 space-y-2 text-sm">
								<div className="flex items-center justify-between">
									<span className="text-gray-600">Pre-flight checks</span>
									<span className="text-emerald-600 font-semibold">Passed</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-gray-600">Canary cohort</span>
									<span className="text-emerald-600 font-semibold">Healthy</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-gray-600">Rollback path</span>
									<span className="text-violet-700 font-semibold">Armed</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-20">
				<div className="max-w-6xl mx-auto px-6">
					<div className="max-w-3xl mb-10">
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Reliability principles</p>
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
							Architecture patterns that keep production available during change.
						</h2>
					</div>

					<div className="grid md:grid-cols-3 gap-6">
						{deploymentPrinciples.map((item) => {
							const Icon = item.icon;
							return (
								<article key={item.title} className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-lg transition-all">
									<div className="w-12 h-12 rounded-xl bg-linear-to-br from-violet-100 to-indigo-100 flex items-center justify-center">
										<Icon className="text-gray-900" size={20} />
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
				<div className="max-w-6xl mx-auto px-6">
					<div className="mb-8">
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Rollout timeline</p>
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">A safer release sequence for every deployment.</h2>
					</div>

					<div className="rounded-3xl border border-gray-200 bg-white p-6 lg:p-8 shadow-sm">
						<div className="space-y-6">
							{rolloutTimeline.map((item, index) => (
								<div key={item.phase} className="grid md:grid-cols-[220px_1fr_180px] gap-4 items-start">
									<div className="flex items-center gap-3">
										<div className="w-7 h-7 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center">
											{index + 1}
										</div>
										<p className="font-bold text-gray-900">{item.phase}</p>
									</div>
									<p className="text-gray-600">{item.detail}</p>
									<p className="text-sm font-semibold text-violet-700 md:text-right">{item.target}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			<section className="py-20">
				<div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
					<div>
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Signal monitoring</p>
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
							Watch quality indicators while traffic moves in real time.
						</h2>

						<div className="mt-8 grid sm:grid-cols-2 gap-4">
							{runtimeSignals.map((signal) => (
								<article key={signal.label} className="rounded-2xl border border-gray-200 bg-white p-5">
									<p className="text-sm text-gray-500">{signal.label}</p>
									<p className="text-2xl font-black text-gray-900 mt-1">{signal.value}</p>
									<p className="text-sm font-semibold text-emerald-700 mt-2">{signal.status}</p>
								</article>
							))}
						</div>
					</div>

					<div className="rounded-2xl border border-gray-200 bg-[#0f172a] p-6 text-white">
						<p className="text-xs uppercase tracking-wide text-cyan-200 font-semibold">Incident resilience</p>
						<div className="mt-5 space-y-3 text-sm">
							<div className="rounded-lg bg-white/10 p-3 flex items-center justify-between">
								<span>Fallback route ready</span>
								<span className="text-emerald-300 font-semibold">Yes</span>
							</div>
							<div className="rounded-lg bg-white/10 p-3 flex items-center justify-between">
								<span>Rollback trigger SLA</span>
								<span className="text-cyan-300 font-semibold">&lt; 1 min</span>
							</div>
							<div className="rounded-lg bg-white/10 p-3 flex items-center justify-between">
								<span>On-call state</span>
								<span className="text-violet-200 font-semibold">Active</span>
							</div>
						</div>

						<div className="mt-6 rounded-xl bg-white/5 p-4">
							<p className="text-xs text-cyan-100 flex items-center gap-2">
								<CircleCheckBig size={14} />
								Recovery orchestration verified for current release cycle.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="py-20 bg-white border-y border-gray-200">
				<div className="max-w-6xl mx-auto px-6">
					<div className="max-w-3xl mb-10">
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Use-case scenarios</p>
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
							Proven release patterns for high-reliability teams.
						</h2>
					</div>

					<div className="grid md:grid-cols-3 gap-6">
						{scenarios.map((item) => (
							<article key={item.title} className="rounded-2xl border border-gray-200 bg-[#fafbff] p-6">
								<div className="w-11 h-11 rounded-xl bg-gray-900 text-white flex items-center justify-center">
									<Activity size={20} />
								</div>
								<h3 className="text-lg font-bold text-gray-900 mt-4">{item.title}</h3>
								<p className="text-gray-600 mt-2">{item.summary}</p>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="py-20">
				<div className="max-w-6xl mx-auto px-6">
					<div className="max-w-3xl mb-10">
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">FAQ</p>
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Answers for deployment reliability planning.</h2>
					</div>

					<div className="space-y-4">
						{faqs.map((item) => (
							<details key={item.question} className="group rounded-2xl border border-gray-200 bg-white p-6">
								<summary className="list-none cursor-pointer font-bold text-gray-900 flex items-center justify-between gap-4">
									{item.question}
									<span className="text-violet-700 group-open:rotate-45 transition-transform">+</span>
								</summary>
								<p className="text-gray-600 mt-3">{item.answer}</p>
							</details>
						))}
					</div>
				</div>
			</section>

			<section className="py-20">
				<div className="max-w-6xl mx-auto px-6">
					<div className="bg-linear-to-r from-[#f4f2ff] via-[#f8f4ff] to-[#fff2f7] rounded-3xl border border-gray-200 p-8 lg:p-12 text-center">
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900">Release faster without compromising uptime.</h2>
						<p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
							Build a modern deployment process with progressive traffic control, live health gates, and rollback-ready
							safety mechanisms.
						</p>
						<div className="mt-8 flex flex-wrap gap-3 justify-center">
							<Link
								href="/signup"
								className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
							>
								Deploy now
								<ArrowRight size={16} />
							</Link>
							<Link
								href="/contact"
								className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-md font-semibold text-gray-900 hover:border-gray-500 transition-colors"
							>
								Talk to reliability experts
							</Link>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</main>
	);
}
