'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

type Slide = {
  title: string;         // line 1
  titleAccent?: string;  // line 2 (colored)
  desc: string;
  cta: string;
  href: string;
  img: string;
  arrowBg: string;       // per-slide arrow color like screenshot
};

export default function HomeHeroSlider() {
  const slides: Slide[] = useMemo(
    () => [
      {
        title: 'Get the new',
        titleAccent: 'beauty buzz.',
        desc: 'The latest, greatest & freshest\nfrom your fave brands.',
        cta: 'Shop now',
        href: '/shop',
        img: '/assets/slide_1c.png',
        arrowBg: '#9C6B57',
      },
      {
        title: 'The new year looks\ngood on you.',
        desc: 'Add vitamins & collagen to your supplement\nroutine to keep it going strong.',
        cta: 'Shop now',
        href: '/shop',
        img: '/assets/slide_2.png',
        arrowBg: '#0B5A2B',
      },
      {
        title: 'Handy kitchen\nappliances',
        desc: 'Discover top tools & gadgets to make easy\n& tasty meals.',
        cta: 'Shop now',
        href: '/shop',
        img: '/assets/slide_3.png',
        arrowBg: '#C7772E',
      },
    ],
    []
  );

  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const prev = () => setIdx((v) => (v === 0 ? slides.length - 1 : v - 1));
  const next = () => setIdx((v) => (v === slides.length - 1 ? 0 : v + 1));

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setIdx((v) => (v === slides.length - 1 ? 0 : v + 1));
    }, 5000);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  const active = slides[idx];

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 lg:px-10">
        <div
          className="relative overflow-hidden rounded-none bg-white"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Track */}
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${idx * 100}%)` }}
          >
            {slides.map((s, i) => (
              <div key={i} className="w-full shrink-0">
                <div className="relative flex min-h-55 items-center border border-slate-200 bg-white px-13 py-10 sm:min-h-65 sm:px-16 lg:min-h-95 lg:px-18">
                  {/* Text */}
                  <div className="relative z-10 max-w-130">
                    <h2 className="whitespace-pre-line text-xl font-extrabold leading-[1.08] text-slate-900 sm:text-4xl lg:text-5xl">
                      {s.title}
                      {s.titleAccent ? (
                        <>
                          <br />
                          <span className="text-[#B1846E]">{s.titleAccent}</span>
                        </>
                      ) : null}
                    </h2>

                    <p className="mt-4 whitespace-pre-line text-[13px] leading-6 text-slate-600 sm:text-[14px]">
                      {s.desc}
                    </p>

                    <Link
                      href={s.href}
                      prefetch={false}
                      className="mt-6 inline-flex h-9 items-center rounded-sm px-4 text-[12px] font-semibold text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: s.arrowBg }}
                    >
                      {s.cta}
                    </Link>
                  </div>

                  {/* Image (right) */}
                  <div className="pointer-events-none absolute right-0 top-0 w-[30%] h-full md:w-[40%] sm:block">
                    <Image
                      src={s.img}
                      alt={s.titleAccent ?? s.title}
                      fill
                      priority={i === 0}
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 70vw, 60vw"
                    />
                    {/* fade on left */}
                    <div className="absolute left-0 top-0 h-full w-40 bg-linear-to-r from-white to-transparent" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          <button
            type="button"
            onClick={prev}
            aria-label="Previous"
            className="absolute left-2 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full text-white shadow-sm transition-transform hover:scale-[1.04]"
            style={{ backgroundColor: active.arrowBg }}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className="absolute right-2 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full text-white shadow-sm transition-transform hover:scale-[1.04]"
            style={{ backgroundColor: active.arrowBg }}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`Slide ${i + 1}`}
                className={[
                  'h-1.5 rounded-full transition-all',
                  i === idx ? 'w-7 bg-slate-700' : 'w-2 bg-slate-300 hover:bg-slate-400',
                ].join(' ')}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}