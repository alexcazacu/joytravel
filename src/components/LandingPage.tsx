'use client';

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LandingPage() {
  const [servicesVisible, setServicesVisible] = useState(false);
  const [sriLankaVisible, setSriLankaVisible] = useState(false);
  const [benefitsVisible, setBenefitsVisible] = useState(false);
  const [reviewsVisible, setReviewsVisible] = useState(false);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.id === 'services-section') setServicesVisible(true);
          if (entry.target.id === 'sri-lanka-section') setSriLankaVisible(true);
          if (entry.target.id === 'benefits-section') setBenefitsVisible(true);
          if (entry.target.id === 'reviews-section') setReviewsVisible(true);
        }
      });
    }, observerOptions);

    document.querySelectorAll('[id$="-section"]').forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const benefits = [
    {
      icon: 'mdi:account-group',
      title: 'Grupuri mici de familii',
      description: 'Călătorim în grupuri restrânse de maxim 6-8 familii pentru o experiență intimă și autentică',
    },
    {
      icon: 'mdi:map-marker-path',
      title: 'Itinerarii family-friendly',
      description: 'Programe special create pentru familii, cu echilibru între aventură, relaxare și experiențe locale',
    },
    {
      icon: 'mdi:home-heart',
      title: 'Cazări selectate cu grijă',
      description: 'Hoteluri și resorturi family-friendly, cu spații generoase, piscine și facilități pentru copii',
    },
    {
      icon: 'mdi:account-supervisor',
      title: 'Însoțitor specialist',
      description: 'Călătorim împreună cu un ghid specializat în călătorii cu copii, pe toată durata excursiei',
    },
  ];

  const images = [
    { src: '/landing/4.jpg', alt: 'Desert sunset', rotate: '-8deg', translateY: '50px' },
    { src: '/landing/1.jpg', alt: 'Traveler with map', rotate: '-6deg', translateY: '15px' },
    { src: '/landing/2.jpg', alt: 'World map', rotate: '0deg', translateY: '0px' },
    { src: '/landing/5.jpg', alt: 'Hiking scene', rotate: '6deg', translateY: '15px' },
    { src: '/landing/6.jpg', alt: 'Tropical beach', rotate: '8deg', translateY: '50px' },
  ];

  const services = [
    {
      icon: 'mdi:map-search-outline',
      title: 'TU ÎNTREBI, NOI RĂSPUNDEM – Consultanță de călătorie 1 la 1 pentru vacanțe în familie și excursii personalizate.',
      description: 'Îți place să-ți organizezi singur vacanțele, dar documentarea ți se pare copleșitoare? Noi îți oferim direcții clare, sugestii personalizate, tips & tricks și răspunsuri rapide la toate întrebările tale.',
    },
    {
      icon: 'mdi:account-group-outline',
      title: 'CĂLĂTORII DE GRUP PENTRU FAMILII CU COPII',
      description: 'Descoperă lumea alături de alte familii care împărtășesc dragostea pentru călătorii. Experiențe autentice, locuri fabuloase și copii care își fac prieteni o viață. Relaxează-te, noi ne ocupăm de restul.',
    },
    {
      icon: 'mdi:magic-wand',
      title: 'CĂLĂTORII PERSONALIZATE – VACANȚE SPECIAL CREATE PENTRU FAMILIA TA',
      description: 'Tu ne spui ce îți dorești, noi creăm magia. Itinerarii tailor-made pentru familii – de la city breaks educative la aventuri de worldschooling în natură.',
    },
  ];

  const reviews = [
    {
      text: 'Interactiunea cu Andra a fost minunata, fiind alaturi de noi in orice moment. Ne-a raspuns intotdeauna prompt, ne-a oferit informatii la orice pas, inclusiv in timpul liber, ne ajuta cu sugestii referitoare la ce am putea sa mai facem/vizitam.',
      author: 'Alina E.',
    },
    {
      text: 'Andra este întruchiparea calmului. Un om solar, care face o buna echipa cu soțul ei, a fost mereu acolo pentru noi cu o sugestie de loc inedit de vizitat in afara programului, cu rezervări la restaurante bine cotate sau cu ideea unei petreceri ad-hoc de Halloween pentru copiii. Ar fi o plăcere să ne revedem și cu altă ocazie.',
      author: 'Mădălina B.',
    },
    {
      text: 'Am avut o sesiune cu Andra și, în mai puțin de o oră, aveam un plan clar pus la punct. Mi-a sugerat cazarea perfectă, ne-a recomandat trasee pe care copiii le-au adorat și mi-a dat câteva tips-uri care mi-au salvat bugetul (și nervii). Sincer, dacă vreodată vă gândiți că o vacanță DIY e prea complicată, chemați-o pe Andra.',
      author: 'Irina C.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#fcfbf9]">
      {/* Hero Section */}
      <div className="bg-orange-25">
        <div className="container text-center max-w-3xl mx-auto pt-16 pb-8 animate-fade-in">
          <p className="text-gray-500 mb-8 italic">
            Experiențe autentice împreună
          </p>
          <h1 className="text-4xl md:text-6xl font-serif mb-8">
            Descoperă lumea în
            <br />
            ritmul familiei tale
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="cursor-pointer bg-[#c17c6f] hover:bg-[#a66a5d]">
                CONTACTEAZĂ-NE ACUM
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative bg-orange-25 h-[400px] p-4">
        <div className="flex justify-center items-center mt-[0px] md:mt-[60px] pb-[20px] gap-0 z-10 relative">
          {images.map(({ src, alt, rotate, translateY }, index) => (
            <div
              key={index}
              className={`image-container w-full ${index === 2 ? 'hidden sm:block' : ''} ${index === 0 || index === images.length - 1 ? 'hidden lg:block' : ''}`}
              style={{ transform: `rotate(${rotate}) translateY(${translateY})` }}
            >
              <div className="image-float h-80 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:z-10">
                <img
                  src={src}
                  alt={alt}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-110"
                />
              </div>
            </div>
          ))}
        </div>
        <div
          className="absolute z-0 bottom-0 left-0 w-full h-full bg-[#037280]"
          style={{ clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)' }}
        />
      </div>

      {/* Services Section */}
      <div className="bg-[#037280] text-white" id="services-section">
        <div className="container mx-auto max-w-6xl px-4 pb-16 pt-16 md:pt-32">
          <h2 className="text-4xl font-serif text-center mb-16">
            Cu ce te putem ajuta în următoarea aventură?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div
                key={i}
                className={`p-6 rounded-lg border border-white service-card animate-on-scroll ${servicesVisible ? 'animate-visible' : ''}`}
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <Icon icon={service.icon} className="w-12 h-12 mb-4 text-[#c17c6f]" />
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-300">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sri Lanka Section */}
      <div className="py-20" id="sri-lanka-section">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Image Section */}
            <div className={`lg:w-1/2 animate-slide-left ${sriLankaVisible ? 'animate-visible' : ''}`}>
              <div className="relative">
                <img
                  src="/sri-lanka/sigiriya-rock.jpg"
                  alt="Sri Lanka - Sigiriya Rock"
                  className="rounded-2xl shadow-2xl w-full h-[400px] object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute -top-4 -right-4 bg-[#c17c6f] text-white px-6 py-3 rounded-full shadow-lg transform rotate-3">
                  <span className="font-bold text-lg">Paște 2026</span>
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div
              className={`lg:w-1/2 animate-slide-right ${sriLankaVisible ? 'animate-visible' : ''}`}
              style={{ animationDelay: '200ms' }}
            >
              <div className="inline-block bg-[#037280]/10 px-4 py-2 rounded-full mb-4">
                <span className="text-sm font-semibold uppercase tracking-wide text-[#037280]">
                  Călătorie de grup pentru familii
                </span>
              </div>

              <h2 className="text-4xl md:text-5xl font-serif mb-6 text-gray-900">
                Sri Lanka în Familie
                <br />
                <span className="text-[#c17c6f]">Paște 2026</span>
              </h2>

              <p className="text-xl mb-6 text-gray-700">
                4-15 aprilie • 9 nopți • 11 zile
              </p>

              <p className="text-lg mb-8 text-gray-600 leading-relaxed">
                Hai cu noi într-o experiență pentru familii care vor să vadă lumea împreună, o călătorie de ținut minte, cu timp în natură, tradiții și momente magice!
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3">
                  <Icon icon="mdi:check-circle" className="w-6 h-6 text-[#037280] mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Grup restrâns de familii</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon icon="mdi:check-circle" className="w-6 h-6 text-[#037280] mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Experiențe autentice</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon icon="mdi:check-circle" className="w-6 h-6 text-[#037280] mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Ghid specializat în excursii pentru familii - Momadica</span>
                </div>
                <div className="flex items-start gap-3">
                  <Icon icon="mdi:check-circle" className="w-6 h-6 text-[#037280] mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Natură, plaje și aventură</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/sri-lanka">
                  <Button size="lg" className="bg-[#c17c6f] hover:bg-[#a66a5d] text-white w-full sm:w-auto">
                    DESCOPERĂ PROGRAMUL COMPLET
                    <Icon icon="mdi:arrow-right" className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-[#037280] text-[#037280] hover:bg-[#037280] hover:text-white w-full sm:w-auto"
                  >
                    SOLICITĂ OFERTĂ
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="container max-w-6xl mx-auto py-20 px-4" id="benefits-section">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            De ce să călătorești cu noi?
          </h2>

          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Pentru că știm cum e să călătorești cu copiii și exact de asta ținem cont în fiecare detaliu.
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Ne dorim ca fiecare familie care călătorește cu Momadica Travel să se simtă în siguranță, relaxată și liberă să descopere lumea în propriul ritm; timpul petrecut împreună cu cei mici merită să fie cu adevărat timp de conectare și bucurie.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {benefits.map((benefit, i) => (
            <div
              key={i}
              className={`flex gap-4 p-6 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 animate-fade-up ${benefitsVisible ? 'animate-visible' : ''}`}
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="shrink-0">
                <div className="w-12 h-12 rounded-full bg-[#037280]/10 flex items-center justify-center">
                  <Icon icon={benefit.icon} className="w-6 h-6 text-[#037280]" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="cta-section bg-gradient-to-b from-white to-[#fcfbf9] py-24 text-center">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-4xl mb-6 text-[#037280] font-semibold text-center">
            Înscrie-te la newsletterul Momadica Travel pentru viitoarele călătorii în familie
          </h2>
          <p className="mb-6">
            Înscrie-te la newsletterul Momadica Travel și primește inspirație pentru vacanțe personalizate, călătorii educative și aventuri în familie.
          </p>
          <div className="flex justify-center gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Email"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#037280]"
            />
            <Button className="bg-[#c17c6f] hover:bg-[#a66a5d]">
              Trimite
            </Button>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-20" id="reviews-section">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ce spun călătorii noștri
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Citește mai multe povești de la familii care au ales călătorii personalizate cu Momadica Travel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map(({ text, author }, index) => (
              <div
                key={index}
                className={`relative animate-scale-in ${reviewsVisible ? 'animate-visible' : ''}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col hover:scale-105">
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <Icon icon="mdi:format-quote-open" className="w-10 h-10 text-[#037280] opacity-30" />
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 leading-relaxed mb-6 flex-grow">
                    {text}
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#037280] to-[#c17c6f] flex items-center justify-center text-white font-bold text-lg">
                      {author.charAt(0)}
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-900">{author}</p>
                      <p className="text-sm text-[#037280]">Călător Momadica</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
