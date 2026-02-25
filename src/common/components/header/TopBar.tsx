"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, ShoppingCart, User2, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Container from "../layout/Container";
import SearchBar from "./SearchBar";

type Lang = {
  code: string;
  label: string;
  flag?: string;
};

const LANGS: Lang[] = [
  { code: "EN", label: "English", flag: "/assets/flag/LR.png" },
  { code: "UR", label: "Urdu"}
];

export default function TopBar() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<Lang>(LANGS[0]);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target as Node)) setOpen(false);
    };

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  return (
    <div className="bg-[#005873] text-white">
      <Container className="flex items-center gap-3 py-3">
        <Link href="/" className="shrink-0">
          <Image
            src="/assets/logo.png"
            width={80}
            height={44}
            alt="Aladdin Logo"
            priority
            className="w-23 sm:w-30 lg:w-26"
          />
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          <MapPin className="h-4 w-4 opacity-90" />
          <div className="leading-tight">
            <div className="text-[11px] opacity-90">Deliver to</div>
            <div className="text-[12px] font-semibold">Pakistan</div>
          </div>
        </div>

        <div className="flex-1">
          <SearchBar />
        </div>

        <div className="hidden items-center gap-4 md:flex">
     
          <div ref={wrapRef} className="relative">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-white/10"
              aria-haspopup="listbox"
              aria-expanded={open}
            >
              {lang.flag ? (
                <Image
                  src={lang.flag}
                  width={18}
                  height={18}
                  alt={lang.label}
                  className="h-4 w-4 rounded-sm object-cover"
                />
              ) : (
                <span className="grid h-4 w-4 place-items-center rounded-sm bg-white/20 text-[10px] font-bold">
                  {lang.code}
                </span>
              )}

              <span className="text-[12px] font-semibold">{lang.code}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  open ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>

            <div
              className={`absolute right-0 top-[calc(100%+8px)] z-999 w-45 overflow-hidden rounded-md border border-white/10 bg-white text-slate-900 shadow-lg transition-all ${
                open
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-1 opacity-0"
              }`}
              role="listbox"
            >
              {LANGS.map((l) => {
                const active = l.code === lang.code;

                return (
                  <button
                    key={l.code}
                    type="button"
                    onClick={() => {
                      setLang(l);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-2 px-3 py-2.5 text-left text-[13px] transition-colors ${
                      active ? "bg-slate-100" : "hover:bg-slate-50"
                    }`}
                    role="option"
                    aria-selected={active}
                  >
                    {l.flag ? (
                      <Image
                        src={l.flag}
                        width={18}
                        height={18}
                        alt={l.label}
                        className="h-4 w-4 rounded-sm object-cover"
                      />
                    ) : (
                      <span className="grid h-4 w-4 place-items-center rounded-sm bg-slate-200 text-[10px] font-bold text-slate-700">
                        {l.code}
                      </span>
                    )}

                    <div className="flex flex-1 items-center justify-between">
                      <span className="font-semibold">{l.label}</span>
                      <span className="text-[11px] text-slate-500">{l.code}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <Link href="/account" className="flex items-center gap-2 hover:opacity-95">
            <User2 className="h-4 w-4" />
            <div className="leading-tight">
              <div className="text-[11px] opacity-90">Hello, Sign in</div>
              <div className="text-[12px] font-semibold">Account &amp; Orders</div>
            </div>
          </Link>

          <Link href="/cart" className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            <span className="text-[12px] font-semibold">Cart</span>
          </Link>
        </div>
      </Container>
    </div>
  );
}