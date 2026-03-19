'use client';

import Link from 'next/link';
import {
	ArrowRight,
	Braces,
	CircleCheckBig,
	Eye,
	GitPullRequest,
	Layers,
	MessageSquare,
	Rocket,
} from 'lucide-react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';

const previewBenefits = [
	{
		title: 'Branch-Isolated Testing',
		description: 'Every pull request gets an independent environment for accurate QA and stakeholder review.',
		icon: GitPullRequest,
	},
	{
		title: 'Real Data Flow Validation',
		description: 'Test integrations and environment variables in realistic runtime conditions before release.',
		icon: Layers,
	},
	{
		title: 'Faster Review Cycles',
		description: 'Share preview links with product and design teams for actionable feedback loops.',
		icon: MessageSquare,
	},
];

const lifecycle = [
	{ stage: 'Open PR', detail: 'Trigger automatic preview generation from feature branches.' },
	{ stage: 'Review', detail: 'Validate UI, API, and operational behavior with shared preview links.' },
	{ stage: 'Approve', detail: 'Collect final stakeholder feedback and verify regression checks.' },
	{ stage: 'Promote', detail: 'Merge with confidence and release to production-ready pipelines.' },
];

const personas = [
	{
		team: 'Engineering',
		value: 'Catch integration issues before merge and reduce post-release debugging.',
		impact: 'Lower release risk',
	},
	{
		team: 'Product',
		value: 'Review feature behavior in a real environment with near-production fidelity.',
		impact: 'Faster sign-off',
	},
	{
		team: 'Design',
		value: 'Validate responsive behavior, content layout, and final interaction polish.',
		impact: 'Improved UX quality',
	},
];

const faqs = [
	{
		question: 'How quickly are preview environments created?',
		answer:
			'Most previews are provisioned automatically after each pull request update, allowing teams to review new changes in minutes.',
	},
	{
		question: 'Can we secure preview links for internal testing only?',
		answer:
			'Yes. Access can be scoped with environment rules and team workflows to keep pre-release features private.',
	},
	{
		question: 'Do preview environments support full-stack services?',
		answer:
			'Yes. Teams commonly test frontend, backend, and connected data dependencies together to validate full user journeys.',
	},
];

export default function PreviewPage() {
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
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Preview Environments</p>
						<h1 className="text-5xl lg:text-7xl font-black text-gray-900 mt-4 leading-[1.03]">
							Ship with confidence before production even starts.
						</h1>
						<p className="text-lg lg:text-xl text-gray-600 mt-6 max-w-xl">
							Create realistic per-branch environments that help engineering, product, and design teams validate
							changes early and avoid release-day surprises.
						</p>

						<div className="mt-8 flex flex-wrap gap-3">
							<Link
								href="/signup"
								className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
							>
								Enable previews
								<ArrowRight size={16} />
							</Link>
							<Link
								href="/product/features"
								className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-md font-semibold text-gray-900 hover:border-gray-500 transition-colors"
							>
								Explore platform features
							</Link>
						</div>
					</div>

					<div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
						<p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">PR preview board</p>
						<div className="mt-4 rounded-xl border border-gray-200 overflow-hidden">
							<div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex items-center justify-between text-sm">
								<span className="font-semibold text-gray-900">feat/checkout-redesign</span>
								<span className="text-emerald-700 font-semibold">Live</span>
							</div>
							<div className="p-4 space-y-3 text-sm">
								<div className="flex items-center justify-between">
									<span className="text-gray-600">Build status</span>
									<span className="text-emerald-600 font-semibold">Passed</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-gray-600">Runtime checks</span>
									<span className="text-emerald-600 font-semibold">Healthy</span>
								</div>
								<div className="flex items-center justify-between">
									<span className="text-gray-600">Review comments</span>
									<span className="text-violet-700 font-semibold">4</span>
								</div>
							</div>
						</div>

						<div className="mt-4 rounded-xl border border-gray-200 p-4 bg-[#fafbff]">
							<p className="text-sm font-semibold text-gray-900">Feedback velocity</p>
							<div className="mt-3 h-2 rounded-full bg-gray-200 overflow-hidden">
								<div className="h-full w-[84%] bg-linear-to-r from-cyan-400 via-violet-500 to-fuchsia-500"></div>
							</div>
							<p className="text-xs text-gray-600 mt-2">84% reviews completed within same working day</p>
						</div>
					</div>
				</div>
			</section>

			<section className="py-20">
				<div className="max-w-6xl mx-auto px-6">
					<div className="max-w-3xl mb-10">
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Why previews matter</p>
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
							Validate features in context, not just in local simulations.
						</h2>
					</div>

					<div className="grid md:grid-cols-3 gap-6">
						{previewBenefits.map((item) => {
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
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Lifecycle</p>
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
							A continuous preview loop from first commit to final merge.
						</h2>

						<div className="mt-8 space-y-4">
							{lifecycle.map((item, index) => (
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

					<div className="rounded-2xl border border-gray-200 bg-[#0f172a] p-6 text-white">
						<p className="text-xs uppercase tracking-wide text-cyan-200 font-semibold">Environment state</p>
						<div className="mt-5 space-y-3 text-sm">
							<div className="rounded-lg bg-white/10 p-3 flex items-center justify-between">
								<span>Config sync</span>
								<span className="text-emerald-300 font-semibold">Aligned</span>
							</div>
							<div className="rounded-lg bg-white/10 p-3 flex items-center justify-between">
								<span>API smoke tests</span>
								<span className="text-cyan-300 font-semibold">Passing</span>
							</div>
							<div className="rounded-lg bg-white/10 p-3 flex items-center justify-between">
								<span>UX review score</span>
								<span className="text-violet-200 font-semibold">9.2/10</span>
							</div>
						</div>

						<div className="mt-6 rounded-xl bg-white/5 p-4">
							<p className="text-xs text-cyan-100 flex items-center gap-2">
								<CircleCheckBig size={14} />
								Ready to merge once approvals are complete.
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="py-20">
				<div className="max-w-6xl mx-auto px-6">
					<div className="max-w-3xl mb-10">
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">Cross-team outcomes</p>
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
							Preview workflows aligned for every stakeholder.
						</h2>
					</div>

					<div className="grid md:grid-cols-3 gap-6">
						{personas.map((item) => (
							<article key={item.team} className="rounded-2xl border border-gray-200 bg-white p-6">
								<div className="w-11 h-11 rounded-xl bg-gray-900 text-white flex items-center justify-center">
									<Eye size={20} />
								</div>
								<h3 className="text-xl font-bold text-gray-900 mt-4">{item.team}</h3>
								<p className="text-gray-600 mt-2">{item.value}</p>
								<p className="text-sm font-semibold text-violet-700 mt-3">{item.impact}</p>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className="py-20 bg-white border-y border-gray-200">
				<div className="max-w-6xl mx-auto px-6">
					<div className="max-w-3xl mb-10">
						<p className="text-xs uppercase tracking-[0.25em] font-semibold text-violet-700">FAQ</p>
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
							Common questions about preview environment strategy.
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
						<h2 className="text-3xl lg:text-5xl font-black text-gray-900">Launch features with fewer release surprises.</h2>
						<p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
							Turn every pull request into a high-fidelity, shareable environment that accelerates confidence before
							production rollout.
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
								Talk to our team
							</Link>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</main>
	);
}
