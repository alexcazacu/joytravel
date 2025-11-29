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
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto space-y-8">
              {itinerary.map((item: any, idx: number) => (
                <div key={idx} className="border-b pb-6">
                  <h2 className="text-lg font-bold mb-4">
                    Ziua {item.day}: {item.title}
                  </h2>
                  <div className="space-y-2">
                    {item.activities?.map((activity: any, actIdx: number) => (
                      <div key={actIdx} className="flex py-1 gap-3 items-start">
                        {activity.icon && (
                          <Icon
                            icon={activity.icon}
                            className="h-5 w-5 text-[#037280] shrink-0 mt-1"
                          />
                        )}
                        <div className="text-md markdown-content">
                          <ReactMarkdown>{activity.description}</ReactMarkdown>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
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
                  {accommodations.map((accommodation: any, i: number) => (
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
                            {accommodation.dates && (
                              <span className="inline-flex items-center rounded-full bg-[#037280] px-2.5 py-0.5 text-xs font-semibold text-white self-start">
                                {accommodation.dates}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
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
          margin: 0.25rem 0;
        }

        .markdown-content p:first-child {
          margin-top: 0;
        }

        .markdown-content p:last-child {
          margin-bottom: 0;
        }

        .markdown-content ul {
          margin: 0.5rem 0;
          padding-left: 1.5rem;
          list-style-type: disc;
        }

        .markdown-content ol {
          margin: 0.5rem 0;
          padding-left: 1.5rem;
          list-style-type: decimal;
        }

        .markdown-content li {
          margin: 0.25rem 0;
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
          padding: 0.125rem 0.25rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
          font-family: monospace;
        }
      `}</style>
    </div>
  );
}
