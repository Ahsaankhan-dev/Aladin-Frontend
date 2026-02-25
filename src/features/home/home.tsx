'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import HomeHeroSlider from './heroslide';

type Slide = {
  titleTop: string;
  titleAccent: string;
  desc: string;
  cta: string;
  href: string;
  img: string;
};

type Category = { title: string; img: string; href: string };

const ARROW_BG = '#9C6B57'; // brown like reference
const ARROW_FG = '#FFFFFF';

export default function Page() {
  const slides: Slide[] = useMemo(
    () => [
      {
        titleTop: 'Get the new',
        titleAccent: 'beauty buzz.',
        desc: 'The latest, greatest & freshest from your fave brands.',
        cta: 'Shop now',
        href: '/shop',
        img: '/assets/slide_1.png',
      },
      {
        titleTop: 'Fresh picks for',
        titleAccent: 'your home.',
        desc: 'Small upgrades that make a big difference.',
        cta: 'Explore',
        href: '/shop',
        img: '/assets/slide_2.png',
      },
      {
        titleTop: 'Everyday',
        titleAccent: 'essentials.',
        desc: 'Grab what you need, right on time.',
        cta: 'See deals',
        href: '/shop',
        img: '/assets/slide_3.png',
      },
    ],
    []
  );

  const categories: Category[] = useMemo(
    () => [
      { title: 'Beauty & Personal Care', img: '/assets/products/p1.png', href: '/category/beauty' },
      { title: 'Health & Household', img: '/assets/products/p2.png', href: '/category/health' },
      { title: 'Home & Kitchen', img: '/assets/products/p3.png', href: '/category/kitchen' },
      { title: 'Aladdin Pharmacy', img: '/assets/products/p4.png', href: '/category/pharmacy' },
      { title: 'Medical Instruments', img: '/assets/products/p1.png', href: '/category/medical' },
    ],
    []
  );

  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((v) => (v === 0 ? slides.length - 1 : v - 1));
  const next = () => setIdx((v) => (v === slides.length - 1 ? 0 : v + 1));

  useEffect(() => {
    const t = setInterval(() => {
      setIdx((v) => (v === slides.length - 1 ? 0 : v + 1));
    }, 5500);

    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <main className="w-full bg-white">
      
      <HomeHeroSlider/>
      {/* CATEGORY + BRANDS (white like reference) */}
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-[1400px] px-4 py-14 lg:px-10">
          <div className="flex items-center justify-between">
            <h3 className="text-[28px] font-extrabold text-slate-900">Explore popular category</h3>

            <Link
              href="/categories"
              prefetch={false}
              className="text-[14px] font-medium text-slate-700 hover:text-slate-900"
            >
              See all →
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
            {categories.map((c) => (
              <Link key={c.title} href={c.href} prefetch={false} className="group">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100">
                  <Image src={c.img} alt={c.title} fill className="object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                </div>

                <p className="mt-3 text-[14px] font-semibold text-slate-900">{c.title}</p>
              </Link>
            ))}
          </div>

          <h4 className="mt-14 text-[22px] font-extrabold text-slate-900">popular brands</h4>

          <div className="mt-8 flex flex-wrap items-center gap-10 text-slate-400">
            <Brand>NIKE</Brand>
            <Brand>ADIDAS</Brand>
            <Brand>COLGATE</Brand>
            <Brand>ZARA</Brand>
            <Brand>LV</Brand>
            <Brand>CERAVE</Brand>
          </div>
        </div>
      </section>
    </main>
  );
}

function Brand({ children }: { children: React.ReactNode }) {
  return <span className="select-none text-[18px] font-extrabold tracking-[0.2em] opacity-60">{children}</span>;
}