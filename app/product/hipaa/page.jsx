'use client';

import Link from 'next/link';
import {
	ArrowRight,
	CircleCheckBig,
	FileCheck2,
	Lock,
	Shield,
	ShieldCheck,
	UserCheck,
} from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const compliancePillars = [
	{
		title: 'Administrative Safeguards',
		description: 'Role-based access patterns, operational accountability, and documented control ownership.',
		icon: UserCheck,
	},
	{
		title: 'Technical Safeguards',
		description: 'Encryption, key management workflows, audit logging, and strict access boundaries.',
		icon: Lock,
	},
	{
		title: 'Governance and Evidence',
		description: 'Policy alignment and traceable artifacts to support audits and compliance reviews.',
		icon: FileCheck2,
	},
];

const responsibilityRows = [
	{
		control: 'Infrastructure availability and patching',
		veltrix: 'Managed by Veltrix platform operations',
		customer: 'Define service-level maintenance windows',
	},
	{
		control: 'Access and identity policy',
		veltrix: 'Role framework and auth controls provided',
		customer: 'User onboarding, RBAC assignments, periodic review',
	},
	{
		control: 'Encryption and secret handling',
		veltrix: 'Encrypted transport and storage primitives',
		customer: 'Secret lifecycle, key rotation strategy, PHI handling policy',
	},
	{
		control: 'Audit and incident response',
		veltrix: 'Platform event logs and monitoring data',
		customer: 'Runbook ownership, escalation process, incident reporting',
	},
];

const implementationStages = [
	{ stage: 'Assess', detail: 'Map HIPAA obligations to application architecture and data boundaries.' },
	{ stage: 'Configure', detail: 'Apply security defaults, RBAC, and private networking guardrails.' },
	{ stage: 'Validate', detail: 'Run periodic control checks and document audit evidence artifacts.' },
	{ stage: 'Operate', detail: 'Monitor access, retain logs, and refine controls with compliance teams.' },
];

const controlChecklist = [
	'Least privilege RBAC enabled across teams',
	'All PHI-bearing services isolated to approved network paths',
	'Audit logging retained per policy requirements',
	'Incident response runbooks reviewed and versioned',
	'Encryption controls validated for data in transit and at rest',
];

const faqs = [
	{
		question: 'Does this page mean every workload is automatically HIPAA compliant?',
		answer:
			'No. Platform controls support HIPAA-ready architecture, but each organization must implement and validate its own compliance program and operational policies.',
	},
	{
		question: 'Can compliance teams access audit-ready operational data?',
		answer:
			'Yes. Logs, access records, and deployment history can be used to support governance and audit workflows.',
	},
	{
		question: 'How should teams begin a HIPAA deployment journey?',
		answer:
			'Start with data classification and network boundaries, then codify identity, logging, and incident response controls before scaling workloads.',
	},
];

export default function HIPAAPage() {
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
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">HIPAA on Veltrix</p>
						<h1 className="text-5xl lg:text-7xl font-black text-gray-900 mt-4 leading-[1.03]">
							Compliance-ready infrastructure for healthcare-grade workloads.
						</h1>
						<p className="text-lg lg:text-xl text-gray-600 mt-6 max-w-xl">
							Build secure application environments with strong access controls, encryption foundations, and auditable
							operational workflows aligned with HIPAA responsibilities.
						</p>

						<div className="mt-8 flex flex-wrap gap-3">
							<Link
								href="/signup"
								className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
							>
								Start secure deployment
								<ArrowRight size={16} />
							</Link>
							<Link
								href="/contact"
								className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-md font-semibold text-gray-900 hover:border-gray-500 transition-colors"
							>
								Speak with compliance team
							</Link>
						</div>
					</div>

					<div className="rounded-2xl border border-gray-200 bg-[#0f172a] text-white p-6 shadow-xl">
						<p className="text-xs uppercase tracking-wide text-cyan-200 font-semibold">Compliance posture dashboard</p>
						<div className="mt-4 rounded-xl border border-white/15 p-4 bg-white/5">
							<div className="flex items-center justify-between text-sm">
								<span>Security control coverage</span>
								<span className="text-emerald-300 font-semibold">93%</span>
							</div>
							<div className="mt-3 h-2 rounded-full bg-white/20 overflow-hidden">
								<div className="h-full w-[93%] bg-linear-to-r from-emerald-300 via-cyan-300 to-violet-300"></div>
							</div>
						</div>

						<div className="mt-4 space-y-3 text-sm">
							<div className="rounded-lg bg-white/10 p-3 flex items-center justify-between">
								<span>Access review cadence</span>
								<span className="text-cyan-300 font-semibold">Weekly</span>
							</div>
							<div className="rounded-lg bg-white/10 p-3 flex items-center justify-between">
								<span>Audit log retention</span>
								<span className="text-violet-200 font-semibold">Configured</span>
							</div>
							<div className="rounded-lg bg-white/10 p-3 flex items-center justify-between">
								<span>Incident response drill</span>
								<span className="text-emerald-300 font-semibold">Passing</span>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="py-20">
				<div className="max-w-6xl mx-auto px-6">
					<div className="max-w-3xl mb-10">
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Control architecture</p>
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
							Compliance controls integrated into everyday platform operations.
						</h2>
					</div>

					<div className="grid md:grid-cols-3 gap-6">
						{compliancePillars.map((item) => {
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
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Shared responsibility</p>
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
							Clarify ownership across platform and customer control domains.
						</h2>
					</div>

					<div className="overflow-x-auto">
						<table className="w-full min-w-170 border border-gray-200 rounded-xl overflow-hidden">
							<thead className="bg-gray-50">
								<tr>
									<th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Control area</th>
									<th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Veltrix responsibility</th>
									<th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Customer responsibility</th>
								</tr>
							</thead>
							<tbody className="bg-white">
								{responsibilityRows.map((row) => (
									<tr key={row.control} className="border-t border-gray-200">
										<td className="px-4 py-3 text-sm font-medium text-gray-900">{row.control}</td>
										<td className="px-4 py-3 text-sm text-gray-700">{row.veltrix}</td>
										<td className="px-4 py-3 text-sm text-gray-700">{row.customer}</td>
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
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Implementation roadmap</p>
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
							A practical sequence for HIPAA-ready platform operations.
						</h2>

						<div className="mt-8 space-y-4">
							{implementationStages.map((item, index) => (
								<div key={item.stage} className="rounded-2xl border border-gray-200 bg-[#fafbff] p-5 flex gap-4">
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

					<div className="rounded-2xl border border-gray-200 bg-white p-6">
						<p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Control validation checklist</p>
						<div className="mt-4 space-y-3">
							{controlChecklist.map((item) => (
								<div key={item} className="flex items-start gap-2 text-sm text-gray-700">
									<CircleCheckBig size={16} className="text-emerald-600 mt-0.5 shrink-0" />
									<span>{item}</span>
								</div>
							))}
						</div>

						<div className="mt-6 rounded-xl bg-[#0f172a] p-4 text-white">
							<p className="text-xs text-cyan-100 flex items-center gap-2">
								<ShieldCheck size={14} />
								Audit artifacts and deployment history are retained for review workflows.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="py-20 bg-white border-y border-gray-200">
				<div className="max-w-6xl mx-auto px-6">
					<div className="max-w-3xl mb-10">
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Compliance FAQ</p>
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
							Questions teams ask during healthcare workload onboarding.
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
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900">Build healthcare-grade services with confidence.</h2>
						<p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
							Combine secure platform primitives, governance workflows, and audit-ready operational practices for
							regulated workloads.
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
								Talk to compliance team
							</Link>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</main>
	);
}
