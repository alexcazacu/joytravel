import { NextResponse } from 'next/server';
import { db } from '@/server/db/client';
import { blogPosts } from '@/server/db/schema';
import { desc, eq } from 'drizzle-orm';

// GET /api/blog - List all posts (or only published for public)
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const publishedOnly = searchParams.get('published') === 'true';

  let query = db.select().from(blogPosts);
  
  if (publishedOnly) {
    query = query.where(eq(blogPosts.published, true)) as any;
  }
  
  const posts = await query.orderBy(desc(blogPosts.createdAt));
  
  return NextResponse.json(posts);
}

// POST /api/blog - Create new post
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      id,
      slug,
      title,
      excerpt,
      content,
      coverImage,
      author,
      published = false,
      meta,
      tags,
    } = body;

    if (!slug || !title) {
      return NextResponse.json(
        { error: 'slug and title are required' },
        { status: 400 }
      );
    }

    const now = new Date();

    const [inserted] = await db
      .insert(blogPosts)
      .values({
        id: id ?? crypto.randomUUID(),
        slug,
        title,
        excerpt: excerpt || null,
        content: content || '', // Allow empty content for drafts
        coverImage: coverImage || null,
        author: author || null,
        published,
        metaTitle: meta?.title || null,
        metaDescription: meta?.description || null,
        metaOgImage: meta?.og_image || null,
        tags: tags || null,
        createdAt: now,
        updatedAt: now,
        publishedAt: published ? now : null,
      })
      .returning();

    return NextResponse.json(inserted);
  } catch (error) {
    console.error('Error creating blog post', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
