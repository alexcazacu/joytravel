import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';

import { db } from '@/server/db/client';
import { blogPosts } from '@/server/db/schema';

// GET /api/blog/[id]
export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, params.id));

  if (!post) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json(post);
}

// PUT /api/blog/[id] - Update post
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const {
      slug,
      title,
      excerpt,
      content,
      coverImage,
      author,
      published,
      meta,
      tags,
    } = body;

    const now = new Date();
    
    // Get current post to check if we're changing published status
    const [currentPost] = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.id, params.id));

    const wasUnpublished = currentPost && !currentPost.published;
    const isNowPublished = published === true;
    
    const [updated] = await db
      .update(blogPosts)
      .set({
        ...(slug !== undefined ? { slug } : {}),
        ...(title !== undefined ? { title } : {}),
        ...(excerpt !== undefined ? { excerpt } : {}),
        ...(content !== undefined ? { content } : {}),
        ...(coverImage !== undefined ? { coverImage } : {}),
        ...(author !== undefined ? { author } : {}),
        ...(published !== undefined ? { published } : {}),
        ...(meta?.title !== undefined ? { metaTitle: meta.title } : {}),
        ...(meta?.description !== undefined ? { metaDescription: meta.description } : {}),
        ...(meta?.og_image !== undefined ? { metaOgImage: meta.og_image } : {}),
        ...(tags !== undefined ? { tags } : {}),
        updatedAt: now,
        // Set publishedAt only when first publishing
        ...(wasUnpublished && isNowPublished ? { publishedAt: now } : {}),
      })
      .where(eq(blogPosts.id, params.id))
      .returning();

    if (!updated) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating blog post', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE /api/blog/[id]
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const [deleted] = await db
    .delete(blogPosts)
    .where(eq(blogPosts.id, params.id))
    .returning();

  if (!deleted) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
