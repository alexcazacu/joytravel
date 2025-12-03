'use client';

import { useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import useEmblaCarousel from 'embla-carousel-react';
import { Icon } from '@iconify/react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

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

export default function TripDetailClient({ trip }: { trip: TripData }) {
  const data = trip.data;

  const [emblaRefGallery, emblaApiGallery] = useEmblaCarousel({
    align: 'start',
    loop: false,
  });

  const [emblaRefAccommodations, emblaApiAccommodations] = useEmblaCarousel({
    align: 'start',
    loop: false,
  });

  const scrollPrevGallery = useCallback(() => {
    if (emblaApiGallery) emblaApiGallery.scrollPrev();
  }, [emblaApiGallery]);

  const scrollNextGallery = useCallback(() => {
    if (emblaApiGallery) emblaApiGallery.scrollNext();
  }, [emblaApiGallery]);

  const scrollPrevAccommodations = useCallback(() => {
    if (emblaApiAccommodations) emblaApiAccommodations.scrollPrev();
  }, [emblaApiAccommodations]);

  const scrollNextAccommodations = useCallback(() => {
    if (emblaApiAccommodations) emblaApiAccommodations.scrollNext();
  }, [emblaApiAccommodations]);

  const images = data.gallery || [];
  const itinerary = data.itinerary || [];
  const accommodations = data.accommodations || [];

  const contactLink = `/contact?vacation=${encodeURIComponent(data.hero?.title || trip.title)}`;

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfbf9]">
      {/* Hero Section */}
      <section className="relative h-[95vh]">
        <img
          src={trip.metaOgImage || data.overview?.image?.src || '/placeholder.jpg'}
          alt={trip.metaTitle || trip.title}
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white p-6 max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {data.hero?.title || trip.title}
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
              {data.hero?.subtitle || ''}
            </p>
            <div className="flex justify-center gap-4">
              <Link href={contactLink}>
                <Button size="lg" className="bg-[#c17c6f] hover:bg-[#a66a5d]">
                  CONTACTEAZĂ-NE ACUM
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      {data.overview && (
        <section className="container max-w-6xl mx-auto py-16 px-4">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            <div className="md:col-span-3">
              <h2 className="text-3xl font-bold mb-6">{data.overview.title}</h2>
              {data.overview.paragraphs?.map((paragraph: string, i: number) => (
                <div key={i} className="text-muted-foreground mb-4 markdown-content">
                  <ReactMarkdown>{paragraph}</ReactMarkdown>
                </div>
              ))}
              <div className="flex flex-col gap-4 mt-6">
                {data.overview.tags?.map((tag: any, i: number) => (
                  <div key={i} className="flex gap-2">
                    <Icon icon={tag.icon} className="h-5 w-5 text-[#037280] shrink-0 mt-1" />
                    <span>
                      <b>{tag.label}:</b> {tag.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {data.overview.image && (
              <div className="relative aspect-square md:col-span-2 hidden md:block">
                <img
                  src={data.overview.image.src}
                  alt={data.overview.image.alt}
                  className="rounded-lg object-cover absolute inset-0 w-full h-full"
                />
              </div>
            )}
          </div>
        </section>
      )}

      {/* Gallery Carousel */}
      {images.length > 0 && (
        <section className="w-full py-16">
          <div className="px-[54px] relative">
            <div className="overflow-hidden" ref={emblaRefGallery}>
              <div className="flex">
                {images.map((image: any, i: number) => (
                  <div
                    key={i}
                    className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_25%] p-0"
                  >
                    <div className="border-none shadow-none">
                      <div className="m-0 p-0 aspect-square">
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-4 gap-2">
              <button
                onClick={scrollPrevGallery}
                className="rounded-full bg-white shadow-md hover:bg-white/80 border p-2"
                aria-label="Previous"
              >
                <Icon icon="lucide:chevron-left" className="w-6 h-6" />
              </button>
              <button
                onClick={scrollNextGallery}
                className="rounded-full bg-white shadow-md hover:bg-white/80 border p-2"
                aria-label="Next"
              >
                <Icon icon="lucide:chevron-right" className="w-6 h-6" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Itinerary */}
      {itinerary.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Day by Day Itinerary</h2>

              <div className="space-y-8">
                {itinerary.map((item: any, idx: number) => (
                  <div key={idx} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    {/* Day Header */}
                    <div className="bg-[#037280] px-6 py-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 text-white font-bold">
                            {item.day}
                          </span>
                          <div>
                            <h3 className="text-xl font-bold text-white">{item.title}</h3>
                            {item.date && (
                              <p className="text-sm text-white/80">{item.date}</p>
                            )}
                          </div>
                        </div>
                        {item.accommodation && (
                          <div className="flex items-center gap-2 text-sm bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                            <Icon icon="mdi:bed" className="w-4 h-4 text-white" />
                            <span className="text-white font-medium">{item.accommodation}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Activities */}
                    <div className="p-6">
                      {item.activities && item.activities.length > 0 ? (
                        <div className="space-y-4">
                          {item.activities.map((activity: any, actIdx: number) => (
                            <div key={actIdx} className="flex gap-4 items-start p-4 bg-gray-50 rounded-lg border border-gray-100">
                              {activity.icon && (
                                <Icon
                                  icon={activity.icon}
                                  className="w-6 h-6 text-[#037280] flex-shrink-0 mt-0.5"
                                />
                              )}
                              <div
                                className="flex-1 text-gray-700 markdown-content"
                                dangerouslySetInnerHTML={{ __html: activity.description || '' }}
                              />
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-center py-4">No activities scheduled</p>
                      )}
                    </div>

                    {/* Photos */}
                    {item.photos && item.photos.length > 0 && (
                      <div className="px-6 pb-6">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {item.photos.map((photo: any, photoIdx: number) => (
                            <div key={photoIdx} className="relative aspect-square overflow-hidden rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
                              <img
                                src={photo.src}
                                alt={photo.alt || `Photo ${photoIdx + 1}`}
                                className="absolute inset-0 w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Accommodation */}
                    {item.accommodation && (
                      <div className="px-6 pb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
                          <Icon icon="mdi:bed" className="w-5 h-5 text-amber-700" />
                          <span className="font-medium">Accommodation:</span>
                          <span>{item.accommodation}</span>
                        </div>
                      </div>
                    )}

                    {/* Meals */}
                    {(item.meals && (typeof item.meals === 'string' || item.meals.breakfast || item.meals.lunch || item.meals.dinner)) && (
                      <div className="px-6 pb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3">
                          <Icon icon="mdi:food" className="w-5 h-5 text-blue-700" />
                          <span className="font-medium">Meals:</span>
                          <span>
                            {typeof item.meals === 'string'
                              ? item.meals
                              : [
                                  item.meals.breakfast && 'Breakfast',
                                  item.meals.lunch && 'Lunch',
                                  item.meals.dinner && 'Dinner'
                                ].filter(Boolean).join(', ')
                            }
                            {item.meals.notes && ` (${item.meals.notes})`}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Accommodations */}
      {accommodations.length > 0 && (
        <section className="bg-white py-16">
          <div className="px-[54px] container max-w-9xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Unde ne cazăm?</h2>
            <div className="relative">
              <div className="overflow-hidden" ref={emblaRefAccommodations}>
                <div className="flex">
                  {accommodations.map((accommodation: any, i: number) => {
                    // Calculate number of nights from itinerary
                    const nights = itinerary.filter((day: any) => day.accommodation === accommodation.name).length;

                    return (
                      <div
                        key={i}
                        className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] p-4"
                      >
                        <div className="h-full flex flex-col rounded-lg border border-border bg-card overflow-hidden">
                          <div className="flex-grow flex flex-col p-0">
                            <img
                              src={accommodation.photo}
                              alt={accommodation.name}
                              className="w-full h-56 object-cover"
                            />
                            <div className="p-4 flex flex-col flex-grow">
                              <h3 className="text-xl font-semibold mb-2">
                                {accommodation.name}
                              </h3>
                              <p className="text-muted-foreground mb-4 flex-grow">
                                {accommodation.description}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {nights > 0 && (
                                  <span className="inline-flex items-center gap-1 rounded-full bg-[#037280] px-2.5 py-0.5 text-xs font-semibold text-white">
                                    <Icon icon="mdi:weather-night" className="w-3.5 h-3.5" />
                                    {nights} {nights === 1 ? 'night' : 'nights'}
                                  </span>
                                )}
                                {accommodation.dates && (
                                  <span className="inline-flex items-center rounded-full bg-gray-600 px-2.5 py-0.5 text-xs font-semibold text-white">
                                    {accommodation.dates}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="flex justify-center mt-4 gap-2">
                <button
                  onClick={scrollPrevAccommodations}
                  className="rounded-full bg-white shadow-md hover:bg-white/80 border p-2"
                  aria-label="Previous"
                >
                  <Icon icon="lucide:chevron-left" className="w-6 h-6" />
                </button>
                <button
                  onClick={scrollNextAccommodations}
                  className="rounded-full bg-white shadow-md hover:bg-white/80 border p-2"
                  aria-label="Next"
                >
                  <Icon icon="lucide:chevron-right" className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Pricing Table */}
      {data.pricing?.prices?.length > 0 && (
        <section className="py-16">
          <div className="container max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8">Cât costă?</h2>
            <div className="overflow-x-auto rounded-lg shadow-lg">
              <table className="w-full border-collapse bg-white">
                <thead>
                  <tr className="bg-[#037280] text-white">
                    <th className="p-4 text-left">Pachet</th>
                    <th className="p-4 text-right">Early Booking</th>
                    <th className="p-4 text-right">Preț Standard</th>
                  </tr>
                </thead>
                <tbody>
                  {data.pricing.prices.map((row: any, i: number) => (
                    <tr
                      key={i}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-4">{row.package}</td>
                      <td className="p-4 text-right font-bold text-[#037280]">
                        {row.early_booking} EUR
                      </td>
                      <td className="p-4 text-right text-muted-foreground">
                        {row.standard} EUR
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-muted-foreground p-4">{data.pricing.description}</p>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {data.faq?.length > 0 && (
        <section className="py-16">
          <div className="container max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8">Întrebări frecvente</h2>
            <div className="mt-12">
              <Accordion type="single" collapsible>
                {data.faq.map((item: any, i: number) => (
                  <AccordionItem key={i} value={`item-${i}`}>
                    <AccordionTrigger>
                      <h3 className="text-xl">{item.question}</h3>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="markdown-content">
                        <ReactMarkdown>{item.answer}</ReactMarkdown>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-16 bg-white">
        <div className="container max-w-6xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-8">E TIMPUL SĂ PORNEȘTI LA DRUM</h2>
          <p className="text-xl mb-8">
            Dacă simți că această călătorie este pentru tine, hai să explorăm împreună!
          </p>
          <Link href={contactLink}>
            <Button size="lg" className="bg-[#c17c6f] hover:bg-[#a66a5d]">
              CONTACTEAZĂ-NE
            </Button>
          </Link>
        </div>
      </section>

      <style jsx global>{`
        .markdown-content p {
          margin: 0.5rem 0;
          line-height: 1.6;
        }

        .markdown-content p:first-child {
          margin-top: 0;
        }

        .markdown-content p:last-child {
          margin-bottom: 0;
        }

        .markdown-content h1,
        .markdown-content h2,
        .markdown-content h3 {
          font-weight: 700;
          margin: 1rem 0 0.5rem 0;
          color: #1f2937;
        }

        .markdown-content h1 {
          font-size: 1.5rem;
        }

        .markdown-content h2 {
          font-size: 1.25rem;
        }

        .markdown-content h3 {
          font-size: 1.125rem;
        }

        .markdown-content ul {
          margin: 0.75rem 0;
          padding-left: 1.5rem;
          list-style-type: disc;
        }

        .markdown-content ol {
          margin: 0.75rem 0;
          padding-left: 1.5rem;
          list-style-type: decimal;
        }

        .markdown-content li {
          margin: 0.25rem 0;
          line-height: 1.6;
        }

        .markdown-content strong {
          font-weight: 600;
          color: #1f2937;
        }

        .markdown-content em {
          font-style: italic;
        }

        .markdown-content a {
          color: #037280;
          text-decoration: underline;
          transition: color 0.2s;
        }

        .markdown-content a:hover {
          color: #025a66;
        }

        .markdown-content code {
          background-color: #f3f4f6;
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
          font-family: monospace;
        }

        .markdown-content blockquote {
          border-left: 3px solid #037280;
          padding-left: 1rem;
          margin: 1rem 0;
          color: #4b5563;
          font-style: italic;
        }

        .markdown-content hr {
          border: none;
          border-top: 1px solid #e5e7eb;
          margin: 1.5rem 0;
        }

        .markdown-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1rem 0;
        }
      `}</style>
    </div>
  );
}
