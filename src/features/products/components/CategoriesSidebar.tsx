"use client";

import Link from "next/link";
import { categories } from "../data";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useSearchParams } from "next/navigation";

function parseHref(href: string) {
  try {
    const url = new URL(href, "http://local");
    return {
      pathname: url.pathname,
      cat: url.searchParams.get("cat"),
    };
  } catch {
    const [pathOnly] = href.split("?");
    return { pathname: pathOnly || href, cat: null };
  }
}

export default function CategoriesSidebar() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCat = searchParams.get("cat");

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
    <aside className="w-full md:w-64 bg-white">
      <div ref={wrapRef} className="rounded bg-white p-4">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/caticon.png"
            alt="Categories"
            width={16}
            height={16}
            className="h-4 w-4 opacity-90"
          />
          <span className="text-[16px] font-bold text-slate-800">Categories</span>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex h-9 items-center gap-2 rounded bg-slate-100 px-3 text-[12px] font-semibold text-slate-700 ml-33"
            aria-expanded={open}
            aria-controls="categories-list"
          >
            <span className="truncate">{open ? "Hide" : "Show"}</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                open ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        </div>

        <ul
          id="categories-list"
          className={[
            open ? "mt-3 grid grid-cols-3 gap-2" : "hidden",
            "md:mt-3 md:block md:space-y-2",
          ].join(" ")}
        >
          {categories.map((c) => {
            const { pathname: hrefPath, cat: hrefCat } = parseHref(c.href);

          
            const isActive =
              pathname === hrefPath && (hrefCat ? currentCat === hrefCat : true);

            return (
              <li key={c.href} className="w-full md:w-auto">
                <Link
                  href={c.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "block w-full text-center md:text-left text-[12px] font-semibold hover:text-[#0B8BA6]",
                    isActive ? "text-[#0B8BA6]" : "text-slate-500",
                  ].join(" ")}
                >
                  {c.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}