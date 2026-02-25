"use client";

import { Search, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function CategoryDropdown({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
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
    <div ref={wrapRef} className="relative hidden md:block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 items-center gap-2 bg-slate-100 px-3 text-[12px] font-semibold text-slate-700"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="max-w-35 truncate">{value}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-200 ${
            open ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        className={[
          "absolute left-0 top-[calc(100%+8px)] z-999 w-55 overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg",
          "transition-all duration-200",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0",
        ].join(" ")}
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
                "flex w-full items-center px-3 py-2.5 text-left text-[13px] transition-colors duration-150",
                active
                  ? "bg-slate-100 text-slate-900"
                  : "text-slate-700 hover:bg-slate-50",
              ].join(" ")}
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

export default function SearchBar() {
  const options = ["All Categories", "Phones", "Accessories", "Laptops", "Watches"];

  const [q, setQ] = useState("");
  const [cat, setCat] = useState(options[0]);

  return (
   
    <form
      className="flex h-10 w-full rounded bg-white"
      onSubmit={(e) => e.preventDefault()}
    >
      <CategoryDropdown value={cat} options={options} onChange={setCat} />

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="w-full px-3 text-[13px] text-slate-900 outline-none"
        placeholder="Search Aladdin"
        aria-label="Search"
      />

      <button
        type="submit"
        className="flex w-12 items-center justify-center bg-[#0aa0b2] text-white"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>
    </form>
  );
}