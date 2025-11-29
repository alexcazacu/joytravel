import { notFound } from 'next/navigation';
import { db } from '@/server/db/client';
import { trips } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

import TripEditClient from './TripEditClient';

type Props = {
  params: { id: string };
};

export default async function TripEditPage({ params }: Props) {
  const [trip] = await db.select().from(trips).where(eq(trips.id, params.id));

  if (!trip) {
    notFound();
  }

  return <TripEditClient trip={trip} />;
}
