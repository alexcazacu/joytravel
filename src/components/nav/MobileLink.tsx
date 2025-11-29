'use client';

import Link, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { type PropsWithChildren } from 'react';

interface MobileLinkProps
  extends PropsWithChildren<
    LinkProps & {
      className?: string;
      onSelect?: () => void;
    }
  > {}

export function MobileLink({ href, className, children, onSelect, ...rest }: MobileLinkProps) {
  const pathname = usePathname();
  const hrefString = typeof href === 'string' ? href : href.pathname || '/';

  const isActive = pathname === hrefString;

  return (
    <Link
      href={href}
      className={cn(isActive ? 'text-foreground' : 'text-foreground/60', className)}
      onClick={() => {
        onSelect?.();
      }}
      {...rest}
    >
      {children}
    </Link>
  );
}
