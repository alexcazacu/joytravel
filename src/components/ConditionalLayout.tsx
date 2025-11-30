'use client';

import { usePathname } from 'next/navigation';
import { DesktopNavbar } from '@/components/nav/DesktopNavbar';
import { MobileNav } from '@/components/nav/MobileNav';
import { Footer } from '@/components/Footer';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute) {
    // Admin pages: no main nav/footer (they have their own layout)
    return <>{children}</>;
  }

  // Public pages: include nav and footer
  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
        <div className="max-w-6xl mx-auto">
          <MobileNav />
          <DesktopNavbar />
        </div>
      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
}
