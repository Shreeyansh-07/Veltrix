'use client';

import Link from 'next/link';
import {
	ArrowRight,
	BellRing,
	Braces,
	CircleCheckBig,
	Code2,
	KeyRound,
	Layers,
	Shield,
	Webhook,
} from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const apiPillars = [
	{
		title: 'Resource-Oriented Endpoints',
		description: 'Consistent REST patterns across projects, deployments, environments, and logs.',
		icon: Layers,
	},
	{
		title: 'Secure API Access',
		description: 'Token-based authentication with scoped permissions and rotation-friendly workflows.',
		icon: KeyRound,
	},
	{
		title: 'Automation Ready',
		description: 'Build provisioning, deployment, and observability workflows directly into CI/CD pipelines.',
		icon: Code2,
	},
];

const apiLifecycle = [
	{ step: 'Generate token', detail: 'Create scoped credentials for your service account or integration app.' },
	{ step: 'Call endpoint', detail: 'Provision services, update settings, and control rollout behavior by API.' },
	{ step: 'Handle webhook', detail: 'Subscribe to deployment and incident events for event-driven automation.' },
	{ step: 'Observe and refine', detail: 'Use logs and telemetry endpoints to continuously improve reliability.' },
];

const permissionMatrix = [
	{ scope: 'projects.read', ci: true, platform: true, security: true },
	{ scope: 'projects.write', ci: true, platform: true, security: false },
	{ scope: 'deployments.execute', ci: true, platform: true, security: false },
	{ scope: 'secrets.manage', ci: false, platform: true, security: true },
	{ scope: 'audit.read', ci: false, platform: true, security: true },
	{ scope: 'webhooks.manage', ci: true, platform: true, security: false },
];

const ecosystemCards = [
	{
		title: 'CLI + API Hybrid Workflows',
		description: 'Use CLI for local productivity and API for repeatable production automation.',
		icon: Braces,
	},
	{
		title: 'Webhook Event Streams',
		description: 'Capture deployment lifecycle events for chat ops, incident workflows, and analytics.',
		icon: Webhook,
	},
	{
		title: 'Ops Notifications',
		description: 'Push release and health events into messaging and on-call systems in real time.',
		icon: BellRing,
	},
];

const faqs = [
	{
		question: 'Can we run our entire deployment pipeline through API calls?',
		answer:
			'Yes. Teams commonly orchestrate project creation, deploy triggers, rollout controls, and status checks entirely through API-driven workflows.',
	},
	{
		question: 'How are API keys managed safely?',
		answer:
			'Use scoped tokens per integration, rotate regularly, and isolate credentials by environment to minimize blast radius.',
	},
	{
		question: 'Do webhooks support production-grade automation?',
		answer:
			'Yes. Webhooks are suited for deployment notifications, governance pipelines, and incident-response automation with signature validation.',
	},
];

const mark = (value) =>
	value ? <span className="font-bold text-emerald-600">Yes</span> : <span className="text-gray-400">-</span>;

export default function APIPage() {
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
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Veltrix API</p>
						<h1 className="text-5xl lg:text-7xl font-black text-gray-900 mt-4 leading-[1.03]">
							Build your platform workflows with API-first control.
						</h1>
						<p className="text-lg lg:text-xl text-gray-600 mt-6 max-w-xl">
							Provision, deploy, secure, and observe services programmatically using a consistent REST API designed for
							production automation.
						</p>

						<div className="mt-8 flex flex-wrap gap-3">
							<Link
								href="/signup"
								className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
							>
								Get API access
								<ArrowRight size={16} />
							</Link>
							<Link
								href="/docs"
								className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-md font-semibold text-gray-900 hover:border-gray-500 transition-colors"
							>
								Read docs
							</Link>
						</div>
					</div>

					<div className="rounded-2xl border border-gray-200 bg-[#0f172a] p-6 text-white shadow-xl">
						<p className="text-xs uppercase tracking-wide text-cyan-200 font-semibold">Endpoint explorer</p>
						<div className="mt-4 rounded-xl border border-white/15 bg-white/5 overflow-hidden">
							<div className="px-4 py-3 border-b border-white/10 text-sm font-semibold">POST /v1/deployments</div>
							<pre className="p-4 text-xs leading-6 overflow-x-auto">
{`{
	"projectId": "proj_4ad9",
	"environment": "production",
	"trigger": "main",
	"strategy": "progressive"
}`}
							</pre>
						</div>

						<div className="mt-4 rounded-xl border border-white/15 p-4 bg-white/5">
							<div className="flex items-center justify-between text-sm">
								<span>Response</span>
								<span className="text-emerald-300 font-semibold">201 Created</span>
							</div>
							<p className="text-xs text-cyan-100 mt-2">deploymentId dep_8f21 queued with health-gated rollout.</p>
						</div>
					</div>
				</div>
			</section>

			<section className="py-20">
				<div className="max-w-6xl mx-auto px-6">
					<div className="max-w-3xl mb-10">
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Core capabilities</p>
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
							Everything teams need for platform automation at scale.
						</h2>
					</div>

					<div className="grid md:grid-cols-3 gap-6">
						{apiPillars.map((item) => {
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
				<div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
					<div>
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Integration lifecycle</p>
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
							Move from credentials to full deployment automation in four stages.
						</h2>

						<div className="mt-8 space-y-4">
							{apiLifecycle.map((item, index) => (
								<div key={item.step} className="rounded-2xl border border-gray-200 bg-[#fafbff] p-5 flex gap-4">
									<div className="w-8 h-8 shrink-0 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center">
										{index + 1}
									</div>
									<div>
										<p className="font-bold text-gray-900">{item.step}</p>
										<p className="text-gray-600 mt-1">{item.detail}</p>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="rounded-2xl border border-gray-200 bg-white p-6">
						<p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">SDK status</p>
						<div className="mt-4 space-y-3 text-sm">
							<div className="rounded-lg border border-gray-200 p-3 flex items-center justify-between">
								<span>JavaScript</span>
								<span className="text-emerald-600 font-semibold">Stable</span>
							</div>
							<div className="rounded-lg border border-gray-200 p-3 flex items-center justify-between">
								<span>Python</span>
								<span className="text-emerald-600 font-semibold">Stable</span>
							</div>
							<div className="rounded-lg border border-gray-200 p-3 flex items-center justify-between">
								<span>Go</span>
								<span className="text-violet-700 font-semibold">Beta</span>
							</div>
						</div>

						<div className="mt-6 rounded-xl bg-[#0f172a] p-4 text-white">
							<p className="text-xs text-cyan-100 flex items-center gap-2">
								<CircleCheckBig size={14} />
								Webhook signature verification available across environments.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="py-20">
				<div className="max-w-6xl mx-auto px-6">
					<div className="mb-8">
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Scope matrix</p>
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
							Permission design for CI, platform, and security teams.
						</h2>
					</div>

					<div className="overflow-x-auto">
						<table className="w-full min-w-170 border border-gray-200 rounded-xl overflow-hidden">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Scope</th>
									<th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">CI Automation</th>
									<th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Platform Ops</th>
									<th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Security</th>
								</tr>
							</thead>
							<tbody className="bg-white">
								{permissionMatrix.map((row) => (
									<tr key={row.scope} className="border-t border-gray-200">
										<td className="px-4 py-3 text-sm font-medium text-gray-900">{row.scope}</td>
										<td className="px-4 py-3 text-sm">{mark(row.ci)}</td>
										<td className="px-4 py-3 text-sm">{mark(row.platform)}</td>
										<td className="px-4 py-3 text-sm">{mark(row.security)}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</section>

			<section className="py-20 bg-white border-y border-gray-200">
				<div className="max-w-6xl mx-auto px-6">
					<div className="max-w-3xl mb-10">
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Ecosystem and events</p>
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
							Connect API calls to your wider developer platform.
						</h2>
					</div>

					<div className="grid md:grid-cols-3 gap-6">
						{ecosystemCards.map((item) => {
							const Icon = item.icon;
							return (
								<article key={item.title} className="rounded-2xl border border-gray-200 bg-[#fafbff] p-6">
									<div className="w-11 h-11 rounded-xl bg-gray-900 text-white flex items-center justify-center">
										<Icon size={20} />
									</div>
									<h3 className="text-lg font-bold text-gray-900 mt-4">{item.title}</h3>
									<p className="text-gray-600 mt-2">{item.description}</p>
								</article>
							);
						})}
					</div>
				</div>
			</section>

			<section className="py-20">
				<div className="max-w-6xl mx-auto px-6">
					<div className="max-w-3xl mb-10">
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">API FAQ</p>
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
							Practical questions from teams building automation on day one.
						</h2>
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
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900">Build your release platform with API-native control.</h2>
						<p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
							Standardize infrastructure automation, deployment workflows, and event-driven operations from a single API
							surface.
						</p>
						<div className="mt-8 flex flex-wrap gap-3 justify-center">
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
								Talk with engineering
							</Link>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</main>
	);
}
