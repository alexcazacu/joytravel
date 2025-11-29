import type { Metadata } from 'next';
import './globals.css';
import { DesktopNavbar } from '@/components/nav/DesktopNavbar';
import { MobileNav } from '@/components/nav/MobileNav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Momadica Travel – Călătorii personalizate și vacanțe autentice pentru familii',
  description:
    'Agenție de turism specializată în călătorii personalizate pentru familii. Vacanțe de grup, educație prin călătorii și experiențe tailor-made în toată lumea.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
          <div className="max-w-6xl mx-auto">
            <MobileNav />
            <DesktopNavbar />
          </div>
        </header>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
