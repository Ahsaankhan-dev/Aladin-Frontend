'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

type FooterLink = { label: string; href: string };

function FooterCol({ title, links }: { title: string; links: FooterLink[] }) {
  return (
    <div>
      <h4 className="text-[17px] font-semibold tracking-wide text-white/55">
        {title}
      </h4>

      <ul className="mt-8 space-y-4">
        {links.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              prefetch={false}
              className="text-[16px] text-white/90 transition-colors duration-200 hover:text-white"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({
  href,
  children,
  label,
}: {
  href: string;
  children: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 bg-white/90 text-[#02728B] shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-white"
    >
      {children}
    </Link>
  );
}

export default function Footer() {
  const product: FooterLink[] = [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Case studies', href: '/case-studies' },
    { label: 'Reviews', href: '/reviews' },
    { label: 'Updates', href: '/updates' },
  ];

  const company: FooterLink[] = [
    { label: 'About', href: '/about' },
    { label: 'Contact us', href: '/contact' },
    { label: 'Careers', href: '/careers' },
    { label: 'Culture', href: '/culture' },
    { label: 'Blog', href: '/blog' },
  ];

  const support: FooterLink[] = [
    { label: 'Getting started', href: '/getting-started' },
    { label: 'Help center', href: '/help-center' },
    { label: 'Server status', href: '/status' },
    { label: 'Report a bug', href: '/report-bug' },
    { label: 'Chat support', href: '/chat-support' },
  ];

  const downloads: FooterLink[] = [
    { label: 'iOS', href: '/download/ios' },
    { label: 'Android', href: '/download/android' },
    { label: 'Mac', href: '/download/mac' },
    { label: 'Windows', href: '/download/windows' },
    { label: 'Chrome', href: '/download/chrome' },
  ];

  return (
    <footer className="w-full bg-[#02728B]">
      <div className="mx-auto w-full max-w-[1400px] px-8 pt-8 pb-5  sm:pt-24 lg:px-16 lg:pt-16">
        <div className="grid gap-16 lg:grid-cols-[460px_1fr] mb-10">
          {/* LEFT */}
          <div>
            <Link href="/" prefetch={false} className="inline-block">
              <Image
                src="/assets/Logo.jpg"
                width={160}
                height={52}
                alt="Aladdin Logo"
                priority
                unoptimized
                className="w-[120px] lg:w-[140px]"
              />
            </Link>

            <p className="mt-6 max-w-[420px] text-[20px] leading-9 text-white/85 lg:text-[18px]">
              Aladdin for everyone order regular and
              <br />
              become a prime customer.
            </p>

            <div className="mt-5 flex items-center gap-5">
              <SocialIcon href="#" label="Facebook">
                <Facebook className="h-6 w-6" />
              </SocialIcon>
              <SocialIcon href="#" label="Twitter">
                <Twitter className="h-6 w-6" />
              </SocialIcon>
              <SocialIcon href="#" label="Instagram">
                <Instagram className="h-6 w-6" />
              </SocialIcon>
              <SocialIcon href="#" label="LinkedIn">
                <Linkedin className="h-6 w-6" />
              </SocialIcon>
              <SocialIcon href="#" label="YouTube">
                <Youtube className="h-6 w-6" />
              </SocialIcon>
            </div>
          </div>

          {/* RIGHT */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-20">
            <FooterCol title="Product" links={product} />
            <FooterCol title="Company" links={company} />
            <FooterCol title="Support" links={support} />
            <FooterCol title="Downloads" links={downloads} />
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-4 text-center text-[12px] text-white/60 border-t border-white/15">
          <span>Copyright © 2023 BRIX Templates | All Rights Reserved | </span>

          <Link
            href="/terms"
            prefetch={false}
            className="underline decoration-white/60 underline-offset-4 transition-opacity duration-200 hover:opacity-90"
          >
            Terms and Conditions
          </Link>

          <span> | </span>

          <Link
            href="/privacy"
            prefetch={false}
            className="underline decoration-white/60 underline-offset-4 transition-opacity duration-200 hover:opacity-90"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}