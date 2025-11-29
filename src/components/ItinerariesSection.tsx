'use client';

import { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Icon } from '@iconify/react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

type Itinerary = {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  duration: string;
  dates?: string;
  price?: string;
  destinations: string[];
  highlights?: string[];
  link: string;
};

type ItinerariesSectionProps = {
  itineraries: Itinerary[];
  title?: string;
  description?: string;
};

export function ItinerariesSection({
  itineraries,
  title = 'Destinații și Itinerarii',
  description = 'De la plajele tropicale ale Indoneziei până la tehnologia futuristică din Japonia, avem aventuri pentru fiecare familie',
}: ItinerariesSectionProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 1 },
    },
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [cardVisibility, setCardVisibility] = useState<boolean[]>(
    itineraries.map(() => false)
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(
            entry.target.getAttribute('data-index') || '0',
            10
          );
          setCardVisibility((prev) => {
            const next = [...prev];
            next[index] = true;
            return next;
          });
        }
      });
    }, observerOptions);

    document
      .querySelectorAll('.itinerary-card')
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="itinerarii" className="bg-white py-20">
      <div className="md:container max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">{title}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {description}
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {itineraries.map((itinerary, i) => (
                <div
                  key={i}
                  className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] p-4"
                >
                  <Link
                    href={itinerary.link}
                    className={`block h-full itinerary-card ${
                      cardVisibility[i] ? 'animate-visible' : ''
                    }`}
                    data-index={i}
                    style={{ animationDelay: `${(i % 3) * 150}ms` }}
                  >
                    <div className="overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full cursor-pointer rounded-lg border border-border bg-card">
                      <div
                        className="relative overflow-hidden shrink-0"
                        style={{ height: '320px' }}
                      >
                        <img
                          src={itinerary.image}
                          alt={itinerary.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="inline-flex items-center rounded-full bg-[#c17c6f] px-2.5 py-0.5 text-xs font-semibold text-white">
                            {itinerary.duration}
                          </span>
                        </div>
                      </div>

                      <div className="flex-grow flex flex-col p-6">
                        <div className="flex-grow">
                          <h3 className="text-2xl font-bold mb-2">
                            {itinerary.title}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {itinerary.description}
                          </p>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {itinerary.destinations.map((destination, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold"
                              >
                                {destination}
                              </span>
                            ))}
                          </div>

                          <div className="space-y-2 mb-4">
                            {itinerary.dates && (
                              <div className="flex items-center gap-2 text-sm">
                                <Icon
                                  icon="lucide:calendar"
                                  className="w-4 h-4 text-[#037280]"
                                />
                                <span>{itinerary.dates}</span>
                              </div>
                            )}
                          </div>

                          {itinerary.highlights &&
                            itinerary.highlights.length > 0 && (
                              <div className="border-t pt-4 mb-4">
                                <p className="text-sm font-semibold mb-2 text-muted-foreground">
                                  HIGHLIGHTS:
                                </p>
                                <ul className="space-y-1">
                                  {itinerary.highlights.map((highlight, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-start gap-2 text-sm"
                                    >
                                      <Icon
                                        icon="lucide:check"
                                        className="w-4 h-4 text-[#037280] shrink-0 mt-0.5"
                                      />
                                      <span>{highlight}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                        </div>

                        <div className="mt-auto">
                          <Button className="w-full bg-[#037280] hover:bg-[#025a66] pointer-events-none">
                            AFLĂ MAI MULTE
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {canScrollPrev && (
            <button
              onClick={scrollPrev}
              className="absolute top-1/2 -translate-y-1/2 left-4 md:left-8 z-10 rounded-full bg-white shadow-md hover:bg-white/80 border p-2"
              aria-label="Previous"
            >
              <Icon icon="lucide:chevron-left" className="w-6 h-6" />
            </button>
          )}

          {canScrollNext && (
            <button
              onClick={scrollNext}
              className="absolute top-1/2 -translate-y-1/2 right-4 md:right-8 z-10 rounded-full bg-white shadow-md hover:bg-white/80 border p-2"
              aria-label="Next"
            >
              <Icon icon="lucide:chevron-right" className="w-6 h-6" />
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .itinerary-card {
          opacity: 0;
          transform: translateY(40px) scale(0.95);
        }

        .itinerary-card.animate-visible {
          animation: cardFadeIn 0.6s ease-out forwards;
        }

        @keyframes cardFadeIn {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </section>
  );
}
