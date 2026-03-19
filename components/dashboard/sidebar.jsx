'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FolderOpen, Settings, BarChart3, Menu, X, ChevronDown, LogOut, Bell } from 'lucide-react';
import { authStore } from '@/lib/auth-store';
import { projectsStore } from '@/lib/projects-store';
import { toast } from 'sonner';

const DashboardSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [counts, setCounts] = useState({ projects: 0, deployments: 0 });

  const user = authStore.getCurrentUser();
  const workspace = authStore.getWorkspace();

  useEffect(() => {
    if (!workspace?.id) return;
    const projects = projectsStore.getProjects(workspace.id);
    const deployments = projectsStore.getDeployments(workspace.id);
    setCounts({ projects: projects.length, deployments: deployments.length });
  }, [workspace?.id, pathname]);

  const menuItems = [
    {
      icon: FolderOpen,
      label: 'Projects',
      href: '/dashboard/projects',
      badge: counts.projects,
    },
    {
      icon: BarChart3,
      label: 'Deployments',
      href: '/dashboard/deployments',
      badge: counts.deployments,
    },
    {
      icon: Settings,
      label: 'Settings',
      href: '/dashboard/settings',
    },
  ];

  const handleLogout = () => {
    authStore.logout();
    toast.success('Logged out successfully');
    router.push('/');
  };

  const isActive = (href) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 hover:bg-gray-200 rounded-lg"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`${isOpen ? 'w-64' : 'w-0'} lg:w-64 bg-white border-r border-gray-200 overflow-hidden transition-all duration-300 flex flex-col h-screen`}>
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <Link href="/dashboard/projects" className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Veltrix</p>
              <p className="text-xs text-gray-500">{workspace?.name || 'Workspace'}</p>
            </div>
          </Link>
        </div>

        {/* Workspace Switcher */}
        <div className="px-6 py-4 border-b border-gray-200">
          <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700">
            <span className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gray-900 rounded flex items-center justify-center text-xs font-bold text-white">
                {workspace?.name?.charAt(0).toUpperCase()}
              </div>
              {workspace?.name || 'Workspace'}
            </span>
            <ChevronDown size={16} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-2 overflow-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all ${
                  active
                    ? 'bg-purple-100 text-purple-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} />
                  <span className="text-sm">{item.label}</span>
                </div>
                {typeof item.badge === 'number' && (
                  <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded-full min-w-6 text-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Integrations Section */}
        <div className="px-3 py-6 border-t border-gray-200 space-y-2">
          <p className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            Integrations
          </p>
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-sm font-medium">
            <Bell size={20} />
            <span>Observability</span>
          </button>
        </div>

        {/* Bottom Section */}
        <div className="px-3 py-4 border-t border-gray-200 space-y-2">
          <div className="px-4 py-3 text-sm">
            <p className="text-xs text-gray-500 mb-1">Signed in as</p>
            <p className="font-medium text-gray-900 truncate">{user?.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors text-sm font-medium"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
        ></div>
      )}
    </>
  );
};

export default DashboardSidebar;
