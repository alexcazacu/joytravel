'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import ArrayItem from '@/components/admin/ArrayItem';

type TripData = {
  id: string;
  slug: string;
  title: string;
  featured: boolean;
  summary: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  metaOgImage: string | null;
  data: any;
  createdAt: string | number | Date;
  updatedAt: string | number | Date;
};

export default function TripEditClient({ trip }: { trip: TripData }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeSection, setActiveSection] = useState('basic');

  // Scalar fields
  const [slug, setSlug] = useState(trip.slug || '');
  const [featured, setFeatured] = useState(trip.featured || false);
  const [metaTitle, setMetaTitle] = useState(trip.metaTitle || '');
  const [metaDescription, setMetaDescription] = useState(trip.metaDescription || '');
  const [metaOgImage, setMetaOgImage] = useState(trip.metaOgImage || '');
  const [heroTitle, setHeroTitle] = useState(trip.data?.hero?.title || '');
  const [heroSubtitle, setHeroSubtitle] = useState(trip.data?.hero?.subtitle || '');
  const [overviewTitle, setOverviewTitle] = useState(trip.data?.overview?.title || '');
  const [overviewImageSrc, setOverviewImageSrc] = useState(trip.data?.overview?.image?.src || '');
  const [overviewImageAlt, setOverviewImageAlt] = useState(trip.data?.overview?.image?.alt || '');
  const [pricingTitle, setPricingTitle] = useState(trip.data?.pricing?.title || '');
  const [pricingDescription, setPricingDescription] = useState(trip.data?.pricing?.description || '');

  // Arrays
  const [gallery, setGallery] = useState(trip.data?.gallery || []);
  const [paragraphs, setParagraphs] = useState(trip.data?.overview?.paragraphs || []);
  const [tags, setTags] = useState(trip.data?.overview?.tags || []);
  const [prices, setPrices] = useState(trip.data?.pricing?.prices || []);
  const [dailyItinerary, setDailyItinerary] = useState(trip.data?.itinerary || []);
  const [accommodations, setAccommodations] = useState(trip.data?.accommodations || []);
  const [faq, setFaq] = useState(trip.data?.faq || []);

  // Mark as changed
  const markChanged = useCallback(() => {
    setHasUnsavedChanges(true);
  }, []);

  // Gallery functions
  const addGalleryImage = () => {
    setGallery([...gallery, { src: '', alt: '' }]);
    markChanged();
  };

  const removeGalleryImage = (index: number) => {
    setGallery(gallery.filter((_, i) => i !== index));
    markChanged();
  };

  const updateGalleryImage = (index: number, field: 'src' | 'alt', value: string) => {
    const newGallery = [...gallery];
    newGallery[index] = { ...newGallery[index], [field]: value };
    setGallery(newGallery);
    markChanged();
  };

  // Paragraph functions
  const addParagraph = () => {
    setParagraphs([...paragraphs, '']);
    markChanged();
  };

  const removeParagraph = (index: number) => {
    setParagraphs(paragraphs.filter((_, i) => i !== index));
    markChanged();
  };

  const updateParagraph = (index: number, value: string) => {
    const newParagraphs = [...paragraphs];
    newParagraphs[index] = value;
    setParagraphs(newParagraphs);
    markChanged();
  };

  // Tag functions
  const addTag = () => {
    setTags([...tags, { icon: 'lucide:info', label: '', value: '' }]);
    markChanged();
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
    markChanged();
  };

  const updateTag = (index: number, field: 'icon' | 'label' | 'value', value: string) => {
    const newTags = [...tags];
    newTags[index] = { ...newTags[index], [field]: value };
    setTags(newTags);
    markChanged();
  };

  // Price functions
  const addPrice = () => {
    setPrices([...prices, { package: '', early_booking: '', standard: '' }]);
    markChanged();
  };

  const removePrice = (index: number) => {
    setPrices(prices.filter((_, i) => i !== index));
    markChanged();
  };

  const updatePrice = (index: number, field: string, value: string) => {
    const newPrices = [...prices];
    newPrices[index] = { ...newPrices[index], [field]: value };
    setPrices(newPrices);
    markChanged();
  };

  // Daily itinerary functions
  const addDay = () => {
    const newDay = dailyItinerary.length + 1;
    setDailyItinerary([
      ...dailyItinerary,
      { day: newDay, date: '', title: '', meals: '', activities: [] },
    ]);
    markChanged();
  };

  const removeDay = (index: number) => {
    const newItinerary = dailyItinerary.filter((_, i) => i !== index);
    // Renumber days
    newItinerary.forEach((day: any, i: number) => {
      day.day = i + 1;
    });
    setDailyItinerary(newItinerary);
    markChanged();
  };

  const updateDay = (index: number, field: string, value: string) => {
    const newItinerary = [...dailyItinerary];
    newItinerary[index] = { ...newItinerary[index], [field]: value };
    setDailyItinerary(newItinerary);
    markChanged();
  };

  const addActivity = (dayIndex: number) => {
    const newItinerary = [...dailyItinerary];
    if (!newItinerary[dayIndex].activities) {
      newItinerary[dayIndex].activities = [];
    }
    newItinerary[dayIndex].activities.push({ icon: '', description: '' });
    setDailyItinerary(newItinerary);
    markChanged();
  };

  const removeActivity = (dayIndex: number, activityIndex: number) => {
    const newItinerary = [...dailyItinerary];
    newItinerary[dayIndex].activities.splice(activityIndex, 1);
    setDailyItinerary(newItinerary);
    markChanged();
  };

  const updateActivity = (dayIndex: number, activityIndex: number, field: string, value: string) => {
    const newItinerary = [...dailyItinerary];
    newItinerary[dayIndex].activities[activityIndex] = {
      ...newItinerary[dayIndex].activities[activityIndex],
      [field]: value,
    };
    setDailyItinerary(newItinerary);
    markChanged();
  };

  // Accommodation functions
  const addAccommodation = () => {
    setAccommodations([...accommodations, { name: '', description: '', photo: '', dates: '' }]);
    markChanged();
  };

  const removeAccommodation = (index: number) => {
    setAccommodations(accommodations.filter((_, i) => i !== index));
    markChanged();
  };

  const updateAccommodation = (index: number, field: string, value: string) => {
    const newAccommodations = [...accommodations];
    newAccommodations[index] = { ...newAccommodations[index], [field]: value };
    setAccommodations(newAccommodations);
    markChanged();
  };

  // FAQ functions
  const addFaq = () => {
    setFaq([...faq, { question: '', answer: '' }]);
    markChanged();
  };

  const removeFaq = (index: number) => {
    setFaq(faq.filter((_, i) => i !== index));
    markChanged();
  };

  const updateFaq = (index: number, field: string, value: string) => {
    const newFaq = [...faq];
    newFaq[index] = { ...newFaq[index], [field]: value };
    setFaq(newFaq);
    markChanged();
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSaveStatus('saving');

    const updatedData = {
      ...trip.data,
      hero: {
        title: heroTitle,
        subtitle: heroSubtitle,
      },
      gallery,
      overview: {
        title: overviewTitle,
        paragraphs,
        tags,
        image: {
          src: overviewImageSrc,
          alt: overviewImageAlt,
        },
      },
      itinerary: dailyItinerary,
      accommodations,
      pricing: {
        title: pricingTitle,
        description: pricingDescription,
        prices,
      },
      faq,
    };

    try {
      const response = await fetch(`/api/trips/${trip.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          featured,
          meta: {
            title: metaTitle,
            description: metaDescription,
            og_image: metaOgImage,
          },
          data: updatedData,
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

  // Warn before leaving with unsaved changes
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
    { id: 'basic', label: 'Basic Info', icon: 'mdi:information' },
    { id: 'hero', label: 'Hero Section', icon: 'mdi:image-area' },
    { id: 'gallery', label: 'Gallery', icon: 'mdi:image-multiple' },
    { id: 'overview', label: 'Overview', icon: 'mdi:text-box' },
    { id: 'itinerary', label: 'Itinerary', icon: 'mdi:calendar-text' },
    { id: 'accommodations', label: 'Accommodations', icon: 'mdi:bed' },
    { id: 'pricing', label: 'Pricing', icon: 'mdi:currency-usd' },
    { id: 'faq', label: 'FAQ', icon: 'mdi:help-circle' },
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
                href="/admin/trips"
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Icon icon="mdi:arrow-left" className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold">{trip.title}</h1>
                <p className="text-teal-100 text-sm flex items-center gap-2">
                  <code className="bg-white/20 px-2 py-0.5 rounded">{trip.slug}</code>
                  {featured && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-500 text-white text-xs font-medium rounded-full">
                      <Icon icon="mdi:star" className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                </p>
              </div>
            </div>
            
            {/* Save Status & Button */}
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
          <div className="flex gap-1 overflow-x-auto scrollbar-hide">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
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
        
        {/* Basic Info Section */}
        {activeSection === 'basic' && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 space-y-6">
            <div className="flex items-center gap-3 pb-6 border-b">
              <div className="w-10 h-10 bg-[#037280] rounded-lg flex items-center justify-center">
                <Icon icon="mdi:information" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Basic Information</h2>
                <p className="text-sm text-gray-500">Core details and settings for this trip</p>
              </div>
            </div>

            {/* Slug */}
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
                placeholder="sri-lanka-family-trip"
              />
              <p className="text-xs text-gray-500 mt-1">
                <Icon icon="mdi:information" className="w-3.5 h-3.5 inline mr-1" />
                URL-friendly identifier (e.g., /trips/{slug})
              </p>
            </div>

            {/* Featured Toggle */}
            <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => {
                  setFeatured(e.target.checked);
                  markChanged();
                }}
                className="w-5 h-5 text-[#037280] rounded focus:ring-2 focus:ring-[#037280]"
              />
              <label htmlFor="featured" className="flex-1">
                <span className="font-semibold text-gray-900 flex items-center gap-2">
                  <Icon icon="mdi:star" className="w-5 h-5 text-amber-600" />
                  Featured Trip
                </span>
                <p className="text-sm text-gray-600">
                  Display this trip in the homepage carousel
                </p>
              </label>
            </div>

            {/* SEO Metadata */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Icon icon="mdi:search-web" className="w-5 h-5 text-[#037280]" />
                SEO Metadata
              </h3>
              
              <div>
                <label className={labelClass}>Meta Title</label>
                <input
                  type="text"
                  value={metaTitle}
                  onChange={(e) => setMetaTitle(e.target.value)}
                  className={inputClass}
                  placeholder="SEO-optimized title for search engines"
                />
              </div>

              <div>
                <label className={labelClass}>Meta Description</label>
                <textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  className={inputClass}
                  rows={3}
                  placeholder="Brief description for search engine results"
                />
              </div>

              <div>
                <label className={labelClass}>OG Image URL</label>
                <input
                  type="text"
                  value={metaOgImage}
                  onChange={(e) => setMetaOgImage(e.target.value)}
                  className={inputClass}
                  placeholder="/images/trip-og.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">Image for social media sharing (Facebook, Twitter, etc.)</p>
              </div>
            </div>
          </div>
        )}

        {/* Hero Section */}
        {activeSection === 'hero' && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 space-y-6">
            <div className="flex items-center gap-3 pb-6 border-b">
              <div className="w-10 h-10 bg-[#037280] rounded-lg flex items-center justify-center">
                <Icon icon="mdi:image-area" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Hero Section</h2>
                <p className="text-sm text-gray-500">Main title and subtitle displayed on the trip page</p>
              </div>
            </div>

            <div>
              <label className={labelClass}>
                <Icon icon="mdi:format-title" className="w-4 h-4 inline mr-1" />
                Hero Title
              </label>
              <input
                type="text"
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className={inputClass}
                placeholder="Sri Lanka în Familie - Paște 2026"
              />
            </div>

            <div>
              <label className={labelClass}>
                <Icon icon="mdi:subtitles" className="w-4 h-4 inline mr-1" />
                Hero Subtitle
              </label>
              <input
                type="text"
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                className={inputClass}
                placeholder="4-15 aprilie • 9 nopți • 11 zile"
              />
            </div>
          </div>
        )}

        {/* Gallery Section */}
        {activeSection === 'gallery' && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 space-y-6">
            <div className="flex items-center justify-between pb-6 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#037280] rounded-lg flex items-center justify-center">
                  <Icon icon="mdi:image-multiple" className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Gallery</h2>
                  <p className="text-sm text-gray-500">{gallery.length} images</p>
                </div>
              </div>
              <button
                type="button"
                onClick={addGalleryImage}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#037280] text-white rounded-lg hover:bg-[#025b66] transition-colors"
              >
                <Icon icon="mdi:plus" className="w-5 h-5" />
                Add Image
              </button>
            </div>

            <div className="space-y-4">
              {gallery.map((image: any, i: number) => (
                <ArrayItem key={i} onDelete={() => removeGalleryImage(i)}>
                  <div className="space-y-3">
                    <div>
                      <label className={labelClass}>Image {i + 1} - Source Path</label>
                      <input
                        value={image.src}
                        onChange={(e) => updateGalleryImage(i, 'src', e.target.value)}
                        className={inputClass}
                        placeholder="/images/gallery/1.jpg"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Alt Text</label>
                      <input
                        value={image.alt}
                        onChange={(e) => updateGalleryImage(i, 'alt', e.target.value)}
                        className={inputClass}
                        placeholder="Description for accessibility"
                      />
                    </div>
                  </div>
                </ArrayItem>
              ))}
              
              {gallery.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <Icon icon="mdi:image-off" className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-4">No images yet</p>
                  <button
                    type="button"
                    onClick={addGalleryImage}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#037280] text-white rounded-lg hover:bg-[#025b66] transition-colors"
                  >
                    <Icon icon="mdi:plus" className="w-5 h-5" />
                    Add First Image
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 space-y-8">
            <div className="flex items-center gap-3 pb-6 border-b">
              <div className="w-10 h-10 bg-[#037280] rounded-lg flex items-center justify-center">
                <Icon icon="mdi:text-box" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
                <p className="text-sm text-gray-500">Introduction and key information about the trip</p>
              </div>
            </div>

            <div>
              <label className={labelClass}>Overview Title</label>
              <input
                value={overviewTitle}
                onChange={(e) => setOverviewTitle(e.target.value)}
                className={inputClass}
                placeholder="About this trip"
              />
            </div>

            {/* Paragraphs */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Paragraphs</h3>
                <button
                  type="button"
                  onClick={addParagraph}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Icon icon="mdi:plus" className="w-4 h-4" />
                  Add Paragraph
                </button>
              </div>
              
              {paragraphs.map((paragraph: string, i: number) => (
                <ArrayItem key={i} onDelete={() => removeParagraph(i)}>
                  <div>
                    <label className={labelClass}>Paragraph {i + 1}</label>
                    <textarea
                      value={paragraph}
                      onChange={(e) => updateParagraph(i, e.target.value)}
                      className={inputClass}
                      rows={6}
                      placeholder="Enter paragraph content (supports Markdown)"
                    />
                  </div>
                </ArrayItem>
              ))}
            </div>

            {/* Tags */}
            <div className="space-y-4 pt-6 border-t">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Information Tags</h3>
                <button
                  type="button"
                  onClick={addTag}
                  className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Icon icon="mdi:plus" className="w-4 h-4" />
                  Add Tag
                </button>
              </div>
              
              {tags.map((tag: any, i: number) => (
                <ArrayItem key={i} onDelete={() => removeTag(i)}>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className={labelClass}>Icon</label>
                      <input
                        value={tag.icon}
                        onChange={(e) => updateTag(i, 'icon', e.target.value)}
                        className={inputClass}
                        placeholder="lucide:calendar"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Label</label>
                      <input
                        value={tag.label}
                        onChange={(e) => updateTag(i, 'label', e.target.value)}
                        className={inputClass}
                        placeholder="Duration"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Value</label>
                      <input
                        value={tag.value}
                        onChange={(e) => updateTag(i, 'value', e.target.value)}
                        className={inputClass}
                        placeholder="11 days"
                      />
                    </div>
                  </div>
                </ArrayItem>
              ))}
            </div>

            {/* Overview Image */}
            <div className="pt-6 border-t space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Overview Image</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Image Source</label>
                  <input
                    value={overviewImageSrc}
                    onChange={(e) => setOverviewImageSrc(e.target.value)}
                    className={inputClass}
                    placeholder="/images/overview.jpg"
                  />
                </div>
                <div>
                  <label className={labelClass}>Alt Text</label>
                  <input
                    value={overviewImageAlt}
                    onChange={(e) => setOverviewImageAlt(e.target.value)}
                    className={inputClass}
                    placeholder="Overview image description"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Continue rendering other sections in similar modern card style... */}
        {/* Due to length, I'll create placeholders for itinerary, accommodations, pricing, faq */}
        
        {activeSection === 'itinerary' && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <div className="flex items-center justify-between pb-6 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#037280] rounded-lg flex items-center justify-center">
                  <Icon icon="mdi:calendar-text" className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Daily Itinerary</h2>
                  <p className="text-sm text-gray-500">{dailyItinerary.length} days planned</p>
                </div>
              </div>
              <button
                type="button"
                onClick={addDay}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#037280] text-white rounded-lg hover:bg-[#025b66] transition-colors"
              >
                <Icon icon="mdi:plus" className="w-5 h-5" />
                Add Day
              </button>
            </div>

            <div className="mt-6 space-y-6">
              {dailyItinerary.map((day: any, dayIndex: number) => (
                <div key={dayIndex} className="bg-gradient-to-br from-blue-50 to-teal-50 p-6 rounded-lg border-2 border-blue-200">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-blue-900 flex items-center gap-2">
                      <Icon icon="mdi:numeric-{day.day}-circle" className="w-6 h-6" />
                      Day {day.day}
                    </h3>
                    <button
                      type="button"
                      onClick={() => removeDay(dayIndex)}
                      className="p-2 rounded hover:bg-red-50 transition-colors"
                      title="Delete Day"
                    >
                      <Icon icon="mdi:delete" className="w-5 h-5 text-red-600" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className={labelClass}>Date</label>
                      <input
                        value={day.date || ''}
                        onChange={(e) => updateDay(dayIndex, 'date', e.target.value)}
                        className={inputClass}
                        placeholder="April 4, 2026"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Title</label>
                      <input
                        value={day.title || ''}
                        onChange={(e) => updateDay(dayIndex, 'title', e.target.value)}
                        className={inputClass}
                        placeholder="Arrival in Colombo"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className={labelClass}>Meals</label>
                      <input
                        value={day.meals || ''}
                        onChange={(e) => updateDay(dayIndex, 'meals', e.target.value)}
                        className={inputClass}
                        placeholder="Breakfast, Lunch, Dinner"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Accommodation (optional)</label>
                      <input
                        value={day.accommodation || ''}
                        onChange={(e) => updateDay(dayIndex, 'accommodation', e.target.value)}
                        className={inputClass}
                        placeholder="Hotel name"
                      />
                    </div>
                  </div>

                  {/* Activities */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-gray-900">Activities</h4>
                      <button
                        type="button"
                        onClick={() => addActivity(dayIndex)}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Icon icon="mdi:plus" className="w-4 h-4" />
                        Add Activity
                      </button>
                    </div>
                    <div className="space-y-3">
                      {day.activities?.map((activity: any, actIndex: number) => (
                        <div key={actIndex} className="bg-white p-4 rounded border border-gray-200 flex gap-3">
                          <div className="flex-1 grid grid-cols-4 gap-3">
                            <div>
                              <label className="block text-xs font-medium mb-1 text-gray-700">Icon</label>
                              <input
                                value={activity.icon || ''}
                                onChange={(e) => updateActivity(dayIndex, actIndex, 'icon', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#037280] text-sm"
                                placeholder="mdi:..."
                              />
                            </div>
                            <div className="col-span-3">
                              <label className="block text-xs font-medium mb-1 text-gray-700">
                                Description <span className="text-gray-500 font-normal">(Markdown supported)</span>
                              </label>
                              <textarea
                                value={activity.description || ''}
                                onChange={(e) => updateActivity(dayIndex, actIndex, 'description', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#037280] text-sm"
                                rows={2}
                                placeholder="Activity description"
                              />
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeActivity(dayIndex, actIndex)}
                            className="p-2 h-fit rounded hover:bg-red-50 transition-colors"
                          >
                            <Icon icon="mdi:delete" className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Accommodations, Pricing, FAQ sections would continue similarly... */}
        {/* For brevity, I'll add simpler versions */}
        
        {activeSection === 'accommodations' && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <div className="flex items-center justify-between pb-6 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#037280] rounded-lg flex items-center justify-center">
                  <Icon icon="mdi:bed" className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Accommodations</h2>
                  <p className="text-sm text-gray-500">{accommodations.length} properties</p>
                </div>
              </div>
              <button
                type="button"
                onClick={addAccommodation}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#037280] text-white rounded-lg hover:bg-[#025b66] transition-colors"
              >
                <Icon icon="mdi:plus" className="w-5 h-5" />
                Add Property
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {accommodations.map((accommodation: any, i: number) => (
                <ArrayItem key={i} onDelete={() => removeAccommodation(i)}>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className={labelClass}>Name</label>
                        <input
                          value={accommodation.name || ''}
                          onChange={(e) => updateAccommodation(i, 'name', e.target.value)}
                          className={inputClass}
                          placeholder="Hotel Paradise"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Dates (optional)</label>
                        <input
                          value={accommodation.dates || ''}
                          onChange={(e) => updateAccommodation(i, 'dates', e.target.value)}
                          className={inputClass}
                          placeholder="April 4-6"
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Description</label>
                      <textarea
                        value={accommodation.description || ''}
                        onChange={(e) => updateAccommodation(i, 'description', e.target.value)}
                        className={inputClass}
                        rows={3}
                        placeholder="Brief description of the accommodation"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Photo URL</label>
                      <input
                        value={accommodation.photo || ''}
                        onChange={(e) => updateAccommodation(i, 'photo', e.target.value)}
                        className={inputClass}
                        placeholder="/images/hotels/1.jpg"
                      />
                    </div>
                  </div>
                </ArrayItem>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'pricing' && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <div className="flex items-center gap-3 pb-6 border-b">
              <div className="w-10 h-10 bg-[#037280] rounded-lg flex items-center justify-center">
                <Icon icon="mdi:currency-usd" className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Pricing</h2>
                <p className="text-sm text-gray-500">Package prices and information</p>
              </div>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <label className={labelClass}>Pricing Title</label>
                <input
                  value={pricingTitle}
                  onChange={(e) => setPricingTitle(e.target.value)}
                  className={inputClass}
                  placeholder="Package Prices"
                />
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  value={pricingDescription}
                  onChange={(e) => setPricingDescription(e.target.value)}
                  className={inputClass}
                  rows={3}
                  placeholder="Additional pricing information or terms"
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Price Table</h3>
                  <button
                    type="button"
                    onClick={addPrice}
                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <Icon icon="mdi:plus" className="w-4 h-4" />
                    Add Row
                  </button>
                </div>
                
                {prices.map((price: any, i: number) => (
                  <ArrayItem key={i} onDelete={() => removePrice(i)}>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className={labelClass}>Package</label>
                        <input
                          value={price.package || ''}
                          onChange={(e) => updatePrice(i, 'package', e.target.value)}
                          className={inputClass}
                          placeholder="2 Adults"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Early Booking</label>
                        <input
                          value={price.early_booking || ''}
                          onChange={(e) => updatePrice(i, 'early_booking', e.target.value)}
                          className={inputClass}
                          placeholder="2999"
                        />
                      </div>
                      <div>
                        <label className={labelClass}>Standard</label>
                        <input
                          value={price.standard || ''}
                          onChange={(e) => updatePrice(i, 'standard', e.target.value)}
                          className={inputClass}
                          placeholder="3299"
                        />
                      </div>
                    </div>
                  </ArrayItem>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'faq' && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <div className="flex items-center justify-between pb-6 border-b">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#037280] rounded-lg flex items-center justify-center">
                  <Icon icon="mdi:help-circle" className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">FAQ</h2>
                  <p className="text-sm text-gray-500">{faq.length} questions</p>
                </div>
              </div>
              <button
                type="button"
                onClick={addFaq}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#037280] text-white rounded-lg hover:bg-[#025b66] transition-colors"
              >
                <Icon icon="mdi:plus" className="w-5 h-5" />
                Add Question
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {faq.map((faqItem: any, i: number) => (
                <ArrayItem key={i} onDelete={() => removeFaq(i)}>
                  <div className="space-y-3">
                    <div>
                      <label className={labelClass}>Question</label>
                      <input
                        value={faqItem.question || ''}
                        onChange={(e) => updateFaq(i, 'question', e.target.value)}
                        className={inputClass}
                        placeholder="What's included in the price?"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Answer (supports Markdown)</label>
                      <textarea
                        value={faqItem.answer || ''}
                        onChange={(e) => updateFaq(i, 'answer', e.target.value)}
                        className={inputClass}
                        rows={5}
                        placeholder="Detailed answer with **bold**, *italic*, and [links](url)"
                      />
                    </div>
                  </div>
                </ArrayItem>
              ))}
            </div>
          </div>
        )}
      </form>

    </div>
  );
}
