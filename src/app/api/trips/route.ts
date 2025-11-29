import { NextResponse } from 'next/server';
import { and, eq } from 'drizzle-orm';

import { db } from '@/server/db/client';
import { trips } from '@/server/db/schema';

// GET /api/trips -> list all trips
// POST /api/trips -> create trip
export async function GET() {
  const all = await db.select().from(trips).orderBy(trips.createdAt);
  return NextResponse.json(all);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic expected shape. `data` can be your full trip object.
    const {
      id,
      slug,
      title,
      featured = false,
      summary,
      meta,
      data,
    } = body;

    if (!slug || !title || !data) {
      return NextResponse.json(
        { error: 'slug, title and data are required' },
        { status: 400 }
      );
    }

    const now = new Date();

    const [inserted] = await db
      .insert(trips)
      .values({
        id: id ?? crypto.randomUUID(),
        slug,
        title,
        featured,
        summary,
        metaTitle: meta?.title,
        metaDescription: meta?.description,
        metaOgImage: meta?.og_image,
        data,
        createdAt: now,
        updatedAt: now,
      })
      .returning();

    return NextResponse.json(inserted, { status: 201 });
  } catch (error) {
    console.error('Error creating trip', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
