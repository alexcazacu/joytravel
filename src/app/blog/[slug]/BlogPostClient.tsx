'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import parse, { domToReact, HTMLReactParserOptions, Element } from 'html-react-parser';

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

  // Parse HTML and replace icon placeholders with actual Icon components
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element && domNode.name === 'span') {
        const className = domNode.attribs?.class || '';
        const dataIcon = domNode.attribs?.['data-icon'];
        
        if (className.includes('editor-icon') && dataIcon) {
          // Extract icon label from content
          const iconLabel = domNode.children[0]?.type === 'text' 
            ? (domNode.children[0] as any).data.replace(/:/g, '').trim()
            : '';
          
          return (
            <span className="inline-flex items-center gap-1 mx-1">
              <Icon icon={dataIcon} className="w-5 h-5" />
            </span>
          );
        }
      }
    },
  };

  const processedContent = parse(post.content, options);

  return (
    <div className="min-h-screen bg-white">
      {/* Cover Image with Overlay */}
      {post.coverImage ? (
        <section className="relative min-h-[600px] h-[60vh] bg-gray-900">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover opacity-90"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
          
          {/* Content Overlay */}
          <div className="relative h-full flex flex-col justify-end">
            <div className="container max-w-4xl mx-auto px-4 pb-16">
              {/* Back Link */}
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-white/90 hover:text-white mb-8 transition-colors"
              >
                <Icon icon="mdi:arrow-left" className="w-5 h-5" />
                Înapoi la blog
              </Link>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/20 backdrop-blur-md text-white text-sm rounded-full border border-white/30"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 text-white/80">
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
          </div>
        </section>
      ) : (
        /* Fallback without cover image */
        <section className="bg-white border-b min-h-[400px] flex items-end">
          <div className="container max-w-4xl mx-auto px-4 py-12">
            {/* Back Link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
            >
              <Icon icon="mdi:arrow-left" className="w-5 h-5" />
              Înapoi la blog
            </Link>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-teal-100 text-teal-800 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-gray-500">
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
      )}

      {/* Content */}
      <section className="py-16">
        <div className="container max-w-4xl mx-auto px-4">
          <article 
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-a:text-[#037280] hover:prose-a:text-[#025b66] prose-blockquote:border-[#037280] prose-img:rounded-lg"
          >
            {processedContent}
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
