'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import Image from 'next/image';

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  coverImage: string | null;
  author: string | null;
  publishedAt: Date | null;
  tags: string[] | null;
};

export default function BlogListClient({ posts }: { posts: BlogPost[] }) {
  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('ro-RO', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#037280] to-[#025b66] text-white py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-4">Blog</h1>
            <p className="text-xl text-teal-100">
              Travel tips, stories, and inspiration from around the world
            </p>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="container max-w-6xl mx-auto px-4">
          {posts.length === 0 ? (
            <div className="text-center py-16">
              <Icon icon="mdi:post-outline" className="w-20 h-20 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No posts yet</h3>
              <p className="text-gray-600">Check back soon for new content!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-200"
                >
                  {/* Cover Image */}
                  {post.coverImage ? (
                    <div className="relative h-48 bg-gray-200 overflow-hidden">
                      <Image
                        src={post.coverImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-[#037280] to-[#c17c6f] flex items-center justify-center">
                      <Icon icon="mdi:post" className="w-16 h-16 text-white/40" />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6">
                    {/* Tags */}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#037280] transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {post.excerpt && (
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      {post.author && (
                        <span className="flex items-center gap-1">
                          <Icon icon="mdi:account" className="w-4 h-4" />
                          {post.author}
                        </span>
                      )}
                      {post.publishedAt && (
                        <span className="flex items-center gap-1">
                          <Icon icon="mdi:calendar" className="w-4 h-4" />
                          {formatDate(post.publishedAt)}
                        </span>
                      )}
                    </div>

                    {/* Read More Arrow */}
                    <div className="mt-4 flex items-center gap-2 text-[#037280] font-medium text-sm">
                      Citește mai mult
                      <Icon
                        icon="mdi:arrow-right"
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
