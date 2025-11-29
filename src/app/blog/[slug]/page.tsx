import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { db } from '@/server/db/client';
import { blogPosts } from '@/server/db/schema';
import { eq, and } from 'drizzle-orm';

import BlogPostClient from './BlogPostClient';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [post] = await db
    .select()
    .from(blogPosts)
    .where(and(eq(blogPosts.slug, params.slug), eq(blogPosts.published, true)));

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt || undefined,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt || undefined,
      images: post.metaOgImage ? [post.metaOgImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const [post] = await db
    .select()
    .from(blogPosts)
    .where(and(eq(blogPosts.slug, params.slug), eq(blogPosts.published, true)));

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
