import { notFound } from 'next/navigation';
import { db } from '@/server/db/client';
import { blogPosts } from '@/server/db/schema';
import { eq } from 'drizzle-orm';

import BlogEditClient from './BlogEditClient';

type Props = {
  params: { id: string };
};

export default async function BlogEditPage({ params }: Props) {
  const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, params.id));

  if (!post) {
    notFound();
  }

  return <BlogEditClient post={post} />;
}
