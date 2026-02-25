'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

type NavItem = { label: string; href: string };

function isActivePath(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(href + '/');
}

function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}

function CategoryDropdown({
  value,
  options,
  onChange,
  widthClass,
  buttonClassName = '',
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
  widthClass: string;
  buttonClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onEsc);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onEsc);
    };
  }, []);

  return (
    <div ref={wrapRef} className={`relative shrink-0 ${widthClass} hidden sm:block`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={[
          'flex h-11 w-full items-center justify-between bg-white px-3 text-[14px] text-slate-600',
          'outline-none transition-colors duration-200 hover:text-slate-800',
          buttonClassName,
        ].join(' ')}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      <div
        className={[
          'absolute left-0 top-[calc(100%+8px)] z-999 w-full overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg',
          'transition-all duration-200',
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-1 opacity-0',
        ].join(' ')}
        role="listbox"
      >
        {options.map((opt) => {
          const active = opt === value;
          return (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={[
                'flex w-full items-center px-3 py-2.5 text-left text-[13px] transition-colors duration-150',
                active ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-50',
              ].join(' ')}
              role="option"
              aria-selected={active}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  useLockBodyScroll(mobileOpen);

  const navItems: NavItem[] = useMemo(
    () => [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: '/about' },
      { label: 'Shop', href: '/shop' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'My Account', href: '/account' },
    ],
    []
  );

  const categories = useMemo(
    () => ['All Categories', 'Phones', 'Accessories', 'Laptops', 'Watches'],
    []
  );

  const [q, setQ] = useState('');
  const [cat, setCat] = useState(categories[0]);

  return (
    <header className="w-full bg-[#02728B] ">
    
      <div className="mx-auto flex w-full max-w-350 items-center gap-5 px-4 py-3 lg:px-10 lg:py-4">
        {/* LOGO */}
        <div className="shrink-0">
          <Link href="/" prefetch={false} className="block">
            <Image
              src="/assets/Logo.jpg"
              width={140}
              height={44}
              alt="Aladdin Logo"
              priority
              unoptimized
              className="w-23 sm:w-30 lg:w-32.5"
            />
          </Link>
        </div>

        {/* SEARCH (ALWAYS VISIBLE) */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-1 min-w-0 items-center lg:max-w-195"
        >
          <div className="flex h-11 w-full min-w-0 items-stretch rounded-md bg-white shadow-sm">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search Aladdin"
              className="h-11 w-full min-w-0 rounded-l-md px-4 text-[14px] text-slate-800 outline-none placeholder:text-slate-400 sm:text-[15px]"
            />

            <div className="h-11 w-px bg-slate-200" />

            {/* Mobile: narrow, Desktop: wider */}
            <CategoryDropdown
              value={cat}
              options={categories}
              onChange={setCat}
              widthClass="w-[120px] sm:w-[160px] lg:w-[200px]"
              buttonClassName="rounded-none"
            />

            <button
              type="submit"
              className="h-11 w-14 place-items-center rounded-r-md bg-[#0b8ba6] text-white transition-colors duration-200 hover:bg-[#0aa0bd]"
              aria-label="Search"
            >
              <Image src="/assets/search.png" width={18} height={18} alt="Search" unoptimized />
            </button>
          </div>
        </form>

        {/* RIGHT SIDE */}
        <div className="flex shrink-0 items-center gap-2 lg:hidden">
          <Link
            href="/cart"
            prefetch={false}
            className="inline-flex items-center gap-2 rounded-md px-2 py-2 text-white transition-colors duration-200 hover:bg-white/10"
          >
            <Image
              src="/assets/shopping_cart.png"
              width={20}
              height={20}
              alt="Cart"
              unoptimized
            />
            <span className="hidden sm:inline text-[16px] font-semibold">Cart</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-md bg-[#0b8ba6] text-white transition-colors duration-200 hover:bg-[#0aa0bd]"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* DESKTOP NAV */}
        <nav className="ml-auto hidden items-center gap-7 lg:flex">
          {navItems.map((item) => {
            const active = isActivePath(pathname, item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className={[
                  'whitespace-nowrap text-[16px] font-medium transition-colors duration-200',
                  active ? 'text-white' : 'text-white/75 hover:text-white',
                ].join(' ')}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/cart"
            prefetch={false}
            className="ml-2 inline-flex items-center gap-2 whitespace-nowrap text-[17px] font-medium text-white transition-opacity duration-200 hover:opacity-90"
          >
            <Image
              src="/assets/shopping_cart.png"
              width={19}
              height={19}
              alt="Cart"
              unoptimized
            />
            Cart
          </Link>
        </nav>
      </div>

      {/* MOBILE DRAWER */}
      <div className={`fixed inset-0 z-50 lg:hidden ${mobileOpen ? '' : 'pointer-events-none'}`}>
        <div
          onClick={() => setMobileOpen(false)}
          className={`absolute inset-0 bg-black/45 transition-opacity duration-200 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />

        <div
          className={`absolute right-0 top-0 h-full w-[320px] bg-white shadow-2xl transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
        >
          <div className="flex items-center justify-between border-b px-4 py-4">
            <div className="text-lg font-bold text-slate-900">Menu</div>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="grid h-10 w-10 place-items-center rounded-md bg-slate-100 text-slate-700 transition-colors duration-150 hover:bg-slate-200"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-4">
            <div className="mb-5 rounded-md bg-slate-50 p-3">
              <div className="mb-2 text-xs font-semibold uppercase text-slate-500">Category</div>
              <CategoryDropdown
                value={cat}
                options={categories}
                onChange={setCat}
                widthClass="w-full"
                buttonClassName="rounded-md"
              />
            </div>

            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const active = isActivePath(pathname, item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={false}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-md px-3 py-3 text-[16px] font-semibold transition-colors duration-150 ${
                      active ? 'bg-slate-100 text-slate-900' : 'text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-4 border-t pt-4">
              <Link
                href="/cart"
                prefetch={false}
                onClick={() => setMobileOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#02728B] px-4 py-3 text-[16px] font-semibold text-white transition-opacity duration-200 hover:opacity-95"
              >
                <Image
                  src="/assets/shopping_cart.png"
                  width={20}
                  height={20}
                  alt="Cart"
                  unoptimized
                />
                Go to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}