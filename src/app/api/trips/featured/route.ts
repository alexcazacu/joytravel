import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

import { db } from '@/server/db/client';
import { trips } from '@/server/db/schema';

// GET /api/trips/featured -> list only featured trips
export async function GET() {
  const featured = await db
    .select()
    .from(trips)
    .where(eq(trips.featured, true))
    .orderBy(trips.createdAt);

  return NextResponse.json(featured);
}
