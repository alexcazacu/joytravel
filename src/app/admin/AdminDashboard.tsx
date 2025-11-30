'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';

export default function AdminDashboard() {
  const quickActions = [
    {
      title: 'Manage Trips',
      description: 'Manage all travel itineraries and experiences',
      icon: 'mdi:map-marker-path',
      href: '/admin/trips',
      iconBg: 'bg-teal-100',
      iconColor: 'text-[#037280]',
    },
    {
      title: 'Manage Blog',
      description: 'Manage all blog posts and articles',
      icon: 'mdi:post',
      href: '/admin/blog',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#037280] to-[#025b66] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Icon icon="mdi:view-dashboard" className="w-9 h-9" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Admin Dashboard</h1>
              <p className="text-teal-100 text-lg mt-1">
                Welcome back! Manage your content from here
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="group bg-white rounded-xl shadow-lg border border-gray-200 p-6 hover:shadow-2xl transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 ${action.iconBg} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                  <Icon icon={action.icon} className={`w-7 h-7 ${action.iconColor}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-[#037280] transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">{action.description}</p>
                  <div className="flex items-center gap-2 text-[#037280] font-medium text-sm">
                    Open
                    <Icon
                      icon="mdi:arrow-right"
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
