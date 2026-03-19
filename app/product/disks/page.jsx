'use client';

import Link from 'next/link';
import {
	ArrowRight,
	CircleCheckBig,
	Database,
	HardDrive,
	ShieldCheck,
	Timer,
	Zap,
} from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const diskPillars = [
	{
		title: 'Durability First',
		description: 'Persistent data survives deploys and instance restarts with predictable behavior.',
		icon: ShieldCheck,
	},
	{
		title: 'Low-Latency Access',
		description: 'Keep stateful workloads close to compute for consistent runtime performance.',
		icon: Zap,
	},
	{
		title: 'Operational Simplicity',
		description: 'Provision, resize, and monitor storage from the same deployment workflow.',
		icon: HardDrive,
	},
];

const performanceTiers = [
	{
		tier: 'Standard',
		iops: '3K - 6K',
		throughput: 'Up to 160 MB/s',
		fit: 'General apps, dashboards, API state',
	},
	{
		tier: 'Performance',
		iops: '8K - 16K',
		throughput: 'Up to 320 MB/s',
		fit: 'Write-heavy services, queue engines, ETL',
	},
	{
		tier: 'High Throughput',
		iops: '16K+',
		throughput: 'Up to 600 MB/s',
		fit: 'Analytics pipelines and log-intensive platforms',
	},
];

const lifecycleFlow = [
	{ stage: 'Attach', detail: 'Bind storage to your service with explicit mount paths.' },
	{ stage: 'Warmup', detail: 'Populate baseline datasets during provisioning workflows.' },
	{ stage: 'Scale', detail: 'Increase capacity as usage grows, without workflow fragmentation.' },
	{ stage: 'Protect', detail: 'Use snapshots and restore points for safer operational changes.' },
];

const useCases = [
	{
		title: 'Media Processing Pipelines',
		summary: 'Handle temporary artifacts and transformed outputs with stable local persistence.',
	},
	{
		title: 'AI and Vector Indexes',
		summary: 'Maintain read-optimized index data close to serving layers for lower query latency.',
	},
	{
		title: 'Background Job Systems',
		summary: 'Store queue metadata and stateful worker context reliably across deployments.',
	},
];

const faqs = [
	{
		question: 'Can disks remain attached during app deployments?',
		answer:
			'Yes. Disk attachments are designed for persistent state continuity while deployment orchestration manages service updates.',
	},
	{
		question: 'How should we choose a disk tier?',
		answer:
			'Start by matching IOPS and throughput needs to workload profile, then tune based on production telemetry and growth trends.',
	},
	{
		question: 'Is disk data suitable for backup strategies?',
		answer:
			'Yes. Combine snapshot routines and external backup flows to create defense-in-depth recovery coverage.',
	},
];

export default function DisksPage() {
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
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Persistent Disks</p>
						<h1 className="text-5xl lg:text-7xl font-black text-gray-900 mt-4 leading-[1.03]">
							Stateful storage built for production reliability.
						</h1>
						<p className="text-lg lg:text-xl text-gray-600 mt-6 max-w-xl">
							Keep critical runtime data durable across deployments while maintaining high-performance read/write paths
							for modern application workloads.
						</p>

						<div className="mt-8 flex flex-wrap gap-3">
							<Link
								href="/signup"
								className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
							>
								Provision storage
								<ArrowRight size={16} />
							</Link>
							<Link
								href="/product/features"
								className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-md font-semibold text-gray-900 hover:border-gray-500 transition-colors"
							>
								See platform features
							</Link>
						</div>
					</div>

					<div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xl">
						<p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Disk health panel</p>
						<div className="mt-4 rounded-xl border border-gray-200 p-4">
							<div className="flex items-center justify-between">
								<span className="text-sm font-semibold text-gray-900">disk-prod-app-01</span>
								<span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-full">Healthy</span>
							</div>
							<div className="mt-4 grid grid-cols-3 gap-3 text-sm">
								<div className="rounded-lg bg-[#fafbff] p-3 border border-gray-200">
									<p className="text-gray-500">Capacity</p>
									<p className="font-bold text-gray-900 mt-1">240 GB</p>
								</div>
								<div className="rounded-lg bg-[#fafbff] p-3 border border-gray-200">
									<p className="text-gray-500">Used</p>
									<p className="font-bold text-gray-900 mt-1">62%</p>
								</div>
								<div className="rounded-lg bg-[#fafbff] p-3 border border-gray-200">
									<p className="text-gray-500">IOPS</p>
									<p className="font-bold text-gray-900 mt-1">7.4K</p>
								</div>
							</div>
							<div className="mt-4 h-2 rounded-full bg-gray-200 overflow-hidden">
								<div className="h-full w-[62%] bg-linear-to-r from-violet-500 via-fuchsia-500 to-indigo-400"></div>
							</div>
						</div>

						<div className="mt-4 rounded-xl border border-gray-200 p-4">
							<p className="text-sm font-semibold text-gray-900">Recent events</p>
							<div className="mt-3 space-y-2 text-sm">
								<div className="flex items-center justify-between">
									<span className="text-gray-600">Snapshot completed</span>
									<span className="text-emerald-600 font-semibold">2m ago</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-gray-600">Volume expansion applied</span>
									<span className="text-violet-600 font-semibold">14m ago</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-gray-600">I/O baseline healthy</span>
									<span className="text-cyan-600 font-semibold">Live</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-20">
				<div className="max-w-6xl mx-auto px-6">
					<div className="max-w-3xl mb-10">
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Core value</p>
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
							Storage that keeps services stable through every deployment wave.
						</h2>
					</div>

					<div className="grid md:grid-cols-3 gap-6">
						{diskPillars.map((item) => {
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
				<div className="max-w-6xl mx-auto px-6">
					<div className="mb-8">
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Performance tiers</p>
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Match throughput to workload profile.</h2>
					</div>

					<div className="overflow-x-auto">
						<table className="w-full min-w-170 border border-gray-200 rounded-xl overflow-hidden">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Tier</th>
									<th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">IOPS</th>
									<th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Throughput</th>
									<th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Best fit</th>
								</tr>
							</thead>
							<tbody className="bg-white">
								{performanceTiers.map((row) => (
									<tr key={row.tier} className="border-t border-gray-200">
										<td className="px-4 py-3 text-sm font-semibold text-gray-900">{row.tier}</td>
										<td className="px-4 py-3 text-sm text-gray-700">{row.iops}</td>
										<td className="px-4 py-3 text-sm text-gray-700">{row.throughput}</td>
										<td className="px-4 py-3 text-sm text-gray-700">{row.fit}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</section>

			<section className="py-20">
				<div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
					<div>
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Lifecycle orchestration</p>
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
							A clear disk lifecycle from first attach to long-term protection.
						</h2>

						<div className="mt-8 space-y-4">
							{lifecycleFlow.map((item, index) => (
								<div key={item.stage} className="rounded-2xl border border-gray-200 bg-white p-5 flex gap-4">
									<div className="w-8 h-8 shrink-0 rounded-full bg-violet-600 text-white text-xs font-bold flex items-center justify-center">
										{index + 1}
									</div>
									<div>
										<p className="font-bold text-gray-900">{item.stage}</p>
										<p className="text-gray-600 mt-1">{item.detail}</p>
									</div>
								</div>
							))}
						</div>
					</div>

					<div className="rounded-2xl border border-gray-200 bg-[#0f172a] text-white p-6">
						<p className="text-xs uppercase tracking-wide text-cyan-200 font-semibold">Snapshot timeline</p>
						<div className="mt-5 space-y-3 text-sm">
							<div className="rounded-lg bg-white/10 p-3 flex items-center justify-between">
								<span>Hourly snapshot</span>
								<span className="text-emerald-300 font-semibold">Enabled</span>
							</div>
							<div className="rounded-lg bg-white/10 p-3 flex items-center justify-between">
								<span>Last restore test</span>
								<span className="text-cyan-300 font-semibold">Today</span>
							</div>
							<div className="rounded-lg bg-white/10 p-3 flex items-center justify-between">
								<span>Recovery objective</span>
								<span className="text-violet-200 font-semibold">15 min</span>
							</div>
						</div>

						<div className="mt-6 rounded-xl bg-white/5 p-4">
							<p className="text-sm font-semibold">Durability posture</p>
							<p className="text-xs text-cyan-100 mt-2 flex items-center gap-2">
								<CircleCheckBig size={14} />
								Snapshot and recovery validation checks are passing.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="py-20 bg-white border-y border-gray-200">
				<div className="max-w-6xl mx-auto px-6">
					<div className="max-w-3xl mb-10">
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Workload patterns</p>
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
							Designed for modern stateful production workloads.
						</h2>
					</div>

					<div className="grid md:grid-cols-3 gap-6">
						{useCases.map((item) => (
							<article key={item.title} className="rounded-2xl border border-gray-200 bg-[#fafbff] p-6">
								<div className="w-11 h-11 rounded-xl bg-gray-900 text-white flex items-center justify-center">
									<Database size={20} />
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
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Common storage architecture questions.</h2>
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
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900">Ready to modernize your stateful services?</h2>
						<p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
							Move from ad-hoc storage management to a consistent production model with safer recovery and better
							runtime performance.
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
								Talk to an architect
							</Link>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</main>
	);
}
