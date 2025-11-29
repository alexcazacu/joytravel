import { Metadata } from 'next';
import { db } from '@/server/db/client';
import { blogPosts } from '@/server/db/schema';
import { desc, eq } from 'drizzle-orm';
import BlogListClient from './BlogListClient';

export const metadata: Metadata = {
  title: 'Blog | JoyTravel',
  description: 'Travel tips, stories, and inspiration from around the world',
};

export default async function BlogPage() {
  const posts = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.published, true))
    .orderBy(desc(blogPosts.publishedAt));

  return <BlogListClient posts={posts} />;
}
