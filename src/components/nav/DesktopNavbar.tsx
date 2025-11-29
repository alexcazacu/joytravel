'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Icon } from '@iconify/react';

import { cn } from '@/lib/utils';
import { links, phoneNumber, phoneNumberFormatted } from '@/lib/nav/links';

export function DesktopNavbar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex w-full items-center justify-between px-4 py-3">
      <Link href="/" className="flex items-center">
        <Image
          src="https://cdn.prod.website-files.com/671de9abf06c55f1023324b9/6731b3b9d44bcf05ce0f9d87_travel%20(4).png"
          alt="Momadica Logo"
          width={160}
          height={48}
          className="h-12 w-auto"
        />
      </Link>
      <nav className="flex items-center gap-6 text-[1rem]">
        <a
          href={`tel:${phoneNumber}`}
          className="flex items-center gap-2 text-[#037280] hover:text-[#025b66] font-semibold transition-colors"
        >
          <Icon icon="mdi:phone" className="w-5 h-5" />
          <span>{phoneNumberFormatted}</span>
        </a>
        {links.map((link) => {
          if (link.emphasized) {
            return (
              <Link
                key={link.href}
                href={link.href}
                className="px-5 py-2 bg-[#c17c6f] hover:bg-[#a66a5d] text-white rounded-md font-medium transition-colors shadow-sm"
              >
                {link.label}
              </Link>
            );
          }

          const isActive =
            link.href === '/'
              ? pathname === '/'
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'hover:text-foreground/80 transition-colors',
                isActive ? 'text-foreground' : 'text-foreground/60'
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
