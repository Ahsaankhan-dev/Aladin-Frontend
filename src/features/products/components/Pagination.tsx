"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useMemo } from "react";

type Props = {
  totalPages?: number; 
  paramKey?: string; 
};

export default function Pagination({
  totalPages = 4,
  paramKey = "page",
}: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentPage = Math.max(
    1,
    Number(searchParams.get(paramKey) ?? "1") || 1
  );

  const pages = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i + 1),
    [totalPages]
  );


  const makeHref = (page: number) => {
    const currentCat = searchParams.get("cat");

    const sp = new URLSearchParams();
    if (currentCat) sp.set("cat", currentCat);
    sp.set(paramKey, String(page));

    return `${pathname}?${sp.toString()}`;
  };

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPages;

  return (
    <div className="mt-6 flex items-center justify-center gap-2">
      <Link
        href={canPrev ? makeHref(currentPage - 1) : makeHref(1)}
        aria-disabled={!canPrev}
        className={`rounded px-3 lg:py-1 lg:text-[12px] py-1.5 text-[9.5px] font-semibold text-white ${
          canPrev
            ? "bg-[#005873] hover:opacity-95"
            : "bg-[#005873]/50 cursor-not-allowed pointer-events-none"
        }`}
      >
        &lt; Previous page
      </Link>

      {pages.map((n) => (
        <Link
          key={n}
          href={makeHref(n)}
          className={`h-7 w-7 rounded text-center text-[12px] font-medium leading-7 text-white transition ${
            n === currentPage ? "bg-[#0B8BA6]" : "bg-[#005873] hover:opacity-95"
          }`}
          aria-current={n === currentPage ? "page" : undefined}
        >
          {n}
        </Link>
      ))}

      <Link
        href={canNext ? makeHref(currentPage + 1) : makeHref(totalPages)}
        aria-disabled={!canNext}
        className={`rounded px-3 lg:py-1 lg:text-[12px] py-1.5 text-[9.5px] font-semibold text-white ${
          canNext
            ? "bg-[#005873] hover:opacity-95"
            : "bg-[#005873]/50 cursor-not-allowed pointer-events-none"
        }`}
      >
        Next page &gt;
      </Link>
    </div>
  );
}