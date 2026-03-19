'use client';

import { useState } from 'react';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { authStore } from '@/lib/auth-store';
import BrandLogo from '@/components/brand-logo';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(authStore.isLoggedIn());
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    setIsLoggedIn(authStore.isLoggedIn());

    const matchedItem = navItems.find(
      (item) => pathname === item.href || pathname.startsWith(`${item.href}/`)
    );
    setActiveTab(matchedItem?.label || '');
  }, [pathname]);

  const handleLogout = () => {
    authStore.logout();
    setIsLoggedIn(false);
    router.push('/');
  };

  const navItems = [
    {
      label: 'Product',
      href: '/product',
      submenu: [
        { label: 'Platform Overview', href: '/product/overview' },
        { label: 'Features', href: '/product/features' },
        { label: 'Autoscaling', href: '/product/autoscaling' },
        { label: 'Private Networking', href: '/product/networking' },
        { label: 'Persistent Disks', href: '/product/disks' },
        { label: 'Infrastructure as Code', href: '/product/iac' },
        { label: 'Preview Environments', href: '/product/preview' },
        { label: 'Zero Downtime Deploys', href: '/product/zero-downtime' },
        { label: 'Veltrix API', href: '/product/api' },
        { label: 'HIPAA on Veltrix', href: '/product/hipaa' },
      ],
    },
    {
      label: 'Pricing',
      href: '/pricing',
    },
    {
      label: 'Customers',
      href: '/customers',
    },
    {
      label: 'Blog',
      href: '/blog',
    },
    {
      label: 'Docs',
      href: '/docs',
    },
    {
      label: 'Changelog',
      href: '/changelog',
    },
    {
      label: 'Company',
      href: '/company',
      submenu: [
        { label: 'About Us', href: '/company/about' },
        { label: 'Security', href: '/company/security' },
        { label: 'Careers', href: '/company/careers' },
        { label: 'Press', href: '/company/press' },
      ],
    },
  ];

  const productMega = {
    topLeft: { label: 'Platform Overview', href: '/product/overview' },
    topRight: { label: 'HIPAA on Veltrix', href: '/product/hipaa' },
    features: [
      { label: 'Autoscaling', href: '/product/autoscaling' },
      { label: 'Private Networking', href: '/product/networking' },
      { label: 'Persistent Disks', href: '/product/disks' },
      { label: 'Infrastructure as Code', href: '/product/iac' },
      { label: 'Preview Environments', href: '/product/preview' },
      { label: 'Zero Downtime Deploys', href: '/product/zero-downtime' },
      { label: 'Veltrix API', href: '/product/api' },
    ],
    services: [
      { label: 'Static Sites', href: '/product/hipaa' },
      { label: 'Web Services', href: '/product/hipaa' },
      { label: 'Private Services', href: '/product/hipaa' },
      { label: 'Background Workers', href: '/product/hipaa' },
      { label: 'Cron Jobs', href: '/product/hipaa' },
      { label: 'Veltrix Postgres', href: '/product/hipaa' },
      { label: 'Key Value', href: '/product/hipaa' },
    ],
  };

  return (
    <>
      {!isLoggedIn && (
        <div className="bg-linear-to-r from-[#25004f] via-[#441167] to-[#d69867] text-white text-xs sm:text-sm py-2 px-4 text-center">
          <span className="font-semibold">Migrate from Heroku and get up to $10k in credits</span>
          <Link href="/signup" className="ml-3 bg-black/80 px-3 py-1 rounded-sm hover:bg-black">
            Get started
          </Link>
        </div>
      )}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <BrandLogo size={34} className="shrink-0" />
              <span className="text-3xl font-semibold text-black hidden sm:inline tracking-tight">Veltrix</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);

                if (item.label === 'Product') {
                  return (
                    <div key={item.label} className="relative group">
                      <Link
                        href={item.href}
                        onClick={() => setActiveTab(item.label)}
                        className={`px-2 py-1 text-sm font-medium transition-colors ${
                          activeTab === item.label || isActive
                            ? 'bg-violet-100 text-gray-900'
                            : 'text-gray-700 hover:bg-violet-100 hover:text-black'
                        }`}
                      >
                        {item.label}
                      </Link>

                      <div className="absolute left-0 mt-3 w-215 bg-[#f5f5f5] border border-gray-300 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                        <div className="grid grid-cols-2 border-b border-gray-300">
                          <Link
                            href={productMega.topLeft.href}
                            className="px-10 py-8 text-[17px] leading-none font-medium text-gray-900 hover:bg-white/60 transition-colors border-r border-gray-300 flex items-center justify-between"
                          >
                            <span>{productMega.topLeft.label}</span>
                            <span className="text-xl leading-none">›</span>
                          </Link>

                          <Link
                            href={productMega.topRight.href}
                            className="px-10 py-8 text-[17px] leading-none font-medium text-gray-900 hover:bg-white/60 transition-colors flex items-center justify-between"
                          >
                            <span>{productMega.topRight.label}</span>
                            <span className="text-xl leading-none">›</span>
                          </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-12 px-10 py-10">
                          <div>
                            <p className="text-sm uppercase tracking-wide text-gray-500 mb-5">Features</p>
                            <div className="space-y-4">
                              {productMega.features.map((entry) => (
                                <Link key={entry.href} href={entry.href} className="block text-[14px] leading-none text-gray-900 hover:text-black transition-colors">
                                  {entry.label}
                                </Link>
                              ))}
                            </div>
                          </div>

                          <div>
                            <p className="text-sm uppercase tracking-wide text-gray-500 mb-5">Services</p>
                            <div className="space-y-4">
                              {productMega.services.map((entry, index) => (
                                <Link key={`${entry.label}-${index}`} href={entry.href} className="block text-[14px] leading-none text-gray-900 hover:text-black transition-colors">
                                  {entry.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={item.label} className="relative group">
                    <Link
                      href={item.href}
                      onClick={() => setActiveTab(item.label)}
                      className={`px-2 py-1 text-sm font-medium transition-colors ${
                        activeTab === item.label || isActive
                          ? 'bg-violet-100 text-gray-900'
                          : 'text-gray-700 hover:bg-violet-100 hover:text-black'
                      }`}
                    >
                      {item.label}
                    </Link>

                    {item.submenu && (
                      <div className="absolute left-0 mt-0 w-56 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.href}
                            href={subitem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-black transition-colors"
                          >
                            {subitem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <div className="flex items-center gap-4">
                  <Link
                    href="/dashboard/projects"
                    className="text-gray-700 hover:text-black text-sm font-medium transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-gray-700 hover:text-black text-sm font-medium transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <>
                  <Link
                    href="/contact"
                    className="text-gray-700 hover:text-black text-sm font-medium transition-colors hidden sm:inline"
                  >
                    Contact
                  </Link>
                  <Link
                    href="/login"
                    className="bg-black text-white px-6 py-2 rounded-md font-medium text-sm hover:bg-gray-900 transition-colors"
                  >
                    Dashboard
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden text-gray-700 hover:text-black"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className="block py-2 text-gray-700 hover:text-black font-medium text-sm"
                  >
                    {item.label}
                  </Link>
                  {item.submenu && (
                    <div className="ml-4 mt-2 space-y-1 pb-2">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.href}
                          href={subitem.href}
                          className="block py-1 text-gray-600 hover:text-black text-xs"
                        >
                          {subitem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/dashboard/projects"
                      className="block py-2 text-gray-700 hover:text-black font-medium text-sm"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left py-2 text-gray-700 hover:text-black font-medium text-sm"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/contact"
                      className="block py-2 text-gray-700 hover:text-black font-medium text-sm"
                    >
                      Contact
                    </Link>
                    <Link
                      href="/login"
                      className="block w-full bg-black text-white px-4 py-2 rounded-md font-medium text-sm text-center"
                    >
                      Dashboard
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
