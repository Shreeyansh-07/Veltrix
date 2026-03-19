'use client';

import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';
import BrandLogo from '@/components/brand-logo';

const Footer = () => {
  const footerLinks = [
    {
      category: 'Product',
      links: [
        { label: 'Features', href: '/product/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Security', href: '/company/security' },
        { label: 'Roadmap', href: '/roadmap' },
      ],
    },
    {
      category: 'Resources',
      links: [
        { label: 'Docs', href: '/docs' },
        { label: 'API Reference', href: '/docs/api' },
        { label: 'Blog', href: '/blog' },
        { label: 'Status', href: '/status' },
      ],
    },
    {
      category: 'Company',
      links: [
        { label: 'About', href: '/company/about' },
        { label: 'Careers', href: '/company/careers' },
        { label: 'Contact', href: '/contact' },
        { label: 'Press', href: '/company/press' },
      ],
    },
    {
      category: 'Legal',
      links: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
        { label: 'HIPAA', href: '/company/hipaa' },
      ],
    },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <BrandLogo size={32} dark={true} className="shrink-0" />
              <span className="text-white font-bold">Veltrix</span>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Deploy at the speed of thought.
            </p>
            <div className="flex gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.category}>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                {section.category}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
               2024 Veltrix. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
