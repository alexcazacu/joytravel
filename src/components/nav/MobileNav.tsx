'use client';

import { useState } from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { MobileLink } from '@/components/nav/MobileLink';
import { links, phoneNumber, phoneNumberFormatted } from '@/lib/nav/links';

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center w-full md:hidden px-3 gap-3 py-2">
      <Link href="/" className="flex items-center flex-1 max-w-[150px]">
        <Image
          src="https://cdn.prod.website-files.com/671de9abf06c55f1023324b9/6731b3b9d44bcf05ce0f9d87_travel%20(4).png"
          alt="Momadica Logo"
          width={120}
          height={40}
          className="h-10 w-auto"
        />
      </Link>
      <div className="flex justify-center flex-1">
        <a
          href={`tel:${phoneNumber}`}
          className="flex items-center justify-center gap-1 rounded-full bg-white/80 px-3 py-2 text-[#037280] hover:text-[#025b66] font-semibold transition-colors text-sm shadow-sm"
        >
          <Icon icon="mdi:phone" className="w-5 h-5" />
          <span className="hidden xs:inline">{phoneNumberFormatted}</span>
        </a>
      </div>
      <div className="flex justify-end flex-1">
        <Button
          variant="ghost"
          className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Toggle menu"
        >
          <Icon icon="mdi:menu" className="h-6 w-6" />
        </Button>
      </div>

      {open && (
        <div className="fixed inset-0 z-40 bg-black/40" onClick={() => setOpen(false)}>
          <div
            className="absolute inset-y-0 left-0 w-72 max-w-full bg-white shadow-xl p-4 flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <MobileLink href="/" onSelect={() => setOpen(false)} className="flex items-center gap-2 text-foreground">
                <Icon icon="mdi:home" className="h-4 w-4" />
                <span className="font-bold">Momadica</span>
              </MobileLink>
              <Button
                variant="ghost"
                className="px-2"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
              >
                <Icon icon="mdi:close" className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto pr-2">
              <div className="flex flex-col space-y-3 text-[1rem]">
                {links.map((link) =>
                  link.emphasized ? (
                    <MobileLink
                      key={link.href}
                      href={link.href}
                      onSelect={() => setOpen(false)}
                      className="px-4 py-2 bg-[#c17c6f] hover:bg-[#a66a5d] text-white rounded-md font-medium text-center"
                    >
                      {link.label}
                    </MobileLink>
                  ) : (
                    <MobileLink
                      key={link.href}
                      href={link.href}
                      onSelect={() => setOpen(false)}
                      className="text-foreground"
                    >
                      {link.label}
                    </MobileLink>
                  )
                )}

                <div className="pt-4 border-t mt-4">
                  <a
                    href={`tel:${phoneNumber}`}
                    className="flex items-center gap-2 text-[#037280] hover:text-[#025b66] font-semibold"
                  >
                    <Icon icon="mdi:phone" className="w-5 h-5" />
                    <span>{phoneNumberFormatted}</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
