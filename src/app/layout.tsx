import type { Metadata } from 'next';
import './globals.css';
import { ConditionalLayout } from '@/components/ConditionalLayout';

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
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
