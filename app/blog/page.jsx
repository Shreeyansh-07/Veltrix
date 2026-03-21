'use client';

import Link from 'next/link';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import { ArrowRight, Flame, MessageSquare, Newspaper, TrendingUp } from 'lucide-react';

export default function BlogPage() {
  const featuredPost = {
    title: 'How Platform Teams Cut Release Risk by 52% with Health-Gated Delivery',
    date: 'Mar 12, 2026',
    readTime: '11 min read',
    category: 'Engineering',
    summary:
      'A deep dive into deployment strategy design, rollout checkpoints, and operational telemetry that improved release confidence for multi-service teams.',
  };

  const latestPosts = [
    {
      title: 'Blueprint: Designing Preview Environments That Product Teams Actually Use',
      date: 'Mar 8, 2026',
      readTime: '8 min read',
      category: 'Product Delivery',
    },
    {
      title: 'From Manual Scripts to API-Driven Infrastructure Workflows',
      date: 'Mar 4, 2026',
      readTime: '10 min read',
      category: 'Platform Ops',
    },
    {
      title: 'SLOs, Error Budgets, and What to Monitor During Traffic Peaks',
      date: 'Feb 27, 2026',
      readTime: '9 min read',
      category: 'Reliability',
    },
    {
      title: 'Compliance-by-Design for Teams Running HIPAA-Sensitive Services',
      date: 'Feb 19, 2026',
      readTime: '12 min read',
      category: 'Security',
    },
  ];

  const categories = [
    { name: 'Engineering', count: 42 },
    { name: 'Reliability', count: 26 },
    { name: 'Security', count: 18 },
    { name: 'Platform Ops', count: 31 },
    { name: 'Product Delivery', count: 24 },
  ];

  const editorialSeries = [
    {
      name: 'Release Notes Deep Dive',
      detail: 'Technical breakdowns of platform improvements and migration guidance.',
      icon: TrendingUp,
    },
    {
      name: 'Inside Platform Teams',
      detail: 'Case studies from teams scaling deployments and reducing incident load.',
      icon: Newspaper,
    },
    {
      name: 'Shipping Better Software',
      detail: 'Practical habits for improving velocity, reliability, and collaboration.',
      icon: MessageSquare,
    },
  ];

  const newsletterPoints = [
    'Monthly architecture patterns from high-performing teams',
    'Deployment and reliability checklists you can apply immediately',
    'API workflow and compliance implementation guides',
  ];

  const faqs = [
    {
      question: 'How often is the blog updated?',
      answer:
        'We publish regularly with a focus on practical engineering and platform operations content tied to real delivery workflows.',
    },
    {
      question: 'Are blog posts product-specific or general best practices?',
      answer:
        'Both. Some posts are Veltrix-focused tutorials, while others cover transferable reliability and platform engineering patterns.',
    },
    {
      question: 'Can teams request specific topics?',
      answer:
        'Yes. We prioritize content that helps teams solve recurring production and release-management challenges.',
    },
  ];

  const topReads = [
    'Zero downtime rollout checklist for production APIs',
    'Incident review template for deployment regressions',
    'Feature-flag strategy for safe enterprise releases',
  ];

  const trendingTags = ['#deployment', '#platform-engineering', '#api-automation', '#sre', '#security'];

  const archives = ['March 2026', 'February 2026', 'January 2026', 'December 2025', 'November 2025'];

  const visualSpotlights = [
    {
      eyebrow: 'Veltrix News',
      title: 'Veltrix expands AI-assisted deployment workflows for high-scale teams',
      subtitle: 'New rollout intelligence helps teams catch production drift before incidents.',
      theme: 'sunset',
    },
    {
      eyebrow: 'Leadership Voice',
      title: 'Our first reliability principle: ship fast, but never lose rollback confidence',
      subtitle: 'An inside perspective from the product leadership team.',
      theme: 'noir',
    },
    {
      eyebrow: 'AI Operations',
      title: 'Let AI debug your deploys with Veltrix Runtime Signals',
      subtitle: 'Operational recommendations generated from live deploy and health timelines.',
      theme: 'emerald',
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

        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-rose-700">Blog</p>
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mt-4 leading-[1.03]">
              Insights for teams building modern deployment platforms.
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 mt-6 max-w-xl">
              Learn from engineering deep dives, reliability guides, and platform playbooks designed to help teams ship
              faster with fewer production surprises.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
              >
                Start building
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

          <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Featured story</p>
            <div className="mt-4 flex items-center gap-2 text-xs">
              <span className="px-2 py-1 rounded-full bg-rose-100 text-rose-700 font-semibold">{featuredPost.category}</span>
              <span className="text-gray-500">{featuredPost.date}</span>
            </div>
            <h2 className="text-2xl font-black text-gray-900 mt-4">{featuredPost.title}</h2>
            <p className="text-gray-600 mt-3">{featuredPost.summary}</p>
            <p className="text-sm text-gray-500 mt-3">{featuredPost.readTime}</p>
            <button className="mt-5 inline-flex items-center gap-2 text-rose-700 font-semibold">
              Read article
              <ArrowRight size={16} />
            </button>
          </article>
        </div>
      </section>

      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-rose-700">Spotlight stories</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
              Editorial cards with bold visuals, tailored to Veltrix stories.
            </h2>
          </div>

          <div className="space-y-8">
            {visualSpotlights.map((card) => (
              <article
                key={card.title}
                className="relative overflow-hidden rounded-3xl border border-gray-200 min-h-96"
              >
                {card.theme === 'sunset' && (
                  <>
                    <div className="absolute inset-0 bg-linear-to-b from-[#0b1238] via-[#995ecf] to-[#f24f34]"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[130px_100%]"></div>
                  </>
                )}

                {card.theme === 'noir' && (
                  <>
                    <div className="absolute inset-0 bg-linear-to-b from-[#2d0012] via-[#46001a] to-[#1a000a]"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-[linear-gradient(to_right,rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(to_top,rgba(255,255,255,0.14)_1px,transparent_1px)] bg-size-[34px_34px] opacity-45"></div>
                  </>
                )}

                {card.theme === 'emerald' && (
                  <>
                    <div className="absolute inset-0 bg-linear-to-b from-[#003d31] via-[#085f4b] to-[#002e24]"></div>
                    <div className="absolute right-0 top-0 w-48 h-full bg-[repeating-linear-gradient(180deg,#d9b6ff_0_8px,transparent_8px_18px,#a7ef74_18px_26px,transparent_26px_38px)] opacity-95"></div>
                  </>
                )}

                <div className="relative h-full flex items-end p-8 lg:p-10">
                  <div className="max-w-3xl text-white">
                    <p className="text-xs uppercase tracking-[0.22em] font-semibold text-white/80">{card.eyebrow}</p>
                    <h3 className="text-3xl lg:text-6xl font-black leading-[1.05] mt-3">{card.title}</h3>
                    <p className="text-white/85 text-base lg:text-lg mt-4 max-w-2xl">{card.subtitle}</p>
                    <button className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white border border-white/50 rounded-md px-4 py-2 hover:bg-white/10 transition-colors">
                      Read story
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.35fr_0.85fr] gap-8 items-start">
          <div>
            <div className="max-w-3xl mb-10">
              <p className="text-xs uppercase tracking-[0.25em] font-semibold text-rose-700">Latest posts</p>
              <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
                Fresh perspectives from engineering and platform leaders.
              </h2>
            </div>

            <div className="space-y-4">
              {latestPosts.map((post) => (
                <article key={post.title} className="rounded-2xl border border-gray-200 bg-white p-6 hover:shadow-lg transition-all cursor-pointer">
                  <div className="flex items-center flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 rounded-full bg-amber-100 text-amber-700 font-semibold">{post.category}</span>
                    <span className="text-gray-500">{post.date}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{post.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-3">{post.title}</h3>
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Categories</p>
              <div className="mt-4 space-y-2 text-sm">
                {categories.map((category) => (
                  <div key={category.name} className="flex items-center justify-between rounded-lg border border-gray-200 px-3 py-2">
                    <span className="text-gray-700">{category.name}</span>
                    <span className="text-rose-700 font-semibold">{category.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-[#0f172a] text-white p-6">
              <p className="text-xs uppercase tracking-wide text-rose-200 font-semibold">Top reads</p>
              <div className="mt-4 space-y-3 text-sm">
                {topReads.map((item) => (
                  <div key={item} className="rounded-lg bg-white/10 px-3 py-2">{item}</div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-rose-700">Editorial series</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">
              Structured content tracks for every team discipline.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {editorialSeries.map((series) => {
              const Icon = series.icon;
              return (
                <article key={series.name} className="rounded-2xl border border-gray-200 bg-[#fffaf8] p-6 dark:bg-[#122032] dark:border-slate-700/70">
                  <div className="w-12 h-12 rounded-xl bg-linear-to-br from-rose-100 to-amber-100 flex items-center justify-center dark:from-rose-900/40 dark:to-amber-900/40">
                    <Icon size={20} className="text-gray-900 dark:text-slate-100" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mt-4 dark:text-slate-100">{series.name}</h3>
                  <p className="text-gray-600 mt-2 dark:text-slate-300">{series.detail}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-[1.2fr_1fr] gap-8 items-start">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-rose-700">Newsletter</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Get actionable platform insights every month.</h2>
            <div className="mt-8 space-y-3 text-sm">
              {newsletterPoints.map((point) => (
                <div key={point} className="rounded-lg border border-gray-200 bg-white px-4 py-3 flex items-start gap-2">
                  <Flame size={15} className="text-rose-600 mt-0.5 shrink-0" />
                  <span className="text-gray-700">{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6">
            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold">Trending tags</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {trendingTags.map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-sm font-semibold">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-xs uppercase tracking-wide text-gray-500 font-semibold mt-6">Archive</p>
            <div className="mt-3 space-y-2 text-sm">
              {archives.map((month) => (
                <div key={month} className="rounded-lg border border-gray-200 px-3 py-2 text-gray-700">
                  {month}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold text-rose-700">Blog FAQ</p>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 mt-4">Common questions from readers and teams.</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((item) => (
              <details key={item.question} className="group rounded-2xl border border-gray-200 bg-[#fffaf8] p-6 dark:bg-[#122032] dark:border-slate-700/70">
                <summary className="list-none cursor-pointer font-bold text-gray-900 flex items-center justify-between gap-4 dark:text-slate-100">
                  {item.question}
                  <span className="text-rose-700 group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="text-gray-600 mt-3 dark:text-slate-300">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-linear-to-r from-[#fff3eb] via-[#fff8ef] to-[#fff0f5] rounded-3xl border border-gray-200 p-8 lg:p-12 text-center dark:from-[#1a2740] dark:via-[#1f3350] dark:to-[#122238] dark:border-slate-700/70">
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900">Want insights tailored to your team challenges?</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              Follow engineering and reliability content that helps your team ship faster with stronger production
              confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-900 transition-colors"
              >
                Join Veltrix
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center gap-2 border border-gray-300 px-6 py-3 rounded-md font-semibold text-gray-900 hover:border-gray-500 transition-colors"
              >
                Explore docs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
