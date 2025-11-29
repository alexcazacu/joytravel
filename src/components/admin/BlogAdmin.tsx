'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Icon } from '@iconify/react';

type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  author: string | null;
  published: boolean;
  createdAt: string;
};

type ApiBlogPost = Omit<BlogPost, 'createdAt'> & { createdAt: string | number | Date } & {
  content: string;
  coverImage?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaOgImage?: string | null;
  tags?: string[] | null;
};

export function BlogAdmin() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/blog');
        if (!res.ok) {
          throw new Error(`Failed to load posts: ${res.status}`);
        }
        const json = (await res.json()) as ApiBlogPost[];
        setPosts(
          json.map((p) => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            excerpt: p.excerpt ?? null,
            author: p.author ?? null,
            published: Boolean(p.published),
            createdAt: new Date(p.createdAt).toLocaleString(),
          }))
        );
      } catch (e: any) {
        setError(e.message ?? 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          title,
          excerpt: excerpt || undefined,
          content: '', // Empty content - will be filled in editor
          published: false,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Failed to create post: ${res.status}`);
      }

      const created = (await res.json()) as ApiBlogPost;
      
      // Redirect to edit page
      router.push(`/admin/blog/${created.id}`);
    } catch (err: any) {
      setError(err.message ?? 'Failed to create post');
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete post "${title}"?`)) return;

    try {
      const res = await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error('Failed to delete');
      }
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      setError(err.message ?? 'Failed to delete post');
    }
  };

  const stats = {
    total: posts.length,
    published: posts.filter((p) => p.published).length,
    draft: posts.filter((p) => !p.published).length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#037280] to-[#025b66] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Icon icon="mdi:post" className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Blog Admin</h1>
              <p className="text-teal-100 text-sm">
                Manage your blog posts and articles
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-100 text-sm">Total Posts</p>
                  <p className="text-3xl font-bold mt-1">{stats.total}</p>
                </div>
                <Icon icon="mdi:file-document-multiple" className="w-10 h-10 text-white/40" />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-100 text-sm">Published</p>
                  <p className="text-3xl font-bold mt-1">{stats.published}</p>
                </div>
                <Icon icon="mdi:check-circle" className="w-10 h-10 text-white/40" />
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-teal-100 text-sm">Drafts</p>
                  <p className="text-3xl font-bold mt-1">{stats.draft}</p>
                </div>
                <Icon icon="mdi:file-edit" className="w-10 h-10 text-white/40" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <Icon icon="mdi:alert-circle" className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-red-900">Error</h3>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Posts List */}
        <section className="bg-white rounded-xl shadow-lg border border-gray-200">
          <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">All Posts</h2>
              <p className="text-sm text-gray-500 mt-1">
                Click Edit to open the editor for any post
              </p>
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#037280] text-white font-semibold rounded-lg hover:bg-[#025b66] transition-all shadow-md hover:shadow-lg"
            >
              <Icon icon="mdi:plus" className="w-5 h-5" />
              New Post
            </button>
          </div>

          <div className="p-6">
            {loading && (
              <div className="flex flex-col items-center justify-center py-16">
                <Icon icon="mdi:loading" className="w-12 h-12 text-[#037280] animate-spin mb-4" />
                <p className="text-gray-600">Loading posts...</p>
              </div>
            )}

            {!loading && posts.length === 0 && !error && (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Icon icon="mdi:post-outline" className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts yet</h3>
                <p className="text-gray-500 text-sm mb-6">Get started by creating your first blog post</p>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#037280] text-white rounded-lg hover:bg-[#025b66] transition-colors"
                >
                  <Icon icon="mdi:plus" className="w-5 h-5" />
                  Create First Post
                </button>
              </div>
            )}

            {!loading && posts.length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Post</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Slug</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Status</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">Created</th>
                      <th className="text-right px-4 py-3 text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {posts.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-[#037280] to-[#c17c6f] rounded-lg flex items-center justify-center flex-shrink-0">
                              <Icon icon="mdi:post" className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{post.title}</p>
                              {post.excerpt && (
                                <p className="text-xs text-gray-500 line-clamp-1">{post.excerpt}</p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                            {post.slug}
                          </code>
                        </td>
                        <td className="px-4 py-4">
                          {post.published ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                              <Icon icon="mdi:check-circle" className="w-3.5 h-3.5" />
                              Published
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                              <Icon icon="mdi:file-edit" className="w-3.5 h-3.5" />
                              Draft
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <p className="text-sm text-gray-600">{post.createdAt}</p>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/blog/${post.id}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors"
                            >
                              <Icon icon="mdi:pencil" className="w-4 h-4" />
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(post.id, post.title)}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-700 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors"
                            >
                              <Icon icon="mdi:delete" className="w-4 h-4" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Create Form - Inline */}
          {showCreateForm && (
            <div className="border-t border-gray-200 bg-gradient-to-br from-blue-50 to-teal-50">
              <form onSubmit={handleCreate} className="p-6 space-y-4">
                <div className="flex items-start gap-3 mb-4">
                  <Icon icon="mdi:information-outline" className="w-5 h-5 text-blue-600 mt-0.5" />
                  <p className="text-sm text-blue-800">
                    Create a basic post entry. You'll be redirected to the full editor to write your content.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Icon icon="mdi:link-variant" className="w-4 h-4 inline mr-1" />
                      Slug
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#037280] focus:border-transparent"
                      placeholder="my-amazing-blog-post"
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      <Icon icon="mdi:format-title" className="w-4 h-4 inline mr-1" />
                      Title
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#037280] focus:border-transparent"
                      placeholder="My Amazing Blog Post"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Icon icon="mdi:text" className="w-4 h-4 inline mr-1" />
                    Excerpt <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#037280] focus:border-transparent resize-none"
                    rows={2}
                    placeholder="Brief summary..."
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#037280] text-white font-semibold rounded-lg hover:bg-[#025b66] disabled:opacity-60 transition-all"
                  >
                    {saving ? (
                      <>
                        <Icon icon="mdi:loading" className="w-4 h-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Icon icon="mdi:plus-circle" className="w-4 h-4" />
                        Create Post
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="px-4 py-2 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
