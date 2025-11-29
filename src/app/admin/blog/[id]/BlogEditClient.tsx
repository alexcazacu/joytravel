'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Icon } from '@iconify/react';

type BlogPostData = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  author: string | null;
  published: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  metaOgImage: string | null;
  tags: string[] | null;
  createdAt: string | number | Date;
  updatedAt: string | number | Date;
  publishedAt: string | number | Date | null;
};

export default function BlogEditClient({ post }: { post: BlogPostData }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeSection, setActiveSection] = useState('content');

  // Fields
  const [slug, setSlug] = useState(post.slug || '');
  const [title, setTitle] = useState(post.title || '');
  const [excerpt, setExcerpt] = useState(post.excerpt || '');
  const [content, setContent] = useState(post.content || '');
  const [coverImage, setCoverImage] = useState(post.coverImage || '');
  const [author, setAuthor] = useState(post.author || '');
  const [published, setPublished] = useState(post.published || false);
  const [metaTitle, setMetaTitle] = useState(post.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(post.metaDescription || '');
  const [metaOgImage, setMetaOgImage] = useState(post.metaOgImage || '');
  const [tags, setTags] = useState<string[]>(post.tags || []);
  const [tagInput, setTagInput] = useState('');

  const markChanged = useCallback(() => {
    setHasUnsavedChanges(true);
  }, []);

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
      markChanged();
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
    markChanged();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveStatus('saving');

    try {
      const response = await fetch(`/api/blog/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          title,
          excerpt,
          content,
          coverImage,
          author,
          published,
          meta: {
            title: metaTitle,
            description: metaDescription,
            og_image: metaOgImage,
          },
          tags,
        }),
      });

      if (response.ok) {
        setSaveStatus('saved');
        setMessage('Changes saved successfully');
        setHasUnsavedChanges(false);
        setTimeout(() => {
          if (saveStatus === 'saved') {
            setSaveStatus('idle');
          }
        }, 3000);
        router.refresh();
      } else {
        const error = await response.json();
        setSaveStatus('error');
        setMessage('Error: ' + (error.error || 'Failed to save'));
      }
    } catch (error) {
      setSaveStatus('error');
      setMessage('Error: ' + (error as Error).message);
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const sections = [
    { id: 'content', label: 'Content', icon: 'mdi:file-document-edit' },
    { id: 'settings', label: 'Settings', icon: 'mdi:cog' },
    { id: 'seo', label: 'SEO', icon: 'mdi:search-web' },
  ];

  const inputClass = 'w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#037280] focus:border-transparent transition-all';
  const labelClass = 'block text-sm font-semibold text-gray-700 mb-2';

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#037280] to-[#025b66] text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/blog"
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Icon icon="mdi:arrow-left" className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold">{post.title}</h1>
                <p className="text-teal-100 text-sm flex items-center gap-2">
                  <code className="bg-white/20 px-2 py-0.5 rounded">{post.slug}</code>
                  {published ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500 text-white text-xs font-medium rounded-full">
                      <Icon icon="mdi:check-circle" className="w-3 h-3" />
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-400 text-white text-xs font-medium rounded-full">
                      <Icon icon="mdi:file-edit" className="w-3 h-3" />
                      Draft
                    </span>
                  )}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {hasUnsavedChanges && !saving && (
                <div className="flex items-center gap-2 text-amber-200">
                  <Icon icon="mdi:alert-circle" className="w-5 h-5" />
                  <span className="text-sm font-medium">Unsaved changes</span>
                </div>
              )}
              
              {saveStatus === 'saved' && (
                <div className="flex items-center gap-2 text-green-300">
                  <Icon icon="mdi:check-circle" className="w-5 h-5" />
                  <span className="text-sm font-medium">{message}</span>
                </div>
              )}
              
              {saveStatus === 'error' && (
                <div className="flex items-center gap-2 text-red-300">
                  <Icon icon="mdi:alert-circle" className="w-5 h-5" />
                  <span className="text-sm font-medium">{message}</span>
                </div>
              )}
              
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#037280] font-semibold rounded-lg hover:bg-gray-100 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-md"
              >
                {saving ? (
                  <>
                    <Icon icon="mdi:loading" className="w-5 h-5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Icon icon="mdi:content-save" className="w-5 h-5" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-[72px] z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                  activeSection === section.id
                    ? 'border-[#037280] text-[#037280]'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon icon={section.icon} className="w-4 h-4" />
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} onChange={markChanged} className="max-w-7xl mx-auto px-6 py-8">
        
        {/* Content Section */}
        {activeSection === 'content' && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 space-y-6">
            <div className="flex items-center gap-3 pb-6 border-b">
              <div className="w-10 h-10 bg-[#037280] rounded-lg flex items-center justify-center">
                <Icon icon="mdi:file-document-edit" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Post Content</h2>
                <p className="text-sm text-gray-500">Write your blog post content using Markdown</p>
              </div>
            </div>

            <div>
              <label className={labelClass}>
                <Icon icon="mdi:format-title" className="w-4 h-4 inline mr-1" />
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputClass}
                placeholder="My Amazing Blog Post"
                required
              />
            </div>

            <div>
              <label className={labelClass}>
                <Icon icon="mdi:text-short" className="w-4 h-4 inline mr-1" />
                Excerpt
              </label>
              <textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className={inputClass}
                rows={3}
                placeholder="Brief summary of your post..."
              />
            </div>

            <div>
              <label className={labelClass}>
                <Icon icon="mdi:file-document" className="w-4 h-4 inline mr-1" />
                Content (Markdown)
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={`${inputClass} font-mono text-sm`}
                rows={20}
                placeholder="Write your post content here using **Markdown**..."
                required
              />
              <p className="text-xs text-gray-500 mt-2">
                <Icon icon="mdi:information" className="w-3.5 h-3.5 inline mr-1" />
                Supports Markdown: **bold**, *italic*, [links](url), images, etc.
              </p>
            </div>
          </div>
        )}

        {/* Settings Section */}
        {activeSection === 'settings' && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 space-y-6">
            <div className="flex items-center gap-3 pb-6 border-b">
              <div className="w-10 h-10 bg-[#037280] rounded-lg flex items-center justify-center">
                <Icon icon="mdi:cog" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Post Settings</h2>
                <p className="text-sm text-gray-500">Configure post metadata and visibility</p>
              </div>
            </div>

            <div>
              <label className={labelClass}>
                <Icon icon="mdi:link-variant" className="w-4 h-4 inline mr-1" />
                URL Slug
              </label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className={inputClass}
                placeholder="my-blog-post"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                URL: /blog/{slug}
              </p>
            </div>

            <div>
              <label className={labelClass}>
                <Icon icon="mdi:image" className="w-4 h-4 inline mr-1" />
                Cover Image URL
              </label>
              <input
                type="text"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                className={inputClass}
                placeholder="/images/blog/cover.jpg"
              />
            </div>

            <div>
              <label className={labelClass}>
                <Icon icon="mdi:account" className="w-4 h-4 inline mr-1" />
                Author
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className={inputClass}
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className={labelClass}>
                <Icon icon="mdi:tag-multiple" className="w-4 h-4 inline mr-1" />
                Tags
              </label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className={inputClass}
                  placeholder="Add a tag..."
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-[#037280] text-white rounded-lg hover:bg-[#025b66] transition-colors"
                >
                  Add
                </button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-blue-900"
                      >
                        <Icon icon="mdi:close" className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <input
                type="checkbox"
                id="published"
                checked={published}
                onChange={(e) => {
                  setPublished(e.target.checked);
                  markChanged();
                }}
                className="w-5 h-5 text-[#037280] rounded focus:ring-2 focus:ring-[#037280]"
              />
              <label htmlFor="published" className="flex-1">
                <span className="font-semibold text-gray-900 flex items-center gap-2">
                  <Icon icon="mdi:publish" className="w-5 h-5 text-green-600" />
                  Publish Post
                </span>
                <p className="text-sm text-gray-600">
                  Make this post visible to the public
                </p>
              </label>
            </div>
          </div>
        )}

        {/* SEO Section */}
        {activeSection === 'seo' && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 space-y-6">
            <div className="flex items-center gap-3 pb-6 border-b">
              <div className="w-10 h-10 bg-[#037280] rounded-lg flex items-center justify-center">
                <Icon icon="mdi:search-web" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">SEO Metadata</h2>
                <p className="text-sm text-gray-500">Optimize for search engines and social sharing</p>
              </div>
            </div>

            <div>
              <label className={labelClass}>Meta Title</label>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                className={inputClass}
                placeholder="SEO-optimized title"
              />
            </div>

            <div>
              <label className={labelClass}>Meta Description</label>
              <textarea
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                className={inputClass}
                rows={3}
                placeholder="Brief description for search results"
              />
            </div>

            <div>
              <label className={labelClass}>OG Image URL</label>
              <input
                type="text"
                value={metaOgImage}
                onChange={(e) => setMetaOgImage(e.target.value)}
                className={inputClass}
                placeholder="/images/blog/og-image.jpg"
              />
              <p className="text-xs text-gray-500 mt-1">
                Image for social media sharing (Facebook, Twitter, etc.)
              </p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
