'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  author: string | null;
  publishedAt: Date | null;
  tags: string[] | null;
};

export default function BlogPostClient({ post }: { post: BlogPost }) {
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
      <section className="bg-gradient-to-br from-[#037280] to-[#025b66] text-white py-16">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Back Link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-teal-100 hover:text-white mb-6 transition-colors"
          >
            <Icon icon="mdi:arrow-left" className="w-5 h-5" />
            Înapoi la blog
          </Link>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>

          {post.excerpt && (
            <p className="text-xl text-teal-100 mb-6">
              {post.excerpt}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-teal-100">
            {post.author && (
              <span className="flex items-center gap-2">
                <Icon icon="mdi:account-circle" className="w-5 h-5" />
                {post.author}
              </span>
            )}
            {post.publishedAt && (
              <span className="flex items-center gap-2">
                <Icon icon="mdi:calendar" className="w-5 h-5" />
                {formatDate(post.publishedAt)}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {post.coverImage && (
        <section className="relative h-96 bg-gray-200">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </section>
      )}

      {/* Content */}
      <section className="py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <article className="prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({ children }) => (
                  <h1 className="text-4xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-2xl font-bold text-gray-900 mt-6 mb-3">{children}</h3>
                ),
                p: ({ children }) => (
                  <p className="text-gray-700 leading-relaxed mb-4">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">{children}</ol>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-[#037280] hover:text-[#025b66] underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-[#037280] pl-4 italic text-gray-600 my-4">
                    {children}
                  </blockquote>
                ),
                code: ({ children }) => (
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-gray-800">
                    {children}
                  </code>
                ),
                pre: ({ children }) => (
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
                    {children}
                  </pre>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </article>

          {/* Back to Blog CTA */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#037280] text-white rounded-lg hover:bg-[#025b66] transition-colors"
            >
              <Icon icon="mdi:arrow-left" className="w-5 h-5" />
              Înapoi la toate articolele
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
