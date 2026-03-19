'use client';

import Link from 'next/link';
import {
	ArrowRight,
	Braces,
	CircleCheckBig,
	FileCode2,
	GitBranch,
	Scale,
	Shield,
	Workflow,
} from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const frameworkPillars = [
	{
		title: 'Declarative Infrastructure',
		description: 'Represent services, environments, and dependencies as versioned definitions.',
		icon: Braces,
	},
	{
		title: 'Change Visibility',
		description: 'Preview and validate infrastructure diffs before production application.',
		icon: FileCode2,
	},
	{
		title: 'Policy Alignment',
		description: 'Apply security and compliance guardrails through reusable code constraints.',
		icon: Shield,
	},
	{
		title: 'Git-Centric Workflow',
		description: 'Drive infrastructure updates from pull requests with audit-ready history.',
		icon: GitBranch,
	},
];

const configModules = [
	{
		module: 'Service Module',
		intent: 'Standardize web service defaults, health checks, and scaling behavior.',
	},
	{
		module: 'Environment Module',
		intent: 'Template environment variables, secrets references, and policy bindings.',
	},
	{
		module: 'Network Module',
		intent: 'Codify private routes, ingress restrictions, and internal connectivity rules.',
	},
	{
		module: 'Data Module',
		intent: 'Define storage bindings, retention controls, and backup expectations.',
	},
];

const rolloutStages = [
	{
		title: 'Author',
		detail: 'Write infrastructure definitions and update module versions in code review branches.',
	},
	{
		title: 'Plan',
		detail: 'Generate deterministic diffs to inspect resource changes before merge.',
	},
	{
		title: 'Approve',
		detail: 'Gate high-risk changes using ownership and policy requirements.',
	},
	{
		title: 'Apply',
		detail: 'Promote approved changes through staging and production with drift checks.',
	},
];

const governanceChecks = [
	'Service-level encryption policy attached',
	'Private network scope validated',
	'Runtime identity mapped to approved role',
	'Tagging and cost ownership labels present',
	'Rollback checkpoint created before apply',
];

const faqs = [
	{
		question: 'How do we start migrating from manual infrastructure changes?',
		answer:
			'Begin by codifying one service and its environment settings, then progressively move shared modules and network controls into versioned definitions.',
	},
	{
		question: 'Can infrastructure code and app code be released together?',
		answer:
			'Yes. Teams often pair infrastructure modules and application updates in coordinated pull requests with staged apply workflows.',
	},
	{
		question: 'How is operational drift detected?',
		answer:
			'Regular plan checks compare desired state from code to live resources, surfacing drift before it impacts reliability or compliance goals.',
	},
];

export default function IACPage() {
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
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Infrastructure as Code</p>
						<h1 className="text-5xl lg:text-7xl font-black text-gray-900 mt-4 leading-[1.03]">
							Turn infrastructure into a trusted software workflow.
						</h1>
						<p className="text-lg lg:text-xl text-gray-600 mt-6 max-w-xl">
							Build repeatable infrastructure operations with code review, change previews, policy checks, and safer
							production rollout controls.
						</p>

						<div className="mt-8 flex flex-wrap gap-3">
							<Link
								href="/signup"
								className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
							>
								Start codifying infra
								<ArrowRight size={16} />
							</Link>
							<Link
								href="/product/overview"
								className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-md font-semibold text-gray-900 hover:border-gray-500 transition-colors"
							>
								Explore platform
							</Link>
						</div>
					</div>

					<div className="bg-[#0f172a] rounded-2xl border border-[#1e293b] p-6 shadow-xl text-white">
						<p className="text-xs uppercase tracking-wide text-cyan-200 font-semibold">Plan preview</p>
						<div className="mt-4 rounded-xl border border-white/15 bg-white/5 overflow-hidden">
							<div className="px-4 py-3 border-b border-white/10 text-sm font-semibold">iac/prod/services.tf</div>
							<div className="p-4 text-sm font-mono space-y-2">
								<p className="text-emerald-300">+ autoscaling.min_instances = 3</p>
								<p className="text-emerald-300">+ autoscaling.max_instances = 10</p>
								<p className="text-amber-300">~ disk.size_gb = 160 -&gt; 240</p>
								<p className="text-cyan-200">+ network.private_route = true</p>
							</div>
						</div>

						<div className="mt-4 rounded-xl border border-white/15 p-4 bg-white/5">
							<div className="flex items-center justify-between text-sm">
								<span>Policy checks</span>
								<span className="text-emerald-300 font-semibold">5/5 passing</span>
							</div>
							<div className="mt-3 h-2 rounded-full bg-white/20 overflow-hidden">
								<div className="h-full w-full bg-linear-to-r from-emerald-300 via-cyan-300 to-violet-300"></div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-20">
				<div className="max-w-6xl mx-auto px-6">
					<div className="max-w-3xl mb-10">
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">IaC foundations</p>
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
							A disciplined model for platform evolution at scale.
						</h2>
					</div>

					<div className="grid md:grid-cols-2 gap-6">
						{frameworkPillars.map((item) => {
							const Icon = item.icon;
							return (
								<article key={item.title} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-all">
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
				<div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
					<div>
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Rollout workflow</p>
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
							Move from pull request to production with full governance context.
						</h2>

						<div className="mt-8 space-y-4">
							{rolloutStages.map((stage, index) => (
								<div key={stage.title} className="rounded-2xl border border-gray-200 p-5 bg-[#fafbff] flex gap-4">
									<div className="w-8 h-8 shrink-0 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center">
										{index + 1}
									</div>
									<div>
										<p className="font-bold text-gray-900">{stage.title}</p>
										<p className="text-gray-600 mt-1">{stage.detail}</p>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="rounded-2xl border border-gray-200 bg-white p-6">
						<p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Governance checklist</p>
						<div className="mt-4 space-y-3">
							{governanceChecks.map((check) => (
								<div key={check} className="flex items-start gap-2 text-sm text-gray-700">
									<CircleCheckBig size={16} className="text-emerald-600 mt-0.5 shrink-0" />
									<span>{check}</span>
								</div>
							))}
						</div>

						<div className="mt-6 rounded-xl border border-gray-200 p-4 bg-[#fafbff]">
							<p className="text-sm font-semibold text-gray-900">Drift status</p>
							<p className="text-sm text-gray-600 mt-1">No critical drift detected in production resources.</p>
						</div>
					</div>
				</div>
			</section>

			<section className="py-20">
				<div className="max-w-6xl mx-auto px-6">
					<div className="max-w-3xl mb-10">
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Reusable modules</p>
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
							Compose infrastructure from trusted building blocks.
						</h2>
					</div>

					<div className="grid md:grid-cols-2 gap-6">
						{configModules.map((item) => (
							<article key={item.module} className="rounded-2xl border border-gray-200 bg-white p-6">
								<div className="w-11 h-11 rounded-xl bg-gray-900 text-white flex items-center justify-center">
									<Workflow size={20} />
								</div>
								<h3 className="text-xl font-bold text-gray-900 mt-4">{item.module}</h3>
								<p className="text-gray-600 mt-2">{item.intent}</p>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="py-20 bg-white border-y border-gray-200">
				<div className="max-w-6xl mx-auto px-6">
					<div className="max-w-3xl mb-10">
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Governance FAQ</p>
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
							Practical questions from platform engineering teams.
						</h2>
					</div>

					<div className="space-y-4">
						{faqs.map((item) => (
							<details key={item.question} className="group rounded-2xl border border-gray-200 bg-[#fafbff] p-6">
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
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900">Ready to run infrastructure like software?</h2>
						<p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
							Standardize platform changes with versioned definitions, policy-aware workflows, and safer release
							operations across environments.
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
								Speak with experts
							</Link>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</main>
	);
}
