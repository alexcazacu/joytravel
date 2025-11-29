import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

import { db } from '@/server/db/client';
import { trips } from '@/server/db/schema';

// GET /api/trips/[id]
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const [trip] = await db.select().from(trips).where(eq(trips.id, params.id));

  if (!trip) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(trip);
}

// PUT /api/trips/[id] -> full update
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const {
      slug,
      title,
      featured,
      summary,
      meta,
      data,
    } = body;

    const now = new Date();

    const [updated] = await db
      .update(trips)
      .set({
        ...(slug !== undefined ? { slug } : {}),
        ...(title !== undefined ? { title } : {}),
        ...(featured !== undefined ? { featured } : {}),
        ...(summary !== undefined ? { summary } : {}),
        ...(meta?.title !== undefined ? { metaTitle: meta.title } : {}),
        ...(meta?.description !== undefined
          ? { metaDescription: meta.description }
          : {}),
        ...(meta?.og_image !== undefined ? { metaOgImage: meta.og_image } : {}),
        ...(data !== undefined ? { data } : {}),
        updatedAt: now,
      })
      .where(eq(trips.id, params.id))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating trip', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE /api/trips/[id]
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const [deleted] = await db
    .delete(trips)
    .where(eq(trips.id, params.id))
    .returning();

  if (!deleted) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
