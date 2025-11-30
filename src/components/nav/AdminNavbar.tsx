'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';

export default function AdminNavbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/admin', label: 'Dashboard', icon: 'mdi:view-dashboard' },
    { href: '/admin/trips', label: 'Trips', icon: 'mdi:map-marker-path' },
    { href: '/admin/blog', label: 'Blog', icon: 'mdi:post' },
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#037280] to-[#025b66] rounded-lg flex items-center justify-center">
              <Icon icon="mdi:shield-account" className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">JoyTravel Admin</span>
          </Link>

          {/* Nav Links */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive(link.href)
                    ? 'bg-[#037280] text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon icon={link.icon} className="w-5 h-5" />
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
            >
              <Icon icon="mdi:open-in-new" className="w-5 h-5" />
              View Site
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
