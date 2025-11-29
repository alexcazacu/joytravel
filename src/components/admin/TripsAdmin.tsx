'use client';

import { useEffect, useState } from 'react';

type Trip = {
  id: string;
  slug: string;
  title: string;
  featured: boolean;
  summary: string | null;
  createdAt: string;
};

type ApiTrip = Omit<Trip, 'createdAt'> & { createdAt: string | number | Date } & {
  metaTitle?: string | null;
  metaDescription?: string | null;
  metaOgImage?: string | null;
  data: unknown;
};

export function TripsAdmin() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [slug, setSlug] = useState('');
  const [title, setTitle] = useState('');
  const [featured, setFeatured] = useState(false);
  const [summary, setSummary] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaOgImage, setMetaOgImage] = useState('');
  const [dataJson, setDataJson] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/trips');
        if (!res.ok) {
          throw new Error(`Failed to load trips: ${res.status}`);
        }
        const json = (await res.json()) as ApiTrip[];
        setTrips(
          json.map((t) => ({
            id: t.id,
            slug: t.slug,
            title: t.title,
            featured: Boolean(t.featured),
            summary: t.summary ?? null,
            createdAt: new Date(t.createdAt).toLocaleString(),
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

    let parsedData: unknown;
    try {
      parsedData = dataJson ? JSON.parse(dataJson) : {};
    } catch (err) {
      setError('Invalid JSON in data field');
      setSaving(false);
      return;
    }

    try {
      const res = await fetch('/api/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          title,
          featured,
          summary: summary || undefined,
          meta: {
            title: metaTitle || undefined,
            description: metaDescription || undefined,
            og_image: metaOgImage || undefined,
          },
          data: parsedData,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Failed to create trip: ${res.status}`);
      }

      // Reload list
      const created = (await res.json()) as ApiTrip;
      setTrips((prev) => [
        ...prev,
        {
          id: created.id,
          slug: created.slug,
          title: created.title,
          featured: Boolean(created.featured),
          summary: created.summary ?? null,
          createdAt: new Date(created.createdAt).toLocaleString(),
        },
      ]);

      setSlug('');
      setTitle('');
      setFeatured(false);
      setSummary('');
      setMetaTitle('');
      setMetaDescription('');
      setMetaOgImage('');
      setDataJson('');
    } catch (err: any) {
      setError(err.message ?? 'Failed to create trip');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 space-y-8">
      <section>
        <h1 className="text-2xl font-semibold mb-4">Trips Admin</h1>
        <p className="text-sm text-muted-foreground mb-4">
          Simple admin to create and list trips. For now, deletion and editing are not implemented.
        </p>
        {loading && <p className="text-sm">Loading trips...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}

        {!loading && trips.length > 0 && (
          <table className="w-full text-sm border border-border rounded-md overflow-hidden">
            <thead className="bg-muted">
              <tr>
                <th className="text-left px-3 py-2 border-b">Title</th>
                <th className="text-left px-3 py-2 border-b">Slug</th>
                <th className="text-left px-3 py-2 border-b">Featured</th>
                <th className="text-left px-3 py-2 border-b">Created</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip) => (
                <tr key={trip.id} className="border-b last:border-b-0">
                  <td className="px-3 py-2 font-medium">{trip.title}</td>
                  <td className="px-3 py-2 text-xs text-muted-foreground">{trip.slug}</td>
                  <td className="px-3 py-2">{trip.featured ? 'Yes' : 'No'}</td>
                  <td className="px-3 py-2 text-xs text-muted-foreground">{trip.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {!loading && trips.length === 0 && !error && (
          <p className="text-sm text-muted-foreground">No trips yet. Create one below.</p>
        )}
      </section>

      <section className="border border-border rounded-md p-4 space-y-4">
        <h2 className="text-lg font-semibold">Create new trip</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Slug</label>
              <input
                type="text"
                className="w-full border rounded px-2 py-1 text-sm"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Title</label>
              <input
                type="text"
                className="w-full border rounded px-2 py-1 text-sm"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="featured"
              type="checkbox"
              className="h-4 w-4"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            <label htmlFor="featured" className="text-sm">
              Featured
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Summary (optional)</label>
            <textarea
              className="w-full border rounded px-2 py-1 text-sm"
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Meta title</label>
              <input
                type="text"
                className="w-full border rounded px-2 py-1 text-sm"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Meta description</label>
              <input
                type="text"
                className="w-full border rounded px-2 py-1 text-sm"
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">OG image URL</label>
              <input
                type="text"
                className="w-full border rounded px-2 py-1 text-sm"
                value={metaOgImage}
                onChange={(e) => setMetaOgImage(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Data (JSON)</label>
            <textarea
              className="w-full border rounded px-2 py-1 text-xs font-mono"
              rows={10}
              placeholder="Paste full trip JSON here (hero, gallery, itinerary, etc.)"
              value={dataJson}
              onChange={(e) => setDataJson(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center px-4 py-2 rounded-md bg-[#037280] text-white text-sm font-medium hover:bg-[#025b66] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {saving ? 'Saving…' : 'Create Trip'}
          </button>
        </form>
      </section>
    </div>
  );
}
