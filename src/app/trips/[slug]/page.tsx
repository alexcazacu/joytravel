import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { db } from '@/server/db/client';
import { trips } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

import TripDetailClient from './TripDetailClient';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [trip] = await db.select().from(trips).where(eq(trips.slug, params.slug));

  if (!trip) {
    return {
      title: 'Trip Not Found',
    };
  }

  return {
    title: trip.metaTitle || trip.title,
    description: trip.metaDescription || trip.summary || undefined,
    openGraph: {
      title: trip.metaTitle || trip.title,
      description: trip.metaDescription || trip.summary || undefined,
      images: trip.metaOgImage
        ? [{ url: trip.metaOgImage }]
        : trip.data?.overview?.image?.src
        ? [{ url: trip.data.overview.image.src }]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: trip.metaTitle || trip.title,
      description: trip.metaDescription || trip.summary || undefined,
      images: trip.metaOgImage
        ? [trip.metaOgImage]
        : trip.data?.overview?.image?.src
        ? [trip.data.overview.image.src]
        : undefined,
    },
  };
}

export default async function TripPage({ params }: Props) {
  const [trip] = await db.select().from(trips).where(eq(trips.slug, params.slug));

  if (!trip) {
    notFound();
  }

  return <TripDetailClient trip={trip} />;
}
