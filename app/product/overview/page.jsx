'use client';

import Link from 'next/link';
import {
	ArrowRight,
	Boxes,
	CircleCheckBig,
	Gauge,
	GitBranch,
	Layers,
	ShieldCheck,
	Sparkles,
	Timer,
	Zap,
} from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const workflowSteps = [
	{
		title: 'Connect repository',
		description: 'Link your GitHub repository and choose exactly what to deploy.',
		icon: GitBranch,
	},
	{
		title: 'Configure service',
		description: 'Define build/start commands, environment variables, and environment.',
		icon: Layers,
	},
	{
		title: 'Deploy safely',
		description: 'Push to production with health checks, logs, and deployment visibility.',
		icon: ShieldCheck,
	},
	{
		title: 'Operate at scale',
		description: 'Monitor, autoscale, and iterate quickly without custom infrastructure glue.',
		icon: Gauge,
	},
];

const serviceTypes = [
	'Static Sites',
	'Web Services',
	'Private Services',
	'Background Workers',
	'Cron Jobs',
	'Render Postgres',
	'Render Key Value',
	'n8n Workflows',
];

const pillars = [
	{
		title: 'Developer Velocity',
		point: 'From commit to production in a single repeatable flow.',
		metric: '2.5x faster release cycles',
		icon: Zap,
	},
	{
		title: 'Operational Confidence',
		point: 'Logs, health checks, and rollout controls in one surface.',
		metric: '40% fewer incident escalations',
		icon: ShieldCheck,
	},
	{
		title: 'Scalable Foundations',
		point: 'Autoscaling and network controls without hand-rolled infra.',
		metric: 'Consistent p95 during traffic peaks',
		icon: Gauge,
	},
];

const rolloutTimeline = [
	{ stage: 'Plan', note: 'Define build commands, env groups, and deploy rules.', time: '5 min' },
	{ stage: 'Preview', note: 'Validate every pull request in an isolated environment.', time: '2-8 min' },
	{ stage: 'Release', note: 'Run health checks and shift traffic with rollback safety.', time: 'sub-minute' },
	{ stage: 'Optimize', note: 'Tune autoscaling, alerts, and runtime resources.', time: 'ongoing' },
];

const faqs = [
	{
		question: 'Can we migrate gradually from our current platform?',
		answer:
			'Yes. Teams typically start with one non-critical service, mirror deployment settings, and then progressively move core workloads after baseline metrics are stable.',
	},
	{
		question: 'Does this work for both frontend and backend teams?',
		answer:
			'Yes. Static sites, APIs, workers, and managed data services all share the same deployment model, so product teams and platform teams can collaborate without tool switching.',
	},
	{
		question: 'How do we keep production changes safe?',
		answer:
			'Use health checks, environment isolation, and monitored rollout stages. If a deployment degrades, rollback can be triggered quickly with full timeline visibility.',
	},
];

export default function OverviewPage() {
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
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Product Overview</p>
						<h1 className="text-5xl lg:text-7xl font-black text-gray-900 mt-4 leading-[1.03]">
							One platform for build, deploy, and scale.
						</h1>
						<p className="text-lg lg:text-xl text-gray-600 mt-6 max-w-xl">
							Veltrix gives teams a direct path from git push to production with integrated deployment controls,
							environment management, observability, and operational confidence.
						</p>

						<div className="mt-8 flex flex-wrap gap-3">
							<Link
								href="/signup"
								className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
							>
								Start for free
								<ArrowRight size={16} />
							</Link>
							<Link
								href="/product/features"
								className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-md font-semibold text-gray-900 hover:border-gray-500 transition-colors"
							>
								Explore all features
							</Link>
						</div>

						<div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
							<div className="bg-white border border-gray-200 rounded-xl p-4">
								<p className="text-2xl font-black text-gray-900">99.99%</p>
								<p className="text-xs uppercase tracking-wide text-gray-500 mt-1">Uptime</p>
							</div>
							<div className="bg-white border border-gray-200 rounded-xl p-4">
								<p className="text-2xl font-black text-gray-900">10+</p>
								<p className="text-xs uppercase tracking-wide text-gray-500 mt-1">Service Types</p>
							</div>
							<div className="bg-white border border-gray-200 rounded-xl p-4">
								<p className="text-2xl font-black text-gray-900">3</p>
								<p className="text-xs uppercase tracking-wide text-gray-500 mt-1">Environments</p>
							</div>
							<div className="bg-white border border-gray-200 rounded-xl p-4">
								<p className="text-2xl font-black text-gray-900">1</p>
								<p className="text-xs uppercase tracking-wide text-gray-500 mt-1">Unified UI</p>
							</div>
						</div>
					</div>

					<div className="space-y-4">
						<div className="bg-gray-900 text-white px-5 py-3 rounded-lg font-mono w-fit shadow-xl">
							<span className="text-emerald-400">$</span> git push
						</div>

						<div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xl">
							<p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Production</p>
							<div className="grid grid-cols-2 gap-3 mt-4">
								<div className="rounded-xl border border-gray-200 p-3">
									<p className="text-sm font-semibold text-gray-900">app-frontend</p>
									<p className="text-xs text-gray-500 mt-1">Healthy • Deploying</p>
									<div className="h-10 mt-3 rounded bg-linear-to-r from-violet-100 via-purple-100 to-fuchsia-100"></div>
								</div>
								<div className="rounded-xl border border-gray-200 p-3">
									<p className="text-sm font-semibold text-gray-900">app-backend</p>
									<p className="text-xs text-gray-500 mt-1">Autoscaled • Live</p>
									<div className="h-10 mt-3 rounded bg-linear-to-r from-sky-100 via-indigo-100 to-violet-100"></div>
								</div>
							</div>
						</div>

						<div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xl">
							<p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Deployment Timeline</p>
							<div className="mt-3 space-y-2">
								<div className="flex items-center justify-between text-sm">
									<span className="text-gray-700">Build complete</span>
									<span className="text-emerald-600 font-semibold">2m 14s</span>
								</div>
								<div className="flex items-center justify-between text-sm">
									<span className="text-gray-700">Health checks passed</span>
									<span className="text-emerald-600 font-semibold">45s</span>
								</div>
								<div className="flex items-center justify-between text-sm">
									<span className="text-gray-700">Traffic switched</span>
									<span className="text-emerald-600 font-semibold">Instant</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-20">
				<div className="max-w-6xl mx-auto px-6">
					<div className="max-w-3xl mb-10">
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">How it works</p>
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">A workflow teams can trust from day one.</h2>
					</div>
					<div className="grid md:grid-cols-2 gap-6">
						{workflowSteps.map((step) => {
							const Icon = step.icon;
							return (
								<article key={step.title} className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-lg transition-all">
									<div className="w-11 h-11 rounded-xl bg-gray-900 text-white flex items-center justify-center">
										<Icon size={20} />
									</div>
									<h3 className="text-xl font-bold text-gray-900 mt-4">{step.title}</h3>
									<p className="text-gray-600 mt-2">{step.description}</p>
								</article>
							);
						})}
					</div>
				</div>
			</section>

			<section className="py-20 bg-white border-y border-gray-200">
				<div className="max-w-6xl mx-auto px-6">
					<div className="max-w-3xl mb-10">
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Why teams switch</p>
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
							Built to remove release friction across the full lifecycle.
						</h2>
					</div>

					<div className="grid lg:grid-cols-3 gap-6">
						{pillars.map((pillar) => {
							const Icon = pillar.icon;
							return (
								<article key={pillar.title} className="rounded-2xl border border-gray-200 bg-[#fafbff] p-6">
									<div className="w-11 h-11 rounded-xl bg-gray-900 text-white flex items-center justify-center">
										<Icon size={20} />
									</div>
									<h3 className="text-xl font-bold text-gray-900 mt-4">{pillar.title}</h3>
									<p className="text-gray-600 mt-2">{pillar.point}</p>
									<p className="text-sm font-semibold text-violet-700 mt-4">{pillar.metric}</p>
								</article>
							);
						})}
					</div>
				</div>
			</section>

			<section className="py-16 border-y border-gray-200 bg-white">
				<div className="max-w-6xl mx-auto px-6">
					<div className="flex items-center gap-3 mb-8">
						<Boxes className="text-violet-700" />
						<h2 className="text-2xl lg:text-3xl font-black text-gray-900">Built for every service type</h2>
					</div>

					<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
						{serviceTypes.map((service) => (
							<div key={service} className="px-4 py-3 rounded-lg border border-gray-200 bg-[#fafbff] text-sm font-semibold text-gray-800">
								{service}
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="py-20">
				<div className="max-w-6xl mx-auto px-6">
					<div className="max-w-3xl mb-10">
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Release orchestration</p>
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
							A timeline view that keeps every deployment decision visible.
						</h2>
					</div>

					<div className="rounded-3xl border border-gray-200 bg-white p-6 lg:p-8 shadow-sm">
						<div className="space-y-6">
							{rolloutTimeline.map((item, index) => (
								<div key={item.stage} className="grid md:grid-cols-[180px_1fr_120px] gap-4 items-start">
									<div className="flex items-center gap-3">
										<div className="w-7 h-7 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center">
											{index + 1}
										</div>
										<p className="font-bold text-gray-900">{item.stage}</p>
									</div>
									<p className="text-gray-600">{item.note}</p>
									<p className="text-sm font-semibold text-violet-700 md:text-right">{item.time}</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>

			<section className="py-20 bg-white border-y border-gray-200">
				<div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-8 items-start">
					<div>
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Operational wins</p>
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">A platform that gets better as you scale.</h2>
						<p className="text-gray-600 mt-4 max-w-xl">
							From your first release to multi-service production clusters, the platform keeps runbooks, guardrails, and
							reliability primitives close to the teams shipping code.
						</p>

						<div className="mt-8 space-y-4">
							<div className="rounded-xl border border-gray-200 p-4 bg-[#fafbff]">
								<div className="flex items-center gap-2 text-gray-900 font-semibold">
									<Timer size={18} className="text-violet-700" />
									On-call ready deployment history
								</div>
								<p className="text-sm text-gray-600 mt-2">Every release includes timing, status, and context for incident handoffs.</p>
							</div>
							<div className="rounded-xl border border-gray-200 p-4 bg-[#fafbff]">
								<div className="flex items-center gap-2 text-gray-900 font-semibold">
									<Sparkles size={18} className="text-violet-700" />
									Cleaner workflows across teams
								</div>
								<p className="text-sm text-gray-600 mt-2">Shared service templates keep standards consistent without slowing teams down.</p>
							</div>
						</div>
					</div>

					<div className="rounded-2xl border border-gray-200 bg-[#0e1324] p-6 text-white">
						<p className="text-xs uppercase tracking-wide text-violet-200 font-semibold">Live operational feed</p>
						<div className="mt-5 space-y-3 text-sm">
							<div className="flex items-start justify-between gap-3 rounded-lg bg-white/5 px-3 py-2">
								<p>frontend-service deployed from main</p>
								<span className="text-emerald-300 font-semibold">Healthy</span>
							</div>
							<div className="flex items-start justify-between gap-3 rounded-lg bg-white/5 px-3 py-2">
								<p>api-service autoscaled from 3 to 5 instances</p>
								<span className="text-cyan-300 font-semibold">Scaled</span>
							</div>
							<div className="flex items-start justify-between gap-3 rounded-lg bg-white/5 px-3 py-2">
								<p>database backup validated in staging</p>
								<span className="text-violet-200 font-semibold">Completed</span>
							</div>
						</div>
						<div className="mt-6 pt-4 border-t border-white/15 text-xs text-violet-100 flex items-center gap-2">
							<CircleCheckBig size={14} />
							Recovery and rollback controls are active
						</div>
					</div>
				</div>
			</section>

			<section className="py-20">
				<div className="max-w-6xl mx-auto px-6">
					<div className="max-w-3xl mb-10">
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">FAQ</p>
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Everything teams ask before migrating.</h2>
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
					<div className="bg-linear-to-r from-[#f4f2ff] via-[#f8f4ff] to-[#fff2f7] rounded-3xl border border-gray-200 p-8 lg:p-12">
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900">Ready to ship your first production workload?</h2>
						<p className="text-lg text-gray-600 mt-4 max-w-2xl">
							Deploy your first service in minutes and scale confidently as usage grows.
						</p>
						<div className="mt-8 flex flex-wrap gap-3">
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
								Talk to sales
							</Link>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</main>
	);
}
